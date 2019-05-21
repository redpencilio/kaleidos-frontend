import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import CONFIG from 'fe-redpencil/utils/config';

const { attr, Model, hasMany, belongsTo, PromiseArray, PromiseObject } = DS;

export default Model.extend({
  store: inject(),
  intl: inject(),

  created: attr('date'),
  modified: attr('date'),
  shortTitle: attr('string'),
  title: attr('string'),
  showAsRemark: attr('boolean'),
  formallyOk: attr('boolean'),
  isArchived: attr('boolean'),
  confidential: attr('boolean'),
  concluded: attr('boolean'),
  subcaseName: attr('string'),

  phases: hasMany('subcase-phase', { inverse: null }),
  consulationRequests: hasMany('consulation-request', { inverse: null }),
  iseCodes: hasMany('ise-code'),
  agendaitems: hasMany('agendaitem', { inverse: null }),
  remarks: hasMany('remark'),
  documentVersions: hasMany('document-version', { inverse: null }),
  themes: hasMany('theme'),
  mandatees: hasMany('mandatee'),
  approvals: hasMany('approval', { serialize: false }),

  confidentiality: belongsTo('confidentiality'),
  decision: belongsTo('decision'),
  type: belongsTo('subcase-type'),
  case: belongsTo('case', { inverse: null }),
  requestedForMeeting: belongsTo('meeting', { inverse: null }),

  firstPhase: computed('phases.@each', function () {
    return PromiseObject.create({
      promise: this.store.query('subcase-phase', { filter: { subcase: { id: this.get('id') } }, sort: 'date', include: 'code' }).then((subcasePhases) => {
        return subcasePhases.get('firstObject');
      })
    });
  }),

  nameToShow: computed('subcaseName', function () {
    const { subcaseName, title, shortTitle } = this;
    if (subcaseName) {
      return `${this.intl.t('in-function-of')} ${subcaseName.toLowerCase()}`;
    } else if (shortTitle) {
      return shortTitle;
    } else if (title) {
      return title;
    } else {
      return `No name found.`
    }
  }),

  async documentNumberOfVersion(version) {
    const documents = await this.get('documents');
    const sortedDocuments = documents.sortBy('created');
    const targetDocument = await version.get('document');
    let foundIndex;
    sortedDocuments.map((document, index) => {
      if (document == targetDocument) {
        foundIndex = index;
      }
    })
    return foundIndex;
  },

  documents: computed('documentVersions.@each', function () {
    return PromiseArray.create({
      promise: this.get('documentVersions').then((documentVersions) => {
        return Promise.all(documentVersions.map(documentVersion => {
          return documentVersion.get('document');
        })).then((documents) => { return documents.uniqBy('id') })
      })
    });
  }),

  documentsLength: computed('documents.@each', function () {
    return PromiseObject.create({
      promise: this.get('documents').then((documents) => {
        return documents.get('length');
      })
    });
  }),

  sortedMandatees: computed('mandatees', function () {
    return this.get('mandatees').sortBy('priority');
  }),

  sortedThemes: computed('themes', function () {
    return this.get('themes').sortBy('label');
  }),

  sortedPhases: computed('phases.@each', function () {
    return PromiseArray.create({
      promise: this.get('phases').then((phases) => {
        return phases.sortBy('date');
      })
    });
  }),

  hasAgendaItem: computed('agendaitems.@each', function () {
    const { id, store } = this;
    return PromiseObject.create({
      promise: store.query('agendaitem', {
        filter: { subcase: { id: id } },
        sort: 'created'
      }).then((agendaitems) => {
        const lastAgendaItem = agendaitems.get('firstObject');
        if (lastAgendaItem) {
          return lastAgendaItem.get('postponedTo').then((postPoned) => {
            const retracted = lastAgendaItem.get('retracted');
            if (!postPoned && !retracted) {
              return true;
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      })
    })
  }),

  agendaitemsOnDesignAgendaToEdit: computed('id', function () {
    return this.store.query('agendaitem', {
      filter: {
        subcase: { id: this.get('id') },
        agenda: { name: "Ontwerpagenda" }
      }
    })
  }),

  onAgendaInfo: computed('phases.@each', function () {
    return this.findPhaseDateByCodeId(CONFIG.onAgendaCodeId);
  }),

  decidedInfo: computed('phases.@each', function () {
    return this.findPhaseDateByCodeId(CONFIG.decidedCodeId);
  }),

  async findPhaseDateByCodeId(codeId) {
    const subcasePhases = await this.get('phases');
    return subcasePhases.find(async (phase) => {
      const code = await phase.get('code');
      if (code) {
        const id = code.get('id');
        if (id && id === codeId) {
          return phase.get('date');
        }
      }
      return false;
    });
  },

  isOC: computed('case.policyLevel', function () {
    return this.get('case').then((caze) => {
      return caze.get('policyLevel').then((policyLevel) => {
        return policyLevel.get('id') === CONFIG.OCCaseTypeID;
      })
    });
  }),

  submitter: computed('case.submitter', function () {
    return PromiseObject.create({
      promise: this.get('case').then((caze) => {
        return caze.get('submitter').then((submitter) => {
          return submitter;
        });
      })
    });
  }),

  documentTypeFilter: computed('isOC', function () {
    return PromiseObject.create({
      promise: this.get('isOC').then((value) => {
        return { 'is-oc': value };
      })
    });
  })

});

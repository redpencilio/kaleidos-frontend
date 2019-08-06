import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import ApprovalsEditMixin from 'fe-redpencil/mixins/approvals-edit-mixin';
import moment from 'moment';
import CONFIG from 'fe-redpencil/utils/config';

export default Component.extend(ApprovalsEditMixin, {
  store: inject(),
  classNames: ['vl-custom'],
  confidentiality: null,
  filter: { type: 'subcase-name' },

  title: computed('case', function() {
    return this.get('case.title');
  }),

  shortTitle: computed('case', function() {
    return this.get('case.shortTitle');
  }),

  confidential: computed('case', function() {
    return this.get('case.confidential');
  }),

  async copySubcaseProperties(subcase, latestSubcase) {
    const mandatees = await latestSubcase.get('mandatees');
    const iseCodes = await latestSubcase.get('iseCodes');
    const themes = await latestSubcase.get('themes');
    const requestedBy = await latestSubcase.get('requestedBy');

    subcase.set('mandatees', mandatees);
    subcase.set('iseCodes', iseCodes);
    subcase.set('themes', themes);
    subcase.set('requestedBy', requestedBy);

    return subcase.save();
  },

  async copyNewsletterInfo(subcase, newsletterInfo) {
    const newsletterInfoToCreate = this.store.createRecord('newsletter-info', {
      subcase,
      text: newsletterInfo.get('text'),
      subtitle: newsletterInfo.get('subtitle'),
      title: newsletterInfo.get('title'),
      richtext: newsletterInfo.get('richtext'),
      finished: false,
      mandateeProposal: null,
      publicationDate: newsletterInfo.get('publicationDate'),
      publicationDocDate: newsletterInfo.get('publicationDocDate')
    });
    return newsletterInfoToCreate.save();
  },

  async copyDecisions(subcase, decisions) {
    return Promise.all(
      decisions.map(decision => {
        const newDecision = this.store.createRecord('decision', {
          title: decision.get('title'),
          shortTitle: decision.get('shortTitle'),
          approved: false,
          description: decision.get('description'),
          subcase
        });
        return newDecision.save();
      })
    );
  },

  createSubcaseObject(newCase, newDate) {
    const { type, title, shortTitle, confidential, showAsRemark } = this;
    return this.store.createRecord('subcase', {
      type,
      shortTitle,
      title,
      confidential,
      showAsRemark,
      case: newCase,
      created: newDate,
      modified: newDate,
      isArchived: false,
      phases: [],
      formallyOk: false
    });
  },

  actions: {
    closeModal() {
      this.closeModal();
    },

    typeChanged(id) {
      const type = this.store.peekRecord('case-type', id);
      if (type.get('id') === CONFIG.remarkId) {
        this.set('showAsRemark', true);
      } else {
        this.set('showAsRemark', false);
      }
    },

    toggleIsEditing() {
      this.toggleProperty('isEditing');
    },

    async createSubCase(event) {
      event.preventDefault();
      this.set('isLoading', true);
      const caze = await this.store.findRecord('case', this.case.id);
      const latestSubcase = await caze.get('latestSubcase');
      const date = moment()
        .utc()
        .toDate();
      let subcase = await this.createSubcaseObject(caze, date);

      subcase.set('subcaseName', this.subcaseName);
      if (latestSubcase) {
        subcase = await this.copySubcaseProperties(subcase, latestSubcase);
        await this.copyDecisions(subcase, await latestSubcase.get('decisions'));
        const newsletterInfo = await latestSubcase.get('newsletterInfo');
        if (newsletterInfo) {
          await this.copyNewsletterInfo(subcase, newsletterInfo);
        }
      } else {
        subcase = await subcase.save();
      }

      this.set('item', subcase);
      await this.checkForActionChanges();
      await caze.hasMany('subcases').reload();
      this.set('isLoading', false);
      this.refresh();
    },

    selectPhase(phase) {
      this.set('phase', phase);
    },

    selectType(type) {
      this.set('type', type);
    },

    selectModel(items) {
      this.set('selectedSubcaseName', items);
      this.set('subcaseName', items.get('label'));
    }
  }
});

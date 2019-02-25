import DS from 'ember-data';
import { computed } from '@ember/object';

const { attr, Model, hasMany, belongsTo } = DS;

export default Model.extend({
  created: attr('date'),
  shortTitle: attr('string'),
  title: attr('string'),
  showAsRemark: attr('boolean'),

  case: belongsTo('case'),
  relatedTo: hasMany('subcase'),
  meeting: belongsTo('meeting'),
  phase: belongsTo('subcase-phase'),
  consulationRequests: hasMany('consulation-request'),
  agendaitem: hasMany('agendaitem'),
  remarks: hasMany('remark'),
  documentVersions: hasMany('document-version'),
  themes: hasMany('theme'),
  mandatees: hasMany('mandatee')
});

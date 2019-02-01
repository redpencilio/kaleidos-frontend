import DS from 'ember-data';

const { attr, Model, hasMany, belongsTo } = DS;

export default Model.extend({
  created: attr('string'),
  shortTitle: attr('string'),
  remark: attr('string'),
  title: attr('string'),
  case: belongsTo('case'),
  session: belongsTo('session'),
  agendaitem: belongsTo('agendaitem'),
  showAsComment: attr('boolean'),
  documentVersions: hasMany('document-version')
});

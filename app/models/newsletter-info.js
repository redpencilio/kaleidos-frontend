import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
	text: attr('string'),
	subtitle: attr('string'),
	title: attr('string'),
	finished:attr('boolean'),
	publicationDate: attr('date'),
	publicationDocDate: attr('date'),
	remarks: hasMany('remark'),
	themes: hasMany('theme'),
	decision: belongsTo('decision'),
	agendaitem: belongsTo('agendaitem'),
	meeting: belongsTo('meeting'),
	documents: hasMany('document', {inverse:null})
});

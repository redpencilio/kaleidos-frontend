import Component from '@ember/component';

export default Component.extend({
	selectedAgendaItem: null,
	agendaitems:null,

	actions: {
		selectAgendaItem(agendaitem) {
			this.selectAgendaItem(agendaitem);
		}
	}
});

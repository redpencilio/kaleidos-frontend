import Route from '@ember/routing/route';

export default class CommentsAgendaitemAgendaitemsAgendaRoute extends Route {
  // TODO: refactor so data is sourced from the route's model hook.
  // model() {
  //   return this.modelFor('agenda.agendaitems.agendaitem').get('remarks');
  // }

  setupController(controller, model) {
    super.setupController(...arguments);
    const agendaitem = this.modelFor('agenda.agendaitems.agendaitem');
    controller.set('agendaitem', agendaitem);
    controller.set('model', model);
  }
}

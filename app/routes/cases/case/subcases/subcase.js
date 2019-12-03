import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('subcase', params.subcase_id,
      {
        reload: true
      });
  },

  actions: {
    refresh() {
      this._super(...arguments);
      this.refresh();
    }
  }
});

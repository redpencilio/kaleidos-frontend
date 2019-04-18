import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import moment from 'moment';

export default Route.extend(ApplicationRouteMixin, {
  moment: inject(),
  intl: inject(),
  currentSession: inject(),
  routeAfterAuthentication: "agendas",

  beforeModel() {
    this.get('moment').setLocale('en');
    this.get('moment').set('allowEmpty', true);
    this.intl.setLocale('nl-be');
  },

  async model() {
    return await this.checkAlerts();
  },

  async checkAlerts() {
    const dateOfToday = moment().format();
    try {
      const alerts = await this.store.query('alert', {
        filter: {
          ':gte:end-date': dateOfToday,
          ':lte:begin-date': dateOfToday
        },
        include: 'type'
      })
      if (alerts.get('length') > 0) {
        const alertToShow = alerts.get('firstObject');
        return alertToShow;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
});

import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['domains-selector-container'],
  store: inject(),
  selectedDomains: null,
  selectedDomainsOnly: false, // property to disable all fetch/search functionality.

  searchDomain: task(function* (searchValue) {
    if (!this.get('selectedDomainsOnly')) {
      yield timeout(300);
      return this.store.query('government-domain', {
        filter: {
          label: searchValue
        }
      });
    }
  }),

  domains: computed('store', function () {
    if (!this.get('selectedDomainsOnly')) {
      return this.store.findAll('government-domain');
    }
  }),

  actions: {
    async chooseDomain(domains) {
      this.set('selectedDomains', domains)
      this.chooseDomain(domains);
    },
    async resetValueIfEmpty(param) {
      if (!this.get('selectedDomainsOnly')) {
        if (param === '') {
          this.set('domains', this.store.findAll('government-domain'));
        }
      } else {
        return this.set('domains', this.get('selectedDomains'));
      }
    }
  }
});
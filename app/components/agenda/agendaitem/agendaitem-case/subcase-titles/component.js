import Component from '@ember/component';
import { computed } from '@ember/object';
import isAuthenticatedMixin from 'fe-redpencil/mixins/is-authenticated-mixin';

export default Component.extend(isAuthenticatedMixin, {
	agenda: computed('item', function() {
		return this.get('item.agenda.name');
	}),
	
	actions: {
		toggleIsEditing() {
			this.toggleIsEditing();
		}
	}
});
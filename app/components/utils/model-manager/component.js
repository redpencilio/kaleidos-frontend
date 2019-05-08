import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
	classNames: ["vl-u-spacer"],
	store: inject(),
	modelName: null,

	codes: computed('selectedModel', {
		get() {
			const model = this.get('selectedModel');
			if (model) {
				return model.get('codes');
			} else {
				return null;
			}
		},

		set(key, value) {
			return value;
		}
	}),

	title: computed('selectedModel', {
		get() {
			const model = this.get('selectedModel');
			if (model) {
				return model.get('label');
			} else {
				return null;
			}
		},
		set(key, value) {
			return value;
		}
	}),

	isAdding: false,
	isEditing: false,

	actions: {
		close() {
			this.close();
		},

		selectModel(model) {
			this.set('selectedModel', model);
		},

		chooseCode(codes) {
			this.set('codes', codes);
		},

		toggleIsAdding() {
			this.toggleProperty('isAdding');
		},

		toggleIsEditing() {
			this.toggleProperty('isEditing');
		},

		removeModel() {
			alert('This action is not allowed. Please contact the system administrator.');
		},

		editModel() {
			const model = this.get('selectedModel');
			model.set('label', this.get('title'));
			model.set('codes', this.get('codes'));
			model.save().then(() => {
				this.set('title', null);
				this.set('isEditing', false);
			});
		},

		createModel() {
			const governmentDomain = this.store.createRecord(this.get('modelName'), {
				label: this.get('title')
			});
			governmentDomain.save().then(() => {
				this.set('title', null);
				this.set('isAdding', false);
			});
		}
	}
})

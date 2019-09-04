import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { get } from '@ember/object';
import { inject } from '@ember/service';
import { observer } from '@ember/object';

export default Component.extend({
  store: inject(),
  fileQueue: inject(),
  tagName: 'span',
  files: null,
  uploadedFileLength: null,
  multipleFiles: true,

  didInsertElement() {
    this._super(...arguments);
    this.set('isLoading', false);
    this.set('uploadedFileLength', 0);
  },

  isNotLoading: observer('fileQueue.files.@each', function() {
    const length = this.fileQueue.get('files.length');
    if (length === 0) {
      this.set('isLoading', false);
      this.set('uploadedFileLength', 0);
    }
  }),

  uploadFile: task(function*(file) {
    try {
      this.set('isLoading', true);
      file.readAsDataURL().then(() => {});
      let response = yield file.upload('/files');
      let fileTest = yield this.store.findRecord('file', response.body.data.id);
      this.uploadedFile(fileTest);
      this.incrementProperty('uploadedFileLength');
    } catch (e) {
      this.set('isLoading', false);
    } finally {
      this.set('isLoading', false);
    }
  })
    .enqueue(),

  actions: {
    uploadFile(file) {
      get(this, 'uploadFile').perform(file);
    },

    uploadedFile(uploadedFile) {
      this.uploadedFile(uploadedFile);
    },
  },
});

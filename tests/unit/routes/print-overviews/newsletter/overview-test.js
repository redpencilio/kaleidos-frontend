import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | print-overviews/newsletter/overview', (hooks) => {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:print-overviews/newsletter/overview');
    assert.ok(route);
  });
});

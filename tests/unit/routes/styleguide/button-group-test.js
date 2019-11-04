import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | styleguide/button-group', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:styleguide/button-group');
    assert.ok(route);
  });
});

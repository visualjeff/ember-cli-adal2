import Ember from 'ember';
import AdalInitializer from 'ember-cli-adal2/initializers/adal';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | adal', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  AdalInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

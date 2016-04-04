import Ember from 'ember';
import SimpleAuth from 'ember-simple-auth';

export
default Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function() {
        return new Ember.RSVP.Promise(function(resolve /* , reject */ ) {
            Ember.$.get('https://localhost:44320/test/test2').then(function(response) {
                resolve(JSON.stringify(response));
            });
        });
    }

});

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'ember-cli-adal2/config/environment';

export default Base.extend({
    restore(data) {
        Ember.debug(`custom authenticator restore called`);
        Ember.assert('Must be a valid object', data);
        return new Ember.RSVP.Promise(function(resolve, reject) {
                if (!Ember.isEmpty(data.user)) {
                    resolve(data);
                } else {
                    reject();
                }
        });
    },
    authenticate(user, password) {
        Ember.debug(`custom authenticator authenticate called`);
        Ember.assert('Must be a valid user', user);
        Ember.assert('Must be a valid password', password);
        Ember.debug(`  user: ${JSON.stringify(user)}`);
        Ember.debug(`  password: ${JSON.stringify(password)}`);
        return new Ember.RSVP.Promise(function(resolve /* , reject */) {
                Ember.debug('1');
                let authContext = ENV.APP.authContext;
                Ember.debug('2');
                if (!authContext.getCachedUser()) {
                    Ember.debug('adal authentication is being called');
                    authContext.login(); //Login will cause a page redirection
                } else {
                    Ember.debug('adal getting user from cache');
                    //If we're here, then authenticate has been called for the second time
                    //(after the refresh). This means we're already authenticated.
                    resolve({
                        user: authContext.getCachedUser()
                    });
                }
        });
    },
    invalidate(data) {
        Ember.debug(`custom authenticator invalidate called`);
        Ember.assert('Must be a valid object', data);
        return Ember.RSVP.resolve();
    }
});

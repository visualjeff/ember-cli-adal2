import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'ember-cli-adal2/config/environment';

export default Base.extend(Ember.Evented, {
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
	/*
    listener(event) {
      Ember.debug(`label: ${event.label}`);
      Ember.debug(`eventName: ${event.eventName}`);
      Ember.debug(`detail: ${JSON.stringify(event.detail)}`);
    },
    */
    authenticate(options) {
        Ember.debug(`custom authenticator authenticate called`);
        Ember.assert('Must be a valid object', options);

        //Ember.RSVP.configure('instrument', true);
        //Ember.RSVP.on('created', this.listener);
        //Ember.RSVP.on('chained', this.listener);
        //Ember.RSVP.on('fulfilled', this.listener);
        //Ember.RSVP.on('rejected', this.listener);

        return new Ember.RSVP.Promise(function(resolve, reject) {
                let authContext = ENV.APP.authContext;
                Ember.debug(`Cached user? ${JSON.stringify(authContext.getCachedUser())}`);
                if (!authContext.getCachedUser()) {
                    Ember.debug(`  Forcing login`);
                    authContext.login(); //Login will cause a page redirection
                } else {
                    //If we're here, then authenticate has been called for the second time
                    //(after the refresh). This means we're already authenticated.
                    resolve({
                        user: authContext.getCachedUser()
                    }, 'authenticate');
                }
        });
    },
    invalidate() {
        Ember.debug(`custom authenticator invalidate called`);
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.debug('Entered promise');
            let authContext = ENV.APP.authContext;
            authContext.logOut();
            resolve({
                user: ''
            });
        });
    }
});

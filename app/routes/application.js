import Ember from 'ember';
import ENV from 'ember-cli-adal/config/environment';

export
default Ember.Route.extend({
    session: Ember.inject.service('session'),
    setupController: function(controller, model) {
        Ember.assert("controller is missing or undefined", controller);
        Ember.assert("model is missing or undefined", model);
        this._super(...arguments);
        let authContext = ENV.APP.authContext;
        let isCallback = authContext.isCallback(window.location.hash);
        authContext.handleWindowCallback();
        if (isCallback && !authContext.getLoginError()) {
            window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
            if (authContext.getCachedUser()) {
                this.get('session').authenticate('authenticator:custom', {});
            }
        }
    },
    actions: {
        actions: {
            invalidateSession() {
                this.get('session').invalidate();
            }
        }
    }
});

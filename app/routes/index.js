import Ember from 'ember';
import ENV from 'ember-cli-adal2/config/environment';

export default Ember.Route.extend({
    session: Ember.inject.service('session'),
    
    setupController: function( /* controller, model */ ) {
        let authContext = ENV.APP.authContext;
        let isCallback = authContext.isCallback(window.location.hash);
        authContext.handleWindowCallback();
        if (isCallback && !authContext.getLoginError()) {            
            window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);            
            if (authContext.getCachedUser()) {     
                //Calling authenticate for the second time so it now works without a redirection.
                this.get('session').authenticate('authenticator:custom', {});
            }
        }
    },
    /*
    actions: {
        sessionAuthenticationSucceeded: function(error) {
            // this.controller.transitionToRoute(App.ProtectedRoute);
            window.location = "/index.html#/protected";
        }
    }
    */
});

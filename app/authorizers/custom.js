import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';
//import ENV from 'ember-cli-adal/config/environment';

export default Base.extend({
    currentPath: Ember.computed.alias('controllers.application.currentPath'),
    
    authorize(sessionData, block) {
            Ember.debug(`custom authorizer authorize called`);
            Ember.assert('Must be a valid object', sessionData);
            Ember.assert('Must be a valid object', block);
            
                       
            //let authContext = ENV.APP.appContext;
            //Ember.assert('Must be a valid object', authContext);
            
            //What adal does...
            /*
            let getLocation = function(href) {
                let l = document.createElement("a");
                l.href = href;
                return l;
            }; 
           
            let l = getLocation(requestOptions.url);
            let resource = l.origin;

            return authContext.acquireToken(resource, function(error, token) {
                jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
            });
            */ 
            
            //This is really what we want to do...
            const accessToken = sessionData['access_token'];
            if (Ember.notEmpty(accessToken)) {
                block('Authorization', `Bearer ${accessToken}`);
            } 
    }
});

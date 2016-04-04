import Ember from 'ember';
import injectScript from 'ember-inject-script';
import ENV from 'ember-cli-adal/config/environment';
/* global AuthenticationContext */
export default {
    name: 'adal',
    //before: 'authentication',
    initialize() {    
        Ember.debug("Injecting adal.js into Ember app");
        //var url = "//adal/adal.min.js";
        //var url = "https://secure.aadcdn.microsoftonline-p.com/lib/1.0.0/js/adal.min.js";
        var url = "https://raw.githubusercontent.com/AzureAD/azure-activedirectory-library-for-js/master/lib/adal.js";
        injectScript(url);
        
        Ember.debug("Initializing adal.js");
        Ember.assert('Must be a valid object', ENV.aadConfig);
        Ember.assert('Must have a valid tenant', ENV.aadConfig.tenant);
        Ember.assert('Must have a valid clientId', ENV.aadConfig.clientId);
        Ember.assert('Must have a valid postLogoutRedirectUri', ENV.aadConfig.postLogoutRedirectUri);
        Ember.assert('Must have a valid cacheLocation', ENV.aadConfig.cacheLocation);
        
        //initialize applicationContext here???
        let authContext = new AuthenticationContext(ENV.aadConfig);
        Ember.assert('authContext must be a valid object', authContext);
        
        //Should we set applicationContext into the ember application object?  Instead of 
        //parking it at the ENV level??? 
        ENV.APP.authContext = authContext;
        Ember.assert('authContext must be a valid object', ENV.APP.authContext);
     }
};

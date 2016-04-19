import Ember from 'ember';
//import injectScript from 'ember-inject-script';
import ENV from 'ember-cli-adal2/config/environment';

/* global AuthenticationContext */
export
default {
    name: 'adal',
    //before: 'authentication',
    initialize() {
        //Ember.debug("Injecting adal.js into Ember app");
        //var url = "//adal/adal.min.js";
        //var url = "https://secure.aadcdn.microsoftonline-p.com/lib/1.0.0/js/adal.min.js";

        /*
        There is a good workaround for this, now, by using rawgit.com.

        Steps:

          Find your link on GitHub, and click to the "Raw" version of the file.
          Copy the URL, and link to it.
          Change raw.githubusercontent.com to rawgit.com (non-production) or cdn.rawgit.com (production)
          Example: http://raw.githubusercontent.com/user/repo/branch/file.js

          For non-production environments, such as jsFiddle, replace raw.github.com with rawgit.com:

          http://rawgit.com/user/repo/branch/file.js
          For production environments, replace raw.githubusercontent.com with cdn.rawgit.com:

          http://cdn.rawgit.com/user/repo/tag/file.js
          Also note that for production environments, consider targeting a specific tag - not the branch, to ensure you're getting the specific version of the file that you expect,
          rather than the head version, which will change over time.

        Why is this needed?

        GitHub started using X-Content-Type-Options: nosniff, which instructs more modern browsers to enforce strict MIME type checking.
        It then returns the raw files in a MIME type returned by the server - preventing the browser from using the file as-intended (if the browser honors the setting).
        */
        //var url = "https://rawgit.com/AzureAD/azure-activedirectory-library-for-js/master/lib/adal.js";
        //injectScript(url);

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

        if (ENV.environment === 'development') {
            Ember.debug("==> init fired!!! <==");
            Ember.$(document).bind('adal:loginSuccess', function(ev /*, elem */ ) {
                Ember.debug(`adal:loginSuccess event: ${JSON.stringify(ev)}`);
                ev.preventDefault();
            });
            Ember.$(document).bind('adal:loginFailure', function(ev /*, elem */ ) {
                Ember.debug(`adal:loginSuccess event: ${JSON.stringify(ev)}`);
                ev.preventDefault();
            });
            Ember.$(document).bind('adal:notAuthorized', function(ev /*, elem */ ) {
                Ember.debug(`adal:loginSuccess event: ${JSON.stringify(ev)}`);
                ev.preventDefault();
            });
        }
    }
};

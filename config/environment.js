/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'ember-cli-adal2',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',

        aadConfig: {
            tenant: 'common',
            clientId: '1D8D7FDB-E91A-4AD1-8FAE-ED6E15B06798',
            postLogoutRedirectUri: 'http://localhost:4200/',
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        },

        'simple-auth': {
            authorizer: 'authorizer:custom',
            crossOriginWhitelist: ['*']
        },


        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};

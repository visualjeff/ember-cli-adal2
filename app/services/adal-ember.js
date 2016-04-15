import Ember from 'ember';
import ENV from '../config/environment';

export
default Ember.Service.extend({

    init() {
            let _adal = null;
            let _oauthData = {
                isAuthenticated: false,
                userName: '',
                loginError: '',
                profile: ''
            };

            let updateDataFromCache = function(resource) {
                let token = _adal.getCachedToken(resource);
                _oauthData.isAuthenticated = token !== null && token.length > 0;
                let user = _adal.getCachedUser() || {
                    userName: ''
                };
                _oauthData.userName = user.userName;
                _oauthData.profile = user.profile;
                _oauthData.loginError = _adal.getLoginError();
            };

            if (ENV.adalConfiguration) {
                let configOptions = ENV.adalConfiguation;
                let existingHash = window.location.hash;
                let pathDefault = window.location.href;
                if (existingHash) {
                    pathDefault = pathDefault.replace(existingHash, '');
                }
                configOptions.redirectUri = configOptions.redirectUri || pathDefault;
                configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;
                if (httpProvider && httpProvider.interceptors) {
                    httpProvider.interceptors.push('ProtectedResourceInterceptor');
                }
                _adal = new AuthenticationContext(configOptions);
                Ember.set('authenticationContext', new AuthenticationContext(configOptions));
            } else {
                throw new Error('You must set ENV.adalConfiguration, when calling init');
            }
            updateDataFromCache(_adal.config.loginResource);
        },

        login: function() {
            _adal.login();
        },
        loginInProgress: function() {
            return _adal.loginInProgress();
        },
        logOut: function() {
            _adal.logOut();
        },
        getCachedToken: function(resource) {
            return _adal.getCachedToken(resource);
        },
        userInfo: _oauthData,
        acquireToken: function(resource) {
            // automated token request call
            var deferred = $q.defer();
            _adal._renewActive = true;
            _adal.acquireToken(resource, function(error, tokenOut) {
                _adal._renewActive = false;
                if (error) {
                    _adal.error('Error when acquiring token for resource: ' + resource, error);
                    deferred.reject(error);
                } else {
                    deferred.resolve(tokenOut);
                }
            });

            return deferred.promise;
        },
        getUser: function() {
            var deferred = $q.defer();
            _adal.getUser(function(error, user) {
                if (error) {
                    _adal.error('Error when getting user', error);
                    deferred.reject(error);
                } else {
                    deferred.resolve(user);
                }
            });

            return deferred.promise;
        },
        getResourceForEndpoint: function(endpoint) {
            return _adal.getResourceForEndpoint(endpoint);
        },
        clearCache: function() {
            _adal.clearCache();
        },
        clearCacheForResource: function(resource) {
            _adal.clearCacheForResource(resource);
        },
        info: function(message) {
            _adal.info(message);
        },
        verbose: function(message) {
            _adal.verbose(message);
        }
});

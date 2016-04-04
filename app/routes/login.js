import Ember from 'ember';

export
default Ember.Route.extend({
    actions: {
        authenticate() {
            let {
                identification, password
            } = this.getProperties('identification', 'password');
            this.get('session').authenticate('authenticator:custom', identification, password).then(() => {
                Ember.debug('authenticated!');
                this.transitionToRoute('index');
            }).catch((reason) => {
                this.set('errorMessage', reason.error || reason);
            });
        }
    }

});

import Ember from 'ember';
import SaveModelMixin from 'afri-ember/mixins/products/save-model-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(SaveModelMixin, AuthenticatedRouteMixin, {
	actions: {
    remove: function(model) {
      if(confirm('Confirm Product Item to be deleted?')) {
        model.destroyRecord();
      }
    }
  },
  model: function() {
    return this.store.findAll('product');
  }
});

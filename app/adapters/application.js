
import DS from 'ember-data';
import ENV from 'afri-ember/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend({
  host: ENV.host,
  namespace: 'api',
  authorizer: 'authorizer:drf-token-authorizer'
});

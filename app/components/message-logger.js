import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Component.extend({
  eventBus: Ember.inject.service(),

  init() {
    this._super(...arguments);

    this.get('eventBus').on('message', () => {
      warn('message logger says message event happened');
    });
  },
});

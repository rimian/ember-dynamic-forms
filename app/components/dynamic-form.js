import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Component.extend({
  eventBus: Ember.inject.service(),
  fields: [],

  init() {
    this._super(...arguments);

    let fieldFactory = Ember.Object.extend({
      type: 'text'
    });

    let fields = [
      fieldFactory.create({label: 'Foo', value: 'bar'}),
      fieldFactory.create({label: 'Bar', value: 'baz'})
    ];

    this.get('fields').pushObjects(fields);

    this.get('eventBus').on('message', () => {
      warn('message event happened');
    });
  },

  actions: {
    sendMessage() {
      this.get('eventBus').trigger('message');
    }
  }
});

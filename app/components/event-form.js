import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Component.extend({
  eventBus: Ember.inject.service(),
  fields: [],

  init() {
    this._super(...arguments);

    this.set('fields', []);

    let fieldFactory = Ember.Object.extend(Ember.Evented, {
      type: 'text'
    });

    let fields = [
      fieldFactory.create({label: 'Foo', value: 'bar'}),
      fieldFactory.create({label: 'Bar', value: 'baz'})
    ];

    // This does not happen
    fields[0].on('message', () => {
      warn('Field says message event happened');
    });

    this.get('fields').pushObjects(fields);

    this.get('eventBus').on('message', () => {
      warn('form component says message event happened');
    });
  },

  actions: {
    sendMessage() {
      this.get('eventBus').trigger('message');
    }
  }
});

import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Component.extend({

  items: [],

  init() {
    this._super(...arguments);

    this.set('items', []);

    let fieldFactory = Ember.Object.extend({
      type: 'text'
    });

    let items = [
      fieldFactory.create({label: 'Foo', value: 'bar'}),
      fieldFactory.create({label: 'Bar', value: 'baz'})
    ];

    this.get('items').pushObjects(items);
  },

  childWrappers: Ember.computed('items.@each', function() {
    return this.get('items').map(item => {
      return Ember.Object.create({ // wrapper object
        item: item,
        height: false
      });
    });
  }),

  actions: {
    sendAction() {
      this.get('childWrappers').forEach(wrapper => {
        wrapper.toggleProperty('height');
        warn(wrapper.item.value)
      });
    }
  }
});

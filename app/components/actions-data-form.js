import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Component.extend({

  fields: [],

  init() {
    this._super(...arguments);

    this.set('fields', []);

    let fieldFactory = Ember.Object.extend({
      type: 'input',
    });

    let fields = [
      fieldFactory.create({label: 'Foo', value: 'bar'}),
      fieldFactory.create({label: 'Bar', value: 'baz'}),
      fieldFactory.create({type: 'checkbox', label: 'Doo', value: 'dah'})
    ];

    this.get('fields').pushObjects(fields);
  },

  fieldWrappers: Ember.computed('fields.@each', function() {
    return this.get('fields').map(field => {
      return Ember.Object.create({
        visible: true,
        field: field,
        execute(value) {
          warn('Thing happens:', value, this.field.value);
          if(value === 'h' && this.get('field').label === 'Foo') {
            this.set('visible', false);
          }
        }
      });
    });
  }),

  actions: {
    sendAction(value) {
      this.get('fieldWrappers').forEach(wrapper => {
        wrapper.execute(value);
      });
    }
  }
});

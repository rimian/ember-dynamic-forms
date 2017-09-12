import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Controller.extend({
  formFields: [],

  init() {
    this._super(...arguments);

    let fieldFactory = Ember.Object.extend(Ember.Evented, {
      greet(label) {
        this.trigger('greet', label);
      },

      type: 'text'
    });

    let fields = [
      fieldFactory.create({label: 'Foo', value: 'bar'}),
      fieldFactory.create({label: 'Bar', value: 'baz'})
    ];

    fields[0].on('greet', (e) => {
      warn('Field 1 listener heard something.', ...arguments);
    })

    this.get('formFields').pushObjects(fields);
  },

  actions: {
    doEvent(field) {
      field.greet(field.label);
    }
  }
});

import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Controller.extend({
  formFields: [],

  init() {
    this._super(...arguments);

    let fieldFactory = Ember.Object.extend(Ember.Evented, {
      greet() {
        this.trigger('greet', this.get('value'));
      },

      type: 'text'
    });

    let fields = [
      fieldFactory.create({label: 'Foo', value: 'bar'}),
      fieldFactory.create({label: 'Bar', value: 'baz'})
    ];

    warn(fields);

    fields[0].on('greet', (data) => {
      warn('Field 1 listener heard "greet".', data);
    })

    this.get('formFields').pushObjects(fields);
  },

  actions: {
    doEvent(field) {
      warn(field.get('value'));
      field.greet();
    }
  }
});

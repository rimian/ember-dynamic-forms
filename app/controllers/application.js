import Ember from 'ember';

const { warn } = Ember.Logger;

export default Ember.Controller.extend({
  formFields: [],

  init() {
    this._super();

    let fieldFactory = Ember.Object.extend(Ember.Evented, {
      greet() {
        warn(this.get('label'), ' triggered "greet"');
        this.trigger('greet');
      },

      type: 'text'
    });

    let fields = [
      fieldFactory.create({label: 'Foo', value: 'bar'}),
      fieldFactory.create({label: 'Bar', value: 'baz'})
    ];

    fields[0].on('greet', () => {
      warn('Woo! Field 1 listener heard something.');
    })

    this.get('formFields').pushObjects(fields);
  },

  actions: {
    doEvent(field) {
      field.greet();
    }
  }
});

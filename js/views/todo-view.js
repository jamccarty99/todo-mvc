// The DOM element for a todo item...
TodoView = Backbone.View.extend({
  //... is a list tag.
  tagName:  'li',

  className: '',

  events: {
      'click .toggle': 'toggleOnClick',
      'click .destroy': 'destroyTodo',
      'dblclick edit': 'editTodo',
      'click .active': 'showActive',
      'click .completedTodo': 'completedTodos',
      'click .all selected': 'allSelected'
  },

  initialize: function () {
    this.listenTo(this.model, 'change:completed', this.renderCompleted);
    this.listenTo(todosCollection, 'remove.index', this.destroyTodo);
    //this.listenTo(this.model, '',)
  },

  // Cache the template function for a single item.
  template: Handlebars.compile($('#item-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    console.log(this.model.attributes.completed);
    return this;
  },

  toggleOnClick: function () {
    //TODO:update model
      this.model.set("completed", "true");
  },

  renderCompleted: function () {
    $(this.el).addClass('completed').html(this.template(this.model.toJSON()));
    console.log(this.model.attributes.completed);
  },

  destroyTodo: function () {
    this.remove($(this.el));
    this.model.destroy({success: function (todo, destroy) {
      console.log('todo has been destroyed!');
    }});
  },

  editTodo: function () {

  },
});

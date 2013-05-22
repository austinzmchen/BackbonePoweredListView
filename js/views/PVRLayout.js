var app = app || {};

(function() {
    app.PVRLayout = Backbone.View.extend({
        el: '#content', // bind to existing element
        compiledTemplate: _.template( $('#template-list-view').html()),

        initialize: function() {
        },

        render: function() {
            this.$el.html(this.compiledTemplate);

            // render subview
            var listView = new app.PVRListView();
            $('#listbox').html(listView.render().el);
            return this;
        },

        events: {
            'click .clickable_row': 'rowClicked'
        },

        rowClicked: function(event) {
            console.log("rowClicked");
            $("#rightpane-div1").html($(event.currentTarget).children("#rec_title")[0].innerHTML);
            $("#rightpane-div2").html($(event.currentTarget).children("#rec_date")[0].innerHTML);
            $("#rightpane-div3").html($(event.currentTarget).children("#rec_type")[0].innerHTML);
        }
    });
}());
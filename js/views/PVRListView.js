var app = app || {};

(function() {
    // Define a collection view to show
    // ---------------------
    app.PVRListView = Backbone.View.extend({
        id: "list1",
        currentSelectedRow: null,
        index: 0,

        initialize: function () {
            this.$noteBox = $('#notebox');

            // init model
            this.records = new app.PVRRecords();
            this.records.bind('fetch_more', this.render, this); // fetch replace a collection with a new list of models
            this.records.fetchRecords();
        },

        render: function () {
            this.$el.empty(); // clear existing

            var recordCollection = this.records.recordCollection;
            var t = this;
            _.each(recordCollection.models, function(model){
                var itemView = new app.PVRItemView({
                    model: model
                });
                t.$el.append(itemView.render().el);
            });
            this.$noteBox.fadeOut(1000);
            return this;
        },

        events: {
            'click .clickable_row': 'viewClicked',
            'scroll': 'viewScrolled'
        },

        viewClicked: function(event) {
            console.log("ListView viewClicked");
            var currentElement = event.currentTarget;

            if (this.currentSelectedRow != null) {
                $(this.currentSelectedRow).css("background-color","#c5f2fb");

                var copy = this.currentSelectedRow;
                $(this.currentSelectedRow).hover(function(){
                    $(copy).css("background-color","#d1d1d1");
                },function(){
                    $(copy).css("background-color","#c5f2fb");
                });
            }
            $(currentElement).css("background-color","rgb(255, 128, 21)");
            this.currentSelectedRow = currentElement;
        },

        viewScrolled: function(event) {
            if($(event.currentTarget).scrollTop() + $(event.currentTarget).outerHeight() == $(event.currentTarget)[0].scrollHeight) {
                this.$noteBox.fadeIn(1000);

                var setTimeoutCallBack = (function(t){
                    return function() {
                        //fetch data
                        t.records.fetchRecords();
                    }
                })(this);
                setTimeout(setTimeoutCallBack, 1000);
            }
        }
    });

}());
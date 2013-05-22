var app = app || {};

(function() {
    app.PVRItemView = Backbone.View.extend({
        id: "rec_row",
        className: "clickable_row",
        compiledTemplate: _.template($('#template-list-item-view').html()),

        initialize: function(options) {
            this.id += options.index;
            this.$el.prop("id", this.id);
        },

        render: function () {
            if (this.model.has('additionalInfo')) {
                this.$el.html(this.compiledTemplate({
                    title: this.model.attributes.additionalInfo.title || '',
                    schedule: this.model.attributes.additionalInfo.schedule || '',
                    info: this.model.attributes.additionalInfo.info || ''
                }));
            }
            return this;
        }
    });
}());

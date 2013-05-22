var app = app || {};

(function(){
    app.PVRRecords = Backbone.Collection.extend({
        url: "recordings_additionalinfo.json",
        page: 1, // each page is 15 records

        initialize: function() {
            this.recordCollection = new Backbone.Collection();
        },

        fetchRecords: function () {
            var t = this;
            this.fetch({
                success: function(collection, response) {
                    t.recordCollection.add(response.recordingAssets.slice((t.page-1)*12, t.page*12));
                    t.page++;

                    t.trigger('fetch_more', t.recordCollection); // trigger listeners
                },
                update: true
            });
        }
    });
}());
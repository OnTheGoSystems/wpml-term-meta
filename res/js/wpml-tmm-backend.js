WpmlTermMetaMock = {};
WpmlTermMetaMock.Models = {};
WpmlTermMetaMock.Views = {};
WpmlTermMetaMock.Collections = {};
WpmlTermMetaMock.Templates = {};
WpmlTermMetaMock.compiledTemplates = {};

(function () {
    WpmlTermMetaMock.getTemplate = function (temp) {
        if (WpmlTermMetaMock.Templates.hasOwnProperty(temp)) {
            if (WpmlTermMetaMock.compiledTemplates[temp] === undefined) {
                WpmlTermMetaMock.compiledTemplates[temp] = _.template(WpmlTermMetaMock.Templates[temp].join("\n"))
            }
            return WpmlTermMetaMock.compiledTemplates[temp];
        }
    };

    WpmlTermMetaMock.Templates = {
        main: [
            '<h1>WPML Term Meta Mock</h1>',
            '<div id="wpml-tmm-admin-body"></div>'
        ]
    };

    WpmlTermMetaMock.Models.Term = Backbone.Model.extend({
        idAttribute: "term_id",
        defaults: function () {
            return {
                name: false,
                term_id: false,
                language_code: false,
                taxonomy: false
            };
        }
    });

    WpmlTermMetaMock.Views.MainView = Backbone.View.extend({
        tagName: "div",
        el: jQuery('#wpml-tmm-main'),
        template: WpmlTermMetaMock.getTemplate("main"),
        render: function () {
            "use strict";

            var self = this;
            self.$el.html(
                self.template({})
            );

            return self;
        }
    });

    WpmlTermMetaMock.Views.TermView = Backbone.View.extend({
        model: WpmlTermMetaMock.Models.Term
    });

    WpmlTermMetaMock.Collections.Terms = Backbone.Collection.extend({
        model: WpmlTermMetaMock.Models.Term
    });

    jQuery(document).ready(function () {
        var view = new WpmlTermMetaMock.Views.MainView();
        view.render();
    });
})(WpmlTermMetaMock);
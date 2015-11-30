/* globals WpmlTmCurrentTerm */

WpmlTermMetaMock = {};
WpmlTermMetaMock.Models = {};
WpmlTermMetaMock.Views = {};
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
            '<h1>WPML Term Meta</h1>',
            '<div id="wpml-tmm-admin-body"></div>'
        ],
        termDebug: [
            '<div id="wpml-tmm-debug">',
            '<p id="wpml-tmm-term-name"><span></span>Name: <span><%=name%></span></p>',
            '<p id="wpml-tmm-term-id"><span></span>Term_ID: <span><%=id%></span></p>',
            '</div>'
        ],
        addField: [
            '<div id="wpml-tmm-new">',
            '<input type="text" id="wpml-tmm-new-key" name="wpml-tmm-new-key" />',
            '<input type="text" id="wpml-tmm-new-value" name="wpml-tmm-new-value" />',
            '<input type="button" value="Add" id="wpml-tmm-new-submit" name="wpml-tmm-new-submit" />',
            '</div>'
        ]
    };

    WpmlTermMetaMock.Models.Term = Backbone.Model.extend({
        idAttribute: "term_id",
        defaults: function () {
            return {
                name: false,
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
        model: WpmlTermMetaMock.Models.Term,
        debugTemplate: WpmlTermMetaMock.getTemplate("termDebug"),
        addTemplate: WpmlTermMetaMock.getTemplate("addField"),
        render: function (nonceField) {
            "use strict";
            var self = this;
            self.$el.html(
                self.debugTemplate({
                    name: self.model.get('name'),
                    id: self.model.get('term_id')
                }) + self.addTemplate({}) + nonceField
            );

            return self;
        }
    });

    jQuery(document).ready(function () {
        var mainView = new WpmlTermMetaMock.Views.MainView();
        mainView.render();
        var currentTerm = new WpmlTermMetaMock.Models.Term({
            name: WpmlTmCurrentTerm.term.name,
            term_id: WpmlTmCurrentTerm.term.term_id
        });
        var termView = new WpmlTermMetaMock.Views.TermView({
            model: currentTerm,
            el: mainView.$el.find('#wpml-tmm-admin-body')
        });
        termView.render(WpmlTmCurrentTerm.nonceField);
    });
})(WpmlTermMetaMock, WpmlTmCurrentTerm);
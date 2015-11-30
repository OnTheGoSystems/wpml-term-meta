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
            '<div id="wpml-tmm-admin-meta-values"></div>',
            '</div>'
        ],
        addField: [
            '<div id="wpml-tmm-new">',
            '<input type="text" class="wpml-tmm-new-key" name="wpml-tmm-new-key" />',
            '<input type="text" class="wpml-tmm-new-value" name="wpml-tmm-new-value" />',
            '<input type="button" value="Add" disabled="disabled" class="wpml-tmm-new-submit" name="wpml-tmm-new-submit" />',
            '</div>'
        ],
        meta: [
            '<p>',
            '<span>Meta ID: <%=id%></span>',
            '<span>Key: <%=key%></span>',
            '<span>Value: <%=value%></span>',
            '<input type="button" value="X" class="wpml-tmm-delete-meta" />',
            '</p>'
        ]
    };

    WpmlTermMetaMock.Models.Term = Backbone.Model.extend({
        idAttribute: "term_id",
        defaults: function () {
            return {
                name: false
            };
        }
    });

    WpmlTermMetaMock.Models.TermMetaEntry = Backbone.Model.extend({
        defaults: function () {
            return {
                key: false,
                value: false,
                term: false,
                meta_id: 0
            };
        },
        save: function (nonce, metaDiv) {
            var self = this;
            jQuery.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: 'wpml_tmm_ajax_add',
                    wpml_tmm_term_id: self.get('term').get('term_id'),
                    _icl_nonce: nonce,
                    wpml_tmm_meta_key: self.get('key'),
                    wpml_tmm_meta_value: self.get('value')
                },
                success: function (response) {
                    if (response.success) {
                        self.set('meta_id', response.data);
                    }
                    var view = new WpmlTermMetaMock.Views.TermMetaEntry({
                        model: self,
                        el: metaDiv,
                        attributes: {nonce: nonce}
                    });
                    view.render();

                    return self;
                }
            });
        },
        delete: function (nonce, view) {
            var self = this;
            jQuery.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: 'wpml_tmm_ajax_del',
                    wpml_tmm_term_id: self.get('term').get('term_id'),
                    _icl_nonce: nonce,
                    wpml_tmm_meta_key: self.get('key')
                },
                success: function (response) {
                    if (response.success) {
                        view.remove();
                    }

                    return self;
                }
            });
        }
    });

    WpmlTermMetaMock.Views.TermMetaEntry = Backbone.View.extend({
        tagName: "p",
        template: WpmlTermMetaMock.getTemplate("meta"),
        model: WpmlTermMetaMock.Models.TermMetaEntry,
        events: {
            'click .wpml-tmm-delete-meta': 'delete'
        },
        render: function () {
            "use strict";

            var self = this;
            self.$el.add(
                self.template({
                    id: self.model.get('meta_id'),
                    key: self.model.get('key'),
                    value: self.model.get('value')
                })
            ).appendTo(self.$el);
            self.setElement(jQuery(self.$el.find('p').filter(':last')));
            return self;
        },
        delete: function () {
            var self = this;
            self.model.delete(self.attributes.nonce, self);
            return self;
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
        events: {
            'click .wpml-tmm-new-submit': 'addNewMeta',
            'change .wpml-tmm-new-key': 'setButtonActivation',
            'keydown .wpml-tmm-new-key': 'setButtonActivation',
            'change .wpml-tmm-new-value': 'setButtonActivation',
            'keydown .wpml-tmm-new-value': 'setButtonActivation'
        },
        setButtonActivation: function () {
            var self = this;
            self.$el.find('.wpml-tmm-new-submit').prop('disabled', self.metaKey() === "" || self.metaValue() === "");
        },
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
        },
        addNewMeta: function () {
            var self = this;
            var newMeta = new WpmlTermMetaMock.Models.TermMetaEntry({
                term: self.model,
                key: self.metaKey(),
                value: self.metaValue()
            });
            newMeta.save(self.nonce(), self.$el.find('#wpml-tmm-admin-meta-values'));
        },
        metaKey: function () {
            var self = this;

            return self.$el.find('.wpml-tmm-new-key').val()
        },
        metaValue: function () {
            var self = this;

            return self.$el.find('.wpml-tmm-new-value').val();
        },
        nonce: function () {
            var self = this;

            return self.$el.find('[name="_icl_nonce"]').val();
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
        _.each(WpmlTmCurrentTerm.termMeta, function (value, index) {
            if (WpmlTmCurrentTerm.termMeta.hasOwnProperty(index)) {
                _.each(value, function (subValue) {
                    var metaView = new WpmlTermMetaMock.Views.TermMetaEntry({
                        model: new WpmlTermMetaMock.Models.TermMetaEntry({
                            term: currentTerm,
                            key: index,
                            value: subValue
                        }),
                        el: termView.$el.find('#wpml-tmm-admin-meta-values'),
                        attributes: {nonce: termView.nonce()}
                    });
                    metaView.render();
                });
            }
        });
    });
})(WpmlTermMetaMock, WpmlTmCurrentTerm);
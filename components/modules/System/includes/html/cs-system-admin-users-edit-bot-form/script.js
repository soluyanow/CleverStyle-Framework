// Generated by CoffeeScript 1.9.3

/**
 * @package    CleverStyle CMS
 * @subpackage System module
 * @category   modules
 * @author     Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright  Copyright (c) 2015, Nazar Mokrynskyi
 * @license    MIT License, see license.txt
 */

(function() {
  var L;

  L = cs.Language;

  Polymer({
    'is': 'cs-system-admin-users-edit-bot-form',
    behaviors: [cs.Polymer.behaviors.Language],
    properties: {
      can_save: {
        type: Boolean,
        computed: 'can_save_(user_data.*)'
      },
      user_id: -1,
      user_data: {
        type: Object,
        value: {}
      },
      tooltip_animation: '{animation:true,delay:200}'
    },
    ready: function() {
      $.getJSON('api/System/admin/users/' + this.user_id, (function(_this) {
        return function(data) {
          return _this.set('user_data', data);
        };
      })(this));
      this.workarounds(this.shadowRoot);
      return cs.observe_inserts_on(this.shadowRoot, this.workarounds);
    },
    workarounds: function(target) {
      return $(target).cs().radio_buttons_inside().cs().tooltips_inside();
    },
    status_change: function(e) {
      return this.set(['user_data', 'status'], $(e.currentTarget).children('input').val());
    },
    save: function() {
      return $.ajax({
        url: 'api/System/admin/users/' + this.user_id,
        type: 'patch',
        data: {
          user: this.user_data
        },
        success: function() {
          return UIkit.notify(L.changes_saved.toString(), 'success');
        }
      });
    },
    status_state: function(expected) {
      var status;
      status = this.user_data.status;
      return status == expected;
    },
    status_class: function(expected) {
      return 'uk-button' + (this.status_state(expected) ? ' uk-active' : '');
    },
    can_save_: function() {
      return this.user_data.username && (this.user_data.login || this.user_data.email);
    }
  });

}).call(this);

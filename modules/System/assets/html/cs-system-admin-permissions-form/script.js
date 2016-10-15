// Generated by LiveScript 1.4.0
/**
 * @package    CleverStyle Framework
 * @subpackage System module
 * @category   modules
 * @author     Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright  Copyright (c) 2015-2016, Nazar Mokrynskyi
 * @license    MIT License, see license.txt
 */
(function(){
  Polymer({
    is: 'cs-system-admin-permissions-form',
    behaviors: [cs.Polymer.behaviors.Language('system_admin_permissions_')],
    properties: {
      permission_id: Number,
      group: '',
      label: ''
    },
    ready: function(){
      var this$ = this;
      if (this.permission_id) {
        cs.api('get api/System/admin/permissions/' + this.permission_id).then(function(arg$){
          this$.group = arg$.group, this$.label = arg$.label;
        });
      }
    },
    save: function(){
      var method, suffix, this$ = this;
      method = this.permission_id ? 'put' : 'post';
      suffix = this.permission_id ? '/' + this.permission_id : '';
      cs.api(method + " api/System/admin/permissions " + suffix, {
        group: this.group,
        label: this.label
      }).then(function(){
        cs.ui.notify(this$.L.changes_saved, 'success', 5);
      });
    }
  });
}).call(this);

// Generated by LiveScript 1.4.0
/**
 * @package    CleverStyle CMS
 * @subpackage System module
 * @category   modules
 * @author     Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright  Copyright (c) 2015, Nazar Mokrynskyi
 * @license    MIT License, see license.txt
 */
(function(){
  var L, active_switch;
  L = cs.Language;
  active_switch = function(disabled, enabled){
    switch (this.active) {
    case 0:
      return disabled;
    case 1:
      return enabled;
    }
  };
  Polymer({
    'is': 'cs-system-admin-components-plugins-list',
    behaviors: [cs.Polymer.behaviors.Language],
    ready: function(){
      var this$ = this;
      $.getJSON('api/System/admin/plugins', function(plugins){
        plugins.forEach(function(plugin){
          var active_switch_local;
          active_switch_local = active_switch.bind(plugin);
          plugin['class'] = active_switch_local('cs-block-warning cs-text-warning', 'cs-block-success cs-text-success');
          plugin.icon = active_switch_local('minus', 'check');
          plugin.icon_text = active_switch_local(L.disabled, L.enabled);
          plugin.name_localized = L[plugin.name] || plugin.name.replace('_', ' ');
          (function(){
            var i$, ref$, len$, prop, ref1$, tag;
            for (i$ = 0, len$ = (ref$ = ['license', 'readme']).length; i$ < len$; ++i$) {
              prop = ref$[i$];
              if ((ref1$ = plugin[prop]) != null && ref1$.type) {
                tag = plugin[prop].type === 'txt' ? 'pre' : 'div';
                plugin[prop].content = "<" + tag + ">" + plugin[prop].content + "</" + tag + ">";
              }
            }
          })();
          if (plugin.meta) {
            plugin.info = (function(){
              return L.plugin_info(this['package'], this.version, this.description, this.author, this.website || L.none, this.license, this.provide
                ? [].concat(this.provide).join(', ')
                : L.none, this.require
                ? [].concat(this.require).join(', ')
                : L.none, this.conflict
                ? [].concat(this.conflict).join(', ')
                : L.none, this.optional
                ? [].concat(this.optional).join(', ')
                : L.none, this.multilingual && this.multilingual.indexOf('interface') !== -1
                ? L.yes
                : L.no, this.multilingual && this.multilingual.indexOf('content') !== -1
                ? L.yes
                : L.no, this.languages
                ? this.languages.join(', ')
                : L.none);
            }.call(plugin.meta));
          }
        });
        this$.set('plugins', plugins);
      });
    }
  });
}).call(this);

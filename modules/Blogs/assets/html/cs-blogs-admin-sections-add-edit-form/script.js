// Generated by LiveScript 1.4.0
/**
 * @package   Blogs
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2016-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  Polymer({
    is: 'cs-blogs-admin-sections-add-edit-form',
    behaviors: [cs.Polymer.behaviors.Language('blogs_')],
    properties: {
      section: Object,
      original_title: String,
      sections: Array
    },
    ready: function(){
      var this$ = this;
      Promise.all([
        this.id
          ? cs.api('get api/Blogs/admin/sections/' + this.id)
          : {
            title: '',
            path: '',
            parent: 0
          }, cs.api('get api/Blogs/admin/sections')
      ]).then(function(arg$){
        var sections;
        this$.section = arg$[0], sections = arg$[1];
        this$.original_title = this$.section.title;
        this$.sections = sections;
      });
    },
    _save: function(){
      var method, suffix, this$ = this;
      method = this.id ? 'put' : 'post';
      suffix = this.id ? '/' + this.id : '';
      cs.api(method + " api/Blogs/admin/sections" + suffix, this.section).then(function(){
        cs.ui.notify(this$.L.changes_saved, 'success', 5);
      });
    }
  });
}).call(this);

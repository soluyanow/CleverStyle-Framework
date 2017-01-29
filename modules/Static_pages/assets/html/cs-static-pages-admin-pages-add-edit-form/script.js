// Generated by LiveScript 1.4.0
/**
 * @package   Static pages
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2016-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  Polymer({
    is: 'cs-static-pages-admin-pages-add-edit-form',
    behaviors: [cs.Polymer.behaviors.Language('static_pages_')],
    properties: {
      category: Number,
      page: Object,
      original_title: String,
      categories: Array
    },
    observers: ['_category_changed(category)'],
    ready: function(){
      var this$ = this;
      Promise.all([
        this.id
          ? cs.api('get api/Static_pages/admin/pages/' + this.id)
          : {
            category: 0,
            title: '',
            path: '',
            content: '',
            'interface': 1
          }, cs.api('get api/Static_pages/admin/categories')
      ]).then(function(arg$){
        var categories;
        this$.page = arg$[0], categories = arg$[1];
        if (this$.category) {
          this$.set('page.category', this$.category);
        }
        this$.original_title = this$.page.title;
        this$.categories = categories;
      });
    },
    _category_changed: function(){
      if (this.page) {
        this.set('page.category', this.category);
      }
    },
    _save: function(){
      var method, suffix, this$ = this;
      method = this.id ? 'put' : 'post';
      suffix = this.id ? '/' + this.id : '';
      cs.api(method + " api/Static_pages/admin/pages" + suffix, this.page).then(function(){
        cs.ui.notify(this$.L.changes_saved, 'success', 5);
      });
    }
  });
}).call(this);

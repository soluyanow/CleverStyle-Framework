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
    is: 'cs-static-pages-admin-pages-list',
    behaviors: [cs.Polymer.behaviors.Language('static_pages_')],
    properties: {
      category: Number,
      pages: Array
    },
    observers: ['_reload_pages(category)'],
    _reload_pages: function(){
      var this$ = this;
      cs.api("get api/Static_pages/admin/categories/" + this.category + "/pages").then(function(pages){
        this$.set('pages', pages);
      });
    },
    _add: function(){
      cs.ui.simple_modal("<h3>" + this.L.adding_of_page + "</h3>\n<cs-static-pages-admin-pages-add-edit-form category=\"" + this.category + "\"/>").addEventListener('close', bind$(this, '_reload_pages'));
    },
    _edit: function(e){
      var title;
      title = this.L.editing_of_page(e.model.item.title);
      cs.ui.simple_modal("<h2>" + title + "</h2>\n<cs-static-pages-admin-pages-add-edit-form id=\"" + e.model.item.id + "\"/>").addEventListener('close', bind$(this, '_reload_pages'));
    },
    _delete: function(e){
      var this$ = this;
      cs.ui.confirm(this.L.sure_to_delete_page(e.model.item.title)).then(function(){
        return cs.api('delete api/Static_pages/admin/pages/' + e.model.item.id);
      }).then(function(){
        cs.ui.notify(this$.L.changes_saved, 'success', 5);
        this$._reload_pages();
      });
    }
  });
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);

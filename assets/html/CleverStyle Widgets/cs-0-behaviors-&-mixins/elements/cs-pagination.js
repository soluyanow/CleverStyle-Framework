// Generated by LiveScript 1.5.0
/**
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  csw.behaviors.csPagination = [{
    hostAttributes: {
      role: 'group'
    },
    properties: {
      page: {
        notify: true,
        reflectToAttribute: true,
        type: Number
      },
      pages: {
        reflectToAttribute: true,
        type: Number
      },
      pages_list: Array
    },
    _pages_list: function(page, pages){
      var pages_list, render_one, i$, i, to$;
      if (!page || !pages) {
        return;
      }
      pages_list = [];
      render_one = this._render_one.bind(this, pages_list, page);
      if (pages <= 11) {
        for (i$ = 1; i$ <= pages; ++i$) {
          i = i$;
          render_one(i);
        }
      } else if (page <= 6) {
        for (i$ = 1; i$ <= 7; ++i$) {
          i = i$;
          render_one(i);
        }
        render_one(0, '...');
        for (i$ = pages - 2; i$ <= pages; ++i$) {
          i = i$;
          render_one(i);
        }
      } else if (page >= pages - 5) {
        for (i$ = 1; i$ <= 3; ++i$) {
          i = i$;
          render_one(i);
        }
        render_one(0, '...');
        for (i$ = pages - 6; i$ <= pages; ++i$) {
          i = i$;
          render_one(i);
        }
      } else {
        for (i$ = 1; i$ <= 2; ++i$) {
          i = i$;
          render_one(i);
        }
        render_one(0, '...');
        for (i$ = page - 2, to$ = page + 2; i$ <= to$; ++i$) {
          i = i$;
          render_one(i);
        }
        render_one(0, '...');
        for (i$ = pages - 1; i$ <= pages; ++i$) {
          i = i$;
          render_one(i);
        }
      }
      pages_list[0].first = true;
      pages_list[pages_list.length - 1].last = true;
      return pages_list;
    },
    _render_one: function(pages_list, page, i, text){
      pages_list.push({
        text: text || i,
        active: i === page,
        disabled: !i
      });
    },
    _set_page: function(e){
      this.page = e.model.item.text;
    },
    next: function(){
      if (this.page < this.pages) {
        this.page++;
      }
    },
    prev: function(){
      if (this.page > 1) {
        this.page--;
      }
    }
  }];
}).call(this);

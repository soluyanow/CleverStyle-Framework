// Generated by CoffeeScript 1.9.3

/**
 * @package   Shop
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2014-2015, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */

(function() {
  Polymer({
    'is': 'cs-shop-category-item',
    'extends': 'article',
    properties: {
      href: String,
      price: String,
      item_id: Number,
      in_stock: String
    },
    ready: function() {
      (function(_this) {
        return (function(img) {
          _this.$.img.src = img.src;
          return _this.$.img.title = img.title;
        });
      })(this)(this.querySelector('#img'));
      this.set('href', this.querySelector('#link').href);
      return this.set('price', sprintf(cs.shop.settings.price_formatting, this.price));
    }
  });

}).call(this);

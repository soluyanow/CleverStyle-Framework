// Generated by LiveScript 1.4.0
/**
 * @package   Shop
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2014-2016, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  var cart, price_formatting;
  cart = cs.shop.cart;
  price_formatting = cs.shop.settings.price_formatting;
  Polymer({
    is: 'cs-shop-cart-item',
    properties: {
      item_id: Number,
      unit_price: Number,
      units: Number,
      href: String,
      item_title: String,
      unit_price_formatted: String,
      price_formatted: String
    },
    observers: ['units_changed(item_id, units)'],
    attached: function(){
      var link, this$ = this;
      (function(img){
        this.$.img.src = img.src;
        this.$.img.title = img.title;
      }.call(this, this.querySelector('#img')));
      link = this.querySelector('#link');
      this.href = link.href;
      this.item_title = link.textContent;
      require(['sprintf-js'], function(arg$){
        var sprintf;
        sprintf = arg$.sprintf;
        this$.unit_price_formatted = sprintf(price_formatting, this$.unit_price);
      });
    },
    units_changed: function(item_id, units){
      var this$ = this;
      if (!item_id) {
        return;
      }
      if (parseInt(units)) {
        cart.set(item_id, units);
      } else {
        cart.del(item_id);
        this.recalculate(0, 0);
        return;
      }
      clearTimeout(this._recalculate_interval);
      this._recalculate_interval = setTimeout(function(){
        cart.get_calculated(function(data){
          data.items.forEach(function(item){
            if (parseInt(item.id) == item_id) {
              this$.recalculate(item.price, units);
              return false;
            }
          });
        });
      }, !this.price_formatted ? 0 : 100);
    },
    recalculate: function(price, units){
      var this$ = this;
      require(['sprintf-js'], function(arg$){
        var sprintf, discount;
        sprintf = arg$.sprintf;
        this$.price_formatted = sprintf(price_formatting, price);
        discount = units * this$.unit_price - price;
        cs.Language('shop_').ready().then(function(L){
          var discount;
          this$.$.discount.textContent = discount ? (discount = sprintf(price_formatting, discount), "(" + L.discount + ": " + discount + ")") : '';
        });
      });
    }
  });
}).call(this);

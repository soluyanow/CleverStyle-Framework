// Generated by LiveScript 1.5.0
/**
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  Polymer.cs.behaviors.csSelect = [
    Polymer.cs.behaviors.compact, Polymer.cs.behaviors.fullWidth, Polymer.cs.behaviors.ready, Polymer.cs.behaviors.size, Polymer.cs.behaviors.tight, Polymer.cs.behaviors['this'], Polymer.cs.behaviors.tooltip, Polymer.cs.behaviors.value, Polymer.cs.behaviors.injectLightStyles, {
      _styles_dom_module: 'cs-select-styles',
      properties: {
        selected: {
          notify: true,
          observer: '_selected_changed',
          type: Object
        }
      },
      ready: function(){
        var timeout, callback, this$ = this;
        this._when_ready(bind$(this, '_scroll_to_selected'));
        timeout = null;
        callback = function(){
          var timeout, height_in_px, font_size;
          this$._select = this$.querySelector('select');
          this$._select.addEventListener('value-changed', bind$(this$, '_value_changed'));
          if (this$.selected === undefined) {
            this$.selected = this$._select.value;
          }
          clearTimeout(timeout);
          timeout = setTimeout(function(){
            this$.removeEventListener('dom-change', callback);
            if (this$.selected !== undefined) {
              this$._selected_changed(this$.selected);
            }
          }, 100);
          if (this$._height_updated) {
            return;
          }
          if (this$._select.size <= 1) {
            this$._height_updated = true;
            return;
          }
          if (this$.querySelectorAll('option').length) {
            height_in_px = this$.querySelector('option').getBoundingClientRect().height * this$._select.size;
            if (height_in_px === 0) {
              return;
            }
            this$._height_updated = true;
            font_size = parseFloat(getComputedStyle(this$._select).fontSize);
            this$._select.style.height = "calc(" + height_in_px + "em / " + font_size + ")";
          }
        };
        this.addEventListener('dom-change', callback);
      },
      _scroll_to_selected: function(){
        var option, option_height, select_height;
        option = this.querySelector('option');
        if (!option) {
          return;
        }
        option_height = option.getBoundingClientRect().height;
        if (this._select.size > 1 && this._select.selectedOptions[0]) {
          this._select.scrollTop = option_height * (this._select.selectedIndex - Math.floor(this._select.size / 2)) + this._number_of_optgroups();
        }
        select_height = this._select.getBoundingClientRect().height;
        if (select_height >= option_height * (this.querySelectorAll('option').length + this.querySelectorAll('optgroup').length)) {
          this._select.style.overflowY = 'auto';
        }
      },
      _number_of_optgroups: function(){
        var optgroup, count;
        optgroup = this._select.selectedOptions[0].parentNode;
        count = 0;
        if (optgroup.matches('optgroup')) {
          while (optgroup) {
            ++count;
            optgroup = optgroup.previousElementSibling;
          }
        }
        return count;
      },
      _value_changed: function(){
        var selected;
        selected = [];
        Array.prototype.forEach.call(this._select.selectedOptions, function(option){
          return selected.push(option.value);
        });
        if (!this._select.multiple) {
          selected = selected[0];
        }
        this.set('selected', selected);
      },
      _selected_changed: function(selected){
        if (selected === undefined) {
          return;
        }
        selected = selected instanceof Array
          ? selected.map(String)
          : String(selected);
        Array.prototype.forEach.call(this.querySelectorAll('option'), function(option){
          return option.selected = selected === option.value || (selected instanceof Array && selected.indexOf(option.value) !== -1);
        });
        this.fire('selected');
      }
    }
  ];
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);

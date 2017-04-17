// Generated by LiveScript 1.5.0
/**
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  Polymer.cs.behaviors.csProgress = [
    Polymer.cs.behaviors.fullWidth, Polymer.cs.behaviors.tight, Polymer.cs.behaviors.tooltip, Polymer.cs.behaviors.injectLightStyles, {
      _styles_dom_module: 'cs-progress-styles',
      properties: {
        infinite: Boolean,
        primary: {
          reflectToAttribute: true,
          type: Boolean
        },
        textProgress: {
          type: Boolean,
          value: false
        },
        value: {
          observer: '_value_changed',
          reflectToAttribute: true,
          type: Number
        }
      },
      attached: function(){
        var value, update_progress, this$ = this;
        if (!this.firstElementChild.getAttribute('max')) {
          this.firstElementChild.max = 100;
        }
        value = this.firstElementChild.getAttribute('value');
        if (!this.value) {
          this.value = value || 0;
        } else {
          this.firstElementChild.setAttribute('value', this.value);
        }
        if (this.infinite) {
          update_progress = function(){
            if (!this$.parentNode) {
              return;
            }
            this$.value = (this$.value + 9) % this$.firstElementChild.max;
            this$.firstElementChild.value = this$.value;
            setTimeout(update_progress, 200);
          };
          update_progress();
        }
      },
      _value_changed: function(){
        var ref$;
        if ((ref$ = this.firstElementChild) != null) {
          ref$.value = this.value;
        }
      }
    }
  ];
}).call(this);

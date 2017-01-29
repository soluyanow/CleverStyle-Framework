// Generated by LiveScript 1.4.0
/**
 * @package   CleverStyle Framework
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2016-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  var registerFeatures_original, ready;
  registerFeatures_original = Polymer.Base._registerFeatures;
  ready = false;
  Polymer.Base._addFeature({
    _registerFeatures: function(){
      (this.behaviors || (this.behaviors = [])).push({
        attached: function(){
          var this$ = this;
          if (ready) {
            return;
          }
          this.setAttribute('cs-resolved', '');
          cs.ui.ready.then(function(){
            ready = true;
            this$.removeAttribute('cs-resolved');
          });
        }
      });
      registerFeatures_original.call(this);
    }
  });
}).call(this);

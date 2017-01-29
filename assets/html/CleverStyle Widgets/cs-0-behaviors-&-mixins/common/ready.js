// Generated by LiveScript 1.4.0
/**
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2016-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  var ref$;
  ((ref$ = Polymer.cs || (Polymer.cs = {})).behaviors || (ref$.behaviors = {})).ready = {
    _when_ready: function(action){
      var callback;
      if (document.readyState !== 'complete') {
        callback = function(){
          setTimeout(action);
          document.removeEventListener('WebComponentsReady', callback);
        };
        document.addEventListener('WebComponentsReady', callback);
      } else {
        setTimeout(action);
      }
    }
  };
}).call(this);

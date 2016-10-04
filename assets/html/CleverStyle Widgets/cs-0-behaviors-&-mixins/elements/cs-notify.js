// Generated by LiveScript 1.4.0
/**
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2016, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  var promise;
  promise = new Promise(Polymer.cs.behaviors.ready._when_ready);
  Polymer.cs.behaviors.csNotify = [
    Polymer.cs.behaviors.ready, Polymer.cs.behaviors['this'], {
      properties: {
        bottom: {
          reflectToAttribute: true,
          type: Boolean
        },
        content: String,
        error: {
          reflectToAttribute: true,
          type: Boolean
        },
        left: {
          reflectToAttribute: true,
          type: Boolean
        },
        noIcon: {
          reflectToAttribute: true,
          type: Boolean
        },
        right: {
          reflectToAttribute: true,
          type: Boolean
        },
        show: {
          reflectToAttribute: true,
          type: Boolean
        },
        success: {
          reflectToAttribute: true,
          type: Boolean
        },
        timeout: Number,
        top: {
          reflectToAttribute: true,
          type: Boolean
        },
        warning: {
          reflectToAttribute: true,
          type: Boolean
        }
      },
      listeners: {
        'content.tap': '_tap'
      },
      attached: function(){
        this.last_node = this.parentNode;
        if (!this.parentNode.matches('html')) {
          document.documentElement.appendChild(this);
          return;
        }
        if (!this.bottom && !this.top) {
          this.top = true;
        }
        setTimeout(bind$(this, '_show'));
      },
      _tap: function(e){
        if (e.target === this.$.content || e.target === this.$.icon) {
          this._hide();
        }
      },
      _show: function(){
        var this$ = this;
        promise = promise.then(function(){
          if (this$.content) {
            this$.innerHTML = this$.content;
          }
          this$._for_similar(function(child){
            var interesting_margin;
            interesting_margin = this$.top ? 'marginTop' : 'marginBottom';
            if (child !== this$ && parseFloat(child.style[interesting_margin] || 0) >= parseFloat(this$.style[interesting_margin] || 0)) {
              child._shift();
            }
          });
          this$._initialized = true;
          this$.show = true;
          this$.fire('show');
          return new Promise(function(resolve){
            setTimeout(function(){
              if (this$.timeout) {
                setTimeout(bind$(this$, '_hide'), this$.timeout * 1000);
              }
              resolve();
            }, this$._transition_duration());
          });
        });
      },
      _hide: function(){
        var this$ = this;
        promise = promise.then(function(){
          var interesting_margin;
          this$.show = false;
          interesting_margin = this$.top ? 'marginTop' : 'marginBottom';
          this$._for_similar(function(child){
            if (parseFloat(child.style[interesting_margin] || 0) > parseFloat(this$.style[interesting_margin] || 0)) {
              child._unshift();
            }
          });
          this$.fire('hide');
          return new Promise(function(resolve){
            setTimeout(function(){
              var ref$;
              if ((ref$ = this$.parentNode) != null) {
                ref$.removeChild(this$);
              }
              resolve();
            }, this$._transition_duration());
          });
        });
      },
      _for_similar: function(callback){
        var tagName, bottom, left, right, top, i$, ref$, len$, child;
        tagName = this.tagName;
        bottom = this.bottom;
        left = this.left;
        right = this.right;
        top = this.top;
        for (i$ = 0, len$ = (ref$ = document.querySelector('html').children).length; i$ < len$; ++i$) {
          child = ref$[i$];
          if (child !== this && child.is === this.is && child.show && child.tagName === tagName && child.bottom === bottom && child.left === left && child.right === right && child.top === top) {
            callback(child);
          }
        }
      },
      _shift: function(){
        var style;
        style = getComputedStyle(this);
        if (this.top) {
          this.style.marginTop = parseFloat(style.marginTop) + parseFloat(style.height) + 'px';
        } else {
          this.style.marginBottom = parseFloat(style.marginBottom) + parseFloat(style.height) + 'px';
        }
      },
      _unshift: function(){
        var style;
        style = getComputedStyle(this);
        if (this.top) {
          this.style.marginTop = parseFloat(style.marginTop) - parseFloat(style.height) + 'px';
        } else {
          this.style.marginBottom = parseFloat(style.marginBottom) - parseFloat(style.height) + 'px';
        }
      },
      _transition_duration: function(){
        var transitionDuration;
        transitionDuration = getComputedStyle(this).transitionDuration;
        if (transitionDuration.substr(-2) === 'ms') {
          return parseFloat(transitionDuration);
        } else {
          return transitionDuration = parseFloat(transitionDuration) * 1000;
        }
      }
    }
  ];
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
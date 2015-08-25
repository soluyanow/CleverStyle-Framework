// Generated by CoffeeScript 1.9.3

/**
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */

(function() {
  var body, html;

  body = document.body;

  html = body.parentNode;

  Polymer({
    'is': 'cs-section-modal',
    'extends': 'section',
    behaviors: [Polymer.cs.behaviors["this"], Polymer.cs.behaviors.tooltip],
    properties: {
      content: String,
      opened: {
        observer: '_opened_changed',
        reflectToAttribute: true,
        type: Boolean
      },
      transparent: {
        reflectToAttribute: true,
        type: Boolean
      }
    },
    created: function() {
      this._esc_handler = (function(_this) {
        return function(e) {
          if (e.keyCode === 27) {
            _this.close();
          }
        };
      })(this);
    },
    _opened_changed: function() {
      if (!this._attached_to_html) {
        this._attached_to_html = true;
        body.parentNode.appendChild(this);
      }
      body.modalOpened = body.modalOpened || 0;
      if (this.opened) {
        document.addEventListener('keydown', this._esc_handler);
        if (this.content) {
          this.innerHTML = this.content;
          this.content = null;
        }
        ++body.modalOpened;
        this.fire('open');
        document.body.setAttribute('modal-opened', '');
      } else {
        document.removeEventListener('keydown', this._esc_handler);
        --body.modalOpened;
        this.fire('close');
        if (!body.modalOpened) {
          document.body.removeAttribute('modal-opened');
        }
      }
    },
    open: function() {
      if (!this.opened) {
        if (!this._attached_to_html) {
          this._attached_to_html = true;
          body.parentNode.appendChild(this);
          setTimeout(this.open.bind(this), 0);
        } else {
          this.opened = true;
        }
      }
      return this;
    },
    close: function() {
      if (this.opened) {
        this.opened = false;
      }
      return this;
    }
  });

}).call(this);

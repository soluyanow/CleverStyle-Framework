// Generated by LiveScript 1.5.0
/**
 * @package   CleverStyle Framework
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2011-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  /**
   * Simple function for XHR requests to API wrapped in promise
   *
   * @param {string} method_path Whitespace-separated method and path for API call
   * @param {object} data Data to be passed with request
   *
   * @return {Promise}
   */
  var object_to_query, x$;
  object_to_query = function(data, prefix){
    var query, res$, param, value;
    res$ = [];
    for (param in data) {
      value = data[param];
      if (value instanceof Object) {
        res$.push(object_to_query(value, param));
      } else {
        if (prefix) {
          res$.push(encodeURIComponent(prefix + "[" + param + "]") + '=' + encodeURIComponent(value));
        } else {
          res$.push(encodeURIComponent(param) + '=' + encodeURIComponent(value));
        }
      }
    }
    query = res$;
    return query.join('&');
  };
  cs.api = function(method_path, data){
    var mp, ref$, method, path;
    if (method_path instanceof Array) {
      return Promise.all((function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = method_path).length; i$ < len$; ++i$) {
          mp = ref$[i$];
          results$.push(cs.api(mp));
        }
        return results$;
      }()));
    }
    ref$ = method_path.split(/\s+/, 2), method = ref$[0], path = ref$[1];
    return new Promise(function(resolve, reject){
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.onload = function(){
        if (this.status >= 400) {
          this.onerror();
        } else {
          resolve(JSON.parse(this.responseText));
        }
      };
      xhr.onerror = function(){
        var timeout, this$ = this;
        timeout = setTimeout(function(){
          if (this$.responseText) {
            cs.ui.notify(JSON.parse(this$.responseText).error_description, 'warning', 5);
          } else {
            cs.Language.ready().then(function(L){
              cs.ui.notify(L.system_server_connection_error, 'warning', 5);
            });
          }
        });
        reject({
          timeout: timeout,
          xhr: xhr
        });
      };
      xhr.onabort = xhr.onerror;
      if (method.toLowerCase() === 'get' && data) {
        path += '?' + object_to_query(data);
        data = undefined;
      }
      xhr.open(method.toUpperCase(), path);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if (data instanceof HTMLFormElement) {
        xhr.send(new FormData(data));
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  };
  /**
   * Supports algorithms sha1, sha224, sha256, sha384, sha512
   *
   * @param {Function} jssha jsSHA object
   * @param {string}   algo Chosen algorithm
   * @param {string}   data String to be hashed
   * @return {string}
   */
  cs.hash = function(jssha, algo, data){
    var shaObj;
    algo = (function(){
      switch (algo) {
      case 'sha1':
        return 'SHA-1';
      case 'sha224':
        return 'SHA-224';
      case 'sha256':
        return 'SHA-256';
      case 'sha384':
        return 'SHA-384';
      case 'sha512':
        return 'SHA-512';
      default:
        return algo;
      }
    }());
    shaObj = new jssha(algo, 'TEXT');
    shaObj.update(data);
    return shaObj.getHash('HEX');
  };
  /**
   * Sign in into system
   *
   * @param {string} login
   * @param {string} password
   */
  cs.sign_in = function(login, password){
    login = String(login).toLowerCase();
    password = String(password);
    Promise.all([require(['jssha']), cs.api('configuration api/System/profile')]).then(function(arg$){
      var jssha, configuration;
      jssha = arg$[0][0], configuration = arg$[1];
      login = cs.hash(jssha, 'sha224', login);
      password = cs.hash(jssha, 'sha512', cs.hash(jssha, 'sha512', password) + configuration.public_key);
      return cs.api('sign_in api/System/profile', {
        login: login,
        password: password
      });
    }).then(bind$(location, 'reload'));
  };
  /**
   * Sign out
   */
  cs.sign_out = function(){
    cs.api('sign_out api/System/profile').then(bind$(location, 'reload'));
  };
  /**
   * Registration in the system
   *
   * @param {string} email
   */
  cs.registration = function(email){
    cs.Language('system_profile_').ready().then(function(L){
      var email, xhr;
      if (!email) {
        cs.ui.alert(L.registration_please_type_your_email);
        return;
      }
      email = String(email).toLowerCase();
      xhr = new XMLHttpRequest();
      xhr.onload = function(){
        switch (this.status) {
        case 201:
          cs.ui.simple_modal('<div>' + L.registration_success + '</div>');
          break;
        case 202:
          cs.ui.simple_modal('<div>' + L.registration_confirmation + '</div>');
          break;
        default:
          this.onerror();
        }
      };
      xhr.onerror = function(){
        cs.ui.notify(this.responseText
          ? JSON.parse(this.responseText).error_description
          : L.system_server_connection_error, 'warning', 5);
      };
      xhr.onabort = xhr.onerror;
      xhr.open('registration'.toUpperCase(), 'api/System/profile');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        email: email
      }));
    });
  };
  /**
   * Password restoring
   *
   * @param {string} email
   */
  cs.restore_password = function(email){
    cs.Language('system_profile_').ready().then(function(L){
      var email;
      if (!email) {
        cs.ui.alert(L.restore_password_please_type_your_email);
        return;
      }
      email = String(email).toLowerCase();
      require(['jssha']).then(function(arg$){
        var jssha;
        jssha = arg$[0];
        email = cs.hash(jssha, 'sha224', email);
        return cs.api('restore_password api/System/profile', {
          email: email
        });
      }).then(function(){
        cs.ui.simple_modal('<div>' + L.restore_password_confirmation + '</div>');
      });
    });
  };
  /**
   * Password changing
   *
   * @param {string}   current_password
   * @param {string}   new_password
   * @param {Function} success
   * @param {Function} error
   */
  cs.change_password = function(current_password, new_password, success, error){
    cs.Language('system_profile_').ready().then(function(L){
      if (!current_password) {
        cs.ui.alert(L.please_type_current_password);
        return;
      } else if (!new_password) {
        cs.ui.alert(L.please_type_new_password);
        return;
      } else if (current_password === new_password) {
        cs.ui.alert(L.current_new_password_equal);
        return;
      }
      Promise.all([require(['jssha']), cs.api('configuration api/System/profile')]).then(function(arg$){
        var jssha, configuration;
        jssha = arg$[0][0], configuration = arg$[1];
        if (String(new_password).length < configuration.password_min_length) {
          cs.ui.alert(L.password_too_short);
          return;
        } else if (cs.password_check(new_password) < configuration.password_min_strength) {
          cs.ui.alert(L.password_too_easy);
          return;
        }
        current_password = cs.hash(jssha, 'sha512', cs.hash(jssha, 'sha512', String(current_password)) + configuration.public_key);
        new_password = cs.hash(jssha, 'sha512', cs.hash(jssha, 'sha512', String(new_password)) + configuration.public_key);
        return cs.api('change_password api/System/profile', {
          current_password: current_password,
          new_password: new_password
        });
      }).then(function(){
        if (success) {
          success();
        } else {
          cs.ui.alert(L.password_changed_successfully);
        }
      })['catch'](function(o){
        if (error) {
          clearTimeout(o.timeout);
          error();
        }
      });
    });
  };
  /**
   * Check password strength
   *
   * @param	string	password
   * @param	int		min_length
   *
   * @return	int		In range [0..7]<br><br>
   * 					<b>0</b> - short password<br>
   * 					<b>1</b> - numbers<br>
   *  				<b>2</b> - numbers + letters<br>
   * 					<b>3</b> - numbers + letters in different registers<br>
   * 		 			<b>4</b> - numbers + letters in different registers + special symbol on usual keyboard +=/^ and others<br>
   * 					<b>5</b> - numbers + letters in different registers + special symbols (more than one)<br>
   * 					<b>6</b> - as 5, but + special symbol, which can't be found on usual keyboard or non-latin letter<br>
   * 					<b>7</b> - as 5, but + special symbols, which can't be found on usual keyboard or non-latin letter (more than one symbol)<br>
   */
  cs.password_check = function(password, min_length){
    var strength, matches;
    password = new String(password);
    min_length = min_length || 4;
    password = password.replace(/\s+/g, ' ');
    strength = 0;
    if (password.length >= min_length) {
      matches = password.match(/[~!@#\$%\^&\*\(\)\-_=+\|\\/;:,\.\?\[\]\{\}]/g);
      if (matches) {
        strength = 4;
        if (matches.length > 1) {
          ++strength;
        }
      } else {
        if (/[A-Z]+/.test(password)) {
          ++strength;
        }
        if (/[a-z]+/.test(password)) {
          ++strength;
        }
        if (/[0-9]+/.test(password)) {
          ++strength;
        }
      }
      matches = password.match(/[^0-9a-z~!@#\$%\^&\*\(\)\-_=+\|\\/;:,\.\?\[\]\{\}]/ig);
      if (matches) {
        ++strength;
        if (matches.length > 1) {
          ++strength;
        }
      }
    }
    return strength;
  };
  x$ = cs.ui || (cs.ui = {});
  /**
   * Modal dialog
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {HTMLElement}
   */
  x$.modal = function(content){
    var modal;
    modal = document.createElement('section', 'cs-section-modal');
    if (typeof content === 'string' || content instanceof Function) {
      modal.innerHTML = content;
    } else {
      if ('jquery' in content) {
        content.appendTo(modal);
      } else {
        modal.appendChild(content);
      }
    }
    document.documentElement.appendChild(modal);
    return modal;
  };
  /**
   * Simple modal dialog that will be opened automatically and destroyed after closing
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {HTMLElement}
   */
  x$.simple_modal = function(content){
    var x$;
    x$ = cs.ui.modal(content);
    x$.autoDestroy = true;
    x$.open();
    return x$;
  };
  /**
   * Alert modal
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {Promise}
   */
  x$.alert = function(content){
    if (content instanceof Function) {
      content = content.toString();
    }
    if (typeof content === 'string' && content.indexOf('<') === -1) {
      content = "<h3>" + content + "</h3>";
    }
    return new Promise(function(resolve){
      var x$, modal, y$, ok, z$, ok_button, z1$;
      x$ = modal = cs.ui.modal(content);
      x$.autoDestroy = true;
      x$.manualClose = true;
      y$ = ok = document.createElement('cs-button');
      y$.innerHTML = '<button>OK</button>';
      y$.primary = true;
      y$.action = 'close';
      y$.bind = modal;
      z$ = ok_button = ok.firstElementChild;
      z$.addEventListener('click', function(){
        resolve();
      });
      z1$ = modal;
      z1$.ok = ok_button;
      z1$.appendChild(ok);
      z1$.open();
      ok_button.focus();
    });
  };
  /**
   * Confirm modal
   *
   * @param {(HTMLElement|jQuery|string)} content
   * @param {Function}                    ok_callback
   * @param {Function}                    cancel_callback
      *
   * @return {(HTMLElement|Promise)}
   */
  x$.confirm = function(content, ok_callback, cancel_callback){
    var x$, modal, y$, ok, z$, ok_button, z1$, cancel, z2$, cancel_button, z3$;
    if (content instanceof Function) {
      content = content.toString();
    }
    if (typeof content === 'string' && content.indexOf('<') === -1) {
      content = "<h3>" + content + "</h3>";
    }
    x$ = modal = cs.ui.modal(content);
    x$.autoDestroy = true;
    x$.manualClose = true;
    y$ = ok = document.createElement('cs-button');
    y$.innerHTML = '<button>OK</button>';
    y$.primary = true;
    y$.action = 'close';
    y$.bind = modal;
    z$ = ok_button = ok.firstElementChild;
    z$.addEventListener('click', function(){
      if (typeof ok_callback == 'function') {
        ok_callback();
      }
    });
    z1$ = cancel = document.createElement('cs-button');
    z1$.innerHTML = '<button>Cancel</button>';
    z1$.action = 'close';
    z1$.bind = modal;
    z2$ = cancel_button = cancel.firstElementChild;
    z2$.addEventListener('click', function(){
      if (typeof cancel_callback == 'function') {
        cancel_callback();
      }
    });
    z3$ = modal;
    z3$.ok = ok_button;
    z3$.cancel = cancel_button;
    z3$.appendChild(ok);
    z3$.appendChild(cancel);
    z3$.open();
    ok_button.focus();
    cs.Language.ready().then(function(L){
      if (cancel_button.innerHTML === 'Cancel') {
        cancel_button.innerHTML = L.system_admin_cancel;
      }
    });
    if (ok_callback) {
      return modal;
    } else {
      return new Promise(function(resolve, reject){
        ok_button.addEventListener('click', function(){
          resolve();
        });
        cancel_button.addEventListener('click', function(){
          reject();
        });
      });
    }
  };
  /**
   * Prompt modal
   *
   * `ok_callback` will be called or Promise will be resolved with value that user enter in text field
   *
   * @param {(HTMLElement|jQuery|string)} content
   * @param {Function}                    ok_callback
   * @param {Function}                    cancel_callback
      *
   * @return {(HTMLElement|Promise)}
   */
  x$.prompt = function(content, ok_callback, cancel_callback){
    var modal, x$, input, ok, cancel;
    if (content instanceof Function) {
      content = content.toString();
    }
    if (typeof content === 'string' && content.indexOf('<') === -1) {
      content = "<h3>" + content + "</h3>";
    }
    modal = cs.ui.confirm("" + content + "\n<p><cs-input-text><input type=\"text\"></cs-input-text></p>", function(){});
    x$ = modal.input = modal.querySelector('input');
    x$.focus();
    input = modal.input, ok = modal.ok, cancel = modal.cancel;
    if (ok_callback) {
      ok.addEventListener('click', function(){
        ok_callback(input.value);
      });
      cancel.addEventListener('click', function(){
        if (typeof cancel_callback == 'function') {
          cancel_callback();
        }
      });
      return modal;
    } else {
      return new Promise(function(resolve, reject){
        ok.addEventListener('click', function(){
          resolve(input.value);
        });
        cancel.addEventListener('click', function(){
          reject();
        });
      });
    }
  };
  /**
   * Notify
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {HTMLElement}
   */
  x$.notify = function(content){
    var options, res$, i$, to$, notify, len$, option;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    options = res$;
    notify = document.createElement('cs-notify');
    if (typeof content === 'string' || content instanceof Function) {
      notify.innerHTML = content;
    } else {
      if ('jquery' in content) {
        content.appendTo(notify);
      } else {
        notify.appendChild(content);
      }
    }
    for (i$ = 0, len$ = options.length; i$ < len$; ++i$) {
      option = options[i$];
      switch (typeof option) {
      case 'string':
        notify[option] = true;
        break;
      case 'number':
        notify.timeout = option;
      }
    }
    document.documentElement.appendChild(notify);
    return notify;
  };
  x$.ready = new Promise(function(resolve){
    var callback;
    if (document.readyState !== 'complete') {
      callback = function(){
        setTimeout(resolve);
        document.removeEventListener('WebComponentsReady', callback);
      };
      document.addEventListener('WebComponentsReady', callback);
    } else {
      setTimeout(resolve);
    }
  });
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);

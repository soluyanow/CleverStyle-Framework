// Generated by LiveScript 1.5.0
/**
 * @package    CleverStyle Framework
 * @subpackage System module
 * @category   modules
 * @author     Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright  Copyright (c) 2015-2017, Nazar Mokrynskyi
 * @license    MIT License, see license.txt
 */
(function(){
  var active_switch;
  active_switch = function(active, if_uninstalled, if_disabled, if_enabled){
    switch (active) {
    case -1:
      return if_uninstalled;
    case 0:
      return if_disabled;
    case 1:
      return if_enabled;
    }
  };
  Polymer({
    is: 'cs-system-admin-modules-list',
    behaviors: [cs.Polymer.behaviors.Language('system_admin_modules_'), cs.Polymer.behaviors.admin.System.components, cs.Polymer.behaviors.admin.System.upload],
    properties: {
      default_module: String
    },
    ready: function(){
      this.reload();
    },
    reload: function(){
      var this$ = this;
      Promise.all([cs.api(['get			api/System/admin/modules', 'get			api/System/admin/modules/default', 'get_settings	api/System/admin/system']), cs.Language.ready()]).then(function(arg$){
        var ref$, modules, default_module, settings, texts, i$, len$, module, is_default, enabled, installed, ref1$, j$, ref2$, len1$, prop, ref3$, tag;
        ref$ = arg$[0], modules = ref$[0], default_module = ref$[1], settings = ref$[2];
        texts = {
          uninstalled: this$.L.uninstalled,
          disabled: this$.L.disabled,
          default_module: this$.L.default_module,
          enabled: this$.L.enabled
        };
        for (i$ = 0, len$ = modules.length; i$ < len$; ++i$) {
          module = modules[i$];
          is_default = module.name === default_module;
          module['class'] = active_switch(module.active, 'cs-block-error cs-text-error', 'cs-block-warning cs-text-warning', 'cs-block-success cs-text-success');
          module.icon = active_switch(module.active, 'times', 'minus', is_default ? 'home' : 'check');
          module.icon_text = active_switch(module.active, texts.uninstalled, texts.disabled, is_default
            ? texts.default_module
            : texts.enabled);
          module.name_localized = this$.L[module.name] || module.name.replace(/_/g, ' ');
          enabled = module.active == 1;
          installed = module.active != -1;
          module.can_disable = enabled && module.name !== 'System';
          module.administration = module.has_admin_section && installed;
          module.db_settings = !settings.simple_admin_mode && installed && ((ref$ = module.meta) != null ? ref$.db : void 8);
          module.storage_settings = !settings.simple_admin_mode && installed && ((ref1$ = module.meta) != null ? ref1$.storage : void 8);
          module.can_be_set_as_default = enabled && !is_default && module.has_user_section;
          for (j$ = 0, len1$ = (ref2$ = ['api', 'license', 'readme']).length; j$ < len1$; ++j$) {
            prop = ref2$[j$];
            if ((ref3$ = module[prop]) != null && ref3$.type) {
              tag = module[prop].type === 'txt' ? 'pre' : 'div';
              module[prop].content = "<" + tag + ">" + module[prop].content + "</" + tag + ">";
            }
          }
          if (module.meta) {
            module.info = this$._get_module_info(module.meta);
          }
        }
        this$.default_module = default_module;
        this$.set('modules', modules);
      });
    },
    _get_module_info: function(meta){
      var none, _yes, _no;
      none = this.L.none;
      _yes = this.L.yes;
      _no = this.L.no;
      return this.L.module_info(meta['package'], meta.version, meta.description, meta.author, meta.website || none, meta.license, meta.db_support ? meta.db_support.join(', ') : none, meta.storage_support ? meta.storage_support.join(', ') : none, meta.provide ? [].concat(meta.provide).join(', ') : none, meta.require ? [].concat(meta.require).join(', ') : none, meta.conflict ? [].concat(meta.conflict).join(', ') : none, meta.optional ? [].concat(meta.optional).join(', ') : none, meta.multilingual && meta.multilingual.indexOf('interface') !== -1 ? _yes : _no, meta.multilingual && meta.multilingual.indexOf('content') !== -1 ? _yes : _no, meta.languages ? meta.languages.join(', ') : none);
    }
    /**
     * Provides next events:
     *  admin/System/modules/default/before
     *  {name : module_name}
     *
     *  admin/System/modules/default/after
     *  {name : module_name}
     */,
    _set_as_default: function(e){
      var module, this$ = this;
      module = e.model.module.name;
      cs.Event.fire('admin/System/modules/default/before', {
        name: module
      }).then(function(){
        return cs.api('put api/System/admin/modules/default', {
          module: module
        });
      }).then(function(){
        this$.reload();
        cs.ui.notify(this$.L.changes_saved, 'success', 5);
        cs.Event.fire('admin/System/modules/default/after', {
          name: module
        });
      });
    }
    /**
     * Provides next events:
     *  admin/System/modules/enable/before
     *  {name : module_name}
     *
     *  admin/System/modules/enable/after
     *  {name : module_name}
     */,
    _enable: function(e){
      this._enable_module(e.model.module.name, e.model.module.meta);
    }
    /**
     * Provides next events:
     *  admin/System/modules/disable/before
     *  {name : module_name}
     *
     *  admin/System/modules/disable/after
     *  {name : module_name}
     */,
    _disable: function(e){
      this._disable_module(e.model.module.name);
    }
    /**
     * Provides next events:
     *  admin/System/modules/install/before
     *  {name : module_name}
     *
     *  admin/System/modules/install/after
     *  {name : module_name}
     */,
    _install: function(e){
      var module, meta, this$ = this;
      module = e.model.module.name;
      meta = e.model.module.meta;
      Promise.all([cs.api(["get			api/System/admin/modules/" + module + "/dependencies", 'get			api/System/admin/databases', 'get			api/System/admin/storages', 'get_settings	api/System/admin/system']), cs.Language('system_admin_').ready()]).then(function(arg$){
        var ref$, dependencies, databases, storages, settings, L, message, message_more, form, modal;
        ref$ = arg$[0], dependencies = ref$[0], databases = ref$[1], storages = ref$[2], settings = ref$[3], L = arg$[1];
        message = '';
        message_more = '';
        if (Object.keys(dependencies).length) {
          message = this$._compose_dependencies_message(L, module, 'modules', dependencies);
          if (settings.simple_admin_mode) {
            cs.ui.notify(message, 'error', 5);
            return;
          }
        }
        if (meta && meta.optional) {
          message_more += '<p class="cs-text-success cs-block-success">' + this$.L.system_admin_for_complete_feature_set(meta.optional.join(', ')) + '</p>';
        }
        form = meta ? this$._databases_storages_form(meta, databases, storages, settings) : '';
        modal = cs.ui.confirm("<h3>" + this$.L.installation_of_module(module) + "</h3>\n" + message + "\n" + message_more + "\n" + form, function(){
          cs.Event.fire('admin/System/modules/install/before', {
            name: module
          }).then(function(){
            return cs.api("install api/System/admin/modules/" + module, modal.querySelector('form'));
          }).then(function(){
            cs.ui.notify(this$.L.changes_saved, 'success', 5);
            return cs.Event.fire('admin/System/modules/install/after', {
              name: module
            });
          }).then(bind$(location, 'reload'));
        });
        modal.ok.innerHTML = this$.L[!message ? 'install' : 'force_install_not_recommended'];
        modal.ok.primary = !message;
        modal.cancel.primary = !modal.ok.primary;
      });
    },
    _databases_storages_form: function(meta, databases, storages, settings){
      var content, i$, ref$, len$, db_name, db_options, db, storage_name, storage_options, storage;
      content = '';
      if (meta.db && databases.length) {
        if (settings.simple_admin_mode) {
          for (i$ = 0, len$ = (ref$ = meta.db).length; i$ < len$; ++i$) {
            db_name = ref$[i$];
            content += "<input type=\"hidden\" name=\"db[" + db_name + "]\" value=\"0\">";
          }
        } else {
          content += "<tr>\n	<th tooltip=\"" + this.L.appointment_of_db_info + "\">\n		" + this.L.appointment_of_db + "\n		<cs-tooltip/>\n	</th>\n	<th tooltip=\"" + this.L.system_db_info + "\">\n		" + this.L.system_db + "\n		<cs-tooltip/>\n	</th>\n</tr>";
          db_options = '';
          for (i$ = 0, len$ = databases.length; i$ < len$; ++i$) {
            db = databases[i$];
            if (!meta.db_support || meta.db_support.indexOf(db.driver) !== -1) {
              db_options += this._db_option(db);
            }
          }
          for (i$ = 0, len$ = (ref$ = meta.db).length; i$ < len$; ++i$) {
            db_name = ref$[i$];
            content += "<tr>\n	<td>" + db_name + "</td>\n	<td>\n		<cs-select><select name=\"db[" + db_name + "]\">" + db_options + "</select></cs-select>\n	</td>\n</tr>";
          }
        }
      }
      if (meta.storage && storages.length) {
        if (settings.simple_admin_mode) {
          for (i$ = 0, len$ = (ref$ = meta.storage).length; i$ < len$; ++i$) {
            storage_name = ref$[i$];
            content += "<input type=\"hidden\" name=\"storage[" + storage_name + "]\" value=\"0\">";
          }
        } else {
          content += "<tr>\n	<th tooltip=\"" + this.L.appointment_of_storage_info + "\">\n		" + this.L.appointment_of_storage + "\n		<cs-tooltip/>\n	</th>\n	<th tooltip=\"" + this.L.system_storage_info + "\">\n		" + this.L.system_storage + "\n		<cs-tooltip/>\n	</th>\n</tr>";
          storage_options = '';
          for (i$ = 0, len$ = storages.length; i$ < len$; ++i$) {
            storage = storages[i$];
            if (!meta.storage_support || meta.storage_support.indexOf(storage.driver) !== -1) {
              storage_options += this._storage_option(storage);
            }
          }
          for (i$ = 0, len$ = (ref$ = meta.storage).length; i$ < len$; ++i$) {
            storage_name = ref$[i$];
            content += "<tr>\n	<td>" + storage_name + "</td>\n	<td>\n		<cs-select><select name=\"storage[" + storage_name + "]\">" + storage_options + "</select></cs-select>\n	</td>\n</tr>";
          }
        }
      }
      if (settings.simple_admin_mode) {
        return "<form>" + content + "</form>";
      } else {
        return "<form>\n	<table class=\"cs-table\">\n		" + content + "\n	</table>\n</form>";
      }
    },
    _db_option: function(db){
      var name, checked;
      name = db.index
        ? db.host + "/" + db.name + " (" + db.type + ")"
        : this.L.core_db + (" (" + db.type + ")");
      checked = db.index ? '' : 'checked';
      return "<option value=\"" + db.index + "\" " + checked + ">" + name + "</option>";
    },
    _storage_option: function(storage){
      var name, checked;
      name = storage.index
        ? storage.host + " (" + storage.driver + ")"
        : this.L.core_storage + (" (" + storage.driver + ")");
      checked = storage.index ? '' : 'checked';
      return "<option value=\"" + storage.index + "\" " + checked + ">" + name + "</option>";
    }
    /**
     * Provides next events:
     *  admin/System/modules/uninstall/before
     *  {name : module_name}
     *
     *  admin/System/modules/uninstall/after
     *  {name : module_name}
     */,
    _uninstall: function(e){
      var module, modal, this$ = this;
      module = e.model.module.name;
      modal = cs.ui.confirm(this.L.uninstallation_of_module(module), function(){
        cs.Event.fire('admin/System/modules/uninstall/before', {
          name: module
        }).then(function(){
          return cs.api("uninstall api/System/admin/modules/" + module);
        }).then(function(){
          cs.ui.notify(this$.L.changes_saved, 'success', 5);
          return cs.Event.fire('admin/System/modules/uninstall/after', {
            name: module
          });
        }).then(bind$(location, 'reload'));
      });
      modal.ok.innerHTML = this.L.uninstall;
      modal.ok.primary = false;
      modal.cancel.primary = true;
    },
    _remove_completely: function(e){
      this._remove_completely_component(e.model.module.name, 'modules');
    }
    /**
     * Provides next events:
     *  admin/System/modules/update/before
     *  {name : module_name}
     *
     *  admin/System/modules/update/after
     *  {name : module_name}
     */,
    _upload: function(){
      var this$ = this;
      this._upload_package(this.$.file).then(function(meta){
        var i$, ref$, len$, module;
        if (meta.category !== 'modules' || !meta['package'] || !meta.version) {
          cs.ui.notify(this$.L.this_is_not_module_installer_file, 'error', 5);
          return;
        }
        for (i$ = 0, len$ = (ref$ = this$.modules).length; i$ < len$; ++i$) {
          module = ref$[i$];
          if (module.name === meta['package']) {
            if (meta.version === module.meta.version) {
              cs.ui.notify(this$.L.update_module_impossible_same_version(meta['package'], meta.version), 'warning', 5);
              return;
            }
            this$._update_component(module.meta, meta);
            return;
          }
        }
        cs.api('extract api/System/admin/modules').then(function(){
          cs.ui.notify(this$.L.changes_saved, 'success', 5);
          location.reload();
        });
      });
    }
    /**
     * Provides next events:
     *  admin/System/modules/update_system/before
     *
     *  admin/System/modules/update_system/after
     */,
    _upload_system: function(){
      var i$, ref$, len$, module, this$ = this;
      for (i$ = 0, len$ = (ref$ = this.modules).length; i$ < len$; ++i$) {
        module = ref$[i$];
        if (module.name === 'System') {
          break;
        }
      }
      this._upload_package(this.$.file_system).then(function(meta){
        if (meta.category !== 'modules' || meta['package'] !== 'System' || !meta.version) {
          cs.ui.notify(this$.L.this_is_not_system_installer_file, 'error', 5);
          return;
        }
        this$._update_component(module.meta, meta);
      });
    },
    _db_settings: function(e){
      var module, meta, this$ = this;
      module = e.model.module.name;
      meta = e.model.module.meta;
      cs.api(['get			api/System/admin/databases', "get			api/System/admin/modules/" + module + "/db", 'get_settings	api/System/admin/system']).then(function(arg$){
        var databases, databases_mapping, settings, form, modal, db_name, index;
        databases = arg$[0], databases_mapping = arg$[1], settings = arg$[2];
        form = meta ? this$._databases_storages_form(meta, databases, [], settings) : '';
        modal = cs.ui.confirm("<h3>" + this$.L.db_settings_for_module(module) + "</h3>\n<p class=\"cs-block-error cs-text-error\">" + this$.L.changing_settings_warning + "</p>\n" + form, function(){
          cs.api("put api/System/admin/modules/" + module + "/db", modal.querySelector('form')).then(function(){
            cs.ui.notify(this.L.changes_saved, 'success', 5);
          });
        });
        for (db_name in databases_mapping) {
          index = databases_mapping[db_name];
          modal.querySelector("[name='db[" + db_name + "]']").selected = index;
        }
      });
    },
    _storage_settings: function(e){
      var module, meta, this$ = this;
      module = e.model.module.name;
      meta = e.model.module.meta;
      cs.api(['get			api/System/admin/storages', "get			api/System/admin/modules/" + module + "/storage", 'get_settings	api/System/admin/system']).then(function(arg$){
        var storages, storages_mapping, settings, form, modal, storage_name, index;
        storages = arg$[0], storages_mapping = arg$[1], settings = arg$[2];
        form = meta ? this$._databases_storages_form(meta, [], storages, settings) : '';
        modal = cs.ui.confirm("<h3>" + this$.L.storage_settings_for_module(module) + "</h3>\n<p class=\"cs-block-error cs-text-error\">" + this$.L.changing_settings_warning + "</p>\n" + form, function(){
          cs.api("put api/System/admin/modules/" + module + "/storage", modal.querySelector('form')).then(function(){
            cs.ui.notify(this.L.changes_saved, 'success', 5);
          });
        });
        for (storage_name in storages_mapping) {
          index = storages_mapping[storage_name];
          modal.querySelector("[name='storage[" + storage_name + "]']").selected = index;
        }
      });
    },
    _update_modules_list: function(){
      var this$ = this;
      cs.api('update_list api/System/admin/modules').then(function(){
        cs.ui.notify(this$.L.changes_saved, 'success', 5);
        this$.reload();
      });
    }
  });
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);

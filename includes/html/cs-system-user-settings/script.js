// Generated by LiveScript 1.4.0
/**
 * @package   CleverStyle CMS
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2016, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  var L;
  L = cs.Language;
  Polymer({
    'is': 'cs-system-user-settings',
    behaviors: [cs.Polymer.behaviors.cs, cs.Polymer.behaviors.Language('system_profile_')],
    properties: {
      languages: Array,
      timezones: Array,
      user_data: Object
    },
    ready: function(){
      var this$ = this;
      Promise.all([$.getJSON('api/System/languages'), $.getJSON('api/System/timezones'), $.getJSON('api/System/profile')]).then(function(arg$){
        var languages, timezones, user_data, languages_list, i$, len$, language, timezones_list, description, timezone;
        languages = arg$[0], timezones = arg$[1], user_data = arg$[2];
        languages_list = [];
        languages_list.push({
          clanguage: '',
          description: L.system_default
        });
        for (i$ = 0, len$ = languages.length; i$ < len$; ++i$) {
          language = languages[i$];
          languages_list.push({
            clanguage: language,
            description: language
          });
        }
        timezones_list = [];
        timezones_list.push({
          timezone: '',
          description: L.system_default
        });
        for (description in timezones) {
          timezone = timezones[description];
          timezones_list.push({
            timezone: timezone,
            description: description
          });
        }
        this$.set('languages', languages_list);
        this$.set('timezones', timezones_list);
        this$.set('user_data', user_data);
      });
      if (typeof cs.file_upload == 'function') {
        cs.file_upload(this.$['upload-avatar'], function(files){
          if (files.length) {
            this$.set('user_data.avatar', files[0]);
          }
        });
      }
    },
    _save: function(e){
      e.preventDefault();
      $.ajax({
        url: 'api/System/profile',
        type: 'patch',
        data: this.user_data,
        success: function(){
          cs.ui.notify(L.changes_saved, 'success', 5);
        }
      });
    }
  });
}).call(this);

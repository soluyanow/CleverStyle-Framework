// Generated by LiveScript 1.4.0
/**
 * @package   Comments
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2016-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  Polymer({
    is: 'cs-comments-count',
    properties: {
      module: String,
      item: Number,
      count: Number
    },
    ready: function(){
      var this$ = this;
      cs.api('get api/Comments/count', {
        module: this.module,
        item: this.item
      }).then(function(count){
        this$.count = count;
      });
    }
  });
}).call(this);

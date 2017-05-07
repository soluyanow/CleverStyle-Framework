// Generated by LiveScript 1.5.0
/**
 * @package   Prism
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2017, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
(function(){
  Prism.plugins.autoloader.languages_path = '/modules/Prism/assets/js/components/';
  Prism.highlightAll = function(async, callback, root){
    var elements, i$, len$, element;
    elements = (root || document).querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
    for (i$ = 0, len$ = elements.length; i$ < len$; ++i$) {
      element = elements[i$];
      if (element.matches('[contenteditable=true] *')) {
        continue;
      }
      (element.parentNode.tagName === 'PRE' ? element.parentNode : element).classList.add('line-numbers');
      Prism.highlightElement(element, async === true, callback);
    }
  };
  cs.ui.ready.then(Prism.highlightAll);
  cs.Event.on('System/content_enhancement', function(arg$){
    var element;
    element = arg$.element;
    Prism.highlightAll(true, function(){}, element);
    if (!document.querySelector('custom-style > style[include=cs-prism-styles]')) {
      element.insertAdjacentHTML('beforeend', "<custom-style><style include=\"cs-prism-styles\"></style></custom-style>");
    }
  });
}).call(this);

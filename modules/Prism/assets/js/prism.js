/* http://prismjs.com/download.html?themes=prism-okaidia&plugins=line-highlight+line-numbers+autolinker+file-highlight+previewer-base+previewer-color+previewer-gradient+previewer-easing+previewer-time+previewer-angle+autoloader+command-line */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l]);o[s]=i[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var i in e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],a||i),"Object"!==n.util.type(e[i])||r[n.util.objId(e[i])]?"Array"!==n.util.type(e[i])||r[n.util.objId(e[i])]||(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,i,r)):(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,i=a.elements||document.querySelectorAll(a.selector),l=0;r=i[l++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var i,l,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(i=(o.className.match(e)||[,""])[1].toLowerCase(),l=n.languages[i]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+i,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+i);var s=t.textContent,u={element:t,language:i,grammar:l,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(u.element.textContent=u.code),n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var g=new Worker(n.filename);g.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var i=n.tokenize(e,t);return a.stringify(n.util.encode(i),r)},tokenize:function(e,t){var a=n.Token,r=[e],i=t.rest;if(i){for(var l in i)t[l]=i[l];delete t.rest}e:for(var l in t)if(t.hasOwnProperty(l)&&t[l]){var o=t[l];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],g=u.inside,c=!!u.lookbehind,h=!!u.greedy,f=0,d=u.alias;if(h&&!u.pattern.global){var p=u.pattern.toString().match(/[imuy]*$/)[0];u.pattern=RegExp(u.pattern.source,p+"g")}u=u.pattern||u;for(var m=0,y=0;m<r.length;y+=r[m].length,++m){var v=r[m];if(r.length>e.length)break e;if(!(v instanceof a)){u.lastIndex=0;var b=u.exec(v),k=1;if(!b&&h&&m!=r.length-1){if(u.lastIndex=y,b=u.exec(e),!b)break;for(var w=b.index+(c?b[1].length:0),_=b.index+b[0].length,A=m,P=y,j=r.length;j>A&&_>P;++A)P+=r[A].length,w>=P&&(++m,y=P);if(r[m]instanceof a||r[A-1].greedy)continue;k=A-m,v=e.slice(y,P),b.index-=y}if(b){c&&(f=b[1].length);var w=b.index+f,b=b[0].slice(f),_=w+b.length,x=v.slice(0,w),O=v.slice(_),S=[m,k];x&&S.push(x);var N=new a(l,g?n.tokenize(b,g):b,d,b,h);S.push(N),O&&S.push(O),Array.prototype.splice.apply(r,S)}}}}}return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var i={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}n.hooks.run("wrap",i);var o=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(o?" "+o:"")+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,i=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),i&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
!function(){function e(e,t){return Array.prototype.slice.call((t||document).querySelectorAll(e))}function t(e,t){return t=" "+t+" ",(" "+e.className+" ").replace(/[\n\t]/g," ").indexOf(t)>-1}function n(e,n,i){for(var o,a=n.replace(/\s+/g,"").split(","),l=+e.getAttribute("data-line-offset")||0,d=r()?parseInt:parseFloat,c=d(getComputedStyle(e).lineHeight),s=0;o=a[s++];){o=o.split("-");var u=+o[0],m=+o[1]||u,h=document.createElement("div");h.textContent=Array(m-u+2).join(" \n"),h.setAttribute("aria-hidden","true"),h.className=(i||"")+" line-highlight",t(e,"line-numbers")||(h.setAttribute("data-start",u),m>u&&h.setAttribute("data-end",m)),h.style.top=(u-l-1)*c+"px",t(e,"line-numbers")?e.appendChild(h):(e.querySelector("code")||e).appendChild(h)}}function i(){var t=location.hash.slice(1);e(".temporary.line-highlight").forEach(function(e){e.parentNode.removeChild(e)});var i=(t.match(/\.([\d,-]+)$/)||[,""])[1];if(i&&!document.getElementById(t)){var r=t.slice(0,t.lastIndexOf(".")),o=document.getElementById(r);o&&(o.hasAttribute("data-line")||o.setAttribute("data-line",""),n(o,i,"temporary "),document.querySelector(".temporary.line-highlight").scrollIntoView())}}if("undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector){var r=function(){var e;return function(){if("undefined"==typeof e){var t=document.createElement("div");t.style.fontSize="13px",t.style.lineHeight="1.5",t.style.padding=0,t.style.border=0,t.innerHTML="&nbsp;<br />&nbsp;",document.body.appendChild(t),e=38===t.offsetHeight,document.body.removeChild(t)}return e}}(),o=0;Prism.hooks.add("complete",function(t){var r=t.element.parentNode,a=r&&r.getAttribute("data-line");r&&a&&/pre/i.test(r.nodeName)&&(clearTimeout(o),e(".line-highlight",r).forEach(function(e){e.parentNode.removeChild(e)}),n(r,a),o=setTimeout(i,1))}),window.addEventListener&&window.addEventListener("hashchange",i)}}();
!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,s=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(s.test(t.className)||s.test(e.element.className))&&!e.element.querySelector(".line-numbers-rows")){s.test(e.element.className)&&(e.element.className=e.element.className.replace(s,"")),s.test(t.className)||(t.className+=" line-numbers");var n,a=e.code.match(/\n(?!$)/g),l=a?a.length+1:1,r=new Array(l+1);r=r.join("<span></span>"),n=document.createElement("span"),n.setAttribute("aria-hidden","true"),n.className="line-numbers-rows",n.innerHTML=r,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(n)}}})}();
!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var i=/\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:#=?&amp;]+/,n=/\b\S+@[\w.]+[a-z]{2}/,e=/\[([^\]]+)]\(([^)]+)\)/,t=["comment","url","attr-value","string"];Prism.plugins.autolinker={processGrammar:function(a){a&&!a["url-link"]&&(Prism.languages.DFS(a,function(a,r,l){t.indexOf(l)>-1&&"Array"!==Prism.util.type(r)&&(r.pattern||(r=this[a]={pattern:r}),r.inside=r.inside||{},"comment"==l&&(r.inside["md-link"]=e),"attr-value"==l?Prism.languages.insertBefore("inside","punctuation",{"url-link":i},r):r.inside["url-link"]=i,r.inside["email-link"]=n)}),a["url-link"]=i,a["email-link"]=n)}},Prism.hooks.add("before-highlight",function(i){Prism.plugins.autolinker.processGrammar(i.grammar)}),Prism.hooks.add("wrap",function(i){if(/-link$/.test(i.type)){i.tag="a";var n=i.content;if("email-link"==i.type&&0!=n.indexOf("mailto:"))n="mailto:"+n;else if("md-link"==i.type){var t=i.content.match(e);n=t[2],i.content=t[1]}i.attributes.href=n}})}}();
!function(){"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var a,s=t.getAttribute("data-src"),n=t,r=/\blang(?:uage)?-(?!\*)(\w+)\b/i;n&&!r.test(n.className);)n=n.parentNode;if(n&&(a=(t.className.match(r)||[,""])[1]),!a){var o=(s.match(/\.(\w+)$/)||[,""])[1];a=e[o]||o}var l=document.createElement("code");l.className="language-"+a,t.textContent="",l.textContent="Loading…",t.appendChild(l);var i=new XMLHttpRequest;i.open("GET",s,!0),i.onreadystatechange=function(){4==i.readyState&&(i.status<400&&i.responseText?(l.textContent=i.responseText,Prism.highlightElement(l)):l.textContent=i.status>=400?"✖ Error "+i.status+" while fetching file: "+i.statusText:"✖ Error: File does not exist or is empty")},i.send(null)})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}();
!function(){if("undefined"!=typeof self&&self.Prism&&self.document&&Function.prototype.bind){var t=function(t){var e=0,s=0,i=t;if(i.parentNode){do e+=i.offsetLeft,s+=i.offsetTop;while((i=i.offsetParent)&&i.nodeType<9);i=t;do e-=i.scrollLeft,s-=i.scrollTop;while((i=i.parentNode)&&!/body/i.test(i.nodeName))}return{top:s,right:innerWidth-e-t.offsetWidth,bottom:innerHeight-s-t.offsetHeight,left:e}},e=/(?:^|\s)token(?=$|\s)/,s=/(?:^|\s)active(?=$|\s)/g,i=/(?:^|\s)flipped(?=$|\s)/g,o=function(t,e,s,i){this._elt=null,this._type=t,this._clsRegexp=RegExp("(?:^|\\s)"+t+"(?=$|\\s)"),this._token=null,this.updater=e,this._mouseout=this.mouseout.bind(this),this.initializer=i;var n=this;s||(s=["*"]),"Array"!==Prism.util.type(s)&&(s=[s]),s.forEach(function(t){"string"!=typeof t&&(t=t.lang),o.byLanguages[t]||(o.byLanguages[t]=[]),o.byLanguages[t].indexOf(n)<0&&o.byLanguages[t].push(n)}),o.byType[t]=this};o.prototype.init=function(){this._elt||(this._elt=document.createElement("div"),this._elt.className="prism-previewer prism-previewer-"+this._type,document.body.appendChild(this._elt),this.initializer&&this.initializer())},o.prototype.check=function(t){do if(e.test(t.className)&&this._clsRegexp.test(t.className))break;while(t=t.parentNode);t&&t!==this._token&&(this._token=t,this.show())},o.prototype.mouseout=function(){this._token.removeEventListener("mouseout",this._mouseout,!1),this._token=null,this.hide()},o.prototype.show=function(){if(this._elt||this.init(),this._token)if(this.updater.call(this._elt,this._token.textContent)){this._token.addEventListener("mouseout",this._mouseout,!1);var e=t(this._token);this._elt.className+=" active",e.top-this._elt.offsetHeight>0?(this._elt.className=this._elt.className.replace(i,""),this._elt.style.top=e.top+"px",this._elt.style.bottom=""):(this._elt.className+=" flipped",this._elt.style.bottom=e.bottom+"px",this._elt.style.top=""),this._elt.style.left=e.left+Math.min(200,this._token.offsetWidth/2)+"px"}else this.hide()},o.prototype.hide=function(){this._elt.className=this._elt.className.replace(s,"")},o.byLanguages={},o.byType={},o.initEvents=function(t,e){var s=[];o.byLanguages[e]&&(s=s.concat(o.byLanguages[e])),o.byLanguages["*"]&&(s=s.concat(o.byLanguages["*"])),t.addEventListener("mouseover",function(t){var e=t.target;s.forEach(function(t){t.check(e)})},!1)},Prism.plugins.Previewer=o,Prism.hooks.add("after-highlight",function(t){(o.byLanguages["*"]||o.byLanguages[t.language])&&o.initEvents(t.element,t.language)})}}();
!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var e={css:!0,less:!0,markup:{lang:"markup",before:"punctuation",inside:"inside",root:Prism.languages.markup&&Prism.languages.markup.tag.inside["attr-value"]},sass:[{lang:"sass",before:"punctuation",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["variable-line"]},{lang:"sass",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["property-line"]}],scss:!0,stylus:[{lang:"stylus",before:"hexcode",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["property-declaration"].inside},{lang:"stylus",before:"hexcode",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["variable-declaration"].inside}]};Prism.hooks.add("before-highlight",function(a){if(a.language&&e[a.language]&&!e[a.language].initialized){var i=e[a.language];"Array"!==Prism.util.type(i)&&(i=[i]),i.forEach(function(i){var r,l,n,s;i===!0?(r="important",l=a.language,i=a.language):(r=i.before||"important",l=i.inside||i.lang,n=i.root||Prism.languages,s=i.skip,i=a.language),!s&&Prism.languages[i]&&(Prism.languages.insertBefore(l,r,{color:/\B#(?:[0-9a-f]{3}){1,2}\b|\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B|\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i},n),a.grammar=Prism.languages[i],e[a.language]={initialized:!0})})}}),Prism.plugins.Previewer&&new Prism.plugins.Previewer("color",function(e){return this.style.backgroundColor="",this.style.backgroundColor=e,!!this.style.backgroundColor})}}();
!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var e={css:!0,less:!0,sass:[{lang:"sass",before:"punctuation",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["variable-line"]},{lang:"sass",before:"punctuation",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["property-line"]}],scss:!0,stylus:[{lang:"stylus",before:"func",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["property-declaration"].inside},{lang:"stylus",before:"func",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["variable-declaration"].inside}]};Prism.hooks.add("before-highlight",function(i){if(i.language&&e[i.language]&&!e[i.language].initialized){var t=e[i.language];"Array"!==Prism.util.type(t)&&(t=[t]),t.forEach(function(t){var r,s,a,n;t===!0?(r=Prism.plugins.Previewer&&Prism.plugins.Previewer.byType.color?"color":"important",s=i.language,t=i.language):(r=t.before||"important",s=t.inside||t.lang,a=t.root||Prism.languages,n=t.skip,t=i.language),!n&&Prism.languages[t]&&(Prism.languages.insertBefore(s,r,{gradient:{pattern:/(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,inside:{"function":/[\w-]+(?=\()/,punctuation:/[(),]/}}},a),i.grammar=Prism.languages[t],e[i.language]={initialized:!0})})}});var i={},t=function(e,i,t){var r="180deg";return/^(?:-?\d*\.?\d+(?:deg|rad)|to\b|top|right|bottom|left)/.test(t[0])&&(r=t.shift(),r.indexOf("to ")<0&&(r.indexOf("top")>=0?r=r.indexOf("left")>=0?"to bottom right":r.indexOf("right")>=0?"to bottom left":"to bottom":r.indexOf("bottom")>=0?r=r.indexOf("left")>=0?"to top right":r.indexOf("right")>=0?"to top left":"to top":r.indexOf("left")>=0?r="to right":r.indexOf("right")>=0?r="to left":e&&(r.indexOf("deg")>=0?r=90-parseFloat(r)+"deg":r.indexOf("rad")>=0&&(r=Math.PI/2-parseFloat(r)+"rad")))),i+"("+r+","+t.join(",")+")"},r=function(e,i,t){if(t[0].indexOf("at")<0){var r="center",s="ellipse",a="farthest-corner";if(/\bcenter|top|right|bottom|left\b|^\d+/.test(t[0])&&(r=t.shift().replace(/\s*-?\d+(?:rad|deg)\s*/,"")),/\bcircle|ellipse|closest|farthest|contain|cover\b/.test(t[0])){var n=t.shift().split(/\s+/);!n[0]||"circle"!==n[0]&&"ellipse"!==n[0]||(s=n.shift()),n[0]&&(a=n.shift()),"cover"===a?a="farthest-corner":"contain"===a&&(a="clothest-side")}return i+"("+s+" "+a+" at "+r+","+t.join(",")+")"}return i+"("+t.join(",")+")"},s=function(e){if(i[e])return i[e];var s=e.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/),a=s&&s[1],n=s&&s[2],l=e.replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g,"").split(/\s*,\s*/);return i[e]=n.indexOf("linear")>=0?t(a,n,l):n.indexOf("radial")>=0?r(a,n,l):n+"("+l.join(",")+")"};Prism.plugins.Previewer&&new Prism.plugins.Previewer("gradient",function(e){return this.firstChild.style.backgroundImage="",this.firstChild.style.backgroundImage=s(e),!!this.firstChild.style.backgroundImage},"*",function(){this._elt.innerHTML="<div></div>"})}}();
!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var e={css:!0,less:!0,sass:[{lang:"sass",inside:"inside",before:"punctuation",root:Prism.languages.sass&&Prism.languages.sass["variable-line"]},{lang:"sass",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["property-line"]}],scss:!0,stylus:[{lang:"stylus",before:"hexcode",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["property-declaration"].inside},{lang:"stylus",before:"hexcode",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["variable-declaration"].inside}]};Prism.hooks.add("before-highlight",function(r){if(r.language&&e[r.language]&&!e[r.language].initialized){var s=e[r.language];"Array"!==Prism.util.type(s)&&(s=[s]),s.forEach(function(s){var i,a,n,t;s===!0?(i="important",a=r.language,s=r.language):(i=s.before||"important",a=s.inside||s.lang,n=s.root||Prism.languages,t=s.skip,s=r.language),!t&&Prism.languages[s]&&(Prism.languages.insertBefore(a,i,{easing:/\bcubic-bezier\((?:-?\d*\.?\d+,\s*){3}-?\d*\.?\d+\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i},n),r.grammar=Prism.languages[s],e[r.language]={initialized:!0})})}}),Prism.plugins.Previewer&&new Prism.plugins.Previewer("easing",function(e){e={linear:"0,0,1,1",ease:".25,.1,.25,1","ease-in":".42,0,1,1","ease-out":"0,0,.58,1","ease-in-out":".42,0,.58,1"}[e]||e;var r=e.match(/-?\d*\.?\d+/g);if(4===r.length){r=r.map(function(e,r){return 100*(r%2?1-e:e)}),this.querySelector("path").setAttribute("d","M0,100 C"+r[0]+","+r[1]+", "+r[2]+","+r[3]+", 100,0");var s=this.querySelectorAll("line");return s[0].setAttribute("x2",r[0]),s[0].setAttribute("y2",r[1]),s[1].setAttribute("x2",r[2]),s[1].setAttribute("y2",r[3]),!0}return!1},"*",function(){this._elt.innerHTML='<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url('+location.href+'#prism-previewer-easing-marker)" marker-end="url('+location.href+'#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url('+location.href+'#prism-previewer-easing-marker)" marker-end="url('+location.href+'#prism-previewer-easing-marker)" /></svg>'})}}();
!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var s={css:!0,less:!0,markup:{lang:"markup",before:"punctuation",inside:"inside",root:Prism.languages.markup&&Prism.languages.markup.tag.inside["attr-value"]},sass:[{lang:"sass",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["property-line"]},{lang:"sass",before:"operator",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["variable-line"]}],scss:!0,stylus:[{lang:"stylus",before:"hexcode",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["property-declaration"].inside},{lang:"stylus",before:"hexcode",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["variable-declaration"].inside}]};Prism.hooks.add("before-highlight",function(e){if(e.language&&s[e.language]&&!s[e.language].initialized){var a=s[e.language];"Array"!==Prism.util.type(a)&&(a=[a]),a.forEach(function(a){var i,r,n,l;a===!0?(i="important",r=e.language,a=e.language):(i=a.before||"important",r=a.inside||a.lang,n=a.root||Prism.languages,l=a.skip,a=e.language),!l&&Prism.languages[a]&&(Prism.languages.insertBefore(r,i,{time:/(?:\b|\B-|(?=\B\.))\d*\.?\d+m?s\b/i},n),e.grammar=Prism.languages[a],s[e.language]={initialized:!0})})}}),Prism.plugins.Previewer&&new Prism.plugins.Previewer("time",function(s){var e=parseFloat(s),a=s.match(/[a-z]+$/i);return e&&a?(a=a[0],this.querySelector("circle").style.animationDuration=2*e+a,!0):!1},"*",function(){this._elt.innerHTML='<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'})}}();
!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var a={css:!0,less:!0,markup:{lang:"markup",before:"punctuation",inside:"inside",root:Prism.languages.markup&&Prism.languages.markup.tag.inside["attr-value"]},sass:[{lang:"sass",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["property-line"]},{lang:"sass",before:"operator",inside:"inside",root:Prism.languages.sass&&Prism.languages.sass["variable-line"]}],scss:!0,stylus:[{lang:"stylus",before:"func",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["property-declaration"].inside},{lang:"stylus",before:"func",inside:"rest",root:Prism.languages.stylus&&Prism.languages.stylus["variable-declaration"].inside}]};Prism.hooks.add("before-highlight",function(s){if(s.language&&a[s.language]&&!a[s.language].initialized){var e=a[s.language];"Array"!==Prism.util.type(e)&&(e=[e]),e.forEach(function(e){var i,r,n,g;e===!0?(i="important",r=s.language,e=s.language):(i=e.before||"important",r=e.inside||e.lang,n=e.root||Prism.languages,g=e.skip,e=s.language),!g&&Prism.languages[e]&&(Prism.languages.insertBefore(r,i,{angle:/(?:\b|\B-|(?=\B\.))\d*\.?\d+(?:deg|g?rad|turn)\b/i},n),s.grammar=Prism.languages[e],a[s.language]={initialized:!0})})}}),Prism.plugins.Previewer&&new Prism.plugins.Previewer("angle",function(a){var s,e,i=parseFloat(a),r=a.match(/[a-z]+$/i);if(!i||!r)return!1;switch(r=r[0]){case"deg":s=360;break;case"grad":s=400;break;case"rad":s=2*Math.PI;break;case"turn":s=1}return e=100*i/s,e%=100,this[(0>i?"set":"remove")+"Attribute"]("data-negative",""),this.querySelector("circle").style.strokeDasharray=Math.abs(e)+",500",!0},"*",function(){this._elt.innerHTML='<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'})}}();
!function(){if("undefined"!=typeof self&&self.Prism&&self.document&&document.createElement){var e={javascript:"clike",actionscript:"javascript",aspnet:"markup",bison:"c",c:"clike",csharp:"clike",cpp:"c",coffeescript:"javascript",crystal:"ruby","css-extras":"css",d:"clike",dart:"clike",fsharp:"clike",glsl:"clike",go:"clike",groovy:"clike",haml:"ruby",handlebars:"markup",haxe:"clike",jade:"javascript",java:"clike",jolie:"clike",kotlin:"clike",less:"css",markdown:"markup",nginx:"clike",objectivec:"c",parser:"markup",php:"clike","php-extras":"php",processing:"clike",protobuf:"clike",qore:"clike",jsx:["markup","javascript"],reason:"clike",ruby:"clike",sass:"css",scss:"css",scala:"java",smarty:"markup",swift:"clike",textile:"markup",twig:"markup",typescript:"javascript",wiki:"markup"},c={},a="none",s=Prism.plugins.autoloader={languages_path:"components/",use_minified:!0},n=function(e,c,a){var s=document.createElement("script");s.src=e,s.async=!0,s.onload=function(){document.body.removeChild(s),c&&c()},s.onerror=function(){document.body.removeChild(s),a&&a()},document.body.appendChild(s)},r=function(e){return s.languages_path+"prism-"+e+(s.use_minified?".min":"")+".js"},i=function(e,a){var s=c[e];s||(s=c[e]={});var n=a.getAttribute("data-dependencies");!n&&a.parentNode&&"pre"===a.parentNode.tagName.toLowerCase()&&(n=a.parentNode.getAttribute("data-dependencies")),n=n?n.split(/\s*,\s*/g):[],l(n,function(){t(e,function(){Prism.highlightElement(a)})})},l=function(e,c,a){"string"==typeof e&&(e=[e]);var s=0,n=e.length,r=function(){n>s?t(e[s],function(){s++,r()},function(){a&&a(e[s])}):s===n&&c&&c(e)};r()},t=function(a,s,i){var t=function(){var e=!1;a.indexOf("!")>=0&&(e=!0,a=a.replace("!",""));var l=c[a];if(l||(l=c[a]={}),s&&(l.success_callbacks||(l.success_callbacks=[]),l.success_callbacks.push(s)),i&&(l.error_callbacks||(l.error_callbacks=[]),l.error_callbacks.push(i)),!e&&Prism.languages[a])o(a);else if(!e&&l.error)u(a);else if(e||!l.loading){l.loading=!0;var t=r(a);n(t,function(){l.loading=!1,o(a)},function(){l.loading=!1,l.error=!0,u(a)})}},p=e[a];p&&p.length?l(p,t):t()},o=function(e){c[e]&&c[e].success_callbacks&&c[e].success_callbacks.length&&c[e].success_callbacks.forEach(function(c){c(e)})},u=function(e){c[e]&&c[e].error_callbacks&&c[e].error_callbacks.length&&c[e].error_callbacks.forEach(function(c){c(e)})};Prism.hooks.add("complete",function(e){e.element&&e.language&&!e.grammar&&e.language!==a&&i(e.language,e.element)})}}();
!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,a=/\s*\bcommand-line\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(a.test(t.className)||a.test(e.element.className))&&!e.element.querySelector(".command-line-prompt")){a.test(e.element.className)&&(e.element.className=e.element.className.replace(a,"")),a.test(t.className)||(t.className+=" command-line");var n=function(e,a){return(t.getAttribute(e)||a).replace(/"/g,"&quot")},s=new Array(1+e.code.split("\n").length),r=n("data-prompt","");if(""!==r)s=s.join('<span data-prompt="'+r+'"></span>');else{var l=n("data-user","user"),m=n("data-host","localhost");s=s.join('<span data-user="'+l+'" data-host="'+m+'"></span>')}var o=document.createElement("span");o.className="command-line-prompt",o.innerHTML=s;var i=t.getAttribute("data-output")||"";i=i.split(",");for(var c=0;c<i.length;c++){var p=i[c].split("-"),d=parseInt(p[0]),u=d;if(2===p.length&&(u=parseInt(p[1])),!isNaN(d)&&!isNaN(u))for(var f=d;u>=f&&f<=o.children.length;f++){var N=o.children[f-1];N.removeAttribute("data-user"),N.removeAttribute("data-host"),N.removeAttribute("data-prompt")}}e.element.innerHTML=o.outerHTML+e.element.innerHTML}}})}();

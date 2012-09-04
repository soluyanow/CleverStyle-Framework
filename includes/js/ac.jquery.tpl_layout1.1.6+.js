(function(d){var e,n="";var a;var c=[];var q=0;var i=[];var j=jQuery.fn.css;jQuery.fn.css=function(u,w){var v=n+"display";var t=n+"position";var s=false,z=false;if(w){if(u==v&&w.indexOf('"')!=-1){s=true}else{if(u==t&&w.length==1){z=true}else{return j.apply(this,arguments)}}var y=this;var x;d.each(a,function(B,A){if(s){if(y.is(B)){x=B}}else{d.each(A.chars,function(C,D){if(y.is(D.selector)){x=D.selector}})}});d.each(i,function(A,B){if(B.selector==x){if(s){B.properties[v]=w}else{if(z){B.properties[t]=w}}}});b(i);k();return false}else{return j.apply(this,arguments)}};d.setTemplateLayout=function(t,s){if(l()){p();return}d(window).resize(k);d(document).change(k);if(typeof t=="string"){t={file:t}}if(s){t.prefix=s}if(t){if(t.prefix){n="-"+t.prefix+"-"}if(t.delay){q=t.delay}if(t.fallback){d("."+t.fallback).remove()}}if(!t){m();if(typeof callback=="function"){callback()}}else{e="";if(t.text){e=t.text;d("head").append("<style>"+e+"</style>")}if(t.file){d.get(t.file,function(u){e+=u;k()})}if(!t.file&&!e){m();return}if(e){k()}}};d.redoTemplateLayout=k;function p(){if(d.showPage){d.showPage();return}var s=d("body");if(s.css("display")=="none"){s.fadeIn(100)}}function m(){var s=d("style");if(!s.length){return}if(s.text()){e=s.text();k()}else{d.get(document.location.href,function(u){var t=u.match(/<style.*?>([\s\S]*?)<\/style>/);e=t?t[1]:"";k()})}}function f(){e=e.replace(/\/\*[\s\S]*?\*\//g,"");var s=e.split("}");d.each(s,function(){var v=d.trim(this);if(!v){return}var t=h(v);if(!t){return}if(t.selector.indexOf(",")!=-1){var u=t.selector.split(",");d.each(u,function(w,x){i.push({selector:d.trim(x),properties:t.properties})})}else{i.push(t)}});return i}function h(w){if(w.indexOf("@")===0||w.indexOf("{")==-1){return false}var v=w.split("{");var u=d.trim(v[0]);var s=v[1].split(";");var t={};d.each(s,function(){var y=this.split(":");var x=d.trim(y[0]).toLowerCase();t[x]=d.trim(y[1])});return{selector:u,properties:t}}function g(D){var A=D.replace(/\n|\r/g," ");var B=A.split('"');var G=[];var u=[];var x={};for(var w=2,v=B.length;w<v;w+=2){var s=B[w];var F="auto";if(s.indexOf("/")!=-1){var C=s.match(/\/\s*(\S+)(.*)/);F=d.trim(C[1])}if(d.trim(s)&&w==v-1){var E=d.trim(B[v-1]).replace(/^\/\s*\S+\s*/,"");if(E&&E.indexOf("/")==-1){if(E.indexOf("(")!=-1){var t=E.match(/minmax(\(.*?\))/g);d.each(t,function(I,H){var J=H.replace(/\s*/g,"");E=E.replace(H,J)})}E=E.replace(/\(\)/,"");u=E.split(/\s+/)}}var z=B[w-1].replace(/[^a-z@\.]/gi,"");z=d.trim(z).split("");d.each(z,function(){x[this]=true});if(F.indexOf("-")==0){return false}G.push({chars:z,height:F})}var y=G[0].chars.length;while(u.length>y){u.pop()}while(u.length<y){u.push("*")}return{rows:G,widths:u,chars:x}}function b(w){var v={};var t={};var s=0;var u=[];d.each(w,function(x,I){var G=I.properties;var B=I.selector;var y=n+"display";var A=n+"position";var E=false;if(B.indexOf("::slot(")!=-1){var F=B.match(/slot\((.)\)/);if(F&&F.length>1){var z=F[1];var H=B.split("::slot")[0];var D={};d.each(G,function(K,L){if(K.indexOf("background")==0||K.indexOf("overflow")!=-1||K.indexOf("vertical-align")!=-1){D[K]=L}});t[H+"|"+z]=D}}if(G[A]&&G[A].length==1){var C=G[A];v[B]={chr:C,props:G};E=true}else{if(G[A]=="same"){c.push(B)}}if(G[y]&&G[y].indexOf('"')!=-1){var J=g(G[y]);if(!J){return}u.push({sel:B,rows:J.rows,widths:J.widths,chars:J.chars,properties:G,pseudo_props:{},num:s,slotEl:E});s++}});u.sort(function(y,x){return !x.slotEl});d.each(u,function(y,x){a[x.sel]=x});d.each(v,function(B,D){var z=false;var C=false;d.each(a,function(E,G){if(E==B){v[E].tplEl=true}if(!G.chars[D.chr]){return}var F=d(B).parents();if(F.is(E)){var I;var H=0;F.each(function(){if(F[H]==d(E)[0]){I=H}H++});if(z===false||I<z){z=I;C=E}}});var x=D.tplEl||false;if(C){var y=C+"|"+D.chr;var A=t[y]||false;a[C].chars[D.chr]={selector:B,props:D.props,pseudo_props:A,tplEl:x,cur_sel:C}}})}function l(){var v='"@"';var u=d("<p></p>");var s=true;try{u.get(0).style.display=v}catch(t){s=false}s=s&&(u.css("display")==v);u.remove();return s}function r(P,M){var O=P.widths;var B=P.rows;var E=P.properties;var C=[],N={};var v=d(M);var D=P.chars;d.each(D,function(Q,R){if(R!==true){R.slot_w=1;R.slot_h=1}});P.margins=0;function I(T,S){var Q=[];d.each(D,function(W,X){var V=X.props.width||"auto";if(X.col==T&&X.slot_w==1){var U=y({width:V,top:"auto",left:"auto"},X.el.clone()).w;Q.push(U)}});var R=S.split("-")[0];return Math[R].apply({},Q)}function y(T,R){var Q=d("<div></div>");Q.css({visibility:"hidden",margin:0,padding:0,position:"absolute"});if(R){Q.append(R)}if(T){Q.css(T)}v.append(Q);var S={w:Q.width(),h:Q.height()};Q.remove();return S}function F(T,R,V){var S="auto",Q="auto";if(T=="h"){Q=R}else{S=R;if(S=="min-content"||S=="max-content"){return I(V,S)}}var U=y({height:Q,width:S});return U[T]}function G(T){var R=0;for(var S=0;S<=T.row;S++){if(N[S][T.col]>0){R+=N[S][T.col];return R}}var Q=parseInt(T.el.css("margin-top"));if(Q<0){R-=Q}return R}function K(R,Q,T){var U=D[Q].props[R]+"";var S=U;if(U.indexOf("%")!=-1&&R=="width"){S=T*parseInt(U)/100}return S}function w(V){var U=0;for(var R=V.col;R<V.slot_w+V.col;R++){U+=C[R]}var T=V.el.outerWidth(true)-V.el.width();if(T){U-=T}if(V.tplEl){if(B[V.row].height&&B[V.row].height!="*"){a[V.selector].properties.height=B[V.row].height}a[V.selector].properties.width=U;var S=new r(a[V.selector],V.selector);var Q=S.make();V.genHeight=Q.height;return Q.width}return U}function u(Q){var R=Q.clone();R.each(function(){d(this).css("position","static")});return y(0,R).h}function A(){if(P.slotEl){E.height=v.height()}if(E.height){v.height(E.height);var Q=v.height()}else{var T=0}var U=0;var S=[];d.each(D,function(W,X){d.each(D,function(Y,Z){if(N[X.row]===undefined){N[X.row]={}}if(Z.col==X.col){if(N[X.row][X.col]===undefined){N[X.row][X.col]=0}if(Z.row<X.row){N[X.row][X.col]+=Z.el.outerHeight(true)}}})});d.each(B,function(X,Y){var W=-1;d.each(D,function(Z,aa){if(S[aa.col]===undefined){S[aa.col]=0}if(W!=X){W=X;R=0}if(aa.row==X){if(aa.props.height){aa.el.height(aa.props.height)}else{aa.el.height("auto")}S[aa.col]+=aa.el.outerHeight()}});if(E.height&&E.height!="auto"){U++}});for(var R=0;R<S.length;R++){T=Math.max(T,S[R])}if(U){var V=Q/U;d.each(B,function(W,X){if(X.height=="*"||X.height=="auto"){N[W]=V}})}else{v.height(T+parseInt(v.css("padding-bottom")))}}function J(){var T=0;var S=0;if(P.slotEl){v.width(v.width())}var R=v.width();C=[];d.each(O,function(X,V){if(V=="fit-content"){V=O[X]="minmax(min-content,max-content)"}if(V=="*"||V=="auto"){S++;T=0}else{if(V.indexOf("minmax")===0){var Y=V.match(/\((.*?),(.*?)\)/);var W=Y[1];var U=Y[2];T=F("w",U,X);R-=T}else{T=F("w",V,X);R-=T}}C.push(T)});if(R<0){d.each(O,function(X,V){if(V.indexOf("minmax")!=-1){var Y=V.match(/\((.*?),(.*?)\)/);var W=Y[1];var U=F("w",W,X);C[X]+=R;R=0;if(C[X]<U){C[X]=U}}})}var Q=R/S;d.each(O,function(V,U){if(U=="*"||U=="auto"){C[V]=Q}})}function t(T,S){var Q=S||parseInt(T.el.parent().css("padding-top").replace("px",""));if(D["@"]&&!T.isHolder){Q=-1*F("h",v.css("top"))}for(var R=0;R<=T.row;R++){if(N[R][T.col]>0){Q+=N[R][T.col];return Q}}return Q}function L(S){var R=S.col;var Q=0;if(D["@"]&&!S.isHolder){Q=-1*F("w",v.css("left"))}d.each(C,function(T){if(T<R){Q+=this}});return Q}function s(Q){d.each(c,function(R,T){var S=d(T);S.each(function(){var V=d(this);var U=false;Q.el.each(function(){var W=d(this);if(!U){U=W}else{U[U.length++]=W[0]}if(W.next()[0]==V[0]){U[U.length++]=V[0]}});if(U.length>1){Q.el=U;Q.multi=true}})})}function x(){var Q=false;var S={};if(v.is("body")){return}d.each(E,function(V,W){if(V.indexOf("background")===0){Q=true;S[V]=W}});if(!Q){return}var U="jq_tpl_bg-"+P.num;var T=v.offset();var R=d("#"+U);if(!R.length){R=d('<div id="'+U+'"></div>');R.css(S)}R.css({"z-index":-2,position:"absolute",top:T.top,left:T.left,width:v.width(),height:v.height()});d("body").append(R)}function z(T,Z){if(Z.pseudo_props){var S=Z.el.offset();var R="jq_tpl"+P.num+"_slot-"+T;var aa=d("#"+R);var W=Z.pseudo_props;var U=d("body");if(!aa.length){aa=d('<div id="'+R+'"></div>');U.append(aa)}var ab=Z.el.outerWidth(true);var V=G(Z);aa.css({display:"block",position:"absolute","z-index":(P.num-10),top:S.top,left:S.left,width:ab,height:V});if(U.is(M)){if(!P.margins){var Q=d('<p style="position:static;margin:0;display:block;visibility:hidden;"></p>');v.append(Q);P.margins=Q.offset();P.margins.left-=parseFloat(v.css("padding-left"));P.margins.top-=parseFloat(v.css("padding-top"));Q.remove()}aa.css("left",S.left-P.margins.left);aa.css("top",S.top-P.margins.top)}aa.css(W);if(W["vertical-align"]){var Y=0;var X=W["vertical-align"];switch(X){case"middle":Y=V/2-Z.el.height()/2;break;case"bottom":Y=V-Z.el.height();break;case"baseline":Y=V-Z.el.height();break;default:break}Z.el.css("top",t(Z)+Y)}}}function H(){d.each(B,function(Q,R){d.each(R.chars,function(S,T){if(T=="."){return}if(T=="@"){D["@"]={selector:M,isHolder:true}}var U=D[T];U.el=d(U.selector);if(S>0&&R.chars[S-1]==T){if(U.slot_h==1){U.slot_w++}}if(Q>0&&B[Q-1].chars[S]==T){U.slot_h++}if(isNaN(U.row)){U.row=Q}if(isNaN(U.col)){U.col=S}if(!U.el.parents().is(M)&&!U.el.is(M)){return}if(U.el.length>1){U.multi=true}s(U)})});delete D["."]}this.make=function(){v.css("position","relative");H();J();if(D["@"]){D["@"].el.css("left",L(D["@"]))}d.each(D,function(S,T){var R=T.el;var Q=w(T);if(T.props.width){Q=K("width",S,Q)}R.css({display:"block",position:"absolute",width:Q});R.css("left",L(T))});A();if(D["@"]){D["@"].el.css("top",t(D["@"]))}d.each(D,function(S,V){if(V.tplEl){a[V.selector].genTop=t(V)}var R=t(V);var U=G(V);var Q=R;var T=false;if(V.pseudo_props){if(V.pseudo_props.overflow=="hidden"){T=true}}V.el.each(function(W){if(W>0){Q+=V.el.eq(W-1).outerHeight(true)}d(this).css("top",Q);if(V.props.height){U=K("height",S,U);d(this).height(U)}if(T){var X=U-Q+R;var Z=(Q-R>U);var Y=(V.el.height()+Q-R>U);if(Z||Y){d(this).height(Z?0:X);d(this).css("overflow","hidden")}}});if(V.tplEl){V.el.height(G(V))}z(S,V)});x();if(P.genTop&&D["@"]){D["@"].el.css("top",t(D["@"],P.genTop))}return{height:v.height(),width:v.width()}}}function o(v,s){var u=new r(s,v);u.make()}function k(){a={};i=f();b(i);setTimeout(function(){d.each(a,o);p()},q);q=0}})(jQuery);
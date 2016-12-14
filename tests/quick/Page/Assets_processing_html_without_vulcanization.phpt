--FILE--
<?php
namespace cs\Page;
use function cs\make_tmp_dir;

include __DIR__.'/../../unit.php';
$tmp_dir = make_tmp_dir();
echo Assets_processing::html(file_get_contents(__DIR__.'/Assets_processing/my-element.html'), __DIR__.'/Assets_processing/my-element.html', $tmp_dir, false, $not_embedded_resources)."\n";
var_dump($not_embedded_resources);
var_dump('imported.js');
echo file_get_contents("$tmp_dir/d56902a9037da35c4d51753cb1b31d4f.js")."\n";
var_dump('imported-no-styles.js');
echo file_get_contents("$tmp_dir/b0c4817554bfb8e8f10f16ab1c683f47.js")."\n";
var_dump('my-element.js');
echo file_get_contents("$tmp_dir/1493da20bba0b80de0e0f7297d3cf6d0.js")."\n";
?>
--EXPECTF--

<dom-module id="my-element">
	<template><style>.imported-class{color:black;}.imported-class{color:black;}.imported-class-2{color:black;}.imported-class-2{color:black;}@import './68b89e0f0f795bd30957fec322063ab3.css' screen and (orientation:landscape);@import url('./68b89e0f0f795bd30957fec322063ab3.css') screen and (orientation:landscape);@import './047a14bb3ae252664280463d532cb113.css' screen and (orientation:landscape);@import url('./047a14bb3ae252664280463d532cb113.css') screen and (orientation:landscape);.some-class{background-color:#000;color:#fff;transition:opacity .3s,transform .5s;}.image{background-image:url(data:image/svg+xml;charset=utf-8;base64,MTExMTE=);}.image-large{background-image:url('./0bf9edfe605a79ba7a8bea72b894729f.svg');}.image-absolute-path{background-image:url("data:image/svg+xml;charset=utf-8;base64,MTExMTE=");}.image-query-string{background-image:url('./0bf9edfe605a79ba7a8bea72b894729f.svg');}@media(min-width:960px) and (orientation:landscape){.another-class{display:none;}}</style>
		<style>:host{display:block;}</style>
	</template>
%w
%w
</dom-module>
<script src="/external-script.js"></script>
<style is="custom-style">html{--my-property:black;}</style>
<script src="./d56902a9037da35c4d51753cb1b31d4f.js"></script>
<style is="custom-style">html{--my-property-2:black;}</style>
<script src="./b0c4817554bfb8e8f10f16ab1c683f47.js"></script>
<script src="/external-imported-script.js"></script>
<link rel="import" href="/external-import.html" type="html">
<script src="./1493da20bba0b80de0e0f7297d3cf6d0.js"></script>
array(4) {
  [0]=>
  string(%d) "/tests/%s/0bf9edfe605a79ba7a8bea72b894729f.svg"
  [1]=>
  string(%d) "/tests/%s/d56902a9037da35c4d51753cb1b31d4f.js"
  [2]=>
  string(%d) "/tests/%s/b0c4817554bfb8e8f10f16ab1c683f47.js"
  [3]=>
  string(%d) "/tests/%s/1493da20bba0b80de0e0f7297d3cf6d0.js"
}
string(11) "imported.js"
var xyz = 'xyz';
string(21) "imported-no-styles.js"
var zyx = 'zyx';
string(13) "my-element.js"
Polymer({is : 'my-element'});;var bar = 'bar'; /* another comment */var foo = 'foo'; // Single-line after code
(function (bar, foo) {return foo + bar +(10 * 15 / 5);})(bar, foo);if ( !( bar > foo ) ){console . log (foo), console.log(bar
);}var script_code = "<script>JS here<\/script>";;Polymer.updateStyles();

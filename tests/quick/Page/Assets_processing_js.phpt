--FILE--
<?php
namespace cs\Page;
include __DIR__.'/../../unit.php';
echo Assets_processing::js(file_get_contents(__DIR__.'/Assets_processing/script.js'));
echo "\n";
echo Assets_processing::js(file_get_contents(__DIR__.'/Assets_processing/script-with-template-string.js'));
?>
--EXPECT--
var bar = 'bar'; /* another comment */var foo = 'foo'; // Single-line after code
(function (bar, foo) {return foo + bar +(10 * 15 / 5);})(bar, foo);if ( !( bar > foo ) ){console . log (foo), console.log(bar
);}var script_code = "<script>JS here<\/script>";
var bar = 'bar'; /* another comment */var foo = 'foo'; // Single-line after code
(function (bar, foo) {return foo + bar +(10 * 15 / 5);})(bar, foo);if ( !( bar > foo ) ){console . log (foo), console.log(bar
);}var script_code = `<script>JS here<\/script>`;var some_code_after_template_string ='content here';

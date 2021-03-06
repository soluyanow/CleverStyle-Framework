<?php
/**
 * @package  Disqus
 * @category modules
 * @author   Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license  0BSD
 */
namespace cs;
use
	h,
	cs\Language\Prefix;

$L           = new Prefix('system_admin_');
$Page        = Page::instance();
$module_data = Config::instance()->module('Disqus');
if (isset($_POST['shortname'])) {
	$module_data->shortname = $_POST['shortname'];
	$Page->success($L->changes_saved);
}

$Page->content(
	h::{'cs-form form'}(
		h::label('Shortname').
		h::{'cs-input-text input[name=shortname]'}(
			[
				'value' => $module_data->shortname ?: ''
			]
		).
		h::{'p cs-button'}(
			h::{'button[type=submit]'}($L->save),
			[
				'tooltip' => $L->save_info
			]
		)
	)
);

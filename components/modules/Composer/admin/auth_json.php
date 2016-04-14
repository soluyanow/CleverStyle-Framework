<?php
/**
 * @package   Composer
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015-2016, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
namespace cs\modules\Composer;
use
	h,
	cs\Config,
	cs\Language\Prefix,
	cs\Page;

$L           = new Prefix('composer_');
$Page        = Page::instance();
$module_data = Config::instance()->module('Composer');
$Page->title($L->auth_json);

if (isset($_POST['auth_json'])) {
	$module_data->auth_json = $_POST['auth_json'];
	$Page->success($L->changes_saved);
}

$Page->content(
	h::{'form[is=cs-form]'}(
		h::label($L->auth_json_contents).
		h::{'p textarea[is=cs-textarea][autosize][name=auth_json]'}($module_data->auth_json ?: '').
		h::{'button[is=cs-button][type=submit]'}(
			$L->save,
			[
				'tooltip' => $L->save_info
			]
		)
	)
);

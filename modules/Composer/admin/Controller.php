<?php
/**
 * @package  Composer
 * @category modules
 * @author   Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license  0BSD
 */
namespace cs\modules\Composer\admin;
use
	h,
	cs\Config,
	cs\Language\Prefix,
	cs\Page;

class Controller {
	public static function general () {
		$L    = new Prefix('composer_');
		$Page = Page::instance();
		$Page->title($L->general);
		if (file_exists(DIR.'/storage/Composer/last_execution.log')) {
			require_once __DIR__.'/../ansispan.php';
			$Page->content(
				h::p($L->last_log).
				h::pre(
					ansispan(file_get_contents(DIR.'/storage/Composer/last_execution.log')),
					[
						'style' => 'background: #1a1a1a; overflow: auto'
					]
				)
			);
		}
		$Page->content(
			h::{'p.cs-text-center cs-button button.cs-composer-admin-force-update'}($L->force_update)
		);
	}

	/**
	 * @param \cs\Request $Request
	 */
	public static function auth_json ($Request) {
		$L    = new Prefix('composer_');
		$Page = Page::instance();
		$Page->title($L->auth_json);
		$module_data = Config::instance()->module('Composer');
		$auth_json   = $Request->data('auth_json');
		if ($auth_json !== null) {
			$module_data->auth_json = $auth_json;
			$Page->success($L->changes_saved);
		}
		$Page->content(
			h::{'cs-form form'}(
				h::label($L->auth_json_contents).
				h::{'p cs-textarea[autosize] textarea[name=auth_json]'}($module_data->auth_json ?: '').
				h::cs_button(
					h::{'button[type=submit]'}($L->save),
					[
						'tooltip' => $L->save_info
					]
				)
			)
		);
	}
}

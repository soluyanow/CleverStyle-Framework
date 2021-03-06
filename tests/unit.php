<?php
/**
 * @package    CleverStyle Framework
 * @subpackage Test
 * @author     Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license    0BSD
 */
namespace cs;

if (!defined('CORE')) {
	define('CORE', realpath(__DIR__.'/../core'));
}
require_once __DIR__.'/code_coverage.php';

require_once __DIR__.'/../core/traits/Singleton/Base.php';
require_once __DIR__.'/Singleton.php';
require_once __DIR__.'/Mock_object.php';
require_once __DIR__.'/functions.php';
require_once __DIR__.'/../core/thirdparty/upf.php';
require_once __DIR__.'/../core/thirdparty/cli/cli.php';
require_once __DIR__.'/../core/functions.php';

if (!defined('DEBUG')) {
	define('DEBUG', false);
}

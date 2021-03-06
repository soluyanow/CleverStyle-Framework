<?php
/**
 * @package  Photo gallery
 * @category modules
 * @author   Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license  0BSD
 */
namespace cs\modules\Photo_gallery;
use
	cs\ExitException,
	cs\Page,
	cs\Request,
	cs\User;

$Request = Request::instance();
$User    = User::instance();
if (!$User->user()) {
	throw new ExitException(403);
}
if (!isset($Request->route[1])) {
	throw new ExitException(400);
}
$Photo_gallery = Photo_gallery::instance();
$image         = $Photo_gallery->get($Request->route[1]);
if (!$image) {
	throw new ExitException(404);
}
if ($User->admin() || $image['user'] == $User->id) {
	$Photo_gallery->del($image['id']);
	Page::instance()->json('ok');
} else {
	throw new ExitException(403);
}

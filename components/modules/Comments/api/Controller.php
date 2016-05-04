<?php
/**
 * @package   Comments
 * @category  modules
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2011-2016, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */
namespace cs\modules\Comments\api;
use
	cs\Event,
	cs\ExitException,
	cs\Language,
	cs\User,
	cs\modules\Comments\Comments;

/**
 * Provides next events:
 *  api/Comments/add
 *  [
 *   'item'   => item    //Item id
 *   'module' => module  //Module
 *   'allow'  => &$allow //Whether allow or not
 *  ]
 *
 *  api/Comments/edit
 *  [
 *   'id'     => id      //Comment id
 *   'user'   => user    //User id
 *   'item'   => item_id //Item id
 *   'module' => module  //Module
 *   'allow'  => &$allow //Whether allow or not
 *  ]
 *
 *  api/Comments/delete
 *  [
 *   'id'     => id      //Comment id
 *   'user'   => user    //User id
 *   'item'   => item_id //Item id
 *   'module' => module  //Module
 *   'allow'  => &$allow //Whether allow or not
 *  ]
 */
class Controller {
	/**
	 * @param \cs\Request $Request
	 *
	 * @return array|array[]
	 *
	 * @throws ExitException
	 */
	static function index_get ($Request) {
		$query    = $Request->query('module', 'item');
		$id       = $Request->route_ids(0);
		$Comments = Comments::instance();
		if ($query) {
			return $Comments->get(
				$Comments->get_for_module_item($query['module'], $query['item'])
			);
		} elseif ($id) {
			$comment = $Comments->get($id);
			if (!$comment) {
				throw new ExitException(404);
			}
			return $comment;
		}
		throw new ExitException(400);
	}
	/**
	 * @param \cs\Request $Request
	 *
	 * @return string
	 *
	 * @throws ExitException
	 */
	static function index_post ($Request) {
		if (!User::instance()->user()) {
			throw new ExitException(403);
		}
		$data = $Request->data('item', 'module', 'text', 'parent');
		if (!$data) {
			throw new ExitException(400);
		}
		$L = Language::prefix('comments_');
		if (!strip_tags($data['text'])) {
			throw new ExitException($L->comment_cant_be_empty, 400);
		}
		$allow = false;
		Event::instance()->fire(
			'api/Comments/add',
			[
				'item'   => $data['item'],
				'module' => $data['module'],
				'allow'  => &$allow
			]
		);
		if (!$allow) {
			throw new ExitException($L->comment_sending_server_error, 500);
		}
		$Comments = Comments::instance();
		$id       = $Comments->add($data['item'], $data['module'], $data['text'], $data['parent']);
		if (!$id) {
			throw new ExitException($L->comment_sending_server_error, 500);
		}
		$data             = $Comments->get($id);
		$data['comments'] = false;
		//TODO: get rid of this
		return $Comments->tree_html([$data]);
	}
	/**
	 * @param \cs\Request $Request
	 *
	 * @throws ExitException
	 */
	static function index_put ($Request) {
		if (!User::instance()->user()) {
			throw new ExitException(403);
		}
		$id = $Request->route(0);
		if (!$id) {
			throw new ExitException(400);
		}
		$L    = Language::prefix('comments_');
		$text = $Request->data('text');
		if (!strip_tags($text)) {
			throw new ExitException($L->comment_cant_be_empty, 400);
		}
		$Comments = Comments::instance();
		$comment  = $Comments->get($id);
		if (!$comment) {
			throw new ExitException(404);
		}
		$allow = false;
		Event::instance()->fire(
			'api/Comments/edit',
			[
				'id'     => $comment['id'],
				'user'   => $comment['user'],
				'item'   => $comment['item'],
				'module' => $comment['module'],
				'allow'  => &$allow
			]
		);
		if (
			!$allow ||
			!$Comments->set($comment['id'], $text)
		) {
			throw new ExitException($L->comment_editing_server_error, 500);
		}
		//TODO: get rid of this
		return $Comments->get($comment['id'])['text'];
	}
	/**
	 * @param \cs\Request $Request
	 *
	 * @return string
	 *
	 * @throws ExitException
	 */
	static function index_delete ($Request) {
		if (!User::instance()->user()) {
			throw new ExitException(403);
		}
		$id = $Request->route(0);
		if (!$id) {
			throw new ExitException(400);
		}
		$Comments = Comments::instance();
		$comment  = $Comments->get($id);
		if (!$comment) {
			throw new ExitException(404);
		}
		$allow = false;
		Event::instance()->fire(
			'api/Comments/delete',
			[
				'id'     => $comment['id'],
				'user'   => $comment['user'],
				'item'   => $comment['item'],
				'module' => $comment['module'],
				'allow'  => &$allow
			]
		);
		$L = Language::prefix('comments_');
		if (
			!$allow ||
			!$Comments->del($comment['id'])
		) {
			throw new ExitException($L->comment_deleting_server_error, 500);
		}
		//TODO: get rid of this
		return '';
	}
}

<?php
/**
 * @package CleverStyle Framework
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
/**
 * Provides next events:<br>
 *
 *  System/User/Group/add
 *  ['id' => <i>group_id</i>]
 *
 *  System/User/Group/del/before
 *  ['id' => <i>group_id</i>]
 *
 *  System/User/Group/del/after
 *  ['id' => <i>group_id</i>]
 *
 */
namespace cs;
use
	cs\Permission\Any;

/**
 * Class for groups manipulating
 *
 * @method static $this instance($check = false)
 */
class Group {
	use
		CRUD_helpers,
		Singleton,
		Any;
	protected $data_model = [
		'id'          => 'int:0',
		'title'       => 'html',
		'description' => 'html'
	];
	protected $table      = '[prefix]groups';
	/**
	 * @var Cache\Prefix
	 */
	protected $cache;
	/**
	 * Returns database index
	 *
	 * @return int
	 */
	protected function cdb () {
		return Config::instance()->module('System')->db('users');
	}
	protected function construct () {
		$this->cache = Cache::prefix('groups');
	}
	/**
	 * Get group data
	 *
	 * @param int|int[] $id
	 *
	 * @return array|array[]|false
	 */
	public function get ($id) {
		if (is_array($id)) {
			return array_map([$this, 'get'], $id);
		}
		$id = (int)$id;
		if (!$id) {
			return false;
		}
		return $this->cache->get(
			$id,
			function () use ($id) {
				return $this->read($id);
			}
		);
	}
	/**
	 * Get array of all groups
	 *
	 * @return int[]
	 */
	public function get_all () {
		return $this->cache->get(
			'all',
			function () {
				return $this->search([], 1, PHP_INT_MAX, 'id', true);
			}
		);
	}
	/**
	 * Add new group
	 *
	 * @param string $title
	 * @param string $description
	 *
	 * @return false|int
	 */
	public function add ($title, $description) {
		$id = $this->create($title, $description);
		if ($id) {
			unset($this->cache->all);
			Event::instance()->fire(
				'System/User/Group/add',
				[
					'id' => $id
				]
			);
		}
		return $id;
	}
	/**
	 * Set group data
	 *
	 * @param int    $id
	 * @param string $title
	 * @param string $description
	 *
	 * @return bool
	 */
	public function set ($id, $title, $description) {
		$id     = (int)$id;
		$result = $this->update($id, $title, $description);
		if ($result) {
			$Cache = $this->cache;
			unset(
				$Cache->$id,
				$Cache->all
			);
		}
		return (bool)$result;
	}
	/**
	 * Delete group
	 *
	 * @param int|int[] $id
	 *
	 * @return bool
	 */
	public function del ($id) {
		if (is_array($id)) {
			return array_map_arguments_bool([$this, 'del'], $id);
		}
		$id = (int)$id;
		if (in_array($id, [User::ADMIN_GROUP_ID, User::USER_GROUP_ID])) {
			return false;
		}
		Event::instance()->fire(
			'System/User/Group/del/before',
			[
				'id' => $id
			]
		);
		$result = $this->db_prime()->q(
			[
				"DELETE FROM `[prefix]groups` WHERE `id` = $id",
				"DELETE FROM `[prefix]users_groups` WHERE `group` = $id"
			]
		);
		if ($result) {
			$this->del_permissions_all($id);
			$Cache = $this->cache;
			unset(
				Cache::instance()->{'users/groups'},
				$Cache->$id,
				$Cache->all
			);
			Event::instance()->fire(
				'System/User/Group/del/after',
				[
					'id' => $id
				]
			);
		}
		return (bool)$result;
	}
	/**
	 * Get group permissions
	 *
	 * @param int $group
	 *
	 * @return int[]|false
	 */
	public function get_permissions ($group) {
		return $this->get_any_permissions($group, 'group');
	}
	/**
	 * Set group permissions
	 *
	 * @param array $data
	 * @param int   $group
	 *
	 * @return bool
	 */
	public function set_permissions ($data, $group) {
		return $this->set_any_permissions($data, (int)$group, 'group');
	}
	/**
	 * Delete all permissions of specified group
	 *
	 * @param int $group
	 *
	 * @return bool
	 */
	public function del_permissions_all ($group) {
		return $this->del_any_permissions_all((int)$group, 'group');
	}
}

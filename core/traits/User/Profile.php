<?php
/**
 * @package CleverStyle Framework
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
namespace cs\User;
use
	cs\Config,
	cs\Event,
	cs\Language,
	cs\Session,
	cs\User,
	h;

/**
 * Trait that contains all methods for `cs\User` for working with user's profile
 *
 * @property \cs\Cache\Prefix $cache
 * @property int              $id
 *
 * @method \cs\DB\_Abstract db()
 * @method \cs\DB\_Abstract db_prime()
 * @method false|int[]      get_groups(false|int $user)
 */
trait Profile {
	/**
	 * Copy of columns list of users table for internal needs without Cache usage
	 * @var array
	 */
	protected $users_columns = [];
	/**
	 * Local cache of users data
	 * @var array
	 */
	protected $data = [];
	protected function initialize_data () {
		$this->users_columns = $this->cache->get(
			'columns',
			function () {
				return $this->db()->columns('[prefix]users');
			}
		);
	}
	/**
	 * Get data item of specified user
	 *
	 * @param string|string[] $item
	 * @param false|int       $user If not specified - current user assumed
	 *
	 * @return false|int|mixed[]|string|Properties If <i>$item</i> is integer - cs\User\Properties object will be returned
	 */
	public function get ($item, $user = false) {
		if (is_scalar($item) && ctype_digit((string)$item)) {
			return new Properties($item);
		}
		return $this->get_internal($item, $user);
	}
	/**
	 * Get data item of specified user
	 *
	 * @param string|string[] $item
	 * @param false|int       $user If not specified - current user assumed
	 *
	 * @return false|int|string|mixed[]
	 */
	protected function get_internal ($item, $user = false) {
		$user = (int)$user ?: $this->id;
		if (isset($this->data[$user])) {
			$data = $this->data[$user];
		} else {
			$data = $this->cache->get(
				$user,
				function () use ($user) {
					return $this->db()->qf(
						"SELECT *
						FROM `[prefix]users`
						WHERE `id` = $user
						LIMIT 1"
					) ?: false;
				}
			);
			if (!$data) {
				return false;
			} elseif ($this->memory_cache || $user == User::GUEST_ID) {
				$this->data[$user] = $data;
			}
		}
		/**
		 * If get an array of values
		 */
		if (is_array($item)) {
			$result = [];
			/**
			 * Trying to get value from the local cache, or make up an array of missing values
			 */
			foreach ($item as $i) {
				if (in_array($i, $this->users_columns)) {
					$result[$i] = $data[$i];
				}
			}
			return $result;
		}
		return in_array($item, $this->users_columns) ? $data[$item] : false;
	}
	/**
	 * Set data item of specified user
	 *
	 * @param array|string    $item Item-value array may be specified for setting several items at once
	 * @param int|null|string $value
	 * @param false|int       $user If not specified - current user assumed
	 *
	 * @return bool
	 */
	public function set ($item, $value = null, $user = false) {
		$user     = (int)$user ?: $this->id;
		$data_set = [];
		$data     = is_array($item) ? $item : [$item => $value];
		$result   = true;
		foreach (xap($data) as $i => $v) {
			$result = $result && $this->set_internal($i, $v, $user, $data_set);
		}
		if (!$result) {
			return false;
		}
		if (!$data_set) {
			return true;
		}
		$this->set_internal_correct_login($data_set, $user);
		$update = [];
		foreach (array_keys($data_set) as $column) {
			$update[] = "`$column` = ?";
		}
		$update = implode(', ', $update);
		$result = $this->db_prime()->q(
			"UPDATE `[prefix]users`
			SET $update
			WHERE `id` = '$user'",
			$data_set
		);
		if ($result) {
			unset($this->data[$user], $this->cache->$user);
		}
		return (bool)$result;
	}
	/**
	 * Set data item of specified user
	 *
	 * @param string     $item Item-value array may be specified for setting several items at once
	 * @param int|string $value
	 * @param int        $user If not specified - current user assumed
	 * @param array      $data_set
	 *
	 * @return bool
	 */
	protected function set_internal ($item, $value, $user, &$data_set) {
		if (!$this->set_internal_allowed($user, $item, $value)) {
			return false;
		}
		$old_value = $this->get($item, $user);
		if ($value == $old_value) {
			return true;
		}
		if ($item == 'language') {
			$value = $value && Language::instance()->get('clanguage', $value) == $value ? $value : '';
		} elseif ($item == 'timezone') {
			$value = in_array($value, get_timezones_list(), true) ? $value : '';
		} elseif ($item == 'avatar') {
			if (
				strpos($value, 'http://') !== 0 &&
				strpos($value, 'https://') !== 0
			) {
				$value = '';
			}
			$Event = Event::instance();
			$Event->fire(
				'System/upload_files/del_tag',
				[
					'url' => $old_value,
					'tag' => "users/$user/avatar"
				]
			);
			$Event->fire(
				'System/upload_files/add_tag',
				[
					'url' => $value,
					'tag' => "users/$user/avatar"
				]
			);
		}
		/**
		 * @var string $item
		 */
		$data_set[$item] = $value;
		if (in_array($item, ['login', 'email'], true)) {
			$old_value               = $this->get($item.'_hash', $user);
			$data_set[$item.'_hash'] = hash('sha224', $value);
			unset($this->cache->$old_value);
		} elseif ($item == 'password_hash' || ($item == 'status' && $value != User::STATUS_ACTIVE)) {
			Session::instance()->del_all($user);
		}
		return true;
	}
	/**
	 * Check whether setting specified item to specified value for specified user is allowed
	 *
	 * @param int    $user
	 * @param string $item
	 * @param string $value
	 *
	 * @return bool
	 */
	protected function set_internal_allowed ($user, $item, $value) {
		if (
			$user == User::GUEST_ID ||
			$item == 'id' ||
			!in_array($item, $this->users_columns, true)
		) {
			return false;
		}
		if (in_array($item, ['login', 'email'], true)) {
			$value = mb_strtolower($value);
			if (
				$item == 'email' &&
				!filter_var($value, FILTER_VALIDATE_EMAIL)
			) {
				return false;
			}
			if (
				$item == 'login' &&
				filter_var($value, FILTER_VALIDATE_EMAIL) &&
				$value != $this->get('email', $user)
			) {
				return false;
			}
			if ($value == $this->get($item, $user)) {
				return true;
			}
			$existing_user = $this->get_id(hash('sha224', $value)) ?: $user;
			return $value && $existing_user == $user;
		}
		return true;
	}
	/**
	 * A bit tricky here
	 *
	 * User is allowed to change login to own email, but not to any other email. However, when user changes email, it might happen that login will remain to
	 * be the same as previous email, so we need to change login to new email as well.
	 *
	 * @param array $data_set
	 * @param int   $user
	 */
	protected function set_internal_correct_login (&$data_set, $user) {
		/**
		 * @var array $old_data
		 */
		$old_data      = $this->get(['login', 'email'], $user);
		$current_login = isset($data_set['login']) ? $data_set['login'] : $old_data['login'];
		if (
			isset($data_set['email']) &&
			$current_login == $old_data['email']
		) {
			$data_set['login']      = $data_set['email'];
			$data_set['login_hash'] = $data_set['email_hash'];
		}
	}
	/**
	 * Get user id by login or email hash (sha224) (hash from lowercase string)
	 *
	 * @param  string $login_hash Login or email hash
	 *
	 * @return false|int User id if found and not guest, otherwise - boolean <i>false</i>
	 */
	public function get_id ($login_hash) {
		if (!preg_match('/^[0-9a-z]{56}$/', $login_hash)) {
			return false;
		}
		$id = $this->cache->get(
			$login_hash,
			function () use ($login_hash) {
				return (int)$this->db()->qfs(
					"SELECT `id`
					FROM `[prefix]users`
					WHERE
						`login_hash`	= '%s' OR
						`email_hash`	= '%s'
					LIMIT 1",
					$login_hash,
					$login_hash
				) ?: false;
			}
		);
		return $id && $id != User::GUEST_ID ? $id : false;
	}
	/**
	 * Get user avatar, if no one present - uses Gravatar
	 *
	 * @param int|null  $size Avatar size, if not specified or resizing is not possible - original image is used
	 * @param false|int $user If not specified - current user assumed
	 *
	 * @return string
	 */
	public function avatar ($size = null, $user = false) {
		$user         = (int)$user ?: $this->id;
		$avatar       = $this->get('avatar', $user);
		$Config       = Config::instance();
		$guest_avatar = $Config->core_url().'/assets/img/guest.svg';
		if (!$avatar && $this->id != User::GUEST_ID && $Config->core['gravatar_support']) {
			$email_hash = md5($this->get('email', $user));
			$avatar     = "https://www.gravatar.com/avatar/$email_hash?d=mm&s=$size&d=".urlencode($guest_avatar);
		}
		if (!$avatar) {
			$avatar = $guest_avatar;
		}
		return h::prepare_url($avatar, true);
	}
	/**
	 * Get user name or login or email, depending on existing information
	 *
	 * @param false|int $user If not specified - current user assumed
	 *
	 * @return string
	 */
	public function username ($user = false) {
		$user = (int)$user ?: $this->id;
		if ($user == User::GUEST_ID) {
			return Language::instance()->system_profile_guest;
		}
		$username = $this->get('username', $user);
		if (!$username) {
			$username = $this->get('login', $user);
		}
		return $username;
	}
	/**
	 * Returns array of users columns, available for getting of data
	 *
	 * @return array
	 */
	public function get_users_columns () {
		return $this->users_columns;
	}
}

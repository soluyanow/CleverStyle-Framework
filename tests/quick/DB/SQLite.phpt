--SKIPIF--
<?php
if (getenv('DB') != 'SQLite') {
	exit('skip only running for database SQLite engine');
}
?>
--FILE--
<?php
include __DIR__.'/../../unit.php';
$tmp = __DIR__.'/'.uniqid('sqlite', false).'.db';
$db = new \cs\DB\SQLite('', '', '', $tmp, uniqid('xyz_', false));
/**
 * @var \cs\DB\_Abstract $db
 */
if (!$db->connected()) {
	die('Connection failed:(');
}

$db->q(
	/** @lang SQLite */
	'CREATE TABLE `[prefix]test` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT , `title` VARCHAR(1024) NOT NULL , `description` TEXT NOT NULL , `value` FLOAT NOT NULL);'
);

$query = "INSERT INTO `[prefix]test` (`title`, `description`, `value`) VALUES ('%s', '%s', '%f')";
$result = $db->insert(
	$query,
	[
		[
			'Title 1',
			'Description 1',
			10.5
		]
	]
);
if ($result) {
	var_dump('single insert id', $db->id(), $db->affected());
}
$result = $db->insert(
	$query,
	[
		[
			'Title 2',
			'Description 2',
			11.5
		],
		[
			'Title 3',
			'Description 3',
			12.5
		]
	]
);
if ($result) {
	var_dump('multiple insert id', $db->affected());
}

$result = $db->q('SELECT `id`, `title` FROM `[prefix]test` ORDER BY `id` ASC');
if (!$result) {
	die('Simple query failed');
}
if (!$db->q(
	[
		'SELECT `id`, `title` FROM `[prefix]test` ORDER BY `id` ASC',
		'SELECT `id`, `title` FROM `[prefix]test` ORDER BY `id` ASC'
	]
)) {
	die('Multi query failed');
}
$u = $db->f($result);
var_dump('single row', $u);
$u = $db->f($result, true);
var_dump('single row single column', $u);

$result = $db->q('SELECT `id`, `title` FROM `[prefix]test` ORDER BY `id` ASC');
var_dump('multiple rows', $db->f($result, false, true));

$result = $db->q('SELECT `id`, `title` FROM `[prefix]test` ORDER BY `id` ASC');
$u      = $db->f($result, true, true);
var_dump('multiple rows single column', $u);

$result = $db->q('SELECT `id`, `title` FROM `[prefix]test` ORDER BY `id` ASC');
$u      = $db->f($result, false, true, true);
var_dump('multiple rows indexed array', $u);

$result = $db->q('SELECT `id`, `title` FROM `[prefix]test` ORDER BY `id` ASC');
$u      = $db->f($result, true, true, true);
var_dump('multiple rows indexed array single column', $u);

var_dump('->qf()', $db->qf("SELECT * FROM `[prefix]test` ORDER BY `id` ASC"));
var_dump('->qf(..., 2)', $db->qf("SELECT * FROM `[prefix]test` WHERE `id` = '%d' ORDER BY `id` ASC", 2));
var_dump('->qfs()', $db->qfs("SELECT * FROM `[prefix]test` ORDER BY `id` ASC"));
var_dump('->qfa()', $db->qfa("SELECT * FROM `[prefix]test` ORDER BY `id` ASC"));
var_dump('->qfas()', $db->qfas("SELECT * FROM `[prefix]test`"));
var_dump('columns list', $db->columns('[prefix]test'));
var_dump('columns list like title', $db->columns('[prefix]test', 'title'));
var_dump('columns list like titl%', $db->columns('[prefix]test', 'titl%'));
var_dump('tables list', $db->tables());
var_dump('tables list like [prefix]test', $db->tables('[prefix]test'));
var_dump('tables list like [prefix]test%', $db->tables('[prefix]test%'));
$db->transaction(function ($db) {
	/**
	 * @var \cs\DB\MySQLi $db
	 */
	$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
	return false;
});
var_dump('transaction for deletion: rollback #1', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
try {
	$db->transaction(function ($db) {
		/**
		 * @var \cs\DB\MySQLi $db
		 */
		$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
		throw new Exception;
	});
} catch (Exception $e) {
	var_dump('thrown exception '.get_class($e));
}
var_dump('transaction for deletion: rollback #2', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
try {
	$db->transaction(function ($db) {
		/**
		 * @var \cs\DB\MySQLi $db
		 */
		$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
		$db->transaction(function () {
			throw new Exception;
		});
	});
} catch (Exception $e) {
	var_dump('thrown exception '.get_class($e));
}
var_dump('transaction for deletion: rollback #3 (nested transaction)', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
try {
	$db->transaction(function ($db) {
		/**
		 * @var \cs\DB\MySQLi $db
		 */
		$db->transaction(function ($db) {
			/**
			 * @var \cs\DB\MySQLi $db
			 */
			$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
		});
		throw new Exception;
	});
} catch (Exception $e) {
	var_dump('thrown exception '.get_class($e));
}
var_dump('transaction for deletion: rollback #4 (nested transaction)', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
$db->transaction(function ($db) {
	/**
	 * @var \cs\DB\MySQLi $db
	 */
	$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
});
var_dump('transaction for deletion: commit', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
$db->q('DROP TABLE `[prefix]test`');
unset($db);
unlink($tmp);
?>
--EXPECTF--
string(16) "single insert id"
int(1)
int(1)
string(18) "multiple insert id"
int(2)
string(10) "single row"
array(2) {
  ["id"]=>
  int(1)
  ["title"]=>
  string(7) "Title 1"
}
string(24) "single row single column"
int(2)
string(13) "multiple rows"
array(3) {
  [0]=>
  array(2) {
    ["id"]=>
    int(1)
    ["title"]=>
    string(7) "Title 1"
  }
  [1]=>
  array(2) {
    ["id"]=>
    int(2)
    ["title"]=>
    string(7) "Title 2"
  }
  [2]=>
  array(2) {
    ["id"]=>
    int(3)
    ["title"]=>
    string(7) "Title 3"
  }
}
string(27) "multiple rows single column"
array(3) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
}
string(27) "multiple rows indexed array"
array(3) {
  [0]=>
  array(2) {
    [0]=>
    int(1)
    [1]=>
    string(7) "Title 1"
  }
  [1]=>
  array(2) {
    [0]=>
    int(2)
    [1]=>
    string(7) "Title 2"
  }
  [2]=>
  array(2) {
    [0]=>
    int(3)
    [1]=>
    string(7) "Title 3"
  }
}
string(41) "multiple rows indexed array single column"
array(3) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
}
string(6) "->qf()"
array(4) {
  ["id"]=>
  int(1)
  ["title"]=>
  string(7) "Title 1"
  ["description"]=>
  string(13) "Description 1"
  ["value"]=>
  float(10.5)
}
string(12) "->qf(..., 2)"
array(4) {
  ["id"]=>
  int(2)
  ["title"]=>
  string(7) "Title 2"
  ["description"]=>
  string(13) "Description 2"
  ["value"]=>
  float(11.5)
}
string(7) "->qfs()"
int(1)
string(7) "->qfa()"
array(3) {
  [0]=>
  array(4) {
    ["id"]=>
    int(1)
    ["title"]=>
    string(7) "Title 1"
    ["description"]=>
    string(13) "Description 1"
    ["value"]=>
    float(10.5)
  }
  [1]=>
  array(4) {
    ["id"]=>
    int(2)
    ["title"]=>
    string(7) "Title 2"
    ["description"]=>
    string(13) "Description 2"
    ["value"]=>
    float(11.5)
  }
  [2]=>
  array(4) {
    ["id"]=>
    int(3)
    ["title"]=>
    string(7) "Title 3"
    ["description"]=>
    string(13) "Description 3"
    ["value"]=>
    float(12.5)
  }
}
string(8) "->qfas()"
array(3) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
}
string(12) "columns list"
array(4) {
  [0]=>
  string(2) "id"
  [1]=>
  string(5) "title"
  [2]=>
  string(11) "description"
  [3]=>
  string(5) "value"
}
string(23) "columns list like title"
array(1) {
  [0]=>
  string(5) "title"
}
string(23) "columns list like titl%"
array(1) {
  [0]=>
  string(5) "title"
}
string(11) "tables list"
array(1) {
  [0]=>
  string(%d) "xyz_%stest"
}
string(29) "tables list like [prefix]test"
array(1) {
  [0]=>
  string(%d) "xyz_%stest"
}
string(30) "tables list like [prefix]test%"
array(1) {
  [0]=>
  string(%d) "xyz_%stest"
}
string(37) "transaction for deletion: rollback #1"
int(2)
string(26) "thrown exception Exception"
string(37) "transaction for deletion: rollback #2"
int(2)
string(26) "thrown exception Exception"
string(58) "transaction for deletion: rollback #3 (nested transaction)"
int(2)
string(26) "thrown exception Exception"
string(58) "transaction for deletion: rollback #4 (nested transaction)"
int(2)
string(32) "transaction for deletion: commit"
bool(false)
--SKIPIF--
<?php
if (getenv('DB') != 'SQLite') {
	exit('skip only running for database SQLite driver');
}
?>
--FILE--
<?php
include __DIR__.'/../../unit.php';
$tmp = __DIR__.'/'.uniqid('sqlite', false).'.db';
$db  = new \cs\DB\SQLite('', '', '', $tmp, uniqid('xyz_', false));
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

$query  = "INSERT INTO `[prefix]test` (`title`, `description`, `value`) VALUES ('%s', '%s', '%f')";
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
	var_dump('single insert id', $result, $db->id(), $db->affected());
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
$result = $db->insert(
	$query,
	[
		[
			'Title 4',
			'Description 2',
			11.5
		],
		[
			'Title 5',
			'Description 3',
			12.5
		]
	],
	false
);
if ($result) {
	var_dump('multiple insert id without join', $db->affected());
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
)
) {
	die('Multi query failed');
}

var_dump('Multi query with prepared statements');
var_dump(
	$db->q(
		[
			'SELECT `id`, `title` FROM `[prefix]test` WHERE `id` = ?',
			'SELECT `id`, `title` FROM `[prefix]test` WHERE `id` = ?'
		],
		1
	)
);

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
var_dump('->qf(..., 2), prepared statement', $db->qf("SELECT * FROM `[prefix]test` WHERE `id` = ?", 2));
var_dump('->qf(..., 2), prepared statement, more arguments than needed', $db->qf("SELECT * FROM `[prefix]test` WHERE `id` = ? LIMIT ?", 2, 1, 3));
var_dump('->qfs()', $db->qfs("SELECT * FROM `[prefix]test` ORDER BY `id` ASC"));
var_dump('->qfs(..., 2), prepared statement', $db->qfs("SELECT * FROM `[prefix]test` WHERE `id` = ?", 2));
var_dump('->qfa()', $db->qfa("SELECT * FROM `[prefix]test` ORDER BY `id` ASC"));
var_dump('->qfa(..., 2), prepared statement', $db->qfa("SELECT * FROM `[prefix]test` WHERE `id` = ?", 2));
var_dump('->qfas()', $db->qfas("SELECT * FROM `[prefix]test`"));
var_dump('->f(->q(..., 1), false, true, true), prepared statement', $db->f($db->q("SELECT * FROM `[prefix]test` WHERE `id` > ?", 1), false, true, true));
var_dump('columns list', $db->columns('[prefix]test'));
var_dump('columns list like title', $db->columns('[prefix]test', 'title'));
var_dump('columns list like titl%', $db->columns('[prefix]test', 'titl%'));
var_dump('tables list', $db->tables());
var_dump('tables list like [prefix]test', $db->tables('[prefix]test'));
var_dump('tables list like [prefix]test%', $db->tables('[prefix]test%'));
$db->transaction(
	function ($db) {
		/**
		 * @var \cs\DB\MySQLi $db
		 */
		$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
		return false;
	}
);
var_dump('transaction for deletion: rollback #1', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
try {
	$db->transaction(
		function ($db) {
			/**
			 * @var \cs\DB\MySQLi $db
			 */
			$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
			throw new Exception;
		}
	);
} catch (Exception $e) {
	var_dump('thrown exception '.get_class($e));
}
var_dump('transaction for deletion: rollback #2', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
try {
	$db->transaction(
		function ($db) {
			/**
			 * @var \cs\DB\MySQLi $db
			 */
			$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
			$db->transaction(
				function () {
					throw new Exception;
				}
			);
		}
	);
} catch (Exception $e) {
	var_dump('thrown exception '.get_class($e));
}
var_dump('transaction for deletion: rollback #3 (nested transaction)', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
try {
	$db->transaction(
		function ($db) {
			/**
			 * @var \cs\DB\MySQLi $db
			 */
			$db->transaction(
				function ($db) {
					/**
					 * @var \cs\DB\MySQLi $db
					 */
					$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
				}
			);
			throw new Exception;
		}
	);
} catch (Exception $e) {
	var_dump('thrown exception '.get_class($e));
}
var_dump('transaction for deletion: rollback #4 (nested transaction)', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));
$db->transaction(
	function ($db) {
		/**
		 * @var \cs\DB\MySQLi $db
		 */
		$db->q('DELETE FROM `[prefix]test` WHERE `id` = 2');
	}
);
var_dump('transaction for deletion: commit', $db->qfs("SELECT `id` FROM `[prefix]test` WHERE `id` = 2"));

var_dump('Empty query string');
var_dump($db->q(''));
var_dump($db->q(['']));

var_dump('Empty insert query string');
var_dump($db->insert('', []));

var_dump('Bad fetch object');
var_dump($db->f(false));

var_dump('Call free on wrong argument');
var_dump($db->free(false));

var_dump('Bad columns table');
var_dump($db->columns(''));

var_dump('Server info');
var_dump($db->server());

var_dump('Unsupported columns call');
var_dump($db->columns('[prefix]test', '%tle'));

var_dump('DB type', $db->db_type());
var_dump('Database name', $db->database());
var_dump('Queries count', $db->queries_count());
var_dump('Time', $db->time());
var_dump('Connecting time', $db->connecting_time());

$db->q('DROP TABLE `[prefix]test`');

unset($db, $e);
unlink($tmp);

var_dump('Bad connection settings');
var_dump(@(new \cs\DB\SQLite(''))->connected());
?>
--EXPECTF--
string(16) "single insert id"
bool(true)
int(1)
int(1)
string(18) "multiple insert id"
int(2)
string(31) "multiple insert id without join"
int(1)
string(36) "Multi query with prepared statements"
bool(true)
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
array(5) {
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
  [3]=>
  array(2) {
    ["id"]=>
    int(4)
    ["title"]=>
    string(7) "Title 4"
  }
  [4]=>
  array(2) {
    ["id"]=>
    int(5)
    ["title"]=>
    string(7) "Title 5"
  }
}
string(27) "multiple rows single column"
array(5) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
  [3]=>
  int(4)
  [4]=>
  int(5)
}
string(27) "multiple rows indexed array"
array(5) {
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
  [3]=>
  array(2) {
    [0]=>
    int(4)
    [1]=>
    string(7) "Title 4"
  }
  [4]=>
  array(2) {
    [0]=>
    int(5)
    [1]=>
    string(7) "Title 5"
  }
}
string(41) "multiple rows indexed array single column"
array(5) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
  [3]=>
  int(4)
  [4]=>
  int(5)
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
string(32) "->qf(..., 2), prepared statement"
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
string(60) "->qf(..., 2), prepared statement, more arguments than needed"
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
string(33) "->qfs(..., 2), prepared statement"
int(2)
string(7) "->qfa()"
array(5) {
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
  [3]=>
  array(4) {
    ["id"]=>
    int(4)
    ["title"]=>
    string(7) "Title 4"
    ["description"]=>
    string(13) "Description 2"
    ["value"]=>
    float(11.5)
  }
  [4]=>
  array(4) {
    ["id"]=>
    int(5)
    ["title"]=>
    string(7) "Title 5"
    ["description"]=>
    string(13) "Description 3"
    ["value"]=>
    float(12.5)
  }
}
string(33) "->qfa(..., 2), prepared statement"
array(1) {
  [0]=>
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
}
string(8) "->qfas()"
array(5) {
  [0]=>
  int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
  [3]=>
  int(4)
  [4]=>
  int(5)
}
string(55) "->f(->q(..., 1), false, true, true), prepared statement"
array(4) {
  [0]=>
  array(4) {
    [0]=>
    int(2)
    [1]=>
    string(7) "Title 2"
    [2]=>
    string(13) "Description 2"
    [3]=>
    float(11.5)
  }
  [1]=>
  array(4) {
    [0]=>
    int(3)
    [1]=>
    string(7) "Title 3"
    [2]=>
    string(13) "Description 3"
    [3]=>
    float(12.5)
  }
  [2]=>
  array(4) {
    [0]=>
    int(4)
    [1]=>
    string(7) "Title 4"
    [2]=>
    string(13) "Description 2"
    [3]=>
    float(11.5)
  }
  [3]=>
  array(4) {
    [0]=>
    int(5)
    [1]=>
    string(7) "Title 5"
    [2]=>
    string(13) "Description 3"
    [3]=>
    float(12.5)
  }
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
string(18) "Empty query string"
bool(false)
bool(false)
string(25) "Empty insert query string"
bool(false)
string(16) "Bad fetch object"
bool(false)
string(27) "Call free on wrong argument"
bool(true)
string(17) "Bad columns table"
bool(false)
string(11) "Server info"
string(%s) "%d.%d.%d%S"
string(24) "Unsupported columns call"
%A
Warning: Can't get columns like %tle, SQLite driver doesn't support such conditions in %s/core/drivers/DB/SQLite.php on line %d
array(0) {
}
string(7) "DB type"
string(6) "sqlite"
string(13) "Database name"
string(0) ""
string(13) "Queries count"
int(42)
string(4) "Time"
float(%f)
string(15) "Connecting time"
float(%f)
string(23) "Bad connection settings"
bool(false)

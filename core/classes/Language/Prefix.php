<?php
/**
 * @package CleverStyle Framework
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
namespace cs\Language;
use
	cs\Language;
/**
 * Class for simplified work with translations, when using common prefix
 */
class Prefix {
	/**
	 * @var string
	 */
	protected $prefix;
	/**
	 * Initialization with some prefix
	 *
	 * @param string $prefix
	 */
	public function __construct ($prefix) {
		$this->prefix = $prefix;
	}
	/**
	 * Get translation
	 *
	 * @param string       $item
	 * @param false|string $language If specified - translation for specified language will be returned, otherwise for current
	 *
	 * @return string
	 */
	public function get ($item, $language = false) {
		return Language::instance()->get($item, $language, $this->prefix);
	}
	/**
	 * Get translation
	 *
	 * @param string $item
	 *
	 * @return string
	 */
	public function __get ($item) {
		return Language::instance()->get($item, false, $this->prefix);
	}
	/**
	 * Time formatting according to the current language (adding correct endings)
	 *
	 * @param int    $in   time (number)
	 * @param string $type Type of formatting<br>
	 *                     s - seconds<br>m - minutes<br>h - hours<br>d - days<br>M - months<br>y - years
	 *
	 * @return string
	 */
	public function time ($in, $type) {
		return Language::instance()->time($in, $type);
	}
	/**
	 * Allows to use formatted strings in translations
	 *
	 * @see format()
	 *
	 * @param string $item
	 * @param array  $arguments
	 *
	 * @return string
	 */
	public function __call ($item, $arguments) {
		return Language::instance()->format($item, $arguments, false, $this->prefix);
	}
	/**
	 * Allows to use formatted strings in translations
	 *
	 * @param string       $item
	 * @param string[]     $arguments
	 * @param false|string $language If specified - translation for specified language will be returned, otherwise for current
	 *
	 * @return string
	 */
	public function format ($item, $arguments, $language = false) {
		return Language::instance()->format($item, $arguments, $language, $this->prefix);
	}
	/**
	 * Formatting data according to language locale (translating months names, days of week, etc.)
	 *
	 * @param string|string[] $data
	 * @param bool            $short_may When in date() or similar functions "M" format option is used, third month "May" have the same short textual
	 *                                   representation as full, so, this option allows to specify, which exactly form of representation do you want
	 *
	 * @return string|string[]
	 */
	public function to_locale ($data, $short_may = false) {
		return Language::instance()->to_locale($data, $short_may);
	}
}

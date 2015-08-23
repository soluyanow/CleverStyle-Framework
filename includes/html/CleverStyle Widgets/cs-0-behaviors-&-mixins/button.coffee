###*
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2015, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
###
Polymer.cs.behaviors.button =
	properties	:
		active	:
			notify				: true
			reflectToAttribute	: true
			type				: Boolean
		empty	:
			reflectToAttribute	: true
			type				: Boolean
		icon	:
			reflectToAttribute	: true
			type				: String
		primary	:
			reflectToAttribute	: true
			type				: Boolean
	ready : ->
		if !@childNodes.length
			@empty = true
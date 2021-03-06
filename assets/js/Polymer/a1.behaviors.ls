/**
 * @package CleverStyle Framework
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
normalize_bool	= (value) ->
	value && value != '0'
styles			= {}
window.{}cs.{}Polymer.behaviors =
	/**
	 * Simplified access to translations in Polymer elements
	 *
	 * This will add `Language` property (and its short alias `L`) alongside with `__()` method which can be used for formatted translations
	 * Also might be called as function with prefix
	 */
	Language : do ->
		function Language (prefix)
			# Need to copy properties to own properties
			Object.create(Language)
				..properties				= ..properties
				.._set_language_properties	= .._set_language_properties
				.._compute__				= .._compute__
				..ready						= !->
					cs.Language(prefix).ready().then (L) !~>
						@_set_language_properties(L)
		Language
			..properties				=
				Language	:
					readOnly	: true
					type  		: Object
				L			:
					readOnly	: true
					type  		: Object
				__			:
					type		: Function
					computed	: '_compute__(Language)'
			..ready						= !->
				cs.Language.ready().then (L) !~>
					@_set_language_properties(L)
			.._compute__				= (L) ->
				(key) ->
					if arguments.length == 1
						L.get(key)
					else
						L.format(...&)
			.._set_language_properties	= (L) !->
				@_setLanguage(L)
				@_setL(L)
	/**
	 * Some useful computed bindings methods
	 */
	computed_bindings :
		# if(condition, then [, otherwise [, prefix [, postfix]]])
		if : (condition, then_, otherwise = '', prefix = '', postfix = '') ->
			'' + prefix + (if condition then then_ else otherwise) + postfix

		# join(array [, separator = ','])
		join : (array, separator) ->
			array.join(if separator != undefined then separator else ',')

		# concat(thing [, another [, ...]])
		concat : (thing, another) ->
			Array.prototype.slice.call(arguments).join('')

		# and(x, y [, z [,...]])
		and : (x, y, z) ->
			!!Array.prototype.slice.call(arguments).reduce (x, y) -> normalize_bool(x) && normalize_bool(y)

		# or(x, y [, z [,...]])
		or : (x, y, z) ->
			!!Array.prototype.slice.call(arguments).reduce (x, y) -> normalize_bool(x) || normalize_bool(y)

		# xor(x, y [, z [,...]])
		xor : (x, y, z) ->
			Array.prototype.slice.call(arguments).reduce (x, y) -> !normalize_bool(x) != !normalize_bool(y)

		# equal(a, b, strict = false)
		equal : (a, b, strict) ->
			if strict then a == b else a ~= b
	inject_light_styles	:
		attached : !->
			# Hack: The only way to achieve proper styling inside of some element, otherwise new slots system doesn't give us enough flexibility
			if @_styles_dom_module_added
				return
			@_styles_dom_module_added	= true
			if !styles[@_styles_dom_module]
				head	= document.querySelector('head')
				head.insertAdjacentHTML(
					'beforeend',
					"""<custom-style><style include="#{@_styles_dom_module}"></style></custom-style>"""
				)
				custom_style_element	= head.lastElementChild
				cs.ui.ready.then !~>
					Polymer.updateStyles()
					styles[@_styles_dom_module]	= custom_style_element.firstElementChild.textContent.split(':not([style-scope]):not(.style-scope)').join('')
					head.removeChild(custom_style_element)
					@insertAdjacentHTML('beforeend', "<style>#{styles[@_styles_dom_module]}</style>")
			else
				@insertAdjacentHTML('beforeend', "<style>#{styles[@_styles_dom_module]}</style>")

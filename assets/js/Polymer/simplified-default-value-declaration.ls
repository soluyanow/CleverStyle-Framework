/**
 * @package CleverStyle Framework
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
# Simplified default value declaration
normalize_properties		= (properties) !->
	if properties
		for property, value of properties
			type =
				switch typeof value
				| 'boolean'	=> Boolean
				| 'number'	=> Number
				| 'string'	=> String
				| otherwise	=>
					if value instanceof Date
						Date
					else if value instanceof Array
						Array
			if type
				properties[property] =
					type	: type,
					value	: value
polymerFn_original	= Polymer._polymerFn
Polymer._polymerFn	= (info) ->
	if typeof info != 'function'
		normalize_properties(info.properties)
		if info.behaviors
			info.behaviors.forEach (behavior) !->
				normalize_properties(behavior.properties)
	polymerFn_original.call(@, info)

/**
 * @package    CleverStyle Framework
 * @subpackage System module
 * @category   modules
 * @author     Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license    0BSD
 */
url_map = {
	"admin/System/components/modules"   : "cs-system-admin-modules-list",
	"admin/System/components/blocks"    : "cs-system-admin-blocks-list",
	"admin/System/components/databases" : "cs-system-admin-databases-list",
	"admin/System/components/storages"  : "cs-system-admin-storages-list",
	"admin/System/general/site_info"    : "cs-system-admin-site-info",
	"admin/System/general/system"       : "cs-system-admin-system",
	"admin/System/general/optimization" : "cs-system-admin-optimization",
	"admin/System/general/appearance"   : "cs-system-admin-themes",
	"admin/System/general/languages"    : "cs-system-admin-languages",
	"admin/System/general/about_server" : "cs-system-admin-about-server",
	"admin/System/users/general"        : "cs-system-admin-users-general",
	"admin/System/users/users"          : "cs-system-admin-users-list",
	"admin/System/users/groups"         : "cs-system-admin-groups-list",
	"admin/System/users/permissions"    : "cs-system-admin-permissions-list",
	"admin/System/users/security"       : "cs-system-admin-security",
	"admin/System/users/mail"           : "cs-system-admin-mail"
}
<-! cs.ui.ready.then
# Hack: should be `cs-group > button`, but fails in Firefox (https://github.com/Polymer/polymer/issues/3809)
buttons	= document.querySelectorAll('body > header > cs-group cs-button')
links	= document.querySelectorAll('body > header > cs-group a')
for link in links
	link.addEventListener('mousedown', (e) !->
		# We are interested in left click only
		if e.which == 1
			e.preventDefault()
			href	= @getAttribute('href')
			go(href)
			history.pushState({}, document.title, href)
	)
	link.addEventListener('click', (e) ->
		# Ignore left click
		if e.which == 1
			e.preventDefault()
			e.stopPropagation()
	)
title_format	= document.title
!function go (href)
	href_splitted	= href.split('/')
	Promise.all([
		cs.Language('system_admin_').ready()
		require(['sprintf-js'])
	]).then ([L, [{sprintf}]]) !->
		document.title	= sprintf(
			title_format
			L[href_splitted[2]]
			L[href_splitted[3]]
		)
	document.querySelector('#main_content > div').innerHTML	= '<' + url_map[href] + '/>'
	for button in buttons
		button.primary	= false
	for link in links
		if !link.matches("[href='#href']")
			link.parentElement.primary = false
		else
			link.parentElement.primary														= true
			link.parentElement.parentElement.parentElement.previousElementSibling.primary	= true
!function popstate (e)
	if location.href.indexOf('admin/System/') != -1
		go(
			location.href.match(/admin\/System\/\w+\/\w+/)[0]
		)
	else
		href = location.href.split('?')[0]
		if href.substr(-1) == '/'
			href = href.substr(0, href.length - 1)
		if href == document.baseURI + 'admin' || href == document.baseURI + 'admin/System'
			go('admin/System/components/modules')
addEventListener('popstate', popstate)
popstate()

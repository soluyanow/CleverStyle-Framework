<?php
/**
 * @package		Blogs
 * @category	modules
 * @author		Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright	Copyright (c) 2011-2012 by Nazar Mokrynskyi
 * @license		MIT License, see license.txt
 */
namespace	cs\modules\Blogs;
use			\h;
global $Index, $Blogs, $Page, $L, $User, $db, $Config;
$rc						= array_slice($Config->routing['current'], 1);
$structure				= $Blogs->get_sections_structure();
$section				= 0;
$keywords				= [];
$description			= [];
foreach ($rc as $path) {
	if ($structure['posts']	== 0 && isset($structure['sections'][$path])) {
		array_shift($rc);
		$structure		= $structure['sections'][$path];
		$Page->title($structure['title']);
		$keywords[]		= $structure['title'];
		$description[]	= $structure['title'];
	} else {
		break;
	}
}
if (isset($structure['id'])) {
	$section	= $structure['id'];
} else {
	define('ERROR_PAGE', 404);
}
$Page->title($L->latest_posts);
$Page->Keywords			= keywords($L->{MODULE}.' '.implode(' ', $keywords).' '.$L->latest_posts).', '.$Page->Keywords;
$Page->Description		= description($L->{MODULE}.' - '.implode(' - ', $description).' - '.$L->latest_posts.'. '.$Page->Description);
$module					= path($L->{MODULE});
if ($User->is('user')) {
	if ($User->is('admin') && $User->get_user_permission('admin/'.MODULE, 'index')) {
		$Index->content(
			h::{'a.cs-button-compact'}(
				h::icon('wrench'),
				[
					'href'			=> 'admin/'.MODULE,
					'data-title'	=> $L->administration
				]
			)
		);
	}
	$Index->content(
		h::{'a.cs-button-compact'}(
			h::icon('document'),
			[
				'href'			=> $module.'/new_post/'.$section,
				'data-title'	=> $L->new_post
			]
		).
		h::br()
	);
}
$Index->form			= true;
$Index->buttons			= false;
$Index->form_atributes	= ['class'	=> ''];
$page					= isset($rc[0]) ? (int)$rc[0] : 1;
$page					= $page > 0 ? $page : 1;
if ($page > 1) {
	$Page->title($L->blog_nav_page($page));
}
$num					= $Config->module(MODULE)->get('posts_per_page');
$from					= ($page - 1) * $num;
$cdb					= $db->{$Config->module(MODULE)->db('posts')};
$posts					= $cdb->qfa(
	"SELECT `id`
	FROM `[prefix]blogs_posts_sections`
	WHERE `section` = $section
	ORDER BY `date` DESC
	LIMIT $from, $num",
	true
);
if (empty($posts)) {
	$Index->content(
		h::{'p.cs-center'}($L->no_posts_yet)
	);
}
$Index->content(
	h::{'section.cs-blogs-post-latest'}(
		get_posts_list($posts, $module)
	).
	(
		$posts ? h::{'nav.cs-center'}(
			pages(
				$page,
				ceil($structure['posts']/$num),
				function ($page) use ($module, $L) {
					return $page == 1 ? $module.'/'.path($L->latest_posts) : $module.'/'.path($L->latest_posts).'/'.$page;
				},
				true
			)
		) : ''
	)
);
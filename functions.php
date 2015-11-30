<?php

function wpml_tmm_admin_menu() {
	add_options_page(
		WPML_TMM_ADMIN_MENU_NAME,
		WPML_TMM_ADMIN_MENU_NAME,
		'administrator',
		'wpml-tmm',
		'wpml_tmm_render_admin_menu'
	);
}

function wpml_tmm_render_admin_menu() {
	$menu = new WPML_TMM_Menu();
	$menu->render();
}

add_action( 'admin_menu', 'wpml_tmm_admin_menu' );
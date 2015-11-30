<?php

function wpml_tmm_render_term_edit_view() {
	$menu = new WPML_TMM_Menu();
	$menu->render();
}

function wpml_tmm_menu_hooks() {
	global $wp_taxonomies;

	foreach ( array_keys( $wp_taxonomies ) as $taxonomy ) {
		add_action( "{$taxonomy}_edit_form", 'wpml_tmm_render_term_edit_view' );
	}
}

add_action( 'init', 'wpml_tmm_menu_hooks' );
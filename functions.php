<?php

function wpml_tmm_admin_menu() {
	add_options_page( WPML_TMM_ADMIN_MENU_NAME, WPML_TMM_ADMIN_MENU_NAME, 'manage-options', 'wpml-tmm', 'wpml_tmm_render_admin_menu' );
}

function wpml_tmm_render_admin_menu() {

}

add_action( 'admin_menu', 'wpml_tmm_admin_menu' );
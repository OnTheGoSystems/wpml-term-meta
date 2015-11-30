<?php
/*
Plugin Name: WPML Term Meta Mock
Plugin URI: https://wpml.org/
Description: Allows testing term meta translation via WPML
Author: OnTheGoSystems
Author URI: http://www.onthegosystems.com/
Version: 0.1
Plugin Slug: wpml-term-meta-mock
*/

define( 'WPML_TERM_META_MOCK_VERSION', '0.1' );
define( 'WPML_TMM_ADMIN_MENU_NAME', 'WPML Term Meta' );
define( 'WPML_TMM_PATH', dirname( __FILE__ ) );
define( 'WPML_TMM_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

define( 'WPML_TMM_ADD_ACTION', 'wpml-tmm-ajax-add' );

function wpml_tmm_load() {
	require WPML_TMM_PATH . '/lib/wpml-autoloader.class.php';
	require 'functions.php';
}

if ( version_compare( get_bloginfo( 'version' ), '4.3.2', '>' ) ) {
	add_action( 'wpml_after_init', 'wpml_tmm_load' );
}
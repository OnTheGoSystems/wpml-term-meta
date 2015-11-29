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
define( 'WPML_TMM_ADMIN_MENU_NAME', 'WPML TERM META MOCK' );

function wpml_tmm_load() {
	require_once "lib/wpml-autoloader.class.php";
	require 'functions.php';
}

do_action( 'wpml_after_init', 'wpml_tmm_load' );
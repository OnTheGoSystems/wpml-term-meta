<?php

function wpml_tmm_render_term_edit_view( $term ) {
	$menu = new WPML_TMM_Menu( $term );
	$menu->render();
}

function wpml_tmm_menu_hooks() {
	global $wp_taxonomies;

	foreach ( array_keys( $wp_taxonomies ) as $taxonomy ) {
		add_action( "{$taxonomy}_edit_form", 'wpml_tmm_render_term_edit_view' );
	}
}

add_action( 'init', 'wpml_tmm_menu_hooks' );

/**
 * Ajax Handler for adding a term meta entry
 */
function wpml_tmm_add_meta() {
	if ( ! wpml_is_action_authenticated( WPML_TMM_ADD_ACTION )
	     || ! isset( $_POST['wpml_tmm_term_id'] )
	     || ! isset( $_POST['wpml_tmm_meta_key'] )
	     || ! isset( $_POST['wpml_tmm_meta_value'] )
	) {
		die( 'Invalid Nonce or Request!' );
	}
	$wp_api        = new WPML_TMM_Wp_Api();
	$meta_addition = new WPML_TMM_New_Meta_Entry(
		$wp_api,
		get_term( $_POST['wpml_tmm_term_id'] ),
		$_POST['wpml_tmm_meta_key'],
		$_POST['wpml_tmm_meta_value']
	);

	$meta_id = $meta_addition->meta_id();
	if ( (int) $meta_id > 0 ) {
		wp_send_json_success( $meta_addition->meta_id() );
	} else {
		wp_send_json_error( json_encode( $meta_id ) );
	}
}

add_action( 'wp_ajax_wpml_tmm_ajax_add', 'wpml_tmm_add_meta' );
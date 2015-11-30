<?php

class WPML_TMM_Menu {

	/** @var WP_Term $term */
	private $term;

	/**
	 * WPML_TMM_Menu constructor.
	 *
	 * @param WP_Term $term
	 */
	public function __construct( $term ) {
		$this->term = $term;
	}

	public function render() {
		echo '<div id="wpml-tmm-main" />';
		wp_register_script( 'wpml-tmm-admin', WPML_TMM_URL . '/res/js/wpml-tmm-backend.js', array(
			'jquery',
			'backbone',
			'underscore'
		) );
		wp_localize_script( 'wpml-tmm-admin', 'WpmlTmCurrentTerm', array(
			'term'        => $this->term->to_array(),
			'nonceField' => wpml_nonce_field( WPML_TMM_ADD_ACTION )
		) );
		wp_enqueue_script( 'wpml-tmm-admin' );
	}
}
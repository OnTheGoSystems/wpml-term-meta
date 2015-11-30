<?php

class WPML_TMM_New_Meta_Entry {

	/** @var  WPML_TMM_Wp_Api $wp_api */
	private $wp_api;

	private $meta_id;

	/**
	 * WPML_TMM_New_Meta_Entry constructor.
	 *
	 * @param WPML_TMM_Wp_Api $wpml_tmm_wp_api
	 * @param WP_Term         $term
	 * @param string          $key
	 * @param mixed           $value
	 */
	public function __construct( &$wpml_tmm_wp_api, $term, $key, $value ) {
		$this->wp_api  = &$wpml_tmm_wp_api;
		$this->meta_id = $this->wp_api->add_term_meta( $term->term_id, $key, $value );
	}

	/**
	 * @return bool|int|WP_Error
	 */
	public function meta_id() {

		return $this->meta_id;
	}
}
<?php

class WPML_TMM_Delete_Meta_Entry {

	/** @var  WPML_TMM_Wp_Api $wp_api */
	private $wp_api;

	/** @var bool $deleted */
	private $deleted;

	/**
	 * WPML_TMM_New_Meta_Entry constructor.
	 *
	 * @param WPML_TMM_Wp_Api $wpml_tmm_wp_api
	 * @param int             $term_id
	 * @param string          $meta_key
	 */
	public function __construct( &$wpml_tmm_wp_api, $term_id, $meta_key ) {
		$this->wp_api  = &$wpml_tmm_wp_api;
		$this->deleted = $this->wp_api->delete_term_meta( $term_id, $meta_key );
	}

	/**
	 * @return bool
	 */
	public function deleted() {

		return $this->deleted;
	}
}
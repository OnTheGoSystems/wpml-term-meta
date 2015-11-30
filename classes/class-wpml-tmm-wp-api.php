<?php

class WPML_TMM_Wp_Api {

	/**
	 * Just a wrapper for \add_term_meta
	 *
	 * @param int    $term_id
	 * @param string $meta_key
	 * @param mixed  $meta_value
	 * @param bool   $unique
	 *
	 * @return bool|int|WP_Error
	 */
	public function add_term_meta( $term_id, $meta_key, $meta_value, $unique = false ) {

		return add_term_meta( $term_id, $meta_key, $meta_value, $unique );
	}

	/**
	 * @param int    $term_id
	 * @param string $meta_key
	 * @param string $meta_value
	 *
	 * @return bool
	 */
	public function delete_term_meta( $term_id, $meta_key, $meta_value = "" ) {

		return delete_term_meta( $term_id, $meta_key, $meta_value );
	}
}
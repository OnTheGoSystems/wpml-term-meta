<?php

class WPML_TMM_Wp_Api {

	public function add_term_meta( $term_id, $meta_key, $meta_value, $unique = false ) {

		return add_term_meta( $term_id, $meta_key, $meta_value, $unique );
	}
}
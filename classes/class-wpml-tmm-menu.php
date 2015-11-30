<?php

class WPML_TMM_Menu {

	public function render() {
		echo '<div id="wpml-tmm-main" />';
		wp_register_script( 'wpml-tmm-admin', WPML_TMM_URL . '/res/js/wpml-tmm-backend.js', array(
			'jquery',
			'backbone',
			'underscore'
		) );
		wp_enqueue_script( 'wpml-tmm-admin' );
	}
}
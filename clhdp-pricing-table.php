<?php
/**
 * Plugin Name:       CLH Pricing Table Suite
 * Description:       A highly flexible, scalable dynamic Pricing Table block built for managed web applications.
 * Version:           1.0.0
 * Author:            CLH Dev Partners
 * License:           GPL-2.0-or-later
 * Text Domain:       clh-pricing
 * Domain Path:       /languages
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Register Custom Autoloader mapping to WordPress standard class-prefix
spl_autoload_register( function ( $class ) {
	$prefix = 'CLHDevPartners\\PricingTableSuite\\';
	$base_dir = __DIR__ . '/includes/';

	$len = strlen( $prefix );
	if ( strncmp( $prefix, $class, $len ) !== 0 ) {
		return;
	}

	$relative_class = substr( $class, $len );
	// Map namespace parts to WordPress class naming files (e.g. Plugin -> class-plugin.php)
	$parts = explode( '\\', $relative_class );
	$class_file = strtolower( str_replace( '_', '-', array_pop( $parts ) ) );
	$file = $base_dir . implode( '/', $parts ) . ( empty( $parts ) ? '' : '/' ) . 'class-' . $class_file . '.php';

	if ( file_exists( $file ) ) {
		require $file;
	}
} );

// Initialize the plugin
add_action( 'plugins_loaded', function () {
	\CLHDevPartners\PricingTableSuite\Plugin::get_instance();
} );

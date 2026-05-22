<?php
/**
 * Plugin Name:       CLH Pricing Table Suite
 * Description:       A highly flexible, scalable dynamic Pricing Table block built for managed web applications.
 * Version:           1.0.0
 * Author:            Chandika Lakshan
 * License:           GPL-2.0-or-later
 * Text Domain:       clhwp-pricing
 * Domain Path:       /languages
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load plugin classes.
require_once __DIR__ . '/includes/class-plugin.php';

// Initialize the plugin.
add_action( 'plugins_loaded', array( 'CLHWP\PricingTableSuite\Plugin', 'get_instance' ) );

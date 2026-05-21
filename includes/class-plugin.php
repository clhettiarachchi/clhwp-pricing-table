<?php
namespace CLHDevPartners\PricingTableSuite;

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main Plugin Class.
 */
class Plugin {

	/**
	 * Singleton instance of the Plugin.
	 *
	 * @var Plugin|null
	 */
	private static $instance = null;

	/**
	 * Get the singleton instance.
	 *
	 * @return Plugin
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Register blocks from the build directory.
	 */
	public function register_blocks() {
		$block_dir = dirname( __DIR__ ) . '/blocks/build/pricing-table';
		if ( file_exists( $block_dir . '/block.json' ) ) {
			register_block_type( $block_dir );
		}
	}
}

<?php
/**
 * Dynamic Pricing Table render template.
 *
 * @package CLHDevPartners\PricingTableSuite
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$block_props = get_block_wrapper_attributes( array( 'class' => 'clh-pricing-table' ) );
?>
<div <?php echo $block_props; ?>>
	<p><?php echo esc_html__( 'This is the pricing table', 'clhwp-pricing' ); ?></p>
</div>

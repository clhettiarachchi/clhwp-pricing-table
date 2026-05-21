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
	<div class="clh-pricing-table__grid">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>

<?php
/**
 * Dynamic Pricing Column Render Template.
 *
 * @package CLHWP\PricingTableSuite
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$block_props = get_block_wrapper_attributes( array( 'class' => 'clh-pricing-column' ) );

// Fetch attributes with defaults to avoid errors
$title       = isset( $attributes['title'] ) ? $attributes['title'] : '';
$price       = isset( $attributes['price'] ) ? $attributes['price'] : '';
$description = isset( $attributes['description'] ) ? $attributes['description'] : '';
$features    = isset( $attributes['features'] ) ? $attributes['features'] : array();
$button_text = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : '';
$button_url  = isset( $attributes['buttonUrl'] ) ? $attributes['buttonUrl'] : '';

?>
<div <?php echo $block_props; ?>>
	<div class="clh-pricing-column__content">
		<?php if ( ! empty( $title ) ) : ?>
			<h3 class="clh-pricing-column__title"><?php echo esc_html( $title ); ?></h3>
		<?php endif; ?>

		<?php if ( ! empty( $price ) ) : ?>
			<div class="clh-pricing-column__price-container">
				<span class="clh-pricing-column__price"><?php echo esc_html( $price ); ?></span>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $description ) ) : ?>
			<p class="clh-pricing-column__description"><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>

		<?php /* Divider line between description and features list as requested */ ?>
		<hr class="clh-pricing-column__divider" />

		<?php if ( ! empty( $features ) && is_array( $features ) ) : ?>
			<div class="clh-pricing-column__features-wrapper">
				<ul class="clh-pricing-column__features-list">
					<?php foreach ( $features as $feature ) : ?>
						<?php if ( ! empty( trim( $feature ) ) ) : ?>
							<li class="clh-pricing-column__feature-item">
								<span class="clh-pricing-column__feature-icon">
									<svg class="clh-pricing-column__feature-checkmark" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</span>
								<span class="clh-pricing-column__feature-text"><?php echo wp_kses_post( $feature ); ?></span>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $button_text ) ) : ?>
			<div class="clh-pricing-column__button-wrapper">
				<?php if ( ! empty( $button_url ) ) : ?>
					<a class="clh-pricing-column__button" href="<?php echo esc_url( $button_url ); ?>">
						<?php echo esc_html( $button_text ); ?>
					</a>
				<?php else : ?>
					<span class="clh-pricing-column__button clh-pricing-column__button--static">
						<?php echo esc_html( $button_text ); ?>
					</span>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>
</div>

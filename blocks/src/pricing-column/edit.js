/**
 * CLH Pricing Table Suite -- Pricing Column block edit component.
 *
 * @package CLHWP\PricingTableSuite
 */

import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, Dashicon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useRef, useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, price, description, features, buttonText, buttonUrl } = attributes;

	// Tracks which feature index should receive focus after a state update.
	const focusIndexRef = useRef(null);
	// Holds a ref to each feature's RichText DOM node for programmatic focus.
	const featureRefs = useRef([]);

	// After every render, fire focus on the pending index and clear the ref.
	useEffect(() => {
		if (focusIndexRef.current === null) {
			return;
		}
		const el = featureRefs.current[focusIndexRef.current];
		if (el) {
			el.focus();
		}
		focusIndexRef.current = null;
	});

	const updateFeature = (value, index) => {
		const newFeatures = [...features];
		newFeatures[index] = value;
		setAttributes({ features: newFeatures });
	};

	/**
	 * Insert a new feature at a specific position and queue focus on it.
	 *
	 * @param {number} insertAt - Index at which the new feature will be inserted.
	 * @param {string} value    - Initial text for the new feature.
	 */
	const insertFeature = (insertAt, value = '') => {
		const newFeatures = [...features];
		newFeatures.splice(insertAt, 0, value);
		focusIndexRef.current = insertAt;
		setAttributes({ features: newFeatures });
	};

	const addFeature = () => {
		insertFeature(features.length);
	};

	const removeFeature = (index) => {
		const newFeatures = features.filter((_, i) => i !== index);
		setAttributes({ features: newFeatures });
	};

	/**
	 * Keyboard handler attached to each feature RichText.
	 *
	 * - Enter -> inserts a blank feature directly below and moves focus to it.
	 * - Backspace on an empty feature -> removes it and moves focus to the item above.
	 *
	 * @param {KeyboardEvent} event - The synthetic keyboard event from RichText.
	 * @param {number}        index - Index of the feature that received the keystroke.
	 */
	const onFeatureKeyDown = (event, index) => {
		if (event.key === 'Enter') {
			// Prevent RichText from inserting a <br>.
			event.preventDefault();
			// Don't add a new row when the current feature is still empty.
			if (features[index] !== '') {
				insertFeature(index + 1);
			}
			return;
		}

		if (event.key === 'Backspace' && features[index] === '') {
			// Never remove the last remaining feature row.
			if (features.length <= 1) {
				return;
			}
			event.preventDefault();
			const targetIndex = Math.max(0, index - 1);
			const newFeatures = features.filter((_, i) => i !== index);
			focusIndexRef.current = targetIndex;
			setAttributes({ features: newFeatures });
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Button Settings', 'clhwp-pricing')} initialOpen={true}>
					<TextControl
						label={__('Button URL', 'clhwp-pricing')}
						value={buttonUrl}
						onChange={(url) => setAttributes({ buttonUrl: url })}
						placeholder="https://example.com/checkout"
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: 'clh-pricing-column' })}>
				<div className="clh-pricing-column__content">
					<RichText
						tagName="h3"
						className="clh-pricing-column__title"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
						placeholder={__('Plan Title', 'clhwp-pricing')}
						allowedFormats={[]}
					/>

					<div className="clh-pricing-column__price-container">
						<RichText
							tagName="span"
							className="clh-pricing-column__price"
							value={price}
							onChange={(val) => setAttributes({ price: val })}
							placeholder={__('$99', 'clhwp-pricing')}
							allowedFormats={[]}
						/>
					</div>

					<RichText
						tagName="p"
						className="clh-pricing-column__description"
						value={description}
						onChange={(val) => setAttributes({ description: val })}
						placeholder={__('Describe the value of this plan tier.', 'clhwp-pricing')}
						allowedFormats={[]}
					/>

					{ /* Divider line between description and features list as requested */}
					<hr className="clh-pricing-column__divider" />

					<div className="clh-pricing-column__features-wrapper">
						<ul className="clh-pricing-column__features-list">
							{features.map((feature, index) => (
								<li key={index} className="clh-pricing-column__feature-item">
									<span className="clh-pricing-column__feature-icon">
										<svg className="clh-pricing-column__feature-checkmark" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</span>
									<RichText
										tagName="span"
										className="clh-pricing-column__feature-text"
										value={feature}
										onChange={(val) => updateFeature(val, index)}
										onKeyDown={(event) => onFeatureKeyDown(event, index)}
										placeholder={__('Add a feature description...', 'clhwp-pricing')}
										allowedFormats={['core/bold', 'core/italic']}
										ref={(el) => { featureRefs.current[index] = el; }}
									/>
									{features.length > 1 && (<Button
										className="clh-pricing-column__feature-remove"
										onClick={() => removeFeature(index)}
										isDestructive
										isSmall
									>
										<Dashicon icon="trash" />
									</Button>)}
								</li>
							))}
						</ul>

						<Button
							className="clh-pricing-column__add-feature"
							onClick={addFeature}
							variant="secondary"
							isSmall
						>
							<Dashicon icon="plus" /> {__('Add Feature', 'clhwp-pricing')}
						</Button>
					</div>

					<div className="clh-pricing-column__button-wrapper">
						<RichText
							tagName="div"
							className="clh-pricing-column__button"
							value={buttonText}
							onChange={(val) => setAttributes({ buttonText: val })}
							placeholder={__('Buy Now', 'clhwp-pricing')}
							allowedFormats={[]}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

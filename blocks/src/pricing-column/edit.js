import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, Dashicon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, price, description, features, buttonText, buttonUrl } = attributes;

	const updateFeature = ( value, index ) => {
		const newFeatures = [ ...features ];
		newFeatures[ index ] = value;
		setAttributes( { features: newFeatures } );
	};

	const addFeature = () => {
		setAttributes( { features: [ ...features, '' ] } );
	};

	const removeFeature = ( index ) => {
		const newFeatures = features.filter( ( _, i ) => i !== index );
		setAttributes( { features: newFeatures } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'clhwp-pricing' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Button URL', 'clhwp-pricing' ) }
						value={ buttonUrl }
						onChange={ ( url ) => setAttributes( { buttonUrl: url } ) }
						placeholder="https://example.com/checkout"
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'clh-pricing-column' } ) }>
				<div className="clh-pricing-column__content">
					<RichText
						tagName="h3"
						className="clh-pricing-column__title"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Plan Title', 'clhwp-pricing' ) }
						allowedFormats={ [] }
					/>

					<div className="clh-pricing-column__price-container">
						<RichText
							tagName="span"
							className="clh-pricing-column__price"
							value={ price }
							onChange={ ( val ) => setAttributes( { price: val } ) }
							placeholder={ __( '$99', 'clhwp-pricing' ) }
							allowedFormats={ [] }
						/>
					</div>

					<RichText
						tagName="p"
						className="clh-pricing-column__description"
						value={ description }
						onChange={ ( val ) => setAttributes( { description: val } ) }
						placeholder={ __( 'Describe the value of this plan tier.', 'clhwp-pricing' ) }
						allowedFormats={ [] }
					/>

					{ /* Divider line between description and features list as requested */ }
					<hr className="clh-pricing-column__divider" />

					<div className="clh-pricing-column__features-wrapper">
						<ul className="clh-pricing-column__features-list">
							{ features.map( ( feature, index ) => (
								<li key={ index } className="clh-pricing-column__feature-item">
									<span className="clh-pricing-column__feature-icon">
										<svg className="clh-pricing-column__feature-checkmark" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</span>
									<RichText
										tagName="span"
										className="clh-pricing-column__feature-text"
										value={ feature }
										onChange={ ( val ) => updateFeature( val, index ) }
										placeholder={ __( 'Add a feature description...', 'clhwp-pricing' ) }
										allowedFormats={ [ 'core/bold', 'core/italic' ] }
									/>
									<Button
										className="clh-pricing-column__feature-remove"
										onClick={ () => removeFeature( index ) }
										isDestructive
										isSmall
									>
										<Dashicon icon="trash" />
									</Button>
								</li>
							) ) }
						</ul>

						<Button
							className="clh-pricing-column__add-feature"
							onClick={ addFeature }
							variant="secondary"
							isSmall
						>
							<Dashicon icon="plus" /> { __( 'Add Feature', 'clhwp-pricing' ) }
						</Button>
					</div>

					<div className="clh-pricing-column__button-wrapper">
						<RichText
							tagName="div"
							className="clh-pricing-column__button"
							value={ buttonText }
							onChange={ ( val ) => setAttributes( { buttonText: val } ) }
							placeholder={ __( 'Buy Now', 'clhwp-pricing' ) }
							allowedFormats={ [] }
						/>
					</div>
				</div>
			</div>
		</>
	);
}

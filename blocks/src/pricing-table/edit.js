import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'clh/pricing-column' ];
const TEMPLATE = [
	[ 'clh/pricing-column', { 
		title: 'Basic', 
		price: '$29', 
		description: 'A simple option for getting started.',
		features: [
			'Feature One',
			'Feature Two',
			'Feature Three',
			'Feature Four'
		],
		buttonText: 'Get Started',
		buttonUrl: '#'
	} ],
	[ 'clh/pricing-column', { 
		title: 'Standard', 
		price: '$59', 
		description: 'A balanced option for regular use.',
		features: [
			'Everything in Basic',
			'Additional Feature',
			'Priority Access',
			'Extended Support'
		],
		buttonText: 'Choose Plan',
		buttonUrl: '#'
	} ],
	[ 'clh/pricing-column', { 
		title: 'Premium', 
		price: '$99', 
		description: 'An advanced option with full access.',
		features: [
			'Everything in Standard',
			'Advanced Features',
			'Premium Support',
			'Unlimited Access'
		],
		buttonText: 'Contact Us',
		buttonUrl: '#'
	} ]
];

export default function Edit() {
	return (
		<div { ...useBlockProps( { className: 'clh-pricing-table' } ) }>
			<div className="clh-pricing-table__grid">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					orientation="horizontal"
				/>
			</div>
		</div>
	);
}

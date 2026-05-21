import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'clh/pricing-column' ];
const TEMPLATE = [
	[ 'clh/pricing-column', { 
		title: 'Starter', 
		price: '$29', 
		description: 'Perfect for individuals starting out.',
		features: [ 'Basic support', '1 Project', '10GB Storage' ],
		buttonText: 'Get Started'
	} ],
	[ 'clh/pricing-column', { 
		title: 'Professional', 
		price: '$99', 
		description: 'The most popular option for growing teams.',
		features: [ 'Priority support', '10 Projects', '100GB Storage', 'Analytics dashboard' ],
		buttonText: 'Try for Free'
	} ],
	[ 'clh/pricing-column', { 
		title: 'Enterprise', 
		price: '$299', 
		description: 'Tailored features for large scale operations.',
		features: [ '24/7 dedicated support', 'Unlimited projects', '1TB Storage', 'Custom integrations' ],
		buttonText: 'Contact Sales'
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

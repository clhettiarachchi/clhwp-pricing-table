import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<p>{ __( 'This is the pricing table', 'clh-pricing' ) }</p>
		</div>
	);
}

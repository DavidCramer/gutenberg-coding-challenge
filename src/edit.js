/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import './editor.scss';
/**
 * WordPress dependencies
 */
import { edit, globe } from '@wordpress/icons';
import { BlockControls } from '@wordpress/block-editor';
import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getEmojiFlag } from './utils';
import Preview from './preview';

// Set options outside as not to have them build repeatedly.
const options = Object.entries( countries ).map( ( entry ) => ( {
	value: entry[0],
	label: `${getEmojiFlag( entry[0] )} ${entry[1]} - ${entry[0]}`,
} ) );

export default function Edit( { attributes, setAttributes } ) {
	const { countryCode } = attributes;

	const handleChangeCountryCode = ( newCountryCode ) => {
		if ( newCountryCode && countryCode !== newCountryCode ) {
			setAttributes( {
				countryCode: newCountryCode,
				relatedPosts: [],
			} );
		}
	};


	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Country', 'xwp-country-card' ) }
						icon={ edit }
						onClick={ () => handleChangeCountryCode('') }
						disabled={ ! Boolean( countryCode ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div>
				{ countryCode ? (
					<Preview
						countryCode={ countryCode }
					/>
				) : (
					<Placeholder
						icon={ globe }
						label={ __( 'XWP Country Card', 'xwp-country-card' ) }
						isColumnLayout={ true }
						instructions={ __(
							'Type in a name of a contry you want to display on you site.',
							'xwp-country-card'
						) }
					>
						<ComboboxControl
							label={ __( 'Country', 'xwp-country-card' ) }
							hideLabelFromVision
							options={ options }
							value={ countryCode }
							onChange={ handleChangeCountryCode }
							allowReset={ true }
						/>
					</Placeholder>
				) }
			</div>
		</>
	);
}

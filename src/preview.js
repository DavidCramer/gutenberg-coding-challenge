/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import continentNames from '../assets/continent-names.json';
import continents from '../assets/continents.json';
import RelatedPosts from './related';
import { getEmojiFlag } from './utils';

export default function Preview( { countryCode, relatedPosts } ) {
	if ( ! countryCode ) {
		return <></>;
	}
	const emojiFlag = getEmojiFlag( countryCode );

	return (
		<div className="xwp-country-card">
			<figure
				className="xwp-country-card__media"
				data-emoji-flag={ emojiFlag }
			>
			</figure>
			<h3 className="xwp-country-card__heading">
				{/* I should use sprintf here, but I am unsure how to do it with markup, for now. */}
				{ `${__( 'Hello from', 'xwp-country-card' ) } `}
				<strong>{ countries[ countryCode ] }</strong> (
				<span className="xwp-country-card__country-code">
					{ countryCode }
				</span>
				), { continentNames[ continents[ countryCode ] ] }!
			</h3>
			<div className="xwp-country-card__related-posts">
				<RelatedPosts relatedPosts={ relatedPosts } />
			</div>
		</div>
	);
}

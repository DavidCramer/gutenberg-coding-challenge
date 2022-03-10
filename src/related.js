/**
 * WordPress dependencies
 */
import { useSelect, select } from '@wordpress/data';
import { _n, __, sprintf } from '@wordpress/i18n';

export default function RelatedPosts( { relatedPosts } ) {
	const hasRelated = relatedPosts && relatedPosts.length;

	return (
		<>
			<h3 className="xwp-country-card__related-posts__heading">
				{ hasRelated
					? sprintf(
							_n(
								'There is %d related post:',
								'There are %d related posts:',
								relatedPosts.length,
								'xwp-country-card'
							),
							relatedPosts.length
					  )
					: __( 'There are no related posts.', 'xwp-country-card' ) }
			</h3>
			<ul className="xwp-country-card__related-posts-list">
				{ relatedPosts &&
					relatedPosts.map( ( relatedPost, index ) => {
						return (
							<li key={ index } className="related-post">
								<a
									className="link"
									href={ relatedPost.link }
									data-post-id={ relatedPost.id }
								>
									<h3 className="title">
										{ relatedPost.title }
									</h3>
									<p className="excerpt">
										{ relatedPost.excerpt }
									</p>
								</a>
							</li>
						);
					} ) }
			</ul>
		</>
	);
}

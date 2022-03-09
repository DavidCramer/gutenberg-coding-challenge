/**
 * WordPress dependencies
 */
import { useSelect, select } from '@wordpress/data';
import { _n, __, sprintf } from '@wordpress/i18n';

export default function RelatedPosts( { country } ) {
	const postID = select( 'core/editor' ).getCurrentPostId();
	const { relatedPosts, isResolving } = useSelect(
		( select ) => {
			const core = select( 'core' );
			const queryArgs = [
				'postType',
				'post',
				{
					search: country,
					exclude: postID,
					_fields: [ 'id', 'link', 'title', 'excerpt' ],
				},
			];
			return {
				relatedPosts: core.getEntityRecords( ...queryArgs ),
				isResolving: core.getIsResolving(
					'getEntityRecords',
					queryArgs
				),
			};
		},
		[ country, postID ]
	);
	const hasRelated = relatedPosts && relatedPosts.length;

	return (
		<>
			{ isResolving && (
				<div>
					{ __( 'Finding related posts…', 'xwp-country-card' ) }
				</div>
			) }
			{ ! isResolving && (
				<ul className="xwp-country-card__related-posts-list">
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
							: __(
									'There are no related posts.',
									'xwp-country-card'
							  ) }
					</h3>
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
											{ relatedPost.title.raw }
										</h3>
										<p className="excerpt">
											{ relatedPost.excerpt.raw }
										</p>
									</a>
								</li>
							);
						} ) }
				</ul>
			) }
		</>
	);
}

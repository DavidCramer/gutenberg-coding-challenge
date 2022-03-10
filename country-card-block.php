<?php
/**
 * Plugin Name:       Country Card Block
 * Description:       Block rendering a card with country information.
 * Requires at least: 5.8
 * Requires PHP:      5.6
 * Version:           1.0.0
 * Author:            XWP
 * Author URI:        https://github.com/xwp
 * Text Domain:       xwp-country-card
 *
 * @package           CountryCard
 */

namespace XWP\CountryCard;

/**
 * Register the block.
 */
function block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', __NAMESPACE__ . '\\block_init' );

/**
 * Strip HTML on content, maybe.
 */
function strip_content_maybe( $content ) {
	$strip_tags = filter_input( INPUT_GET, 'stripTags', FILTER_VALIDATE_BOOLEAN );
	if ( $strip_tags ) {
		$content = strip_tags( $content );
	}

	return $content;
}

/**
 * Prevent passing excerpt through wpautop.
 */
remove_filter( 'the_excerpt', 'wpautop' );

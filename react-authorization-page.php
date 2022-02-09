<?php
/**
 * Plugin Name:       React authorization page
 * Description:       Creates a page for authorization via REST..
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Alexander Koledov
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       react-authorization-page
 *
 * @package           create-block
 */


// Template creation
add_filter( 'theme_page_templates', 'react_authorization_register_template' );
add_filter( 'template_include', 'react_authorization_check_active_template_page' );
function react_authorization_register_template( $templates ) {
    //register template
    $templates['./inc/templates/react-authorization-page-template.php'] = 'React Authorization Page';
    return $templates;
}
function react_authorization_check_active_template_page ( $template ) {
    // get active template
    $page_template = get_post_meta( get_the_ID(), '_wp_page_template', true );

    // if this is our template, then we connect
    if ( 'react-authorization-page-template.php' == basename( $page_template ) ) {
        // connect template
        return wp_normalize_path( WP_PLUGIN_DIR . '/react-authorization-page/inc/templates/react-authorization-page-template.php' );
    }
    return $template;
}

// Page creation
add_action( 'init', 'check_and_create_authorization_page' );
function check_and_create_authorization_page(){
    global $wpdb;

    $post_name = 'react-authorization';
    $newest = $wpdb->get_row("SELECT post_name FROM wp_posts WHERE post_name = '" . $post_name . "'", 'ARRAY_A');


    if ( $newest ) return;
    $post_data = array(
        'post_title'    => 'Rest Authorization Page',
        'post_name'     => $post_name,
        'post_content'  => 'This is a login page with no content. In order to remove it, you need to disable the plugin.',
        'post_status'   => 'publish',
        'post_type'     => 'page',
        'page_template' => './inc/templates/react-authorization-page-template.php'
    );

    $post_id = wp_insert_post( $post_data );

    if( is_wp_error( $post_id ) ) {
        add_action('admin_notices', function(){
            echo '<div class="notice notice-error is-dismissible"> <p>Error creating login page</p></div>';
        });

    };

}


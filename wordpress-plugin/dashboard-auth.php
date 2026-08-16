<?php
/**
 * Plugin Name: Dashboard Auth
 * Description: Lets the Next.js dashboard authenticate WordPress users with their normal
 *              account password by exchanging it, server-side, for a freshly issued
 *              Application Password. Never exposes normal passwords over the REST API itself.
 *
 * Install: copy this file into wp-content/mu-plugins/ (create that folder if it doesn't
 * exist yet). Must-use plugins load automatically — no activation step in WP Admin.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'dashboard-auth/v1', '/login', array(
        'methods'             => WP_REST_Server::CREATABLE,
        'permission_callback' => '__return_true',
        'callback'            => 'dashboard_auth_login',
    ) );
} );

function dashboard_auth_login( WP_REST_Request $request ) {
    $body     = $request->get_json_params();
    $username = isset( $body['username'] ) ? trim( (string) $body['username'] ) : '';
    $password = isset( $body['password'] ) ? (string) $body['password'] : '';

    if ( '' === $username || '' === $password ) {
        return new WP_Error(
            'dashboard_auth_missing_credentials',
            'Username and password are required.',
            array( 'status' => 400 )
        );
    }

    $user = wp_authenticate( $username, $password );

    if ( is_wp_error( $user ) ) {
        return new WP_Error(
            'dashboard_auth_invalid_credentials',
            'Invalid username or password.',
            array( 'status' => 401 )
        );
    }

    if ( ! wp_is_application_passwords_available_for_user( $user->ID ) ) {
        return new WP_Error(
            'dashboard_auth_unavailable',
            'Application Passwords are not available for this account.',
            array( 'status' => 403 )
        );
    }

    // Revoke any previously issued "Dashboard" application password for this user so we
    // don't accumulate a new one on every login.
    $existing = WP_Application_Passwords::get_user_application_passwords( $user->ID );
    foreach ( $existing as $item ) {
        if ( 'Dashboard' === $item['name'] ) {
            WP_Application_Passwords::delete_application_password( $user->ID, $item['uuid'] );
        }
    }

    $created = WP_Application_Passwords::create_new_application_password(
        $user->ID,
        array( 'name' => 'Dashboard' )
    );

    if ( is_wp_error( $created ) ) {
        return new WP_Error(
            'dashboard_auth_creation_failed',
            'Could not create an application password.',
            array( 'status' => 500 )
        );
    }

    list( $new_password, $new_item ) = $created;

    return new WP_REST_Response( array(
        'application_password' => $new_password,
        'display_name'         => $user->display_name,
    ), 200 );
}

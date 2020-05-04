<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if ( ! class_exists( 'Timber' ) ) {
    echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
    return;
}
$context = Timber::context();

// We can access the loop of WordPress posts with the 'posts' variable.
$testimonyArgs = array(
    // Get post type project
    'post_type' => 'testimony',
    // Get all posts
    'posts_per_page' => 10,
    // Order by post date
    'orderby' => array(
        'date' => 'DESC'
    ));
$context['testimonys'] = Timber::get_posts( $testimonyArgs );
$context['intel_eco'] = array("background" => "bg-arrondi-bleu.svg");
$context['solutions'] = array(
    array(
        'nom' => 'Crawler',
        'accroche' => 'Surveillez tout ce que vous souhaitez, en continu',
        'description' => 'Solutions d’automatisation de la collecte et du traitement de vos sources d’informations.',
        'lien' => '#',
        'image' => 'crawler-illu.png',
        'class' => 'ltr'
    ),
    array(
        'nom' => 'Pilot',
        'accroche' => 'Transformez l’information en données exploitables',
        'description' => 'Solution d’enrichissement, de modélisation et de classement de contenus.  ',
        'lien' => '#',
        'image' => 'pilot-illu.png',
        'class' => 'rtl',
        'background' => "haricot-jaune.svg"
    ),
    array(
        'nom' => 'Platform',
        'accroche' => 'Pour chacun, la bonne info, au bon format, au bon moment',
        'description' => 'Solution de diffusion d’informations et d’aide à la décision.',
        'lien' => '#',
        'image' => 'platform-illu-new.png',
        'class' => 'ltr',
        'background' => "haricot-violet.svg"
    )
);
$context['cibles'] = array(
    array(
        'nom' => 'Dirigeant d’entreprise',
        'description' => 'Lorem ipsum dolor amet valem setum dolor vale oler sole batum duneil. Lorem ipsum dolor',
        'image' => 'tescontent@3x.png'
    ),
    array(
        'nom' => 'Département marketing',
        'description' => 'Lorem ipsum dolor amet valem setum dolor vale oler sole batum duneil. Lorem ipsum dolor',
        'image' => 'tescontent@3x.png'
    ),
    array(
        'nom' => 'Département juridique',
        'description' => 'Lorem ipsum dolor amet valem setum dolor vale oler sole batum duneil. Lorem ipsum dolor',
        'image' => 'tescontent@3x.png'
    ),
    array(
        'nom' => 'Département R&D',
        'description' => 'Lorem ipsum dolor amet valem setum dolor vale oler sole batum duneil. Lorem ipsum dolor',
        'image' => 'tescontent@3x.png'
    ),
    array(
        'nom' => 'Département études',
        'description' => 'Lorem ipsum dolor amet valem setum dolor vale oler sole batum duneil. Lorem ipsum dolor',
        'image' => 'tescontent@3x.png'
    ),
    array(
        'nom' => 'Documentaliste',
        'description' => 'Lorem ipsum dolor amet valem setum dolor vale oler sole batum duneil. Lorem ipsum dolor',
        'image' => 'tescontent@3x.png'
    )
);

// If we are on the home page, add a few other templates to our hierarchy.
$templates = array( 'Templates/index.twig' );
if ( is_front_page() && is_home() ) {
    array_unshift( $templates, 'Templates/front-page.twig', 'Templates/home.twig' );
} elseif ( is_front_page() ) {
    array_unshift( $templates, 'Templates/front-page.twig', 'Templates/home.twig' );
} elseif ( is_home() ) {
    array_unshift( $templates, 'Templates/home.twig' );
}

Timber::render( $templates, $context );

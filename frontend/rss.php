<?php
    define('LIBRARY_PATH', '../lib/');

    header('Content-type: application/rss+xml');

    require_once LIBRARY_PATH . 'config.php';
    require_once LIBRARY_PATH . 'db.php';
    require_once LIBRARY_PATH . 'rss.php';
    require_once LIBRARY_PATH . 'function.php';

    require_once './rss.dp.php';
    require_once './UI/inc/rss.tpl.php';
?>

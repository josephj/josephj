<?php
    $path = preg_replace('/\/[\w.]+$/', '', getenv('SCRIPT_NAME'));
    $file_name = (isset($file_name)) ? $file_name : basename(getenv('SCRIPT_NAME'),'.php');
    $is_debug = (isset($_GET['debug']) && $_GET['debug'] === 'true')?true:false;
    $random = date('Yms').'1';

    define( "_PAGECLASS_", "doc3" );
    define( "_TEMPLATECLASS_", "yui-t6" );
    if ($is_debug) {
        define( "_IMGURL_", "http://static.josephj.com/");
        define( "_JSURL_", "http://static.josephj.com/");
        define( "_YUIURL_", "/yui/2.5.1/build/");
    }
    else {
        define( "_IMGURL_", "http://static.josephj.com/");
        define( "_JSURL_", "http://static.josephj.com/");
        define( "_YUIURL_", "http://l.yimg.com/us.js.yimg.com/lib/yui/2.5.1/build/" );
    };

    switch ($file_name) {
        case 'article': 
        case 'article_modify': {
            $css_files = array(
                'debug' => array(
                    _YUIURL_.'reset/reset.css',
                    _YUIURL_.'fonts/fonts.css',
                    _YUIURL_.'grids/grids.css',
                    _YUIURL_.'assets/skins/sam/skin.css',
                    _IMGURL_.'josephjiang.css'
                ),
                'product' => array(_IMGURL_.'josephjiang_admin_min.css?date='.$random)
            );
            break;
        };
        case 'freestyle': {
            $css_files = array(
                'debug' => array(
                    _YUIURL_.'reset/reset.css',
                    _YUIURL_.'fonts/fonts.css',
                    _YUIURL_.'grids/grids.css',
                    _IMGURL_.'dpSyntaxHighlighter.css',
                    _IMGURL_.'josephjiang.css'
                ),
                'product' => array(_IMGURL_.'josephjiang_freestyle_min.css?date='.$random)
            );
            break;
        };
        default: {
            $css_files = array(
                'debug' => array(
                    _YUIURL_.'reset/reset.css',
                    _YUIURL_.'fonts/fonts.css',
                    _YUIURL_.'grids/grids.css',
                    _IMGURL_.'josephjiang.css'
                ),
                'product' => array(_IMGURL_.'josephjiang_core_min.css?date='.$random)
            );
        };
    };

    switch ($file_name) {
        case 'article': 
        case 'article_modify': {
            $js_files = array (
                'debug' => array (
                    _YUIURL_.'yahoo/yahoo-debug.js',
                    _YUIURL_.'dom/dom-debug.js',
                    _YUIURL_.'event/event-debug.js',
                    _YUIURL_.'connection/connection-debug.js',
                    _YUIURL_.'logger/logger-debug.js',
                    _YUIURL_.'element/element-beta-debug.js',
                    _YUIURL_.'container/container_core-debug.js',
                    _YUIURL_.'menu/menu-debug.js',
                    _YUIURL_.'calendar/calendar-debug.js',
                    _YUIURL_.'button/button-debug.js',
                    _YUIURL_.'editor/editor-beta-debug.js',
                    _IMGURL_.'josephjiang.js'
                ),
                'product' => array (
                    _IMGURL_.'josephjiang_admin_min.js?date='.$random
                )
            );
            break;
        };
        case 'entry' : {
            $js_files = array (
                'debug' => array (
                    _YUIURL_.'yahoo/yahoo-debug.js',
                    _YUIURL_.'dom/dom-debug.js',
                    _YUIURL_.'event/event-debug.js',
                    _IMGURL_.'url2link.js',
                    _IMGURL_.'josephjiang.js'
                ),
                'product' => array (
                    _IMGURL_.'josephjiang_entry_min.js?date='.$random
                )
            );
            break;
        };
        case 'freestyle': {
            $js_files = array (
                'debug' => array (
                    _YUIURL_.'yahoo/yahoo-debug.js',
                    _YUIURL_.'dom/dom-debug.js',
                    _YUIURL_.'event/event-debug.js',
                    _IMGURL_.'shcore.js',
                    _IMGURL_.'dpSyntaxHighlighter.js',
                    _IMGURL_.'josephjiang.js'
                ),
                'product' => array (
                    _IMGURL_.'josephjiang_freestyle_min.js?date='.$random
                )
            );
            break;
        };
        default : {
            $js_files = array (
                'debug' => array (
                    _YUIURL_.'yahoo/yahoo-debug.js',
                    _YUIURL_.'dom/dom-debug.js',
                    _YUIURL_.'event/event-debug.js',
                    _YUIURL_.'animation/animation-debug.js',
                    _IMGURL_.'button.js',
                    _IMGURL_.'news-rotator.js',
                    _IMGURL_.'josephjiang.js'
                ),
                'product' => array (
                    _IMGURL_.'josephjiang_core_min.js?date='.$random
                )
            );
        };
    };
?>

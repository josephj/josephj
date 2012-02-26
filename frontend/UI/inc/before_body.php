<?php 
    $page_title = (isset($page_title)?$page_title:'這樣做就對了'); 
    $meta_keywords = (isset($meta_keywords) && $meta_keywords !== '') ? $meta_keywords : '跑步環島,YUI,AJAX,F2E,JavaScript,前端工程師,Yahoo,CSS'; 
    $meta_description = (isset($meta_description) && $meta_description !== '') ? $meta_description : 'JosephJ 的個人部落格，也是相關前端技術發佈的一個網站';
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml" lang="zh-tw">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="Author" content="JosephJ">
<meta name="Keywords" content="<?php echo $meta_keywords; ?>">
<meta name="Description" content="<?php echo $meta_description; ?>">
<!-- facebook open graph (start) -->
<meta property="og:title" content="<?php echo $page_title; ?>">
<meta property="og:site_property" content="這樣做就對了">
<meta property="og:image" content="<?php echo isset($image_url) ? $image_url : ""; ?>">
<!-- facebook open graph (end) -->
<title><?php echo $page_title; ?></title>
<link rel="openid.server" href="http://www.myopenid.com/server" />
<link rel="openid.delegate" href="http://awoo.myopenid.com/" />
<link rel="shortcut icon" type="image/x-icon" href="http://l.yimg.com/e/icon/favicon.ico" />
<link rel="home" title="這樣做就對了 | 首頁" href="http://josephj.com/">
<?php 
    $css_files = ($is_debug)?$css_files['debug']:$css_files['product'];
    for($i=0,$j=count($css_files);$i<$j;$i++){
        echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"$css_files[$i]\" media=\"screen\">\n";
    };
    $browser = get_browser();
    $browser = strtolower($browser->browser . $browser->majorver);
?>
<link href="http://static.josephj.com/josephj_print.css" rel="stylesheet" type="text/css" media="print">
<link href="http://feeds.feedburner.com/josephj" rel="alternate" title="Joseph RSS" type="application/rss+xml">
</head>
<body class="<?php echo $browser . ' ' . $file_name; ?> yui-skin-sam">
    <div id="miii-root"></div>
    <script>
    (function () {
        if (typeof window.miii_url !== "undefined") {
            return;
        }
        window.miii_url = "http://a.mimgs.com/i/toolbar.js?frameset=0&m=6%2FlP8h27%2Fh%2FXDS28%2BEUf96fzabqwAgJA4UqlTqeeptYZSs%2FbPN4U4CbzlLoRTMYY&did=b2766e29a4a736a2487294041d058d2f";
        if (self !== top) {
            return;
        }
        var e, APP_URL, APP_MODE, counter, win;
        e       = document.createElement("script");
        e.id    = "miii-seed";
        e.src   = miii_url;
        e.async = true;
        document.getElementById("miii-root").appendChild(e)
    })();
    </script>
   <div id="fb-root"></div>
    <script>
      window.fbAsyncInit = function() {
        FB.init({appId: '133660103329824', status: true, cookie: true,
                 xfbml: true});
      };
      (function() {
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.src = document.location.protocol +
          '//connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
      }());
    </script>

<?php 
    $title = '這樣做就對了';
    $url = 'http://'.getenv('SERVER_NAME') . getenv('SCRIPT_NAME');
?><div id="ul" class="main-module">
    <div class="mod-content">
        <div class="bd">
            <a href="http://funp.com/pages/submit/add.php?url=<?php echo urlencode($url); ?>&s=<?php echo $title; ?>&via=tools" title="funP"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/funp.gif" title="funP" alt="funP"></a>
            <a href="http://www.hemidemi.com/user_bookmark/new?title=<?php echo $title; ?>&amp;url=<?php echo urlencode($url); ?>" title="Hemidemi"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/hemidemi.jpg" title="Hemidemi" alt="Hemidemi"></a>
            <a href="http://myshare.url.com.tw/index.php?func=newurl&amp;url=<?php echo urlencode($url); ?>&amp;desc=<?php echo $title; ?>" title="MyShare"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/myshare.jpg" title="MyShare" alt="MyShare"></a>
            <a href="http://del.icio.us/post?url=<?php echo urlencode($url); ?>&amp;title=<?php echo $title; ?>" title="del.icio.us"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/delicious.jpg" title="del.icio.us" alt="del.icio.us"></a>
            <a href="http://www.furl.net/storeIt.jsp?u=<?php echo urlencode($url); ?>&amp;t=<?php echo $title; ?>" title="Furl"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/furl.jpg" title="Furl" alt="Furl"></a>
            <a href="http://technorati.com/faves?add=<?php echo urlencode($url); ?>" title="Technorati"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/technorati.png" title="Technorati" alt="Technorati"></a>
            <a href="http://www.google.com/bookmarks/mark?op=edit&bkmk=<?php echo urlencode($url); ?>&title=<?php echo $title; ?>" title="Google"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/google.gif" title="Google" alt="Google"></a>
            <a href="http://myweb2.search.yahoo.com/myresults/bookmarklet?u=<?php echo urlencode($url); ?>&amp;=<?php echo $title; ?>" title="YahooMyWeb"><img src="http://www.freegroup.org/wp-content/plugins/sociable/images/yahoomyweb.jpg" title="YahooMyWeb" alt="YahooMyWeb"></a>              
        </div>
    </div>
</div>

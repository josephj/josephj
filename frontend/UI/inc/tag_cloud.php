<div id="tc" class="general-module">
    <div class="bd">
        <ul class="clearfix">
            <?php
                $tags = getTagList();
                for ($i=0,$j=count($tags);$i<$j;$i++) {
            ?><li class="level-<?php echo $tags[$i]['level']; ?>">
                <a href="<?php echo $tags[$i]['url']; ?>"><?php echo $tags[$i]['keyword']; ?></a>
            </li>
            <?php } ?>

        </ul>
    </div>
    <div class="ft">
        <cite>Powered By <a href="http://sitetag.us/" target="_blank">SiteTag.us</a></cite>
    </div>
</div>

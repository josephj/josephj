<?php global $statuses; ?><div id="rs" class="general-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Recent Status</h3>
        </div>
        <div class="bd">
            <div>
                <ol>
                    <?php for ($i=0, $j=count($statuses); $i < $j; $i++) { ?><li>
                        <span><?php echo strftime('%Y-%m-%d', strtotime($statuses[$i]['created_at'])); ?></span>
                        <a href="http://twitter.com/josephj6802/statuses/<?php echo $statuses[$i]['id']; ?>"><?php echo $statuses[$i]['text']; ?></a>
                    </li>
                    <?php } ?>
                </ol> 
            </div>
        </div>
    </div>
    <div class="ft">
        <!--
        <div class="clearfix" style="height:363px;width:412px;margin:10px auto;">
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="412" height="363" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="http://live.yahoo.com/swf/player/awoo" /><embed src="http://live.yahoo.com/swf/player/awoo" width="412" height="363" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer"></embed></object>
        </div>
        -->
    </div>
</div>

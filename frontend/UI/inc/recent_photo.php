<div id="rp" class="general-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Recent Photos</h3>
        </div>
        <div class="bd">
            <ul class="clearfix">
                <?php 
                    $feed = getPhoto();
                    $max = 9; 
                    for ($i=0,$j=count($feed['items']);$i<$j;$i++) {
                        if ($i === $max) {
                            break;
                        };
                        if (preg_match('/(http:\/\/.+static.flickr.com\/\d+\/\d+_[0-9a-z]+)_m\.jpg/', $feed['items'][$i]['media']['m'], $result)) {
                            $image = $result[1].'_s.jpg';
                        };
                ?><li>
                    <a href="<?php echo $feed['items'][$i]['link']; ?>" title="<?php echo $feed['items'][$i]['title']; ?>" target="_blank">
                        <img src="<?php echo $image;?>" alt="<?php echo $feed['items'][$i]['title']; ?>"> 
                    </a>
                </li>
                <?php } ?>

            </ul>
        </div>
        <div class="ft">
            <a href="http://www.flickr.com/photos/josephj/" target="_blank" title="我的 Flickr">更多...</a>
        </div>
    </div>
</div>

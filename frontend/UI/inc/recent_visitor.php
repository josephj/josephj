<div id="rv" class="general-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Recent Visitors</h3>
        </div>
        <div class="bd">
            <script src="http://pub.mybloglog.com/comm3.php?mblID=2008010222451982&amp;r=widget&amp;is=small&amp;o=l&amp;ro=5&amp;cs=black&amp;ww=220&amp;wc=multiple"></script>            
            <ul class="clearfix">
                <li></li>
                <?php 
                    if (true == false) {
                        for ($i=0, $j=count($visitors); $i < $j; $i++) {
                ?><li>
                    <a href="<?php echo $visitors[$i]['url']; ?>" title="<?php echo $visitors[$i]['nickname']; ?>">
                        <img src="<?php echo $visitors[$i]['pict']; ?>" alt="<?php echo $visitors[$i]['nickname']; ?>">
                    </a>
                </li>
                <?php }} ?>
            </ul>
        </div>
    </div>
</div>

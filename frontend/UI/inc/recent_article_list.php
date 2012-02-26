<div id="cl" class="general-module list-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Recnet List</h3>
        </div>
        <div class="bd">
            <ul>
                <?php 
                    for ($i=0, $j=count($article_recent_list); $i<$j; $i++) {
                ?><li>
                    <h4>
                        <a href="/entry.php?id=<?php echo $article_recent_list[$i]['blog_article_id']; ?>"><?php echo $article_recent_list[$i]['title']; ?></a>
                    </h4>
                </li>
                <?php } ?>
            </ul>
        </div>
    </div>
</div>

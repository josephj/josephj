<?php 
    global $comments; 
    global $is_login;
?><div id="rc" class="general-module list-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Recent Comments</h3>
        </div>
        <div class="bd">
            <ul>
                <?php 
                    for ($i=0,$j=count($comments);$i<$j;$i++) {
                ?><li>
                    <span class="author"><?php echo $comments[$i]['nickname']; ?></span>於<a href="entry.php?id=<?php echo $comments[$i]['blog_article_id']; ?>#comment_<?php echo $comments[$i]['blog_comment_id']; ?>"><?php echo $comments[$i]['blog_article_title']; ?></a>
                    <ins>( <?php echo $comments[$i]['added_date']; ?> )</ins>
                    <?php if ($is_login) { ?><a href="?method=delete&id=<?php echo $comments[$i]['blog_comment_id']; ?>&aid=<?php echo $comments[$i]['blog_article_id']; ?>" class="delete">刪</a><?php } ?>

                </li>
                <?php } ?>

            </ul>
        </div>
    </div>
</div>

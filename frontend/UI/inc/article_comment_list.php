<?php 
    global $comments; 
    global $is_login;
    if (count($comments)) {
?><div id="acl" class="general-module">
    <div class="mod-content">
        <div class="hd">
            <h2>Comments</h2>
        </div>
        <div class="bd">
            <ol>
                <?php 
                    for ($i=0,$j=count($comments);$i<$j;$i++) {
                        $class = '';
                        if ($i%2 === 1) {
                            $class = ' class="alt"';
                        };
                        if ($i === count($comments) - 1) {
                            if($class) {
                                $class = ' class="alt last"';
                            }
                            else {
                                $class = ' class="alt"';
                            };
                        };
                        
                ?><li>
                    <a name="comment_<?php echo $comments[$i]['blog_comment_id']; ?>"></a>
                    <div class="info">
                        <?php if ($is_login && $comments[$i]['email'] !== '') { ?>
                        <span class="author"><?php echo $comments[$i]['nickname']; ?>（<a href="mailto:<?php echo $comments[$i]['email']; ?>"><?php echo $comments[$i]['email']; ?></a>）</span>
                        <?php } else { ?>
                        <span class="author"><?php echo $comments[$i]['nickname']; ?></span>
                        <?php } ?>
                        <span class="time"><?php echo $comments[$i]['added_date']; ?></span>
                        <?php if ($is_login) { ?>
                        <a href="?method=response_comment&id=<?php echo $comments[$i]['blog_article_id']; ?>&cid=<?php echo $comments[$i]['blog_comment_id']; ?>#reply-form" class="response-link">回覆</a>
                        <?php } ?>
                    </div>
                    <div class="comment">
                        <?php echo nl2br(htmlentities($comments[$i]['content'], ENT_QUOTES, "UTF-8")); ?>
                    </div>
                </li>
                <?php } ?>

            </ol>
        </div>
    </div>
</div><?php } ?>

<div id="ra" class="general-module">
    <div class="mod-content">
        <div class="hd">
            <h2>
                <a title="主要內容區(Ctrl+C)" accesskey="c" href="#" class="accesskey">:::</a>近期文章
            </h2>
        </div>
        <div class="bd">
            <ol>
                <?php
                    for($i=0,$j=count($articles);$i<$j;$i++){
                        unset($image_url);
                        unset($image_link);
                ?><li>
                    <div class="date"><?php echo $articles[$i]['selected_date']; ?></div>
                    <h2>
                        <span class="category">[ <a href="<?php echo '/category.php?id='.$articles[$i]['blog_category_id']; ?>"><?php echo $articles[$i]['blog_category_title']; ?></a> ]</span>
                        <a href="<?php echo '/entry.php?id='.$articles[$i]['blog_article_id']; ?>"><?php echo $articles[$i]['title']; ?></a>
                    </h2>
                    <div class="statistics">
                        <span class="time">此篇文章最近更新時間為<em><?php echo $articles[$i]['last_update']; ?></em></span>
                        <span class="comment">目前共有 <a href="<?php echo '/entry.php?id='.$articles[$i]['blog_article_id']; ?>#reply-form"><?php echo $articles[$i]['blog_comment_total']; ?></a> 篇留言</span>
                    </div>
                    <div class="content">
                        <div class="wrapper clearfix"><?php 
                            preg_match('@<a.*?href="(.*?)".*?><img.*?src="(.*?)".*?></a>@', $articles[$i]['content'], $matches);
                            if (isset($matches[1]) && isset($matches[2])) {
                                $image_link = $matches[1];
                                $image_url = $matches[2];
                            }
                            if ($articles[$i]['is_nl2br'] === 'y') {
                                $content =  nl2br($articles[$i]['content']); 
                            } 
                            else {
                                $content =  $articles[$i]['content'];
                            }
                            $content = ereg_replace("<br />","`", $content);
                            $content = ereg_replace("<br>","`", $content);
                            $content = ereg_replace("<([^>]|\n)*>", "", $content);
                            $is_too_long = (mb_strlen($content) > 150) ? true : false;
                            $content = mb_substr($content, 0, 150, 'utf-8');
                            $content = str_replace('`','<br>',$content);
                            if (isset($image_link) && isset($image_url)) {
                                echo '<a href="/entry.php?id='.$articles[$i]['blog_article_id'].'"><img src="'.$image_url.'" align="left" style="margin-right:20px;"></a><br>';
                            }
                            echo $content;
                            if ($is_too_long) {
                                echo '...<br><br><a href="/entry.php?id='.$articles[$i]['blog_article_id'].'">繼續閱讀...</a>';
                            }
                        ?></div>
                    </div>
                </li>
                <?php } ?>

            </ol>
        </div>
        <div class="ft">
            <?php echo $page_html; ?>
        </div>
    </div>
</div>

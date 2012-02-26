<div id="ai" class="clearfix">
    <div class="bd">
        <div class="article clearfix">
            <h1>
<?php echo $article['title']; ?> 
<fb:like layout="button_count" href="http://<?php echo $_SERVER['HTTP_HOST']; ?><?php echo $_SERVER["REQUEST_URI"]; ?>" width="200"></fb:like>
<?php echo (isLogin() && isset($id)) ? "<a href=\"/admin/article_modify.php?id={$id}\">編輯</a>" : ''; ?>
            </h1>
            <div class="statistics">
                <span class="time">此篇文章最近更新時間為<em><?php echo $article['last_update']; ?></em></span>
                <span class="comment">目前共有<em><a href="#reply-form"><?php echo $article['blog_comment_total']; ?></a></em>篇留言</span>
            </div>
            <div class="tag">
                <span class="title">相關標籤：</span>
                <span class="content">
                    <script type="text/javascript" src="http://pub.sitetag.us/inline_badge.js?optimize=0"></script>
                </span>
            </div> 
        </div>
    </div>
</div>

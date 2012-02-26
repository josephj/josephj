<?php 
    global $article;
    global $nearby;
    if ($article['is_nl2br'] === 'y') {
        $content = nl2br($article['content']); 
    } else {
        $content = $article['content'];
    }
?><div id="ac">
    <div class="mod-content">
        <div class="hd clearfix"></div>
        <div class="bd" style="background:<?php echo $article['background']; ?>;">
            <div class="wrapper"><?php echo $content; ?></div>
            <div>
                <br><br>
                <script type="text/javascript" src="http://funp.com/tools/button.php?&s=7"></script>
            </div>
        </div>
        <div class="ft">
            <?php if (isset($nearby['previous'])) { ?><span class="previous-article-link">
                前一篇：<a href="entry.php?id=<?php echo $nearby['previous']['blog_article_id']; ?>"><?php echo $nearby['previous']['title']; ?></a>
            </span>
            <?php  } ?>

            <?php if (isset($nearby['next'])) { ?><span class="next-article-link">
                後一篇：<a href="entry.php?id=<?php echo $nearby['next']['blog_article_id']; ?>"><?php echo $nearby['next']['title']; ?></a>
            </span>
            <?php  } ?>

        </div>
    </div>
</div>

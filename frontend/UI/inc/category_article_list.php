<?php
    global $articles; 
    global $category_info;
?><div id="cal" class="general-module list-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Article List By Category</h3>
        </div>
        <div class="bd">
            <div class="category-info">
                <h1><?php echo $category_info[0]['title']; ?></h1>
                <p class="about"><?php echo $category_info[0]['content']; ?></p>
            </div>
            <ul>
                <?php 
                    for ($i=0, $j=count($articles); $i<$j; $i++) {
                ?><li>
                    <h4>
                        <a href="/entry.php?id=<?php echo $articles[$i]['blog_article_id']; ?>"><?php echo $articles[$i]['title']; ?></a>
                        <span>- <?php echo $articles[$i]['selected_date']; ?></span>
                    </h4>
                    <?php if (isset($articles[$i]['summary'])) { ?><p><?php echo $articles[$i]['summary']; ?></p><?php } ?>

                </li>
                <?php } ?>

            </ul>
        </div>
    </div>
</div>

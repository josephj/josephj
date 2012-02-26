<?php global $categorys; ?><div id="cl" class="general-module list-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Categories</h3>
        </div>
        <div class="bd">
            <ul>
                <?php 
                    for ($i=0,$j=count($categorys);$i<$j;$i++) {
                ?><li>
                    <h4>
                        <a href="/category.php?id=<?php echo $categorys[$i]['blog_category_id']; ?>"><?php echo $categorys[$i]['title']; ?></a>
                        <ins>(<?php echo $categorys[$i]['blog_article_total']; ?>)</ins>
                    </h4>
                    <p><?php echo $categorys[$i]['content']; ?></p>
                </li>
                <?php } ?>

            </ul>
        </div>
    </div>
</div>

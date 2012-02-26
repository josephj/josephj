<?php 
    global $articles; 
    global $total;
    global $page;
    global $page_size;
?><div id="am" class="general-module grid-module">
    <div class="mod-content">
        <div class="hd clearfix">
            <h2>Blog Articles</h2>
            <span class="statistics">共<em><?php echo count($articles);?></em>筆</span>
        </div>
        <div class="bd">
            <?php 
                if(count($articles)){ 
            ?><form action="?method=delete" method="post">
                <input type="hidden" name="quantity" value="<?php echo count($articles);?>">
                <table>
                    <col class="c1">
                    <col class="c2">
                    <col class="c3">
                    <col class="c4">
                    <col class="c5">
                    <col class="c6">
                    <thead>
                        <th class="check">
                            <span class="gui-button">
                                <span class="first-child">
                                    <span>刪除</span>
                                    <input type="submit" value="刪除" class="delete-button">
                                </span>
                            </span>
                        </th>
                        <th class="priority">優先順序</th>
                        <th class="date">時間</th>
                        <th class="title">標題</th>
                        <th class="visible">顯示</th>
                        <th class="modify last">編輯</th>
                    </thead>
                    <tfoot>
                        <th class="check">
                            <span class="gui-button">
                                <span class="first-child">
                                    <span>刪除</span>
                                    <input type="submit" value="刪除" class="delete-button">
                                </span>
                            </span>
                        </th>
                        <th class="priority">優先順序</th>
                        <th class="date">時間</th>
                        <th class="title">標題</th>
                        <th class="visible">顯示</th>
                        <th class="modify last">編輯</th>
                    </tfoot>
                    <tbody>
                        <?php
                            for ($i=0,$j=count($articles);$i<$j;$i++) {
                                $class = '';
                                switch($i){
                                    case 0:{ 
                                        $class = ' class="first"';
                                        break;
                                    };
                                    case (count($articles)-1):{
                                        $class = ' class="last"';
                                        break;
                                    };
                                    default:{ 
                                        $class = ''; 
                                    };
                                }; 
                                if($i%2===1) {
                                    if ($class) {
                                        if ($class === ' class="first"') {
                                            $class = ' class="first alt"';
                                        }
                                        else {
                                            $class = ' class="last alt"';
                                        };
                                    }
                                    else {
                                        $class = ' class="alt"';
                                    };
                                };
                        ?><tr<?php echo $class; ?>>
                            <td>
                                <input type="checkbox" name="blog_article_id[]" value="<?php echo $articles[$i]['blog_article_id']; ?>" class="delete-select">
                            </td>
                            <td class="priority">
                                <div>
                                    <?php 
                                        if(count($articles)!==1) { 
                                            if($i!=0) {
                                    ?><a href="?" class="up-button">
                                        <img class="up-img" src="<?php echo _IMGURL_; ?>btn_up.gif" alt="上">
                                    </a>
                                    <?php 
                                            }; 
                                            if($i!=count($articles)-1) { 
                                    ?><a href="?" class="down-button">
                                        <img class="down-img" src="<?php echo _IMGURL_;?>btn_down.gif" alt="下">
                                    </a>
                                    <?php 
                                            }; 
                                        }; 
                                    ?>

                                </div>
                            </td>
                            <td class="date"><?php echo $articles[$i]['selected_date']; ?></td>
                            <td class="title">
                                <span class="category">[ <a href="/category.php?id=<?php echo $articles[$i]['blog_category_id']; ?>"><?php echo $articles[$i]['blog_category_title']; ?></a> ]</span>
                                <a href="/entry.php?id=<?php echo $articles[$i]['blog_article_id']; ?>" class="title"><?php echo $articles[$i]['title'];?></a>
                            </td>
                            <td class="visible">
                                <a href="?method=<?php echo ($articles[$i]['is_show'] === 'y') ? 'hide' : 'show'; ?>&id=<?php echo $articles[$i]['blog_article_id']; ?>&cate=<?php echo $articles[$i]['blog_category_id']; ?>"><?php echo ($articles[$i]['is_show'] === 'y') ? '顯示' : '不顯示'; ?></a>
                            </td>
                            <td class="last">
                                <a href="/admin/article_modify.php?id=<?php echo $articles[$i]['blog_article_id'];?>" class="edit-button">編輯</a>
                            </td>
                        </tr>
                        <?php 
                            };
                        ?>
                        
                    </tbody>
                </table>
            </form>
            <?php } else { ?><div class="empty">
                <p>目前沒有任何部落格文章</p>
            </div>
            <?php } ?>
                        
        </div>
        <div class="ft">
            <?php echo getPageHTML($total, '', $page, $page_size); ?>

        </div>
    </div>
</div>

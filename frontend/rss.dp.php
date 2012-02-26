<?php
$category_id = getGET('id', '0');
$articles = getBlogArticleList(true, 0, 20, $category_id);
$rss = new RssGenerator();
$items = array();
$i = 0;
foreach ($articles as $article) {
    $items[$i]['title'] =  $article['title'];
    $items[$i]['description'] = $article['content'];
    $items[$i]['generator'] = 'josephj';
    $items[$i]['link'] = 'http://josephj.com/entry.php?id='.$article['blog_article_id'];
    $i++;
};
?>

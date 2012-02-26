<?php 
$page_title = 'josephj.com | 這樣做就對了';
$is_login = isLogin();
$category_id = getGET('id');
$total = getBlogArticleTotal($category_id);
$page = getGET('page', '1');
$page = ($page < 1 || !is_numeric($page)) ? 1 : $page; 
$page_size = 50;
$begin = ($page -1) * $page_size;
$articles = getBlogArticleList(true, $begin, $page_size, $category_id);
$category_info = getBlogCategoryInfo($category_id);

$categorys = getBlogCategoryList();
$page_html = getPageHTML($total, '', $page, $page_size); 
$comments = getBlogCommentList(0, 'y', 10);
$visitors = getVisitor();
$article_recent_list = getBlogArticleRecentList();

$statuses = getStatus();
?>

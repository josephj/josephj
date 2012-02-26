<?php
$page_title = 'josephj.com | 這樣做就對了';
$is_login = isLogin();
$method = getGET('method');
if ($method === 'delete') {
    if ($is_login) {
        $id = getGET('id');
        $aid = getGET('aid');
        hideBlogComment($id); 
        setBlogArticleCommentTotal($aid);
    };
};
$total = getBlogArticleTotal();
$page = getGET('page', '1');
$page = ($page < 1 || !is_numeric($page)) ? 1 : $page; 
$page_size = 10;
$begin = ($page -1) * $page_size;
$articles = getBlogArticleList(true, $begin, $page_size);

$categorys = getBlogCategoryList();
$page_html = getPageHTML($total, '', $page, $page_size); 
$comments = getBlogCommentList(0, 'y', 10);
$visitors = getVisitor();
$article_recent_list = getBlogArticleRecentList();

$statuses = getStatus();
?>

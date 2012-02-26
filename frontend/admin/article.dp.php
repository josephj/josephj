<?php 
if (!isLogin()) {
    header('Location: /login.php');
    exit();
};
$page_title = '文章管理 | 這樣做就對了';
// 隱藏或顯示資料 
if (getGET('method') === 'hide' || getGET('method') === 'show') {
    $is_show = (getGET('method') === 'show') ? 'y':'n';
    $id = getGET('id'); 
    setBlogArticle($id, array('is_show' => $is_show)); 
    $category_id = getGET('cate');
    setBlogCategoryTotal($category_id);
};
// 刪除資料
if (getGET('method','') === 'delete') {
    $id_array = $_POST['blog_article_id'];
    for ($i=0,$j=count($id_array);$i<$j;$i++) {
        deleteBlogArticle($id_array[$i]);
    };
};
// 新增資料 
if (getGET('method','') === 'insert') {
    $category_id = getPost('category','');
    $category = SelectData('blog_category', array('title'), array('blog_category_id'=>$category_id));
    $category_title = $category[0]['title'];
    $is_show = (getPOST('draft'))?'n':'y';
    addBlogArticle(
        array(
            'background' => getPost('background', ''),
            'blog_category_id' => $category_id,
            'blog_category_title' => $category_title,
            'content' => getPost('content',''),
            'selected_date' => getPost('date',''),
            'title'   => getPost('title',''),
            'is_show' => $is_show,
            'is_nl2br' => getPost('nl2br', '')
        )
    );
    // 更新分類數量
    setBlogCategoryTotal($category_id);
    header('Location: /admin/article.php');
    exit();
};
// 取得文章
$total = getBlogArticleTotal();
$page = getGET('page', '1');
$page = ($page < 1 || !is_numeric($page)) ? 1 : $page; 
$page_size = 10;
$begin = ($page -1) * $page_size;
$articles = getBlogArticleList(false, $begin, $page_size);
// 取得分類
$category_array = getBlogCategoryList();
?>

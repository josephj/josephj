<?php 
// 一定要登入才能進來這一頁
if (!isLogin()) {
    header('Location: /');
    exit();
};
// 取得 token
switch (getGET('method')) {
    case 'update': {
        // 放棄修改
        if (getPOST('cancel') === 'true') {
            header('Location: /admin/article.php');
            exit();
        };
        // 更新資料
        if (getPOST('post') === 'true' || getPOST('save') === 'true') {
            $article_id = getPost('id');
            $background = getPost('background');
            $category_id = getPost('category');
            $category_title = getBlogCategoryInfo($category_id);
            $category_title = $category_title[0]['title'];
            setBlogArticle($article_id, array(
                'background' => $background,
                'blog_category_id' => $category_id,
                'blog_category_title' => $category_title,
                'content' => getPost('content'),
                'is_nl2br'   => getPost('nl2br'),
                'keyword'   => getPost('keyword'),
                'selected_date' => getPost('date'),
                'summary'   => getPost('summary'),
                'title'   => getPost('title')
            ));
            setBlogCategoryTotal($category_id);
            if (getPOST('post') === 'true') {
                header('Location: /admin/article.php');
            }
            else {
                header('Location: /admin/article_modify.php?id='.$article_id);
            };
            exit();
        };
        break;
    };
    case 'issue_token': {
        $article_id = getPOST('article_id');
        $token_content = getPOST('content');
        $max_access = getPOST('max_access');
        $email = getPOST('email','');
        $hash = md5('added_date='.time().'&content='.$token_content.'&blog_article_id='.$article_id); 
        addBlogArticleToken($article_id, $token_content, $max_access, $hash);
        $access_key = 'http://'.getenv('HTTP_HOST').'/entry.php?id='.$article_id.'&hash='.$hash;
        if ($email) {
            $subject = '「這樣做就對了」私密文章閱讀權限';
            sendMail($email, $subject, $access_key);
        };
        echo $access_key;
        exit();
        break;     
    };
};
/* 取得文章內容與分類列表 */
$category_array = getBlogCategoryList();
$article_array = getBlogArticleInfo(getGet('id')); 
$article_info = $article_array[0];
$page_title = '文章修改：'.$article_info['title'].' | 這樣做就對了';
?>

<?php 
$is_login = isLogin();
$id = getGET('id','');
$id = intval($id);
if (!is_int($id) || $id === 0) {
    header('Location: /');
    exit();
};
$article_recent_list = getBlogArticleRecentList();
// 新增一篇留言 {{{
if (getPOST('method') === 'add-comment') {
    $article_id = getPost('id');
    $article_title = SelectData('blog_article', array('title'), array('blog_article_id'=>$article_id));
    $article_title = $article_title[0]['title'];
    $expire = time() + 30*24*60*60; // 1 month
    $response_id = getPost('response_id', 0);
    setCookie('nickname', getPOST('nickname'), $expire);
    setCookie('email', getPOST('email'), $expire);
    addBlogComment(
        array(
            'added_date' => date('Y-m-d G:i:s'),
            'blog_article_id' => $article_id,
            'blog_article_title' => $article_title,
            'content' => getPost('content'),
            'email' => getPost('email'),
            'nickname' => getPost('nickname'),
            'response_id' => $response_id
        )
    );
    // 更新分類數量
    setBlogArticleCommentTotal($article_id);
    // 寄通知信
    if ($response_id) {
        $email = SelectData('blog_comment', array('email'), array('response_id' => $response_id)); 
        $email = $email[0]['email'];
        if (isset($email) && $email !== '') {
            $content = 'josephj 回應了您的留言，請前往讀取：\n\n';
            $content .= 'http://josephj.com/entry.php?id='.$article_id;
            sendMail($email, '您在 josephj.com「這樣做就對了」有篇新的留言回覆', $content);
        }
    }
    header('Location: /entry.php?id='.$article_id);
    exit();
};
// }}}
// 回應一篇留言 {{{
if (getGET('method') === 'response_comment') {
    $response_id = getGET('cid', 0);
    echo $response_id;
}
// }}}
// 取得目前文章標題與內容 {{{
$article = getBlogArticleInfo($id);
$article = $article[0];
if ($article['is_show'] === 'n' && !isLogin()) {
    $hash = getGET('hash','');
    if ($hash) {
        if (checkToken($hash, $id)) {
            $comments = getBlogCommentList($id, 'y', false);
        }
        else {
            $comments = array();
        }
    }
    else {
        $comments = array();
    }
}
else {
    $comments = getBlogCommentList($id, 'y', false);
}
$visitors = getVisitor();
$page_title = $article['title']; 
$meta_keywords = $article['keyword'];
$meta_description = $article['summary'];
$error_message = '很抱歉！您沒有觀看此篇文章的權限';
$error_message .= '、如有問題請用網頁最下方的「聯絡我」跟管理者聯絡。';
if ($article['is_show'] === 'n' && !isLogin()) {
    $hash = getGET('hash','');
    if ($hash) {
        if (checkToken($hash, $id)) {
            updateToken($hash); 
        }
        else {
            $article['content'] = $error_message;
        };
    }
    else {
        $article['content'] = $error_message;
    };
};
preg_match('@<a.*?href="(.*?)".*?><img.*?src="(.*?)".*?></a>@', $article['content'], $matches);
if (isset($matches[1]) && isset($matches[2])) {
    $image_link = $matches[1];
    $image_url = $matches[2];
}
// }}}
// 取得前一篇文章與後一篇文章
$nearby = getBlogArticleNearBy($id);
?>

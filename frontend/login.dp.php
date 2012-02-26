<?php 
$message = '';
if (getGET('method') === 'auth') {
    if (checkAuth(getPOST('user'), getPOST('password'))) {
        setLoginCookie(getPOST('user'));
        header('Location: /admin/article.php');
        exit();
    };
    $message = '帳號或密碼不正確，請重新輸入';
}
$page_title = '登入 | 這樣做就對了';
?>

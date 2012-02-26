<?php 
    global $response_id;
    $response_id = isset($response_id) ? $response_id : 0;
?><div id="acf" class="general-module">
    <div class="mod-content">
        <div class="hd">
            <h2><a name="reply-form">Leave a Reply</a></h2>
        </div>
        <div class="bd">
            <form method="post" action="/js/">
                <input type="hidden" name="method" value="add-comment">
                <input type="hidden" name="id" value="<?php echo getGET('id'); ?>">
                <input type="hidden" name="response_id" value="<?php echo $response_id; ?>">
                <div class="row clearfix">
                    <span class="title">暱稱：</span>
                    <span class="content">
                        <span class="shadow">
                            <span>
                                <input type="text" name="nickname" class="name" value="<?php echo (isset($_COOKIE['nickname'])) ? $_COOKIE['nickname']:'' ; ?>">
                            </span>
                        </span>
                        <span class="tip">必填。</span>
                    </span>
                </div>
                <div class="row clearfix alt">
                    <span class="title">Email：</span>
                    <span class="content">
                        <span class="shadow">
                            <span>
                                <input type="text" name="email" class="email" value="<?php echo (isset($_COOKIE['email'])) ? $_COOKIE['email']:'' ; ?>">
                            </span>
                        </span>
                        <span class="tip">非必填。若填寫為不公開欄位，僅供站長參考聯繫。</span>
                    </span>
                </div>
                <div class="row clearfix last">
                    <span class="title">內容：</span>
                    <span class="content">
                        <span class="shadow">
                            <span>
                                <textarea name="content"></textarea>               
                            </span>
                        </span>
                        <span class="tip">必填。限 255 個字元以內。</span>
                    </span>
                </div>
                <div class="button-group">
                    <span class="gui-button">
                        <span class="first-child">
                            <span>送出</span>
                            <input type="submit" name="post" value="true">
                        </span>
                    </span>
                </div>
            </form>
        </div>
    </div>
</div>

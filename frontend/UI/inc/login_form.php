<?php global $message; ?><div id="lf" class="general-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Login</h3>
        </div>
        <div class="bd">
            <?php if ($message !== '') { ?><div class="message"><?php echo $message; ?></div>
            <?php } ?>

            <form method="post" action="?method=auth">
                <div class="row">
                    <span class="title">帳號：</span>
                    <span class="content">
                        <span class="shadow">
                            <span>
                                <input type="text" name="user">
                            </span>
                        </span>
                    </span>
                </div>
                <div class="row">
                    <span class="title">密碼：</span>
                    <span class="content">
                        <span class="shadow">
                            <span>
                                <input type="password" name="password">
                            </span>
                        </span>
                    </span>
                </div> 
                <div class="button-group">
                    <span class="gui-button">
                        <span class="first-child">
                            <span>確定</span>
                            <input type="submit" name="post" value="true">
                        </span>
                    </span>
                </div>
            </form>
        </div>
        <div class="ft">
            <a href="/">回到首頁</a>
        </div>
    </div>
</div>

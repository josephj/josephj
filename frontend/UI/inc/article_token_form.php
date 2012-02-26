<div id="atf" class="general-module">
    <div class="hd">
        <h2>Issue A Token</h2>
    </div>
    <div class="bd">
        <form method="post" action="?method=issue_token&id=<?php echo getGET('id'); ?>">
            <input type="hidden" name="article_id" value="<?php echo getGET('id'); ?>">
            <label>備註：</label>
            <span class="shadow">
                <span>
                    <input type="text" name="content" class="content">
                </span>
            </span>
            <label>次數：</label>
            <span class="shadow">
                <span>
                    <input type="text" name="max_access" value="1" class="max-access">
                </span>
            </span>
            <label>寄信到：</label>
            <span class="shadow">
                <span>
                    <input type="text" name="email" class="email">
                </span>
            </span>
            <span class="gui-button">
                <span class="first-child">
                    <span>建立</span>
                    <input type="submit" name="post" value="建立">
                </span>
            </span>
        </form>
    </div>
</div>

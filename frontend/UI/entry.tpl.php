<?php include_once './UI/inc/before_body.php'; ?>
<div id="<?php echo _PAGECLASS_; ?>">
<div id="hd">
<?php include_once './UI/inc/masthead.php'; ?>
</div>
<div id="bd">
<div id="yui-main">
<div class="yui-b">
<div class="yui-gc">
<div class="yui-u first">
<?php include_once './UI/inc/article_info.php'; ?>
</div>
<div class="yui-u">
<?php include_once './UI/inc/article_author.php'; ?>
</div>
</div>
<?php include_once './UI/inc/article_content.php'; ?>
<div class="yui-g">
<div class="yui-u first">
<?php include_once './UI/inc/article_comment_list.php'; ?>
<?php include_once './UI/inc/article_comment_form.php'; ?>
</div>
<div class="yui-u">
<?php include_once './UI/inc/article_comment_plugin.php'; ?>
<!--
<?php include_once './UI/inc/recent_article_list.php'; ?>
<?php include_once './UI/inc/recent_visitor.php'; ?>
-->
</div>
</div>
</div>
</div>
<div id="ft">
<?php include_once './UI/inc/mastfoot.php'; ?>
</div>
</div>
<?php include_once './UI/inc/after_body.php'; ?>

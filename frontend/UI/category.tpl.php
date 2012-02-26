<?php include_once 'inc/before_body.php'; ?>
<div id="<?php echo _PAGECLASS_; ?>" class="<?php echo _TEMPLATECLASS_; ?>">
<div id="hd">
<?php include_once 'inc/masthead.php'; ?>
</div>
<div id="bd">
<div id="yui-main">
<div class="yui-b">
<?php include_once 'inc/recent_status.php'; ?>
<?php include_once 'inc/category_article_list.php'; ?>
</div>
</div>
<div class="yui-b">
<?php include_once 'inc/author_badge.php'; ?>
<?php include_once 'inc/recent_work.php'; ?>
<?php include_once 'inc/recent_article_list.php'; ?>
<?php include_once 'inc/recent_comment.php'; ?>
<?php include_once 'inc/category_list.php'; ?>
<?php if (getPhoto()) : ?> 
<?php include_once 'inc/recent_photo.php'; ?>
<?php endif ?>
<?php include_once 'inc/recent_link.php'; ?>
<?php include_once 'inc/site_list.php'; ?>
<?php include_once 'inc/recent_visitor.php'; ?>
</div>
</div>
<div id="ft">
<?php include_once 'inc/mastfoot.php'; ?>
</div>
</div>
<?php include_once 'inc/after_body.php'; ?>

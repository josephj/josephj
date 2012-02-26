<?php include_once '../UI/inc/before_body.php'; ?>
<div id="<?php echo _PAGECLASS_; ?>"> 
<div id="hd">
<?php include_once '../UI/inc/masthead.php'; ?>
</div>
<div id="bd">
<div id="yui-main">
<div class="yui-b">
<?php include_once '../UI/inc/article_form.php'; ?>
<?php 
    if ($article_info['is_show'] === 'n') {
        include_once '../UI/inc/article_token_form.php';
    }; 
?>
</div>
</div>
</div>
<div id="ft">
<?php include_once '../UI/inc/mastfoot.php'; ?>
</div>
</div>
<?php include_once '../UI/inc/after_body.php'; ?>

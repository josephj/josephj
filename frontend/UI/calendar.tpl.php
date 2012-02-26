<?php include_once 'inc/before_body.php'; ?>
<style>
#calendar {margin:0 30px;}
#calendar .hd h2 {font-weight:bold;font-size:123.1%;margin:10px 0;}
#calendar .bd {margin:10px 0;}
</style>
<div id="<?php echo _PAGECLASS_; ?>" class="<?php echo _TEMPLATECLASS_; ?>">
<div id="hd">
<?php include_once 'inc/masthead.php'; ?>
</div>
<div id="bd">
<div id="yui-main">
<div class="yui-b">
    <div id="calendar">
        <div class="hd">
            <h2>Ting-yu (Joseph)'s Calendar</h2>
        </div>
        <div class="bd">
            <iframe src="http://www.google.com/calendar/embed?showTitle=0&amp;showCalendars=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;hl=en&amp;bgcolor=%23FFFFFF&amp;src=josephj6802%40gmail.com&amp;color=%230D7813&amp;src=sn7umn468if4tthb2f35pdo7k0%40group.calendar.google.com&amp;color=%23AB8B00&amp;src=bcdstudio.com_mrrpv4lqk60tkff7la47bmai04%40group.calendar.google.com&amp;color=%23B1440E&amp;src=pshp8uva1cbb7mpqln0f5c48qo%40group.calendar.google.com&amp;color=%23A32929&amp;src=hqd12h5on8345i02ibmcaaos7k%40group.calendar.google.com&amp;color=%232952A3&amp;ctz=America%2FLos_Angeles" style=" border-width:0 " width="100%" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
    </div>
</div>
</div>
<div class="yui-b">
<?php include_once 'inc/author_badge.php'; ?>
<?php include_once 'inc/recent_activity.php'; ?>
<?php include_once 'inc/recent_comment.php'; ?>
<?php include_once 'inc/category_list.php'; ?>
<?php include_once 'inc/recent_photo.php'; ?>
<?php include_once 'inc/recent_work.php'; ?>
<?php include_once 'inc/recent_article_list.php'; ?>
<?php include_once 'inc/site_list.php'; ?>
<?php include_once 'inc/recent_visitor.php'; ?>
</div>
</div>
<div id="ft">
<?php include_once 'inc/mastfoot.php'; ?>
</div>
</div>
<?php include_once 'inc/after_body.php'; ?>

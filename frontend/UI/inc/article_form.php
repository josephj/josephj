<?php 
    // 修改與新增共用同一個表單
    global $article_info;
    global $category_array;
    global $file_name;
?><div id="af" class="general-module form-module">
    <div class="hd">
        <h3><?php echo ($file_name === 'article') ? 'Add New Article' : 'Modify This Article'; ?></h3>
    </div>
    <div class="bd">
        <form action="?method=<?php echo ($file_name === 'article')?'insert':'update'; ?>" method="post">
            <?php if (isset($article_info)) { ?><input type="hidden" name="id" value="<?php echo $article_info['blog_article_id']; ?>">
            <?php } ?>
                
            <div class="row">
               <span class="title">分類與標題</span>
               <span class="content">
                   <select name="category">
                       <?php 
                           for ($i=0,$j=count($category_array);$i<$j;$i++) {
                               $selected = ($category_array[$i]['blog_category_id'] === $article_info['blog_category_id'])?' selected':'';
                       ?><option value="<?php echo $category_array[$i]['blog_category_id'];?>"<?php echo $selected; ?>><?php echo $category_array[$i]['title'];?></option>
                       <?php } ?>

                   </select>
                   <span class="shadow">
                       <span>
                           <input type="text" name="title" class="text" value="<?php echo $article_info['title']; ?>">
                        </span>
                   </span>
               </span>
           </div>
           <div class="row alt">
               <span class="title">日期</span>
               <span class="content" id="datefields">
                   <span class="shadow">
                       <span>
                           <input type="text" name="date" value="<?php echo ($file_name === 'article')?date('Y-m-d'):$article_info['selected_date']; ?>" class="date" maxlength="10">
                       </span>
                   </span>
               </span>
           </div>
           <div class="row">
               <span class="title">背景</span>
               <span class="content">
                   <span class="shadow">
                       <span>
                           <input type="text" name="background" class="text" value="<?php echo $article_info['background']; ?>">
                       </span>
                   </span>
               </span>
            </div>
           <div class="row alt">
               <span class="title">換行</span>
               <span class="content">
                   <select name="nl2br">
                   <?php
                       $options = array(
                           '是' => 'y',
                           '否' => 'n'
                       );
                       foreach ($options as $text => $value) {
                           $selected = (isset($article_info) && $article_info['is_nl2br'] == $value) ? ' selected' : ''; 
                           echo "<option value=\"$value\"$selected>$text</option>";
                       }
                   ?>
                   </select>
               </span>
            </div>
           <div class="row">
               <span class="title">內容</span>
               <span class="content">
                   <textarea name="content" style="font-size:16px;"><!--
<?php 
   $patterns[0] = '/<br>/i';
   $replacements[1] = "\n";
   //echo preg_replace($patterns, $replacements, $article_info['content']); 
   echo $article_info['content'];
?>
--></textarea>
               </span>
           </div>
           <div class="row alt">
               <span class="title">摘要</span>
               <span class="content">
                   <span class="shadow">
                       <span>
                           <input type="text" name="summary" class="summary" value="<?php echo $article_info['summary']; ?>">
                       </span>
                   </span>
               </span>
           </div>
           <div class="row last">
               <span class="title">關鍵字</span>
               <span class="content">
                   <span class="shadow">
                       <span>
                           <input type="text" name="keyword" class="keyword" value="<?php echo $article_info['keyword']; ?>">
                       </span>
                   </span>
               </span>
           </div>
           <div class="button-group">
               <?php 
                   if ($file_name === 'article') { 
               ?><span class="gui-button">
                   <span class="first-child">
                       <span>新增</span>
                       <input type="submit" name="post" value="true">
                   </span>
               </span>
               <span class="gui-button">
                   <span class="first-child">
                       <span>新增但不顯示</span>
                       <input type="submit" name="draft" value="true">
                   </span>
               </span>
               <?php 
                   }
                   else {
               ?><span class="gui-button">
                   <span class="first-child">
                       <span>修改</span>
                       <input type="submit" name="post" value="true">
                   </span>
               </span>
               <span class="gui-button">
                   <span class="first-child">
                       <span>存檔</span>
                       <input type="submit" name="save" value="true">
                   </span>
               </span>
               <span class="gui-button">
                   <span class="first-child">
                       <span>放棄</span>
                       <input type="submit" name="cancel" value="true">
                   </span>
               </span>
               <?php  } ?>

           </div>
        </form>
    </div>
</div>

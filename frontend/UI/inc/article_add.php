<?php 
    global $category_array;
?><div id="aa" class="general-module form-module">
    <div class="hd">
        <h3>Add A New Blog Article</h3>
    </div>
    <div class="bd">
        <form action="?method=insert" method="post">
           <div class="row">
               <span class="title">分類與標題</span>
               <span class="content">
                   <select name="category">
                       <?php 
                           for ($i=0,$j=count($category_array);$i<$j;$i++) {
                       ?><option value="<?php echo $category_array[$i]['blog_category_id'];?>"><?php echo $category_array[$i]['title'];?></option>
                       <?php } ?>

                   </select>
                   <span class="shadow">
                       <span>
                           <input type="text" name="title" value="">
                        </span>
                   </span>
               </span>
           </div>
           <div class="row alt last">
               <span class="title">內容</span>
               <span class="content">
                   <textarea name="content" id="content" cols="50" rows="10"></textarea>
               </span>
           </div>
           <div class="button-group">
               <span class="yui-button">
                   <span class="first-child">
                       <span>發表</span>
                       <input type="submit" name="post" value="true">
                   </span>
               </span>
               <span class="yui-button">
                   <span class="first-child">
                       <span>取消</span>
                       <input type="submit" name="draft" value="true">
                   </span>
               </span>
           </div>
        </form>
    </div>
</div>

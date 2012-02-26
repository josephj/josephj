<?PHP 
  function CHT_Java_UTF16_to_UFT8( $input_str )
   {
       $input_array = explode("u",$input_str);
       $ret_str = "";
       foreach( array_keys($input_array) as $index )
       {
               if ( $index == 0 )
                       continue;

               if ( strlen ( $input_array[$index] ) == 4 )
               {
                       $ret_str .= chr( hexdec(substr( $input_array[$index], 0, 2)) );
                       $ret_str .= chr( hexdec(substr( $input_array[$index], 2, 2)) );
               } else {
                       $ret_str .= chr(0x00);
                       $ret_str .= chr( hexdec( $input_array[$index]) );
               }
       }
       return mb_convert_encoding($ret_str, "UTF-8", "UTF-16");
   }

?> <div id="rl" class="general-module list-module">
    <div class="mod-content">
        <div class="hd">
            <h3>Recent Links</h3>
        </div>
        <div class="bd">
            <ul class="clearfix">
                <?php 
                    /*
                        del.icio.us 的格式
                        Array ( 
                            [u] => http://labs.mozilla.com/2007/12/personas-for-firefox/ 
                            [n] => 更換佈景主題的套件 
                            [d] => Mozilla Labs Blog » Blog Archive » Personas for Firefox 
                            [t] => Array ( [0] => firefox [1] => extension [2] => theme ) 
                        ) 
                    */
                    $items = getLink(10);
                    for ($i=0,$j=count($items);$i<$j;$i++) {
                        $note = CHT_Java_UTF16_to_UFT8($items[$i]['n']);
                ?><li>
                    <h4>
                        <a href="<?php echo $items[$i]['u'];?>" target="_blank"><?php echo utf8_decode($items[$i]['d']); ?></a>
                    </h4>
                    <?php if (isset($items[$i]['n'])) { ?><p><?php echo $note; ?></p>
                    <?php }; ?>

                </li>
                <?php } ?>

            </ul>
        </div>
        <div class="ft">
            <a href="http://del.icio.us/josephj/" title="我的 del.icio.us">更多...</a>
        </div>
    </div>
</div>

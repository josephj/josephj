<?php /* $Id: rss.inc.php 3723 2007-08-09 17:54:44Z mclee $ */ ?>
<?php
class RssGenerator
{
    var $_encoding = 'UTF-8';
    var $_title = '這樣做就對了！';
    var $_language = 'zh-tw';
    var $_description = 'JosephJ（蔣定宇）的個人部落格';
    var $_link = 'http://josephj.com/';
    var $_generator = 'JosephJ';
    var $_version = '1.0';

    function RssGenerator()
    {
    }

    function set($name, $value)
    {
        if ($name == 'encoding')
            $this->_encoding = stripslashes($value);
        if ($name == 'title')
            $this->_title = stripslashes($value);
        if ($name == 'language')
            $this->_language = stripslashes($value);
        if ($name == 'description')
            $this->_description = stripslashes($value);
        if ($name == 'generator')
            $this->_generator = stripslashes($value);
        if ($name == 'link')
            $this->_link = stripslashes($value);
    }

    /**
     * Make an xml document of the rss stream
     * @param: items: n row of associative array with theses field:
     * @param: title: title of the item
     * @param: description: short description of the item
     * @param: link: url to show the item
     * @param: pubData: publication timestamp of the item
     * @res: xml document of rss
     */
    function get($items)
    {
        $res='';

        // header
        $res .= "<?xml version=\"1.0\" encoding=\"".$this->_encoding."\"?>\n";
        $res .= "<rss version=\"2.0\">\n";
        $res .= "\t<channel>\n";
        $res .= "\t\t<title><![CDATA[".$this->_title."]]></title>\n";
        $res .= "\t\t<description><![CDATA[".$this->_description."]]></description>\n";
        $res .= "\t\t<link><![CDATA[".$this->_link."]]></link>\n";
        $res .= "\t\t<language>".$this->_language."</language>\n";
        $res .= "\t\t<lastBuildDate>". date("r") ."</lastBuildDate>\n";
        $res .= "\t\t<ttl>5</ttl>\n";
        $res .= "\t\t<generator><![CDATA[".$this->_generator."]]></generator>\n";

        //items
        foreach ($items as $item) {
            $res.="\t\t<item>\n";
            foreach ($item as $key => $val) {
                switch($key) {
                    case 'title':
                        $res .= "\t\t\t<title><![CDATA[".stripslashes($val)."]]></title>\n";
                        break;
                    case 'description':
                        $res .= "\t\t\t<description><![CDATA[".stripslashes($val)."]]></description>\n";
                        break;
                    case 'link':
                        if (!empty($val))
                            $res .= "\t\t\t<link><![CDATA[".stripslashes($val)."]]></link>\n";
                        break;
                    case 'pubDate':
                        if (!empty($val))
                            $res .= "\t\t\t<pubDate>".date("r", stripslashes($val))."</pubDate>\n";
                        break;
                    default:
                        $res .= "\t\t\t<$key><![CDATA[".stripslashes($val)."]]></$key>\n";
                        break;
                }
            }
            $res .= "\t\t</item>\n";
        }

        //footer
        $res .= "\t</channel>\n";
        $res .= "</rss>\n";
        return $res;
    }
}
?>

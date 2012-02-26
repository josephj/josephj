var YUD = YAHOO.util.Dom;
var YUE = YAHOO.util.Event;
var SiteTag = function () {
    /* reference: http://www.netlobo.com/url_query_string_javascript.html */
    var getValue = function (name, url) {
        name = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
        var regEx = new RegExp('[\\?&]' + name + '=([^&#]*)');
        return (!regEx.exec(url))?'':regEx.exec(url)[1];
    };
    var MastHead = function () {
        var dForm = this.getElementsByTagName('form')[0];
        var dButton = dForm.elements['post'];
        new YAHOO.widget.Button(dButton);
    }
    var RegisterConfirmed = function () {
        var dForm = this.getElementsByTagName('form')[0];
        var dButton = dForm.elements['post'];
        new YAHOO.widget.Button(dButton);
    }
    var BadgeList = function () {
        var dItems = this.getElementsByTagName('ul')[0].getElementsByTagName('li');
        var dTitle, dUrl, dButton;
        var oButton;
        var aMenuItems = [];
        // 將所有的 li 轉換為陣列物件
        YUD.batch(dItems, function (dEl) {
            var isSelected = YUD.hasClass(dEl, 'selected') ? true : false;
            var dLink = dEl.getElementsByTagName('a')[0]; 
            aMenuItems.push({
                'text' : dLink.innerHTML,
                'url' : '?id=' + getValue('id', dLink.getAttribute('href')),
                'disabled' : isSelected,
                'selected' : isSelected
            }); 
        });
        // 將用不到的 li 移除掉
        for (var i = dItems.length - 1, j = 0; i >= j; i--) { 
            if (!YUD.hasClass(dItems[i], 'selected')) {
                dItems[i].parentNode.removeChild(dItems[i]);
                continue;
            }
            dTitle = dItems[i].getElementsByTagName('a')[0];
            dUrl = dItems[i].getElementsByTagName('span')[0];
            // 放置 button
            dButton = document.createElement('span');
            YUD.generateId(dButton);
            dTitle.parentNode.insertBefore(dButton, dUrl);
        }
        oButton = new YAHOO.widget.Button({ 
            type : 'menu', 
            label : dTitle.innerHTML, 
            menu : aMenuItems, 
            container : dButton.id
        }); 
        oButton.getMenu().setHeader('我的網站列表');

        var oCarousel = new YAHOO.widget.Carousel('foo', {
            animation : {
                speed: 0.5
            },
            numVisible : 6,
            revealAmount : 3
        });
        var onItemSelected = function (iIndex) {
            dItem = oCarousel.getElementForItem(iIndex)
            if (dItem) {
               console.log(dItem.innerHTML);  
            }
 
        }
        oCarousel.on('itemSelected', onItemSelected);
        oCarousel.render();
        oCarousel.show();
    }
    return {
        'RegisterConfirmed' : RegisterConfirmed, 
        'MastHead' : MastHead,
        'BadgeList' : BadgeList
    }
    
}();
YUE.onContentReady('mh', SiteTag.MastHead);
YUE.onContentReady('rc', SiteTag.RegisterConfirmed);
YUE.onContentReady('bl', SiteTag.BadgeList);

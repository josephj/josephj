var JosephJiang = {};
var JJ = JosephJiang;
var YUE = YAHOO.util.Event;
var YUD = YAHOO.util.Dom;
var YUC = YAHOO.util.Connect;
var setTextPrompt = function (dInput,sText,dButton) {
    var YUE = YAHOO.util.Event;
    var YUD = YAHOO.util.Dom;
    if (!dInput || !sText) {
        return;
    };
    YUD.setStyle(dInput,'color','#999');
    dInput.value = sText;
    YUE.on(dInput, 'mouseup', function() {
        if(this.value === sText){
            this.value = ''
            YUD.setStyle(dInput,'color','#000');
        };
    });
    YUE.on(dInput, 'blur', function() {
        if(this.value === ''){
            this.value = sText;
            YUD.setStyle(dInput,'color','#999');
        };
    });
    if (dButton) {
        YUE.on(dButton, 'click', function() {
            if(dInput.value === sText) {
                dInput.value = '';
            };
        });
        YUE.on(dButton, 'change', function() {
            if(dInput.value === sText) {
                dInput.value = '';
            };
        });
    };
};
JJ.module = new function() {
    // ArticleForm {{{
    this.ArticleForm = function() {
        var dEditor,     //
            dForm,       // 表單元素
            dModule,     //
            dSwitchLink, // 切換編輯器的聯結元素
            dTextarea,   // 原始 Textarea 元素
            iKeyupCounter,
            oContainer,  //
            oEditor;     // 編輯器物件
        dModule = this;
        // init {{{
        var init = function () {
            // 插入切換編輯器的聯結
            dForm = dModule.getElementsByTagName('form')[0];
            dTextarea = dForm.getElementsByTagName('textarea')[0];
            iKeyupCounter = 0;
            dSwitchLink = document.createElement('a');
            dSwitchLink.innerHTML = '使用 HTML 精靈';
            dSwitchLink.className = 'switch-to-editor';
            dSwitchLink.setAttribute('href','#');
            dTextarea.parentNode.insertBefore(dSwitchLink, dTextarea);
            // 將 Hack 的註解移除
            dTextarea.value = dTextarea.value.replace(/^<!--\s{0,2}/, '');
            dTextarea.value = dTextarea.value.replace(/\s{0,2}-->$/, '');
            YUE.on(dSwitchLink, 'click', onSwitchLinkClick);
            YUE.on(window, 'beforeunload', onBeforeLeave);
            YUE.on(document, 'click', function(oEvent) {
                var dTarget = YUE.getTarget(oEvent);
                if (dTarget.nodeName === 'A' || dTarget.nodeName === 'INPUT') {
                    YUE.removeListener(window, 'beforeunload', onBeforeLeave);
                }
            });
            YUE.on(dTextarea, 'keyup', onTextareaKeyup);
            // 建立日期選單
            var oCalendarMenu = new YAHOO.widget.Overlay('calendarmenu'); //這個方法要善用
            var oButton = new YAHOO.widget.Button({
                type: 'menu',
                id: 'calendarpicker',
                label: '請選擇日期',
                menu: oCalendarMenu, //原來有這個屬性
                container: 'datefields' //放在這個節點
            });
            oButton.on('click', onButtonClick);
        }
        // }}}
        // getSourceCode : 將 <br> 轉為 \n {{{
        var getSourceCode = function (sCode) {
            var oPattern = /(<[\/\d="a-zA-Z ]+>)</gi; // why?
            if (dForm.elements['nl2br'].options[dForm.elements['nl2br'].selectedIndex].value == 'y') {
                var sReplace = '$1\n<';
                sCode = sCode.replace(/<br>/g, '\n');
                sCode = sCode.replace(oPattern, sReplace);
                sCode = sCode.replace(oPattern, sReplace);
            }
            return sCode;
        };
        // }}}
        // getHTMLCode : 將 \n 轉為 <br> {{{
        var getHTMLCode = function (sCode) {
            if (dForm.elements['nl2br'].options[dForm.elements['nl2br'].selectedIndex].value == 'y') {
                var oPattern = /(<[\/\d="a-zA-Z ]+>)\s+</gi;
                var sReplace = '$1<';
                sCode = sCode.replace(oPattern, sReplace);
                sCode = sCode.replace(oPattern, sReplace);
                sCode = sCode.replace(/\n/g, '<br>');
            }
            return sCode;
        };
        // }}}
        // setEditor : 編輯器的初始化 {{{
        var setEditor = function () {
            YUD.generateId(dTextarea);
            dTextarea.value = getHTMLCode(dTextarea.value);
            oEditor = new YAHOO.widget.Editor(dTextarea.id, {
                height: '300px',
                width: '522px', // 一定要設 522px, 整個工具列的部份才會剛好對齊 :p
                dompath: true,
                animate: false
            });
            // 在 Render 之後自動抓到 oContainer 及 Textarea
            oEditor.on('afterRender', function() {
                oContainer = oEditor.get('element_cont');
                dTextarea = oEditor.get('element');
            });
            oEditor.render();
        };
        // }}}
        // form submit {{{
        YUE.on(dForm, 'submit', function(oEvent){
            if (YUD.hasClass(dSwitchLink, 'switch-to-textarea')) {
                YUE.removeListener(window, 'beforeunload', onBeforeLeave);
                oEditor.saveHTML();
                dTextarea.value = getSourceCode(dTextarea.value);
            }
            else {
                dTextarea.value = getSourceCode(dTextarea.value);
            };
        });
        // }}}
        // onBeforeLeave : 預防使用者未存檔離開 {{{
        var onBeforeLeave = function(oEvent) {
            YUE.stopEvent(oEvent);
        };
        // }}}
        // onSwitchLinkClick 切換的事件 {{{
        var onSwitchLinkClick = function(oEvent) {
            YUE.preventDefault(oEvent);
            dTarget = YUE.getTarget(oEvent);
            switch (dTarget.className) {
                case 'switch-to-editor':
                    if (!oEditor) {  // 只有第一次會產生 Editor
                        setEditor();
                    }
                    else {
                        oContainer.replaceClass('yui-textarea-container', 'yui-editor-container');
                        oEditor._setDesignMode('on');
                        var sCode = oEditor.get('textarea').value;
                        oEditor.setEditorHTML(getHTMLCode(sCode));
                    }
                    // 設定文字
                    dSwitchLink.innerHTML = '檢視原始碼';
                    YUD.replaceClass(dSwitchLink, 'switch-to-editor', 'switch-to-textarea');
                    break;
                case 'switch-to-textarea' :
                    // 先存檔、並處理好文字內容
                    oEditor.saveHTML();
                    var sCode = oEditor.get('textarea').value;
                    oEditor.get('textarea').value = getSourceCode(sCode);
                    // 設定 Container
                    oContainer.replaceClass('yui-editor-container', 'yui-textarea-container');
                    // 設定文字
                    dSwitchLink.innerHTML = '使用 HTML 精靈';
                    YUD.replaceClass(dSwitchLink, 'switch-to-textarea', 'switch-to-editor');
                    break;
            };
        };
        // }}}
        // onButtonClick :  {{{
        var onButtonClick = function () {
            oCalendarMenu.setBody('&#32;');
            oCalendarMenu.body.id = 'calendarcontainer';
            oCalendarMenu.render(this.get('container'));
            oCalendarMenu.align();
            var oCalendar = new YAHOO.widget.Calendar('buttoncalendar', oCalendarMenu.body.id);
            oCalendar.render();
            oCalendar.changePageEvent.subscribe(function() {
                window.setTimeout(function () {
                    oCalendarMenu.show();
                }, 0);
            });
            oCalendar.selectEvent.subscribe(function(sType, aArg) {
                var aDate;
                if (aArg) {
                    aDate = aArg[0][0];
                    dForm.elements['date'].value = aDate.join('-');
                }
                oCalendarMenu.hide();
            });
            this.unsubscribe('click', onButtonClick); //這裡搞不太懂
        };
        // }}}
        var oCallback = {
            success : function (oResponse) {
            }
        }
        var onTextareaKeyup = function () {
            iKeyupCounter += 1;
            console.log(iKeyupCounter);
            if (iKeyupCounter % 5) {
                return;
            }
            YUC.setForm(dForm);
            YUC.asyncRequest('POST', '../service/rest/index.php?method=blog.update', oCallback);
        }
        init();
    };
    // }}}
    // MastHead {{{
    this.MastHead = function () {
        var dForm = this.getElementsByTagName('form')[0];
        setTextPrompt(dForm.elements['p'], '用 Yahoo! 來查詢本站內容', dForm.elements['post']);

        var dForm = this.getElementsByTagName('form')[1];
        setTextPrompt(dForm.elements['q'], '用 Google 來查詢本站內容', dForm.elements['sa']);
    };
    // }}}
    // ArticleContent {{{
    this.ArticleContent = function () {
        if (typeof dp == 'undefined') {return;}
        dp.SyntaxHighlighter.HighlightAll('code');
    };
    // }}}
    /* recent_status */
    this.RecentStatus = function () {
        var dModule = this;
        var dScroller = dModule.getElementsByTagName('ol')[0];
        var oNewsScroller = new YAHOO.util.NewsRotator(dScroller);
    };
    /* article_comment_form */
    this.ArticleCommentForm = function () {
        var dModule = this;
        var dForm = dModule.getElementsByTagName('form')[0];
        YUE.on(dForm, 'submit', function(oEvent) {
            dForm.action = location.href;
        });
    };
    /* article_comment_list */
    this.ArticleCommentList = function () {
        var dModule = this;
        var dComments = YUD.getElementsByClassName('comment', 'div', dModule);
        updateURL2Link(dComments);
    };
};
(function(){
    YUE.onContentReady('af', JJ.module.ArticleForm);
    YUE.onContentReady('acf', JJ.module.ArticleCommentForm);
    YUE.onContentReady('acl', JJ.module.ArticleCommentList);
    YUE.onContentReady('mh', JJ.module.MastHead);
    YUE.onContentReady('ac', JJ.module.ArticleContent);
    YUE.onContentReady('rs', JJ.module.RecentStatus);
})();

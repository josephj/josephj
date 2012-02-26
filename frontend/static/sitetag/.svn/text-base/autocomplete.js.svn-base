/* autocomplete.js (new)  */
(function(){
    var $E = YAHOO.util.Event;
    var $D = YAHOO.util.Dom;
    YAHOO.encodeURIComponent =  encodeURIComponent || escape;
    var dynamicScriptNodes = function(){
        var nIndex = 0;
        var oActiveNodes = {};
        var nActiveNodes = 0;
        var oNodeIds = {};
        var eHead = document.getElementsByTagName('HEAD')[0];
        var removeNode = function(key){
            var eScript = null;
            if(oActiveNodes[key]){
                eScript = oActiveNodes[key].eScript;
                eScript.onload = eScript.onreadystatechange = null;
                eScript.parentNode.removeChild(eScript);
                nActiveNodes--;
                delete oActiveNodes[key];
            };
        };
        var removeActiveNodes = function(){
            for(var i in oActiveNodes){
                removeNode(i);
            };
        };
        var onLoad = function(eScript, oCallBack){
            return function(e){
                var arg = null;
                if(eScript.readyState && eScript.readyState != 'complete' && eScript.readyState != 'loaded'){
                    return;
                }
                if(oCallBack && oCallBack.fn){
                    arg = [oActiveNodes[eScript.id]];
                    if(oCallBack.arg){
                        arg.push(oCallBack.arg);
                    }
                    oCallBack.fn.apply(this, arg);
                }
                removeNode(eScript.id);
                eScript = null;
            };
        };
        var load = function(sUrl, oCallBack){
            nIndex++;
            var eScript = document.createElement('SCRIPT');
            eScript.type = 'text/javascript';
            eScript.id = 'y_dod-' + nIndex;
            // onload doesn't work for safari v2;
            eScript.onload = eScript.onreadystatechange = onLoad(eScript, oCallBack);
            eScript.defer = true;
            eScript.src = sUrl;
            oActiveNodes[eScript.id] = { 'eScript': eScript, 'nRequestTime': new Date().getTime()};
            nActiveNodes++;
            eHead.appendChild(eScript);
        };  
        return {
            load : load,
            removeNode : removeNode,
            removeActiveNodes : removeActiveNodes
        };
    };
    // constructor
    var AutoComplete = function(attr){
        var dy = dynamicScriptNodes();
        var _isIE = (navigator.userAgent.toLowerCase().indexOf('msie') != -1);
        var _isMac = (navigator.userAgent.toLowerCase().indexOf('mac') != -1);
        var sUrl = attr.sUrl + '?' + attr.sQueryString + '&' + attr.sQueryParam + '=';
        var eInput = attr.eInput;
        eInput.setAttribute('autocomplete','off');
        var sContainerClass = attr.sContainerClass;
        var sContainerId;
        var eContainer;
        //added dom
        var eBody; //eConatainer.eBody memory leak?
        var oLastHighLi, oCurHighLi;
        var isMouseOverContainer = 0;
        // initialize other variables;
        var oCachedData = {}; //Cached query data
        var oIgnoredQueries = {};
        var bLastQueryEmpty = 0;
        // Connections
        var nMaxDynamicNodes = 2;
        var nTotalDynamicNodes = 0;
        var bDropDynamicNodes = attr.bDropDynamicNodes || 1;
        var oQueuedDynamicNodes = null;
        var oActiveDynamicNodes = {} ; // Script nodes that are active;
        var nActiveDynamicNodes = 0;
        var nTimeOutForDynamicNodes = attr.nTimeOutForDynamicNodes || 500;
        // Disable autocomplete if 4-5 request times out;
        var nMaxItems = attr.nMaxItems;
        var nHighLightIndex = 0;
        // Tracking;
        var oTracking = { nAverageRTT : 0, nTotalTimeOut : 0 };  
        var sHighLightClassName = attr.sHighLightClassName || 'yui-ac-highlight';
        var isAutoSubmit = attr.isAutoSubmit || 1;
        // Query
        var nCurrentQueryLength = 0;
        var nPreviousQueryLength = 0;
        var sCurrentQuery = null;
        var nMinQueryLength = attr.nMinQueryLength || 3;
        var sCachedQuery = null;
        var nQueryDelay = attr.nQueryDelay || 100;
        var tTimeOutId = null;
        var _queryInterval = null;
        var bLeaveContainerClose;
        var bItemSelected = 0;
        var slastResult='';
        var isNoQuery = false;
        var userMethods = {};
        userMethods.formatResult = attr.formatResult || null;
        userMethods.onBeforeSubmit = attr.onBeforeSubmit || function(){};
        userMethods.onPreSendQuery = attr.onPreSendQuery || function(){};
        userMethods.doBeforeExpandContainer = attr.doBeforeExpandContainer || function(){};  
        var customEvent = {};
        var showContainer = function(){
            userMethods.doBeforeExpandContainer(eInput, eContainer);
            if( bLeaveContainerClose === false ){
                eContainer.style.display = 'block';
                $D.setX(eContainer,$D.getRegion(eInput)['left']);
                $D.setY(eContainer,$D.getRegion(eInput)['top']+25);
                $D.setStyle(eContainer,'width',eInput.offsetWidth-2+'px');
            };
        };
        var hideContainer = function(){
            eContainer.style.display = 'none';
            nHighLightIndex = 0;
        };
        var formatResult = function(sResult, sQuery){
            return userMethods.formatResult(sResult, sQuery) || sResult;
        };
        var populateHtml = function( aResult ){
            var aHtml = [];
            aHtml[aHtml.length] = '<ul>';
            for(var i=0,sQueryResult;sQueryResult = aResult[i];i++){
                aHtml[aHtml.length] = [ 
                    '<li v="',i,'">',
                        formatResult(sQueryResult, sCurrentQuery),
                    '</li>' 
                ].join('');
            };
            aHtml[aHtml.length] = '</ul>';
            return aHtml.join('');
        };
        var populateResult = function ( aResult ) {
            if(aResult!=slastResult){
                slastResult = aResult;
                eBody.innerHTML = populateHtml(aResult);
            }
            showContainer();
        };
        var onLoadCallBack = function(arg) {
            // Cache data
            var sQuery = arg[0];
            var aResult = arg[1].splice(0, nMaxItems);
            if ( aResult.length === 0 ){
                bLastQueryEmpty = 1;
                delete oCachedData[sQuery];
                oIgnoredQueries[sQuery] = 1;
                hideContainer();
            } 
            else {
                oCachedData[ sCurrentQuery ] = aResult;
                populateResult ( oCachedData[ sCurrentQuery ] ) ;
            }
            if (_isMac && oActiveDynamicNodes[sQuery]){ 
                //onload is not supported for script. ? bug has been fixed in most recent version of safari
                return;
                var eScript = $D.get(dy.oActiveNodes[sQuery].sScriptId);
                dy.removeNode(eScript);
                dynamicNodeCallBack (eScript, sQuery);
            }
        };  
        var dynamicNodeCallBack = function(scrObject, arg){
            var sQuery = arg;  
            nActiveDynamicNodes--;
            delete oActiveDynamicNodes[sQuery];
            if(sCachedQuery!=null){
                sendQuery ( sCachedQuery );
                sCachedQuery = null;
            };
        };
        var sendQuery = function (sQuery) {
            sCurrentQuery = sQuery;
            if ( oIgnoredQueries[sQuery] ){
                hideContainer();
                return;
            }
            else if ( oCachedData[sQuery] ) {
                populateResult(oCachedData[sQuery]);
                bLastQueryEmpty = 0;
            } 
            else if ( oActiveDynamicNodes[ sQuery ] ){
            } 
            else if (bLastQueryEmpty==1) {
                oIgnoredQueries[sQuery] = 1;
            }
            else if (_isMac || ( !_isMac && nActiveDynamicNodes < 2)){
                oActiveDynamicNodes[sQuery] = 1;
                nActiveDynamicNodes++;
                dy.load(sUrl + YAHOO.encodeURIComponent(sQuery),{fn : dynamicNodeCallBack, arg: sQuery },sQuery);
            }
            else {
                sCachedQuery = sQuery;
            } 
        };
        var highLightSelection = function(keyCode){
            var aLis, sValue, nId, nLength;
            if ( eContainer.style.display != 'none' && oCachedData[sCurrentQuery] ){
                aLis = eBody.getElementsByTagName('li');
                if(aLis){
                    nId = nHighLightIndex;
                    nLength = eBody.getElementsByTagName('LI').length;
                    if ( keyCode == 40 ) {
                        nId = ( nId == nLength ) ? 0 : nId + 1;
                    }else {
                        nId = ( nId == 0 ) ? nLength : nId - 1;
                    }                    
                    sValue = ( nId > 0 && nId <= nLength ) ? oCachedData[sCurrentQuery][nId-1] : sValue = sCurrentQuery;
                    eInput.value = sValue;
                    setCaretTo(eInput, sValue.length);
                    oCurHighLi = (nId > 0 && nId <= nLength) ? aLis[nId-1] : null; 
                    bItemSelected = ( nId == 0 ) ? 0 : 1;
                    nHighLightIndex = nId;
                    
                    if (oLastHighLi && oLastHighLi!=oCurHighLi) {oLastHighLi.className='';};
                    if (oCurHighLi) { 
                        oCurHighLi.className=sHighLightClassName; 
                        oLastHighLi = oCurHighLi;
                    };                
                }
            }
        }
        var setCaretTo = function(eNode, nPosition) { 
            var range;
            if(eNode.createTextRange) {
                range = eNode.createTextRange(); 
                range.move('character', nPosition); 
                range.select(); 
            } 
            else if(eNode.selectionStart) { 
                eNode.setSelectionRange(nPosition, nPosition); 
            }
        };
        var isIgnoreKey = function(nKeyCode) {
            if((nKeyCode == 9) || (nKeyCode==219) ||  // tab, enter <-- remove enter for chinese input
            (nKeyCode == 16) || (nKeyCode == 17) || // shift, ctl
            (nKeyCode >= 18 && nKeyCode <= 20) || // alt,pause/break,caps lock
            (nKeyCode == 27) || // esc
            (nKeyCode >= 33 && nKeyCode <= 35) || // page up,page down,end
            (nKeyCode >= 36 && nKeyCode <= 38) || // home,left,up
            (nKeyCode >= 44 && nKeyCode <= 45)) { // print screen,insert
                return true;
            };
            if(nKeyCode==40){ //down
                if(eContainer.style.display=='block'){
                    return true;
                };
            };
            return false;
        };
        var preSendQuery = function(e){
            if(isNoQuery){
                $E.stopEvent(e);
                return false;
            };
            userMethods.onPreSendQuery();
            var sTempQuery = eInput.value;
            bLeaveContainerClose = false; // if server is slow to respondl
            if(nMinQueryLength<0||sTempQuery.length < nMinQueryLength){
                hideContainer();
                sTempQuery = null;
                bLeaveContainerClose = true; // if server is slow to respondl
                bLastQueryEmpty = 0;
                if( tTimeOutId != null ){
                    clearTimeout(tTimeOutId);
                    tTimeOutId = null;
                };
                return;
            };
            if(sTempQuery != null){
                bLastQueryEmpty = 0;
            };
            if(tTimeOutId!=null){
                clearTimeout(tTimeOutId);
                tTimeOutId = null;
            };
            tTimeOutId = window.setTimeout(function(){sendQuery(sTempQuery);},nQueryDelay);
        };
        var onInputKeyUp = function (e) { // natural input fix needed?
            var nKeyCode = e.keyCode;
            if(isIgnoreKey(nKeyCode)){
                return;
            };
            preSendQuery(e);
        };
        var onInputKeyDown = function (e) {
            var nKeyCode = e.keyCode;
            _cancelIntervalDetection();
            switch ( nKeyCode ) {
                case 9 : // tab
                    hideContainer();
                    //$E.stopEvent(e);
                    break;
                case 13 : // Enter
                    if(bItemSelected){ 
                        customEvent.itemSelect.fire();
                    };// for redirect
                    break;
                case 27 : // esc
                    // Close open container
                    hideContainer();
                    break;
                case 37 : // Left
                    break;
                case 39 : // Right
                    break;
                case 38 : // UP
                    $E.stopEvent(e);
                    highLightSelection(nKeyCode);
                    break;
                case 40 : // DOWN
                    $E.stopEvent(e);
                    highLightSelection(nKeyCode);
                    break;
            }
        };
        var _cancelIntervalDetection = function () {
            if(_queryInterval!=null){
                clearInterval(_queryInterval);
                _queryInterval = null;
            };
        };
        var onInputKeyPress = function (e) {
            var nKeyCode = e.keyCode;
            // Only for safari where stopEvent is ineffective on keydown
            if(_isMac){
                switch (nKeyCode) {
                    case 38: // up
                        $E.stopEvent(e); 
                        break;
                    case 40: // down
                        $E.stopEvent(e); 
                        break;
                    default: 
                        break;
                };
            }
            else if (nKeyCode == 229) {
                _cancelIntervalDetection();
                _queryInterval = setInterval(function() {
                    preSendQuery();
                }, 500);
            };
        };
        var onInputBlur = function(){
            _cancelIntervalDetection();
        };
        var onContainerClick = function(e) {
            var eTarget = $E.getTarget(e);
            if (oCurHighLi){
                var sValue = oCachedData[sCurrentQuery][oCurHighLi.getAttribute('v')];
                eInput.value = sValue;
                eInput.focus();
                setCaretTo(eInput, sValue.length);
                $E.preventDefault(e);
                customEvent.itemSelect.fire();
            };
        };
        var onContainerMouseOver = function (e) {
            var eTarget = $E.getTarget(e);
            isMouseOverContainer = 1;
            if (eTarget.tagName.toLowerCase()=='li'){
                oCurHighLi = eTarget;
            } 
            else if (eTarget.parentNode.tagName.toLowerCase()=='li'){
                oCurHighLi = eTarget.parentNode;
            };
            if (oCurHighLi){
                if (oLastHighLi && oLastHighLi!=oCurHighLi){ oLastHighLi.className='';};
                oCurHighLi.className=sHighLightClassName;
                nHighLightIndex= parseInt(oCurHighLi.getAttribute('v'))+1;
                oLastHighLi=oCurHighLi;
            };
        };
        var onContainerMouseOut = function (e) {
            isMouseOverContainer = 0;
        };
        var onDocumentMouseDown = function(e){
            var eTarget = $E.getTarget(e);
            if(eTarget.nodeName!='HTML'){
                while(eTarget.id != sContainerId && eTarget.id != eInput.id && eTarget.nodeName != 'BODY'){
                  eTarget = eTarget.parentNode;
                };
            };
            if(eTarget.nodeName == 'BODY'){
                _cancelIntervalDetection();
                hideContainer();
            };
        };
        var onFormSubmit = function(){
            //console.log('onFormSubmit');
            hideContainer();
            dy.removeActiveNodes();
            if(eInput.form){
                // ac-submit separate from setsearch-submit; overwrite here
                userMethods.onBeforeSubmit(bItemSelected, eInput);
            };
        };    
        var submitForm = function() {
            bItemSelected = 1;
            onFormSubmit();
    		eInput.form.submit();
        };
        var attachEvents = function(){
            //attachEvents to input field,
            $E.on(eInput, 'keyup', onInputKeyUp);//send query
            $E.on(eInput, 'keydown', onInputKeyDown);//switch keycode
            $E.on(eInput, 'keypress', onInputKeyPress);//for safari
            $E.on(eInput, 'blur', onInputBlur);//send query
            if(eInput.form){
                $E.on(eInput.form, 'submit', onFormSubmit);
            };
            //attachEents to output box;
            $E.on(eContainer, 'mouseover', onContainerMouseOver);
            $E.on(eContainer, 'mouseout', onContainerMouseOut);
            $E.on(eContainer, 'click', onContainerClick);
            $E.on(document, 'mousedown', onDocumentMouseDown);
            // Attach onSubmit Event;
            // Custom Events;
            customEvent.itemSelect = new YAHOO.util.CustomEvent('itemSelect');
            if(isAutoSubmit){
                customEvent.itemSelect.subscribe(submitForm);
            };
        };
        var initContainer = function(){
            var createElement = function(sTag, oAttr, sHtml){
                var el = document.createElement(sTag);
                for(var i in oAttr){
                    el[i] = oAttr[i];
                };
                if(sHtml){
                    el.innerHTML = sHtml;
                };
                return el;
            };
            //set eInput id
            if(!eInput.id){
                $D.generateId(eInput);
            }    	
            //create container
            eContainer = createElement('div', {'className': sContainerClass});
            sContainerId = $D.generateId(eContainer);
            eInput.parentNode.insertBefore(eContainer,eInput);
            $D.setStyle(eContainer,'position','absolute');
            $D.setStyle(eContainer,'display','none');
            eBody = createElement('div', {'className': 'ac_bd'});
            eContainer.appendChild(eBody);
        };
        var init = function(){
            initContainer();
            attachEvents();
        };
        return {
            'init'  : init,
            'callBack' : onLoadCallBack,
            'setNoQuery': function(s){isNoQuery=s;},
            'EOF' : null
        };
    };
    YAHOO.widget.AutoComplete = AutoComplete;
})();

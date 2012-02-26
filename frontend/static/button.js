(function() {
    var $E = YAHOO.util.Event;
    var $D = YAHOO.util.Dom;
    var hoveredEls = [];
    var clickedEls = [];
    var downTimer;
    var getButtonWrapper = function(e) {
        var el = $E.getTarget(e);
        switch (el.nodeName.toLowerCase()) {
            case 'input': {
                break;
            };
            default: {
                return null;
                break;
            };
        };
        var rule = $D.getStyle(el, 'listStyleImage');
        if (rule.indexOf('uihtmlbutton') < 0) {
            return null;
        };
        if (YAHOO.env.ua.ie) {
            el.hideFocus = 'true';
        };
        return el.parentNode.parentNode;
    };
    var mouseEnterEvent = function(e) {
        var wrapperEl = getButtonWrapper(e);
        if (!wrapperEl) {
            return;
        };
        if (hoveredEls && hoveredEls[hoveredEls.length - 1] === wrapperEl) {
            return;   
        }; 
        hoveredEls[hoveredEls.length] = wrapperEl;
        $D.addClass(wrapperEl, 'gui-button-hover');
    };
    var mouseLeaveEvent = function(e) {
        var wrapperEl = getButtonWrapper(e);
        if (!wrapperEl) {
            return;
        };
        if (!hoveredEls.length) { 
            return;
        };
        var el;
        for (var i=0;el=hoveredEls[i];i++) {
            $D.removeClass(el, 'gui-button-hover');
        };
        hoveredEls = [];
    };
    var mouseDownEvent = function(e) {
        var wrapperEl = getButtonWrapper(e);
        if (!wrapperEl) {
            return;
        };
        if (clickedEls.length && clickedEls[clickedEls.length - 1] === wrapperEl) {
           return;
        }; 
        clickedEls[clickedEls.length] = wrapperEl;
        $D.addClass(wrapperEl, 'gui-button-active');
        downTimer = new Date();
    };
    var mouseUpEvent = function(e) {
        if (downTimer) {
            if ((new Date() - downTimer) < 60 ) {
                return;
            };
        };        
        var el;
        for (var i=0;el=clickedEls[i];i++) {
            $D.removeClass(el, 'gui-button-active');
        };
        clickedEls = [];
        downTimer = null;
    };
    if (YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7) {
        $E.on(document, 'mouseover', mouseEnterEvent);
        $E.on(document, 'mouseout', mouseLeaveEvent);
    }
    else {
        mouseEnterEvent = mouseLeaveEvent = null;
    };
    $E.on(document, 'mousedown', mouseDownEvent);
    $E.on(document, 'mouseup', mouseUpEvent);
})();

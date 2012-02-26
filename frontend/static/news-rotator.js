(function () {
    var NewsRotator = function(dElement,oConfig){
        var YUE = YAHOO.util.Event;
        var YUD = YAHOO.util.Dom;
        var oComponent = this;
        if (typeof(oConfig)=='undefined') {
            oConfig = {};
        };
        oComponent.config = {};
        oComponent.config.iDuration = (oConfig.iDuration) ? oConfig.iDuration : 0.5;
        oComponent.config.iInterval = (oConfig.iInterval) ? oConfig.iInterval : 2;
        oComponent.config.sItemClassName = (oConfig.sItemClassName) ? oConfig.sItemClassName : '';
        oComponent.config.oEasingMethod = (oConfig.oEasingMethod) ? oConfig.oEasingMethod : null;
        var iShowCurrent = 0;
        var iShowNext = 1;
        var iQueueCurrent = 0;
        var iQueueNext = 1;
        var dScroller;
        var dQueues;
        var dShows = [];
        var oMotion1,oMotion2;
        var oScrollerTimer;
        var dHeightDetector;
        oComponent.run = function () {
            iShowNext = (iShowCurrent) ? 0 : 1;
            iQueueNext = ((iQueueCurrent+1)<dQueues.length-2)?iQueueCurrent+1:0;
            dShows[iShowNext].innerHTML = dQueues[iQueueNext].innerHTML;
            var iShowCurrentBottomY = YUD.getRegion(dShows[iShowCurrent])['bottom'];
            YUD.setStyle(dShows[iShowNext],'display','block');
            YUD.setY(dShows[iShowNext],iShowCurrentBottomY);
            var iDistance = iShowCurrentBottomY - YUD.getRegion(dShows[iShowCurrent])['top'];
            oMotion1.attributes.points = {by:[0,-iDistance]};
            oMotion2.attributes.points = {by:[0,-iDistance]};
            oMotion1.animate();
            oMotion2.animate();
        };
        var onMotionComplete = function (oEvent) {
            YUD.setStyle(dShows[iShowCurrent],'display','none');
            iShowCurrent = (iShowCurrent)?0:1;
            iQueueCurrent = iQueueNext;
            oScrollerTimer = setTimeout(oComponent.run, oComponent.config.iInterval*1000)
        };
        var init = function () {
            dScroller = (typeof(dElement) == 'object')?dElement:document.getElementById(dElement);
            dQueues = (oComponent.config.sItemClassName) ? YUD.getElementsByClassName(oComponent.config.sItemClassName,'*',dScroller):dScroller.getElementsByTagName('li');
            YUD.setStyle(dQueues,'display','none');
            for(var i=0;i<2;i++){
                dShows[i] = document.createElement(dQueues[0].nodeName.toLowerCase());
                dScroller.appendChild(dShows[i]);
                YUD.setStyle(dShows[i],'position','absolute');
            };
            dShows[0].innerHTML = dQueues[0].innerHTML;
            YUD.setStyle(dShows[1],'display','none');
            oMotion1 = new YAHOO.util.Motion(dShows[0],{},oComponent.config.iDuration,oComponent.config.oEasingMethod);
            oMotion2 = new YAHOO.util.Motion(dShows[1],{},oComponent.config.iDuration,oComponent.config.oEasingMethod);
            oScrollerTimer = setTimeout(oComponent.run, oComponent.config.iInterval*1000);
            oMotion1.onComplete.subscribe(onMotionComplete);
            YUE.on(dScroller,'mouseover',function() {
                clearTimeout(oScrollerTimer);
                oScrollerTimer = null;
            });
            YUE.on(dScroller,'mouseout',function() {
                if (!oScrollerTimer) {
                    oScrollerTimer = setTimeout(oComponent.run, oComponent.config.iInterval*1000)
                };
            });
        };
        init();
    }
    YAHOO.util.NewsRotator = NewsRotator;
})();

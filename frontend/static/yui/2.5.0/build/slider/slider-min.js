/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.0
*/
YAHOO.widget.Slider=function(C,A,B,D){YAHOO.widget.Slider.ANIM_AVAIL=(!YAHOO.lang.isUndefined(YAHOO.util.Anim));if(C){this.init(C,A,true);this.initSlider(D);this.initThumb(B);}};YAHOO.widget.Slider.getHorizSlider=function(B,C,E,D,A){return new YAHOO.widget.Slider(B,B,new YAHOO.widget.SliderThumb(C,B,E,D,0,0,A),"horiz");};YAHOO.widget.Slider.getVertSlider=function(C,D,A,E,B){return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,0,0,A,E,B),"vert");};YAHOO.widget.Slider.getSliderRegion=function(C,D,F,E,A,G,B){return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,F,E,A,G,B),"region");};YAHOO.widget.Slider.ANIM_AVAIL=false;YAHOO.extend(YAHOO.widget.Slider,YAHOO.util.DragDrop,{dragOnly:true,initSlider:function(A){this.type=A;this.createEvent("change",this);this.createEvent("slideStart",this);this.createEvent("slideEnd",this);this.isTarget=false;this.animate=YAHOO.widget.Slider.ANIM_AVAIL;this.backgroundEnabled=true;this.tickPause=40;this.enableKeys=true;this.keyIncrement=20;this.moveComplete=true;this.animationDuration=0.2;this.SOURCE_UI_EVENT=1;this.SOURCE_SET_VALUE=2;this.valueChangeSource=0;this._silent=false;this.lastOffset=[0,0];},initThumb:function(B){var A=this;this.thumb=B;B.cacheBetweenDrags=true;if(B._isHoriz&&B.xTicks&&B.xTicks.length){this.tickPause=Math.round(360/B.xTicks.length);}else{if(B.yTicks&&B.yTicks.length){this.tickPause=Math.round(360/B.yTicks.length);}}B.onAvailable=function(){return A.setStartSliderState();};B.onMouseDown=function(){return A.focus();};B.startDrag=function(){A._slideStart();};B.onDrag=function(){A.fireEvents(true);};B.onMouseUp=function(){A.thumbMouseUp();};},onAvailable:function(){var A=YAHOO.util.Event;A.on(this.id,"keydown",this.handleKeyDown,this,true);A.on(this.id,"keypress",this.handleKeyPress,this,true);},handleKeyPress:function(C){if(this.enableKeys){var A=YAHOO.util.Event;var B=A.getCharCode(C);switch(B){case 37:case 38:case 39:case 40:case 36:case 35:A.preventDefault(C);break;default:}}},handleKeyDown:function(E){if(this.enableKeys){var G=YAHOO.util.Event;var C=G.getCharCode(E),I=this.thumb;var B=this.getXValue(),F=this.getYValue();var H=false;var D=true;switch(C){case 37:B-=this.keyIncrement;break;case 38:F-=this.keyIncrement;break;case 39:B+=this.keyIncrement;break;case 40:F+=this.keyIncrement;break;case 36:B=I.leftConstraint;F=I.topConstraint;break;case 35:B=I.rightConstraint;F=I.bottomConstraint;break;default:D=false;}if(D){if(I._isRegion){this.setRegionValue(B,F,true);}else{var A=(I._isHoriz)?B:F;this.setValue(A,true);}G.stopEvent(E);}}},setStartSliderState:function(){this.setThumbCenterPoint();this.baselinePos=YAHOO.util.Dom.getXY(this.getEl());this.thumb.startOffset=this.thumb.getOffsetFromParent(this.baselinePos);if(this.thumb._isRegion){if(this.deferredSetRegionValue){this.setRegionValue.apply(this,this.deferredSetRegionValue,true);this.deferredSetRegionValue=null;}else{this.setRegionValue(0,0,true,true,true);}}else{if(this.deferredSetValue){this.setValue.apply(this,this.deferredSetValue,true);this.deferredSetValue=null;}else{this.setValue(0,true,true,true);}}},setThumbCenterPoint:function(){var A=this.thumb.getEl();if(A){this.thumbCenterPoint={x:parseInt(A.offsetWidth/2,10),y:parseInt(A.offsetHeight/2,10)};}},lock:function(){this.thumb.lock();this.locked=true;},unlock:function(){this.thumb.unlock();this.locked=false;},thumbMouseUp:function(){if(!this.isLocked()&&!this.moveComplete){this.endMove();}},onMouseUp:function(){if(!this.isLocked()&&!this.moveComplete){this.endMove();}},getThumb:function(){return this.thumb;},focus:function(){this.valueChangeSource=this.SOURCE_UI_EVENT;var A=this.getEl();if(A.focus){try{A.focus();}catch(B){}}this.verifyOffset();if(this.isLocked()){return false;}else{this._slideStart();return true;}},onChange:function(A,B){},onSlideStart:function(){},onSlideEnd:function(){},getValue:function(){return this.thumb.getValue();},getXValue:function(){return this.thumb.getXValue();},getYValue:function(){return this.thumb.getYValue();},handleThumbChange:function(){},setValue:function(G,C,D,A){this._silent=A;this.valueChangeSource=this.SOURCE_SET_VALUE;if(!this.thumb.available){this.deferredSetValue=arguments;return false;}if(this.isLocked()&&!D){return false;}if(isNaN(G)){return false;}var B=this.thumb;B.lastOffset=[G,G];var F,E;this.verifyOffset(true);if(B._isRegion){return false;}else{if(B._isHoriz){this._slideStart();F=B.initPageX+G+this.thumbCenterPoint.x;this.moveThumb(F,B.initPageY,C);}else{this._slideStart();E=B.initPageY+G+this.thumbCenterPoint.y;this.moveThumb(B.initPageX,E,C);}}return true;},setRegionValue:function(H,A,D,E,B){this._silent=B;this.valueChangeSource=this.SOURCE_SET_VALUE;if(!this.thumb.available){this.deferredSetRegionValue=arguments;return false;}if(this.isLocked()&&!E){return false;}if(isNaN(H)){return false;}var C=this.thumb;C.lastOffset=[H,A];this.verifyOffset(true);if(C._isRegion){this._slideStart();var G=C.initPageX+H+this.thumbCenterPoint.x;var F=C.initPageY+A+this.thumbCenterPoint.y;this.moveThumb(G,F,D);return true;}return false;},verifyOffset:function(B){var A=YAHOO.util.Dom.getXY(this.getEl());if(A){if(A[0]!=this.baselinePos[0]||A[1]!=this.baselinePos[1]){this.thumb.resetConstraints();this.baselinePos=A;return false;}}return true;},moveThumb:function(G,F,E,D){var H=this.thumb;var I=this;if(!H.available){return ;}H.setDelta(this.thumbCenterPoint.x,this.thumbCenterPoint.y);var B=H.getTargetCoord(G,F);var C=[B.x,B.y];this._slideStart();if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&H._graduated&&!E){this.lock();this.curCoord=YAHOO.util.Dom.getXY(this.thumb.getEl());setTimeout(function(){I.moveOneTick(C);},this.tickPause);}else{if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&!E){this.lock();var A=new YAHOO.util.Motion(H.id,{points:{to:C}},this.animationDuration,YAHOO.util.Easing.easeOut);A.onComplete.subscribe(function(){I.endMove();});A.animate();}else{H.setDragElPos(G,F);if(!D){this.endMove();}}}},_slideStart:function(){if(!this._sliding){if(!this._silent){this.onSlideStart();
this.fireEvent("slideStart");}this._sliding=true;}},_slideEnd:function(){if(this._sliding&&this.moveComplete){if(!this._silent){this.onSlideEnd();this.fireEvent("slideEnd");}this._sliding=false;this._silent=false;this.moveComplete=false;}},moveOneTick:function(B){var E=this.thumb,D;var F=null;if(E._isRegion){F=this._getNextX(this.curCoord,B);var A=(F)?F[0]:this.curCoord[0];F=this._getNextY([A,this.curCoord[1]],B);}else{if(E._isHoriz){F=this._getNextX(this.curCoord,B);}else{F=this._getNextY(this.curCoord,B);}}if(F){this.curCoord=F;this.thumb.alignElWithMouse(E.getEl(),F[0],F[1]);if(!(F[0]==B[0]&&F[1]==B[1])){var C=this;setTimeout(function(){C.moveOneTick(B);},this.tickPause);}else{this.endMove();}}else{this.endMove();}},_getNextX:function(A,B){var D=this.thumb;var F;var C=[];var E=null;if(A[0]>B[0]){F=D.tickSize-this.thumbCenterPoint.x;C=D.getTargetCoord(A[0]-F,A[1]);E=[C.x,C.y];}else{if(A[0]<B[0]){F=D.tickSize+this.thumbCenterPoint.x;C=D.getTargetCoord(A[0]+F,A[1]);E=[C.x,C.y];}else{}}return E;},_getNextY:function(A,B){var D=this.thumb;var F;var C=[];var E=null;if(A[1]>B[1]){F=D.tickSize-this.thumbCenterPoint.y;C=D.getTargetCoord(A[0],A[1]-F);E=[C.x,C.y];}else{if(A[1]<B[1]){F=D.tickSize+this.thumbCenterPoint.y;C=D.getTargetCoord(A[0],A[1]+F);E=[C.x,C.y];}else{}}return E;},b4MouseDown:function(A){this.thumb.autoOffset();this.thumb.resetConstraints();},onMouseDown:function(B){if(!this.isLocked()&&this.backgroundEnabled){var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.focus();this.moveThumb(A,C);}},onDrag:function(B){if(!this.isLocked()){var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.moveThumb(A,C,true,true);this.fireEvents();}},endMove:function(){this.unlock();this.moveComplete=true;this.fireEvents();},fireEvents:function(C){var B=this.thumb;if(!C){B.cachePosition();}if(!this.isLocked()){if(B._isRegion){var E=B.getXValue();var D=B.getYValue();if(E!=this.previousX||D!=this.previousY){if(!this._silent){this.onChange(E,D);this.fireEvent("change",{x:E,y:D});}}this.previousX=E;this.previousY=D;}else{var A=B.getValue();if(A!=this.previousVal){if(!this._silent){this.onChange(A);this.fireEvent("change",A);}}this.previousVal=A;}this._slideEnd();}},toString:function(){return("Slider ("+this.type+") "+this.id);}});YAHOO.augment(YAHOO.widget.Slider,YAHOO.util.EventProvider);YAHOO.widget.SliderThumb=function(G,B,E,D,A,F,C){if(G){YAHOO.widget.SliderThumb.superclass.constructor.call(this,G,B);this.parentElId=B;}this.isTarget=false;this.tickSize=C;this.maintainOffset=true;this.initSlider(E,D,A,F,C);this.scroll=false;};YAHOO.extend(YAHOO.widget.SliderThumb,YAHOO.util.DD,{startOffset:null,dragOnly:true,_isHoriz:false,_prevVal:0,_graduated:false,getOffsetFromParent0:function(C){var A=YAHOO.util.Dom.getXY(this.getEl());var B=C||YAHOO.util.Dom.getXY(this.parentElId);return[(A[0]-B[0]),(A[1]-B[1])];},getOffsetFromParent:function(H){var A=this.getEl(),E;if(!this.deltaOffset){var I=YAHOO.util.Dom.getXY(A);var F=H||YAHOO.util.Dom.getXY(this.parentElId);E=[(I[0]-F[0]),(I[1]-F[1])];var B=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);var K=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);var D=B-E[0];var C=K-E[1];if(isNaN(D)||isNaN(C)){}else{this.deltaOffset=[D,C];}}else{var J=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);var G=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);E=[J+this.deltaOffset[0],G+this.deltaOffset[1]];}return E;},initSlider:function(D,C,A,E,B){this.initLeft=D;this.initRight=C;this.initUp=A;this.initDown=E;this.setXConstraint(D,C,B);this.setYConstraint(A,E,B);if(B&&B>1){this._graduated=true;}this._isHoriz=(D||C);this._isVert=(A||E);this._isRegion=(this._isHoriz&&this._isVert);},clearTicks:function(){YAHOO.widget.SliderThumb.superclass.clearTicks.call(this);this.tickSize=0;this._graduated=false;},getValue:function(){return(this._isHoriz)?this.getXValue():this.getYValue();},getXValue:function(){if(!this.available){return 0;}var A=this.getOffsetFromParent();if(YAHOO.lang.isNumber(A[0])){this.lastOffset=A;return(A[0]-this.startOffset[0]);}else{return(this.lastOffset[0]-this.startOffset[0]);}},getYValue:function(){if(!this.available){return 0;}var A=this.getOffsetFromParent();if(YAHOO.lang.isNumber(A[1])){this.lastOffset=A;return(A[1]-this.startOffset[1]);}else{return(this.lastOffset[1]-this.startOffset[1]);}},toString:function(){return"SliderThumb "+this.id;},onChange:function(A,B){}});YAHOO.widget.DualSlider=function(E,B,D,A){var C=this,G=YAHOO.lang;this.minSlider=E;this.maxSlider=B;this.activeSlider=E;this.isHoriz=E.thumb._isHoriz;A=YAHOO.lang.isArray(A)?A:[0,D];A[0]=Math.min(Math.max(parseInt(A[0],10)|0,0),D);A[1]=Math.max(Math.min(parseInt(A[1],10)|0,D),0);if(A[0]>A[1]){A.splice(0,2,A[1],A[0]);}var F={min:false,max:false};this.minSlider.thumb.onAvailable=function(){E.setStartSliderState();F.min=true;if(F.max){E.setValue(A[0],true,true,true);B.setValue(A[1],true,true,true);C.updateValue(true);C.fireEvent("ready",C);}};this.maxSlider.thumb.onAvailable=function(){B.setStartSliderState();F.max=true;if(F.min){E.setValue(A[0],true,true,true);B.setValue(A[1],true,true,true);C.updateValue(true);C.fireEvent("ready",C);}};E.onMouseDown=function(H){C._handleMouseDown(H);};B.onMouseDown=function(H){YAHOO.util.Event.stopEvent(H);};E.onDrag=B.onDrag=function(H){C._handleDrag(H);};E.subscribe("change",this._handleMinChange,E,this);E.subscribe("slideStart",this._handleSlideStart,E,this);E.subscribe("slideEnd",this._handleSlideEnd,E,this);B.subscribe("change",this._handleMaxChange,B,this);B.subscribe("slideStart",this._handleSlideStart,B,this);B.subscribe("slideEnd",this._handleSlideEnd,B,this);this.createEvent("ready",this);this.createEvent("change",this);this.createEvent("slideStart",this);this.createEvent("slideEnd",this);};YAHOO.widget.DualSlider.prototype={minVal:-1,maxVal:-1,minRange:0,_handleSlideStart:function(B,A){this.fireEvent("slideStart",A);},_handleSlideEnd:function(B,A){this.fireEvent("slideEnd",A);},_handleDrag:function(A){YAHOO.widget.Slider.prototype.onDrag.call(this.activeSlider,A);
},_handleMinChange:function(){this.activeSlider=this.minSlider;this.updateValue();},_handleMaxChange:function(){this.activeSlider=this.maxSlider;this.updateValue();},setValues:function(E,H,F,B,G){var C=this.minSlider,J=this.maxSlider,A=C.thumb,I=J.thumb,K=this,D={min:false,max:false};if(A._isHoriz){A.setXConstraint(A.leftConstraint,I.rightConstraint,A.tickSize);I.setXConstraint(A.leftConstraint,I.rightConstraint,I.tickSize);}else{A.setYConstraint(A.topConstraint,I.bottomConstraint,A.tickSize);I.setYConstraint(A.topConstraint,I.bottomConstraint,I.tickSize);}this._oneTimeCallback(C,"slideEnd",function(){D.min=true;if(D.max){K.updateValue(G);setTimeout(function(){K._cleanEvent(C,"slideEnd");K._cleanEvent(J,"slideEnd");},0);}});this._oneTimeCallback(J,"slideEnd",function(){D.max=true;if(D.min){K.updateValue(G);setTimeout(function(){K._cleanEvent(C,"slideEnd");K._cleanEvent(J,"slideEnd");},0);}});C.setValue(E,F,B,G);J.setValue(H,F,B,G);},setMinValue:function(C,E,F,B){var D=this.minSlider;this.activeSlider=D;var A=this;this._oneTimeCallback(D,"slideEnd",function(){A.updateValue(B);setTimeout(function(){A._cleanEvent(D,"slideEnd");},0);});D.setValue(C,E,F,B);},setMaxValue:function(A,E,F,C){var D=this.maxSlider;this.activeSlider=D;var B=this;this._oneTimeCallback(D,"slideEnd",function(){B.updateValue(C);setTimeout(function(){B._cleanEvent(D,"slideEnd");},0);});D.setValue(A,E,F,C);},updateValue:function(F){var B=this.minSlider.getValue(),G=this.maxSlider.getValue(),C=false;if(B!=this.minVal||G!=this.maxVal){C=true;var A=this.minSlider.thumb;var I=this.maxSlider.thumb;var D=this.minSlider.thumbCenterPoint.x+this.maxSlider.thumbCenterPoint.x;var E=Math.max(G-D-this.minRange,0);var H=Math.min(-B-D-this.minRange,0);if(this.isHoriz){A.setXConstraint(A.leftConstraint,E,A.tickSize);I.setXConstraint(H,I.rightConstraint,I.tickSize);}else{A.setYConstraint(A.leftConstraint,E,A.tickSize);I.setYConstraint(H,I.bottomConstraint,I.tickSize);}if(B>G){this.minSlider.setValue(G);}if(G<B){this.maxSlider.setValue(B);}}this.minVal=B;this.maxVal=G;if(C&&!F){this.fireEvent("change",this);}},selectActiveSlider:function(C){var B=this.minSlider.getValue(),A=this.maxSlider.getValue(),D;if(this.isHoriz){D=YAHOO.util.Event.getPageX(C)-this.minSlider.initPageX-this.minSlider.thumbCenterPoint.x;}else{D=YAHOO.util.Event.getPageY(C)-this.minSlider.initPageY-this.minSlider.thumbCenterPoint.y;}if(D<B){this.activeSlider=this.minSlider;}else{if(D>A){this.activeSlider=this.maxSlider;}else{this.activeSlider=D*2>A+B?this.maxSlider:this.minSlider;}}},_handleMouseDown:function(A){this.selectActiveSlider(A);YAHOO.widget.Slider.prototype.onMouseDown.call(this.activeSlider,A);},_oneTimeCallback:function(C,A,B){C.subscribe(A,function(){C.unsubscribe(A,arguments.callee);B.apply({},[].slice.apply(arguments));});},_cleanEvent:function(H,B){if(H.__yui_events&&H.events[B]){var G,F,A;for(F=H.__yui_events.length;F>=0;--F){if(H.__yui_events[F].type===B){G=H.__yui_events[F];break;}}if(G){var E=G.subscribers,C=[],D=0;for(F=0,A=E.length;F<A;++F){if(E[F]){C[D++]=E[F];}}G.subscribers=C;}}}};YAHOO.augment(YAHOO.widget.DualSlider,YAHOO.util.EventProvider);YAHOO.widget.Slider.getHorizDualSlider=function(F,C,K,G,H,B){var A,J;var D=YAHOO.widget,E=D.Slider,I=D.SliderThumb;A=new I(C,F,0,G,0,0,H);J=new I(K,F,0,G,0,0,H);return new D.DualSlider(new E(F,F,A,"horiz"),new E(F,F,J,"horiz"),G,B);};YAHOO.widget.Slider.getVertDualSlider=function(F,C,K,G,H,B){var A,J;var D=YAHOO.widget,E=D.Slider,I=D.SliderThumb;A=new I(C,F,0,0,0,G,H);J=new I(K,F,0,0,0,G,H);return new D.DualSlider(new E(F,F,A,"vert"),new E(F,F,J,"vert"),G,B);};YAHOO.register("slider",YAHOO.widget.Slider,{version:"2.5.0",build:"862"});
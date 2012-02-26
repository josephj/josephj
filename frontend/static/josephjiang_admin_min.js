/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=A[C].split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules;if(!I[A]){I[A]={versions:[],builds:[]};}var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(var C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};var B=navigator.userAgent,A;if((/KHTML/).test(B)){C.webkit=1;}A=B.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){C.webkit=parseFloat(A[1]);if(/ Mobile\//.test(B)){C.mobile="Apple";}else{A=B.match(/NokiaN[^\/]*/);if(A){C.mobile=A[0];}}A=B.match(/AdobeAIR\/([^\s]*)/);if(A){C.air=A[0];}}if(!C.webkit){A=B.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){C.opera=parseFloat(A[1]);A=B.match(/Opera Mini[^;]*/);if(A){C.mobile=A[0];}}else{A=B.match(/MSIE\s([^;]*)/);if(A&&A[1]){C.ie=parseFloat(A[1]);}else{A=B.match(/Gecko\/([^\s]*)/);if(A){C.gecko=1;A=B.match(/rv:([^\s\)]*)/);if(A&&A[1]){C.gecko=parseFloat(A[1]);}}}}}return C;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C=C+1){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{isArray:function(B){if(B){var A=YAHOO.lang;return A.isNumber(B.length)&&A.isFunction(B.splice);}return false;},isBoolean:function(A){return typeof A==="boolean";},isFunction:function(A){return typeof A==="function";},isNull:function(A){return A===null;},isNumber:function(A){return typeof A==="number"&&isFinite(A);},isObject:function(A){return(A&&(typeof A==="object"||YAHOO.lang.isFunction(A)))||false;},isString:function(A){return typeof A==="string";},isUndefined:function(A){return typeof A==="undefined";},hasOwnProperty:function(A,B){if(Object.prototype.hasOwnProperty){return A.hasOwnProperty(B);}return !YAHOO.lang.isUndefined(A[B])&&A.constructor.prototype[B]!==A[B];},_IEEnumFix:function(C,B){if(YAHOO.env.ua.ie){var E=["toString","valueOf"],A;for(A=0;A<E.length;A=A+1){var F=E[A],D=B[F];if(YAHOO.lang.isFunction(D)&&D!=Object.prototype[F]){C[F]=D;}}}},extend:function(D,E,C){if(!E||!D){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.");}var B=function(){};B.prototype=E.prototype;D.prototype=new B();D.prototype.constructor=D;D.superclass=E.prototype;if(E.prototype.constructor==Object.prototype.constructor){E.prototype.constructor=E;}if(C){for(var A in C){D.prototype[A]=C[A];}YAHOO.lang._IEEnumFix(D.prototype,C);}},augmentObject:function(E,D){if(!D||!E){throw new Error("Absorb failed, verify dependencies.");}var A=arguments,C,F,B=A[2];if(B&&B!==true){for(C=2;C<A.length;C=C+1){E[A[C]]=D[A[C]];}}else{for(F in D){if(B||!E[F]){E[F]=D[F];}}YAHOO.lang._IEEnumFix(E,D);}},augmentProto:function(D,C){if(!C||!D){throw new Error("Augment failed, verify dependencies.");}var A=[D.prototype,C.prototype];for(var B=2;B<arguments.length;B=B+1){A.push(arguments[B]);}YAHOO.lang.augmentObject.apply(this,A);},dump:function(A,G){var C=YAHOO.lang,D,F,I=[],J="{...}",B="f(){...}",H=", ",E=" => ";if(!C.isObject(A)){return A+"";}else{if(A instanceof Date||("nodeType" in A&&"tagName" in A)){return A;}else{if(C.isFunction(A)){return B;}}}G=(C.isNumber(G))?G:3;if(C.isArray(A)){I.push("[");for(D=0,F=A.length;D<F;D=D+1){if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}if(I.length>1){I.pop();}I.push("]");}else{I.push("{");for(D in A){if(C.hasOwnProperty(A,D)){I.push(D+E);if(C.isObject(A[D])){I.push((G>0)?C.dump(A[D],G-1):J);}else{I.push(A[D]);}I.push(H);}}if(I.length>1){I.pop();}I.push("}");}return I.join("");},substitute:function(Q,B,J){var G,F,E,M,N,P,D=YAHOO.lang,L=[],C,H="dump",K=" ",A="{",O="}";for(;;){G=Q.lastIndexOf(A);if(G<0){break;}F=Q.indexOf(O,G);if(G+1>=F){break;}C=Q.substring(G+1,F);M=C;P=null;E=M.indexOf(K);if(E>-1){P=M.substring(E+1);M=M.substring(0,E);}N=B[M];if(J){N=J(M,N,P);}if(D.isObject(N)){if(D.isArray(N)){N=D.dump(N,parseInt(P,10));}else{P=P||"";var I=P.indexOf(H);if(I>-1){P=P.substring(4);}if(N.toString===Object.prototype.toString||I>-1){N=D.dump(N,parseInt(P,10));}else{N=N.toString();}}}else{if(!D.isString(N)&&!D.isNumber(N)){N="~-"+L.length+"-~";L[L.length]=C;}}Q=Q.substring(0,G)+N+Q.substring(F+1);}for(G=L.length-1;G>=0;G=G-1){Q=Q.replace(new RegExp("~-"+G+"-~"),"{"+L[G]+"}","g");}return Q;},trim:function(A){try{return A.replace(/^\s+|\s+$/g,"");}catch(B){return A;}},merge:function(){var D={},B=arguments;for(var C=0,A=B.length;C<A;C=C+1){YAHOO.lang.augmentObject(D,B[C],true);}return D;},later:function(H,B,I,D,E){H=H||0;B=B||{};var C=I,G=D,F,A;if(YAHOO.lang.isString(I)){C=B[I];}if(!C){throw new TypeError("method undefined");}if(!YAHOO.lang.isArray(G)){G=[D];}F=function(){C.apply(B,G);};A=(E)?setInterval(F,H):setTimeout(F,H);return{interval:E,cancel:function(){if(this.interval){clearInterval(A);}else{clearTimeout(A);}}};},isValue:function(B){var A=YAHOO.lang;return(A.isObject(B)||A.isString(B)||A.isNumber(B)||A.isBoolean(B));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.5.1",build:"984"});(function(){var B=YAHOO.util,K,I,J={},F={},M=window.document;YAHOO.env._id_counter=YAHOO.env._id_counter||0;var C=YAHOO.env.ua.opera,L=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,G=YAHOO.env.ua.ie;var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};var N=function(P){if(!E.HYPHEN.test(P)){return P;}if(J[P]){return J[P];}var Q=P;while(E.HYPHEN.exec(Q)){Q=Q.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}J[P]=Q;return Q;};var O=function(Q){var P=F[Q];if(!P){P=new RegExp("(?:^|\\s+)"+Q+"(?:\\s+|$)");F[Q]=P;}return P;};if(M.defaultView&&M.defaultView.getComputedStyle){K=function(P,S){var R=null;if(S=="float"){S="cssFloat";}var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){R=Q[N(S)];}return P.style[S]||R;};}else{if(M.documentElement.currentStyle&&G){K=function(P,R){switch(N(R)){case"opacity":var T=100;try{T=P.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(S){try{T=P.filters("alpha").opacity;}catch(S){}}return T/100;case"float":R="styleFloat";default:var Q=P.currentStyle?P.currentStyle[R]:null;return(P.style[R]||Q);}};}else{K=function(P,Q){return P.style[Q];};}}if(G){I=function(P,Q,R){switch(Q){case"opacity":if(YAHOO.lang.isString(P.style.filter)){P.style.filter="alpha(opacity="+R*100+")";if(!P.currentStyle||!P.currentStyle.hasLayout){P.style.zoom=1;}}break;case"float":Q="styleFloat";default:P.style[Q]=R;}};}else{I=function(P,Q,R){if(Q=="float"){Q="cssFloat";}P.style[Q]=R;};}var D=function(P,Q){return P&&P.nodeType==1&&(!Q||Q(P));};YAHOO.util.Dom={get:function(R){if(R&&(R.nodeType||R.item)){return R;}if(YAHOO.lang.isString(R)||!R){return M.getElementById(R);}if(R.length!==undefined){var S=[];for(var Q=0,P=R.length;Q<P;++Q){S[S.length]=B.Dom.get(R[Q]);}return S;}return R;},getStyle:function(P,R){R=N(R);var Q=function(S){return K(S,R);};return B.Dom.batch(P,Q,B.Dom,true);},setStyle:function(P,R,S){R=N(R);var Q=function(T){I(T,R,S);};B.Dom.batch(P,Q,B.Dom,true);},getXY:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}return H(R);};return B.Dom.batch(P,Q,B.Dom,true);},getX:function(P){var Q=function(R){return B.Dom.getXY(R)[0];};return B.Dom.batch(P,Q,B.Dom,true);},getY:function(P){var Q=function(R){return B.Dom.getXY(R)[1];};return B.Dom.batch(P,Q,B.Dom,true);},setXY:function(P,S,R){var Q=function(V){var U=this.getStyle(V,"position");if(U=="static"){this.setStyle(V,"position","relative");U="relative";}var X=this.getXY(V);if(X===false){return false;}var W=[parseInt(this.getStyle(V,"left"),10),parseInt(this.getStyle(V,"top"),10)];if(isNaN(W[0])){W[0]=(U=="relative")?0:V.offsetLeft;}if(isNaN(W[1])){W[1]=(U=="relative")?0:V.offsetTop;}if(S[0]!==null){V.style.left=S[0]-X[0]+W[0]+"px";}if(S[1]!==null){V.style.top=S[1]-X[1]+W[1]+"px";}if(!R){var T=this.getXY(V);if((S[0]!==null&&T[0]!=S[0])||(S[1]!==null&&T[1]!=S[1])){this.setXY(V,S,true);}}};B.Dom.batch(P,Q,B.Dom,true);},setX:function(Q,P){B.Dom.setXY(Q,[P,null]);},setY:function(P,Q){B.Dom.setXY(P,[null,Q]);},getRegion:function(P){var Q=function(R){if((R.parentNode===null||R.offsetParent===null||this.getStyle(R,"display")=="none")&&R!=R.ownerDocument.body){return false;}var S=B.Region.getRegion(R);return S;};return B.Dom.batch(P,Q,B.Dom,true);},getClientWidth:function(){return B.Dom.getViewportWidth();},getClientHeight:function(){return B.Dom.getViewportHeight();},getElementsByClassName:function(T,X,U,V){X=X||"*";U=(U)?B.Dom.get(U):null||M;if(!U){return[];}var Q=[],P=U.getElementsByTagName(X),W=O(T);for(var R=0,S=P.length;R<S;++R){if(W.test(P[R].className)){Q[Q.length]=P[R];if(V){V.call(P[R],P[R]);}}}return Q;},hasClass:function(R,Q){var P=O(Q);var S=function(T){return P.test(T.className);};return B.Dom.batch(R,S,B.Dom,true);},addClass:function(Q,P){var R=function(S){if(this.hasClass(S,P)){return false;}S.className=YAHOO.lang.trim([S.className,P].join(" "));return true;};return B.Dom.batch(Q,R,B.Dom,true);},removeClass:function(R,Q){var P=O(Q);var S=function(T){if(!Q||!this.hasClass(T,Q)){return false;}var U=T.className;T.className=U.replace(P," ");if(this.hasClass(T,Q)){this.removeClass(T,Q);}T.className=YAHOO.lang.trim(T.className);return true;};return B.Dom.batch(R,S,B.Dom,true);},replaceClass:function(S,Q,P){if(!P||Q===P){return false;}var R=O(Q);var T=function(U){if(!this.hasClass(U,Q)){this.addClass(U,P);return true;}U.className=U.className.replace(R," "+P+" ");if(this.hasClass(U,Q)){this.replaceClass(U,Q,P);}U.className=YAHOO.lang.trim(U.className);return true;};return B.Dom.batch(S,T,B.Dom,true);},generateId:function(P,R){R=R||"yui-gen";var Q=function(S){if(S&&S.id){return S.id;}var T=R+YAHOO.env._id_counter++;if(S){S.id=T;}return T;};return B.Dom.batch(P,Q,B.Dom,true)||Q.apply(B.Dom,arguments);},isAncestor:function(P,Q){P=B.Dom.get(P);Q=B.Dom.get(Q);if(!P||!Q){return false;}if(P.contains&&Q.nodeType&&!L){return P.contains(Q);}else{if(P.compareDocumentPosition&&Q.nodeType){return !!(P.compareDocumentPosition(Q)&16);}else{if(Q.nodeType){return !!this.getAncestorBy(Q,function(R){return R==P;});}}}return false;},inDocument:function(P){return this.isAncestor(M.documentElement,P);},getElementsBy:function(W,Q,R,T){Q=Q||"*";R=(R)?B.Dom.get(R):null||M;if(!R){return[];}var S=[],V=R.getElementsByTagName(Q);for(var U=0,P=V.length;U<P;++U){if(W(V[U])){S[S.length]=V[U];if(T){T(V[U]);}}}return S;},batch:function(T,W,V,R){T=(T&&(T.tagName||T.item))?T:B.Dom.get(T);if(!T||!W){return false;}var S=(R)?V:window;if(T.tagName||T.length===undefined){return W.call(S,T,V);}var U=[];for(var Q=0,P=T.length;Q<P;++Q){U[U.length]=W.call(S,T[Q],V);}return U;},getDocumentHeight:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollHeight:M.documentElement.scrollHeight;var P=Math.max(Q,B.Dom.getViewportHeight());return P;},getDocumentWidth:function(){var Q=(M.compatMode!="CSS1Compat")?M.body.scrollWidth:M.documentElement.scrollWidth;var P=Math.max(Q,B.Dom.getViewportWidth());return P;},getViewportHeight:function(){var P=self.innerHeight;
var Q=M.compatMode;if((Q||G)&&!C){P=(Q=="CSS1Compat")?M.documentElement.clientHeight:M.body.clientHeight;}return P;},getViewportWidth:function(){var P=self.innerWidth;var Q=M.compatMode;if(Q||G){P=(Q=="CSS1Compat")?M.documentElement.clientWidth:M.body.clientWidth;}return P;},getAncestorBy:function(P,Q){while(P=P.parentNode){if(D(P,Q)){return P;}}return null;},getAncestorByClassName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return B.Dom.hasClass(S,P);};return B.Dom.getAncestorBy(Q,R);},getAncestorByTagName:function(Q,P){Q=B.Dom.get(Q);if(!Q){return null;}var R=function(S){return S.tagName&&S.tagName.toUpperCase()==P.toUpperCase();};return B.Dom.getAncestorBy(Q,R);},getPreviousSiblingBy:function(P,Q){while(P){P=P.previousSibling;if(D(P,Q)){return P;}}return null;},getPreviousSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getPreviousSiblingBy(P);},getNextSiblingBy:function(P,Q){while(P){P=P.nextSibling;if(D(P,Q)){return P;}}return null;},getNextSibling:function(P){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getNextSiblingBy(P);},getFirstChildBy:function(P,R){var Q=(D(P.firstChild,R))?P.firstChild:null;return Q||B.Dom.getNextSiblingBy(P.firstChild,R);},getFirstChild:function(P,Q){P=B.Dom.get(P);if(!P){return null;}return B.Dom.getFirstChildBy(P);},getLastChildBy:function(P,R){if(!P){return null;}var Q=(D(P.lastChild,R))?P.lastChild:null;return Q||B.Dom.getPreviousSiblingBy(P.lastChild,R);},getLastChild:function(P){P=B.Dom.get(P);return B.Dom.getLastChildBy(P);},getChildrenBy:function(Q,S){var R=B.Dom.getFirstChildBy(Q,S);var P=R?[R]:[];B.Dom.getNextSiblingBy(R,function(T){if(!S||S(T)){P[P.length]=T;}return false;});return P;},getChildren:function(P){P=B.Dom.get(P);if(!P){}return B.Dom.getChildrenBy(P);},getDocumentScrollLeft:function(P){P=P||M;return Math.max(P.documentElement.scrollLeft,P.body.scrollLeft);},getDocumentScrollTop:function(P){P=P||M;return Math.max(P.documentElement.scrollTop,P.body.scrollTop);},insertBefore:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}return P.parentNode.insertBefore(Q,P);},insertAfter:function(Q,P){Q=B.Dom.get(Q);P=B.Dom.get(P);if(!Q||!P||!P.parentNode){return null;}if(P.nextSibling){return P.parentNode.insertBefore(Q,P.nextSibling);}else{return P.parentNode.appendChild(Q);}},getClientRegion:function(){var R=B.Dom.getDocumentScrollTop(),Q=B.Dom.getDocumentScrollLeft(),S=B.Dom.getViewportWidth()+Q,P=B.Dom.getViewportHeight()+R;return new B.Region(R,S,P,Q);}};var H=function(){if(M.documentElement.getBoundingClientRect){return function(Q){var R=Q.getBoundingClientRect();var P=Q.ownerDocument;return[R.left+B.Dom.getDocumentScrollLeft(P),R.top+B.Dom.getDocumentScrollTop(P)];};}else{return function(R){var S=[R.offsetLeft,R.offsetTop];var Q=R.offsetParent;var P=(L&&B.Dom.getStyle(R,"position")=="absolute"&&R.offsetParent==R.ownerDocument.body);if(Q!=R){while(Q){S[0]+=Q.offsetLeft;S[1]+=Q.offsetTop;if(!P&&L&&B.Dom.getStyle(Q,"position")=="absolute"){P=true;}Q=Q.offsetParent;}}if(P){S[0]-=R.ownerDocument.body.offsetLeft;S[1]-=R.ownerDocument.body.offsetTop;}Q=R.parentNode;while(Q.tagName&&!E.ROOT_TAG.test(Q.tagName)){if(Q.scrollTop||Q.scrollLeft){if(!E.OP_SCROLL.test(B.Dom.getStyle(Q,"display"))){if(!C||B.Dom.getStyle(Q,"overflow")!=="visible"){S[0]-=Q.scrollLeft;S[1]-=Q.scrollTop;}}}Q=Q.parentNode;}return S;};}}();})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this[0]=B;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top);var D=Math.min(this.right,E.right);var A=Math.min(this.bottom,E.bottom);var B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top);var D=Math.max(this.right,E.right);var A=Math.max(this.bottom,E.bottom);var B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D);var C=F[1];var E=F[0]+D.offsetWidth;var A=F[1]+D.offsetHeight;var B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}this.x=this.right=this.left=this[0]=A;this.y=this.top=this.bottom=this[1]=B;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.5.1",build:"984"});YAHOO.util.CustomEvent=function(D,B,C,A){this.type=D;this.scope=B||window;this.silent=C;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var E="_YUICEOnSubscribe";if(D!==E){this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,A);}this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){var D=this.subscribers.length;if(!D&&this.silent){return true;}var H=[].slice.call(arguments,0),F=true,C,I=false;if(!this.silent){}var B=this.subscribers.slice();for(C=0;C<D;++C){var K=B[C];if(!K){I=true;}else{if(!this.silent){}var J=K.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var A=null;if(H.length>0){A=H[0];}try{F=K.fn.call(J,A,K.obj);}catch(E){this.lastError=E;}}else{try{F=K.fn.call(J,this.type,H,K.obj);}catch(G){this.lastError=G;}}if(false===F){if(!this.silent){}return false;}}}return true;},unsubscribeAll:function(){for(var A=this.subscribers.length-1;A>-1;A--){this._delete(A);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(B,C,A){this.fn=B;this.obj=YAHOO.lang.isUndefined(C)?null:C;this.override=A;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var H=false;var I=[];var J=[];var G=[];var E=[];var C=0;var F=[];var B=[];var A=0;var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};return{POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,startInterval:function(){if(!this._interval){var K=this;var L=function(){K._tryPreloadAttach();};this._interval=setInterval(L,this.POLL_INTERVAL);}},onAvailable:function(P,M,Q,O,N){var K=(YAHOO.lang.isString(P))?[P]:P;for(var L=0;L<K.length;L=L+1){F.push({id:K[L],fn:M,obj:Q,override:O,checkReady:N});}C=this.POLL_RETRYS;this.startInterval();},onContentReady:function(M,K,N,L){this.onAvailable(M,K,N,L,true);},onDOMReady:function(K,M,L){if(this.DOMReady){setTimeout(function(){var N=window;if(L){if(L===true){N=M;}else{N=L;}}K.call(N,"DOMReady",[],M);},0);}else{this.DOMReadyEvent.subscribe(K,M,L);}},addListener:function(M,K,V,Q,L){if(!V||!V.call){return false;}if(this._isValidCollection(M)){var W=true;for(var R=0,T=M.length;R<T;++R){W=this.on(M[R],K,V,Q,L)&&W;}return W;}else{if(YAHOO.lang.isString(M)){var P=this.getEl(M);if(P){M=P;}else{this.onAvailable(M,function(){YAHOO.util.Event.on(M,K,V,Q,L);});return true;}}}if(!M){return false;}if("unload"==K&&Q!==this){J[J.length]=[M,K,V,Q,L];return true;}var Y=M;if(L){if(L===true){Y=Q;}else{Y=L;}}var N=function(Z){return V.call(Y,YAHOO.util.Event.getEvent(Z,M),Q);};var X=[M,K,V,N,Y,Q,L];var S=I.length;I[S]=X;if(this.useLegacyEvent(M,K)){var O=this.getLegacyIndex(M,K);if(O==-1||M!=G[O][0]){O=G.length;B[M.id+K]=O;G[O]=[M,K,M["on"+K]];E[O]=[];M["on"+K]=function(Z){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(Z),O);};}E[O].push(X);}else{try{this._simpleAdd(M,K,N,false);}catch(U){this.lastError=U;this.removeListener(M,K,V);return false;}}return true;},fireLegacyEvent:function(O,M){var Q=true,K,S,R,T,P;S=E[M].slice();for(var L=0,N=S.length;L<N;++L){R=S[L];if(R&&R[this.WFN]){T=R[this.ADJ_SCOPE];P=R[this.WFN].call(T,O);Q=(Q&&P);}}K=G[M];if(K&&K[2]){K[2](O);}return Q;},getLegacyIndex:function(L,M){var K=this.generateId(L)+M;if(typeof B[K]=="undefined"){return -1;}else{return B[K];}},useLegacyEvent:function(L,M){if(this.webkit&&("click"==M||"dblclick"==M)){var K=parseInt(this.webkit,10);if(!isNaN(K)&&K<418){return true;}}return false;},removeListener:function(L,K,T){var O,R,V;if(typeof L=="string"){L=this.getEl(L);}else{if(this._isValidCollection(L)){var U=true;for(O=L.length-1;O>-1;O--){U=(this.removeListener(L[O],K,T)&&U);}return U;}}if(!T||!T.call){return this.purgeElement(L,false,K);}if("unload"==K){for(O=J.length-1;O>-1;O--){V=J[O];if(V&&V[0]==L&&V[1]==K&&V[2]==T){J.splice(O,1);return true;}}return false;}var P=null;var Q=arguments[3];if("undefined"===typeof Q){Q=this._getCacheIndex(L,K,T);}if(Q>=0){P=I[Q];}if(!L||!P){return false;}if(this.useLegacyEvent(L,K)){var N=this.getLegacyIndex(L,K);var M=E[N];if(M){for(O=0,R=M.length;O<R;++O){V=M[O];if(V&&V[this.EL]==L&&V[this.TYPE]==K&&V[this.FN]==T){M.splice(O,1);break;}}}}else{try{this._simpleRemove(L,K,P[this.WFN],false);}catch(S){this.lastError=S;return false;}}delete I[Q][this.WFN];delete I[Q][this.FN];I.splice(Q,1);return true;},getTarget:function(M,L){var K=M.target||M.srcElement;return this.resolveTextNode(K);},resolveTextNode:function(L){try{if(L&&3==L.nodeType){return L.parentNode;}}catch(K){}return L;},getPageX:function(L){var K=L.pageX;if(!K&&0!==K){K=L.clientX||0;if(this.isIE){K+=this._getScrollLeft();}}return K;},getPageY:function(K){var L=K.pageY;if(!L&&0!==L){L=K.clientY||0;if(this.isIE){L+=this._getScrollTop();}}return L;},getXY:function(K){return[this.getPageX(K),this.getPageY(K)];},getRelatedTarget:function(L){var K=L.relatedTarget;
if(!K){if(L.type=="mouseout"){K=L.toElement;}else{if(L.type=="mouseover"){K=L.fromElement;}}}return this.resolveTextNode(K);},getTime:function(M){if(!M.time){var L=new Date().getTime();try{M.time=L;}catch(K){this.lastError=K;return L;}}return M.time;},stopEvent:function(K){this.stopPropagation(K);this.preventDefault(K);},stopPropagation:function(K){if(K.stopPropagation){K.stopPropagation();}else{K.cancelBubble=true;}},preventDefault:function(K){if(K.preventDefault){K.preventDefault();}else{K.returnValue=false;}},getEvent:function(M,K){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break;}N=N.caller;}}return L;},getCharCode:function(L){var K=L.keyCode||L.charCode||0;if(YAHOO.env.ua.webkit&&(K in D)){K=D[K];}return K;},_getCacheIndex:function(O,P,N){for(var M=0,L=I.length;M<L;M=M+1){var K=I[M];if(K&&K[this.FN]==N&&K[this.EL]==O&&K[this.TYPE]==P){return M;}}return -1;},generateId:function(K){var L=K.id;if(!L){L="yuievtautoid-"+A;++A;K.id=L;}return L;},_isValidCollection:function(L){try{return(L&&typeof L!=="string"&&L.length&&!L.tagName&&!L.alert&&typeof L[0]!=="undefined");}catch(K){return false;}},elCache:{},getEl:function(K){return(typeof K==="string")?document.getElementById(K):K;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(L){if(!H){H=true;var K=YAHOO.util.Event;K._ready();K._tryPreloadAttach();}},_ready:function(L){var K=YAHOO.util.Event;if(!K.DOMReady){K.DOMReady=true;K.DOMReadyEvent.fire();K._simpleRemove(document,"DOMContentLoaded",K._ready);}},_tryPreloadAttach:function(){if(F.length===0){C=0;clearInterval(this._interval);this._interval=null;return ;}if(this.locked){return ;}if(this.isIE){if(!this.DOMReady){this.startInterval();return ;}}this.locked=true;var Q=!H;if(!Q){Q=(C>0&&F.length>0);}var P=[];var R=function(T,U){var S=T;if(U.override){if(U.override===true){S=U.obj;}else{S=U.override;}}U.fn.call(S,U.obj);};var L,K,O,N,M=[];for(L=0,K=F.length;L<K;L=L+1){O=F[L];if(O){N=this.getEl(O.id);if(N){if(O.checkReady){if(H||N.nextSibling||!Q){M.push(O);F[L]=null;}}else{R(N,O);F[L]=null;}}else{P.push(O);}}}for(L=0,K=M.length;L<K;L=L+1){O=M[L];R(this.getEl(O.id),O);}C--;if(Q){for(L=F.length-1;L>-1;L--){O=F[L];if(!O||!O.id){F.splice(L,1);}}this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;},purgeElement:function(O,P,R){var M=(YAHOO.lang.isString(O))?this.getEl(O):O;var Q=this.getListeners(M,R),N,K;if(Q){for(N=Q.length-1;N>-1;N--){var L=Q[N];this.removeListener(M,L.type,L.fn);}}if(P&&M&&M.childNodes){for(N=0,K=M.childNodes.length;N<K;++N){this.purgeElement(M.childNodes[N],P,R);}}},getListeners:function(M,K){var P=[],L;if(!K){L=[I,J];}else{if(K==="unload"){L=[J];}else{L=[I];}}var R=(YAHOO.lang.isString(M))?this.getEl(M):M;for(var O=0;O<L.length;O=O+1){var T=L[O];if(T){for(var Q=0,S=T.length;Q<S;++Q){var N=T[Q];if(N&&N[this.EL]===R&&(!K||K===N[this.TYPE])){P.push({type:N[this.TYPE],fn:N[this.FN],obj:N[this.OBJ],adjust:N[this.OVERRIDE],scope:N[this.ADJ_SCOPE],index:Q});}}}}return(P.length)?P:null;},_unload:function(Q){var K=YAHOO.util.Event,N,M,L,P,O,R=J.slice();for(N=0,P=J.length;N<P;++N){L=R[N];if(L){var S=window;if(L[K.ADJ_SCOPE]){if(L[K.ADJ_SCOPE]===true){S=L[K.UNLOAD_OBJ];}else{S=L[K.ADJ_SCOPE];}}L[K.FN].call(S,K.getEvent(Q,L[K.EL]),L[K.UNLOAD_OBJ]);R[N]=null;L=null;S=null;}}J=null;if(I){for(M=I.length-1;M>-1;M--){L=I[M];if(L){K.removeListener(L[K.EL],L[K.TYPE],L[K.FN],M);}}L=null;}G=null;K._simpleRemove(window,"unload",K._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var K=document.documentElement,L=document.body;if(K&&(K.scrollTop||K.scrollLeft)){return[K.scrollTop,K.scrollLeft];}else{if(L){return[L.scrollTop,L.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(M,N,L,K){M.addEventListener(N,L,(K));};}else{if(window.attachEvent){return function(M,N,L,K){M.attachEvent("on"+N,L);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(M,N,L,K){M.removeEventListener(N,L,(K));};}else{if(window.detachEvent){return function(L,M,K){L.detachEvent("on"+M,K);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller */
if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,override:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);},createEvent:function(G,D){this.__yui_events=this.__yui_events||{};var A=D||{};var I=this.__yui_events;if(I[G]){}else{var H=A.scope||this;var E=(A.silent);var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);
I[G]=B;if(A.onSubscribeCallback){B.subscribeEvent.subscribe(A.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var F=this.__yui_subscribers[G];if(F){for(var C=0;C<F.length;++C){B.subscribe(F[C].fn,F[C].obj,F[C].override);}}}return I[G];},fireEvent:function(E,D,A,C){this.__yui_events=this.__yui_events||{};var G=this.__yui_events[E];if(!G){return null;}var B=[];for(var F=1;F<arguments.length;++F){B.push(arguments[F]);}return G.fire.apply(G,B);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};YAHOO.util.KeyListener=function(A,F,B,C){if(!A){}else{if(!F){}else{if(!B){}}}if(!C){C=YAHOO.util.KeyListener.KEYDOWN;}var D=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof A=="string"){A=document.getElementById(A);}if(typeof B=="function"){D.subscribe(B);}else{D.subscribe(B.fn,B.scope,B.correctScope);}function E(J,I){if(!F.shift){F.shift=false;}if(!F.alt){F.alt=false;}if(!F.ctrl){F.ctrl=false;}if(J.shiftKey==F.shift&&J.altKey==F.alt&&J.ctrlKey==F.ctrl){var G;if(F.keys instanceof Array){for(var H=0;H<F.keys.length;H++){G=F.keys[H];if(G==J.charCode){D.fire(J.charCode,J);break;}else{if(G==J.keyCode){D.fire(J.keyCode,J);break;}}}}else{G=F.keys;if(G==J.charCode){D.fire(J.charCode,J);}else{if(G==J.keyCode){D.fire(J.keyCode,J);}}}}}this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(A,C,E);this.enabledEvent.fire(F);}this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(A,C,E);this.disabledEvent.fire(F);}this.enabled=false;};this.toString=function(){return"KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};YAHOO.register("event",YAHOO.util.Event,{version:"2.5.1",build:"984"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.5.1", build: "984"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
YAHOO.util.Attribute=function(B,A){if(A){this.owner=A;this.configure(B,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value;},setValue:function(F,B){var E;var A=this.owner;var C=this.name;var D={type:C,prevValue:this.getValue(),newValue:F};if(this.readOnly||(this.writeOnce&&this._written)){return false;}if(this.validator&&!this.validator.call(A,F)){return false;}if(!B){E=A.fireBeforeChangeEvent(D);if(E===false){return false;}}if(this.method){this.method.call(A,F);}this.value=F;this._written=true;D.type=C;if(!B){this.owner.fireChangeEvent(D);}return true;},configure:function(B,C){B=B||{};this._written=false;this._initialConfig=this._initialConfig||{};for(var A in B){if(A&&YAHOO.lang.hasOwnProperty(B,A)){this[A]=B[A];if(C){this._initialConfig[A]=B[A];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig);},refresh:function(A){this.setValue(this.value,A);}};(function(){var A=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(C){this._configs=this._configs||{};var B=this._configs[C];if(!B){return undefined;}return B.value;},set:function(D,E,B){this._configs=this._configs||{};var C=this._configs[D];if(!C){return false;}return C.setValue(E,B);},getAttributeKeys:function(){this._configs=this._configs;var D=[];var B;for(var C in this._configs){B=this._configs[C];if(A.hasOwnProperty(this._configs,C)&&!A.isUndefined(B)){D[D.length]=C;}}return D;},setAttributes:function(D,B){for(var C in D){if(A.hasOwnProperty(D,C)){this.set(C,D[C],B);}}},resetValue:function(C,B){this._configs=this._configs||{};if(this._configs[C]){this.set(C,this._configs[C]._initialConfig.value,B);return true;}return false;},refresh:function(E,C){this._configs=this._configs;E=((A.isString(E))?[E]:E)||this.getAttributeKeys();for(var D=0,B=E.length;D<B;++D){if(this._configs[E[D]]&&!A.isUndefined(this._configs[E[D]].value)&&!A.isNull(this._configs[E[D]].value)){this._configs[E[D]].refresh(C);}}},register:function(B,C){this.setAttributeConfig(B,C);},getAttributeConfig:function(C){this._configs=this._configs||{};var B=this._configs[C]||{};var D={};for(C in B){if(A.hasOwnProperty(B,C)){D[C]=B[C];}}return D;},setAttributeConfig:function(B,C,D){this._configs=this._configs||{};C=C||{};if(!this._configs[B]){C.name=B;this._configs[B]=this.createAttribute(C);}else{this._configs[B].configure(C,D);}},configureAttribute:function(B,C,D){this.setAttributeConfig(B,C,D);},resetAttributeConfig:function(B){this._configs=this._configs||{};this._configs[B].resetConfig();},subscribe:function(B,C){this._events=this._events||{};if(!(B in this._events)){this._events[B]=this.createEvent(B);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.subscribe.apply(this,arguments);},addListener:function(){this.subscribe.apply(this,arguments);},fireBeforeChangeEvent:function(C){var B="before";B+=C.type.charAt(0).toUpperCase()+C.type.substr(1)+"Change";C.type=B;return this.fireEvent(C.type,C);},fireChangeEvent:function(B){B.type+="Change";return this.fireEvent(B.type,B);},createAttribute:function(B){return new YAHOO.util.Attribute(B,this);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var D=YAHOO.util.Dom,F=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(G,H){if(arguments.length){this.init(G,H);}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(G){G=G.get?G.get("element"):G;this.get("element").appendChild(G);},getElementsByTagName:function(G){return this.get("element").getElementsByTagName(G);},hasChildNodes:function(){return this.get("element").hasChildNodes();},insertBefore:function(G,H){G=G.get?G.get("element"):G;H=(H&&H.get)?H.get("element"):H;this.get("element").insertBefore(G,H);},removeChild:function(G){G=G.get?G.get("element"):G;this.get("element").removeChild(G);return true;},replaceChild:function(G,H){G=G.get?G.get("element"):G;H=H.get?H.get("element"):H;return this.get("element").replaceChild(G,H);},initAttributes:function(G){},addListener:function(K,J,L,I){var H=this.get("element");I=I||this;H=this.get("id")||H;var G=this;if(!this._events[K]){if(this.DOM_EVENTS[K]){YAHOO.util.Event.addListener(H,K,function(M){if(M.srcElement&&!M.target){M.target=M.srcElement;}G.fireEvent(K,M);},L,I);}this.createEvent(K,this);}YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.addListener.apply(this,arguments);},subscribe:function(){this.addListener.apply(this,arguments);},removeListener:function(H,G){this.unsubscribe.apply(this,arguments);},addClass:function(G){D.addClass(this.get("element"),G);},getElementsByClassName:function(H,G){return D.getElementsByClassName(H,G,this.get("element"));},hasClass:function(G){return D.hasClass(this.get("element"),G);},removeClass:function(G){return D.removeClass(this.get("element"),G);},replaceClass:function(H,G){return D.replaceClass(this.get("element"),H,G);},setStyle:function(I,H){var G=this.get("element");if(!G){return this._queue[this._queue.length]=["setStyle",arguments];}return D.setStyle(G,I,H);},getStyle:function(G){return D.getStyle(this.get("element"),G);},fireQueue:function(){var H=this._queue;for(var I=0,G=H.length;I<G;++I){this[H[I][0]].apply(this,H[I][1]);}},appendTo:function(H,I){H=(H.get)?H.get("element"):D.get(H);this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:H});I=(I&&I.get)?I.get("element"):D.get(I);var G=this.get("element");if(!G){return false;}if(!H){return false;}if(G.parent!=H){if(I){H.insertBefore(G,I);}else{H.appendChild(G);}}this.fireEvent("appendTo",{type:"appendTo",target:H});},get:function(G){var I=this._configs||{};var H=I.element;if(H&&!I[G]&&!YAHOO.lang.isUndefined(H.value[G])){return H.value[G];}return F.prototype.get.call(this,G);},setAttributes:function(L,H){var K=this.get("element");
for(var J in L){if(!this._configs[J]&&!YAHOO.lang.isUndefined(K[J])){this.setAttributeConfig(J);}}for(var I=0,G=this._configOrder.length;I<G;++I){if(L[this._configOrder[I]]!==undefined){this.set(this._configOrder[I],L[this._configOrder[I]],H);}}},set:function(H,J,G){var I=this.get("element");if(!I){this._queue[this._queue.length]=["set",arguments];if(this._configs[H]){this._configs[H].value=J;}return ;}if(!this._configs[H]&&!YAHOO.lang.isUndefined(I[H])){C.call(this,H);}return F.prototype.set.apply(this,arguments);},setAttributeConfig:function(G,I,J){var H=this.get("element");if(H&&!this._configs[G]&&!YAHOO.lang.isUndefined(H[G])){C.call(this,G,I);}else{F.prototype.setAttributeConfig.apply(this,arguments);}this._configOrder.push(G);},getAttributeKeys:function(){var H=this.get("element");var I=F.prototype.getAttributeKeys.call(this);for(var G in H){if(!this._configs[G]){I[G]=I[G]||H[G];}}return I;},createEvent:function(H,G){this._events[H]=true;F.prototype.createEvent.apply(this,arguments);},init:function(H,G){A.apply(this,arguments);}};var A=function(H,G){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];G=G||{};G.element=G.element||H||null;this.DOM_EVENTS={"click":true,"dblclick":true,"keydown":true,"keypress":true,"keyup":true,"mousedown":true,"mousemove":true,"mouseout":true,"mouseover":true,"mouseup":true,"focus":true,"blur":true,"submit":true};var I=false;if(YAHOO.lang.isString(H)){C.call(this,"id",{value:G.element});}if(D.get(H)){I=true;E.call(this,G);B.call(this,G);}YAHOO.util.Event.onAvailable(G.element,function(){if(!I){E.call(this,G);}this.fireEvent("available",{type:"available",target:G.element});},this,true);YAHOO.util.Event.onContentReady(G.element,function(){if(!I){B.call(this,G);}this.fireEvent("contentReady",{type:"contentReady",target:G.element});},this,true);};var E=function(G){this.setAttributeConfig("element",{value:D.get(G.element),readOnly:true});};var B=function(G){this.initAttributes(G);this.setAttributes(G,true);this.fireQueue();};var C=function(G,I){var H=this.get("element");I=I||{};I.name=G;I.method=I.method||function(J){H[G]=J;};I.value=I.value||H[G];this._configs[G]=new YAHOO.util.Attribute(I,this);};YAHOO.augment(YAHOO.util.Element,F);})();YAHOO.register("element",YAHOO.util.Element,{version:"2.5.1",build:"984"});/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
(function(){YAHOO.util.Config=function(D){if(D){this.init(D);}};var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;A.CONFIG_CHANGED_EVENT="configChanged";A.BOOLEAN_TYPE="boolean";A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){this.owner=D;this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=C.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(D){return(typeof D==A.BOOLEAN_TYPE);},checkNumber:function(D){return(!isNaN(D));},fireEvent:function(D,F){var E=this.config[D];if(E&&E.event){E.event.fire(F);}},addProperty:function(E,D){E=E.toLowerCase();this.config[E]=D;D.event=this.createEvent(E,{scope:this.owner});D.event.signature=C.LIST;D.key=E;if(D.handler){D.event.subscribe(D.handler,this.owner);}this.setProperty(E,D.value,true);if(!D.suppressEvent){this.queueProperty(E,D.value);}},getConfig:function(){var D={},F,E;for(F in this.config){E=this.config[F];if(E&&E.event){D[F]=E.value;}}return D;},getProperty:function(D){var E=this.config[D.toLowerCase()];if(E&&E.event){return E.value;}else{return undefined;}},resetProperty:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event){if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){this.setProperty(D,this.initialConfig[D]);return true;}}else{return false;}},setProperty:function(E,G,D){var F;E=E.toLowerCase();if(this.queueInProgress&&!D){this.queueProperty(E,G);return true;}else{F=this.config[E];if(F&&F.event){if(F.validator&&!F.validator(G)){return false;}else{F.value=G;if(!D){this.fireEvent(E,G);this.configChangedEvent.fire([E,G]);}return true;}}else{return false;}}},queueProperty:function(S,P){S=S.toLowerCase();var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;if(R&&R.event){if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){return false;}else{if(!B.isUndefined(P)){R.value=P;}else{P=R.value;}K=false;J=this.eventQueue.length;for(L=0;L<J;L++){G=this.eventQueue[L];if(G){H=G[0];I=G[1];if(H==S){this.eventQueue[L]=null;this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);K=true;break;}}}if(!K&&!B.isUndefined(P)){this.eventQueue.push([S,P]);}}if(R.supercedes){O=R.supercedes.length;for(T=0;T<O;T++){Q=R.supercedes[T];F=this.eventQueue.length;for(E=0;E<F;E++){M=this.eventQueue[E];if(M){N=M[0];D=M[1];if(N==Q.toLowerCase()){this.eventQueue.push([N,D]);this.eventQueue[E]=null;break;}}}}}return true;}else{return false;}},refireEvent:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event&&!B.isUndefined(E.value)){if(this.queueInProgress){this.queueProperty(D);}else{this.fireEvent(D,E.value);}}},applyConfig:function(D,G){var F,E;if(G){E={};for(F in D){if(B.hasOwnProperty(D,F)){E[F.toLowerCase()]=D[F];}}this.initialConfig=E;}for(F in D){if(B.hasOwnProperty(D,F)){this.queueProperty(F,D[F]);}}},refresh:function(){var D;for(D in this.config){this.refireEvent(D);}},fireQueue:function(){var E,H,D,G,F;this.queueInProgress=true;for(E=0;E<this.eventQueue.length;E++){H=this.eventQueue[E];if(H){D=H[0];G=H[1];F=this.config[D];F.value=G;this.fireEvent(D,G);}}this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(E,F,H,D){var G=this.config[E.toLowerCase()];if(G&&G.event){if(!A.alreadySubscribed(G.event,F,H)){G.event.subscribe(F,H,D);}return true;}else{return false;}},unsubscribeFromConfigEvent:function(D,E,G){var F=this.config[D.toLowerCase()];if(F&&F.event){return F.event.unsubscribe(E,G);}else{return false;}},toString:function(){var D="Config";if(this.owner){D+=" ["+this.owner.toString()+"]";}return D;},outputEventQueue:function(){var D="",G,E,F=this.eventQueue.length;for(E=0;E<F;E++){G=this.eventQueue[E];if(G){D+=G[0]+"="+G[1]+", ";}}return D;},destroy:function(){var E=this.config,D,F;for(D in E){if(B.hasOwnProperty(E,D)){F=E[D];F.event.unsubscribeAll();F.event=null;}}this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};A.alreadySubscribed=function(E,H,I){var F=E.subscribers.length,D,G;if(F>0){G=F-1;do{D=E.subscribers[G];if(D&&D.obj==I&&D.fn==H){return true;}}while(G--);}return false;};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(Q,P){if(Q){this.init(Q,P);}else{}};var F=YAHOO.util.Dom,D=YAHOO.util.Config,M=YAHOO.util.Event,L=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,H,O,N,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},I={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};G.IMG_ROOT=null;G.IMG_ROOT_SSL=null;G.CSS_MODULE="yui-module";G.CSS_HEADER="hd";G.CSS_BODY="bd";G.CSS_FOOTER="ft";G.RESIZE_MONITOR_SECURE_URL="javascript:false;";G.textResizeEvent=new L("textResize");function K(){if(!H){H=document.createElement("div");H.innerHTML=('<div class="'+G.CSS_HEADER+'"></div>'+'<div class="'+G.CSS_BODY+'"></div><div class="'+G.CSS_FOOTER+'"></div>');O=H.firstChild;N=O.nextSibling;E=N.nextSibling;}return H;}function J(){if(!O){K();}return(O.cloneNode(false));}function B(){if(!N){K();}return(N.cloneNode(false));}function C(){if(!E){K();}return(E.cloneNode(false));}G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){var P=L.LIST;this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);this.beforeInitEvent.signature=P;this.initEvent=this.createEvent(A.INIT);this.initEvent.signature=P;this.appendEvent=this.createEvent(A.APPEND);
this.appendEvent.signature=P;this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);this.beforeRenderEvent.signature=P;this.renderEvent=this.createEvent(A.RENDER);this.renderEvent.signature=P;this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);this.changeHeaderEvent.signature=P;this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);this.changeBodyEvent.signature=P;this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);this.changeFooterEvent.signature=P;this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);this.changeContentEvent.signature=P;this.destroyEvent=this.createEvent(A.DESTORY);this.destroyEvent.signature=P;this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);this.beforeShowEvent.signature=P;this.showEvent=this.createEvent(A.SHOW);this.showEvent.signature=P;this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);this.beforeHideEvent.signature=P;this.hideEvent=this.createEvent(A.HIDE);this.hideEvent.signature=P;},platform:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("windows")!=-1||P.indexOf("win32")!=-1){return"windows";}else{if(P.indexOf("macintosh")!=-1){return"mac";}else{return false;}}}(),browser:function(){var P=navigator.userAgent.toLowerCase();if(P.indexOf("opera")!=-1){return"opera";}else{if(P.indexOf("msie 7")!=-1){return"ie7";}else{if(P.indexOf("msie")!=-1){return"ie";}else{if(P.indexOf("safari")!=-1){return"safari";}else{if(P.indexOf("gecko")!=-1){return"gecko";}else{return false;}}}}}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(I.VISIBLE.key,{handler:this.configVisible,value:I.VISIBLE.value,validator:I.VISIBLE.validator});this.cfg.addProperty(I.EFFECT.key,{suppressEvent:I.EFFECT.suppressEvent,supercedes:I.EFFECT.supercedes});this.cfg.addProperty(I.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:I.MONITOR_RESIZE.value});this.cfg.addProperty(I.APPEND_TO_DOCUMENT_BODY.key,{value:I.APPEND_TO_DOCUMENT_BODY.value});},init:function(U,T){var R,V;this.initEvents();this.beforeInitEvent.fire(G);this.cfg=new D(this);if(this.isSecure){this.imageRoot=G.IMG_ROOT_SSL;}if(typeof U=="string"){R=U;U=document.getElementById(U);if(!U){U=(K()).cloneNode(false);U.id=R;}}this.element=U;if(U.id){this.id=U.id;}V=this.element.firstChild;if(V){var Q=false,P=false,S=false;do{if(1==V.nodeType){if(!Q&&F.hasClass(V,G.CSS_HEADER)){this.header=V;Q=true;}else{if(!P&&F.hasClass(V,G.CSS_BODY)){this.body=V;P=true;}else{if(!S&&F.hasClass(V,G.CSS_FOOTER)){this.footer=V;S=true;}}}}}while((V=V.nextSibling));}this.initDefaultConfig();F.addClass(this.element,G.CSS_MODULE);if(T){this.cfg.applyConfig(T,true);}if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}this.initEvent.fire(G);},initResizeMonitor:function(){var Q=(YAHOO.env.ua.gecko&&this.platform=="windows");if(Q){var P=this;setTimeout(function(){P._initResizeMonitor();},0);}else{this._initResizeMonitor();}},_initResizeMonitor:function(){var P,R,T;function V(){G.textResizeEvent.fire();}if(!YAHOO.env.ua.opera){R=F.get("_yuiResizeMonitor");var U=this._supportsCWResize();if(!R){R=document.createElement("iframe");if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){R.src=G.RESIZE_MONITOR_SECURE_URL;}if(!U){T=["<html><head><script ",'type="text/javascript">',"window.onresize=function(){window.parent.","YAHOO.widget.Module.textResizeEvent.","fire();};<","/script></head>","<body></body></html>"].join("");R.src="data:text/html;charset=utf-8,"+encodeURIComponent(T);}R.id="_yuiResizeMonitor";R.style.position="absolute";R.style.visibility="hidden";var Q=document.body,S=Q.firstChild;if(S){Q.insertBefore(R,S);}else{Q.appendChild(R);}R.style.width="10em";R.style.height="10em";R.style.top=(-1*R.offsetHeight)+"px";R.style.left=(-1*R.offsetWidth)+"px";R.style.borderWidth="0";R.style.visibility="visible";if(YAHOO.env.ua.webkit){P=R.contentWindow.document;P.open();P.close();}}if(R&&R.contentWindow){G.textResizeEvent.subscribe(this.onDomResize,this,true);if(!G.textResizeInitialized){if(U){if(!M.on(R.contentWindow,"resize",V)){M.on(R,"resize",V);}}G.textResizeInitialized=true;}this.resizeMonitor=R;}}},_supportsCWResize:function(){var P=true;if(YAHOO.env.ua.gecko&&YAHOO.env.ua.gecko<=1.8){P=false;}return P;},onDomResize:function(S,R){var Q=-1*this.resizeMonitor.offsetWidth,P=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=P+"px";this.resizeMonitor.style.left=Q+"px";},setHeader:function(Q){var P=this.header||(this.header=J());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},appendToHeader:function(Q){var P=this.header||(this.header=J());P.appendChild(Q);this.changeHeaderEvent.fire(Q);this.changeContentEvent.fire();},setBody:function(Q){var P=this.body||(this.body=B());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},appendToBody:function(Q){var P=this.body||(this.body=B());P.appendChild(Q);this.changeBodyEvent.fire(Q);this.changeContentEvent.fire();},setFooter:function(Q){var P=this.footer||(this.footer=C());if(Q.nodeName){P.innerHTML="";P.appendChild(Q);}else{P.innerHTML=Q;}this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},appendToFooter:function(Q){var P=this.footer||(this.footer=C());P.appendChild(Q);this.changeFooterEvent.fire(Q);this.changeContentEvent.fire();},render:function(R,P){var S=this,T;function Q(U){if(typeof U=="string"){U=document.getElementById(U);}if(U){S._addToParent(U,S.element);S.appendEvent.fire();}}this.beforeRenderEvent.fire();if(!P){P=this.element;}if(R){Q(R);}else{if(!F.inDocument(this.element)){return false;}}if(this.header&&!F.inDocument(this.header)){T=P.firstChild;if(T){P.insertBefore(this.header,T);}else{P.appendChild(this.header);}}if(this.body&&!F.inDocument(this.body)){if(this.footer&&F.isAncestor(this.moduleElement,this.footer)){P.insertBefore(this.body,this.footer);
}else{P.appendChild(this.body);}}if(this.footer&&!F.inDocument(this.footer)){P.appendChild(this.footer);}this.renderEvent.fire();return true;},destroy:function(){var P,Q;if(this.element){M.purgeElement(this.element,true);P=this.element.parentNode;}if(P){P.removeChild(this.element);}this.element=null;this.header=null;this.body=null;this.footer=null;G.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();for(Q in this){if(Q instanceof L){Q.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(Q,P,R){var S=P[0];if(S){this.beforeShowEvent.fire();F.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();F.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(R,Q,S){var P=Q[0];if(P){this.initResizeMonitor();}else{G.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(P,Q){if(!this.cfg.getProperty("appendtodocumentbody")&&P===document.body&&P.firstChild){P.insertBefore(Q,P.firstChild);}else{P.appendChild(Q);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(L,K){YAHOO.widget.Overlay.superclass.constructor.call(this,L,K);};var F=YAHOO.lang,I=YAHOO.util.CustomEvent,E=YAHOO.widget.Module,J=YAHOO.util.Event,D=YAHOO.util.Dom,C=YAHOO.util.Config,B=YAHOO.widget.Overlay,G,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},H={"X":{key:"x",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:F.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:F.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:F.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:F.isBoolean,supercedes:["zindex"]}};B.IFRAME_SRC="javascript:false;";B.IFRAME_OFFSET=3;B.VIEWPORT_OFFSET=10;B.TOP_LEFT="tl";B.TOP_RIGHT="tr";B.BOTTOM_LEFT="bl";B.BOTTOM_RIGHT="br";B.CSS_OVERLAY="yui-overlay";B.windowScrollEvent=new I("windowScroll");B.windowResizeEvent=new I("windowResize");B.windowScrollHandler=function(K){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){B.windowScrollEvent.fire();},1);}else{B.windowScrollEvent.fire();}};B.windowResizeHandler=function(K){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){B.windowResizeEvent.fire();},100);}else{B.windowResizeEvent.fire();}};B._initialized=null;if(B._initialized===null){J.on(window,"scroll",B.windowScrollHandler);J.on(window,"resize",B.windowResizeHandler);B._initialized=true;}YAHOO.extend(B,E,{init:function(L,K){B.superclass.init.call(this,L);this.beforeInitEvent.fire(B);D.addClass(this.element,B.CSS_OVERLAY);if(K){this.cfg.applyConfig(K,true);}if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!C.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}if(!C.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}this.initEvent.fire(B);},initEvents:function(){B.superclass.initEvents.call(this);var K=I.LIST;this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);this.beforeMoveEvent.signature=K;this.moveEvent=this.createEvent(A.MOVE);this.moveEvent.signature=K;},initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(H.X.key,{handler:this.configX,validator:H.X.validator,suppressEvent:H.X.suppressEvent,supercedes:H.X.supercedes});this.cfg.addProperty(H.Y.key,{handler:this.configY,validator:H.Y.validator,suppressEvent:H.Y.suppressEvent,supercedes:H.Y.supercedes});this.cfg.addProperty(H.XY.key,{handler:this.configXY,suppressEvent:H.XY.suppressEvent,supercedes:H.XY.supercedes});this.cfg.addProperty(H.CONTEXT.key,{handler:this.configContext,suppressEvent:H.CONTEXT.suppressEvent,supercedes:H.CONTEXT.supercedes});this.cfg.addProperty(H.FIXED_CENTER.key,{handler:this.configFixedCenter,value:H.FIXED_CENTER.value,validator:H.FIXED_CENTER.validator,supercedes:H.FIXED_CENTER.supercedes});this.cfg.addProperty(H.WIDTH.key,{handler:this.configWidth,suppressEvent:H.WIDTH.suppressEvent,supercedes:H.WIDTH.supercedes});this.cfg.addProperty(H.HEIGHT.key,{handler:this.configHeight,suppressEvent:H.HEIGHT.suppressEvent,supercedes:H.HEIGHT.supercedes});this.cfg.addProperty(H.ZINDEX.key,{handler:this.configzIndex,value:H.ZINDEX.value});this.cfg.addProperty(H.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:H.CONSTRAIN_TO_VIEWPORT.value,validator:H.CONSTRAIN_TO_VIEWPORT.validator,supercedes:H.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(H.IFRAME.key,{handler:this.configIframe,value:H.IFRAME.value,validator:H.IFRAME.validator,supercedes:H.IFRAME.supercedes});},moveTo:function(K,L){this.cfg.setProperty("xy",[K,L]);},hideMacGeckoScrollbars:function(){D.removeClass(this.element,"show-scrollbars");D.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){D.removeClass(this.element,"hide-scrollbars");D.addClass(this.element,"show-scrollbars");},configVisible:function(N,K,T){var M=K[0],O=D.getStyle(this.element,"visibility"),U=this.cfg.getProperty("effect"),R=[],Q=(this.platform=="mac"&&YAHOO.env.ua.gecko),b=C.alreadySubscribed,S,L,a,Y,X,W,Z,V,P;
if(O=="inherit"){a=this.element.parentNode;while(a.nodeType!=9&&a.nodeType!=11){O=D.getStyle(a,"visibility");if(O!="inherit"){break;}a=a.parentNode;}if(O=="inherit"){O="visible";}}if(U){if(U instanceof Array){V=U.length;for(Y=0;Y<V;Y++){S=U[Y];R[R.length]=S.effect(this,S.duration);}}else{R[R.length]=U.effect(this,U.duration);}}if(M){if(Q){this.showMacGeckoScrollbars();}if(U){if(M){if(O!="visible"||O===""){this.beforeShowEvent.fire();P=R.length;for(X=0;X<P;X++){L=R[X];if(X===0&&!b(L.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){L.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}L.animateIn();}}}}else{if(O!="visible"||O===""){this.beforeShowEvent.fire();D.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(Q){this.hideMacGeckoScrollbars();}if(U){if(O=="visible"){this.beforeHideEvent.fire();P=R.length;for(W=0;W<P;W++){Z=R[W];if(W===0&&!b(Z.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){Z.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}Z.animateOut();}}else{if(O===""){D.setStyle(this.element,"visibility","hidden");}}}else{if(O=="visible"||O===""){this.beforeHideEvent.fire();D.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(O,M,P){var Q=M[0],L=C.alreadySubscribed,N=B.windowResizeEvent,K=B.windowScrollEvent;if(Q){this.center();if(!L(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}if(!L(N,this.doCenterOnDOMEvent,this)){N.subscribe(this.doCenterOnDOMEvent,this,true);}if(!L(K,this.doCenterOnDOMEvent,this)){K.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);N.unsubscribe(this.doCenterOnDOMEvent,this);K.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(N,L,O){var K=L[0],M=this.element;D.setStyle(M,"height",K);this.cfg.refireEvent("iframe");},configWidth:function(N,K,O){var M=K[0],L=this.element;D.setStyle(L,"width",M);this.cfg.refireEvent("iframe");},configzIndex:function(M,K,N){var O=K[0],L=this.element;if(!O){O=D.getStyle(L,"zIndex");if(!O||isNaN(O)){O=0;}}if(this.iframe||this.cfg.getProperty("iframe")===true){if(O<=0){O=1;}}D.setStyle(L,"zIndex",O);this.cfg.setProperty("zIndex",O,true);if(this.iframe){this.stackIframe();}},configXY:function(M,L,N){var P=L[0],K=P[0],O=P[1];this.cfg.setProperty("x",K);this.cfg.setProperty("y",O);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configX:function(M,L,N){var K=L[0],O=this.cfg.getProperty("y");this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setX(this.element,K,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},configY:function(M,L,N){var K=this.cfg.getProperty("x"),O=L[0];this.cfg.setProperty("x",K,true);this.cfg.setProperty("y",O,true);this.beforeMoveEvent.fire([K,O]);K=this.cfg.getProperty("x");O=this.cfg.getProperty("y");D.setY(this.element,O,true);this.cfg.setProperty("xy",[K,O],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([K,O]);},showIframe:function(){var L=this.iframe,K;if(L){K=this.element.parentNode;if(K!=L.parentNode){this._addToParent(K,L);}L.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var K=this.iframe,M=this.element,O=B.IFRAME_OFFSET,L=(O*2),N;if(K){K.style.width=(M.offsetWidth+L+"px");K.style.height=(M.offsetHeight+L+"px");N=this.cfg.getProperty("xy");if(!F.isArray(N)||(isNaN(N[0])||isNaN(N[1]))){this.syncPosition();N=this.cfg.getProperty("xy");}D.setXY(K,[(N[0]-O),(N[1]-O)]);}},stackIframe:function(){if(this.iframe){var K=D.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(K)&&!isNaN(K)){D.setStyle(this.iframe,"zIndex",(K-1));}}},configIframe:function(N,M,O){var K=M[0];function P(){var R=this.iframe,S=this.element,T;if(!R){if(!G){G=document.createElement("iframe");if(this.isSecure){G.src=B.IFRAME_SRC;}if(YAHOO.env.ua.ie){G.style.filter="alpha(opacity=0)";G.frameBorder=0;}else{G.style.opacity="0";}G.style.position="absolute";G.style.border="none";G.style.margin="0";G.style.padding="0";G.style.display="none";}R=G.cloneNode(false);T=S.parentNode;var Q=T||document.body;this._addToParent(Q,R);this.iframe=R;}this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}function L(){P.call(this);this.beforeShowEvent.unsubscribe(L);this._iframeDeferred=false;}if(K){if(this.cfg.getProperty("visible")){P.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(L);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},_primeXYFromDOM:function(){if(YAHOO.lang.isUndefined(this.cfg.getProperty("xy"))){this.syncPosition();this.cfg.refireEvent("xy");this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);}},configConstrainToViewport:function(L,K,M){var N=K[0];if(N){if(!C.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}if(!C.alreadySubscribed(this.beforeShowEvent,this._primeXYFromDOM)){this.beforeShowEvent.subscribe(this._primeXYFromDOM);}}else{this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(M,L,O){var Q=L[0],N,P,K;if(Q){N=Q[0];P=Q[1];
K=Q[2];if(N){if(typeof N=="string"){this.cfg.setProperty("context",[document.getElementById(N),P,K],true);}if(P&&K){this.align(P,K);}}}},align:function(L,K){var Q=this.cfg.getProperty("context"),P=this,O,N,R;function M(S,T){switch(L){case B.TOP_LEFT:P.moveTo(T,S);break;case B.TOP_RIGHT:P.moveTo((T-N.offsetWidth),S);break;case B.BOTTOM_LEFT:P.moveTo(T,(S-N.offsetHeight));break;case B.BOTTOM_RIGHT:P.moveTo((T-N.offsetWidth),(S-N.offsetHeight));break;}}if(Q){O=Q[0];N=this.element;P=this;if(!L){L=Q[1];}if(!K){K=Q[2];}if(N&&O){R=D.getRegion(O);switch(K){case B.TOP_LEFT:M(R.top,R.left);break;case B.TOP_RIGHT:M(R.top,R.right);break;case B.BOTTOM_LEFT:M(R.bottom,R.left);break;case B.BOTTOM_RIGHT:M(R.bottom,R.right);break;}}}},enforceConstraints:function(L,K,M){var O=K[0];var N=this.getConstrainedXY(O[0],O[1]);this.cfg.setProperty("x",N[0],true);this.cfg.setProperty("y",N[1],true);this.cfg.setProperty("xy",N,true);},getConstrainedXY:function(V,T){var N=B.VIEWPORT_OFFSET,U=D.getViewportWidth(),Q=D.getViewportHeight(),M=this.element.offsetHeight,S=this.element.offsetWidth,Y=D.getDocumentScrollLeft(),W=D.getDocumentScrollTop();var P=V;var L=T;if(S+N<U){var R=Y+N;var X=Y+U-S-N;if(V<R){P=R;}else{if(V>X){P=X;}}}else{P=N+Y;}if(M+N<Q){var O=W+N;var K=W+Q-M-N;if(T<O){L=O;}else{if(T>K){L=K;}}}else{L=N+W;}return[P,L];},center:function(){var N=B.VIEWPORT_OFFSET,O=this.element.offsetWidth,M=this.element.offsetHeight,L=D.getViewportWidth(),P=D.getViewportHeight(),K,Q;if(O<L){K=(L/2)-(O/2)+D.getDocumentScrollLeft();}else{K=N+D.getDocumentScrollLeft();}if(M<P){Q=(P/2)-(M/2)+D.getDocumentScrollTop();}else{Q=N+D.getDocumentScrollTop();}this.cfg.setProperty("xy",[parseInt(K,10),parseInt(Q,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var K=D.getXY(this.element);this.cfg.setProperty("x",K[0],true);this.cfg.setProperty("y",K[1],true);this.cfg.setProperty("xy",K,true);},onDomResize:function(M,L){var K=this;B.superclass.onDomResize.call(this,M,L);setTimeout(function(){K.syncPosition();K.cfg.refireEvent("iframe");K.cfg.refireEvent("context");},0);},bringToTop:function(){var O=[],N=this.element;function R(V,U){var X=D.getStyle(V,"zIndex"),W=D.getStyle(U,"zIndex"),T=(!X||isNaN(X))?0:parseInt(X,10),S=(!W||isNaN(W))?0:parseInt(W,10);if(T>S){return -1;}else{if(T<S){return 1;}else{return 0;}}}function M(U){var S=D.hasClass(U,B.CSS_OVERLAY),T=YAHOO.widget.Panel;if(S&&!D.isAncestor(N,S)){if(T&&D.hasClass(U,T.CSS_PANEL)){O[O.length]=U.parentNode;}else{O[O.length]=U;}}}D.getElementsBy(M,"DIV",document.body);O.sort(R);var K=O[0],Q;if(K){Q=D.getStyle(K,"zIndex");if(!isNaN(Q)){var P=false;if(K!=N){P=true;}else{if(O.length>1){var L=D.getStyle(O[1],"zIndex");if(!isNaN(L)&&(Q==L)){P=true;}}}if(P){this.cfg.setProperty("zindex",(parseInt(Q,10)+2));}}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}this.iframe=null;B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(G){this.init(G);};var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;A.CSS_FOCUSED="focused";A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(I){this.cfg=new B(this);this.initDefaultConfig();if(I){this.cfg.applyConfig(I,true);}this.cfg.fireQueue();var H=null;this.getActive=function(){return H;};this.focus=function(J){var K=this.find(J);if(K){if(H!=K){if(H){H.blur();}this.bringToTop(K);H=K;E.addClass(H.element,A.CSS_FOCUSED);K.focusEvent.fire();}}};this.remove=function(K){var M=this.find(K),J;if(M){if(H==M){H=null;}var L=(M.element===null&&M.cfg===null)?true:false;if(!L){J=E.getStyle(M.element,"zIndex");M.cfg.setProperty("zIndex",-1000,true);}this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));M.hideEvent.unsubscribe(M.blur);M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);if(!L){C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);M.cfg.setProperty("zIndex",J,true);M.cfg.setProperty("manager",null);}M.focusEvent.unsubscribeAll();M.blurEvent.unsubscribeAll();M.focusEvent=null;M.blurEvent=null;M.focus=null;M.blur=null;}};this.blurAll=function(){var K=this.overlays.length,J;if(K>0){J=K-1;do{this.overlays[J].blur();}while(J--);}};this._onOverlayBlur=function(K,J){H=null;};var G=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}if(G){this.register(G);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(I){var G=C.getTarget(I),H=this.close;if(H&&(G==H||E.isAncestor(H,G))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(H,G,I){this.remove(I);},register:function(G){var K=this,L,I,H,J;if(G instanceof D){G.cfg.addProperty("manager",{value:this});G.focusEvent=G.createEvent("focus");G.focusEvent.signature=F.LIST;G.blurEvent=G.createEvent("blur");G.blurEvent.signature=F.LIST;G.focus=function(){K.focus(this);};G.blur=function(){if(K.getActive()==this){E.removeClass(this.element,A.CSS_FOCUSED);this.blurEvent.fire();}};G.blurEvent.subscribe(K._onOverlayBlur);G.hideEvent.subscribe(G.blur);G.destroyEvent.subscribe(this._onOverlayDestroy,G,this);C.on(G.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,G);L=E.getStyle(G.element,"zIndex");if(!isNaN(L)){G.cfg.setProperty("zIndex",parseInt(L,10));}else{G.cfg.setProperty("zIndex",0);}this.overlays.push(G);this.bringToTop(G);return true;}else{if(G instanceof Array){I=0;J=G.length;for(H=0;H<J;H++){if(this.register(G[H])){I++;}}if(I>0){return true;}}else{return false;}}},bringToTop:function(M){var I=this.find(M),L,G,J;if(I){J=this.overlays;J.sort(this.compareZIndexDesc);G=J[0];if(G){L=E.getStyle(G.element,"zIndex");
if(!isNaN(L)){var K=false;if(G!==I){K=true;}else{if(J.length>1){var H=E.getStyle(J[1].element,"zIndex");if(!isNaN(H)&&(L==H)){K=true;}}}if(K){I.cfg.setProperty("zindex",(parseInt(L,10)+2));}}J.sort(this.compareZIndexDesc);}}},find:function(G){var I=this.overlays,J=I.length,H;if(J>0){H=J-1;if(G instanceof D){do{if(I[H]==G){return I[H];}}while(H--);}else{if(typeof G=="string"){do{if(I[H].id==G){return I[H];}}while(H--);}}return null;}},compareZIndexDesc:function(J,I){var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;if(H===null&&G===null){return 0;}else{if(H===null){return 1;}else{if(G===null){return -1;}else{if(H>G){return -1;}else{if(H<G){return 1;}else{return 0;}}}}}},showAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].show();}while(G--);}},hideAll:function(){var H=this.overlays,I=H.length,G;if(I>0){G=I-1;do{H[G].hide();}while(G--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.ContainerEffect=function(F,I,H,E,G){if(!G){G=YAHOO.util.Anim;}this.overlay=F;this.attrIn=I;this.attrOut=H;this.targetElement=E||F.element;this.animClass=G;};var B=YAHOO.util.Dom,D=YAHOO.util.CustomEvent,C=YAHOO.util.Easing,A=YAHOO.widget.ContainerEffect;A.FADE=function(E,G){var I={attributes:{opacity:{from:0,to:1}},duration:G,method:C.easeIn};var F={attributes:{opacity:{to:0}},duration:G,method:C.easeOut};var H=new A(E,I,F,E.element);H.handleUnderlayStart=function(){var K=this.overlay.underlay;if(K&&YAHOO.env.ua.ie){var J=(K.filters&&K.filters.length>0);if(J){B.addClass(E.element,"yui-effect-fade");}}};H.handleUnderlayComplete=function(){var J=this.overlay.underlay;if(J&&YAHOO.env.ua.ie){B.removeClass(E.element,"yui-effect-fade");}};H.handleStartAnimateIn=function(K,J,L){B.addClass(L.overlay.element,"hide-select");if(!L.overlay.underlay){L.overlay.cfg.refireEvent("underlay");}L.handleUnderlayStart();B.setStyle(L.overlay.element,"visibility","visible");B.setStyle(L.overlay.element,"opacity",0);};H.handleCompleteAnimateIn=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateInCompleteEvent.fire();};H.handleStartAnimateOut=function(K,J,L){B.addClass(L.overlay.element,"hide-select");L.handleUnderlayStart();};H.handleCompleteAnimateOut=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}B.setStyle(L.overlay.element,"visibility","hidden");B.setStyle(L.overlay.element,"opacity",1);L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateOutCompleteEvent.fire();};H.init();return H;};A.SLIDE=function(G,I){var F=G.cfg.getProperty("x")||B.getX(G.element),K=G.cfg.getProperty("y")||B.getY(G.element),J=B.getClientWidth(),H=G.element.offsetWidth,E=new A(G,{attributes:{points:{to:[F,K]}},duration:I,method:C.easeIn},{attributes:{points:{to:[(J+25),K]}},duration:I,method:C.easeOut},G.element,YAHOO.util.Motion);E.handleStartAnimateIn=function(M,L,N){N.overlay.element.style.left=((-25)-H)+"px";N.overlay.element.style.top=K+"px";};E.handleTweenAnimateIn=function(O,N,P){var Q=B.getXY(P.overlay.element),M=Q[0],L=Q[1];if(B.getStyle(P.overlay.element,"visibility")=="hidden"&&M<F){B.setStyle(P.overlay.element,"visibility","visible");}P.overlay.cfg.setProperty("xy",[M,L],true);P.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateIn=function(M,L,N){N.overlay.cfg.setProperty("xy",[F,K],true);N.startX=F;N.startY=K;N.overlay.cfg.refireEvent("iframe");N.animateInCompleteEvent.fire();};E.handleStartAnimateOut=function(M,L,P){var N=B.getViewportWidth(),Q=B.getXY(P.overlay.element),O=Q[1];P.animOut.attributes.points.to=[(N+25),O];};E.handleTweenAnimateOut=function(N,M,O){var Q=B.getXY(O.overlay.element),L=Q[0],P=Q[1];O.overlay.cfg.setProperty("xy",[L,P],true);O.overlay.cfg.refireEvent("iframe");};E.handleCompleteAnimateOut=function(M,L,N){B.setStyle(N.overlay.element,"visibility","hidden");N.overlay.cfg.setProperty("xy",[F,K]);N.animateOutCompleteEvent.fire();};E.init();return E;};A.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=D.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=D.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=D.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=D.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(F,E,G){},handleTweenAnimateIn:function(F,E,G){},handleCompleteAnimateIn:function(F,E,G){},handleStartAnimateOut:function(F,E,G){},handleTweenAnimateOut:function(F,E,G){},handleCompleteAnimateOut:function(F,E,G){},toString:function(){var E="ContainerEffect";if(this.overlay){E+=" ["+this.overlay.toString()+"]";}return E;}};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);})();YAHOO.register("containercore",YAHOO.widget.Module,{version:"2.5.1",build:"984"});/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
(function(){var B=YAHOO.util.Dom,A=YAHOO.util.Event;YAHOO.widget.MenuManager=function(){var N=false,F={},Q={},J={},E={"click":"clickEvent","mousedown":"mouseDownEvent","mouseup":"mouseUpEvent","mouseover":"mouseOverEvent","mouseout":"mouseOutEvent","keydown":"keyDownEvent","keyup":"keyUpEvent","keypress":"keyPressEvent"},K=null;function D(S){var R;if(S&&S.tagName){switch(S.tagName.toUpperCase()){case"DIV":R=S.parentNode;if((B.hasClass(S,"hd")||B.hasClass(S,"bd")||B.hasClass(S,"ft"))&&R&&R.tagName&&R.tagName.toUpperCase()=="DIV"){return R;}else{return S;}break;case"LI":return S;default:R=S.parentNode;if(R){return D(R);}break;}}}function G(V){var R=A.getTarget(V),S=D(R),X,T,U,Z,Y;if(S){T=S.tagName.toUpperCase();if(T=="LI"){U=S.id;if(U&&J[U]){Z=J[U];Y=Z.parent;}}else{if(T=="DIV"){if(S.id){Y=F[S.id];}}}}if(Y){X=E[V.type];if(Z&&!Z.cfg.getProperty("disabled")){Z[X].fire(V);if(V.type=="keyup"||V.type=="mousedown"){if(K!=Z){if(K){K.blurEvent.fire();}Z.focusEvent.fire();}}}Y[X].fire(V,Z);}else{if(V.type=="mousedown"){if(K){K.blurEvent.fire();K=null;}for(var W in Q){if(YAHOO.lang.hasOwnProperty(Q,W)){Y=Q[W];if(Y.cfg.getProperty("clicktohide")&&!(Y instanceof YAHOO.widget.MenuBar)&&Y.cfg.getProperty("position")=="dynamic"){Y.hide();}else{Y.clearActiveItem(true);}}}}else{if(V.type=="keyup"){if(K){K.blurEvent.fire();K=null;}}}}}function P(S,R,T){if(F[T.id]){this.removeMenu(T);}}function M(S,R){var T=R[0];if(T){K=T;}}function H(S,R){K=null;}function C(T,S){var R=S[0],U=this.id;if(R){Q[U]=this;}else{if(Q[U]){delete Q[U];}}}function L(S,R){O(this);}function O(S){var R=S.id;if(R&&J[R]){if(K==S){K=null;}delete J[R];S.destroyEvent.unsubscribe(L);}}function I(S,R){var U=R[0],T;if(U instanceof YAHOO.widget.MenuItem){T=U.id;if(!J[T]){J[T]=U;U.destroyEvent.subscribe(L);}}}return{addMenu:function(S){var R;if(S instanceof YAHOO.widget.Menu&&S.id&&!F[S.id]){F[S.id]=S;if(!N){R=document;A.on(R,"mouseover",G,this,true);A.on(R,"mouseout",G,this,true);A.on(R,"mousedown",G,this,true);A.on(R,"mouseup",G,this,true);A.on(R,"click",G,this,true);A.on(R,"keydown",G,this,true);A.on(R,"keyup",G,this,true);A.on(R,"keypress",G,this,true);N=true;}S.cfg.subscribeToConfigEvent("visible",C);S.destroyEvent.subscribe(P,S,this);S.itemAddedEvent.subscribe(I);S.focusEvent.subscribe(M);S.blurEvent.subscribe(H);}},removeMenu:function(U){var S,R,T;if(U){S=U.id;if(F[S]==U){R=U.getItems();if(R&&R.length>0){T=R.length-1;do{O(R[T]);}while(T--);}delete F[S];if(Q[S]==U){delete Q[S];}if(U.cfg){U.cfg.unsubscribeFromConfigEvent("visible",C);}U.destroyEvent.unsubscribe(P,U);U.itemAddedEvent.unsubscribe(I);U.focusEvent.unsubscribe(M);U.blurEvent.unsubscribe(H);}}},hideVisible:function(){var R;for(var S in Q){if(YAHOO.lang.hasOwnProperty(Q,S)){R=Q[S];if(!(R instanceof YAHOO.widget.MenuBar)&&R.cfg.getProperty("position")=="dynamic"){R.hide();}}}},getVisible:function(){return Q;},getMenus:function(){return F;},getMenu:function(S){var R=F[S];if(R){return R;}},getMenuItem:function(R){var S=J[R];if(S){return S;}},getMenuItemGroup:function(U){var S=B.get(U),R,W,V,T;if(S&&S.tagName&&S.tagName.toUpperCase()=="UL"){W=S.firstChild;if(W){R=[];do{T=W.id;if(T){V=this.getMenuItem(T);if(V){R[R.length]=V;}}}while((W=W.nextSibling));if(R.length>0){return R;}}}},getFocusedMenuItem:function(){return K;},getFocusedMenu:function(){if(K){return(K.parent.getRoot());}},toString:function(){return"MenuManager";}};}();})();(function(){YAHOO.widget.Menu=function(O,N){if(N){this.parent=N.parent;this.lazyLoad=N.lazyLoad||N.lazyload;this.itemData=N.itemData||N.itemdata;}YAHOO.widget.Menu.superclass.constructor.call(this,O,N);};function I(N){if(typeof N=="string"){return("dynamic,static".indexOf((N.toLowerCase()))!=-1);}}var C=YAHOO.util.Dom,M=YAHOO.util.Event,D=YAHOO.widget.Module,B=YAHOO.widget.Overlay,F=YAHOO.widget.Menu,K=YAHOO.widget.MenuManager,L=YAHOO.util.CustomEvent,E=YAHOO.lang,H=YAHOO.env.ua,G,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","FOCUS":"focus","BLUR":"blur","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved"},J={"VISIBLE":{key:"visible",value:false,validator:E.isBoolean},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:true,validator:E.isBoolean,supercedes:["iframe","x","y","xy"]},"POSITION":{key:"position",value:"dynamic",validator:I,supercedes:["visible","iframe"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","tr"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:true,validator:E.isBoolean,suppressEvent:true},"SHOW_DELAY":{key:"showdelay",value:250,validator:E.isNumber,suppressEvent:true},"HIDE_DELAY":{key:"hidedelay",value:0,validator:E.isNumber,suppressEvent:true},"SUBMENU_HIDE_DELAY":{key:"submenuhidedelay",value:250,validator:E.isNumber,suppressEvent:true},"CLICK_TO_HIDE":{key:"clicktohide",value:true,validator:E.isBoolean,suppressEvent:true},"CONTAINER":{key:"container",suppressEvent:true},"SCROLL_INCREMENT":{key:"scrollincrement",value:1,validator:E.isNumber,supercedes:["maxheight"],suppressEvent:true},"MIN_SCROLL_HEIGHT":{key:"minscrollheight",value:90,validator:E.isNumber,supercedes:["maxheight"],suppressEvent:true},"MAX_HEIGHT":{key:"maxheight",value:0,validator:E.isNumber,supercedes:["iframe"],suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:E.isString,suppressEvent:true},"DISABLED":{key:"disabled",value:false,validator:E.isBoolean,suppressEvent:true}};YAHOO.lang.extend(F,B,{CSS_CLASS_NAME:"yuimenu",ITEM_TYPE:null,GROUP_TITLE_TAG_NAME:"h6",OFF_SCREEN_POSITION:[-10000,-10000],_nHideDelayId:null,_nShowDelayId:null,_nSubmenuHideDelayId:null,_nBodyScrollId:null,_bHideDelayEventHandlersAssigned:false,_bHandledMouseOverEvent:false,_bHandledMouseOutEvent:false,_aGroupTitleElements:null,_aItemGroups:null,_aListElements:null,_nCurrentMouseX:0,_bStopMouseEventHandlers:false,_sClassName:null,lazyLoad:false,itemData:null,activeItem:null,parent:null,srcElement:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,itemAddedEvent:null,itemRemovedEvent:null,init:function(P,O){this._aItemGroups=[];
this._aListElements=[];this._aGroupTitleElements=[];if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuItem;}var N;if(typeof P=="string"){N=document.getElementById(P);}else{if(P.tagName){N=P;}}if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":this.srcElement=N;if(!N.id){N.setAttribute("id",C.generateId());}F.superclass.init.call(this,N);this.beforeInitEvent.fire(F);break;case"SELECT":this.srcElement=N;F.superclass.init.call(this,C.generateId());this.beforeInitEvent.fire(F);break;}}else{F.superclass.init.call(this,P);this.beforeInitEvent.fire(F);}if(this.element){C.addClass(this.element,this.CSS_CLASS_NAME);this.initEvent.subscribe(this._onInit);this.beforeRenderEvent.subscribe(this._onBeforeRender);this.renderEvent.subscribe(this._onRender);this.renderEvent.subscribe(this.onRender);this.beforeShowEvent.subscribe(this._onBeforeShow);this.hideEvent.subscribe(this.positionOffScreen);this.showEvent.subscribe(this._onShow);this.beforeHideEvent.subscribe(this._onBeforeHide);this.mouseOverEvent.subscribe(this._onMouseOver);this.mouseOutEvent.subscribe(this._onMouseOut);this.clickEvent.subscribe(this._onClick);this.keyDownEvent.subscribe(this._onKeyDown);this.keyPressEvent.subscribe(this._onKeyPress);if(H.gecko||H.webkit){this.cfg.subscribeToConfigEvent("y",this._onYChange);}if(O){this.cfg.applyConfig(O,true);}K.addMenu(this);this.initEvent.fire(F);}},_initSubTree:function(){var O=this.srcElement,N,Q,T,U,S,R,P;if(O){N=(O.tagName&&O.tagName.toUpperCase());if(N=="DIV"){U=this.body.firstChild;if(U){Q=0;T=this.GROUP_TITLE_TAG_NAME.toUpperCase();do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case T:this._aGroupTitleElements[Q]=U;break;case"UL":this._aListElements[Q]=U;this._aItemGroups[Q]=[];Q++;break;}}}while((U=U.nextSibling));if(this._aListElements[0]){C.addClass(this._aListElements[0],"first-of-type");}}}U=null;if(N){switch(N){case"DIV":S=this._aListElements;R=S.length;if(R>0){P=R-1;do{U=S[P].firstChild;if(U){do{if(U&&U.tagName&&U.tagName.toUpperCase()=="LI"){this.addItem(new this.ITEM_TYPE(U,{parent:this}),P);}}while((U=U.nextSibling));}}while(P--);}break;case"SELECT":U=O.firstChild;do{if(U&&U.tagName){switch(U.tagName.toUpperCase()){case"OPTGROUP":case"OPTION":this.addItem(new this.ITEM_TYPE(U,{parent:this}));break;}}}while((U=U.nextSibling));break;}}}},_getFirstEnabledItem:function(){var N=this.getItems(),Q=N.length,P;for(var O=0;O<Q;O++){P=N[O];if(P&&!P.cfg.getProperty("disabled")&&P.element.style.display!="none"){return P;}}},_addItemToGroup:function(S,T,W){var U,X,Q,V,R,O,P;function N(Y,Z){return(Y[Z]||N(Y,(Z+1)));}if(T instanceof this.ITEM_TYPE){U=T;U.parent=this;}else{if(typeof T=="string"){U=new this.ITEM_TYPE(T,{parent:this});}else{if(typeof T=="object"){T.parent=this;U=new this.ITEM_TYPE(T.text,T);}}}if(U){if(U.cfg.getProperty("selected")){this.activeItem=U;}X=typeof S=="number"?S:0;Q=this._getItemGroup(X);if(!Q){Q=this._createItemGroup(X);}if(typeof W=="number"){R=(W>=Q.length);if(Q[W]){Q.splice(W,0,U);}else{Q[W]=U;}V=Q[W];if(V){if(R&&(!V.element.parentNode||V.element.parentNode.nodeType==11)){this._aListElements[X].appendChild(V.element);}else{O=N(Q,(W+1));if(O&&(!V.element.parentNode||V.element.parentNode.nodeType==11)){this._aListElements[X].insertBefore(V.element,O.element);}}V.parent=this;this._subscribeToItemEvents(V);this._configureSubmenu(V);this._updateItemProperties(X);this.itemAddedEvent.fire(V);this.changeContentEvent.fire();return V;}}else{P=Q.length;Q[P]=U;V=Q[P];if(V){if(!C.isAncestor(this._aListElements[X],V.element)){this._aListElements[X].appendChild(V.element);}V.element.setAttribute("groupindex",X);V.element.setAttribute("index",P);V.parent=this;V.index=P;V.groupIndex=X;this._subscribeToItemEvents(V);this._configureSubmenu(V);if(P===0){C.addClass(V.element,"first-of-type");}this.itemAddedEvent.fire(V);this.changeContentEvent.fire();return V;}}}},_removeItemFromGroupByIndex:function(Q,O){var P=typeof Q=="number"?Q:0,R=this._getItemGroup(P),T,S,N;if(R){T=R.splice(O,1);S=T[0];if(S){this._updateItemProperties(P);if(R.length===0){N=this._aListElements[P];if(this.body&&N){this.body.removeChild(N);}this._aItemGroups.splice(P,1);this._aListElements.splice(P,1);N=this._aListElements[0];if(N){C.addClass(N,"first-of-type");}}this.itemRemovedEvent.fire(S);this.changeContentEvent.fire();return S;}}},_removeItemFromGroupByValue:function(P,N){var R=this._getItemGroup(P),S,Q,O;if(R){S=R.length;Q=-1;if(S>0){O=S-1;do{if(R[O]==N){Q=O;break;}}while(O--);if(Q>-1){return(this._removeItemFromGroupByIndex(P,Q));}}}},_updateItemProperties:function(O){var P=this._getItemGroup(O),S=P.length,R,Q,N;if(S>0){N=S-1;do{R=P[N];if(R){Q=R.element;R.index=N;R.groupIndex=O;Q.setAttribute("groupindex",O);Q.setAttribute("index",N);C.removeClass(Q,"first-of-type");}}while(N--);if(Q){C.addClass(Q,"first-of-type");}}},_createItemGroup:function(O){var N;if(!this._aItemGroups[O]){this._aItemGroups[O]=[];N=document.createElement("ul");this._aListElements[O]=N;return this._aItemGroups[O];}},_getItemGroup:function(O){var N=((typeof O=="number")?O:0);return this._aItemGroups[N];},_configureSubmenu:function(N){var O=N.cfg.getProperty("submenu");if(O){this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange,O,true);this.renderEvent.subscribe(this._onParentMenuRender,O,true);O.beforeShowEvent.subscribe(this._onSubmenuBeforeShow);}},_subscribeToItemEvents:function(N){N.focusEvent.subscribe(this._onMenuItemFocus);N.blurEvent.subscribe(this._onMenuItemBlur);N.destroyEvent.subscribe(this._onMenuItemDestroy,N,this);N.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange,N,this);},_onVisibleChange:function(P,O){var N=O[0];if(N){C.addClass(this.element,"visible");}else{C.removeClass(this.element,"visible");}},_cancelHideDelay:function(){var N=this.getRoot();if(N._nHideDelayId){window.clearTimeout(N._nHideDelayId);}},_execHideDelay:function(){this._cancelHideDelay();var O=this.getRoot(),P=this;function N(){if(O.activeItem){O.clearActiveItem();}if(O==P&&!(P instanceof YAHOO.widget.MenuBar)&&P.cfg.getProperty("position")=="dynamic"){P.hide();
}}O._nHideDelayId=window.setTimeout(N,O.cfg.getProperty("hidedelay"));},_cancelShowDelay:function(){var N=this.getRoot();if(N._nShowDelayId){window.clearTimeout(N._nShowDelayId);}},_execShowDelay:function(P){var O=this.getRoot();function N(){if(P.parent.cfg.getProperty("selected")){P.show();}}O._nShowDelayId=window.setTimeout(N,O.cfg.getProperty("showdelay"));},_execSubmenuHideDelay:function(Q,O,N){var P=this;Q._nSubmenuHideDelayId=window.setTimeout(function(){if(P._nCurrentMouseX>(O+10)){Q._nSubmenuHideDelayId=window.setTimeout(function(){Q.hide();},N);}else{Q.hide();}},50);},_disableScrollHeader:function(){if(!this._bHeaderDisabled){C.addClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=true;}},_disableScrollFooter:function(){if(!this._bFooterDisabled){C.addClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=true;}},_enableScrollHeader:function(){if(this._bHeaderDisabled){C.removeClass(this.header,"topscrollbar_disabled");this._bHeaderDisabled=false;}},_enableScrollFooter:function(){if(this._bFooterDisabled){C.removeClass(this.footer,"bottomscrollbar_disabled");this._bFooterDisabled=false;}},_onMouseOver:function(W,R){if(this._bStopMouseEventHandlers){return false;}var X=R[0],V=R[1],N=M.getTarget(X),O,Q,U,P,T,S;if(!this._bHandledMouseOverEvent&&(N==this.element||C.isAncestor(this.element,N))){this._nCurrentMouseX=0;M.on(this.element,"mousemove",this._onMouseMove,this,true);if(!C.isAncestor(V.element,M.getRelatedTarget(X))){this.clearActiveItem();}if(this.parent&&this._nSubmenuHideDelayId){window.clearTimeout(this._nSubmenuHideDelayId);this.parent.cfg.setProperty("selected",true);O=this.parent.parent;O._bHandledMouseOutEvent=true;O._bHandledMouseOverEvent=false;}this._bHandledMouseOverEvent=true;this._bHandledMouseOutEvent=false;}if(V&&!V.handledMouseOverEvent&&!V.cfg.getProperty("disabled")&&(N==V.element||C.isAncestor(V.element,N))){Q=this.cfg.getProperty("showdelay");U=(Q>0);if(U){this._cancelShowDelay();}P=this.activeItem;if(P){P.cfg.setProperty("selected",false);}T=V.cfg;T.setProperty("selected",true);if(this.hasFocus()){V.focus();}if(this.cfg.getProperty("autosubmenudisplay")){S=T.getProperty("submenu");if(S){if(U){this._execShowDelay(S);}else{S.show();}}}V.handledMouseOverEvent=true;V.handledMouseOutEvent=false;}},_onMouseOut:function(V,P){if(this._bStopMouseEventHandlers){return false;}var W=P[0],T=P[1],Q=M.getRelatedTarget(W),U=false,S,R,N,O;if(T&&!T.cfg.getProperty("disabled")){S=T.cfg;R=S.getProperty("submenu");if(R&&(Q==R.element||C.isAncestor(R.element,Q))){U=true;}if(!T.handledMouseOutEvent&&((Q!=T.element&&!C.isAncestor(T.element,Q))||U)){if(!U){T.cfg.setProperty("selected",false);if(R){N=this.cfg.getProperty("submenuhidedelay");O=this.cfg.getProperty("showdelay");if(!(this instanceof YAHOO.widget.MenuBar)&&N>0&&O>=N){this._execSubmenuHideDelay(R,M.getPageX(W),N);}else{R.hide();}}}T.handledMouseOutEvent=true;T.handledMouseOverEvent=false;}}if(!this._bHandledMouseOutEvent&&((Q!=this.element&&!C.isAncestor(this.element,Q))||U)){M.removeListener(this.element,"mousemove",this._onMouseMove);this._nCurrentMouseX=M.getPageX(W);this._bHandledMouseOutEvent=true;this._bHandledMouseOverEvent=false;}},_onMouseMove:function(O,N){if(this._bStopMouseEventHandlers){return false;}this._nCurrentMouseX=M.getPageX(O);},_onClick:function(Y,Q){var W=YAHOO.util.Event,P=YAHOO.util.Dom,Z=Q[0],T=Q[1],R,V=false,O,N,S,U,X;if(T){if(T.cfg.getProperty("disabled")){W.preventDefault(Z);}else{R=T.cfg.getProperty("submenu");S=T.cfg.getProperty("url");if(S){U=S.indexOf("#");X=S.length;if(U!=-1){S=S.substr(U,X);X=S.length;if(X>1){N=S.substr(1,X);V=P.isAncestor(this.element,N);}else{if(X===1){V=true;}}}}if(V&&!T.cfg.getProperty("target")){W.preventDefault(Z);if(H.webkit){T.focus();}else{T.focusEvent.fire();}}if(!R){O=this.getRoot();if(O instanceof YAHOO.widget.MenuBar||O.cfg.getProperty("position")=="static"){O.clearActiveItem();}else{O.hide();}}}}},_onKeyDown:function(b,V){var Y=V[0],X=V[1],f=this,U,Z,O,S,c,N,e,R,a,Q,W,d,T;function P(){f._bStopMouseEventHandlers=true;window.setTimeout(function(){f._bStopMouseEventHandlers=false;},10);}if(X&&!X.cfg.getProperty("disabled")){Z=X.cfg;O=this.parent;switch(Y.keyCode){case 38:case 40:c=(Y.keyCode==38)?X.getPreviousEnabledSibling():X.getNextEnabledSibling();if(c){this.clearActiveItem();c.cfg.setProperty("selected",true);c.focus();if(this.cfg.getProperty("maxheight")>0){N=this.body;e=N.scrollTop;R=N.offsetHeight;a=this.getItems();Q=a.length-1;W=c.element.offsetTop;if(Y.keyCode==40){if(W>=(R+e)){N.scrollTop=W-R;}else{if(W<=e){N.scrollTop=0;}}if(c==a[Q]){N.scrollTop=c.element.offsetTop;}}else{if(W<=e){N.scrollTop=W-c.element.offsetHeight;}else{if(W>=(e+R)){N.scrollTop=W;}}if(c==a[0]){N.scrollTop=0;}}e=N.scrollTop;d=N.scrollHeight-N.offsetHeight;if(e===0){this._disableScrollHeader();this._enableScrollFooter();}else{if(e==d){this._enableScrollHeader();this._disableScrollFooter();}else{this._enableScrollHeader();this._enableScrollFooter();}}}}M.preventDefault(Y);P();break;case 39:U=Z.getProperty("submenu");if(U){if(!Z.getProperty("selected")){Z.setProperty("selected",true);}U.show();U.setInitialFocus();U.setInitialSelection();}else{S=this.getRoot();if(S instanceof YAHOO.widget.MenuBar){c=S.activeItem.getNextEnabledSibling();if(c){S.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");if(U){U.show();}c.focus();}}}M.preventDefault(Y);P();break;case 37:if(O){T=O.parent;if(T instanceof YAHOO.widget.MenuBar){c=T.activeItem.getPreviousEnabledSibling();if(c){T.clearActiveItem();c.cfg.setProperty("selected",true);U=c.cfg.getProperty("submenu");if(U){U.show();}c.focus();}}else{this.hide();O.focus();}}M.preventDefault(Y);P();break;}}if(Y.keyCode==27){if(this.cfg.getProperty("position")=="dynamic"){this.hide();if(this.parent){this.parent.focus();}}else{if(this.activeItem){U=this.activeItem.cfg.getProperty("submenu");if(U&&U.cfg.getProperty("visible")){U.hide();this.activeItem.focus();}else{this.activeItem.blur();this.activeItem.cfg.setProperty("selected",false);
}}}M.preventDefault(Y);}},_onKeyPress:function(P,O){var N=O[0];if(N.keyCode==40||N.keyCode==38){M.preventDefault(N);}},_onYChange:function(O,N){var Q=this.parent,S,P,R;if(Q){S=Q.parent.body.scrollTop;if(S>0){R=(this.cfg.getProperty("y")-S);C.setY(this.element,R);P=this.iframe;if(P){C.setY(P,R);}this.cfg.setProperty("y",R,true);}}},_onScrollTargetMouseOver:function(T,W){this._cancelHideDelay();var P=M.getTarget(T),R=this.body,V=this,Q=this.cfg.getProperty("scrollincrement"),N,O;function U(){var X=R.scrollTop;if(X<N){R.scrollTop=(X+Q);V._enableScrollHeader();}else{R.scrollTop=N;window.clearInterval(V._nBodyScrollId);V._disableScrollFooter();}}function S(){var X=R.scrollTop;if(X>0){R.scrollTop=(X-Q);V._enableScrollFooter();}else{R.scrollTop=0;window.clearInterval(V._nBodyScrollId);V._disableScrollHeader();}}if(C.hasClass(P,"hd")){O=S;}else{N=R.scrollHeight-R.offsetHeight;O=U;}this._nBodyScrollId=window.setInterval(O,10);},_onScrollTargetMouseOut:function(O,N){window.clearInterval(this._nBodyScrollId);this._cancelHideDelay();},_onInit:function(O,N){this.cfg.subscribeToConfigEvent("visible",this._onVisibleChange);var P=!this.parent,Q=this.lazyLoad;if(((P&&!Q)||(P&&(this.cfg.getProperty("visible")||this.cfg.getProperty("position")=="static"))||(!P&&!Q))&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){this.addItems(this.itemData);}}else{if(Q){this.cfg.fireQueue();}}},_onBeforeRender:function(Q,P){var R=this.element,U=this._aListElements.length,O=true,T=0,N,S;if(U>0){do{N=this._aListElements[T];if(N){if(O){C.addClass(N,"first-of-type");O=false;}if(!C.isAncestor(R,N)){this.appendToBody(N);}S=this._aGroupTitleElements[T];if(S){if(!C.isAncestor(R,S)){N.parentNode.insertBefore(S,N);}C.addClass(N,"hastitle");}}T++;}while(T<U);}},_onRender:function(O,N){if(this.cfg.getProperty("position")=="dynamic"){if(!this.cfg.getProperty("visible")){this.positionOffScreen();}}},_onBeforeShow:function(W,R){var V,O,S,Q,T;if(this.lazyLoad&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()=="SELECT"){V=this.itemData.length;for(O=0;O<V;O++){if(this.itemData[O].tagName){this.addItem((new this.ITEM_TYPE(this.itemData[O])));}}}else{this.addItems(this.itemData);}}T=this.srcElement;if(T){if(T.tagName.toUpperCase()=="SELECT"){if(C.inDocument(T)){this.render(T.parentNode);}else{this.render(this.cfg.getProperty("container"));}}else{this.render();}}else{if(this.parent){this.render(this.parent.element);}else{this.render(this.cfg.getProperty("container"));}}}var P=this.cfg.getProperty("maxheight"),N=this.cfg.getProperty("minscrollheight"),U=this.cfg.getProperty("position")=="dynamic";if(!this.parent&&U){this.cfg.refireEvent("xy");}function X(){this.cfg.setProperty("maxheight",0);this.hideEvent.unsubscribe(X);}if(!(this instanceof YAHOO.widget.MenuBar)&&U){if(P===0){S=C.getViewportHeight();if(this.parent&&this.parent.parent instanceof YAHOO.widget.MenuBar){Q=YAHOO.util.Region.getRegion(this.parent.element);S=(S-Q.bottom);}if(this.element.offsetHeight>=S){P=(S-(B.VIEWPORT_OFFSET*2));if(P<N){P=N;}this.cfg.setProperty("maxheight",P);this.hideEvent.subscribe(X);}}}},_onShow:function(Q,P){var T=this.parent,S,N,O;function R(V){var U;if(V.type=="mousedown"||(V.type=="keydown"&&V.keyCode==27)){U=M.getTarget(V);if(U!=S.element||!C.isAncestor(S.element,U)){S.cfg.setProperty("autosubmenudisplay",false);M.removeListener(document,"mousedown",R);M.removeListener(document,"keydown",R);}}}if(T){S=T.parent;N=S.cfg.getProperty("submenualignment");O=this.cfg.getProperty("submenualignment");if((N[0]!=O[0])&&(N[1]!=O[1])){this.cfg.setProperty("submenualignment",[N[0],N[1]]);}if(!S.cfg.getProperty("autosubmenudisplay")&&(S instanceof YAHOO.widget.MenuBar||S.cfg.getProperty("position")=="static")){S.cfg.setProperty("autosubmenudisplay",true);M.on(document,"mousedown",R);M.on(document,"keydown",R);}}},_onBeforeHide:function(P,O){var N=this.activeItem,R,Q;if(N){R=N.cfg;R.setProperty("selected",false);Q=R.getProperty("submenu");if(Q){Q.hide();}}if(this.getRoot()==this){this.blur();}},_onParentMenuConfigChange:function(O,N,R){var P=N[0][0],Q=N[0][1];switch(P){case"iframe":case"constraintoviewport":case"hidedelay":case"showdelay":case"submenuhidedelay":case"clicktohide":case"effect":case"classname":case"scrollincrement":case"minscrollheight":R.cfg.setProperty(P,Q);break;}},_onParentMenuRender:function(O,N,S){var P=S.parent.parent.cfg,Q={constraintoviewport:P.getProperty("constraintoviewport"),xy:[0,0],clicktohide:P.getProperty("clicktohide"),effect:P.getProperty("effect"),showdelay:P.getProperty("showdelay"),hidedelay:P.getProperty("hidedelay"),submenuhidedelay:P.getProperty("submenuhidedelay"),classname:P.getProperty("classname"),scrollincrement:P.getProperty("scrollincrement"),minscrollheight:P.getProperty("minscrollheight"),iframe:P.getProperty("iframe")},R;S.cfg.applyConfig(Q);if(!this.lazyLoad){R=this.parent.element;if(this.element.parentNode==R){this.render();}else{this.render(R);}}},_onSubmenuBeforeShow:function(P,O){var Q=this.parent,N=Q.parent.cfg.getProperty("submenualignment");if(!this.cfg.getProperty("context")){this.cfg.setProperty("context",[Q.element,N[0],N[1]]);}else{this.align();}},_onMenuItemFocus:function(O,N){this.parent.focusEvent.fire(this);},_onMenuItemBlur:function(O,N){this.parent.blurEvent.fire(this);},_onMenuItemDestroy:function(P,O,N){this._removeItemFromGroupByValue(N.groupIndex,N);},_onMenuItemConfigChange:function(P,O,N){var R=O[0][0],S=O[0][1],Q;switch(R){case"selected":if(S===true){this.activeItem=N;}break;case"submenu":Q=O[0][1];if(Q){this._configureSubmenu(N);}break;}},enforceConstraints:function(P,N,T){YAHOO.widget.Menu.superclass.enforceConstraints.apply(this,arguments);var S=this.parent,O,R,Q,U;if(S){O=S.parent;if(!(O instanceof YAHOO.widget.MenuBar)){R=O.cfg.getProperty("x");U=this.cfg.getProperty("x");if(U<(R+S.element.offsetWidth)){Q=(R-this.element.offsetWidth);
this.cfg.setProperty("x",Q,true);this.cfg.setProperty("xy",[Q,(this.cfg.getProperty("y"))],true);}}}},configVisible:function(P,O,Q){var N,R;if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configVisible.call(this,P,O,Q);}else{N=O[0];R=C.getStyle(this.element,"display");C.setStyle(this.element,"visibility","visible");if(N){if(R!="block"){this.beforeShowEvent.fire();C.setStyle(this.element,"display","block");this.showEvent.fire();}}else{if(R=="block"){this.beforeHideEvent.fire();C.setStyle(this.element,"display","none");this.hideEvent.fire();}}}},configPosition:function(P,O,S){var R=this.element,Q=O[0]=="static"?"static":"absolute",T=this.cfg,N;C.setStyle(R,"position",Q);if(Q=="static"){C.setStyle(R,"display","block");T.setProperty("visible",true);}else{C.setStyle(R,"visibility","hidden");}if(Q=="absolute"){N=T.getProperty("zindex");if(!N||N===0){N=this.parent?(this.parent.parent.cfg.getProperty("zindex")+1):1;T.setProperty("zindex",N);}}},configIframe:function(O,N,P){if(this.cfg.getProperty("position")=="dynamic"){F.superclass.configIframe.call(this,O,N,P);}},configHideDelay:function(O,N,R){var T=N[0],S=this.mouseOutEvent,P=this.mouseOverEvent,Q=this.keyDownEvent;if(T>0){if(!this._bHideDelayEventHandlersAssigned){S.subscribe(this._execHideDelay);P.subscribe(this._cancelHideDelay);Q.subscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=true;}}else{S.unsubscribe(this._execHideDelay);P.unsubscribe(this._cancelHideDelay);Q.unsubscribe(this._cancelHideDelay);this._bHideDelayEventHandlersAssigned=false;}},configContainer:function(O,N,Q){var P=N[0];if(typeof P=="string"){this.cfg.setProperty("container",document.getElementById(P),true);}},_setMaxHeight:function(O,N,P){this.cfg.setProperty("maxheight",P);this.renderEvent.unsubscribe(this._setMaxHeight);},configMaxHeight:function(a,U,X){var T=U[0],Q=this.element,R=this.body,Y=this.header,O=this.footer,W=this._onScrollTargetMouseOver,b=this._onScrollTargetMouseOut,N=this.cfg.getProperty("minscrollheight"),V,S,P;if(T!==0&&T<N){T=N;}if(this.lazyLoad&&!R){this.renderEvent.unsubscribe(this._setMaxHeight);if(T>0){this.renderEvent.subscribe(this._setMaxHeight,T,this);}return ;}C.setStyle(R,"height","");C.removeClass(R,"yui-menu-body-scrolled");var Z=((H.gecko&&this.parent&&this.parent.parent&&this.parent.parent.cfg.getProperty("position")=="dynamic")||H.ie);if(Z){if(!this.cfg.getProperty("width")){S=Q.offsetWidth;Q.style.width=S+"px";P=(S-(Q.offsetWidth-S))+"px";this.cfg.setProperty("width",P);}}if(!Y&&!O){this.setHeader("&#32;");this.setFooter("&#32;");Y=this.header;O=this.footer;C.addClass(Y,"topscrollbar");C.addClass(O,"bottomscrollbar");Q.insertBefore(Y,R);Q.appendChild(O);}V=(T-(Y.offsetHeight+Y.offsetHeight));if(V>0&&(R.offsetHeight>T)){C.addClass(R,"yui-menu-body-scrolled");C.setStyle(R,"height",(V+"px"));M.on(Y,"mouseover",W,this,true);M.on(Y,"mouseout",b,this,true);M.on(O,"mouseover",W,this,true);M.on(O,"mouseout",b,this,true);this._disableScrollHeader();this._enableScrollFooter();}else{if(Y&&O){if(Z){this.cfg.setProperty("width","");}this._enableScrollHeader();this._enableScrollFooter();M.removeListener(Y,"mouseover",W);M.removeListener(Y,"mouseout",b);M.removeListener(O,"mouseover",W);M.removeListener(O,"mouseout",b);Q.removeChild(Y);Q.removeChild(O);this.header=null;this.footer=null;}}this.cfg.refireEvent("iframe");},configClassName:function(P,O,Q){var N=O[0];if(this._sClassName){C.removeClass(this.element,this._sClassName);}C.addClass(this.element,N);this._sClassName=N;},_onItemAdded:function(O,N){var P=N[0];if(P){P.cfg.setProperty("disabled",true);}},configDisabled:function(P,O,S){var R=O[0],N=this.getItems(),T,Q;if(E.isArray(N)){T=N.length;if(T>0){Q=T-1;do{N[Q].cfg.setProperty("disabled",R);}while(Q--);}if(R){this.clearActiveItem(true);C.addClass(this.element,"disabled");this.itemAddedEvent.subscribe(this._onItemAdded);}else{C.removeClass(this.element,"disabled");this.itemAddedEvent.unsubscribe(this._onItemAdded);}}},onRender:function(R,Q){function S(){var W=this.element,V=this._shadow;if(V&&W){V.style.width=(W.offsetWidth+6)+"px";V.style.height=(W.offsetHeight+1)+"px";}}function U(){this.element.appendChild(this._shadow);}function O(){C.addClass(this._shadow,"yui-menu-shadow-visible");}function N(){C.removeClass(this._shadow,"yui-menu-shadow-visible");}function T(){var W=this._shadow,V,X;if(!W){V=this.element;X=this;if(!G){G=document.createElement("div");G.className="yui-menu-shadow yui-menu-shadow-visible";}W=G.cloneNode(false);V.appendChild(W);this._shadow=W;this.beforeShowEvent.subscribe(O);this.beforeHideEvent.subscribe(N);if(H.ie){window.setTimeout(function(){S.call(X);X.syncIframe();},0);this.cfg.subscribeToConfigEvent("width",S);this.cfg.subscribeToConfigEvent("height",S);this.cfg.subscribeToConfigEvent("maxheight",S);this.changeContentEvent.subscribe(S);D.textResizeEvent.subscribe(S,X,true);this.destroyEvent.subscribe(function(){D.textResizeEvent.unsubscribe(S,X);});}this.cfg.subscribeToConfigEvent("maxheight",U);}}function P(){T.call(this);this.beforeShowEvent.unsubscribe(P);}if(this.cfg.getProperty("position")=="dynamic"){if(this.cfg.getProperty("visible")){T.call(this);}else{this.beforeShowEvent.subscribe(P);}}},initEvents:function(){F.superclass.initEvents.call(this);var N=L.LIST;this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);this.mouseOverEvent.signature=N;this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);this.mouseOutEvent.signature=N;this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);this.mouseDownEvent.signature=N;this.mouseUpEvent=this.createEvent(A.MOUSE_UP);this.mouseUpEvent.signature=N;this.clickEvent=this.createEvent(A.CLICK);this.clickEvent.signature=N;this.keyPressEvent=this.createEvent(A.KEY_PRESS);this.keyPressEvent.signature=N;this.keyDownEvent=this.createEvent(A.KEY_DOWN);this.keyDownEvent.signature=N;this.keyUpEvent=this.createEvent(A.KEY_UP);this.keyUpEvent.signature=N;this.focusEvent=this.createEvent(A.FOCUS);this.focusEvent.signature=N;this.blurEvent=this.createEvent(A.BLUR);this.blurEvent.signature=N;
this.itemAddedEvent=this.createEvent(A.ITEM_ADDED);this.itemAddedEvent.signature=N;this.itemRemovedEvent=this.createEvent(A.ITEM_REMOVED);this.itemRemovedEvent.signature=N;},positionOffScreen:function(){var O=this.iframe,N=this.OFF_SCREEN_POSITION;C.setXY(this.element,N);if(O){C.setXY(O,N);}},getRoot:function(){var O=this.parent,N;if(O){N=O.parent;return N?N.getRoot():this;}else{return this;}},toString:function(){var O="Menu",N=this.id;if(N){O+=(" "+N);}return O;},setItemGroupTitle:function(S,R){var Q,P,O,N;if(typeof S=="string"&&S.length>0){Q=typeof R=="number"?R:0;P=this._aGroupTitleElements[Q];if(P){P.innerHTML=S;}else{P=document.createElement(this.GROUP_TITLE_TAG_NAME);P.innerHTML=S;this._aGroupTitleElements[Q]=P;}O=this._aGroupTitleElements.length-1;do{if(this._aGroupTitleElements[O]){C.removeClass(this._aGroupTitleElements[O],"first-of-type");N=O;}}while(O--);if(N!==null){C.addClass(this._aGroupTitleElements[N],"first-of-type");}this.changeContentEvent.fire();}},addItem:function(N,O){if(N){return this._addItemToGroup(O,N);}},addItems:function(Q,P){var S,N,R,O;if(E.isArray(Q)){S=Q.length;N=[];for(O=0;O<S;O++){R=Q[O];if(R){if(E.isArray(R)){N[N.length]=this.addItems(R,O);}else{N[N.length]=this._addItemToGroup(P,R);}}}if(N.length){return N;}}},insertItem:function(N,O,P){if(N){return this._addItemToGroup(P,N,O);}},removeItem:function(N,O){var P;if(typeof N!="undefined"){if(N instanceof YAHOO.widget.MenuItem){P=this._removeItemFromGroupByValue(O,N);}else{if(typeof N=="number"){P=this._removeItemFromGroupByIndex(O,N);}}if(P){P.destroy();return P;}}},getItems:function(){var P=this._aItemGroups,O,N=[];if(E.isArray(P)){O=P.length;return((O==1)?P[0]:(Array.prototype.concat.apply(N,P)));}},getItemGroups:function(){return this._aItemGroups;},getItem:function(N,O){var P;if(typeof N=="number"){P=this._getItemGroup(O);if(P){return P[N];}}},getSubmenus:function(){var O=this.getItems(),S=O.length,N,P,R,Q;if(S>0){N=[];for(Q=0;Q<S;Q++){R=O[Q];if(R){P=R.cfg.getProperty("submenu");if(P){N[N.length]=P;}}}}return N;},clearContent:function(){var R=this.getItems(),O=R.length,P=this.element,Q=this.body,V=this.header,N=this.footer,U,T,S;if(O>0){S=O-1;do{U=R[S];if(U){T=U.cfg.getProperty("submenu");if(T){this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange,T);this.renderEvent.unsubscribe(this._onParentMenuRender,T);}this.removeItem(U);}}while(S--);}if(V){M.purgeElement(V);P.removeChild(V);}if(N){M.purgeElement(N);P.removeChild(N);}if(Q){M.purgeElement(Q);Q.innerHTML="";}this.activeItem=null;this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];this.cfg.setProperty("width",null);},destroy:function(){this.clearContent();this._aItemGroups=null;this._aListElements=null;this._aGroupTitleElements=null;F.superclass.destroy.call(this);},setInitialFocus:function(){var N=this._getFirstEnabledItem();if(N){N.focus();}},setInitialSelection:function(){var N=this._getFirstEnabledItem();if(N){N.cfg.setProperty("selected",true);}},clearActiveItem:function(P){if(this.cfg.getProperty("showdelay")>0){this._cancelShowDelay();}var N=this.activeItem,Q,O;if(N){Q=N.cfg;if(P){N.blur();}Q.setProperty("selected",false);O=Q.getProperty("submenu");if(O){O.hide();}this.activeItem=null;}},focus:function(){if(!this.hasFocus()){this.setInitialFocus();}},blur:function(){var N;if(this.hasFocus()){N=K.getFocusedMenuItem();if(N){N.blur();}}},hasFocus:function(){return(K.getFocusedMenu()==this.getRoot());},subscribe:function(){function Q(V,U,X){var Y=U[0],W=Y.cfg.getProperty("submenu");if(W){W.subscribe.apply(W,X);}}function T(V,U,X){var W=this.cfg.getProperty("submenu");if(W){W.subscribe.apply(W,X);}}F.superclass.subscribe.apply(this,arguments);F.superclass.subscribe.call(this,"itemAdded",Q,arguments);var N=this.getItems(),S,R,O,P;if(N){S=N.length;if(S>0){P=S-1;do{R=N[P];O=R.cfg.getProperty("submenu");if(O){O.subscribe.apply(O,arguments);}else{R.cfg.subscribeToConfigEvent("submenu",T,arguments);}}while(P--);}}},initDefaultConfig:function(){F.superclass.initDefaultConfig.call(this);var N=this.cfg;N.addProperty(J.VISIBLE.key,{handler:this.configVisible,value:J.VISIBLE.value,validator:J.VISIBLE.validator});N.addProperty(J.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:J.CONSTRAIN_TO_VIEWPORT.value,validator:J.CONSTRAIN_TO_VIEWPORT.validator,supercedes:J.CONSTRAIN_TO_VIEWPORT.supercedes});N.addProperty(J.POSITION.key,{handler:this.configPosition,value:J.POSITION.value,validator:J.POSITION.validator,supercedes:J.POSITION.supercedes});N.addProperty(J.SUBMENU_ALIGNMENT.key,{value:J.SUBMENU_ALIGNMENT.value,suppressEvent:J.SUBMENU_ALIGNMENT.suppressEvent});N.addProperty(J.AUTO_SUBMENU_DISPLAY.key,{value:J.AUTO_SUBMENU_DISPLAY.value,validator:J.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:J.AUTO_SUBMENU_DISPLAY.suppressEvent});N.addProperty(J.SHOW_DELAY.key,{value:J.SHOW_DELAY.value,validator:J.SHOW_DELAY.validator,suppressEvent:J.SHOW_DELAY.suppressEvent});N.addProperty(J.HIDE_DELAY.key,{handler:this.configHideDelay,value:J.HIDE_DELAY.value,validator:J.HIDE_DELAY.validator,suppressEvent:J.HIDE_DELAY.suppressEvent});N.addProperty(J.SUBMENU_HIDE_DELAY.key,{value:J.SUBMENU_HIDE_DELAY.value,validator:J.SUBMENU_HIDE_DELAY.validator,suppressEvent:J.SUBMENU_HIDE_DELAY.suppressEvent});N.addProperty(J.CLICK_TO_HIDE.key,{value:J.CLICK_TO_HIDE.value,validator:J.CLICK_TO_HIDE.validator,suppressEvent:J.CLICK_TO_HIDE.suppressEvent});N.addProperty(J.CONTAINER.key,{handler:this.configContainer,value:document.body,suppressEvent:J.CONTAINER.suppressEvent});N.addProperty(J.SCROLL_INCREMENT.key,{value:J.SCROLL_INCREMENT.value,validator:J.SCROLL_INCREMENT.validator,supercedes:J.SCROLL_INCREMENT.supercedes,suppressEvent:J.SCROLL_INCREMENT.suppressEvent});N.addProperty(J.MIN_SCROLL_HEIGHT.key,{value:J.MIN_SCROLL_HEIGHT.value,validator:J.MIN_SCROLL_HEIGHT.validator,supercedes:J.MIN_SCROLL_HEIGHT.supercedes,suppressEvent:J.MIN_SCROLL_HEIGHT.suppressEvent});N.addProperty(J.MAX_HEIGHT.key,{handler:this.configMaxHeight,value:J.MAX_HEIGHT.value,validator:J.MAX_HEIGHT.validator,suppressEvent:J.MAX_HEIGHT.suppressEvent,supercedes:J.MAX_HEIGHT.supercedes});
N.addProperty(J.CLASS_NAME.key,{handler:this.configClassName,value:J.CLASS_NAME.value,validator:J.CLASS_NAME.validator,supercedes:J.CLASS_NAME.supercedes});N.addProperty(J.DISABLED.key,{handler:this.configDisabled,value:J.DISABLED.value,validator:J.DISABLED.validator,suppressEvent:J.DISABLED.suppressEvent});}});})();(function(){YAHOO.widget.MenuItem=function(K,J){if(K){if(J){this.parent=J.parent;this.value=J.value;this.id=J.id;}this.init(K,J);}};var B=YAHOO.util.Dom,C=YAHOO.widget.Module,E=YAHOO.widget.Menu,H=YAHOO.widget.MenuItem,I=YAHOO.util.CustomEvent,F=YAHOO.lang,D,A={"MOUSE_OVER":"mouseover","MOUSE_OUT":"mouseout","MOUSE_DOWN":"mousedown","MOUSE_UP":"mouseup","CLICK":"click","KEY_PRESS":"keypress","KEY_DOWN":"keydown","KEY_UP":"keyup","ITEM_ADDED":"itemAdded","ITEM_REMOVED":"itemRemoved","FOCUS":"focus","BLUR":"blur","DESTROY":"destroy"},G={"TEXT":{key:"text",value:"",validator:F.isString,suppressEvent:true},"HELP_TEXT":{key:"helptext",supercedes:["text"],suppressEvent:true},"URL":{key:"url",value:"#",suppressEvent:true},"TARGET":{key:"target",suppressEvent:true},"EMPHASIS":{key:"emphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"STRONG_EMPHASIS":{key:"strongemphasis",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text"]},"CHECKED":{key:"checked",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["disabled","selected"]},"SUBMENU":{key:"submenu",suppressEvent:true,supercedes:["disabled","selected"]},"DISABLED":{key:"disabled",value:false,validator:F.isBoolean,suppressEvent:true,supercedes:["text","selected"]},"SELECTED":{key:"selected",value:false,validator:F.isBoolean,suppressEvent:true},"ONCLICK":{key:"onclick",suppressEvent:true},"CLASS_NAME":{key:"classname",value:null,validator:F.isString,suppressEvent:true}};H.prototype={CSS_CLASS_NAME:"yuimenuitem",CSS_LABEL_CLASS_NAME:"yuimenuitemlabel",SUBMENU_TYPE:null,_oAnchor:null,_oHelpTextEM:null,_oSubmenu:null,_oOnclickAttributeValue:null,_sClassName:null,constructor:H,index:null,groupIndex:null,parent:null,element:null,srcElement:null,value:null,browser:C.prototype.browser,id:null,destroyEvent:null,mouseOverEvent:null,mouseOutEvent:null,mouseDownEvent:null,mouseUpEvent:null,clickEvent:null,keyPressEvent:null,keyDownEvent:null,keyUpEvent:null,focusEvent:null,blurEvent:null,init:function(J,R){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=E;}this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();var O=I.LIST,N=this.cfg,P="#",Q,K,M,L;if(F.isString(J)){this._createRootNodeStructure();N.queueProperty("text",J);}else{if(J&&J.tagName){switch(J.tagName.toUpperCase()){case"OPTION":this._createRootNodeStructure();N.queueProperty("text",J.text);N.queueProperty("disabled",J.disabled);this.value=J.value;this.srcElement=J;break;case"OPTGROUP":this._createRootNodeStructure();N.queueProperty("text",J.label);N.queueProperty("disabled",J.disabled);this.srcElement=J;this._initSubTree();break;case"LI":Q=B.getFirstChild(J);if(Q){P=Q.getAttribute("href",2);K=Q.getAttribute("target");M=Q.innerHTML;}this.srcElement=J;this.element=J;this._oAnchor=Q;N.setProperty("text",M,true);N.setProperty("url",P,true);N.setProperty("target",K,true);this._initSubTree();break;}}}if(this.element){L=(this.srcElement||this.element).id;if(!L){L=this.id||B.generateId();this.element.id=L;}this.id=L;B.addClass(this.element,this.CSS_CLASS_NAME);B.addClass(this._oAnchor,this.CSS_LABEL_CLASS_NAME);this.mouseOverEvent=this.createEvent(A.MOUSE_OVER);this.mouseOverEvent.signature=O;this.mouseOutEvent=this.createEvent(A.MOUSE_OUT);this.mouseOutEvent.signature=O;this.mouseDownEvent=this.createEvent(A.MOUSE_DOWN);this.mouseDownEvent.signature=O;this.mouseUpEvent=this.createEvent(A.MOUSE_UP);this.mouseUpEvent.signature=O;this.clickEvent=this.createEvent(A.CLICK);this.clickEvent.signature=O;this.keyPressEvent=this.createEvent(A.KEY_PRESS);this.keyPressEvent.signature=O;this.keyDownEvent=this.createEvent(A.KEY_DOWN);this.keyDownEvent.signature=O;this.keyUpEvent=this.createEvent(A.KEY_UP);this.keyUpEvent.signature=O;this.focusEvent=this.createEvent(A.FOCUS);this.focusEvent.signature=O;this.blurEvent=this.createEvent(A.BLUR);this.blurEvent.signature=O;this.destroyEvent=this.createEvent(A.DESTROY);this.destroyEvent.signature=O;if(R){N.applyConfig(R);}N.fireQueue();}},_createRootNodeStructure:function(){var J,K;if(!D){D=document.createElement("li");D.innerHTML='<a href="#"></a>';}J=D.cloneNode(true);J.className=this.CSS_CLASS_NAME;K=J.firstChild;K.className=this.CSS_LABEL_CLASS_NAME;this.element=J;this._oAnchor=K;},_initSubTree:function(){var P=this.srcElement,L=this.cfg,N,M,K,J,O;if(P.childNodes.length>0){if(this.parent.lazyLoad&&this.parent.srcElement&&this.parent.srcElement.tagName.toUpperCase()=="SELECT"){L.setProperty("submenu",{id:B.generateId(),itemdata:P.childNodes});}else{N=P.firstChild;M=[];do{if(N&&N.tagName){switch(N.tagName.toUpperCase()){case"DIV":L.setProperty("submenu",N);break;case"OPTION":M[M.length]=N;break;}}}while((N=N.nextSibling));K=M.length;if(K>0){J=new this.SUBMENU_TYPE(B.generateId());L.setProperty("submenu",J);for(O=0;O<K;O++){J.addItem((new J.ITEM_TYPE(M[O])));}}}}},configText:function(S,L,N){var K=L[0],M=this.cfg,Q=this._oAnchor,J=M.getProperty("helptext"),R="",O="",P="";if(K){if(J){R='<em class="helptext">'+J+"</em>";}if(M.getProperty("emphasis")){O="<em>";P="</em>";}if(M.getProperty("strongemphasis")){O="<strong>";P="</strong>";}Q.innerHTML=(O+K+P+R);}},configHelpText:function(L,K,J){this.cfg.refireEvent("text");},configURL:function(L,K,J){var N=K[0];if(!N){N="#";}var M=this._oAnchor;if(YAHOO.env.ua.opera){M.removeAttribute("href");}M.setAttribute("href",N);},configTarget:function(M,L,K){var J=L[0],N=this._oAnchor;if(J&&J.length>0){N.setAttribute("target",J);}else{N.removeAttribute("target");}},configEmphasis:function(L,K,J){var N=K[0],M=this.cfg;if(N&&M.getProperty("strongemphasis")){M.setProperty("strongemphasis",false);}M.refireEvent("text");},configStrongEmphasis:function(M,L,K){var J=L[0],N=this.cfg;
if(J&&N.getProperty("emphasis")){N.setProperty("emphasis",false);}N.refireEvent("text");},configChecked:function(S,M,O){var R=M[0],K=this.element,Q=this._oAnchor,N=this.cfg,J="-checked",L=this.CSS_CLASS_NAME+J,P=this.CSS_LABEL_CLASS_NAME+J;if(R){B.addClass(K,L);B.addClass(Q,P);}else{B.removeClass(K,L);B.removeClass(Q,P);}N.refireEvent("text");if(N.getProperty("disabled")){N.refireEvent("disabled");}if(N.getProperty("selected")){N.refireEvent("selected");}},configDisabled:function(X,R,a){var Z=R[0],L=this.cfg,P=L.getProperty("submenu"),O=L.getProperty("checked"),S=this.element,V=this._oAnchor,U="-disabled",W="-checked"+U,Y="-hassubmenu"+U,M=this.CSS_CLASS_NAME+U,N=this.CSS_LABEL_CLASS_NAME+U,T=this.CSS_CLASS_NAME+W,Q=this.CSS_LABEL_CLASS_NAME+W,K=this.CSS_CLASS_NAME+Y,J=this.CSS_LABEL_CLASS_NAME+Y;if(Z){if(L.getProperty("selected")){L.setProperty("selected",false);}B.addClass(S,M);B.addClass(V,N);if(P){B.addClass(S,K);B.addClass(V,J);}if(O){B.addClass(S,T);B.addClass(V,Q);}}else{B.removeClass(S,M);B.removeClass(V,N);if(P){B.removeClass(S,K);B.removeClass(V,J);}if(O){B.removeClass(S,T);B.removeClass(V,Q);}}},configSelected:function(X,R,a){var L=this.cfg,Y=R[0],S=this.element,V=this._oAnchor,O=L.getProperty("checked"),P=L.getProperty("submenu"),U="-selected",W="-checked"+U,Z="-hassubmenu"+U,M=this.CSS_CLASS_NAME+U,N=this.CSS_LABEL_CLASS_NAME+U,T=this.CSS_CLASS_NAME+W,Q=this.CSS_LABEL_CLASS_NAME+W,K=this.CSS_CLASS_NAME+Z,J=this.CSS_LABEL_CLASS_NAME+Z;if(YAHOO.env.ua.opera){V.blur();}if(Y&&!L.getProperty("disabled")){B.addClass(S,M);B.addClass(V,N);if(P){B.addClass(S,K);B.addClass(V,J);}if(O){B.addClass(S,T);B.addClass(V,Q);}}else{B.removeClass(S,M);B.removeClass(V,N);if(P){B.removeClass(S,K);B.removeClass(V,J);}if(O){B.removeClass(S,T);B.removeClass(V,Q);}}if(this.hasFocus()&&YAHOO.env.ua.opera){V.focus();}},_onSubmenuBeforeHide:function(M,L){var N=this.parent,J;function K(){N._oAnchor.blur();J.beforeHideEvent.unsubscribe(K);}if(N.hasFocus()){J=N.parent;J.beforeHideEvent.subscribe(K);}},configSubmenu:function(V,O,R){var Q=O[0],P=this.cfg,K=this.element,T=this._oAnchor,N=this.parent&&this.parent.lazyLoad,J="-hassubmenu",L=this.CSS_CLASS_NAME+J,S=this.CSS_LABEL_CLASS_NAME+J,U,W,M;if(Q){if(Q instanceof E){U=Q;U.parent=this;U.lazyLoad=N;}else{if(typeof Q=="object"&&Q.id&&!Q.nodeType){W=Q.id;M=Q;M.lazyload=N;M.parent=this;U=new this.SUBMENU_TYPE(W,M);P.setProperty("submenu",U,true);}else{U=new this.SUBMENU_TYPE(Q,{lazyload:N,parent:this});P.setProperty("submenu",U,true);}}if(U){B.addClass(K,L);B.addClass(T,S);this._oSubmenu=U;if(YAHOO.env.ua.opera){U.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);}}}else{B.removeClass(K,L);B.removeClass(T,S);if(this._oSubmenu){this._oSubmenu.destroy();}}if(P.getProperty("disabled")){P.refireEvent("disabled");}if(P.getProperty("selected")){P.refireEvent("selected");}},configOnClick:function(L,K,J){var M=K[0];if(this._oOnclickAttributeValue&&(this._oOnclickAttributeValue!=M)){this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn,this._oOnclickAttributeValue.obj);this._oOnclickAttributeValue=null;}if(!this._oOnclickAttributeValue&&typeof M=="object"&&typeof M.fn=="function"){this.clickEvent.subscribe(M.fn,((!YAHOO.lang.isUndefined(M.obj))?M.obj:this),M.scope);this._oOnclickAttributeValue=M;}},configClassName:function(M,L,K){var J=L[0];if(this._sClassName){B.removeClass(this.element,this._sClassName);}B.addClass(this.element,J);this._sClassName=J;},initDefaultConfig:function(){var J=this.cfg;J.addProperty(G.TEXT.key,{handler:this.configText,value:G.TEXT.value,validator:G.TEXT.validator,suppressEvent:G.TEXT.suppressEvent});J.addProperty(G.HELP_TEXT.key,{handler:this.configHelpText,supercedes:G.HELP_TEXT.supercedes,suppressEvent:G.HELP_TEXT.suppressEvent});J.addProperty(G.URL.key,{handler:this.configURL,value:G.URL.value,suppressEvent:G.URL.suppressEvent});J.addProperty(G.TARGET.key,{handler:this.configTarget,suppressEvent:G.TARGET.suppressEvent});J.addProperty(G.EMPHASIS.key,{handler:this.configEmphasis,value:G.EMPHASIS.value,validator:G.EMPHASIS.validator,suppressEvent:G.EMPHASIS.suppressEvent,supercedes:G.EMPHASIS.supercedes});J.addProperty(G.STRONG_EMPHASIS.key,{handler:this.configStrongEmphasis,value:G.STRONG_EMPHASIS.value,validator:G.STRONG_EMPHASIS.validator,suppressEvent:G.STRONG_EMPHASIS.suppressEvent,supercedes:G.STRONG_EMPHASIS.supercedes});J.addProperty(G.CHECKED.key,{handler:this.configChecked,value:G.CHECKED.value,validator:G.CHECKED.validator,suppressEvent:G.CHECKED.suppressEvent,supercedes:G.CHECKED.supercedes});J.addProperty(G.DISABLED.key,{handler:this.configDisabled,value:G.DISABLED.value,validator:G.DISABLED.validator,suppressEvent:G.DISABLED.suppressEvent});J.addProperty(G.SELECTED.key,{handler:this.configSelected,value:G.SELECTED.value,validator:G.SELECTED.validator,suppressEvent:G.SELECTED.suppressEvent});J.addProperty(G.SUBMENU.key,{handler:this.configSubmenu,supercedes:G.SUBMENU.supercedes,suppressEvent:G.SUBMENU.suppressEvent});J.addProperty(G.ONCLICK.key,{handler:this.configOnClick,suppressEvent:G.ONCLICK.suppressEvent});J.addProperty(G.CLASS_NAME.key,{handler:this.configClassName,value:G.CLASS_NAME.value,validator:G.CLASS_NAME.validator,suppressEvent:G.CLASS_NAME.suppressEvent});},getNextEnabledSibling:function(){var L,O,J,N,M;function K(P,Q){return P[Q]||K(P,(Q+1));}if(this.parent instanceof E){L=this.groupIndex;O=this.parent.getItemGroups();if(this.index<(O[L].length-1)){J=K(O[L],(this.index+1));}else{if(L<(O.length-1)){N=L+1;}else{N=0;}M=K(O,N);J=K(M,0);}return(J.cfg.getProperty("disabled")||J.element.style.display=="none")?J.getNextEnabledSibling():J;}},getPreviousEnabledSibling:function(){var N,P,K,J,M;function O(Q,R){return Q[R]||O(Q,(R-1));}function L(Q,R){return Q[R]?R:L(Q,(R+1));}if(this.parent instanceof E){N=this.groupIndex;P=this.parent.getItemGroups();if(this.index>L(P[N],0)){K=O(P[N],(this.index-1));}else{if(N>L(P,0)){J=N-1;}else{J=P.length-1;}M=O(P,J);K=O(M,(M.length-1));}return(K.cfg.getProperty("disabled")||K.element.style.display=="none")?K.getPreviousEnabledSibling():K;
}},focus:function(){var N=this.parent,M=this._oAnchor,J=N.activeItem,L=this;function K(){try{if(YAHOO.env.ua.ie&&!document.hasFocus()){return ;}if(J){J.blurEvent.fire();}M.focus();L.focusEvent.fire();}catch(O){}}if(!this.cfg.getProperty("disabled")&&N&&N.cfg.getProperty("visible")&&this.element.style.display!="none"){window.setTimeout(K,0);}},blur:function(){var K=this.parent;if(!this.cfg.getProperty("disabled")&&K&&K.cfg.getProperty("visible")){var J=this;window.setTimeout(function(){try{J._oAnchor.blur();J.blurEvent.fire();}catch(L){}},0);}},hasFocus:function(){return(YAHOO.widget.MenuManager.getFocusedMenuItem()==this);},destroy:function(){var L=this.element,K,J;if(L){K=this.cfg.getProperty("submenu");if(K){K.destroy();}this.mouseOverEvent.unsubscribeAll();this.mouseOutEvent.unsubscribeAll();this.mouseDownEvent.unsubscribeAll();this.mouseUpEvent.unsubscribeAll();this.clickEvent.unsubscribeAll();this.keyPressEvent.unsubscribeAll();this.keyDownEvent.unsubscribeAll();this.keyUpEvent.unsubscribeAll();this.focusEvent.unsubscribeAll();this.blurEvent.unsubscribeAll();this.cfg.configChangedEvent.unsubscribeAll();J=L.parentNode;if(J){J.removeChild(L);this.destroyEvent.fire();}this.destroyEvent.unsubscribeAll();}},toString:function(){var K="MenuItem",J=this.id;if(J){K+=(" "+J);}return K;}};F.augmentProto(H,YAHOO.util.EventProvider);})();(function(){YAHOO.widget.ContextMenu=function(G,F){YAHOO.widget.ContextMenu.superclass.constructor.call(this,G,F);};var B=YAHOO.util.Event,E=YAHOO.widget.ContextMenu,D={"TRIGGER_CONTEXT_MENU":"triggerContextMenu","CONTEXT_MENU":(YAHOO.env.ua.opera?"mousedown":"contextmenu"),"CLICK":"click"},C={"TRIGGER":{key:"trigger",suppressEvent:true}};function A(G,F,H){this.cfg.setProperty("xy",H);this.beforeShowEvent.unsubscribe(A,H);}YAHOO.lang.extend(E,YAHOO.widget.Menu,{_oTrigger:null,_bCancelled:false,contextEventTarget:null,triggerContextMenuEvent:null,init:function(G,F){E.superclass.init.call(this,G);this.beforeInitEvent.fire(E);if(F){this.cfg.applyConfig(F,true);}this.initEvent.fire(E);},initEvents:function(){E.superclass.initEvents.call(this);this.triggerContextMenuEvent=this.createEvent(D.TRIGGER_CONTEXT_MENU);this.triggerContextMenuEvent.signature=YAHOO.util.CustomEvent.LIST;},cancel:function(){this._bCancelled=true;},_removeEventHandlers:function(){var F=this._oTrigger;if(F){B.removeListener(F,D.CONTEXT_MENU,this._onTriggerContextMenu);if(YAHOO.env.ua.opera){B.removeListener(F,D.CLICK,this._onTriggerClick);}}},_onTriggerClick:function(G,F){if(G.ctrlKey){B.stopEvent(G);}},_onTriggerContextMenu:function(H,F){if(H.type=="mousedown"&&!H.ctrlKey){return ;}var G;B.stopEvent(H);this.contextEventTarget=B.getTarget(H);this.triggerContextMenuEvent.fire(H);YAHOO.widget.MenuManager.hideVisible();if(!this._bCancelled){G=B.getXY(H);if(!YAHOO.util.Dom.inDocument(this.element)){this.beforeShowEvent.subscribe(A,G);}else{this.cfg.setProperty("xy",G);}this.show();}this._bCancelled=false;},toString:function(){var G="ContextMenu",F=this.id;if(F){G+=(" "+F);}return G;},initDefaultConfig:function(){E.superclass.initDefaultConfig.call(this);this.cfg.addProperty(C.TRIGGER.key,{handler:this.configTrigger,suppressEvent:C.TRIGGER.suppressEvent});},destroy:function(){this._removeEventHandlers();E.superclass.destroy.call(this);},configTrigger:function(G,F,I){var H=F[0];if(H){if(this._oTrigger){this._removeEventHandlers();}this._oTrigger=H;B.on(H,D.CONTEXT_MENU,this._onTriggerContextMenu,this,true);if(YAHOO.env.ua.opera){B.on(H,D.CLICK,this._onTriggerClick,this,true);}}else{this._removeEventHandlers();}}});}());YAHOO.widget.ContextMenuItem=YAHOO.widget.MenuItem;(function(){YAHOO.widget.MenuBar=function(F,E){YAHOO.widget.MenuBar.superclass.constructor.call(this,F,E);};function D(E){if(typeof E=="string"){return("dynamic,static".indexOf((E.toLowerCase()))!=-1);}}var B=YAHOO.util.Event,A=YAHOO.widget.MenuBar,C={"POSITION":{key:"position",value:"static",validator:D,supercedes:["visible"]},"SUBMENU_ALIGNMENT":{key:"submenualignment",value:["tl","bl"],suppressEvent:true},"AUTO_SUBMENU_DISPLAY":{key:"autosubmenudisplay",value:false,validator:YAHOO.lang.isBoolean,suppressEvent:true}};YAHOO.lang.extend(A,YAHOO.widget.Menu,{init:function(F,E){if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuBarItem;}A.superclass.init.call(this,F);this.beforeInitEvent.fire(A);if(E){this.cfg.applyConfig(E,true);}this.initEvent.fire(A);},CSS_CLASS_NAME:"yuimenubar",_onKeyDown:function(G,F,K){var E=F[0],L=F[1],I,J,H;if(L&&!L.cfg.getProperty("disabled")){J=L.cfg;switch(E.keyCode){case 37:case 39:if(L==this.activeItem&&!J.getProperty("selected")){J.setProperty("selected",true);}else{H=(E.keyCode==37)?L.getPreviousEnabledSibling():L.getNextEnabledSibling();if(H){this.clearActiveItem();H.cfg.setProperty("selected",true);if(this.cfg.getProperty("autosubmenudisplay")){I=H.cfg.getProperty("submenu");if(I){I.show();}}H.focus();}}B.preventDefault(E);break;case 40:if(this.activeItem!=L){this.clearActiveItem();J.setProperty("selected",true);L.focus();}I=J.getProperty("submenu");if(I){if(I.cfg.getProperty("visible")){I.setInitialSelection();I.setInitialFocus();}else{I.show();}}B.preventDefault(E);break;}}if(E.keyCode==27&&this.activeItem){I=this.activeItem.cfg.getProperty("submenu");if(I&&I.cfg.getProperty("visible")){I.hide();this.activeItem.focus();}else{this.activeItem.cfg.setProperty("selected",false);this.activeItem.blur();}B.preventDefault(E);}},_onClick:function(L,G,J){A.superclass._onClick.call(this,L,G,J);var K=G[1],M,E,F,H,I;if(K&&!K.cfg.getProperty("disabled")){M=G[0];E=B.getTarget(M);F=this.activeItem;H=this.cfg;if(F&&F!=K){this.clearActiveItem();}K.cfg.setProperty("selected",true);I=K.cfg.getProperty("submenu");if(I){if(I.cfg.getProperty("visible")){I.hide();}else{I.show();}}}},toString:function(){var F="MenuBar",E=this.id;if(E){F+=(" "+E);}return F;},initDefaultConfig:function(){A.superclass.initDefaultConfig.call(this);var E=this.cfg;E.addProperty(C.POSITION.key,{handler:this.configPosition,value:C.POSITION.value,validator:C.POSITION.validator,supercedes:C.POSITION.supercedes});
E.addProperty(C.SUBMENU_ALIGNMENT.key,{value:C.SUBMENU_ALIGNMENT.value,suppressEvent:C.SUBMENU_ALIGNMENT.suppressEvent});E.addProperty(C.AUTO_SUBMENU_DISPLAY.key,{value:C.AUTO_SUBMENU_DISPLAY.value,validator:C.AUTO_SUBMENU_DISPLAY.validator,suppressEvent:C.AUTO_SUBMENU_DISPLAY.suppressEvent});}});}());YAHOO.widget.MenuBarItem=function(B,A){YAHOO.widget.MenuBarItem.superclass.constructor.call(this,B,A);};YAHOO.lang.extend(YAHOO.widget.MenuBarItem,YAHOO.widget.MenuItem,{init:function(B,A){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=YAHOO.widget.Menu;}YAHOO.widget.MenuBarItem.superclass.init.call(this,B);var C=this.cfg;if(A){C.applyConfig(A,true);}C.fireQueue();},CSS_CLASS_NAME:"yuimenubaritem",CSS_LABEL_CLASS_NAME:"yuimenubaritemlabel",toString:function(){var A="MenuBarItem";if(this.cfg&&this.cfg.getProperty("text")){A+=(": "+this.cfg.getProperty("text"));}return A;}});YAHOO.register("menu",YAHOO.widget.Menu,{version:"2.5.1",build:"984"});/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
(function () {

    /**
    * Config is a utility used within an Object to allow the implementer to
    * maintain a list of local configuration properties and listen for changes 
    * to those properties dynamically using CustomEvent. The initial values are 
    * also maintained so that the configuration can be reset at any given point 
    * to its initial state.
    * @namespace YAHOO.util
    * @class Config
    * @constructor
    * @param {Object} owner The owner Object to which this Config Object belongs
    */
    YAHOO.util.Config = function (owner) {

        if (owner) {
            this.init(owner);
        }


    };


    var Lang = YAHOO.lang,
        CustomEvent = YAHOO.util.CustomEvent,
        Config = YAHOO.util.Config;


    /**
     * Constant representing the CustomEvent type for the config changed event.
     * @property YAHOO.util.Config.CONFIG_CHANGED_EVENT
     * @private
     * @static
     * @final
     */
    Config.CONFIG_CHANGED_EVENT = "configChanged";
    
    /**
     * Constant representing the boolean type string
     * @property YAHOO.util.Config.BOOLEAN_TYPE
     * @private
     * @static
     * @final
     */
    Config.BOOLEAN_TYPE = "boolean";
    
    Config.prototype = {
     
        /**
        * Object reference to the owner of this Config Object
        * @property owner
        * @type Object
        */
        owner: null,
        
        /**
        * Boolean flag that specifies whether a queue is currently 
        * being executed
        * @property queueInProgress
        * @type Boolean
        */
        queueInProgress: false,
        
        /**
        * Maintains the local collection of configuration property objects and 
        * their specified values
        * @property config
        * @private
        * @type Object
        */ 
        config: null,
        
        /**
        * Maintains the local collection of configuration property objects as 
        * they were initially applied.
        * This object is used when resetting a property.
        * @property initialConfig
        * @private
        * @type Object
        */ 
        initialConfig: null,
        
        /**
        * Maintains the local, normalized CustomEvent queue
        * @property eventQueue
        * @private
        * @type Object
        */ 
        eventQueue: null,
        
        /**
        * Custom Event, notifying subscribers when Config properties are set 
        * (setProperty is called without the silent flag
        * @event configChangedEvent
        */
        configChangedEvent: null,
    
        /**
        * Initializes the configuration Object and all of its local members.
        * @method init
        * @param {Object} owner The owner Object to which this Config 
        * Object belongs
        */
        init: function (owner) {
    
            this.owner = owner;
    
            this.configChangedEvent = 
                this.createEvent(Config.CONFIG_CHANGED_EVENT);
    
            this.configChangedEvent.signature = CustomEvent.LIST;
            this.queueInProgress = false;
            this.config = {};
            this.initialConfig = {};
            this.eventQueue = [];
        
        },
        
        /**
        * Validates that the value passed in is a Boolean.
        * @method checkBoolean
        * @param {Object} val The value to validate
        * @return {Boolean} true, if the value is valid
        */ 
        checkBoolean: function (val) {
            return (typeof val == Config.BOOLEAN_TYPE);
        },
        
        /**
        * Validates that the value passed in is a number.
        * @method checkNumber
        * @param {Object} val The value to validate
        * @return {Boolean} true, if the value is valid
        */
        checkNumber: function (val) {
            return (!isNaN(val));
        },
        
        /**
        * Fires a configuration property event using the specified value. 
        * @method fireEvent
        * @private
        * @param {String} key The configuration property's name
        * @param {value} Object The value of the correct type for the property
        */ 
        fireEvent: function ( key, value ) {
            var property = this.config[key];
        
            if (property && property.event) {
                property.event.fire(value);
            } 
        },
        
        /**
        * Adds a property to the Config Object's private config hash.
        * @method addProperty
        * @param {String} key The configuration property's name
        * @param {Object} propertyObject The Object containing all of this 
        * property's arguments
        */
        addProperty: function ( key, propertyObject ) {
            key = key.toLowerCase();
        
            this.config[key] = propertyObject;
        
            propertyObject.event = this.createEvent(key, { scope: this.owner });
            propertyObject.event.signature = CustomEvent.LIST;
            
            
            propertyObject.key = key;
        
            if (propertyObject.handler) {
                propertyObject.event.subscribe(propertyObject.handler, 
                    this.owner);
            }
        
            this.setProperty(key, propertyObject.value, true);
            
            if (! propertyObject.suppressEvent) {
                this.queueProperty(key, propertyObject.value);
            }
            
        },
        
        /**
        * Returns a key-value configuration map of the values currently set in  
        * the Config Object.
        * @method getConfig
        * @return {Object} The current config, represented in a key-value map
        */
        getConfig: function () {
        
            var cfg = {},
                prop,
                property;
                
            for (prop in this.config) {
                property = this.config[prop];
                if (property && property.event) {
                    cfg[prop] = property.value;
                }
            }
            
            return cfg;
        },
        
        /**
        * Returns the value of specified property.
        * @method getProperty
        * @param {String} key The name of the property
        * @return {Object}  The value of the specified property
        */
        getProperty: function (key) {
            var property = this.config[key.toLowerCase()];
            if (property && property.event) {
                return property.value;
            } else {
                return undefined;
            }
        },
        
        /**
        * Resets the specified property's value to its initial value.
        * @method resetProperty
        * @param {String} key The name of the property
        * @return {Boolean} True is the property was reset, false if not
        */
        resetProperty: function (key) {
    
            key = key.toLowerCase();
        
            var property = this.config[key];
    
            if (property && property.event) {
    
                if (this.initialConfig[key] && 
                    !Lang.isUndefined(this.initialConfig[key])) {
    
                    this.setProperty(key, this.initialConfig[key]);

                    return true;
    
                }
    
            } else {
    
                return false;
            }
    
        },
        
        /**
        * Sets the value of a property. If the silent property is passed as 
        * true, the property's event will not be fired.
        * @method setProperty
        * @param {String} key The name of the property
        * @param {String} value The value to set the property to
        * @param {Boolean} silent Whether the value should be set silently, 
        * without firing the property event.
        * @return {Boolean} True, if the set was successful, false if it failed.
        */
        setProperty: function (key, value, silent) {
        
            var property;
        
            key = key.toLowerCase();
        
            if (this.queueInProgress && ! silent) {
                // Currently running through a queue... 
                this.queueProperty(key,value);
                return true;
    
            } else {
                property = this.config[key];
                if (property && property.event) {
                    if (property.validator && !property.validator(value)) {
                        return false;
                    } else {
                        property.value = value;
                        if (! silent) {
                            this.fireEvent(key, value);
                            this.configChangedEvent.fire([key, value]);
                        }
                        return true;
                    }
                } else {
                    return false;
                }
            }
        },
        
        /**
        * Sets the value of a property and queues its event to execute. If the 
        * event is already scheduled to execute, it is
        * moved from its current position to the end of the queue.
        * @method queueProperty
        * @param {String} key The name of the property
        * @param {String} value The value to set the property to
        * @return {Boolean}  true, if the set was successful, false if 
        * it failed.
        */ 
        queueProperty: function (key, value) {
        
            key = key.toLowerCase();
        
            var property = this.config[key],
                foundDuplicate = false,
                iLen,
                queueItem,
                queueItemKey,
                queueItemValue,
                sLen,
                supercedesCheck,
                qLen,
                queueItemCheck,
                queueItemCheckKey,
                queueItemCheckValue,
                i,
                s,
                q;
                                
            if (property && property.event) {
    
                if (!Lang.isUndefined(value) && property.validator && 
                    !property.validator(value)) { // validator
                    return false;
                } else {
        
                    if (!Lang.isUndefined(value)) {
                        property.value = value;
                    } else {
                        value = property.value;
                    }
        
                    foundDuplicate = false;
                    iLen = this.eventQueue.length;
        
                    for (i = 0; i < iLen; i++) {
                        queueItem = this.eventQueue[i];
        
                        if (queueItem) {
                            queueItemKey = queueItem[0];
                            queueItemValue = queueItem[1];

                            if (queueItemKey == key) {
    
                                /*
                                    found a dupe... push to end of queue, null 
                                    current item, and break
                                */
    
                                this.eventQueue[i] = null;
    
                                this.eventQueue.push(
                                    [key, (!Lang.isUndefined(value) ? 
                                    value : queueItemValue)]);
    
                                foundDuplicate = true;
                                break;
                            }
                        }
                    }
                    
                    // this is a refire, or a new property in the queue
    
                    if (! foundDuplicate && !Lang.isUndefined(value)) { 
                        this.eventQueue.push([key, value]);
                    }
                }
        
                if (property.supercedes) {

                    sLen = property.supercedes.length;

                    for (s = 0; s < sLen; s++) {

                        supercedesCheck = property.supercedes[s];
                        qLen = this.eventQueue.length;

                        for (q = 0; q < qLen; q++) {
                            queueItemCheck = this.eventQueue[q];

                            if (queueItemCheck) {
                                queueItemCheckKey = queueItemCheck[0];
                                queueItemCheckValue = queueItemCheck[1];

                                if (queueItemCheckKey == 
                                    supercedesCheck.toLowerCase() ) {

                                    this.eventQueue.push([queueItemCheckKey, 
                                        queueItemCheckValue]);

                                    this.eventQueue[q] = null;
                                    break;

                                }
                            }
                        }
                    }
                }


                return true;
            } else {
                return false;
            }
        },
        
        /**
        * Fires the event for a property using the property's current value.
        * @method refireEvent
        * @param {String} key The name of the property
        */
        refireEvent: function (key) {
    
            key = key.toLowerCase();
        
            var property = this.config[key];
    
            if (property && property.event && 
    
                !Lang.isUndefined(property.value)) {
    
                if (this.queueInProgress) {
    
                    this.queueProperty(key);
    
                } else {
    
                    this.fireEvent(key, property.value);
    
                }
    
            }
        },
        
        /**
        * Applies a key-value Object literal to the configuration, replacing  
        * any existing values, and queueing the property events.
        * Although the values will be set, fireQueue() must be called for their 
        * associated events to execute.
        * @method applyConfig
        * @param {Object} userConfig The configuration Object literal
        * @param {Boolean} init  When set to true, the initialConfig will 
        * be set to the userConfig passed in, so that calling a reset will 
        * reset the properties to the passed values.
        */
        applyConfig: function (userConfig, init) {
        
            var sKey,
                oConfig;

            if (init) {
                oConfig = {};
                for (sKey in userConfig) {
                    if (Lang.hasOwnProperty(userConfig, sKey)) {
                        oConfig[sKey.toLowerCase()] = userConfig[sKey];
                    }
                }
                this.initialConfig = oConfig;
            }

            for (sKey in userConfig) {
                if (Lang.hasOwnProperty(userConfig, sKey)) {
                    this.queueProperty(sKey, userConfig[sKey]);
                }
            }
        },
        
        /**
        * Refires the events for all configuration properties using their 
        * current values.
        * @method refresh
        */
        refresh: function () {
        
            var prop;
        
            for (prop in this.config) {
                this.refireEvent(prop);
            }
        },
        
        /**
        * Fires the normalized list of queued property change events
        * @method fireQueue
        */
        fireQueue: function () {
        
            var i, 
                queueItem,
                key,
                value,
                property;
        
            this.queueInProgress = true;
            for (i = 0;i < this.eventQueue.length; i++) {
                queueItem = this.eventQueue[i];
                if (queueItem) {
        
                    key = queueItem[0];
                    value = queueItem[1];
                    property = this.config[key];
        
                    property.value = value;
        
                    this.fireEvent(key,value);
                }
            }
            
            this.queueInProgress = false;
            this.eventQueue = [];
        },
        
        /**
        * Subscribes an external handler to the change event for any 
        * given property. 
        * @method subscribeToConfigEvent
        * @param {String} key The property name
        * @param {Function} handler The handler function to use subscribe to 
        * the property's event
        * @param {Object} obj The Object to use for scoping the event handler 
        * (see CustomEvent documentation)
        * @param {Boolean} override Optional. If true, will override "this"  
        * within the handler to map to the scope Object passed into the method.
        * @return {Boolean} True, if the subscription was successful, 
        * otherwise false.
        */ 
        subscribeToConfigEvent: function (key, handler, obj, override) {
    
            var property = this.config[key.toLowerCase()];
    
            if (property && property.event) {
                if (!Config.alreadySubscribed(property.event, handler, obj)) {
                    property.event.subscribe(handler, obj, override);
                }
                return true;
            } else {
                return false;
            }
    
        },
        
        /**
        * Unsubscribes an external handler from the change event for any 
        * given property. 
        * @method unsubscribeFromConfigEvent
        * @param {String} key The property name
        * @param {Function} handler The handler function to use subscribe to 
        * the property's event
        * @param {Object} obj The Object to use for scoping the event 
        * handler (see CustomEvent documentation)
        * @return {Boolean} True, if the unsubscription was successful, 
        * otherwise false.
        */
        unsubscribeFromConfigEvent: function (key, handler, obj) {
            var property = this.config[key.toLowerCase()];
            if (property && property.event) {
                return property.event.unsubscribe(handler, obj);
            } else {
                return false;
            }
        },
        
        /**
        * Returns a string representation of the Config object
        * @method toString
        * @return {String} The Config object in string format.
        */
        toString: function () {
            var output = "Config";
            if (this.owner) {
                output += " [" + this.owner.toString() + "]";
            }
            return output;
        },
        
        /**
        * Returns a string representation of the Config object's current 
        * CustomEvent queue
        * @method outputEventQueue
        * @return {String} The string list of CustomEvents currently queued 
        * for execution
        */
        outputEventQueue: function () {

            var output = "",
                queueItem,
                q,
                nQueue = this.eventQueue.length;
              
            for (q = 0; q < nQueue; q++) {
                queueItem = this.eventQueue[q];
                if (queueItem) {
                    output += queueItem[0] + "=" + queueItem[1] + ", ";
                }
            }
            return output;
        },

        /**
        * Sets all properties to null, unsubscribes all listeners from each 
        * property's change event and all listeners from the configChangedEvent.
        * @method destroy
        */
        destroy: function () {

            var oConfig = this.config,
                sProperty,
                oProperty;


            for (sProperty in oConfig) {
            
                if (Lang.hasOwnProperty(oConfig, sProperty)) {

                    oProperty = oConfig[sProperty];

                    oProperty.event.unsubscribeAll();
                    oProperty.event = null;

                }
            
            }
            
            this.configChangedEvent.unsubscribeAll();
            
            this.configChangedEvent = null;
            this.owner = null;
            this.config = null;
            this.initialConfig = null;
            this.eventQueue = null;
        
        }

    };
    
    
    
    /**
    * Checks to determine if a particular function/Object pair are already 
    * subscribed to the specified CustomEvent
    * @method YAHOO.util.Config.alreadySubscribed
    * @static
    * @param {YAHOO.util.CustomEvent} evt The CustomEvent for which to check 
    * the subscriptions
    * @param {Function} fn The function to look for in the subscribers list
    * @param {Object} obj The execution scope Object for the subscription
    * @return {Boolean} true, if the function/Object pair is already subscribed 
    * to the CustomEvent passed in
    */
    Config.alreadySubscribed = function (evt, fn, obj) {
    
        var nSubscribers = evt.subscribers.length,
            subsc,
            i;

        if (nSubscribers > 0) {
            i = nSubscribers - 1;
            do {
                subsc = evt.subscribers[i];
                if (subsc && subsc.obj == obj && subsc.fn == fn) {
                    return true;
                }
            }
            while (i--);
        }

        return false;

    };

    YAHOO.lang.augmentProto(Config, YAHOO.util.EventProvider);

}());

/**
* YAHOO.widget.DateMath is used for simple date manipulation. The class is a static utility
* used for adding, subtracting, and comparing dates.
* @namespace YAHOO.widget
* @class DateMath
*/
YAHOO.widget.DateMath = {
	/**
	* Constant field representing Day
	* @property DAY
	* @static
	* @final
	* @type String
	*/
	DAY : "D",

	/**
	* Constant field representing Week
	* @property WEEK
	* @static
	* @final
	* @type String
	*/
	WEEK : "W",

	/**
	* Constant field representing Year
	* @property YEAR
	* @static
	* @final
	* @type String
	*/
	YEAR : "Y",

	/**
	* Constant field representing Month
	* @property MONTH
	* @static
	* @final
	* @type String
	*/
	MONTH : "M",

	/**
	* Constant field representing one day, in milliseconds
	* @property ONE_DAY_MS
	* @static
	* @final
	* @type Number
	*/
	ONE_DAY_MS : 1000*60*60*24,
	
	/**
	 * Constant field representing the date in first week of January
	 * which identifies the first week of the year.
	 * <p>
	 * In the U.S, Jan 1st is normally used based on a Sunday start of week.
	 * ISO 8601, used widely throughout Europe, uses Jan 4th, based on a Monday start of week.
	 * </p>
	 * @property WEEK_ONE_JAN_DATE
	 * @static
	 * @type Number
	 */
	WEEK_ONE_JAN_DATE : 1,

	/**
	* Adds the specified amount of time to the this instance.
	* @method add
	* @param {Date} date	The JavaScript Date object to perform addition on
	* @param {String} field	The field constant to be used for performing addition.
	* @param {Number} amount	The number of units (measured in the field constant) to add to the date.
	* @return {Date} The resulting Date object
	*/
	add : function(date, field, amount) {
		var d = new Date(date.getTime());
		switch (field) {
			case this.MONTH:
				var newMonth = date.getMonth() + amount;
				var years = 0;

				if (newMonth < 0) {
					while (newMonth < 0) {
						newMonth += 12;
						years -= 1;
					}
				} else if (newMonth > 11) {
					while (newMonth > 11) {
						newMonth -= 12;
						years += 1;
					}
				}

				d.setMonth(newMonth);
				d.setFullYear(date.getFullYear() + years);
				break;
			case this.DAY:
				this._addDays(d, amount);
				// d.setDate(date.getDate() + amount);
				break;
			case this.YEAR:
				d.setFullYear(date.getFullYear() + amount);
				break;
			case this.WEEK:
				this._addDays(d, (amount * 7));
				// d.setDate(date.getDate() + (amount * 7));
				break;
		}
		return d;
	},

	/**
	 * Private helper method to account for bug in Safari 2 (webkit < 420)
	 * when Date.setDate(n) is called with n less than -128 or greater than 127.
	 * <p>
	 * Fix approach and original findings are available here:
	 * http://brianary.blogspot.com/2006/03/safari-date-bug.html
	 * </p>
	 * @method _addDays
	 * @param {Date} d JavaScript date object
	 * @param {Number} nDays The number of days to add to the date object (can be negative)
	 * @private
	 */
	_addDays : function(d, nDays) {
		if (YAHOO.env.ua.webkit && YAHOO.env.ua.webkit < 420) {
			if (nDays < 0) {
				// Ensure we don't go below -128 (getDate() is always 1 to 31, so we won't go above 127)
				for(var min = -128; nDays < min; nDays -= min) {
					d.setDate(d.getDate() + min);
				}
			} else {
				// Ensure we don't go above 96 + 31 = 127
				for(var max = 96; nDays > max; nDays -= max) {
					d.setDate(d.getDate() + max);
				}
			}
			// nDays should be remainder between -128 and 96
		}
		d.setDate(d.getDate() + nDays);
	},

	/**
	* Subtracts the specified amount of time from the this instance.
	* @method subtract
	* @param {Date} date	The JavaScript Date object to perform subtraction on
	* @param {Number} field	The this field constant to be used for performing subtraction.
	* @param {Number} amount	The number of units (measured in the field constant) to subtract from the date.
	* @return {Date} The resulting Date object
	*/
	subtract : function(date, field, amount) {
		return this.add(date, field, (amount*-1));
	},

	/**
	* Determines whether a given date is before another date on the calendar.
	* @method before
	* @param {Date} date		The Date object to compare with the compare argument
	* @param {Date} compareTo	The Date object to use for the comparison
	* @return {Boolean} true if the date occurs before the compared date; false if not.
	*/
	before : function(date, compareTo) {
		var ms = compareTo.getTime();
		if (date.getTime() < ms) {
			return true;
		} else {
			return false;
		}
	},

	/**
	* Determines whether a given date is after another date on the calendar.
	* @method after
	* @param {Date} date		The Date object to compare with the compare argument
	* @param {Date} compareTo	The Date object to use for the comparison
	* @return {Boolean} true if the date occurs after the compared date; false if not.
	*/
	after : function(date, compareTo) {
		var ms = compareTo.getTime();
		if (date.getTime() > ms) {
			return true;
		} else {
			return false;
		}
	},

	/**
	* Determines whether a given date is between two other dates on the calendar.
	* @method between
	* @param {Date} date		The date to check for
	* @param {Date} dateBegin	The start of the range
	* @param {Date} dateEnd		The end of the range
	* @return {Boolean} true if the date occurs between the compared dates; false if not.
	*/
	between : function(date, dateBegin, dateEnd) {
		if (this.after(date, dateBegin) && this.before(date, dateEnd)) {
			return true;
		} else {
			return false;
		}
	},
	
	/**
	* Retrieves a JavaScript Date object representing January 1 of any given year.
	* @method getJan1
	* @param {Number} calendarYear		The calendar year for which to retrieve January 1
	* @return {Date}	January 1 of the calendar year specified.
	*/
	getJan1 : function(calendarYear) {
		return this.getDate(calendarYear,0,1);
	},

	/**
	* Calculates the number of days the specified date is from January 1 of the specified calendar year.
	* Passing January 1 to this function would return an offset value of zero.
	* @method getDayOffset
	* @param {Date}	date	The JavaScript date for which to find the offset
	* @param {Number} calendarYear	The calendar year to use for determining the offset
	* @return {Number}	The number of days since January 1 of the given year
	*/
	getDayOffset : function(date, calendarYear) {
		var beginYear = this.getJan1(calendarYear); // Find the start of the year. This will be in week 1.
		
		// Find the number of days the passed in date is away from the calendar year start
		var dayOffset = Math.ceil((date.getTime()-beginYear.getTime()) / this.ONE_DAY_MS);
		return dayOffset;
	},

	/**
	* Calculates the week number for the given date. Can currently support standard
	* U.S. week numbers, based on Jan 1st defining the 1st week of the year, and 
	* ISO8601 week numbers, based on Jan 4th defining the 1st week of the year.
	* 
	* @method getWeekNumber
	* @param {Date}	date The JavaScript date for which to find the week number
	* @param {Number} firstDayOfWeek The index of the first day of the week (0 = Sun, 1 = Mon ... 6 = Sat).
	* Defaults to 0
	* @param {Number} janDate The date in the first week of January which defines week one for the year
	* Defaults to the value of YAHOO.widget.DateMath.WEEK_ONE_JAN_DATE, which is 1 (Jan 1st). 
	* For the U.S, this is normally Jan 1st. ISO8601 uses Jan 4th to define the first week of the year.
	* 
	* @return {Number} The number of the week containing the given date.
	*/
	getWeekNumber : function(date, firstDayOfWeek, janDate) {

		// Setup Defaults
		firstDayOfWeek = firstDayOfWeek || 0;
		janDate = janDate || this.WEEK_ONE_JAN_DATE;

		var targetDate = this.clearTime(date),
			startOfWeek,
			endOfWeek;

		if (targetDate.getDay() === firstDayOfWeek) { 
			startOfWeek = targetDate;
		} else {
			startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);
		}

		var startYear = startOfWeek.getFullYear(),
			startTime = startOfWeek.getTime();

		// DST shouldn't be a problem here, math is quicker than setDate();
		endOfWeek = new Date(startOfWeek.getTime() + 6*this.ONE_DAY_MS);

		var weekNum;
		if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {
			// If years don't match, endOfWeek is in Jan. and if the 
			// week has WEEK_ONE_JAN_DATE in it, it's week one by definition.
			weekNum = 1;
		} else {
			// Get the 1st day of the 1st week, and 
			// find how many days away we are from it.
			var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),
				weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);

			// Round days to smoothen out 1 hr DST diff
			var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime())/this.ONE_DAY_MS);

			// Calc. Full Weeks
			var rem = daysDiff % 7;
			var weeksDiff = (daysDiff - rem)/7;
			weekNum = weeksDiff + 1;
		}
		return weekNum;
	},

	/**
	 * Get the first day of the week, for the give date. 
	 * @param {Date} dt The date in the week for which the first day is required.
	 * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)
	 * @return {Date} The first day of the week
	 */
	getFirstDayOfWeek : function (dt, startOfWeek) {
		startOfWeek = startOfWeek || 0;
		var dayOfWeekIndex = dt.getDay(),
			dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;

		return this.subtract(dt, this.DAY, dayOfWeek);
	},

	/**
	* Determines if a given week overlaps two different years.
	* @method isYearOverlapWeek
	* @param {Date}	weekBeginDate	The JavaScript Date representing the first day of the week.
	* @return {Boolean}	true if the date overlaps two different years.
	*/
	isYearOverlapWeek : function(weekBeginDate) {
		var overlaps = false;
		var nextWeek = this.add(weekBeginDate, this.DAY, 6);
		if (nextWeek.getFullYear() != weekBeginDate.getFullYear()) {
			overlaps = true;
		}
		return overlaps;
	},

	/**
	* Determines if a given week overlaps two different months.
	* @method isMonthOverlapWeek
	* @param {Date}	weekBeginDate	The JavaScript Date representing the first day of the week.
	* @return {Boolean}	true if the date overlaps two different months.
	*/
	isMonthOverlapWeek : function(weekBeginDate) {
		var overlaps = false;
		var nextWeek = this.add(weekBeginDate, this.DAY, 6);
		if (nextWeek.getMonth() != weekBeginDate.getMonth()) {
			overlaps = true;
		}
		return overlaps;
	},

	/**
	* Gets the first day of a month containing a given date.
	* @method findMonthStart
	* @param {Date}	date	The JavaScript Date used to calculate the month start
	* @return {Date}		The JavaScript Date representing the first day of the month
	*/
	findMonthStart : function(date) {
		var start = this.getDate(date.getFullYear(), date.getMonth(), 1);
		return start;
	},

	/**
	* Gets the last day of a month containing a given date.
	* @method findMonthEnd
	* @param {Date}	date	The JavaScript Date used to calculate the month end
	* @return {Date}		The JavaScript Date representing the last day of the month
	*/
	findMonthEnd : function(date) {
		var start = this.findMonthStart(date);
		var nextMonth = this.add(start, this.MONTH, 1);
		var end = this.subtract(nextMonth, this.DAY, 1);
		return end;
	},

	/**
	* Clears the time fields from a given date, effectively setting the time to 12 noon.
	* @method clearTime
	* @param {Date}	date	The JavaScript Date for which the time fields will be cleared
	* @return {Date}		The JavaScript Date cleared of all time fields
	*/
	clearTime : function(date) {
		date.setHours(12,0,0,0);
		return date;
	},

	/**
	 * Returns a new JavaScript Date object, representing the given year, month and date. Time fields (hr, min, sec, ms) on the new Date object
	 * are set to 0. The method allows Date instances to be created with the a year less than 100. "new Date(year, month, date)" implementations 
	 * set the year to 19xx if a year (xx) which is less than 100 is provided.
	 * <p>
	 * <em>NOTE:</em>Validation on argument values is not performed. It is the caller's responsibility to ensure
	 * arguments are valid as per the ECMAScript-262 Date object specification for the new Date(year, month[, date]) constructor.
	 * </p>
	 * @method getDate
	 * @param {Number} y Year.
	 * @param {Number} m Month index from 0 (Jan) to 11 (Dec).
	 * @param {Number} d (optional) Date from 1 to 31. If not provided, defaults to 1.
	 * @return {Date} The JavaScript date object with year, month, date set as provided.
	 */
	getDate : function(y, m, d) {
		var dt = null;
		if (YAHOO.lang.isUndefined(d)) {
			d = 1;
		}
		if (y >= 100) {
			dt = new Date(y, m, d);
		} else {
			dt = new Date();
			dt.setFullYear(y);
			dt.setMonth(m);
			dt.setDate(d);
			dt.setHours(0,0,0,0);
		}
		return dt;
	}
};

/**
* The Calendar component is a UI control that enables users to choose one or more dates from a graphical calendar presented in a one-month or
* multi-month interface. Calendars are generated entirely via script and can be navigated without any page refreshes.
* @module    calendar
* @title    Calendar
* @namespace  YAHOO.widget
* @requires  yahoo,dom,event
*/

/**
* Calendar is the base class for the Calendar widget. In its most basic
* implementation, it has the ability to render a calendar widget on the page
* that can be manipulated to select a single date, move back and forth between
* months and years.
* <p>To construct the placeholder for the calendar widget, the code is as
* follows:
*	<xmp>
*		<div id="calContainer"></div>
*	</xmp>
* </p>
* <p>
* <strong>NOTE: As of 2.4.0, the constructor's ID argument is optional.</strong>
* The Calendar can be constructed by simply providing a container ID string, 
* or a reference to a container DIV HTMLElement (the element needs to exist 
* in the document).
* 
* E.g.:
*	<xmp>
*		var c = new YAHOO.widget.Calendar("calContainer", configOptions);
*	</xmp>
* or:
*   <xmp>
*       var containerDiv = YAHOO.util.Dom.get("calContainer");
*		var c = new YAHOO.widget.Calendar(containerDiv, configOptions);
*	</xmp>
* </p>
* <p>
* If not provided, the ID will be generated from the container DIV ID by adding an "_t" suffix.
* For example if an ID is not provided, and the container's ID is "calContainer", the Calendar's ID will be set to "calContainer_t".
* </p>
* 
* @namespace YAHOO.widget
* @class Calendar
* @constructor
* @param {String} id optional The id of the table element that will represent the Calendar widget. As of 2.4.0, this argument is optional.
* @param {String | HTMLElement} container The id of the container div element that will wrap the Calendar table, or a reference to a DIV element which exists in the document.
* @param {Object} config optional The configuration object containing the initial configuration values for the Calendar.
*/
YAHOO.widget.Calendar = function(id, containerId, config) {
	this.init.apply(this, arguments);
};

/**
* The path to be used for images loaded for the Calendar
* @property YAHOO.widget.Calendar.IMG_ROOT
* @static
* @deprecated	You can now customize images by overriding the calclose, calnavleft and calnavright default CSS classes for the close icon, left arrow and right arrow respectively
* @type String
*/
YAHOO.widget.Calendar.IMG_ROOT = null;

/**
* Type constant used for renderers to represent an individual date (M/D/Y)
* @property YAHOO.widget.Calendar.DATE
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.DATE = "D";

/**
* Type constant used for renderers to represent an individual date across any year (M/D)
* @property YAHOO.widget.Calendar.MONTH_DAY
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.MONTH_DAY = "MD";

/**
* Type constant used for renderers to represent a weekday
* @property YAHOO.widget.Calendar.WEEKDAY
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.WEEKDAY = "WD";

/**
* Type constant used for renderers to represent a range of individual dates (M/D/Y-M/D/Y)
* @property YAHOO.widget.Calendar.RANGE
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.RANGE = "R";

/**
* Type constant used for renderers to represent a month across any year
* @property YAHOO.widget.Calendar.MONTH
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.MONTH = "M";

/**
* Constant that represents the total number of date cells that are displayed in a given month
* @property YAHOO.widget.Calendar.DISPLAY_DAYS
* @static
* @final
* @type Number
*/
YAHOO.widget.Calendar.DISPLAY_DAYS = 42;

/**
* Constant used for halting the execution of the remainder of the render stack
* @property YAHOO.widget.Calendar.STOP_RENDER
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.STOP_RENDER = "S";

/**
* Constant used to represent short date field string formats (e.g. Tu or Feb)
* @property YAHOO.widget.Calendar.SHORT
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.SHORT = "short";

/**
* Constant used to represent long date field string formats (e.g. Monday or February)
* @property YAHOO.widget.Calendar.LONG
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.LONG = "long";

/**
* Constant used to represent medium date field string formats (e.g. Mon)
* @property YAHOO.widget.Calendar.MEDIUM
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.MEDIUM = "medium";

/**
* Constant used to represent single character date field string formats (e.g. M, T, W)
* @property YAHOO.widget.Calendar.ONE_CHAR
* @static
* @final
* @type String
*/
YAHOO.widget.Calendar.ONE_CHAR = "1char";

/**
* The set of default Config property keys and values for the Calendar
* @property YAHOO.widget.Calendar._DEFAULT_CONFIG
* @final
* @static
* @private
* @type Object
*/
YAHOO.widget.Calendar._DEFAULT_CONFIG = {
	// Default values for pagedate and selected are not class level constants - they are set during instance creation 
	PAGEDATE : {key:"pagedate", value:null},
	SELECTED : {key:"selected", value:null},
	TITLE : {key:"title", value:""},
	CLOSE : {key:"close", value:false},
	IFRAME : {key:"iframe", value:(YAHOO.env.ua.ie && YAHOO.env.ua.ie <= 6) ? true : false},
	MINDATE : {key:"mindate", value:null},
	MAXDATE : {key:"maxdate", value:null},
	MULTI_SELECT : {key:"multi_select", value:false},
	START_WEEKDAY : {key:"start_weekday", value:0},
	SHOW_WEEKDAYS : {key:"show_weekdays", value:true},
	SHOW_WEEK_HEADER : {key:"show_week_header", value:false},
	SHOW_WEEK_FOOTER : {key:"show_week_footer", value:false},
	HIDE_BLANK_WEEKS : {key:"hide_blank_weeks", value:false},
	NAV_ARROW_LEFT: {key:"nav_arrow_left", value:null} ,
	NAV_ARROW_RIGHT : {key:"nav_arrow_right", value:null} ,
	MONTHS_SHORT : {key:"months_short", value:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
	MONTHS_LONG: {key:"months_long", value:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]},
	WEEKDAYS_1CHAR: {key:"weekdays_1char", value:["S", "M", "T", "W", "T", "F", "S"]},
	WEEKDAYS_SHORT: {key:"weekdays_short", value:["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]},
	WEEKDAYS_MEDIUM: {key:"weekdays_medium", value:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
	WEEKDAYS_LONG: {key:"weekdays_long", value:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]},
	LOCALE_MONTHS:{key:"locale_months", value:"long"},
	LOCALE_WEEKDAYS:{key:"locale_weekdays", value:"short"},
	DATE_DELIMITER:{key:"date_delimiter", value:","},
	DATE_FIELD_DELIMITER:{key:"date_field_delimiter", value:"/"},
	DATE_RANGE_DELIMITER:{key:"date_range_delimiter", value:"-"},
	MY_MONTH_POSITION:{key:"my_month_position", value:1},
	MY_YEAR_POSITION:{key:"my_year_position", value:2},
	MD_MONTH_POSITION:{key:"md_month_position", value:1},
	MD_DAY_POSITION:{key:"md_day_position", value:2},
	MDY_MONTH_POSITION:{key:"mdy_month_position", value:1},
	MDY_DAY_POSITION:{key:"mdy_day_position", value:2},
	MDY_YEAR_POSITION:{key:"mdy_year_position", value:3},
	MY_LABEL_MONTH_POSITION:{key:"my_label_month_position", value:1},
	MY_LABEL_YEAR_POSITION:{key:"my_label_year_position", value:2},
	MY_LABEL_MONTH_SUFFIX:{key:"my_label_month_suffix", value:" "},
	MY_LABEL_YEAR_SUFFIX:{key:"my_label_year_suffix", value:""},
	NAV: {key:"navigator", value: null}
};

/**
* The set of Custom Event types supported by the Calendar
* @property YAHOO.widget.Calendar._EVENT_TYPES
* @final
* @static
* @private
* @type Object
*/
YAHOO.widget.Calendar._EVENT_TYPES = {
	BEFORE_SELECT : "beforeSelect", 
	SELECT : "select",
	BEFORE_DESELECT : "beforeDeselect",
	DESELECT : "deselect",
	CHANGE_PAGE : "changePage",
	BEFORE_RENDER : "beforeRender",
	RENDER : "render",
	RESET : "reset",
	CLEAR : "clear",
	BEFORE_HIDE : "beforeHide",
	HIDE : "hide",
	BEFORE_SHOW : "beforeShow",
	SHOW : "show",
	BEFORE_HIDE_NAV : "beforeHideNav",
	HIDE_NAV : "hideNav",
	BEFORE_SHOW_NAV : "beforeShowNav",
	SHOW_NAV : "showNav",
	BEFORE_RENDER_NAV : "beforeRenderNav",
	RENDER_NAV : "renderNav"
};

/**
* The set of default style constants for the Calendar
* @property YAHOO.widget.Calendar._STYLES
* @final
* @static
* @private
* @type Object
*/
YAHOO.widget.Calendar._STYLES = {
	CSS_ROW_HEADER: "calrowhead",
	CSS_ROW_FOOTER: "calrowfoot",
	CSS_CELL : "calcell",
	CSS_CELL_SELECTOR : "selector",
	CSS_CELL_SELECTED : "selected",
	CSS_CELL_SELECTABLE : "selectable",
	CSS_CELL_RESTRICTED : "restricted",
	CSS_CELL_TODAY : "today",
	CSS_CELL_OOM : "oom",
	CSS_CELL_OOB : "previous",
	CSS_HEADER : "calheader",
	CSS_HEADER_TEXT : "calhead",
	CSS_BODY : "calbody",
	CSS_WEEKDAY_CELL : "calweekdaycell",
	CSS_WEEKDAY_ROW : "calweekdayrow",
	CSS_FOOTER : "calfoot",
	CSS_CALENDAR : "yui-calendar",
	CSS_SINGLE : "single",
	CSS_CONTAINER : "yui-calcontainer",
	CSS_NAV_LEFT : "calnavleft",
	CSS_NAV_RIGHT : "calnavright",
	CSS_NAV : "calnav",
	CSS_CLOSE : "calclose",
	CSS_CELL_TOP : "calcelltop",
	CSS_CELL_LEFT : "calcellleft",
	CSS_CELL_RIGHT : "calcellright",
	CSS_CELL_BOTTOM : "calcellbottom",
	CSS_CELL_HOVER : "calcellhover",
	CSS_CELL_HIGHLIGHT1 : "highlight1",
	CSS_CELL_HIGHLIGHT2 : "highlight2",
	CSS_CELL_HIGHLIGHT3 : "highlight3",
	CSS_CELL_HIGHLIGHT4 : "highlight4"
};

YAHOO.widget.Calendar.prototype = {

	/**
	* The configuration object used to set up the calendars various locale and style options.
	* @property Config
	* @private
	* @deprecated Configuration properties should be set by calling Calendar.cfg.setProperty.
	* @type Object
	*/
	Config : null,

	/**
	* The parent CalendarGroup, only to be set explicitly by the parent group
	* @property parent
	* @type CalendarGroup
	*/	
	parent : null,

	/**
	* The index of this item in the parent group
	* @property index
	* @type Number
	*/
	index : -1,

	/**
	* The collection of calendar table cells
	* @property cells
	* @type HTMLTableCellElement[]
	*/
	cells : null,

	/**
	* The collection of calendar cell dates that is parallel to the cells collection. The array contains dates field arrays in the format of [YYYY, M, D].
	* @property cellDates
	* @type Array[](Number[])
	*/
	cellDates : null,

	/**
	* The id that uniquely identifies this Calendar.
	* @property id
	* @type String
	*/
	id : null,

	/**
	* The unique id associated with the Calendar's container
	* @property containerId
	* @type String
	*/
	containerId: null,

	/**
	* The DOM element reference that points to this calendar's container element. The calendar will be inserted into this element when the shell is rendered.
	* @property oDomContainer
	* @type HTMLElement
	*/
	oDomContainer : null,

	/**
	* A Date object representing today's date.
	* @property today
	* @type Date
	*/
	today : null,

	/**
	* The list of render functions, along with required parameters, used to render cells. 
	* @property renderStack
	* @type Array[]
	*/
	renderStack : null,

	/**
	* A copy of the initial render functions created before rendering.
	* @property _renderStack
	* @private
	* @type Array
	*/
	_renderStack : null,

	/**
	* A reference to the CalendarNavigator instance created for this Calendar.
	* Will be null if the "navigator" configuration property has not been set
	* @property oNavigator
	* @type CalendarNavigator
	*/
	oNavigator : null,

	/**
	* The private list of initially selected dates.
	* @property _selectedDates
	* @private
	* @type Array
	*/
	_selectedDates : null,

	/**
	* A map of DOM event handlers to attach to cells associated with specific CSS class names
	* @property domEventMap
	* @type Object
	*/
	domEventMap : null,

	/**
	 * Protected helper used to parse Calendar constructor/init arguments.
	 *
	 * As of 2.4.0, Calendar supports a simpler constructor 
	 * signature. This method reconciles arguments
	 * received in the pre 2.4.0 and 2.4.0 formats.
	 * 
	 * @protected
	 * @method _parseArgs
	 * @param {Array} Function "arguments" array
	 * @return {Object} Object with id, container, config properties containing
	 * the reconciled argument values.
	 **/
	_parseArgs : function(args) {
		/*
		   2.4.0 Constructors signatures

		   new Calendar(String)
		   new Calendar(HTMLElement)
		   new Calendar(String, ConfigObject)
		   new Calendar(HTMLElement, ConfigObject)

		   Pre 2.4.0 Constructor signatures

		   new Calendar(String, String)
		   new Calendar(String, HTMLElement)
		   new Calendar(String, String, ConfigObject)
		   new Calendar(String, HTMLElement, ConfigObject)
		 */
		var nArgs = {id:null, container:null, config:null};

		if (args && args.length && args.length > 0) {
			switch (args.length) {
				case 1:
					nArgs.id = null;
					nArgs.container = args[0];
					nArgs.config = null;
					break;
				case 2:
					if (YAHOO.lang.isObject(args[1]) && !args[1].tagName && !(args[1] instanceof String)) {
						nArgs.id = null;
						nArgs.container = args[0];
						nArgs.config = args[1];
					} else {
						nArgs.id = args[0];
						nArgs.container = args[1];
						nArgs.config = null;
					}
					break;
				default: // 3+
					nArgs.id = args[0];
					nArgs.container = args[1];
					nArgs.config = args[2];
					break;
			}
		} else {
		}
		return nArgs;
	},

	/**
	* Initializes the Calendar widget.
	* @method init
	*
	* @param {String} id optional The id of the table element that will represent the Calendar widget. As of 2.4.0, this argument is optional.
	* @param {String | HTMLElement} container The id of the container div element that will wrap the Calendar table, or a reference to a DIV element which exists in the document.
	* @param {Object} config optional The configuration object containing the initial configuration values for the Calendar.
	*/
	init : function(id, container, config) {
		// Normalize 2.4.0, pre 2.4.0 args
		var nArgs = this._parseArgs(arguments);

		id = nArgs.id;
		container = nArgs.container;
		config = nArgs.config;

		this.oDomContainer = YAHOO.util.Dom.get(container);

		if (!this.oDomContainer.id) {
			this.oDomContainer.id = YAHOO.util.Dom.generateId();
		}
		if (!id) {
			id = this.oDomContainer.id + "_t";
		}

		this.id = id;
		this.containerId = this.oDomContainer.id;

		this.initEvents();

		this.today = new Date();
		YAHOO.widget.DateMath.clearTime(this.today);

		/**
		* The Config object used to hold the configuration variables for the Calendar
		* @property cfg
		* @type YAHOO.util.Config
		*/
		this.cfg = new YAHOO.util.Config(this);

		/**
		* The local object which contains the Calendar's options
		* @property Options
		* @type Object
		*/
		this.Options = {};

		/**
		* The local object which contains the Calendar's locale settings
		* @property Locale
		* @type Object
		*/
		this.Locale = {};

		this.initStyles();

		YAHOO.util.Dom.addClass(this.oDomContainer, this.Style.CSS_CONTAINER);
		YAHOO.util.Dom.addClass(this.oDomContainer, this.Style.CSS_SINGLE);

		this.cellDates = [];
		this.cells = [];
		this.renderStack = [];
		this._renderStack = [];

		this.setupConfig();

		if (config) {
			this.cfg.applyConfig(config, true);
		}

		this.cfg.fireQueue();
	},

	/**
	* Default Config listener for the iframe property. If the iframe config property is set to true, 
	* renders the built-in IFRAME shim if the container is relatively or absolutely positioned.
	* 
	* @method configIframe
	*/
	configIframe : function(type, args, obj) {
		var useIframe = args[0];
	
		if (!this.parent) {
			if (YAHOO.util.Dom.inDocument(this.oDomContainer)) {
				if (useIframe) {
					var pos = YAHOO.util.Dom.getStyle(this.oDomContainer, "position");
					
					if (pos == "absolute" || pos == "relative") {
						
						if (!YAHOO.util.Dom.inDocument(this.iframe)) {
							this.iframe = document.createElement("iframe");
							this.iframe.src = "javascript:false;";
	
							YAHOO.util.Dom.setStyle(this.iframe, "opacity", "0");
	
							if (YAHOO.env.ua.ie && YAHOO.env.ua.ie <= 6) {
								YAHOO.util.Dom.addClass(this.iframe, "fixedsize");
							}
	
							this.oDomContainer.insertBefore(this.iframe, this.oDomContainer.firstChild);
						}
					}
				} else {
					if (this.iframe) {
						if (this.iframe.parentNode) {
							this.iframe.parentNode.removeChild(this.iframe);
						}
						this.iframe = null;
					}
				}
			}
		}
	},

	/**
	* Default handler for the "title" property
	* @method configTitle
	*/
	configTitle : function(type, args, obj) {
		var title = args[0];

		// "" disables title bar
		if (title) {
			this.createTitleBar(title);
		} else {
			var close = this.cfg.getProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.CLOSE.key);
			if (!close) {
				this.removeTitleBar();
			} else {
				this.createTitleBar("&#160;");
			}
		}
	},
	
	/**
	* Default handler for the "close" property
	* @method configClose
	*/
	configClose : function(type, args, obj) {
		var close = args[0],
			title = this.cfg.getProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.TITLE.key);
	
		if (close) {
			if (!title) {
				this.createTitleBar("&#160;");
			}
			this.createCloseButton();
		} else {
			this.removeCloseButton();
			if (!title) {
				this.removeTitleBar();
			}
		}
	},
	
	/**
	* Initializes Calendar's built-in CustomEvents
	* @method initEvents
	*/
	initEvents : function() {
	
		var defEvents = YAHOO.widget.Calendar._EVENT_TYPES;
	
		/**
		* Fired before a selection is made
		* @event beforeSelectEvent
		*/
		this.beforeSelectEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_SELECT); 
	
		/**
		* Fired when a selection is made
		* @event selectEvent
		* @param {Array}	Array of Date field arrays in the format [YYYY, MM, DD].
		*/
		this.selectEvent = new YAHOO.util.CustomEvent(defEvents.SELECT);
	
		/**
		* Fired before a selection is made
		* @event beforeDeselectEvent
		*/
		this.beforeDeselectEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_DESELECT);
	
		/**
		* Fired when a selection is made
		* @event deselectEvent
		* @param {Array}	Array of Date field arrays in the format [YYYY, MM, DD].
		*/
		this.deselectEvent = new YAHOO.util.CustomEvent(defEvents.DESELECT);
	
		/**
		* Fired when the Calendar page is changed
		* @event changePageEvent
		*/
		this.changePageEvent = new YAHOO.util.CustomEvent(defEvents.CHANGE_PAGE);
	
		/**
		* Fired before the Calendar is rendered
		* @event beforeRenderEvent
		*/
		this.beforeRenderEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_RENDER);
	
		/**
		* Fired when the Calendar is rendered
		* @event renderEvent
		*/
		this.renderEvent = new YAHOO.util.CustomEvent(defEvents.RENDER);
	
		/**
		* Fired when the Calendar is reset
		* @event resetEvent
		*/
		this.resetEvent = new YAHOO.util.CustomEvent(defEvents.RESET);
	
		/**
		* Fired when the Calendar is cleared
		* @event clearEvent
		*/
		this.clearEvent = new YAHOO.util.CustomEvent(defEvents.CLEAR);
	
		/**
		* Fired just before the Calendar is to be shown
		* @event beforeShowEvent
		*/
		this.beforeShowEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_SHOW);
	
		/**
		* Fired after the Calendar is shown
		* @event showEvent
		*/
		this.showEvent = new YAHOO.util.CustomEvent(defEvents.SHOW);
	
		/**
		* Fired just before the Calendar is to be hidden
		* @event beforeHideEvent
		*/
		this.beforeHideEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_HIDE);
	
		/**
		* Fired after the Calendar is hidden
		* @event hideEvent
		*/
		this.hideEvent = new YAHOO.util.CustomEvent(defEvents.HIDE);

		/**
		* Fired just before the CalendarNavigator is to be shown
		* @event beforeShowNavEvent
		*/
		this.beforeShowNavEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_SHOW_NAV);
	
		/**
		* Fired after the CalendarNavigator is shown
		* @event showNavEvent
		*/
		this.showNavEvent = new YAHOO.util.CustomEvent(defEvents.SHOW_NAV);
	
		/**
		* Fired just before the CalendarNavigator is to be hidden
		* @event beforeHideNavEvent
		*/
		this.beforeHideNavEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_HIDE_NAV);
	
		/**
		* Fired after the CalendarNavigator is hidden
		* @event hideNavEvent
		*/
		this.hideNavEvent = new YAHOO.util.CustomEvent(defEvents.HIDE_NAV);

		/**
		* Fired just before the CalendarNavigator is to be rendered
		* @event beforeRenderNavEvent
		*/
		this.beforeRenderNavEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_RENDER_NAV);

		/**
		* Fired after the CalendarNavigator is rendered
		* @event renderNavEvent
		*/
		this.renderNavEvent = new YAHOO.util.CustomEvent(defEvents.RENDER_NAV);

		this.beforeSelectEvent.subscribe(this.onBeforeSelect, this, true);
		this.selectEvent.subscribe(this.onSelect, this, true);
		this.beforeDeselectEvent.subscribe(this.onBeforeDeselect, this, true);
		this.deselectEvent.subscribe(this.onDeselect, this, true);
		this.changePageEvent.subscribe(this.onChangePage, this, true);
		this.renderEvent.subscribe(this.onRender, this, true);
		this.resetEvent.subscribe(this.onReset, this, true);
		this.clearEvent.subscribe(this.onClear, this, true);
	},
	
	/**
	* The default event function that is attached to a date link within a calendar cell
	* when the calendar is rendered.
	* @method doSelectCell
	* @param {DOMEvent} e	The event
	* @param {Calendar} cal	A reference to the calendar passed by the Event utility
	*/
	doSelectCell : function(e, cal) {
		var cell,index,d,date;

		var target = YAHOO.util.Event.getTarget(e);
		var tagName = target.tagName.toLowerCase();
		var defSelector = false;

		while (tagName != "td" && ! YAHOO.util.Dom.hasClass(target, cal.Style.CSS_CELL_SELECTABLE)) {

			if (!defSelector && tagName == "a" && YAHOO.util.Dom.hasClass(target, cal.Style.CSS_CELL_SELECTOR)) {
				defSelector = true;	
			}

			target = target.parentNode;
			tagName = target.tagName.toLowerCase();
			// TODO: No need to go all the way up to html.
			if (tagName == "html") {
				return;
			}
		}

		if (defSelector) {
			// Stop link href navigation for default renderer
			YAHOO.util.Event.preventDefault(e);
		}
	
		cell = target;

		if (YAHOO.util.Dom.hasClass(cell, cal.Style.CSS_CELL_SELECTABLE)) {
			index = cell.id.split("cell")[1];
			d = cal.cellDates[index];
			date = YAHOO.widget.DateMath.getDate(d[0],d[1]-1,d[2]);
		
			var link;

			if (cal.Options.MULTI_SELECT) {
				link = cell.getElementsByTagName("a")[0];
				if (link) {
					link.blur();
				}

				var cellDate = cal.cellDates[index];
				var cellDateIndex = cal._indexOfSelectedFieldArray(cellDate);

				if (cellDateIndex > -1) {	
					cal.deselectCell(index);
				} else {
					cal.selectCell(index);
				}	
	
			} else {
				link = cell.getElementsByTagName("a")[0];
				if (link) {
					link.blur();
				}
				cal.selectCell(index);
			}
		}
	},

	/**
	* The event that is executed when the user hovers over a cell
	* @method doCellMouseOver
	* @param {DOMEvent} e	The event
	* @param {Calendar} cal	A reference to the calendar passed by the Event utility
	*/
	doCellMouseOver : function(e, cal) {
		var target;
		if (e) {
			target = YAHOO.util.Event.getTarget(e);
		} else {
			target = this;
		}

		while (target.tagName && target.tagName.toLowerCase() != "td") {
			target = target.parentNode;
			if (!target.tagName || target.tagName.toLowerCase() == "html") {
				return;
			}
		}

		if (YAHOO.util.Dom.hasClass(target, cal.Style.CSS_CELL_SELECTABLE)) {
			YAHOO.util.Dom.addClass(target, cal.Style.CSS_CELL_HOVER);
		}
	},

	/**
	* The event that is executed when the user moves the mouse out of a cell
	* @method doCellMouseOut
	* @param {DOMEvent} e	The event
	* @param {Calendar} cal	A reference to the calendar passed by the Event utility
	*/
	doCellMouseOut : function(e, cal) {
		var target;
		if (e) {
			target = YAHOO.util.Event.getTarget(e);
		} else {
			target = this;
		}

		while (target.tagName && target.tagName.toLowerCase() != "td") {
			target = target.parentNode;
			if (!target.tagName || target.tagName.toLowerCase() == "html") {
				return;
			}
		}

		if (YAHOO.util.Dom.hasClass(target, cal.Style.CSS_CELL_SELECTABLE)) {
			YAHOO.util.Dom.removeClass(target, cal.Style.CSS_CELL_HOVER);
		}
	},
	
	setupConfig : function() {
	
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;

		/**
		* The month/year representing the current visible Calendar date (mm/yyyy)
		* @config pagedate
		* @type String
		* @default today's date
		*/
		this.cfg.addProperty(defCfg.PAGEDATE.key, { value:new Date(), handler:this.configPageDate } );

		/**
		* The date or range of dates representing the current Calendar selection
		* @config selected
		* @type String
		* @default []
		*/
		this.cfg.addProperty(defCfg.SELECTED.key, { value:[], handler:this.configSelected } );

		/**
		* The title to display above the Calendar's month header
		* @config title
		* @type String
		* @default ""
		*/
		this.cfg.addProperty(defCfg.TITLE.key, { value:defCfg.TITLE.value, handler:this.configTitle } );

		/**
		* Whether or not a close button should be displayed for this Calendar
		* @config close
		* @type Boolean
		* @default false
		*/
		this.cfg.addProperty(defCfg.CLOSE.key, { value:defCfg.CLOSE.value, handler:this.configClose } );

		/**
		* Whether or not an iframe shim should be placed under the Calendar to prevent select boxes from bleeding through in Internet Explorer 6 and below.
		* This property is enabled by default for IE6 and below. It is disabled by default for other browsers for performance reasons, but can be 
		* enabled if required.
		* 
		* @config iframe
		* @type Boolean
		* @default true for IE6 and below, false for all other browsers
		*/
		this.cfg.addProperty(defCfg.IFRAME.key, { value:defCfg.IFRAME.value, handler:this.configIframe, validator:this.cfg.checkBoolean } );

		/**
		* The minimum selectable date in the current Calendar (mm/dd/yyyy)
		* @config mindate
		* @type String
		* @default null
		*/
		this.cfg.addProperty(defCfg.MINDATE.key, { value:defCfg.MINDATE.value, handler:this.configMinDate } );

		/**
		* The maximum selectable date in the current Calendar (mm/dd/yyyy)
		* @config maxdate
		* @type String
		* @default null
		*/
		this.cfg.addProperty(defCfg.MAXDATE.key, { value:defCfg.MAXDATE.value, handler:this.configMaxDate } );
	
	
		// Options properties
	
		/**
		* True if the Calendar should allow multiple selections. False by default.
		* @config MULTI_SELECT
		* @type Boolean
		* @default false
		*/
		this.cfg.addProperty(defCfg.MULTI_SELECT.key,	{ value:defCfg.MULTI_SELECT.value, handler:this.configOptions, validator:this.cfg.checkBoolean } );

		/**
		* The weekday the week begins on. Default is 0 (Sunday = 0, Monday = 1 ... Saturday = 6).
		* @config START_WEEKDAY
		* @type number
		* @default 0
		*/
		this.cfg.addProperty(defCfg.START_WEEKDAY.key,	{ value:defCfg.START_WEEKDAY.value, handler:this.configOptions, validator:this.cfg.checkNumber  } );
	
		/**
		* True if the Calendar should show weekday labels. True by default.
		* @config SHOW_WEEKDAYS
		* @type Boolean
		* @default true
		*/
		this.cfg.addProperty(defCfg.SHOW_WEEKDAYS.key,	{ value:defCfg.SHOW_WEEKDAYS.value, handler:this.configOptions, validator:this.cfg.checkBoolean  } );
	
		/**
		* True if the Calendar should show week row headers. False by default.
		* @config SHOW_WEEK_HEADER
		* @type Boolean
		* @default false
		*/
		this.cfg.addProperty(defCfg.SHOW_WEEK_HEADER.key, { value:defCfg.SHOW_WEEK_HEADER.value, handler:this.configOptions, validator:this.cfg.checkBoolean } );
	
		/**
		* True if the Calendar should show week row footers. False by default.
		* @config SHOW_WEEK_FOOTER
		* @type Boolean
		* @default false
		*/	
		this.cfg.addProperty(defCfg.SHOW_WEEK_FOOTER.key,{ value:defCfg.SHOW_WEEK_FOOTER.value, handler:this.configOptions, validator:this.cfg.checkBoolean } );
	
		/**
		* True if the Calendar should suppress weeks that are not a part of the current month. False by default.
		* @config HIDE_BLANK_WEEKS
		* @type Boolean
		* @default false
		*/	
		this.cfg.addProperty(defCfg.HIDE_BLANK_WEEKS.key, { value:defCfg.HIDE_BLANK_WEEKS.value, handler:this.configOptions, validator:this.cfg.checkBoolean } );
		
		/**
		* The image that should be used for the left navigation arrow.
		* @config NAV_ARROW_LEFT
		* @type String
		* @deprecated	You can customize the image by overriding the default CSS class for the left arrow - "calnavleft"  
		* @default null
		*/	
		this.cfg.addProperty(defCfg.NAV_ARROW_LEFT.key,	{ value:defCfg.NAV_ARROW_LEFT.value, handler:this.configOptions } );
	
		/**
		* The image that should be used for the right navigation arrow.
		* @config NAV_ARROW_RIGHT
		* @type String
		* @deprecated	You can customize the image by overriding the default CSS class for the right arrow - "calnavright"
		* @default null
		*/	
		this.cfg.addProperty(defCfg.NAV_ARROW_RIGHT.key, { value:defCfg.NAV_ARROW_RIGHT.value, handler:this.configOptions } );
	
		// Locale properties
	
		/**
		* The short month labels for the current locale.
		* @config MONTHS_SHORT
		* @type String[]
		* @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		*/
		this.cfg.addProperty(defCfg.MONTHS_SHORT.key,	{ value:defCfg.MONTHS_SHORT.value, handler:this.configLocale } );
		
		/**
		* The long month labels for the current locale.
		* @config MONTHS_LONG
		* @type String[]
		* @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		*/	
		this.cfg.addProperty(defCfg.MONTHS_LONG.key,		{ value:defCfg.MONTHS_LONG.value, handler:this.configLocale } );

		/**
		* The 1-character weekday labels for the current locale.
		* @config WEEKDAYS_1CHAR
		* @type String[]
		* @default ["S", "M", "T", "W", "T", "F", "S"]
		*/	
		this.cfg.addProperty(defCfg.WEEKDAYS_1CHAR.key,	{ value:defCfg.WEEKDAYS_1CHAR.value, handler:this.configLocale } );
		
		/**
		* The short weekday labels for the current locale.
		* @config WEEKDAYS_SHORT
		* @type String[]
		* @default ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
		*/	
		this.cfg.addProperty(defCfg.WEEKDAYS_SHORT.key,	{ value:defCfg.WEEKDAYS_SHORT.value, handler:this.configLocale } );
		
		/**
		* The medium weekday labels for the current locale.
		* @config WEEKDAYS_MEDIUM
		* @type String[]
		* @default ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		*/	
		this.cfg.addProperty(defCfg.WEEKDAYS_MEDIUM.key,	{ value:defCfg.WEEKDAYS_MEDIUM.value, handler:this.configLocale } );
		
		/**
		* The long weekday labels for the current locale.
		* @config WEEKDAYS_LONG
		* @type String[]
		* @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		*/	
		this.cfg.addProperty(defCfg.WEEKDAYS_LONG.key,	{ value:defCfg.WEEKDAYS_LONG.value, handler:this.configLocale } );
	
		/**
		* Refreshes the locale values used to build the Calendar.
		* @method refreshLocale
		* @private
		*/
		var refreshLocale = function() {
			this.cfg.refireEvent(defCfg.LOCALE_MONTHS.key);
			this.cfg.refireEvent(defCfg.LOCALE_WEEKDAYS.key);
		};
	
		this.cfg.subscribeToConfigEvent(defCfg.START_WEEKDAY.key, refreshLocale, this, true);
		this.cfg.subscribeToConfigEvent(defCfg.MONTHS_SHORT.key, refreshLocale, this, true);
		this.cfg.subscribeToConfigEvent(defCfg.MONTHS_LONG.key, refreshLocale, this, true);
		this.cfg.subscribeToConfigEvent(defCfg.WEEKDAYS_1CHAR.key, refreshLocale, this, true);
		this.cfg.subscribeToConfigEvent(defCfg.WEEKDAYS_SHORT.key, refreshLocale, this, true);
		this.cfg.subscribeToConfigEvent(defCfg.WEEKDAYS_MEDIUM.key, refreshLocale, this, true);
		this.cfg.subscribeToConfigEvent(defCfg.WEEKDAYS_LONG.key, refreshLocale, this, true);
		
		/**
		* The setting that determines which length of month labels should be used. Possible values are "short" and "long".
		* @config LOCALE_MONTHS
		* @type String
		* @default "long"
		*/	
		this.cfg.addProperty(defCfg.LOCALE_MONTHS.key,	{ value:defCfg.LOCALE_MONTHS.value, handler:this.configLocaleValues } );
		
		/**
		* The setting that determines which length of weekday labels should be used. Possible values are "1char", "short", "medium", and "long".
		* @config LOCALE_WEEKDAYS
		* @type String
		* @default "short"
		*/	
		this.cfg.addProperty(defCfg.LOCALE_WEEKDAYS.key,	{ value:defCfg.LOCALE_WEEKDAYS.value, handler:this.configLocaleValues } );
	
		/**
		* The value used to delimit individual dates in a date string passed to various Calendar functions.
		* @config DATE_DELIMITER
		* @type String
		* @default ","
		*/	
		this.cfg.addProperty(defCfg.DATE_DELIMITER.key,		{ value:defCfg.DATE_DELIMITER.value, handler:this.configLocale } );
	
		/**
		* The value used to delimit date fields in a date string passed to various Calendar functions.
		* @config DATE_FIELD_DELIMITER
		* @type String
		* @default "/"
		*/	
		this.cfg.addProperty(defCfg.DATE_FIELD_DELIMITER.key, { value:defCfg.DATE_FIELD_DELIMITER.value, handler:this.configLocale } );
	
		/**
		* The value used to delimit date ranges in a date string passed to various Calendar functions.
		* @config DATE_RANGE_DELIMITER
		* @type String
		* @default "-"
		*/
		this.cfg.addProperty(defCfg.DATE_RANGE_DELIMITER.key, { value:defCfg.DATE_RANGE_DELIMITER.value, handler:this.configLocale } );
	
		/**
		* The position of the month in a month/year date string
		* @config MY_MONTH_POSITION
		* @type Number
		* @default 1
		*/
		this.cfg.addProperty(defCfg.MY_MONTH_POSITION.key,	{ value:defCfg.MY_MONTH_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the year in a month/year date string
		* @config MY_YEAR_POSITION
		* @type Number
		* @default 2
		*/
		this.cfg.addProperty(defCfg.MY_YEAR_POSITION.key,	{ value:defCfg.MY_YEAR_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the month in a month/day date string
		* @config MD_MONTH_POSITION
		* @type Number
		* @default 1
		*/
		this.cfg.addProperty(defCfg.MD_MONTH_POSITION.key,	{ value:defCfg.MD_MONTH_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the day in a month/year date string
		* @config MD_DAY_POSITION
		* @type Number
		* @default 2
		*/
		this.cfg.addProperty(defCfg.MD_DAY_POSITION.key,		{ value:defCfg.MD_DAY_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the month in a month/day/year date string
		* @config MDY_MONTH_POSITION
		* @type Number
		* @default 1
		*/
		this.cfg.addProperty(defCfg.MDY_MONTH_POSITION.key,	{ value:defCfg.MDY_MONTH_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the day in a month/day/year date string
		* @config MDY_DAY_POSITION
		* @type Number
		* @default 2
		*/
		this.cfg.addProperty(defCfg.MDY_DAY_POSITION.key,	{ value:defCfg.MDY_DAY_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the year in a month/day/year date string
		* @config MDY_YEAR_POSITION
		* @type Number
		* @default 3
		*/
		this.cfg.addProperty(defCfg.MDY_YEAR_POSITION.key,	{ value:defCfg.MDY_YEAR_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
		
		/**
		* The position of the month in the month year label string used as the Calendar header
		* @config MY_LABEL_MONTH_POSITION
		* @type Number
		* @default 1
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_MONTH_POSITION.key,	{ value:defCfg.MY_LABEL_MONTH_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the year in the month year label string used as the Calendar header
		* @config MY_LABEL_YEAR_POSITION
		* @type Number
		* @default 2
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_YEAR_POSITION.key,	{ value:defCfg.MY_LABEL_YEAR_POSITION.value, handler:this.configLocale, validator:this.cfg.checkNumber } );
		
		/**
		* The suffix used after the month when rendering the Calendar header
		* @config MY_LABEL_MONTH_SUFFIX
		* @type String
		* @default " "
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_MONTH_SUFFIX.key,	{ value:defCfg.MY_LABEL_MONTH_SUFFIX.value, handler:this.configLocale } );
		
		/**
		* The suffix used after the year when rendering the Calendar header
		* @config MY_LABEL_YEAR_SUFFIX
		* @type String
		* @default ""
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_YEAR_SUFFIX.key, { value:defCfg.MY_LABEL_YEAR_SUFFIX.value, handler:this.configLocale } );

		/**
		* Configuration for the Month/Year CalendarNavigator UI which allows the user to jump directly to a 
		* specific Month/Year without having to scroll sequentially through months.
		* <p>
		* Setting this property to null (default value) or false, will disable the CalendarNavigator UI.
		* </p>
		* <p>
		* Setting this property to true will enable the CalendarNavigatior UI with the default CalendarNavigator configuration values.
		* </p>
		* <p>
		* This property can also be set to an object literal containing configuration properties for the CalendarNavigator UI.
		* The configuration object expects the the following case-sensitive properties, with the "strings" property being a nested object.
		* Any properties which are not provided will use the default values (defined in the CalendarNavigator class).
		* </p>
		* <dl>
		* <dt>strings</dt>
		* <dd><em>Object</em> :  An object with the properties shown below, defining the string labels to use in the Navigator's UI
		*     <dl>
		*         <dt>month</dt><dd><em>String</em> : The string to use for the month label. Defaults to "Month".</dd>
		*         <dt>year</dt><dd><em>String</em> : The string to use for the year label. Defaults to "Year".</dd>
		*         <dt>submit</dt><dd><em>String</em> : The string to use for the submit button label. Defaults to "Okay".</dd>
		*         <dt>cancel</dt><dd><em>String</em> : The string to use for the cancel button label. Defaults to "Cancel".</dd>
		*         <dt>invalidYear</dt><dd><em>String</em> : The string to use for invalid year values. Defaults to "Year needs to be a number".</dd>
		*     </dl>
		* </dd>
		* <dt>monthFormat</dt><dd><em>String</em> : The month format to use. Either YAHOO.widget.Calendar.LONG, or YAHOO.widget.Calendar.SHORT. Defaults to YAHOO.widget.Calendar.LONG</dd>
		* <dt>initialFocus</dt><dd><em>String</em> : Either "year" or "month" specifying which input control should get initial focus. Defaults to "year"</dd>
		* </dl>
		* <p>E.g.</p>
		* <pre>
		* var navConfig = {
		*	  strings: {
		*		  month:"Calendar Month",
		*		  year:"Calendar Year",
		*		  submit: "Submit",
		*		  cancel: "Cancel",
		*		  invalidYear: "Please enter a valid year"
		*	  },
		*	  monthFormat: YAHOO.widget.Calendar.SHORT,
		*	  initialFocus: "month"
		* }
		* </pre>
		* @config navigator
		* @type {Object|Boolean}
		* @default null
		*/
		this.cfg.addProperty(defCfg.NAV.key, { value:defCfg.NAV.value, handler:this.configNavigator } );
	},

	/**
	* The default handler for the "pagedate" property
	* @method configPageDate
	*/
	configPageDate : function(type, args, obj) {
		this.cfg.setProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key, this._parsePageDate(args[0]), true);
	},

	/**
	* The default handler for the "mindate" property
	* @method configMinDate
	*/
	configMinDate : function(type, args, obj) {
		var val = args[0];
		if (YAHOO.lang.isString(val)) {
			val = this._parseDate(val);
			this.cfg.setProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.MINDATE.key, YAHOO.widget.DateMath.getDate(val[0],(val[1]-1),val[2]));
		}
	},

	/**
	* The default handler for the "maxdate" property
	* @method configMaxDate
	*/
	configMaxDate : function(type, args, obj) {
		var val = args[0];
		if (YAHOO.lang.isString(val)) {
			val = this._parseDate(val);
			this.cfg.setProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.MAXDATE.key, YAHOO.widget.DateMath.getDate(val[0],(val[1]-1),val[2]));
		}
	},
	
	/**
	* The default handler for the "selected" property
	* @method configSelected
	*/
	configSelected : function(type, args, obj) {
		var selected = args[0];
		var cfgSelected = YAHOO.widget.Calendar._DEFAULT_CONFIG.SELECTED.key;
		
		if (selected) {
			if (YAHOO.lang.isString(selected)) {
				this.cfg.setProperty(cfgSelected, this._parseDates(selected), true);
			} 
		}
		if (! this._selectedDates) {
			this._selectedDates = this.cfg.getProperty(cfgSelected);
		}
	},
	
	/**
	* The default handler for all configuration options properties
	* @method configOptions
	*/
	configOptions : function(type, args, obj) {
		this.Options[type.toUpperCase()] = args[0];
	},
	
	/**
	* The default handler for all configuration locale properties
	* @method configLocale
	*/
	configLocale : function(type, args, obj) {
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
		this.Locale[type.toUpperCase()] = args[0];
	
		this.cfg.refireEvent(defCfg.LOCALE_MONTHS.key);
		this.cfg.refireEvent(defCfg.LOCALE_WEEKDAYS.key);
	},
	
	/**
	* The default handler for all configuration locale field length properties
	* @method configLocaleValues
	*/
	configLocaleValues : function(type, args, obj) {
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG; 
	
		type = type.toLowerCase();
		var val = args[0];
	
		switch (type) {
			case defCfg.LOCALE_MONTHS.key:
				switch (val) {
					case YAHOO.widget.Calendar.SHORT:
						this.Locale.LOCALE_MONTHS = this.cfg.getProperty(defCfg.MONTHS_SHORT.key).concat();
						break;
					case YAHOO.widget.Calendar.LONG:
						this.Locale.LOCALE_MONTHS = this.cfg.getProperty(defCfg.MONTHS_LONG.key).concat();
						break;
				}
				break;
			case defCfg.LOCALE_WEEKDAYS.key:
				switch (val) {
					case YAHOO.widget.Calendar.ONE_CHAR:
						this.Locale.LOCALE_WEEKDAYS = this.cfg.getProperty(defCfg.WEEKDAYS_1CHAR.key).concat();
						break;
					case YAHOO.widget.Calendar.SHORT:
						this.Locale.LOCALE_WEEKDAYS = this.cfg.getProperty(defCfg.WEEKDAYS_SHORT.key).concat();
						break;
					case YAHOO.widget.Calendar.MEDIUM:
						this.Locale.LOCALE_WEEKDAYS = this.cfg.getProperty(defCfg.WEEKDAYS_MEDIUM.key).concat();
						break;
					case YAHOO.widget.Calendar.LONG:
						this.Locale.LOCALE_WEEKDAYS = this.cfg.getProperty(defCfg.WEEKDAYS_LONG.key).concat();
						break;
				}
				
				var START_WEEKDAY = this.cfg.getProperty(defCfg.START_WEEKDAY.key);
	
				if (START_WEEKDAY > 0) {
					for (var w=0;w<START_WEEKDAY;++w) {
						this.Locale.LOCALE_WEEKDAYS.push(this.Locale.LOCALE_WEEKDAYS.shift());
					}
				}
				break;
		}
	},

	/**
	 * The default handler for the "navigator" property
	 * @method configNavigator
	 */
	configNavigator : function(type, args, obj) {
		var val = args[0];
		if (YAHOO.widget.CalendarNavigator && (val === true || YAHOO.lang.isObject(val))) {
			if (!this.oNavigator) {
				this.oNavigator = new YAHOO.widget.CalendarNavigator(this);
				// Cleanup DOM Refs/Events before innerHTML is removed.
				function erase() {
					if (!this.pages) {
						this.oNavigator.erase();
					}
				}
				this.beforeRenderEvent.subscribe(erase, this, true);
			}
		} else {
			if (this.oNavigator) {
				this.oNavigator.destroy();
				this.oNavigator = null;
			}
		}
	},

	/**
	* Defines the style constants for the Calendar
	* @method initStyles
	*/
	initStyles : function() {

		var defStyle = YAHOO.widget.Calendar._STYLES;

		this.Style = {
			/**
			* @property Style.CSS_ROW_HEADER
			*/
			CSS_ROW_HEADER: defStyle.CSS_ROW_HEADER,
			/**
			* @property Style.CSS_ROW_FOOTER
			*/
			CSS_ROW_FOOTER: defStyle.CSS_ROW_FOOTER,
			/**
			* @property Style.CSS_CELL
			*/
			CSS_CELL : defStyle.CSS_CELL,
			/**
			* @property Style.CSS_CELL_SELECTOR
			*/
			CSS_CELL_SELECTOR : defStyle.CSS_CELL_SELECTOR,
			/**
			* @property Style.CSS_CELL_SELECTED
			*/
			CSS_CELL_SELECTED : defStyle.CSS_CELL_SELECTED,
			/**
			* @property Style.CSS_CELL_SELECTABLE
			*/
			CSS_CELL_SELECTABLE : defStyle.CSS_CELL_SELECTABLE,
			/**
			* @property Style.CSS_CELL_RESTRICTED
			*/
			CSS_CELL_RESTRICTED : defStyle.CSS_CELL_RESTRICTED,
			/**
			* @property Style.CSS_CELL_TODAY
			*/
			CSS_CELL_TODAY : defStyle.CSS_CELL_TODAY,
			/**
			* @property Style.CSS_CELL_OOM
			*/
			CSS_CELL_OOM : defStyle.CSS_CELL_OOM,
			/**
			* @property Style.CSS_CELL_OOB
			*/
			CSS_CELL_OOB : defStyle.CSS_CELL_OOB,
			/**
			* @property Style.CSS_HEADER
			*/
			CSS_HEADER : defStyle.CSS_HEADER,
			/**
			* @property Style.CSS_HEADER_TEXT
			*/
			CSS_HEADER_TEXT : defStyle.CSS_HEADER_TEXT,
			/**
			* @property Style.CSS_BODY
			*/
			CSS_BODY : defStyle.CSS_BODY,
			/**
			* @property Style.CSS_WEEKDAY_CELL
			*/
			CSS_WEEKDAY_CELL : defStyle.CSS_WEEKDAY_CELL,
			/**
			* @property Style.CSS_WEEKDAY_ROW
			*/
			CSS_WEEKDAY_ROW : defStyle.CSS_WEEKDAY_ROW,
			/**
			* @property Style.CSS_FOOTER
			*/
			CSS_FOOTER : defStyle.CSS_FOOTER,
			/**
			* @property Style.CSS_CALENDAR
			*/
			CSS_CALENDAR : defStyle.CSS_CALENDAR,
			/**
			* @property Style.CSS_SINGLE
			*/
			CSS_SINGLE : defStyle.CSS_SINGLE,
			/**
			* @property Style.CSS_CONTAINER
			*/
			CSS_CONTAINER : defStyle.CSS_CONTAINER,
			/**
			* @property Style.CSS_NAV_LEFT
			*/
			CSS_NAV_LEFT : defStyle.CSS_NAV_LEFT,
			/**
			* @property Style.CSS_NAV_RIGHT
			*/
			CSS_NAV_RIGHT : defStyle.CSS_NAV_RIGHT,
			/**
			* @property Style.CSS_NAV
			*/
			CSS_NAV : defStyle.CSS_NAV,
			/**
			* @property Style.CSS_CLOSE
			*/
			CSS_CLOSE : defStyle.CSS_CLOSE,
			/**
			* @property Style.CSS_CELL_TOP
			*/
			CSS_CELL_TOP : defStyle.CSS_CELL_TOP,
			/**
			* @property Style.CSS_CELL_LEFT
			*/
			CSS_CELL_LEFT : defStyle.CSS_CELL_LEFT,
			/**
			* @property Style.CSS_CELL_RIGHT
			*/
			CSS_CELL_RIGHT : defStyle.CSS_CELL_RIGHT,
			/**
			* @property Style.CSS_CELL_BOTTOM
			*/
			CSS_CELL_BOTTOM : defStyle.CSS_CELL_BOTTOM,
			/**
			* @property Style.CSS_CELL_HOVER
			*/
			CSS_CELL_HOVER : defStyle.CSS_CELL_HOVER,
			/**
			* @property Style.CSS_CELL_HIGHLIGHT1
			*/
			CSS_CELL_HIGHLIGHT1 : defStyle.CSS_CELL_HIGHLIGHT1,
			/**
			* @property Style.CSS_CELL_HIGHLIGHT2
			*/
			CSS_CELL_HIGHLIGHT2 : defStyle.CSS_CELL_HIGHLIGHT2,
			/**
			* @property Style.CSS_CELL_HIGHLIGHT3
			*/
			CSS_CELL_HIGHLIGHT3 : defStyle.CSS_CELL_HIGHLIGHT3,
			/**
			* @property Style.CSS_CELL_HIGHLIGHT4
			*/
			CSS_CELL_HIGHLIGHT4 : defStyle.CSS_CELL_HIGHLIGHT4
		};
	},
	
	/**
	* Builds the date label that will be displayed in the calendar header or
	* footer, depending on configuration.
	* @method buildMonthLabel
	* @return	{String}	The formatted calendar month label
	*/
	buildMonthLabel : function() {
		var pageDate = this.cfg.getProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key);
	
		var monthLabel  = this.Locale.LOCALE_MONTHS[pageDate.getMonth()] + this.Locale.MY_LABEL_MONTH_SUFFIX;
		var yearLabel = pageDate.getFullYear() + this.Locale.MY_LABEL_YEAR_SUFFIX;

		if (this.Locale.MY_LABEL_MONTH_POSITION == 2 || this.Locale.MY_LABEL_YEAR_POSITION == 1) {
			return yearLabel + monthLabel;
		} else {
			return monthLabel + yearLabel;
		}
	},
	
	/**
	* Builds the date digit that will be displayed in calendar cells
	* @method buildDayLabel
	* @param {Date}	workingDate	The current working date
	* @return	{String}	The formatted day label
	*/
	buildDayLabel : function(workingDate) {
		return workingDate.getDate();
	},
	
	/**
	 * Creates the title bar element and adds it to Calendar container DIV
	 * 
	 * @method createTitleBar
	 * @param {String} strTitle The title to display in the title bar
	 * @return The title bar element
	 */
	createTitleBar : function(strTitle) {
		var tDiv = YAHOO.util.Dom.getElementsByClassName(YAHOO.widget.CalendarGroup.CSS_2UPTITLE, "div", this.oDomContainer)[0] || document.createElement("div");
		tDiv.className = YAHOO.widget.CalendarGroup.CSS_2UPTITLE;
		tDiv.innerHTML = strTitle;
		this.oDomContainer.insertBefore(tDiv, this.oDomContainer.firstChild);
	
		YAHOO.util.Dom.addClass(this.oDomContainer, "withtitle");
	
		return tDiv;
	},
	
	/**
	 * Removes the title bar element from the DOM
	 * 
	 * @method removeTitleBar
	 */
	removeTitleBar : function() {
		var tDiv = YAHOO.util.Dom.getElementsByClassName(YAHOO.widget.CalendarGroup.CSS_2UPTITLE, "div", this.oDomContainer)[0] || null;
		if (tDiv) {
			YAHOO.util.Event.purgeElement(tDiv);
			this.oDomContainer.removeChild(tDiv);
		}
		YAHOO.util.Dom.removeClass(this.oDomContainer, "withtitle");
	},
	
	/**
	 * Creates the close button HTML element and adds it to Calendar container DIV
	 * 
	 * @method createCloseButton
	 * @return The close HTML element created
	 */
	createCloseButton : function() {
		var Dom = YAHOO.util.Dom,
			Event = YAHOO.util.Event,
			cssClose = YAHOO.widget.CalendarGroup.CSS_2UPCLOSE,
			DEPR_CLOSE_PATH = "us/my/bn/x_d.gif";
	
		var lnk = Dom.getElementsByClassName("link-close", "a", this.oDomContainer)[0];
	
		if (!lnk) {
			lnk = document.createElement("a");  
			Event.addListener(lnk, "click", function(e, cal) {
				cal.hide(); 
				Event.preventDefault(e);
			}, this);        
		}
	
		lnk.href = "#";
		lnk.className = "link-close";
	
		if (YAHOO.widget.Calendar.IMG_ROOT !== null) {
			var img = Dom.getElementsByClassName(cssClose, "img", lnk)[0] || document.createElement("img");
			img.src = YAHOO.widget.Calendar.IMG_ROOT + DEPR_CLOSE_PATH;
			img.className = cssClose;
			lnk.appendChild(img);
		} else {
			lnk.innerHTML = '<span class="' + cssClose + ' ' + this.Style.CSS_CLOSE + '"></span>';
		}
		this.oDomContainer.appendChild(lnk);
	
		return lnk;
	},
	
	/**
	 * Removes the close button HTML element from the DOM
	 * 
	 * @method removeCloseButton
	 */
	removeCloseButton : function() {
		var btn = YAHOO.util.Dom.getElementsByClassName("link-close", "a", this.oDomContainer)[0] || null;
		if (btn) {
			YAHOO.util.Event.purgeElement(btn);
			this.oDomContainer.removeChild(btn);
		}
	},

	/**
	* Renders the calendar header.
	* @method renderHeader
	* @param {Array}	html	The current working HTML array
	* @return {Array} The current working HTML array
	*/
	renderHeader : function(html) {
		var colSpan = 7;

		var DEPR_NAV_LEFT = "us/tr/callt.gif";
		var DEPR_NAV_RIGHT = "us/tr/calrt.gif";	
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
		
		if (this.cfg.getProperty(defCfg.SHOW_WEEK_HEADER.key)) {
			colSpan += 1;
		}
	
		if (this.cfg.getProperty(defCfg.SHOW_WEEK_FOOTER.key)) {
			colSpan += 1;
		}

		html[html.length] = "<thead>";
		html[html.length] =		"<tr>";
		html[html.length] =			'<th colspan="' + colSpan + '" class="' + this.Style.CSS_HEADER_TEXT + '">';
		html[html.length] =				'<div class="' + this.Style.CSS_HEADER + '">';

		var renderLeft, renderRight = false;

		if (this.parent) {
			if (this.index === 0) {
				renderLeft = true;
			}
			if (this.index == (this.parent.cfg.getProperty("pages") -1)) {
				renderRight = true;
			}
		} else {
			renderLeft = true;
			renderRight = true;
		}

		if (renderLeft) {
			var leftArrow = this.cfg.getProperty(defCfg.NAV_ARROW_LEFT.key);
			// Check for deprecated customization - If someone set IMG_ROOT, but didn't set NAV_ARROW_LEFT, then set NAV_ARROW_LEFT to the old deprecated value
			if (leftArrow === null && YAHOO.widget.Calendar.IMG_ROOT !== null) {
				leftArrow = YAHOO.widget.Calendar.IMG_ROOT + DEPR_NAV_LEFT;
			}
			var leftStyle = (leftArrow === null) ? "" : ' style="background-image:url(' + leftArrow + ')"';
			html[html.length] = '<a class="' + this.Style.CSS_NAV_LEFT + '"' + leftStyle + ' >&#160;</a>';
		}

		var lbl = this.buildMonthLabel();
		var cal = this.parent || this;
		if (cal.cfg.getProperty("navigator")) {
			lbl = "<a class=\"" + this.Style.CSS_NAV + "\" href=\"#\">" + lbl + "</a>";
		}
		html[html.length] = lbl;

		if (renderRight) {
			var rightArrow = this.cfg.getProperty(defCfg.NAV_ARROW_RIGHT.key);
			if (rightArrow === null && YAHOO.widget.Calendar.IMG_ROOT !== null) {
				rightArrow = YAHOO.widget.Calendar.IMG_ROOT + DEPR_NAV_RIGHT;
			}
			var rightStyle = (rightArrow === null) ? "" : ' style="background-image:url(' + rightArrow + ')"';
			html[html.length] = '<a class="' + this.Style.CSS_NAV_RIGHT + '"' + rightStyle + ' >&#160;</a>';
		}

		html[html.length] =	'</div>\n</th>\n</tr>';

		if (this.cfg.getProperty(defCfg.SHOW_WEEKDAYS.key)) {
			html = this.buildWeekdays(html);
		}
		
		html[html.length] = '</thead>';
	
		return html;
	},
	
	/**
	* Renders the Calendar's weekday headers.
	* @method buildWeekdays
	* @param {Array}	html	The current working HTML array
	* @return {Array} The current working HTML array
	*/
	buildWeekdays : function(html) {
	
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
	
		html[html.length] = '<tr class="' + this.Style.CSS_WEEKDAY_ROW + '">';
	
		if (this.cfg.getProperty(defCfg.SHOW_WEEK_HEADER.key)) {
			html[html.length] = '<th>&#160;</th>';
		}
	
		for(var i=0;i<this.Locale.LOCALE_WEEKDAYS.length;++i) {
			html[html.length] = '<th class="calweekdaycell">' + this.Locale.LOCALE_WEEKDAYS[i] + '</th>';
		}
	
		if (this.cfg.getProperty(defCfg.SHOW_WEEK_FOOTER.key)) {
			html[html.length] = '<th>&#160;</th>';
		}
	
		html[html.length] = '</tr>';
	
		return html;
	},
	
	/**
	* Renders the calendar body.
	* @method renderBody
	* @param {Date}	workingDate	The current working Date being used for the render process
	* @param {Array}	html	The current working HTML array
	* @return {Array} The current working HTML array
	*/
	renderBody : function(workingDate, html) {

		var DM = YAHOO.widget.DateMath,
			CAL = YAHOO.widget.Calendar,
			D = YAHOO.util.Dom,
			defCfg = CAL._DEFAULT_CONFIG;

		var startDay = this.cfg.getProperty(defCfg.START_WEEKDAY.key);

		this.preMonthDays = workingDate.getDay();
		if (startDay > 0) {
			this.preMonthDays -= startDay;
		}
		if (this.preMonthDays < 0) {
			this.preMonthDays += 7;
		}

		this.monthDays = DM.findMonthEnd(workingDate).getDate();
		this.postMonthDays = CAL.DISPLAY_DAYS-this.preMonthDays-this.monthDays;


		workingDate = DM.subtract(workingDate, DM.DAY, this.preMonthDays);
	
		var weekNum,
			weekClass,
			weekPrefix = "w",
			cellPrefix = "_cell",
			workingDayPrefix = "wd",
			dayPrefix = "d",
			cellRenderers,
			renderer,
			todayYear = this.today.getFullYear(),
			todayMonth = this.today.getMonth(),
			todayDate = this.today.getDate(),
			useDate = this.cfg.getProperty(defCfg.PAGEDATE.key),
			hideBlankWeeks = this.cfg.getProperty(defCfg.HIDE_BLANK_WEEKS.key),
			showWeekFooter = this.cfg.getProperty(defCfg.SHOW_WEEK_FOOTER.key),
			showWeekHeader = this.cfg.getProperty(defCfg.SHOW_WEEK_HEADER.key),
			mindate = this.cfg.getProperty(defCfg.MINDATE.key),
			maxdate = this.cfg.getProperty(defCfg.MAXDATE.key);

		if (mindate) {
			mindate = DM.clearTime(mindate);
		}
		if (maxdate) {
			maxdate = DM.clearTime(maxdate);
		}

		html[html.length] = '<tbody class="m' + (useDate.getMonth()+1) + ' ' + this.Style.CSS_BODY + '">';

		var i = 0,
			tempDiv = document.createElement("div"),
			cell = document.createElement("td");

		tempDiv.appendChild(cell);

		var cal = this.parent || this;

		for (var r=0;r<6;r++) {
			weekNum = DM.getWeekNumber(workingDate, startDay);
			weekClass = weekPrefix + weekNum;

			// Local OOM check for performance, since we already have pagedate
			if (r !== 0 && hideBlankWeeks === true && workingDate.getMonth() != useDate.getMonth()) {
				break;
			} else {
				html[html.length] = '<tr class="' + weekClass + '">';

				if (showWeekHeader) { html = this.renderRowHeader(weekNum, html); }

				for (var d=0; d < 7; d++){ // Render actual days

					cellRenderers = [];

					this.clearElement(cell);
					cell.className = this.Style.CSS_CELL;
					cell.id = this.id + cellPrefix + i;

					if (workingDate.getDate()		== todayDate && 
						workingDate.getMonth()		== todayMonth &&
						workingDate.getFullYear()	== todayYear) {
						cellRenderers[cellRenderers.length]=cal.renderCellStyleToday;
					}

					var workingArray = [workingDate.getFullYear(),workingDate.getMonth()+1,workingDate.getDate()];
					this.cellDates[this.cellDates.length] = workingArray; // Add this date to cellDates

					// Local OOM check for performance, since we already have pagedate
					if (workingDate.getMonth() != useDate.getMonth()) {
						cellRenderers[cellRenderers.length]=cal.renderCellNotThisMonth;
					} else {
						D.addClass(cell, workingDayPrefix + workingDate.getDay());
						D.addClass(cell, dayPrefix + workingDate.getDate());

						for (var s=0;s<this.renderStack.length;++s) {

							renderer = null;

							var rArray = this.renderStack[s],
								type = rArray[0],
								month,
								day,
								year;

							switch (type) {
								case CAL.DATE:
									month = rArray[1][1];
									day = rArray[1][2];
									year = rArray[1][0];

									if (workingDate.getMonth()+1 == month && workingDate.getDate() == day && workingDate.getFullYear() == year) {
										renderer = rArray[2];
										this.renderStack.splice(s,1);
									}
									break;
								case CAL.MONTH_DAY:
									month = rArray[1][0];
									day = rArray[1][1];

									if (workingDate.getMonth()+1 == month && workingDate.getDate() == day) {
										renderer = rArray[2];
										this.renderStack.splice(s,1);
									}
									break;
								case CAL.RANGE:
									var date1 = rArray[1][0],
										date2 = rArray[1][1],
										d1month = date1[1],
										d1day = date1[2],
										d1year = date1[0],
										d1 = DM.getDate(d1year, d1month-1, d1day),
										d2month = date2[1],
										d2day = date2[2],
										d2year = date2[0],
										d2 = DM.getDate(d2year, d2month-1, d2day);

									if (workingDate.getTime() >= d1.getTime() && workingDate.getTime() <= d2.getTime()) {
										renderer = rArray[2];
	
										if (workingDate.getTime()==d2.getTime()) { 
											this.renderStack.splice(s,1);
										}
									}
									break;
								case CAL.WEEKDAY:
									var weekday = rArray[1][0];
									if (workingDate.getDay()+1 == weekday) {
										renderer = rArray[2];
									}
									break;
								case CAL.MONTH:
									month = rArray[1][0];
									if (workingDate.getMonth()+1 == month) {
										renderer = rArray[2];
									}
									break;
							}

							if (renderer) {
								cellRenderers[cellRenderers.length]=renderer;
							}
						}

					}

					if (this._indexOfSelectedFieldArray(workingArray) > -1) {
						cellRenderers[cellRenderers.length]=cal.renderCellStyleSelected; 
					}

					if ((mindate && (workingDate.getTime() < mindate.getTime())) ||
						(maxdate && (workingDate.getTime() > maxdate.getTime()))
					) {
						cellRenderers[cellRenderers.length]=cal.renderOutOfBoundsDate;
					} else {
						cellRenderers[cellRenderers.length]=cal.styleCellDefault;
						cellRenderers[cellRenderers.length]=cal.renderCellDefault;	
					}

					for (var x=0; x < cellRenderers.length; ++x) {
						if (cellRenderers[x].call(cal, workingDate, cell) == CAL.STOP_RENDER) {
							break;
						}
					}

					workingDate.setTime(workingDate.getTime() + DM.ONE_DAY_MS);
					// Just in case we crossed DST/Summertime boundaries
					workingDate = DM.clearTime(workingDate);

					if (i >= 0 && i <= 6) {
						D.addClass(cell, this.Style.CSS_CELL_TOP);
					}
					if ((i % 7) === 0) {
						D.addClass(cell, this.Style.CSS_CELL_LEFT);
					}
					if (((i+1) % 7) === 0) {
						D.addClass(cell, this.Style.CSS_CELL_RIGHT);
					}

					var postDays = this.postMonthDays; 
					if (hideBlankWeeks && postDays >= 7) {
						var blankWeeks = Math.floor(postDays/7);
						for (var p=0;p<blankWeeks;++p) {
							postDays -= 7;
						}
					}
					
					if (i >= ((this.preMonthDays+postDays+this.monthDays)-7)) {
						D.addClass(cell, this.Style.CSS_CELL_BOTTOM);
					}
	
					html[html.length] = tempDiv.innerHTML;
					i++;
				}
	
				if (showWeekFooter) { html = this.renderRowFooter(weekNum, html); }
	
				html[html.length] = '</tr>';
			}
		}
	
		html[html.length] = '</tbody>';
	
		return html;
	},
	
	/**
	* Renders the calendar footer. In the default implementation, there is
	* no footer.
	* @method renderFooter
	* @param {Array}	html	The current working HTML array
	* @return {Array} The current working HTML array
	*/
	renderFooter : function(html) { return html; },
	
	/**
	* Renders the calendar after it has been configured. The render() method has a specific call chain that will execute
	* when the method is called: renderHeader, renderBody, renderFooter.
	* Refer to the documentation for those methods for information on 
	* individual render tasks.
	* @method render
	*/
	render : function() {
		this.beforeRenderEvent.fire();
	
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
	
		// Find starting day of the current month
		var workingDate = YAHOO.widget.DateMath.findMonthStart(this.cfg.getProperty(defCfg.PAGEDATE.key));
	
		this.resetRenderers();
		this.cellDates.length = 0;

		YAHOO.util.Event.purgeElement(this.oDomContainer, true);

		var html = [];
	
		html[html.length] = '<table cellSpacing="0" class="' + this.Style.CSS_CALENDAR + ' y' + workingDate.getFullYear() + '" id="' + this.id + '">';
		html = this.renderHeader(html);
		html = this.renderBody(workingDate, html);
		html = this.renderFooter(html);
		html[html.length] = '</table>';

		this.oDomContainer.innerHTML = html.join("\n");

		this.applyListeners();
		this.cells = this.oDomContainer.getElementsByTagName("td");
	
		this.cfg.refireEvent(defCfg.TITLE.key);
		this.cfg.refireEvent(defCfg.CLOSE.key);
		this.cfg.refireEvent(defCfg.IFRAME.key);
	
		this.renderEvent.fire();
	},

	/**
	* Applies the Calendar's DOM listeners to applicable elements.
	* @method applyListeners
	*/
	applyListeners : function() {
		var root = this.oDomContainer;
		var cal = this.parent || this;
		var anchor = "a";
		var mousedown = "mousedown";

		var linkLeft = YAHOO.util.Dom.getElementsByClassName(this.Style.CSS_NAV_LEFT, anchor, root);
		var linkRight = YAHOO.util.Dom.getElementsByClassName(this.Style.CSS_NAV_RIGHT, anchor, root);
	
		if (linkLeft && linkLeft.length > 0) {
			this.linkLeft = linkLeft[0];
			YAHOO.util.Event.addListener(this.linkLeft, mousedown, cal.previousMonth, cal, true);
		}

		if (linkRight && linkRight.length > 0) {
			this.linkRight = linkRight[0];
			YAHOO.util.Event.addListener(this.linkRight, mousedown, cal.nextMonth, cal, true);
		}

		if (cal.cfg.getProperty("navigator") !== null) {
			this.applyNavListeners();
		}

		if (this.domEventMap) {
			var el,elements;
			for (var cls in this.domEventMap) {	
				if (YAHOO.lang.hasOwnProperty(this.domEventMap, cls)) {
					var items = this.domEventMap[cls];
	
					if (! (items instanceof Array)) {
						items = [items];
					}
	
					for (var i=0;i<items.length;i++)	{
						var item = items[i];
						elements = YAHOO.util.Dom.getElementsByClassName(cls, item.tag, this.oDomContainer);
	
						for (var c=0;c<elements.length;c++) {
							el = elements[c];
							 YAHOO.util.Event.addListener(el, item.event, item.handler, item.scope, item.correct );
						}
					}
				}
			}
		}
	
		YAHOO.util.Event.addListener(this.oDomContainer, "click", this.doSelectCell, this);
		YAHOO.util.Event.addListener(this.oDomContainer, "mouseover", this.doCellMouseOver, this);
		YAHOO.util.Event.addListener(this.oDomContainer, "mouseout", this.doCellMouseOut, this);
	},

	applyNavListeners : function() {

		var E = YAHOO.util.Event;

		var calParent = this.parent || this;
		var cal = this;

		var navBtns = YAHOO.util.Dom.getElementsByClassName(this.Style.CSS_NAV, "a", this.oDomContainer);

		if (navBtns.length > 0) {

			function show(e, obj) {
				var target = E.getTarget(e);
				// this == navBtn
				if (this === target || YAHOO.util.Dom.isAncestor(this, target)) {
					E.preventDefault(e);
				}
				var navigator = calParent.oNavigator;
				if (navigator) {
					var pgdate = cal.cfg.getProperty("pagedate");
					navigator.setYear(pgdate.getFullYear());
					navigator.setMonth(pgdate.getMonth());
					navigator.show();
				}
			}
			E.addListener(navBtns, "click", show);
		}
	},

	/**
	* Retrieves the Date object for the specified Calendar cell
	* @method getDateByCellId
	* @param {String}	id	The id of the cell
	* @return {Date} The Date object for the specified Calendar cell
	*/
	getDateByCellId : function(id) {
		var date = this.getDateFieldsByCellId(id);
		return YAHOO.widget.DateMath.getDate(date[0],date[1]-1,date[2]);
	},
	
	/**
	* Retrieves the Date object for the specified Calendar cell
	* @method getDateFieldsByCellId
	* @param {String}	id	The id of the cell
	* @return {Array}	The array of Date fields for the specified Calendar cell
	*/
	getDateFieldsByCellId : function(id) {
		id = id.toLowerCase().split("_cell")[1];
		id = parseInt(id, 10);
		return this.cellDates[id];
	},
	
	/**
	 * Find the Calendar's cell index for a given date.
	 * If the date is not found, the method returns -1.
	 * <p>
	 * The returned index can be used to lookup the cell HTMLElement  
	 * using the Calendar's cells array or passed to selectCell to select 
	 * cells by index. 
	 * </p>
	 *
	 * See <a href="#cells">cells</a>, <a href="#selectCell">selectCell</a>.
	 *
	 * @method getCellIndex
	 * @param {Date} date JavaScript Date object, for which to find a cell index.
	 * @return {Number} The index of the date in Calendars cellDates/cells arrays, or -1 if the date 
	 * is not on the curently rendered Calendar page.
	 */
	getCellIndex : function(date) {
		var idx = -1;
		if (date) {
			var m = date.getMonth(),
				y = date.getFullYear(),
				d = date.getDate(),
				dates = this.cellDates;

			for (var i = 0; i < dates.length; ++i) {
				var cellDate = dates[i];
				if (cellDate[0] === y && cellDate[1] === m+1 && cellDate[2] === d) {
					idx = i;
					break;
				}
			}
		}
		return idx;
	},
	
	// BEGIN BUILT-IN TABLE CELL RENDERERS
	
	/**
	* Renders a cell that falls before the minimum date or after the maximum date.
	* widget class.
	* @method renderOutOfBoundsDate
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	* @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
	*			should not be terminated
	*/
	renderOutOfBoundsDate : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_OOB);
		cell.innerHTML = workingDate.getDate();
		return YAHOO.widget.Calendar.STOP_RENDER;
	},
	
	/**
	* Renders the row header for a week.
	* @method renderRowHeader
	* @param {Number}	weekNum	The week number of the current row
	* @param {Array}	cell	The current working HTML array
	*/
	renderRowHeader : function(weekNum, html) {
		html[html.length] = '<th class="calrowhead">' + weekNum + '</th>';
		return html;
	},
	
	/**
	* Renders the row footer for a week.
	* @method renderRowFooter
	* @param {Number}	weekNum	The week number of the current row
	* @param {Array}	cell	The current working HTML array
	*/
	renderRowFooter : function(weekNum, html) {
		html[html.length] = '<th class="calrowfoot">' + weekNum + '</th>';
		return html;
	},
	
	/**
	* Renders a single standard calendar cell in the calendar widget table.
	* All logic for determining how a standard default cell will be rendered is 
	* encapsulated in this method, and must be accounted for when extending the
	* widget class.
	* @method renderCellDefault
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	*/
	renderCellDefault : function(workingDate, cell) {
		cell.innerHTML = '<a href="#" class="' + this.Style.CSS_CELL_SELECTOR + '">' + this.buildDayLabel(workingDate) + "</a>";
	},
	
	/**
	* Styles a selectable cell.
	* @method styleCellDefault
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	*/
	styleCellDefault : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_SELECTABLE);
	},
	
	
	/**
	* Renders a single standard calendar cell using the CSS hightlight1 style
	* @method renderCellStyleHighlight1
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	*/
	renderCellStyleHighlight1 : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT1);
	},
	
	/**
	* Renders a single standard calendar cell using the CSS hightlight2 style
	* @method renderCellStyleHighlight2
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	*/
	renderCellStyleHighlight2 : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT2);
	},
	
	/**
	* Renders a single standard calendar cell using the CSS hightlight3 style
	* @method renderCellStyleHighlight3
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	*/
	renderCellStyleHighlight3 : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT3);
	},
	
	/**
	* Renders a single standard calendar cell using the CSS hightlight4 style
	* @method renderCellStyleHighlight4
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	*/
	renderCellStyleHighlight4 : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT4);
	},
	
	/**
	* Applies the default style used for rendering today's date to the current calendar cell
	* @method renderCellStyleToday
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	*/
	renderCellStyleToday : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_TODAY);
	},
	
	/**
	* Applies the default style used for rendering selected dates to the current calendar cell
	* @method renderCellStyleSelected
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	* @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
	*			should not be terminated
	*/
	renderCellStyleSelected : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_SELECTED);
	},
	
	/**
	* Applies the default style used for rendering dates that are not a part of the current
	* month (preceding or trailing the cells for the current month)
	* @method renderCellNotThisMonth
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	* @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
	*			should not be terminated
	*/
	renderCellNotThisMonth : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_OOM);
		cell.innerHTML=workingDate.getDate();
		return YAHOO.widget.Calendar.STOP_RENDER;
	},
	
	/**
	* Renders the current calendar cell as a non-selectable "black-out" date using the default
	* restricted style.
	* @method renderBodyCellRestricted
	* @param {Date}					workingDate		The current working Date object being used to generate the calendar
	* @param {HTMLTableCellElement}	cell			The current working cell in the calendar
	* @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
	*			should not be terminated
	*/
	renderBodyCellRestricted : function(workingDate, cell) {
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL);
		YAHOO.util.Dom.addClass(cell, this.Style.CSS_CELL_RESTRICTED);
		cell.innerHTML=workingDate.getDate();
		return YAHOO.widget.Calendar.STOP_RENDER;
	},
	
	// END BUILT-IN TABLE CELL RENDERERS
	
	// BEGIN MONTH NAVIGATION METHODS
	
	/**
	* Adds the designated number of months to the current calendar month, and sets the current
	* calendar page date to the new month.
	* @method addMonths
	* @param {Number}	count	The number of months to add to the current calendar
	*/
	addMonths : function(count) {
		var cfgPageDate = YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key;
		this.cfg.setProperty(cfgPageDate, YAHOO.widget.DateMath.add(this.cfg.getProperty(cfgPageDate), YAHOO.widget.DateMath.MONTH, count));
		this.resetRenderers();
		this.changePageEvent.fire();
	},
	
	/**
	* Subtracts the designated number of months from the current calendar month, and sets the current
	* calendar page date to the new month.
	* @method subtractMonths
	* @param {Number}	count	The number of months to subtract from the current calendar
	*/
	subtractMonths : function(count) {
		var cfgPageDate = YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key;
		this.cfg.setProperty(cfgPageDate, YAHOO.widget.DateMath.subtract(this.cfg.getProperty(cfgPageDate), YAHOO.widget.DateMath.MONTH, count));
		this.resetRenderers();
		this.changePageEvent.fire();
	},
	
	/**
	* Adds the designated number of years to the current calendar, and sets the current
	* calendar page date to the new month.
	* @method addYears
	* @param {Number}	count	The number of years to add to the current calendar
	*/
	addYears : function(count) {
		var cfgPageDate = YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key;
		this.cfg.setProperty(cfgPageDate, YAHOO.widget.DateMath.add(this.cfg.getProperty(cfgPageDate), YAHOO.widget.DateMath.YEAR, count));
		this.resetRenderers();
		this.changePageEvent.fire();
	},
	
	/**
	* Subtcats the designated number of years from the current calendar, and sets the current
	* calendar page date to the new month.
	* @method subtractYears
	* @param {Number}	count	The number of years to subtract from the current calendar
	*/
	subtractYears : function(count) {
		var cfgPageDate = YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key;
		this.cfg.setProperty(cfgPageDate, YAHOO.widget.DateMath.subtract(this.cfg.getProperty(cfgPageDate), YAHOO.widget.DateMath.YEAR, count));
		this.resetRenderers();
		this.changePageEvent.fire();
	},
	
	/**
	* Navigates to the next month page in the calendar widget.
	* @method nextMonth
	*/
	nextMonth : function() {
		this.addMonths(1);
	},
	
	/**
	* Navigates to the previous month page in the calendar widget.
	* @method previousMonth
	*/
	previousMonth : function() {
		this.subtractMonths(1);
	},
	
	/**
	* Navigates to the next year in the currently selected month in the calendar widget.
	* @method nextYear
	*/
	nextYear : function() {
		this.addYears(1);
	},
	
	/**
	* Navigates to the previous year in the currently selected month in the calendar widget.
	* @method previousYear
	*/
	previousYear : function() {
		this.subtractYears(1);
	},
	
	// END MONTH NAVIGATION METHODS
	
	// BEGIN SELECTION METHODS
	
	/**
	* Resets the calendar widget to the originally selected month and year, and 
	* sets the calendar to the initial selection(s).
	* @method reset
	*/
	reset : function() {
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
		this.cfg.resetProperty(defCfg.SELECTED.key);
		this.cfg.resetProperty(defCfg.PAGEDATE.key);
		this.resetEvent.fire();
	},
	
	/**
	* Clears the selected dates in the current calendar widget and sets the calendar
	* to the current month and year.
	* @method clear
	*/
	clear : function() {
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
		this.cfg.setProperty(defCfg.SELECTED.key, []);
		this.cfg.setProperty(defCfg.PAGEDATE.key, new Date(this.today.getTime()));
		this.clearEvent.fire();
	},
	
	/**
	* Selects a date or a collection of dates on the current calendar. This method, by default,
	* does not call the render method explicitly. Once selection has completed, render must be 
	* called for the changes to be reflected visually.
	*
	* Any dates which are OOB (out of bounds, not selectable) will not be selected and the array of 
	* selected dates passed to the selectEvent will not contain OOB dates.
	* 
	* If all dates are OOB, the no state change will occur; beforeSelect and select events will not be fired.
	*
	* @method select
	* @param	{String/Date/Date[]}	date	The date string of dates to select in the current calendar. Valid formats are
	*								individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
	*								Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
	*								This method can also take a JavaScript Date object or an array of Date objects.
	* @return	{Date[]}			Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	select : function(date) {
	
		var aToBeSelected = this._toFieldArray(date);
	
		// Filtered array of valid dates
		var validDates = [];
		var selected = [];
		var cfgSelected = YAHOO.widget.Calendar._DEFAULT_CONFIG.SELECTED.key;
		
		for (var a=0; a < aToBeSelected.length; ++a) {
			var toSelect = aToBeSelected[a];
	
			if (!this.isDateOOB(this._toDate(toSelect))) {
				
				if (validDates.length === 0) {
					this.beforeSelectEvent.fire();
					selected = this.cfg.getProperty(cfgSelected);
				}
	
				validDates.push(toSelect);
				
				if (this._indexOfSelectedFieldArray(toSelect) == -1) { 
					selected[selected.length] = toSelect;
				}
			}
		}
		
	
		if (validDates.length > 0) {
			if (this.parent) {
				this.parent.cfg.setProperty(cfgSelected, selected);
			} else {
				this.cfg.setProperty(cfgSelected, selected);
			}
			this.selectEvent.fire(validDates);
		}
	
		return this.getSelectedDates();
	},
	
	/**
	* Selects a date on the current calendar by referencing the index of the cell that should be selected.
	* This method is used to easily select a single cell (usually with a mouse click) without having to do
	* a full render. The selected style is applied to the cell directly.
	*
	* If the cell is not marked with the CSS_CELL_SELECTABLE class (as is the case by default for out of month 
	* or out of bounds cells), it will not be selected and in such a case beforeSelect and select events will not be fired.
	* 
	* @method selectCell
	* @param	{Number}	cellIndex	The index of the cell to select in the current calendar. 
	* @return	{Date[]}	Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	selectCell : function(cellIndex) {
	
		var cell = this.cells[cellIndex];
		var cellDate = this.cellDates[cellIndex];
		var dCellDate = this._toDate(cellDate);
		
		var selectable = YAHOO.util.Dom.hasClass(cell, this.Style.CSS_CELL_SELECTABLE);
	
		if (selectable) {
	
			this.beforeSelectEvent.fire();
	
			var cfgSelected = YAHOO.widget.Calendar._DEFAULT_CONFIG.SELECTED.key;
			var selected = this.cfg.getProperty(cfgSelected);
	
			var selectDate = cellDate.concat();
	
			if (this._indexOfSelectedFieldArray(selectDate) == -1) {
				selected[selected.length] = selectDate;
			}
			if (this.parent) {
				this.parent.cfg.setProperty(cfgSelected, selected);
			} else {
				this.cfg.setProperty(cfgSelected, selected);
			}
			this.renderCellStyleSelected(dCellDate,cell);
			this.selectEvent.fire([selectDate]);
	
			this.doCellMouseOut.call(cell, null, this);		
		}
	
		return this.getSelectedDates();
	},
	
	/**
	* Deselects a date or a collection of dates on the current calendar. This method, by default,
	* does not call the render method explicitly. Once deselection has completed, render must be 
	* called for the changes to be reflected visually.
	* 
	* The method will not attempt to deselect any dates which are OOB (out of bounds, and hence not selectable) 
	* and the array of deselected dates passed to the deselectEvent will not contain any OOB dates.
	* 
	* If all dates are OOB, beforeDeselect and deselect events will not be fired.
	* 
	* @method deselect
	* @param	{String/Date/Date[]}	date	The date string of dates to deselect in the current calendar. Valid formats are
	*								individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
	*								Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
	*								This method can also take a JavaScript Date object or an array of Date objects.	
	* @return	{Date[]}			Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	deselect : function(date) {
	
		var aToBeDeselected = this._toFieldArray(date);
	
		var validDates = [];
		var selected = [];
		var cfgSelected = YAHOO.widget.Calendar._DEFAULT_CONFIG.SELECTED.key;
	
		for (var a=0; a < aToBeDeselected.length; ++a) {
			var toDeselect = aToBeDeselected[a];
	
			if (!this.isDateOOB(this._toDate(toDeselect))) {
	
				if (validDates.length === 0) {
					this.beforeDeselectEvent.fire();
					selected = this.cfg.getProperty(cfgSelected);
				}
	
				validDates.push(toDeselect);
	
				var index = this._indexOfSelectedFieldArray(toDeselect);
				if (index != -1) {	
					selected.splice(index,1);
				}
			}
		}
	
	
		if (validDates.length > 0) {
			if (this.parent) {
				this.parent.cfg.setProperty(cfgSelected, selected);
			} else {
				this.cfg.setProperty(cfgSelected, selected);
			}
			this.deselectEvent.fire(validDates);
		}
	
		return this.getSelectedDates();
	},
	
	/**
	* Deselects a date on the current calendar by referencing the index of the cell that should be deselected.
	* This method is used to easily deselect a single cell (usually with a mouse click) without having to do
	* a full render. The selected style is removed from the cell directly.
	* 
	* If the cell is not marked with the CSS_CELL_SELECTABLE class (as is the case by default for out of month 
	* or out of bounds cells), the method will not attempt to deselect it and in such a case, beforeDeselect and 
	* deselect events will not be fired.
	* 
	* @method deselectCell
	* @param	{Number}	cellIndex	The index of the cell to deselect in the current calendar. 
	* @return	{Date[]}	Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	deselectCell : function(cellIndex) {
		var cell = this.cells[cellIndex];
		var cellDate = this.cellDates[cellIndex];
		var cellDateIndex = this._indexOfSelectedFieldArray(cellDate);
		
		var selectable = YAHOO.util.Dom.hasClass(cell, this.Style.CSS_CELL_SELECTABLE);
	
		if (selectable) {
	
			this.beforeDeselectEvent.fire();
	
			var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
			var selected = this.cfg.getProperty(defCfg.SELECTED.key);
	
			var dCellDate = this._toDate(cellDate);
			var selectDate = cellDate.concat();
	
			if (cellDateIndex > -1) {
				if (this.cfg.getProperty(defCfg.PAGEDATE.key).getMonth() == dCellDate.getMonth() &&
					this.cfg.getProperty(defCfg.PAGEDATE.key).getFullYear() == dCellDate.getFullYear()) {
					YAHOO.util.Dom.removeClass(cell, this.Style.CSS_CELL_SELECTED);
				}
				selected.splice(cellDateIndex, 1);
			}
	
			if (this.parent) {
				this.parent.cfg.setProperty(defCfg.SELECTED.key, selected);
			} else {
				this.cfg.setProperty(defCfg.SELECTED.key, selected);
			}
	
			this.deselectEvent.fire(selectDate);
		}
	
		return this.getSelectedDates();
	},
	
	/**
	* Deselects all dates on the current calendar.
	* @method deselectAll
	* @return {Date[]}		Array of JavaScript Date objects representing all individual dates that are currently selected.
	*						Assuming that this function executes properly, the return value should be an empty array.
	*						However, the empty array is returned for the sake of being able to check the selection status
	*						of the calendar.
	*/
	deselectAll : function() {
		this.beforeDeselectEvent.fire();
		
		var cfgSelected = YAHOO.widget.Calendar._DEFAULT_CONFIG.SELECTED.key;
	
		var selected = this.cfg.getProperty(cfgSelected);
		var count = selected.length;
		var sel = selected.concat();
	
		if (this.parent) {
			this.parent.cfg.setProperty(cfgSelected, []);
		} else {
			this.cfg.setProperty(cfgSelected, []);
		}
		
		if (count > 0) {
			this.deselectEvent.fire(sel);
		}
	
		return this.getSelectedDates();
	},
	
	// END SELECTION METHODS
	
	// BEGIN TYPE CONVERSION METHODS
	
	/**
	* Converts a date (either a JavaScript Date object, or a date string) to the internal data structure
	* used to represent dates: [[yyyy,mm,dd],[yyyy,mm,dd]].
	* @method _toFieldArray
	* @private
	* @param	{String/Date/Date[]}	date	The date string of dates to deselect in the current calendar. Valid formats are
	*								individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
	*								Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
	*								This method can also take a JavaScript Date object or an array of Date objects.	
	* @return {Array[](Number[])}	Array of date field arrays
	*/
	_toFieldArray : function(date) {
		var returnDate = [];
	
		if (date instanceof Date) {
			returnDate = [[date.getFullYear(), date.getMonth()+1, date.getDate()]];
		} else if (YAHOO.lang.isString(date)) {
			returnDate = this._parseDates(date);
		} else if (YAHOO.lang.isArray(date)) {
			for (var i=0;i<date.length;++i) {
				var d = date[i];
				returnDate[returnDate.length] = [d.getFullYear(),d.getMonth()+1,d.getDate()];
			}
		}
		
		return returnDate;
	},
	
	/**
	* Converts a date field array [yyyy,mm,dd] to a JavaScript Date object. The date field array
	* is the format in which dates are as provided as arguments to selectEvent and deselectEvent listeners.
	* 
	* @method toDate
	* @param	{Number[]}	dateFieldArray	The date field array to convert to a JavaScript Date.
	* @return	{Date}	JavaScript Date object representing the date field array.
	*/
	toDate : function(dateFieldArray) {
		return this._toDate(dateFieldArray);
	},
	
	/**
	* Converts a date field array [yyyy,mm,dd] to a JavaScript Date object.
	* @method _toDate
	* @private
	* @deprecated Made public, toDate 
	* @param	{Number[]}		dateFieldArray	The date field array to convert to a JavaScript Date.
	* @return	{Date}	JavaScript Date object representing the date field array
	*/
	_toDate : function(dateFieldArray) {
		if (dateFieldArray instanceof Date) {
			return dateFieldArray;
		} else {
			return YAHOO.widget.DateMath.getDate(dateFieldArray[0],dateFieldArray[1]-1,dateFieldArray[2]);
		}
	},
	
	// END TYPE CONVERSION METHODS 
	
	// BEGIN UTILITY METHODS
	
	/**
	* Converts a date field array [yyyy,mm,dd] to a JavaScript Date object.
	* @method _fieldArraysAreEqual
	* @private
	* @param	{Number[]}	array1	The first date field array to compare
	* @param	{Number[]}	array2	The first date field array to compare
	* @return	{Boolean}	The boolean that represents the equality of the two arrays
	*/
	_fieldArraysAreEqual : function(array1, array2) {
		var match = false;
	
		if (array1[0]==array2[0]&&array1[1]==array2[1]&&array1[2]==array2[2]) {
			match=true;	
		}
	
		return match;
	},
	
	/**
	* Gets the index of a date field array [yyyy,mm,dd] in the current list of selected dates.
	* @method	_indexOfSelectedFieldArray
	* @private
	* @param	{Number[]}		find	The date field array to search for
	* @return	{Number}			The index of the date field array within the collection of selected dates.
	*								-1 will be returned if the date is not found.
	*/
	_indexOfSelectedFieldArray : function(find) {
		var selected = -1;
		var seldates = this.cfg.getProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.SELECTED.key);
	
		for (var s=0;s<seldates.length;++s) {
			var sArray = seldates[s];
			if (find[0]==sArray[0]&&find[1]==sArray[1]&&find[2]==sArray[2]) {
				selected = s;
				break;
			}
		}
	
		return selected;
	},
	
	/**
	* Determines whether a given date is OOM (out of month).
	* @method	isDateOOM
	* @param	{Date}	date	The JavaScript Date object for which to check the OOM status
	* @return	{Boolean}	true if the date is OOM
	*/
	isDateOOM : function(date) {
		return (date.getMonth() != this.cfg.getProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key).getMonth());
	},
	
	/**
	* Determines whether a given date is OOB (out of bounds - less than the mindate or more than the maxdate).
	*
	* @method	isDateOOB
	* @param	{Date}	date	The JavaScript Date object for which to check the OOB status
	* @return	{Boolean}	true if the date is OOB
	*/
	isDateOOB : function(date) {
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
		
		var minDate = this.cfg.getProperty(defCfg.MINDATE.key);
		var maxDate = this.cfg.getProperty(defCfg.MAXDATE.key);
		var dm = YAHOO.widget.DateMath;
		
		if (minDate) {
			minDate = dm.clearTime(minDate);
		} 
		if (maxDate) {
			maxDate = dm.clearTime(maxDate);
		}
	
		var clearedDate = new Date(date.getTime());
		clearedDate = dm.clearTime(clearedDate);
	
		return ((minDate && clearedDate.getTime() < minDate.getTime()) || (maxDate && clearedDate.getTime() > maxDate.getTime()));
	},
	
	/**
	 * Parses a pagedate configuration property value. The value can either be specified as a string of form "mm/yyyy" or a Date object 
	 * and is parsed into a Date object normalized to the first day of the month. If no value is passed in, the month and year from today's date are used to create the Date object 
	 * @method	_parsePageDate
	 * @private
	 * @param {Date|String}	date	Pagedate value which needs to be parsed
	 * @return {Date}	The Date object representing the pagedate
	 */
	_parsePageDate : function(date) {
		var parsedDate;
		
		var defCfg = YAHOO.widget.Calendar._DEFAULT_CONFIG;
	
		if (date) {
			if (date instanceof Date) {
				parsedDate = YAHOO.widget.DateMath.findMonthStart(date);
			} else {
				var month, year, aMonthYear;
				aMonthYear = date.split(this.cfg.getProperty(defCfg.DATE_FIELD_DELIMITER.key));
				month = parseInt(aMonthYear[this.cfg.getProperty(defCfg.MY_MONTH_POSITION.key)-1], 10)-1;
				year = parseInt(aMonthYear[this.cfg.getProperty(defCfg.MY_YEAR_POSITION.key)-1], 10);

				parsedDate = YAHOO.widget.DateMath.getDate(year, month, 1);
			}
		} else {
			parsedDate = YAHOO.widget.DateMath.getDate(this.today.getFullYear(), this.today.getMonth(), 1);
		}
		return parsedDate;
	},
	
	// END UTILITY METHODS
	
	// BEGIN EVENT HANDLERS
	
	/**
	* Event executed before a date is selected in the calendar widget.
	* @deprecated Event handlers for this event should be susbcribed to beforeSelectEvent.
	*/
	onBeforeSelect : function() {
		if (this.cfg.getProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.MULTI_SELECT.key) === false) {
			if (this.parent) {
				this.parent.callChildFunction("clearAllBodyCellStyles", this.Style.CSS_CELL_SELECTED);
				this.parent.deselectAll();
			} else {
				this.clearAllBodyCellStyles(this.Style.CSS_CELL_SELECTED);
				this.deselectAll();
			}
		}
	},
	
	/**
	* Event executed when a date is selected in the calendar widget.
	* @param	{Array}	selected	An array of date field arrays representing which date or dates were selected. Example: [ [2006,8,6],[2006,8,7],[2006,8,8] ]
	* @deprecated Event handlers for this event should be susbcribed to selectEvent.
	*/
	onSelect : function(selected) { },
	
	/**
	* Event executed before a date is deselected in the calendar widget.
	* @deprecated Event handlers for this event should be susbcribed to beforeDeselectEvent.
	*/
	onBeforeDeselect : function() { },
	
	/**
	* Event executed when a date is deselected in the calendar widget.
	* @param	{Array}	selected	An array of date field arrays representing which date or dates were deselected. Example: [ [2006,8,6],[2006,8,7],[2006,8,8] ]
	* @deprecated Event handlers for this event should be susbcribed to deselectEvent.
	*/
	onDeselect : function(deselected) { },
	
	/**
	* Event executed when the user navigates to a different calendar page.
	* @deprecated Event handlers for this event should be susbcribed to changePageEvent.
	*/
	onChangePage : function() {
		this.render();
	},
	
	/**
	* Event executed when the calendar widget is rendered.
	* @deprecated Event handlers for this event should be susbcribed to renderEvent.
	*/
	onRender : function() { },
	
	/**
	* Event executed when the calendar widget is reset to its original state.
	* @deprecated Event handlers for this event should be susbcribed to resetEvemt.
	*/
	onReset : function() { this.render(); },
	
	/**
	* Event executed when the calendar widget is completely cleared to the current month with no selections.
	* @deprecated Event handlers for this event should be susbcribed to clearEvent.
	*/
	onClear : function() { this.render(); },
	
	/**
	* Validates the calendar widget. This method has no default implementation
	* and must be extended by subclassing the widget.
	* @return	Should return true if the widget validates, and false if
	* it doesn't.
	* @type Boolean
	*/
	validate : function() { return true; },
	
	// END EVENT HANDLERS
	
	// BEGIN DATE PARSE METHODS
	
	/**
	* Converts a date string to a date field array
	* @private
	* @param	{String}	sDate			Date string. Valid formats are mm/dd and mm/dd/yyyy.
	* @return				A date field array representing the string passed to the method
	* @type Array[](Number[])
	*/
	_parseDate : function(sDate) {
		var aDate = sDate.split(this.Locale.DATE_FIELD_DELIMITER);
		var rArray;
	
		if (aDate.length == 2) {
			rArray = [aDate[this.Locale.MD_MONTH_POSITION-1],aDate[this.Locale.MD_DAY_POSITION-1]];
			rArray.type = YAHOO.widget.Calendar.MONTH_DAY;
		} else {
			rArray = [aDate[this.Locale.MDY_YEAR_POSITION-1],aDate[this.Locale.MDY_MONTH_POSITION-1],aDate[this.Locale.MDY_DAY_POSITION-1]];
			rArray.type = YAHOO.widget.Calendar.DATE;
		}
	
		for (var i=0;i<rArray.length;i++) {
			rArray[i] = parseInt(rArray[i], 10);
		}
	
		return rArray;
	},
	
	/**
	* Converts a multi or single-date string to an array of date field arrays
	* @private
	* @param	{String}	sDates		Date string with one or more comma-delimited dates. Valid formats are mm/dd, mm/dd/yyyy, mm/dd/yyyy-mm/dd/yyyy
	* @return							An array of date field arrays
	* @type Array[](Number[])
	*/
	_parseDates : function(sDates) {
		var aReturn = [];
	
		var aDates = sDates.split(this.Locale.DATE_DELIMITER);
		
		for (var d=0;d<aDates.length;++d) {
			var sDate = aDates[d];
	
			if (sDate.indexOf(this.Locale.DATE_RANGE_DELIMITER) != -1) {
				// This is a range
				var aRange = sDate.split(this.Locale.DATE_RANGE_DELIMITER);
	
				var dateStart = this._parseDate(aRange[0]);
				var dateEnd = this._parseDate(aRange[1]);
	
				var fullRange = this._parseRange(dateStart, dateEnd);
				aReturn = aReturn.concat(fullRange);
			} else {
				// This is not a range
				var aDate = this._parseDate(sDate);
				aReturn.push(aDate);
			}
		}
		return aReturn;
	},
	
	/**
	* Converts a date range to the full list of included dates
	* @private
	* @param	{Number[]}	startDate	Date field array representing the first date in the range
	* @param	{Number[]}	endDate		Date field array representing the last date in the range
	* @return							An array of date field arrays
	* @type Array[](Number[])
	*/
	_parseRange : function(startDate, endDate) {
		var dCurrent = YAHOO.widget.DateMath.add(YAHOO.widget.DateMath.getDate(startDate[0],startDate[1]-1,startDate[2]),YAHOO.widget.DateMath.DAY,1);
		var dEnd     = YAHOO.widget.DateMath.getDate(endDate[0],  endDate[1]-1,  endDate[2]);
	
		var results = [];
		results.push(startDate);
		while (dCurrent.getTime() <= dEnd.getTime()) {
			results.push([dCurrent.getFullYear(),dCurrent.getMonth()+1,dCurrent.getDate()]);
			dCurrent = YAHOO.widget.DateMath.add(dCurrent,YAHOO.widget.DateMath.DAY,1);
		}
		return results;
	},
	
	// END DATE PARSE METHODS
	
	// BEGIN RENDERER METHODS
	
	/**
	* Resets the render stack of the current calendar to its original pre-render value.
	*/
	resetRenderers : function() {
		this.renderStack = this._renderStack.concat();
	},
	
	/**
	 * Removes all custom renderers added to the Calendar through the addRenderer, addMonthRenderer and 
	 * addWeekdayRenderer methods. Calendar's render method needs to be called after removing renderers 
	 * to re-render the Calendar without custom renderers applied.
	 */
	removeRenderers : function() {
		this._renderStack = [];
		this.renderStack = [];
	},

	/**
	* Clears the inner HTML, CSS class and style information from the specified cell.
	* @method clearElement
	* @param	{HTMLTableCellElement} cell The cell to clear
	*/ 
	clearElement : function(cell) {
		cell.innerHTML = "&#160;";
		cell.className="";
	},
	
	/**
	* Adds a renderer to the render stack. The function reference passed to this method will be executed
	* when a date cell matches the conditions specified in the date string for this renderer.
	* @method addRenderer
	* @param	{String}	sDates		A date string to associate with the specified renderer. Valid formats
	*									include date (12/24/2005), month/day (12/24), and range (12/1/2004-1/1/2005)
	* @param	{Function}	fnRender	The function executed to render cells that match the render rules for this renderer.
	*/
	addRenderer : function(sDates, fnRender) {
		var aDates = this._parseDates(sDates);
		for (var i=0;i<aDates.length;++i) {
			var aDate = aDates[i];
		
			if (aDate.length == 2) { // this is either a range or a month/day combo
				if (aDate[0] instanceof Array) { // this is a range
					this._addRenderer(YAHOO.widget.Calendar.RANGE,aDate,fnRender);
				} else { // this is a month/day combo
					this._addRenderer(YAHOO.widget.Calendar.MONTH_DAY,aDate,fnRender);
				}
			} else if (aDate.length == 3) {
				this._addRenderer(YAHOO.widget.Calendar.DATE,aDate,fnRender);
			}
		}
	},
	
	/**
	* The private method used for adding cell renderers to the local render stack.
	* This method is called by other methods that set the renderer type prior to the method call.
	* @method _addRenderer
	* @private
	* @param	{String}	type		The type string that indicates the type of date renderer being added.
	*									Values are YAHOO.widget.Calendar.DATE, YAHOO.widget.Calendar.MONTH_DAY, YAHOO.widget.Calendar.WEEKDAY,
	*									YAHOO.widget.Calendar.RANGE, YAHOO.widget.Calendar.MONTH
	* @param	{Array}		aDates		An array of dates used to construct the renderer. The format varies based
	*									on the renderer type
	* @param	{Function}	fnRender	The function executed to render cells that match the render rules for this renderer.
	*/
	_addRenderer : function(type, aDates, fnRender) {
		var add = [type,aDates,fnRender];
		this.renderStack.unshift(add);	
		this._renderStack = this.renderStack.concat();
	},

	/**
	* Adds a month to the render stack. The function reference passed to this method will be executed
	* when a date cell matches the month passed to this method.
	* @method addMonthRenderer
	* @param	{Number}	month		The month (1-12) to associate with this renderer
	* @param	{Function}	fnRender	The function executed to render cells that match the render rules for this renderer.
	*/
	addMonthRenderer : function(month, fnRender) {
		this._addRenderer(YAHOO.widget.Calendar.MONTH,[month],fnRender);
	},

	/**
	* Adds a weekday to the render stack. The function reference passed to this method will be executed
	* when a date cell matches the weekday passed to this method.
	* @method addWeekdayRenderer
	* @param	{Number}	weekday		The weekday (Sunday = 1, Monday = 2 ... Saturday = 7) to associate with this renderer
	* @param	{Function}	fnRender	The function executed to render cells that match the render rules for this renderer.
	*/
	addWeekdayRenderer : function(weekday, fnRender) {
		this._addRenderer(YAHOO.widget.Calendar.WEEKDAY,[weekday],fnRender);
	},

	// END RENDERER METHODS
	
	// BEGIN CSS METHODS
	
	/**
	* Removes all styles from all body cells in the current calendar table.
	* @method clearAllBodyCellStyles
	* @param	{style}	style The CSS class name to remove from all calendar body cells
	*/
	clearAllBodyCellStyles : function(style) {
		for (var c=0;c<this.cells.length;++c) {
			YAHOO.util.Dom.removeClass(this.cells[c],style);
		}
	},
	
	// END CSS METHODS
	
	// BEGIN GETTER/SETTER METHODS
	/**
	* Sets the calendar's month explicitly
	* @method setMonth
	* @param {Number}	month		The numeric month, from 0 (January) to 11 (December)
	*/
	setMonth : function(month) {
		var cfgPageDate = YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key;
		var current = this.cfg.getProperty(cfgPageDate);
		current.setMonth(parseInt(month, 10));
		this.cfg.setProperty(cfgPageDate, current);
	},

	/**
	* Sets the calendar's year explicitly.
	* @method setYear
	* @param {Number}	year		The numeric 4-digit year
	*/
	setYear : function(year) {
		var cfgPageDate = YAHOO.widget.Calendar._DEFAULT_CONFIG.PAGEDATE.key;
		var current = this.cfg.getProperty(cfgPageDate);
		current.setFullYear(parseInt(year, 10));
		this.cfg.setProperty(cfgPageDate, current);
	},

	/**
	* Gets the list of currently selected dates from the calendar.
	* @method getSelectedDates
	* @return {Date[]} An array of currently selected JavaScript Date objects.
	*/
	getSelectedDates : function() {
		var returnDates = [];
		var selected = this.cfg.getProperty(YAHOO.widget.Calendar._DEFAULT_CONFIG.SELECTED.key);

		for (var d=0;d<selected.length;++d) {
			var dateArray = selected[d];

			var date = YAHOO.widget.DateMath.getDate(dateArray[0],dateArray[1]-1,dateArray[2]);
			returnDates.push(date);
		}

		returnDates.sort( function(a,b) { return a-b; } );
		return returnDates;
	},

	/// END GETTER/SETTER METHODS ///
	
	/**
	* Hides the Calendar's outer container from view.
	* @method hide
	*/
	hide : function() {
		if (this.beforeHideEvent.fire()) {
			this.oDomContainer.style.display = "none";
			this.hideEvent.fire();
		}
	},

	/**
	* Shows the Calendar's outer container.
	* @method show
	*/
	show : function() {
		if (this.beforeShowEvent.fire()) {
			this.oDomContainer.style.display = "block";
			this.showEvent.fire();
		}
	},

	/**
	* Returns a string representing the current browser.
	* @deprecated As of 2.3.0, environment information is available in YAHOO.env.ua
	* @see YAHOO.env.ua
	* @property browser
	* @type String
	*/
	browser : (function() {
				var ua = navigator.userAgent.toLowerCase();
					  if (ua.indexOf('opera')!=-1) { // Opera (check first in case of spoof)
						 return 'opera';
					  } else if (ua.indexOf('msie 7')!=-1) { // IE7
						 return 'ie7';
					  } else if (ua.indexOf('msie') !=-1) { // IE
						 return 'ie';
					  } else if (ua.indexOf('safari')!=-1) { // Safari (check before Gecko because it includes "like Gecko")
						 return 'safari';
					  } else if (ua.indexOf('gecko') != -1) { // Gecko
						 return 'gecko';
					  } else {
						 return false;
					  }
				})(),
	/**
	* Returns a string representation of the object.
	* @method toString
	* @return {String}	A string representation of the Calendar object.
	*/
	toString : function() {
		return "Calendar " + this.id;
	}
};

/**
* @namespace YAHOO.widget
* @class Calendar_Core
* @extends YAHOO.widget.Calendar
* @deprecated The old Calendar_Core class is no longer necessary.
*/
YAHOO.widget.Calendar_Core = YAHOO.widget.Calendar;

YAHOO.widget.Cal_Core = YAHOO.widget.Calendar;

/**
* YAHOO.widget.CalendarGroup is a special container class for YAHOO.widget.Calendar. This class facilitates
* the ability to have multi-page calendar views that share a single dataset and are
* dependent on each other.
*
* The calendar group instance will refer to each of its elements using a 0-based index.
* For example, to construct the placeholder for a calendar group widget with id "cal1" and
* containerId of "cal1Container", the markup would be as follows:
*	<xmp>
*		<div id="cal1Container_0"></div>
*		<div id="cal1Container_1"></div>
*	</xmp>
* The tables for the calendars ("cal1_0" and "cal1_1") will be inserted into those containers.
* 
* <p>
* <strong>NOTE: As of 2.4.0, the constructor's ID argument is optional.</strong>
* The CalendarGroup can be constructed by simply providing a container ID string, 
* or a reference to a container DIV HTMLElement (the element needs to exist 
* in the document).
* 
* E.g.:
*	<xmp>
*		var c = new YAHOO.widget.CalendarGroup("calContainer", configOptions);
*	</xmp>
* or:
*   <xmp>
*       var containerDiv = YAHOO.util.Dom.get("calContainer");
*		var c = new YAHOO.widget.CalendarGroup(containerDiv, configOptions);
*	</xmp>
* </p>
* <p>
* If not provided, the ID will be generated from the container DIV ID by adding an "_t" suffix.
* For example if an ID is not provided, and the container's ID is "calContainer", the CalendarGroup's ID will be set to "calContainer_t".
* </p>
* 
* @namespace YAHOO.widget
* @class CalendarGroup
* @constructor
* @param {String} id optional The id of the table element that will represent the CalendarGroup widget. As of 2.4.0, this argument is optional.
* @param {String | HTMLElement} container The id of the container div element that will wrap the CalendarGroup table, or a reference to a DIV element which exists in the document.
* @param {Object} config optional The configuration object containing the initial configuration values for the CalendarGroup.
*/
YAHOO.widget.CalendarGroup = function(id, containerId, config) {
	if (arguments.length > 0) {
		this.init.apply(this, arguments);
	}
};

YAHOO.widget.CalendarGroup.prototype = {

	/**
	* Initializes the calendar group. All subclasses must call this method in order for the
	* group to be initialized properly.
	* @method init
	* @param {String} id optional The id of the table element that will represent the CalendarGroup widget. As of 2.4.0, this argument is optional.
	* @param {String | HTMLElement} container The id of the container div element that will wrap the CalendarGroup table, or a reference to a DIV element which exists in the document.
	* @param {Object} config optional The configuration object containing the initial configuration values for the CalendarGroup.
	*/
	init : function(id, container, config) {

		// Normalize 2.4.0, pre 2.4.0 args
		var nArgs = this._parseArgs(arguments);

		id = nArgs.id;
		container = nArgs.container;
		config = nArgs.config;

		this.oDomContainer = YAHOO.util.Dom.get(container);

		if (!this.oDomContainer.id) {
			this.oDomContainer.id = YAHOO.util.Dom.generateId();
		}
		if (!id) {
			id = this.oDomContainer.id + "_t";
		}

		/**
		* The unique id associated with the CalendarGroup
		* @property id
		* @type String
		*/
		this.id = id;

		/**
		* The unique id associated with the CalendarGroup container
		* @property containerId
		* @type String
		*/
		this.containerId = this.oDomContainer.id;

		this.initEvents();
		this.initStyles();

		/**
		* The collection of Calendar pages contained within the CalendarGroup
		* @property pages
		* @type YAHOO.widget.Calendar[]
		*/
		this.pages = [];

		YAHOO.util.Dom.addClass(this.oDomContainer, YAHOO.widget.CalendarGroup.CSS_CONTAINER);
		YAHOO.util.Dom.addClass(this.oDomContainer, YAHOO.widget.CalendarGroup.CSS_MULTI_UP);

		/**
		* The Config object used to hold the configuration variables for the CalendarGroup
		* @property cfg
		* @type YAHOO.util.Config
		*/
		this.cfg = new YAHOO.util.Config(this);

		/**
		* The local object which contains the CalendarGroup's options
		* @property Options
		* @type Object
		*/
		this.Options = {};

		/**
		* The local object which contains the CalendarGroup's locale settings
		* @property Locale
		* @type Object
		*/
		this.Locale = {};

		this.setupConfig();

		if (config) {
			this.cfg.applyConfig(config, true);
		}

		this.cfg.fireQueue();

		// OPERA HACK FOR MISWRAPPED FLOATS
		if (YAHOO.env.ua.opera){
			this.renderEvent.subscribe(this._fixWidth, this, true);
			this.showEvent.subscribe(this._fixWidth, this, true);
		}

	},

	setupConfig : function() {

		var defCfg = YAHOO.widget.CalendarGroup._DEFAULT_CONFIG;

		/**
		* The number of pages to include in the CalendarGroup. This value can only be set once, in the CalendarGroup's constructor arguments.
		* @config pages
		* @type Number
		* @default 2
		*/
		this.cfg.addProperty(defCfg.PAGES.key, { value:defCfg.PAGES.value, validator:this.cfg.checkNumber, handler:this.configPages } );

		/**
		* The month/year representing the current visible Calendar date (mm/yyyy)
		* @config pagedate
		* @type String
		* @default today's date
		*/
		this.cfg.addProperty(defCfg.PAGEDATE.key, { value:new Date(), handler:this.configPageDate } );

		/**
		* The date or range of dates representing the current Calendar selection
		* @config selected
		* @type String
		* @default []
		*/
		this.cfg.addProperty(defCfg.SELECTED.key, { value:[], handler:this.configSelected } );

		/**
		* The title to display above the CalendarGroup's month header
		* @config title
		* @type String
		* @default ""
		*/
		this.cfg.addProperty(defCfg.TITLE.key, { value:defCfg.TITLE.value, handler:this.configTitle } );

		/**
		* Whether or not a close button should be displayed for this CalendarGroup
		* @config close
		* @type Boolean
		* @default false
		*/
		this.cfg.addProperty(defCfg.CLOSE.key, { value:defCfg.CLOSE.value, handler:this.configClose } );

		/**
		* Whether or not an iframe shim should be placed under the Calendar to prevent select boxes from bleeding through in Internet Explorer 6 and below.
		* This property is enabled by default for IE6 and below. It is disabled by default for other browsers for performance reasons, but can be 
		* enabled if required.
		* 
		* @config iframe
		* @type Boolean
		* @default true for IE6 and below, false for all other browsers
		*/
		this.cfg.addProperty(defCfg.IFRAME.key, { value:defCfg.IFRAME.value, handler:this.configIframe, validator:this.cfg.checkBoolean } );
	
		/**
		* The minimum selectable date in the current Calendar (mm/dd/yyyy)
		* @config mindate
		* @type String
		* @default null
		*/
		this.cfg.addProperty(defCfg.MINDATE.key, { value:defCfg.MINDATE.value, handler:this.delegateConfig } );
	
		/**
		* The maximum selectable date in the current Calendar (mm/dd/yyyy)
		* @config maxdate
		* @type String
		* @default null
		*/	
		this.cfg.addProperty(defCfg.MAXDATE.key, { value:defCfg.MAXDATE.value, handler:this.delegateConfig  } );
	
		// Options properties
	
		/**
		* True if the Calendar should allow multiple selections. False by default.
		* @config MULTI_SELECT
		* @type Boolean
		* @default false
		*/
		this.cfg.addProperty(defCfg.MULTI_SELECT.key,	{ value:defCfg.MULTI_SELECT.value, handler:this.delegateConfig, validator:this.cfg.checkBoolean } );
	
		/**
		* The weekday the week begins on. Default is 0 (Sunday).
		* @config START_WEEKDAY
		* @type number
		* @default 0
		*/	
		this.cfg.addProperty(defCfg.START_WEEKDAY.key,	{ value:defCfg.START_WEEKDAY.value, handler:this.delegateConfig, validator:this.cfg.checkNumber  } );
		
		/**
		* True if the Calendar should show weekday labels. True by default.
		* @config SHOW_WEEKDAYS
		* @type Boolean
		* @default true
		*/	
		this.cfg.addProperty(defCfg.SHOW_WEEKDAYS.key,	{ value:defCfg.SHOW_WEEKDAYS.value, handler:this.delegateConfig, validator:this.cfg.checkBoolean } );
		
		/**
		* True if the Calendar should show week row headers. False by default.
		* @config SHOW_WEEK_HEADER
		* @type Boolean
		* @default false
		*/	
		this.cfg.addProperty(defCfg.SHOW_WEEK_HEADER.key,{ value:defCfg.SHOW_WEEK_HEADER.value, handler:this.delegateConfig, validator:this.cfg.checkBoolean } );
		
		/**
		* True if the Calendar should show week row footers. False by default.
		* @config SHOW_WEEK_FOOTER
		* @type Boolean
		* @default false
		*/
		this.cfg.addProperty(defCfg.SHOW_WEEK_FOOTER.key,{ value:defCfg.SHOW_WEEK_FOOTER.value, handler:this.delegateConfig, validator:this.cfg.checkBoolean } );
		
		/**
		* True if the Calendar should suppress weeks that are not a part of the current month. False by default.
		* @config HIDE_BLANK_WEEKS
		* @type Boolean
		* @default false
		*/		
		this.cfg.addProperty(defCfg.HIDE_BLANK_WEEKS.key,{ value:defCfg.HIDE_BLANK_WEEKS.value, handler:this.delegateConfig, validator:this.cfg.checkBoolean } );
		
		/**
		* The image that should be used for the left navigation arrow.
		* @config NAV_ARROW_LEFT
		* @type String
		* @deprecated	You can customize the image by overriding the default CSS class for the left arrow - "calnavleft"
		* @default null
		*/		
		this.cfg.addProperty(defCfg.NAV_ARROW_LEFT.key,	{ value:defCfg.NAV_ARROW_LEFT.value, handler:this.delegateConfig } );
		
		/**
		* The image that should be used for the right navigation arrow.
		* @config NAV_ARROW_RIGHT
		* @type String
		* @deprecated	You can customize the image by overriding the default CSS class for the right arrow - "calnavright"
		* @default null
		*/		
		this.cfg.addProperty(defCfg.NAV_ARROW_RIGHT.key,	{ value:defCfg.NAV_ARROW_RIGHT.value, handler:this.delegateConfig } );
	
		// Locale properties
		
		/**
		* The short month labels for the current locale.
		* @config MONTHS_SHORT
		* @type String[]
		* @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		*/
		this.cfg.addProperty(defCfg.MONTHS_SHORT.key,	{ value:defCfg.MONTHS_SHORT.value, handler:this.delegateConfig } );
		
		/**
		* The long month labels for the current locale.
		* @config MONTHS_LONG
		* @type String[]
		* @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		*/		
		this.cfg.addProperty(defCfg.MONTHS_LONG.key,		{ value:defCfg.MONTHS_LONG.value, handler:this.delegateConfig } );
		
		/**
		* The 1-character weekday labels for the current locale.
		* @config WEEKDAYS_1CHAR
		* @type String[]
		* @default ["S", "M", "T", "W", "T", "F", "S"]
		*/		
		this.cfg.addProperty(defCfg.WEEKDAYS_1CHAR.key,	{ value:defCfg.WEEKDAYS_1CHAR.value, handler:this.delegateConfig } );
		
		/**
		* The short weekday labels for the current locale.
		* @config WEEKDAYS_SHORT
		* @type String[]
		* @default ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
		*/		
		this.cfg.addProperty(defCfg.WEEKDAYS_SHORT.key,	{ value:defCfg.WEEKDAYS_SHORT.value, handler:this.delegateConfig } );
		
		/**
		* The medium weekday labels for the current locale.
		* @config WEEKDAYS_MEDIUM
		* @type String[]
		* @default ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		*/		
		this.cfg.addProperty(defCfg.WEEKDAYS_MEDIUM.key,	{ value:defCfg.WEEKDAYS_MEDIUM.value, handler:this.delegateConfig } );
		
		/**
		* The long weekday labels for the current locale.
		* @config WEEKDAYS_LONG
		* @type String[]
		* @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		*/		
		this.cfg.addProperty(defCfg.WEEKDAYS_LONG.key,	{ value:defCfg.WEEKDAYS_LONG.value, handler:this.delegateConfig } );
	
		/**
		* The setting that determines which length of month labels should be used. Possible values are "short" and "long".
		* @config LOCALE_MONTHS
		* @type String
		* @default "long"
		*/
		this.cfg.addProperty(defCfg.LOCALE_MONTHS.key,	{ value:defCfg.LOCALE_MONTHS.value, handler:this.delegateConfig } );
	
		/**
		* The setting that determines which length of weekday labels should be used. Possible values are "1char", "short", "medium", and "long".
		* @config LOCALE_WEEKDAYS
		* @type String
		* @default "short"
		*/	
		this.cfg.addProperty(defCfg.LOCALE_WEEKDAYS.key,	{ value:defCfg.LOCALE_WEEKDAYS.value, handler:this.delegateConfig } );
	
		/**
		* The value used to delimit individual dates in a date string passed to various Calendar functions.
		* @config DATE_DELIMITER
		* @type String
		* @default ","
		*/
		this.cfg.addProperty(defCfg.DATE_DELIMITER.key,		{ value:defCfg.DATE_DELIMITER.value, handler:this.delegateConfig } );
	
		/**
		* The value used to delimit date fields in a date string passed to various Calendar functions.
		* @config DATE_FIELD_DELIMITER
		* @type String
		* @default "/"
		*/	
		this.cfg.addProperty(defCfg.DATE_FIELD_DELIMITER.key,{ value:defCfg.DATE_FIELD_DELIMITER.value, handler:this.delegateConfig } );
	
		/**
		* The value used to delimit date ranges in a date string passed to various Calendar functions.
		* @config DATE_RANGE_DELIMITER
		* @type String
		* @default "-"
		*/
		this.cfg.addProperty(defCfg.DATE_RANGE_DELIMITER.key,{ value:defCfg.DATE_RANGE_DELIMITER.value, handler:this.delegateConfig } );
	
		/**
		* The position of the month in a month/year date string
		* @config MY_MONTH_POSITION
		* @type Number
		* @default 1
		*/
		this.cfg.addProperty(defCfg.MY_MONTH_POSITION.key,	{ value:defCfg.MY_MONTH_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
		
		/**
		* The position of the year in a month/year date string
		* @config MY_YEAR_POSITION
		* @type Number
		* @default 2
		*/	
		this.cfg.addProperty(defCfg.MY_YEAR_POSITION.key,	{ value:defCfg.MY_YEAR_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
		
		/**
		* The position of the month in a month/day date string
		* @config MD_MONTH_POSITION
		* @type Number
		* @default 1
		*/	
		this.cfg.addProperty(defCfg.MD_MONTH_POSITION.key,	{ value:defCfg.MD_MONTH_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
		
		/**
		* The position of the day in a month/year date string
		* @config MD_DAY_POSITION
		* @type Number
		* @default 2
		*/	
		this.cfg.addProperty(defCfg.MD_DAY_POSITION.key,		{ value:defCfg.MD_DAY_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
		
		/**
		* The position of the month in a month/day/year date string
		* @config MDY_MONTH_POSITION
		* @type Number
		* @default 1
		*/	
		this.cfg.addProperty(defCfg.MDY_MONTH_POSITION.key,	{ value:defCfg.MDY_MONTH_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
		
		/**
		* The position of the day in a month/day/year date string
		* @config MDY_DAY_POSITION
		* @type Number
		* @default 2
		*/	
		this.cfg.addProperty(defCfg.MDY_DAY_POSITION.key,	{ value:defCfg.MDY_DAY_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
		
		/**
		* The position of the year in a month/day/year date string
		* @config MDY_YEAR_POSITION
		* @type Number
		* @default 3
		*/	
		this.cfg.addProperty(defCfg.MDY_YEAR_POSITION.key,	{ value:defCfg.MDY_YEAR_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the month in the month year label string used as the Calendar header
		* @config MY_LABEL_MONTH_POSITION
		* @type Number
		* @default 1
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_MONTH_POSITION.key,	{ value:defCfg.MY_LABEL_MONTH_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
	
		/**
		* The position of the year in the month year label string used as the Calendar header
		* @config MY_LABEL_YEAR_POSITION
		* @type Number
		* @default 2
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_YEAR_POSITION.key,	{ value:defCfg.MY_LABEL_YEAR_POSITION.value, handler:this.delegateConfig, validator:this.cfg.checkNumber } );
		
		/**
		* The suffix used after the month when rendering the Calendar header
		* @config MY_LABEL_MONTH_SUFFIX
		* @type String
		* @default " "
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_MONTH_SUFFIX.key,	{ value:defCfg.MY_LABEL_MONTH_SUFFIX.value, handler:this.delegateConfig } );
		
		/**
		* The suffix used after the year when rendering the Calendar header
		* @config MY_LABEL_YEAR_SUFFIX
		* @type String
		* @default ""
		*/
		this.cfg.addProperty(defCfg.MY_LABEL_YEAR_SUFFIX.key, { value:defCfg.MY_LABEL_YEAR_SUFFIX.value, handler:this.delegateConfig } );

		/**
		* Configuration for the Month Year Navigation UI. By default it is disabled
		* @config NAV
		* @type Object
		* @default null
		*/
		this.cfg.addProperty(defCfg.NAV.key, { value:defCfg.NAV.value, handler:this.configNavigator } );
	},

	/**
	* Initializes CalendarGroup's built-in CustomEvents
	* @method initEvents
	*/
	initEvents : function() {
		var me = this;
		var strEvent = "Event";

		/**
		* Proxy subscriber to subscribe to the CalendarGroup's child Calendars' CustomEvents
		* @method sub
		* @private
		* @param {Function} fn	The function to subscribe to this CustomEvent
		* @param {Object}	obj	The CustomEvent's scope object
		* @param {Boolean}	bOverride	Whether or not to apply scope correction
		*/
		var sub = function(fn, obj, bOverride) {
			for (var p=0;p<me.pages.length;++p) {
				var cal = me.pages[p];
				cal[this.type + strEvent].subscribe(fn, obj, bOverride);
			}
		};

		/**
		* Proxy unsubscriber to unsubscribe from the CalendarGroup's child Calendars' CustomEvents
		* @method unsub
		* @private
		* @param {Function} fn	The function to subscribe to this CustomEvent
		* @param {Object}	obj	The CustomEvent's scope object
		*/
		var unsub = function(fn, obj) {
			for (var p=0;p<me.pages.length;++p) {
				var cal = me.pages[p];
				cal[this.type + strEvent].unsubscribe(fn, obj);
			}
		};
		
		var defEvents = YAHOO.widget.Calendar._EVENT_TYPES;
	
		/**
		* Fired before a selection is made
		* @event beforeSelectEvent
		*/
		this.beforeSelectEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_SELECT);
		this.beforeSelectEvent.subscribe = sub; this.beforeSelectEvent.unsubscribe = unsub;
	
		/**
		* Fired when a selection is made
		* @event selectEvent
		* @param {Array}	Array of Date field arrays in the format [YYYY, MM, DD].
		*/
		this.selectEvent = new YAHOO.util.CustomEvent(defEvents.SELECT); 
		this.selectEvent.subscribe = sub; this.selectEvent.unsubscribe = unsub;
	
		/**
		* Fired before a selection is made
		* @event beforeDeselectEvent
		*/
		this.beforeDeselectEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_DESELECT); 
		this.beforeDeselectEvent.subscribe = sub; this.beforeDeselectEvent.unsubscribe = unsub;
	
		/**
		* Fired when a selection is made
		* @event deselectEvent
		* @param {Array}	Array of Date field arrays in the format [YYYY, MM, DD].
		*/
		this.deselectEvent = new YAHOO.util.CustomEvent(defEvents.DESELECT); 
		this.deselectEvent.subscribe = sub; this.deselectEvent.unsubscribe = unsub;
		
		/**
		* Fired when the Calendar page is changed
		* @event changePageEvent
		*/
		this.changePageEvent = new YAHOO.util.CustomEvent(defEvents.CHANGE_PAGE); 
		this.changePageEvent.subscribe = sub; this.changePageEvent.unsubscribe = unsub;
	
		/**
		* Fired before the Calendar is rendered
		* @event beforeRenderEvent
		*/
		this.beforeRenderEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_RENDER);
		this.beforeRenderEvent.subscribe = sub; this.beforeRenderEvent.unsubscribe = unsub;
	
		/**
		* Fired when the Calendar is rendered
		* @event renderEvent
		*/
		this.renderEvent = new YAHOO.util.CustomEvent(defEvents.RENDER);
		this.renderEvent.subscribe = sub; this.renderEvent.unsubscribe = unsub;
	
		/**
		* Fired when the Calendar is reset
		* @event resetEvent
		*/
		this.resetEvent = new YAHOO.util.CustomEvent(defEvents.RESET); 
		this.resetEvent.subscribe = sub; this.resetEvent.unsubscribe = unsub;
	
		/**
		* Fired when the Calendar is cleared
		* @event clearEvent
		*/
		this.clearEvent = new YAHOO.util.CustomEvent(defEvents.CLEAR);
		this.clearEvent.subscribe = sub; this.clearEvent.unsubscribe = unsub;
	
		/**
		* Fired just before the CalendarGroup is to be shown
		* @event beforeShowEvent
		*/
		this.beforeShowEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_SHOW);
	
		/**
		* Fired after the CalendarGroup is shown
		* @event showEvent
		*/
		this.showEvent = new YAHOO.util.CustomEvent(defEvents.SHOW);
	
		/**
		* Fired just before the CalendarGroup is to be hidden
		* @event beforeHideEvent
		*/
		this.beforeHideEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_HIDE);
	
		/**
		* Fired after the CalendarGroup is hidden
		* @event hideEvent
		*/
		this.hideEvent = new YAHOO.util.CustomEvent(defEvents.HIDE);

		/**
		* Fired just before the CalendarNavigator is to be shown
		* @event beforeShowNavEvent
		*/
		this.beforeShowNavEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_SHOW_NAV);
	
		/**
		* Fired after the CalendarNavigator is shown
		* @event showNavEvent
		*/
		this.showNavEvent = new YAHOO.util.CustomEvent(defEvents.SHOW_NAV);
	
		/**
		* Fired just before the CalendarNavigator is to be hidden
		* @event beforeHideNavEvent
		*/
		this.beforeHideNavEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_HIDE_NAV);
	
		/**
		* Fired after the CalendarNavigator is hidden
		* @event hideNavEvent
		*/
		this.hideNavEvent = new YAHOO.util.CustomEvent(defEvents.HIDE_NAV);

		/**
		* Fired just before the CalendarNavigator is to be rendered
		* @event beforeRenderNavEvent
		*/
		this.beforeRenderNavEvent = new YAHOO.util.CustomEvent(defEvents.BEFORE_RENDER_NAV);

		/**
		* Fired after the CalendarNavigator is rendered
		* @event renderNavEvent
		*/
		this.renderNavEvent = new YAHOO.util.CustomEvent(defEvents.RENDER_NAV);
	},
	
	/**
	* The default Config handler for the "pages" property
	* @method configPages
	* @param {String} type	The CustomEvent type (usually the property name)
	* @param {Object[]}	args	The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
	* @param {Object} obj	The scope object. For configuration handlers, this will usually equal the owner.
	*/
	configPages : function(type, args, obj) {
		var pageCount = args[0];
	
		var cfgPageDate = YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.PAGEDATE.key;
	
		// Define literals outside loop	
		var sep = "_";
		var groupCalClass = "groupcal";
	
		var firstClass = "first-of-type";
		var lastClass = "last-of-type";
	
		for (var p=0;p<pageCount;++p) {
			var calId = this.id + sep + p;
			var calContainerId = this.containerId + sep + p;
	
			var childConfig = this.cfg.getConfig();
			childConfig.close = false;
			childConfig.title = false;
			childConfig.navigator = null;

			var cal = this.constructChild(calId, calContainerId, childConfig);
			var caldate = cal.cfg.getProperty(cfgPageDate);
			this._setMonthOnDate(caldate, caldate.getMonth() + p);
			cal.cfg.setProperty(cfgPageDate, caldate);
	
			YAHOO.util.Dom.removeClass(cal.oDomContainer, this.Style.CSS_SINGLE);
			YAHOO.util.Dom.addClass(cal.oDomContainer, groupCalClass);

			if (p===0) {
				YAHOO.util.Dom.addClass(cal.oDomContainer, firstClass);
			}
	
			if (p==(pageCount-1)) {
				YAHOO.util.Dom.addClass(cal.oDomContainer, lastClass);
			}
	
			cal.parent = this;
			cal.index = p; 
	
			this.pages[this.pages.length] = cal;
		}
	},
	
	/**
	* The default Config handler for the "pagedate" property
	* @method configPageDate
	* @param {String} type	The CustomEvent type (usually the property name)
	* @param {Object[]}	args	The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
	* @param {Object} obj	The scope object. For configuration handlers, this will usually equal the owner.
	*/
	configPageDate : function(type, args, obj) {
		var val = args[0];
		var firstPageDate;
		
		var cfgPageDate = YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.PAGEDATE.key;
		
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			if (p === 0) {
				firstPageDate = cal._parsePageDate(val);
				cal.cfg.setProperty(cfgPageDate, firstPageDate);
			} else {
				var pageDate = new Date(firstPageDate);
				this._setMonthOnDate(pageDate, pageDate.getMonth() + p);
				cal.cfg.setProperty(cfgPageDate, pageDate);
			}
		}
	},
	
	/**
	* The default Config handler for the CalendarGroup "selected" property
	* @method configSelected
	* @param {String} type	The CustomEvent type (usually the property name)
	* @param {Object[]}	args	The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
	* @param {Object} obj	The scope object. For configuration handlers, this will usually equal the owner.
	*/
	configSelected : function(type, args, obj) {
		var cfgSelected = YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.SELECTED.key;
		this.delegateConfig(type, args, obj);
		var selected = (this.pages.length > 0) ? this.pages[0].cfg.getProperty(cfgSelected) : []; 
		this.cfg.setProperty(cfgSelected, selected, true);
	},

	
	/**
	* Delegates a configuration property to the CustomEvents associated with the CalendarGroup's children
	* @method delegateConfig
	* @param {String} type	The CustomEvent type (usually the property name)
	* @param {Object[]}	args	The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
	* @param {Object} obj	The scope object. For configuration handlers, this will usually equal the owner.
	*/
	delegateConfig : function(type, args, obj) {
		var val = args[0];
		var cal;
	
		for (var p=0;p<this.pages.length;p++) {
			cal = this.pages[p];
			cal.cfg.setProperty(type, val);
		}
	},

	/**
	* Adds a function to all child Calendars within this CalendarGroup.
	* @method setChildFunction
	* @param {String}		fnName		The name of the function
	* @param {Function}		fn			The function to apply to each Calendar page object
	*/
	setChildFunction : function(fnName, fn) {
		var pageCount = this.cfg.getProperty(YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.PAGES.key);
	
		for (var p=0;p<pageCount;++p) {
			this.pages[p][fnName] = fn;
		}
	},

	/**
	* Calls a function within all child Calendars within this CalendarGroup.
	* @method callChildFunction
	* @param {String}		fnName		The name of the function
	* @param {Array}		args		The arguments to pass to the function
	*/
	callChildFunction : function(fnName, args) {
		var pageCount = this.cfg.getProperty(YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.PAGES.key);
	
		for (var p=0;p<pageCount;++p) {
			var page = this.pages[p];
			if (page[fnName]) {
				var fn = page[fnName];
				fn.call(page, args);
			}
		}	
	},

	/**
	* Constructs a child calendar. This method can be overridden if a subclassed version of the default
	* calendar is to be used.
	* @method constructChild
	* @param {String}	id			The id of the table element that will represent the calendar widget
	* @param {String}	containerId	The id of the container div element that will wrap the calendar table
	* @param {Object}	config		The configuration object containing the Calendar's arguments
	* @return {YAHOO.widget.Calendar}	The YAHOO.widget.Calendar instance that is constructed
	*/
	constructChild : function(id,containerId,config) {
		var container = document.getElementById(containerId);
		if (! container) {
			container = document.createElement("div");
			container.id = containerId;
			this.oDomContainer.appendChild(container);
		}
		return new YAHOO.widget.Calendar(id,containerId,config);
	},
	
	/**
	* Sets the calendar group's month explicitly. This month will be set into the first
	* page of the multi-page calendar, and all other months will be iterated appropriately.
	* @method setMonth
	* @param {Number}	month		The numeric month, from 0 (January) to 11 (December)
	*/
	setMonth : function(month) {
		month = parseInt(month, 10);
		var currYear;

		var cfgPageDate = YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.PAGEDATE.key;

		for (var p=0; p<this.pages.length; ++p) {
			var cal = this.pages[p];
			var pageDate = cal.cfg.getProperty(cfgPageDate);
			if (p === 0) {
				currYear = pageDate.getFullYear();
			} else {
				pageDate.setFullYear(currYear);
			}
			this._setMonthOnDate(pageDate, month+p); 
			cal.cfg.setProperty(cfgPageDate, pageDate);
		}
	},

	/**
	* Sets the calendar group's year explicitly. This year will be set into the first
	* page of the multi-page calendar, and all other months will be iterated appropriately.
	* @method setYear
	* @param {Number}	year		The numeric 4-digit year
	*/
	setYear : function(year) {
	
		var cfgPageDate = YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.PAGEDATE.key;
	
		year = parseInt(year, 10);
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			var pageDate = cal.cfg.getProperty(cfgPageDate);
	
			if ((pageDate.getMonth()+1) == 1 && p>0) {
				year+=1;
			}
			cal.setYear(year);
		}
	},

	/**
	* Calls the render function of all child calendars within the group.
	* @method render
	*/
	render : function() {
		this.renderHeader();
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.render();
		}
		this.renderFooter();
	},

	/**
	* Selects a date or a collection of dates on the current calendar. This method, by default,
	* does not call the render method explicitly. Once selection has completed, render must be 
	* called for the changes to be reflected visually.
	* @method select
	* @param	{String/Date/Date[]}	date	The date string of dates to select in the current calendar. Valid formats are
	*								individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
	*								Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
	*								This method can also take a JavaScript Date object or an array of Date objects.
	* @return	{Date[]}			Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	select : function(date) {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.select(date);
		}
		return this.getSelectedDates();
	},

	/**
	* Selects dates in the CalendarGroup based on the cell index provided. This method is used to select cells without having to do a full render. The selected style is applied to the cells directly.
	* The value of the MULTI_SELECT Configuration attribute will determine the set of dates which get selected. 
	* <ul>
	*    <li>If MULTI_SELECT is false, selectCell will select the cell at the specified index for only the last displayed Calendar page.</li>
	*    <li>If MULTI_SELECT is true, selectCell will select the cell at the specified index, on each displayed Calendar page.</li>
	* </ul>
	* @method selectCell
	* @param	{Number}	cellIndex	The index of the cell to be selected. 
	* @return	{Date[]}	Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	selectCell : function(cellIndex) {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.selectCell(cellIndex);
		}
		return this.getSelectedDates();
	},
	
	/**
	* Deselects a date or a collection of dates on the current calendar. This method, by default,
	* does not call the render method explicitly. Once deselection has completed, render must be 
	* called for the changes to be reflected visually.
	* @method deselect
	* @param	{String/Date/Date[]}	date	The date string of dates to deselect in the current calendar. Valid formats are
	*								individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
	*								Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
	*								This method can also take a JavaScript Date object or an array of Date objects.	
	* @return	{Date[]}			Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	deselect : function(date) {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.deselect(date);
		}
		return this.getSelectedDates();
	},
	
	/**
	* Deselects all dates on the current calendar.
	* @method deselectAll
	* @return {Date[]}		Array of JavaScript Date objects representing all individual dates that are currently selected.
	*						Assuming that this function executes properly, the return value should be an empty array.
	*						However, the empty array is returned for the sake of being able to check the selection status
	*						of the calendar.
	*/
	deselectAll : function() {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.deselectAll();
		}
		return this.getSelectedDates();
	},
	
	/**
	* Deselects dates in the CalendarGroup based on the cell index provided. This method is used to select cells without having to do a full render. The selected style is applied to the cells directly.
	* deselectCell will deselect the cell at the specified index on each displayed Calendar page.
	*
	* @method deselectCell
	* @param	{Number}	cellIndex	The index of the cell to deselect. 
	* @return	{Date[]}	Array of JavaScript Date objects representing all individual dates that are currently selected.
	*/
	deselectCell : function(cellIndex) {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.deselectCell(cellIndex);
		}
		return this.getSelectedDates();
	},
	
	/**
	* Resets the calendar widget to the originally selected month and year, and 
	* sets the calendar to the initial selection(s).
	* @method reset
	*/
	reset : function() {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.reset();
		}
	},
	
	/**
	* Clears the selected dates in the current calendar widget and sets the calendar
	* to the current month and year.
	* @method clear
	*/
	clear : function() {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.clear();
		}
	},
	
	/**
	* Navigates to the next month page in the calendar widget.
	* @method nextMonth
	*/
	nextMonth : function() {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.nextMonth();
		}
	},
	
	/**
	* Navigates to the previous month page in the calendar widget.
	* @method previousMonth
	*/
	previousMonth : function() {
		for (var p=this.pages.length-1;p>=0;--p) {
			var cal = this.pages[p];
			cal.previousMonth();
		}
	},
	
	/**
	* Navigates to the next year in the currently selected month in the calendar widget.
	* @method nextYear
	*/
	nextYear : function() {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.nextYear();
		}
	},

	/**
	* Navigates to the previous year in the currently selected month in the calendar widget.
	* @method previousYear
	*/
	previousYear : function() {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.previousYear();
		}
	},

	/**
	* Gets the list of currently selected dates from the calendar.
	* @return			An array of currently selected JavaScript Date objects.
	* @type Date[]
	*/
	getSelectedDates : function() { 
		var returnDates = [];
		var selected = this.cfg.getProperty(YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.SELECTED.key);
		for (var d=0;d<selected.length;++d) {
			var dateArray = selected[d];

			var date = YAHOO.widget.DateMath.getDate(dateArray[0],dateArray[1]-1,dateArray[2]);
			returnDates.push(date);
		}

		returnDates.sort( function(a,b) { return a-b; } );
		return returnDates;
	},

	/**
	* Adds a renderer to the render stack. The function reference passed to this method will be executed
	* when a date cell matches the conditions specified in the date string for this renderer.
	* @method addRenderer
	* @param	{String}	sDates		A date string to associate with the specified renderer. Valid formats
	*									include date (12/24/2005), month/day (12/24), and range (12/1/2004-1/1/2005)
	* @param	{Function}	fnRender	The function executed to render cells that match the render rules for this renderer.
	*/
	addRenderer : function(sDates, fnRender) {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.addRenderer(sDates, fnRender);
		}
	},

	/**
	* Adds a month to the render stack. The function reference passed to this method will be executed
	* when a date cell matches the month passed to this method.
	* @method addMonthRenderer
	* @param	{Number}	month		The month (1-12) to associate with this renderer
	* @param	{Function}	fnRender	The function executed to render cells that match the render rules for this renderer.
	*/
	addMonthRenderer : function(month, fnRender) {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.addMonthRenderer(month, fnRender);
		}
	},

	/**
	* Adds a weekday to the render stack. The function reference passed to this method will be executed
	* when a date cell matches the weekday passed to this method.
	* @method addWeekdayRenderer
	* @param	{Number}	weekday		The weekday (1-7) to associate with this renderer. 1=Sunday, 2=Monday etc.
	* @param	{Function}	fnRender	The function executed to render cells that match the render rules for this renderer.
	*/
	addWeekdayRenderer : function(weekday, fnRender) {
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			cal.addWeekdayRenderer(weekday, fnRender);
		}
	},

	/**
	 * Removes all custom renderers added to the CalendarGroup through the addRenderer, addMonthRenderer and 
	 * addWeekRenderer methods. CalendarGroup's render method needs to be called to after removing renderers 
	 * to see the changes applied.
	 * 
	 * @method removeRenderers
	 */
	removeRenderers : function() {
		this.callChildFunction("removeRenderers");
	},

	/**
	* Renders the header for the CalendarGroup.
	* @method renderHeader
	*/
	renderHeader : function() {
		// EMPTY DEFAULT IMPL
	},

	/**
	* Renders a footer for the 2-up calendar container. By default, this method is
	* unimplemented.
	* @method renderFooter
	*/
	renderFooter : function() {
		// EMPTY DEFAULT IMPL
	},

	/**
	* Adds the designated number of months to the current calendar month, and sets the current
	* calendar page date to the new month.
	* @method addMonths
	* @param {Number}	count	The number of months to add to the current calendar
	*/
	addMonths : function(count) {
		this.callChildFunction("addMonths", count);
	},
	
	/**
	* Subtracts the designated number of months from the current calendar month, and sets the current
	* calendar page date to the new month.
	* @method subtractMonths
	* @param {Number}	count	The number of months to subtract from the current calendar
	*/
	subtractMonths : function(count) {
		this.callChildFunction("subtractMonths", count);
	},

	/**
	* Adds the designated number of years to the current calendar, and sets the current
	* calendar page date to the new month.
	* @method addYears
	* @param {Number}	count	The number of years to add to the current calendar
	*/
	addYears : function(count) {
		this.callChildFunction("addYears", count);
	},

	/**
	* Subtcats the designated number of years from the current calendar, and sets the current
	* calendar page date to the new month.
	* @method subtractYears
	* @param {Number}	count	The number of years to subtract from the current calendar
	*/
	subtractYears : function(count) {
		this.callChildFunction("subtractYears", count);
	},

	/**
	 * Returns the Calendar page instance which has a pagedate (month/year) matching the given date. 
	 * Returns null if no match is found.
	 * 
	 * @method getCalendarPage
	 * @param {Date} date The JavaScript Date object for which a Calendar page is to be found.
	 * @return {Calendar} The Calendar page instance representing the month to which the date 
	 * belongs.
	 */
	getCalendarPage : function(date) {
		var cal = null;
		if (date) {
			var y = date.getFullYear(),
				m = date.getMonth();

			var pages = this.pages;
			for (var i = 0; i < pages.length; ++i) {
				var pageDate = pages[i].cfg.getProperty("pagedate");
				if (pageDate.getFullYear() === y && pageDate.getMonth() === m) {
					cal = pages[i];
					break;
				}
			}
		}
		return cal;
	},

	/**
	* Sets the month on a Date object, taking into account year rollover if the month is less than 0 or greater than 11.
	* The Date object passed in is modified. It should be cloned before passing it into this method if the original value needs to be maintained
	* @method	_setMonthOnDate
	* @private
	* @param	{Date}	date	The Date object on which to set the month index
	* @param	{Number}	iMonth	The month index to set
	*/
	_setMonthOnDate : function(date, iMonth) {
		// Bug in Safari 1.3, 2.0 (WebKit build < 420), Date.setMonth does not work consistently if iMonth is not 0-11
		if (YAHOO.env.ua.webkit && YAHOO.env.ua.webkit < 420 && (iMonth < 0 || iMonth > 11)) {
			var DM = YAHOO.widget.DateMath;
			var newDate = DM.add(date, DM.MONTH, iMonth-date.getMonth());
			date.setTime(newDate.getTime());
		} else {
			date.setMonth(iMonth);
		}
	},
	
	/**
	 * Fixes the width of the CalendarGroup container element, to account for miswrapped floats
	 * @method _fixWidth
	 * @private
	 */
	_fixWidth : function() {
		var w = 0;
		for (var p=0;p<this.pages.length;++p) {
			var cal = this.pages[p];
			w += cal.oDomContainer.offsetWidth;
		}
		if (w > 0) {
			this.oDomContainer.style.width = w + "px";
		}
	},
	
	/**
	* Returns a string representation of the object.
	* @method toString
	* @return {String}	A string representation of the CalendarGroup object.
	*/
	toString : function() {
		return "CalendarGroup " + this.id;
	}
};

/**
* CSS class representing the container for the calendar
* @property YAHOO.widget.CalendarGroup.CSS_CONTAINER
* @static
* @final
* @type String
*/
YAHOO.widget.CalendarGroup.CSS_CONTAINER = "yui-calcontainer";

/**
* CSS class representing the container for the calendar
* @property YAHOO.widget.CalendarGroup.CSS_MULTI_UP
* @static
* @final
* @type String
*/
YAHOO.widget.CalendarGroup.CSS_MULTI_UP = "multi";

/**
* CSS class representing the title for the 2-up calendar
* @property YAHOO.widget.CalendarGroup.CSS_2UPTITLE
* @static
* @final
* @type String
*/
YAHOO.widget.CalendarGroup.CSS_2UPTITLE = "title";

/**
* CSS class representing the close icon for the 2-up calendar
* @property YAHOO.widget.CalendarGroup.CSS_2UPCLOSE
* @static
* @final
* @deprecated	Along with Calendar.IMG_ROOT and NAV_ARROW_LEFT, NAV_ARROW_RIGHT configuration properties.
*					Calendar's <a href="YAHOO.widget.Calendar.html#Style.CSS_CLOSE">Style.CSS_CLOSE</a> property now represents the CSS class used to render the close icon
* @type String
*/
YAHOO.widget.CalendarGroup.CSS_2UPCLOSE = "close-icon";

YAHOO.lang.augmentProto(YAHOO.widget.CalendarGroup, YAHOO.widget.Calendar, "buildDayLabel",
																 "buildMonthLabel",
																 "renderOutOfBoundsDate",
																 "renderRowHeader",
																 "renderRowFooter",
																 "renderCellDefault",
																 "styleCellDefault",
																 "renderCellStyleHighlight1",
																 "renderCellStyleHighlight2",
																 "renderCellStyleHighlight3",
																 "renderCellStyleHighlight4",
																 "renderCellStyleToday",
																 "renderCellStyleSelected",
																 "renderCellNotThisMonth",
																 "renderBodyCellRestricted",
																 "initStyles",
																 "configTitle",
																 "configClose",
																 "configIframe",
																 "configNavigator",
																 "createTitleBar",
																 "createCloseButton",
																 "removeTitleBar",
																 "removeCloseButton",
																 "hide",
																 "show",
																 "toDate",
																 "_parseArgs",
																 "browser");

/**
* The set of default Config property keys and values for the CalendarGroup
* @property YAHOO.widget.CalendarGroup._DEFAULT_CONFIG
* @final
* @static
* @private
* @type Object
*/
YAHOO.widget.CalendarGroup._DEFAULT_CONFIG = YAHOO.widget.Calendar._DEFAULT_CONFIG;
YAHOO.widget.CalendarGroup._DEFAULT_CONFIG.PAGES = {key:"pages", value:2};

YAHOO.widget.CalGrp = YAHOO.widget.CalendarGroup;

/**
* @class YAHOO.widget.Calendar2up
* @extends YAHOO.widget.CalendarGroup
* @deprecated The old Calendar2up class is no longer necessary, since CalendarGroup renders in a 2up view by default.
*/
YAHOO.widget.Calendar2up = function(id, containerId, config) {
	this.init(id, containerId, config);
};

YAHOO.extend(YAHOO.widget.Calendar2up, YAHOO.widget.CalendarGroup);

/**
* @deprecated The old Calendar2up class is no longer necessary, since CalendarGroup renders in a 2up view by default.
*/
YAHOO.widget.Cal2up = YAHOO.widget.Calendar2up;

/**
 * The CalendarNavigator is used along with a Calendar/CalendarGroup to 
 * provide a Month/Year popup navigation control, allowing the user to navigate 
 * to a specific month/year in the Calendar/CalendarGroup without having to 
 * scroll through months sequentially
 *
 * @namespace YAHOO.widget
 * @class CalendarNavigator
 * @constructor
 * @param {Calendar|CalendarGroup} cal The instance of the Calendar or CalendarGroup to which this CalendarNavigator should be attached.
 */
YAHOO.widget.CalendarNavigator = function(cal) {
	this.init(cal);
};

(function() {
	// Setup static properties (inside anon fn, so that we can use shortcuts)
	var CN = YAHOO.widget.CalendarNavigator;

	/**
	 * YAHOO.widget.CalendarNavigator.CLASSES contains constants
	 * for the class values applied to the CalendarNaviatgator's 
	 * DOM elements
	 * @property YAHOO.widget.CalendarNavigator.CLASSES
	 * @type Object
	 * @static
	 */
	CN.CLASSES = {
		/**
		 * Class applied to the Calendar Navigator's bounding box
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.NAV
		 * @type String
		 * @static
		 */
		NAV :"yui-cal-nav",
		/**
		 * Class applied to the Calendar/CalendarGroup's bounding box to indicate
		 * the Navigator is currently visible
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.NAV_VISIBLE
		 * @type String
		 * @static
		 */
		NAV_VISIBLE: "yui-cal-nav-visible",
		/**
		 * Class applied to the Navigator mask's bounding box
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.MASK
		 * @type String
		 * @static
		 */
		MASK : "yui-cal-nav-mask",
		/**
		 * Class applied to the year label/control bounding box
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.YEAR
		 * @type String
		 * @static
		 */
		YEAR : "yui-cal-nav-y",
		/**
		 * Class applied to the month label/control bounding box
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.MONTH
		 * @type String
		 * @static
		 */
		MONTH : "yui-cal-nav-m",
		/**
		 * Class applied to the submit/cancel button's bounding box
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.BUTTONS
		 * @type String
		 * @static
		 */
		BUTTONS : "yui-cal-nav-b",
		/**
		 * Class applied to buttons wrapping element
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.BUTTON
		 * @type String
		 * @static
		 */
		BUTTON : "yui-cal-nav-btn",
		/**
		 * Class applied to the validation error area's bounding box
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.ERROR
		 * @type String
		 * @static
		 */
		ERROR : "yui-cal-nav-e",
		/**
		 * Class applied to the year input control
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.YEAR_CTRL
		 * @type String
		 * @static
		 */
		YEAR_CTRL : "yui-cal-nav-yc",
		/**
		 * Class applied to the month input control
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.MONTH_CTRL
		 * @type String
		 * @static
		 */
		MONTH_CTRL : "yui-cal-nav-mc",
		/**
		 * Class applied to controls with invalid data (e.g. a year input field with invalid an year)
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.INVALID
		 * @type String
		 * @static
		 */
		INVALID : "yui-invalid",
		/**
		 * Class applied to default controls
		 * @property YAHOO.widget.CalendarNavigator.CLASSES.DEFAULT
		 * @type String
		 * @static
		 */
		DEFAULT : "yui-default"
	};

	/**
	 * Object literal containing the default configuration values for the CalendarNavigator
	 * The configuration object is expected to follow the format below, with the properties being
	 * case sensitive.
	 * <dl>
	 * <dt>strings</dt>
	 * <dd><em>Object</em> :  An object with the properties shown below, defining the string labels to use in the Navigator's UI
	 *     <dl>
	 *         <dt>month</dt><dd><em>String</em> : The string to use for the month label. Defaults to "Month".</dd>
	 *         <dt>year</dt><dd><em>String</em> : The string to use for the year label. Defaults to "Year".</dd>
	 *         <dt>submit</dt><dd><em>String</em> : The string to use for the submit button label. Defaults to "Okay".</dd>
	 *         <dt>cancel</dt><dd><em>String</em> : The string to use for the cancel button label. Defaults to "Cancel".</dd>
	 *         <dt>invalidYear</dt><dd><em>String</em> : The string to use for invalid year values. Defaults to "Year needs to be a number".</dd>
	 *     </dl>
	 * </dd>
	 * <dt>monthFormat</dt><dd><em>String</em> : The month format to use. Either YAHOO.widget.Calendar.LONG, or YAHOO.widget.Calendar.SHORT. Defaults to YAHOO.widget.Calendar.LONG</dd>
	 * <dt>initialFocus</dt><dd><em>String</em> : Either "year" or "month" specifying which input control should get initial focus. Defaults to "year"</dd>
	 * </dl>
	 * @property _DEFAULT_CFG
	 * @protected
	 * @type Object
	 * @static
	 */
	CN._DEFAULT_CFG = {
		strings : {
			month: "Month",
			year: "Year",
			submit: "Okay",
			cancel: "Cancel",
			invalidYear : "Year needs to be a number"
		},
		monthFormat: YAHOO.widget.Calendar.LONG,
		initialFocus: "year"
	};

	/**
	 * The suffix added to the Calendar/CalendarGroup's ID, to generate
	 * a unique ID for the Navigator and it's bounding box.
	 * @property YAHOO.widget.CalendarNavigator.ID_SUFFIX
	 * @static
	 * @type String
	 * @final
	 */
	CN.ID_SUFFIX = "_nav";
	/**
	 * The suffix added to the Navigator's ID, to generate
	 * a unique ID for the month control.
	 * @property YAHOO.widget.CalendarNavigator.MONTH_SUFFIX
	 * @static
	 * @type String 
	 * @final
	 */
	CN.MONTH_SUFFIX = "_month";
	/**
	 * The suffix added to the Navigator's ID, to generate
	 * a unique ID for the year control.
	 * @property YAHOO.widget.CalendarNavigator.YEAR_SUFFIX
	 * @static
	 * @type String
	 * @final
	 */
	CN.YEAR_SUFFIX = "_year";
	/**
	 * The suffix added to the Navigator's ID, to generate
	 * a unique ID for the error bounding box.
	 * @property YAHOO.widget.CalendarNavigator.ERROR_SUFFIX
	 * @static
	 * @type String
	 * @final
	 */
	CN.ERROR_SUFFIX = "_error";
	/**
	 * The suffix added to the Navigator's ID, to generate
	 * a unique ID for the "Cancel" button.
	 * @property YAHOO.widget.CalendarNavigator.CANCEL_SUFFIX
	 * @static
	 * @type String
	 * @final
	 */
	CN.CANCEL_SUFFIX = "_cancel";
	/**
	 * The suffix added to the Navigator's ID, to generate
	 * a unique ID for the "Submit" button.
	 * @property YAHOO.widget.CalendarNavigator.SUBMIT_SUFFIX
	 * @static
	 * @type String
	 * @final
	 */
	CN.SUBMIT_SUFFIX = "_submit";

	/**
	 * The number of digits to which the year input control is to be limited.
	 * @property YAHOO.widget.CalendarNavigator.YR_MAX_DIGITS
	 * @static
	 * @type Number
	 */
	CN.YR_MAX_DIGITS = 4;

	/**
	 * The amount by which to increment the current year value,
	 * when the arrow up/down key is pressed on the year control
	 * @property YAHOO.widget.CalendarNavigator.YR_MINOR_INC
	 * @static
	 * @type Number
	 */
	CN.YR_MINOR_INC = 1;

	/**
	 * The amount by which to increment the current year value,
	 * when the page up/down key is pressed on the year control
	 * @property YAHOO.widget.CalendarNavigator.YR_MAJOR_INC
	 * @static
	 * @type Number
	 */
	CN.YR_MAJOR_INC = 10;

	/**
	 * Artificial delay (in ms) between the time the Navigator is hidden
	 * and the Calendar/CalendarGroup state is updated. Allows the user
	 * the see the Calendar/CalendarGroup page changing. If set to 0
	 * the Calendar/CalendarGroup page will be updated instantly
	 * @property YAHOO.widget.CalendarNavigator.UPDATE_DELAY
	 * @static
	 * @type Number
	 */
	CN.UPDATE_DELAY = 50;

	/**
	 * Regular expression used to validate the year input
	 * @property YAHOO.widget.CalendarNavigator.YR_PATTERN
	 * @static
	 * @type RegExp
	 */
	CN.YR_PATTERN = /^\d+$/;
	/**
	 * Regular expression used to trim strings
	 * @property YAHOO.widget.CalendarNavigator.TRIM
	 * @static
	 * @type RegExp
	 */
	CN.TRIM = /^\s*(.*?)\s*$/;
})();

YAHOO.widget.CalendarNavigator.prototype = {

	/**
	 * The unique ID for this CalendarNavigator instance
	 * @property id
	 * @type String
	 */
	id : null,

	/**
	 * The Calendar/CalendarGroup instance to which the navigator belongs
	 * @property cal
	 * @type {Calendar|CalendarGroup}
	 */
	cal : null,

	/**
	 * Reference to the HTMLElement used to render the navigator's bounding box
	 * @property navEl
	 * @type HTMLElement
	 */
	navEl : null,

	/**
	 * Reference to the HTMLElement used to render the navigator's mask
	 * @property maskEl
	 * @type HTMLElement
	 */
	maskEl : null,

	/**
	 * Reference to the HTMLElement used to input the year
	 * @property yearEl
	 * @type HTMLElement
	 */
	yearEl : null,

	/**
	 * Reference to the HTMLElement used to input the month
	 * @property monthEl
	 * @type HTMLElement
	 */
	monthEl : null,

	/**
	 * Reference to the HTMLElement used to display validation errors
	 * @property errorEl
	 * @type HTMLElement
	 */
	errorEl : null,

	/**
	 * Reference to the HTMLElement used to update the Calendar/Calendar group
	 * with the month/year values
	 * @property submitEl
	 * @type HTMLElement
	 */
	submitEl : null,
	
	/**
	 * Reference to the HTMLElement used to hide the navigator without updating the 
	 * Calendar/Calendar group
	 * @property cancelEl
	 * @type HTMLElement
	 */
	cancelEl : null,

	/** 
	 * Reference to the first focusable control in the navigator (by default monthEl)
	 * @property firstCtrl
	 * @type HTMLElement
	 */
	firstCtrl : null,
	
	/** 
	 * Reference to the last focusable control in the navigator (by default cancelEl)
	 * @property lastCtrl
	 * @type HTMLElement
	 */
	lastCtrl : null,

	/**
	 * The document containing the Calendar/Calendar group instance
	 * @protected
	 * @property _doc
	 * @type HTMLDocument
	 */
	_doc : null,

	/**
	 * Internal state property for the current year displayed in the navigator
	 * @protected
	 * @property _year
	 * @type Number
	 */
	_year: null,
	
	/**
	 * Internal state property for the current month index displayed in the navigator
	 * @protected
	 * @property _month
	 * @type Number
	 */
	_month: 0,

	/**
	 * Private internal state property which indicates whether or not the 
	 * Navigator has been rendered.
	 * @private
	 * @property __rendered
	 * @type Boolean
	 */
	__rendered: false,

	/**
	 * Init lifecycle method called as part of construction
	 * 
	 * @method init
	 * @param {Calendar} cal The instance of the Calendar or CalendarGroup to which this CalendarNavigator should be attached
	 */
	init : function(cal) {
		var calBox = cal.oDomContainer;

		this.cal = cal;
		this.id = calBox.id + YAHOO.widget.CalendarNavigator.ID_SUFFIX;
		this._doc = calBox.ownerDocument;

		/**
		 * Private flag, to identify IE6/IE7 Quirks
		 * @private
		 * @property __isIEQuirks
		 */
		var ie = YAHOO.env.ua.ie;
		this.__isIEQuirks = (ie && ((ie <= 6) || (ie === 7 && this._doc.compatMode == "BackCompat")));
	},

	/**
	 * Displays the navigator and mask, updating the input controls to reflect the 
	 * currently set month and year. The show method will invoke the render method
	 * if the navigator has not been renderered already, allowing for lazy rendering
	 * of the control.
	 * 
	 * The show method will fire the Calendar/CalendarGroup's beforeShowNav and showNav events
	 * 
	 * @method show
	 */
	show : function() {
		var CLASSES = YAHOO.widget.CalendarNavigator.CLASSES;

		if (this.cal.beforeShowNavEvent.fire()) {
			if (!this.__rendered) {
				this.render();
			}
			this.clearErrors();

			this._updateMonthUI();
			this._updateYearUI();
			this._show(this.navEl, true);

			this.setInitialFocus();
			this.showMask();

			YAHOO.util.Dom.addClass(this.cal.oDomContainer, CLASSES.NAV_VISIBLE);
			this.cal.showNavEvent.fire();
		}
	},

	/**
	 * Hides the navigator and mask
	 * 
	 * The show method will fire the Calendar/CalendarGroup's beforeHideNav event and hideNav events
	 * @method hide
	 */
	hide : function() {
		var CLASSES = YAHOO.widget.CalendarNavigator.CLASSES;

		if (this.cal.beforeHideNavEvent.fire()) {
			this._show(this.navEl, false);
			this.hideMask();
			YAHOO.util.Dom.removeClass(this.cal.oDomContainer, CLASSES.NAV_VISIBLE);
			this.cal.hideNavEvent.fire();
		}
	},
	

	/**
	 * Displays the navigator's mask element
	 * 
	 * @method showMask
	 */
	showMask : function() {
		this._show(this.maskEl, true);
		if (this.__isIEQuirks) {
			this._syncMask();
		}
	},

	/**
	 * Hides the navigator's mask element
	 * 
	 * @method hideMask
	 */
	hideMask : function() {
		this._show(this.maskEl, false);
	},

	/**
	 * Returns the current month set on the navigator
	 * 
	 * Note: This may not be the month set in the UI, if 
	 * the UI contains an invalid value.
	 * 
	 * @method getMonth
	 * @return {Number} The Navigator's current month index
	 */
	getMonth: function() {
		return this._month;
	},

	/**
	 * Returns the current year set on the navigator
	 * 
	 * Note: This may not be the year set in the UI, if 
	 * the UI contains an invalid value.
	 * 
	 * @method getYear
	 * @return {Number} The Navigator's current year value
	 */
	getYear: function() {
		return this._year;
	},

	/**
	 * Sets the current month on the Navigator, and updates the UI
	 * 
	 * @method setMonth
	 * @param {Number} nMonth The month index, from 0 (Jan) through 11 (Dec).
	 */
	setMonth : function(nMonth) {
		if (nMonth >= 0 && nMonth < 12) {
			this._month = nMonth;
		}
		this._updateMonthUI();
	},

	/**
	 * Sets the current year on the Navigator, and updates the UI. If the 
	 * provided year is invalid, it will not be set.
	 * 
	 * @method setYear
	 * @param {Number} nYear The full year value to set the Navigator to.
	 */
	setYear : function(nYear) {
		var yrPattern = YAHOO.widget.CalendarNavigator.YR_PATTERN;
		if (YAHOO.lang.isNumber(nYear) && yrPattern.test(nYear+"")) {
			this._year = nYear;
		}
		this._updateYearUI();
	},

	/**
	 * Renders the HTML for the navigator, adding it to the 
	 * document and attaches event listeners if it has not 
	 * already been rendered.
	 * 
	 * @method render
	 */
	render: function() {
		this.cal.beforeRenderNavEvent.fire();
		if (!this.__rendered) {
			this.createNav();
			this.createMask();
			this.applyListeners();
			this.__rendered = true;
		}
		this.cal.renderNavEvent.fire();
	},

	/**
	 * Creates the navigator's containing HTMLElement, it's contents, and appends 
	 * the containg element to the Calendar/CalendarGroup's container.
	 * 
	 * @method createNav
	 */
	createNav : function() {
		var NAV = YAHOO.widget.CalendarNavigator;
		var doc = this._doc;

		var d = doc.createElement("div");
		d.className = NAV.CLASSES.NAV;

		var htmlBuf = this.renderNavContents([]);

		d.innerHTML = htmlBuf.join('');
		this.cal.oDomContainer.appendChild(d);

		this.navEl = d;

		this.yearEl = doc.getElementById(this.id + NAV.YEAR_SUFFIX);
		this.monthEl = doc.getElementById(this.id + NAV.MONTH_SUFFIX);
		this.errorEl = doc.getElementById(this.id + NAV.ERROR_SUFFIX);
		this.submitEl = doc.getElementById(this.id + NAV.SUBMIT_SUFFIX);
		this.cancelEl = doc.getElementById(this.id + NAV.CANCEL_SUFFIX);

		if (YAHOO.env.ua.gecko && this.yearEl && this.yearEl.type == "text") {
			// Avoid XUL error on focus, select [ https://bugzilla.mozilla.org/show_bug.cgi?id=236791, 
			// supposedly fixed in 1.8.1, but there are reports of it still being around for methods other than blur ]
			this.yearEl.setAttribute("autocomplete", "off");
		}

		this._setFirstLastElements();
	},

	/**
	 * Creates the Mask HTMLElement and appends it to the Calendar/CalendarGroups
	 * container.
	 * 
	 * @method createMask
	 */
	createMask : function() {
		var C = YAHOO.widget.CalendarNavigator.CLASSES;

		var d = this._doc.createElement("div");
		d.className = C.MASK;

		this.cal.oDomContainer.appendChild(d);
		this.maskEl = d;
	},

	/**
	 * Used to set the width/height of the mask in pixels to match the Calendar Container.
	 * Currently only used for IE6 and IE7 quirks mode. The other A-Grade browser are handled using CSS (width/height 100%).
	 * <p>
	 * The method is also registered as an HTMLElement resize listener on the Calendars container element.
	 * </p>
	 * @protected
	 * @method _syncMask
	 */
	_syncMask : function() {
		var c = this.cal.oDomContainer;
		if (c && this.maskEl) {
			var r = YAHOO.util.Dom.getRegion(c);
			YAHOO.util.Dom.setStyle(this.maskEl, "width", r.right - r.left + "px");
			YAHOO.util.Dom.setStyle(this.maskEl, "height", r.bottom - r.top + "px");
		}
	},

	/**
	 * Renders the contents of the navigator
	 * 
	 * @method renderNavContents
	 * 
	 * @param {Array} html The HTML buffer to append the HTML to.
	 * @return {Array} A reference to the buffer passed in.
	 */
	renderNavContents : function(html) {
		var NAV = YAHOO.widget.CalendarNavigator,
			C = NAV.CLASSES,
			h = html; // just to use a shorter name

		h[h.length] = '<div class="' + C.MONTH + '">';
		this.renderMonth(h);
		h[h.length] = '</div>';
		h[h.length] = '<div class="' + C.YEAR + '">';
		this.renderYear(h);
		h[h.length] = '</div>';
		h[h.length] = '<div class="' + C.BUTTONS + '">';
		this.renderButtons(h);
		h[h.length] = '</div>';
		h[h.length] = '<div class="' + C.ERROR + '" id="' + this.id + NAV.ERROR_SUFFIX + '"></div>';

		return h;
	},

	/**
	 * Renders the month label and control for the navigator
	 * 
	 * @method renderNavContents
	 * @param {Array} html The HTML buffer to append the HTML to.
	 * @return {Array} A reference to the buffer passed in.
	 */
	renderMonth : function(html) {
		var NAV = YAHOO.widget.CalendarNavigator,
			C = NAV.CLASSES;

		var id = this.id + NAV.MONTH_SUFFIX,
			mf = this.__getCfg("monthFormat"),
			months = this.cal.cfg.getProperty((mf == YAHOO.widget.Calendar.SHORT) ? "MONTHS_SHORT" : "MONTHS_LONG"),
			h = html;

		if (months && months.length > 0) {
			h[h.length] = '<label for="' + id + '">';
			h[h.length] = this.__getCfg("month", true);
			h[h.length] = '</label>';
			h[h.length] = '<select name="' + id + '" id="' + id + '" class="' + C.MONTH_CTRL + '">';
			for (var i = 0; i < months.length; i++) {
				h[h.length] = '<option value="' + i + '">';
				h[h.length] = months[i];
				h[h.length] = '</option>';
			}
			h[h.length] = '</select>';
		}
		return h;
	},

	/**
	 * Renders the year label and control for the navigator
	 * 
	 * @method renderYear
	 * @param {Array} html The HTML buffer to append the HTML to.
	 * @return {Array} A reference to the buffer passed in.
	 */
	renderYear : function(html) {
		var NAV = YAHOO.widget.CalendarNavigator,
			C = NAV.CLASSES;

		var id = this.id + NAV.YEAR_SUFFIX,
			size = NAV.YR_MAX_DIGITS,
			h = html;

		h[h.length] = '<label for="' + id + '">';
		h[h.length] = this.__getCfg("year", true);
		h[h.length] = '</label>';
		h[h.length] = '<input type="text" name="' + id + '" id="' + id + '" class="' + C.YEAR_CTRL + '" maxlength="' + size + '"/>';
		return h;
	},

	/**
	 * Renders the submit/cancel buttons for the navigator
	 * 
	 * @method renderButton
	 * @return {String} The HTML created for the Button UI
	 */
	renderButtons : function(html) {
		var C = YAHOO.widget.CalendarNavigator.CLASSES;
		var h = html;

		h[h.length] = '<span class="' + C.BUTTON + ' ' + C.DEFAULT + '">';
		h[h.length] = '<button type="button" id="' + this.id + '_submit' + '">';
		h[h.length] = this.__getCfg("submit", true);
		h[h.length] = '</button>';
		h[h.length] = '</span>';
		h[h.length] = '<span class="' + C.BUTTON +'">';
		h[h.length] = '<button type="button" id="' + this.id + '_cancel' + '">';
		h[h.length] = this.__getCfg("cancel", true);
		h[h.length] = '</button>';
		h[h.length] = '</span>';

		return h;
	},

	/**
	 * Attaches DOM event listeners to the rendered elements
	 * <p>
	 * The method will call applyKeyListeners, to setup keyboard specific 
	 * listeners
	 * </p>
	 * @method applyListeners
	 */
	applyListeners : function() {
		var E = YAHOO.util.Event;

		function yearUpdateHandler() {
			if (this.validate()) {
				this.setYear(this._getYearFromUI());
			}
		}

		function monthUpdateHandler() {
			this.setMonth(this._getMonthFromUI());
		}

		E.on(this.submitEl, "click", this.submit, this, true);
		E.on(this.cancelEl, "click", this.cancel, this, true);
		E.on(this.yearEl, "blur", yearUpdateHandler, this, true);
		E.on(this.monthEl, "change", monthUpdateHandler, this, true);

		if (this.__isIEQuirks) {
			YAHOO.util.Event.on(this.cal.oDomContainer, "resize", this._syncMask, this, true);
		}

		this.applyKeyListeners();
	},

	/**
	 * Removes/purges DOM event listeners from the rendered elements
	 * 
	 * @method purgeListeners
	 */
	purgeListeners : function() {
		var E = YAHOO.util.Event;
		E.removeListener(this.submitEl, "click", this.submit);
		E.removeListener(this.cancelEl, "click", this.cancel);
		E.removeListener(this.yearEl, "blur");
		E.removeListener(this.monthEl, "change");
		if (this.__isIEQuirks) {
			E.removeListener(this.cal.oDomContainer, "resize", this._syncMask);
		}

		this.purgeKeyListeners();
	},

	/**
	 * Attaches DOM listeners for keyboard support. 
	 * Tab/Shift-Tab looping, Enter Key Submit on Year element,
	 * Up/Down/PgUp/PgDown year increment on Year element
	 * <p>
	 * NOTE: MacOSX Safari 2.x doesn't let you tab to buttons and 
	 * MacOSX Gecko does not let you tab to buttons or select controls,
	 * so for these browsers, Tab/Shift-Tab looping is limited to the 
	 * elements which can be reached using the tab key.
	 * </p>
	 * @method applyKeyListeners
	 */
	applyKeyListeners : function() {
		var E = YAHOO.util.Event,
			ua = YAHOO.env.ua;

		// IE/Safari 3.1 doesn't fire keypress for arrow/pg keys (non-char keys)
		var arrowEvt = (ua.ie || ua.webkit) ? "keydown" : "keypress";

		// - IE/Safari 3.1 doesn't fire keypress for non-char keys
		// - Opera doesn't allow us to cancel keydown or keypress for tab, but 
		//   changes focus successfully on keydown (keypress is too late to change focus - opera's already moved on).
		var tabEvt = (ua.ie || ua.opera || ua.webkit) ? "keydown" : "keypress";

		// Everyone likes keypress for Enter (char keys) - whoo hoo!
		E.on(this.yearEl, "keypress", this._handleEnterKey, this, true);

		E.on(this.yearEl, arrowEvt, this._handleDirectionKeys, this, true);
		E.on(this.lastCtrl, tabEvt, this._handleTabKey, this, true);
		E.on(this.firstCtrl, tabEvt, this._handleShiftTabKey, this, true);
	},

	/**
	 * Removes/purges DOM listeners for keyboard support
	 *
	 * @method purgeKeyListeners
	 */
	purgeKeyListeners : function() {
		var E = YAHOO.util.Event,
			ua = YAHOO.env.ua;

		var arrowEvt = (ua.ie || ua.webkit) ? "keydown" : "keypress";
		var tabEvt = (ua.ie || ua.opera || ua.webkit) ? "keydown" : "keypress";

		E.removeListener(this.yearEl, "keypress", this._handleEnterKey);
		E.removeListener(this.yearEl, arrowEvt, this._handleDirectionKeys);
		E.removeListener(this.lastCtrl, tabEvt, this._handleTabKey);
		E.removeListener(this.firstCtrl, tabEvt, this._handleShiftTabKey);
	},

	/**
	 * Updates the Calendar/CalendarGroup's pagedate with the currently set month and year if valid.
	 * <p>
	 * If the currently set month/year is invalid, a validation error will be displayed and the 
	 * Calendar/CalendarGroup's pagedate will not be updated.
	 * </p>
	 * @method submit
	 */
	submit : function() {
		if (this.validate()) {
			this.hide();

			this.setMonth(this._getMonthFromUI());
			this.setYear(this._getYearFromUI());

			var cal = this.cal;
			var nav = this;
			
			function update() {
				cal.setYear(nav.getYear());
				cal.setMonth(nav.getMonth());
				cal.render();
			}
			// Artificial delay, just to help the user see something changed
			var delay = YAHOO.widget.CalendarNavigator.UPDATE_DELAY;
			if (delay > 0) {
				window.setTimeout(update, delay);
			} else {
				update();
			}
		}
	},

	/**
	 * Hides the navigator and mask, without updating the Calendar/CalendarGroup's state
	 * 
	 * @method cancel
	 */
	cancel : function() {
		this.hide();
	},

	/**
	 * Validates the current state of the UI controls
	 * 
	 * @method validate
	 * @return {Boolean} true, if the current UI state contains valid values, false if not
	 */
	validate : function() {
		if (this._getYearFromUI() !== null) {
			this.clearErrors();
			return true;
		} else {
			this.setYearError();
			this.setError(this.__getCfg("invalidYear", true));
			return false;
		}
	},

	/**
	 * Displays an error message in the Navigator's error panel
	 * @method setError
	 * @param {String} msg The error message to display
	 */
	setError : function(msg) {
		if (this.errorEl) {
			this.errorEl.innerHTML = msg;
			this._show(this.errorEl, true);
		}
	},

	/**
	 * Clears the navigator's error message and hides the error panel
	 * @method clearError 
	 */
	clearError : function() {
		if (this.errorEl) {
			this.errorEl.innerHTML = "";
			this._show(this.errorEl, false);
		}
	},

	/**
	 * Displays the validation error UI for the year control
	 * @method setYearError
	 */
	setYearError : function() {
		YAHOO.util.Dom.addClass(this.yearEl, YAHOO.widget.CalendarNavigator.CLASSES.INVALID);
	},

	/**
	 * Removes the validation error UI for the year control
	 * @method clearYearError
	 */
	clearYearError : function() {
		YAHOO.util.Dom.removeClass(this.yearEl, YAHOO.widget.CalendarNavigator.CLASSES.INVALID);
	},

	/**
	 * Clears all validation and error messages in the UI
	 * @method clearErrors
	 */
	clearErrors : function() {
		this.clearError();
		this.clearYearError();
	},

	/**
	 * Sets the initial focus, based on the configured value
	 * @method setInitialFocus
	 */
	setInitialFocus : function() {
		var el = this.submitEl;
		var f = this.__getCfg("initialFocus");

		if (f && f.toLowerCase) {
			f = f.toLowerCase();
			if (f == "year") {
				el = this.yearEl;
				try {
					this.yearEl.select();
				} catch (e) {
					// Ignore;
				}
			} else if (f == "month") {
				el = this.monthEl;
			}
		}

		if (el && YAHOO.lang.isFunction(el.focus)) {
			try {
				el.focus();
			} catch (e) {
				// TODO: Fall back if focus fails?
			}
		}
	},

	/**
	 * Removes all renderered HTML elements for the Navigator from
	 * the DOM, purges event listeners and clears (nulls) any property
	 * references to HTML references
	 * @method erase
	 */
	erase : function() {
		if (this.__rendered) {
			this.purgeListeners();

			// Clear out innerHTML references
			this.yearEl = null;
			this.monthEl = null;
			this.errorEl = null;
			this.submitEl = null;
			this.cancelEl = null;
			this.firstCtrl = null;
			this.lastCtrl = null;
			if (this.navEl) {
				this.navEl.innerHTML = "";
			}

			var p = this.navEl.parentNode;
			if (p) {
				p.removeChild(this.navEl);
			}
			this.navEl = null;

			var pm = this.maskEl.parentNode;
			if (pm) {
				pm.removeChild(this.maskEl);
			}
			this.maskEl = null;
			this.__rendered = false;
		}
	},

	/**
	 * Destroys the Navigator object and any HTML references
	 * @method destroy
	 */
	destroy : function() {
		this.erase();
		this._doc = null;
		this.cal = null;
		this.id = null;
	},

	/**
	 * Protected implementation to handle how UI elements are 
	 * hidden/shown.
	 *
	 * @method _show
	 * @protected
	 */
	_show : function(el, bShow) {
		if (el) {
			YAHOO.util.Dom.setStyle(el, "display", (bShow) ? "block" : "none");
		}
	},

	/**
	 * Returns the month value (index), from the month UI element
	 * @protected
	 * @method _getMonthFromUI
	 * @return {Number} The month index, or 0 if a UI element for the month
	 * is not found
	 */
	_getMonthFromUI : function() {
		if (this.monthEl) {
			return this.monthEl.selectedIndex;
		} else {
			return 0; // Default to Jan
		}
	},

	/**
	 * Returns the year value, from the Navitator's year UI element
	 * @protected
	 * @method _getYearFromUI
	 * @return {Number} The year value set in the UI, if valid. null is returned if 
	 * the UI does not contain a valid year value.
	 */
	_getYearFromUI : function() {
		var NAV = YAHOO.widget.CalendarNavigator;

		var yr = null;
		if (this.yearEl) {
			var value = this.yearEl.value;
			value = value.replace(NAV.TRIM, "$1");

			if (NAV.YR_PATTERN.test(value)) {
				yr = parseInt(value, 10);
			}
		}
		return yr;
	},

	/**
	 * Updates the Navigator's year UI, based on the year value set on the Navigator object
	 * @protected
	 * @method _updateYearUI
	 */
	_updateYearUI : function() {
		if (this.yearEl && this._year !== null) {
			this.yearEl.value = this._year;
		}
	},

	/**
	 * Updates the Navigator's month UI, based on the month value set on the Navigator object
	 * @protected
	 * @method _updateMonthUI
	 */
	_updateMonthUI : function() {
		if (this.monthEl) {
			this.monthEl.selectedIndex = this._month;
		}
	},

	/**
	 * Sets up references to the first and last focusable element in the Navigator's UI
	 * in terms of tab order (Naviagator's firstEl and lastEl properties). The references
	 * are used to control modality by looping around from the first to the last control
	 * and visa versa for tab/shift-tab navigation.
	 * <p>
	 * See <a href="#applyKeyListeners">applyKeyListeners</a>
	 * </p>
	 * @protected
	 * @method _setFirstLastElements
	 */
	_setFirstLastElements : function() {
		this.firstCtrl = this.monthEl;
		this.lastCtrl = this.cancelEl;

		// Special handling for MacOSX.
		// - Safari 2.x can't focus on buttons
		// - Gecko can't focus on select boxes or buttons
		if (this.__isMac) {
			if (YAHOO.env.ua.webkit && YAHOO.env.ua.webkit < 420){
				this.firstCtrl = this.monthEl;
				this.lastCtrl = this.yearEl;
			}
			if (YAHOO.env.ua.gecko) {
				this.firstCtrl = this.yearEl;
				this.lastCtrl = this.yearEl;
			}
		}
	},

	/**
	 * Default Keyboard event handler to capture Enter 
	 * on the Navigator's year control (yearEl)
	 * 
	 * @method _handleEnterKey
	 * @protected
	 * @param {Event} e The DOM event being handled
	 */
	_handleEnterKey : function(e) {
		var KEYS = YAHOO.util.KeyListener.KEY;

		if (YAHOO.util.Event.getCharCode(e) == KEYS.ENTER) {
			YAHOO.util.Event.preventDefault(e);
			this.submit();
		}
	},

	/**
	 * Default Keyboard event handler to capture up/down/pgup/pgdown
	 * on the Navigator's year control (yearEl).
	 * 
	 * @method _handleDirectionKeys
	 * @protected
	 * @param {Event} e The DOM event being handled
	 */
	_handleDirectionKeys : function(e) {
		var E = YAHOO.util.Event;
		var KEYS = YAHOO.util.KeyListener.KEY;
		var NAV = YAHOO.widget.CalendarNavigator;

		var value = (this.yearEl.value) ? parseInt(this.yearEl.value, 10) : null;
		if (isFinite(value)) {
			var dir = false;
			switch(E.getCharCode(e)) {
				case KEYS.UP:
					this.yearEl.value = value + NAV.YR_MINOR_INC;
					dir = true;
					break;
				case KEYS.DOWN:
					this.yearEl.value = Math.max(value - NAV.YR_MINOR_INC, 0);
					dir = true;
					break;
				case KEYS.PAGE_UP:
					this.yearEl.value = value + NAV.YR_MAJOR_INC;
					dir = true;
					break;
				case KEYS.PAGE_DOWN:
					this.yearEl.value = Math.max(value - NAV.YR_MAJOR_INC, 0);
					dir = true;
					break;
				default:
					break;
			}
			if (dir) {
				E.preventDefault(e);
				try {
					this.yearEl.select();
				} catch(e) {
					// Ignore
				}
			}
		}
	},

	/**
	 * Default Keyboard event handler to capture Tab 
	 * on the last control (lastCtrl) in the Navigator.
	 * 
	 * @method _handleTabKey
	 * @protected
	 * @param {Event} e The DOM event being handled
	 */
	_handleTabKey : function(e) {
		var E = YAHOO.util.Event;
		var KEYS = YAHOO.util.KeyListener.KEY;

		if (E.getCharCode(e) == KEYS.TAB && !e.shiftKey) {
			try {
				E.preventDefault(e);
				this.firstCtrl.focus();
			} catch (e) {
				// Ignore - mainly for focus edge cases
			}
		}
	},

	/**
	 * Default Keyboard event handler to capture Shift-Tab 
	 * on the first control (firstCtrl) in the Navigator.
	 * 
	 * @method _handleShiftTabKey
	 * @protected
	 * @param {Event} e The DOM event being handled
	 */
	_handleShiftTabKey : function(e) {
		var E = YAHOO.util.Event;
		var KEYS = YAHOO.util.KeyListener.KEY;

		if (e.shiftKey && E.getCharCode(e) == KEYS.TAB) {
			try {
				E.preventDefault(e);
				this.lastCtrl.focus();
			} catch (e) {
				// Ignore - mainly for focus edge cases
			}
		}
	},

	/**
	 * Retrieve Navigator configuration values from 
	 * the parent Calendar/CalendarGroup's config value.
	 * <p>
	 * If it has not been set in the user provided configuration, the method will 
	 * return the default value of the configuration property, as set in _DEFAULT_CFG
	 * </p>
	 * @private
	 * @method __getCfg
	 * @param {String} Case sensitive property name.
	 * @param {Boolean} true, if the property is a string property, false if not.
	 * @return The value of the configuration property
	 */
	__getCfg : function(prop, bIsStr) {
		var DEF_CFG = YAHOO.widget.CalendarNavigator._DEFAULT_CFG;
		var cfg = this.cal.cfg.getProperty("navigator");

		if (bIsStr) {
			return (cfg !== true && cfg.strings && cfg.strings[prop]) ? cfg.strings[prop] : DEF_CFG.strings[prop];
		} else {
			return (cfg !== true && cfg[prop]) ? cfg[prop] : DEF_CFG[prop];
		}
	},

	/**
	 * Private flag, to identify MacOS
	 * @private
	 * @property __isMac
	 */
	__isMac : (navigator.userAgent.toLowerCase().indexOf("macintosh") != -1)

};

YAHOO.register("calendar", YAHOO.widget.Calendar, {version: "2.5.1", build: "984"});
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
(function(){var G=YAHOO.util.Dom,L=YAHOO.util.Event,I=YAHOO.lang,B=YAHOO.widget.Overlay,J=YAHOO.widget.Menu,D={},K=null,E=null,C=null;function F(N,M,Q,O){var R,P;if(I.isString(N)&&I.isString(M)){if(YAHOO.env.ua.ie){P="<input type=\""+N+"\" name=\""+M+"\"";if(O){P+=" checked";}P+=">";R=document.createElement(P);}else{R=document.createElement("input");R.name=M;R.type=N;if(O){R.checked=true;}}R.value=Q;return R;}}function H(N,T){var M=N.nodeName.toUpperCase(),R=this,S,O,P;function U(V){if(!(V in T)){S=N.getAttributeNode(V);if(S&&("value" in S)){T[V]=S.value;}}}function Q(){U("type");if(T.type=="button"){T.type="push";}if(!("disabled" in T)){T.disabled=N.disabled;}U("name");U("value");U("title");}switch(M){case"A":T.type="link";U("href");U("target");break;case"INPUT":Q();if(!("checked" in T)){T.checked=N.checked;}break;case"BUTTON":Q();O=N.parentNode.parentNode;if(G.hasClass(O,this.CSS_CLASS_NAME+"-checked")){T.checked=true;}if(G.hasClass(O,this.CSS_CLASS_NAME+"-disabled")){T.disabled=true;}N.removeAttribute("value");N.setAttribute("type","button");break;}N.removeAttribute("id");N.removeAttribute("name");if(!("tabindex" in T)){T.tabindex=N.tabIndex;}if(!("label" in T)){P=M=="INPUT"?N.value:N.innerHTML;if(P&&P.length>0){T.label=P;}}}function A(O){var N=O.attributes,M=N.srcelement,Q=M.nodeName.toUpperCase(),P=this;if(Q==this.NODE_NAME){O.element=M;O.id=M.id;G.getElementsBy(function(R){switch(R.nodeName.toUpperCase()){case"BUTTON":case"A":case"INPUT":H.call(P,R,N);break;}},"*",M);}else{switch(Q){case"BUTTON":case"A":case"INPUT":H.call(this,M,N);break;}}}YAHOO.widget.Button=function(Q,N){if(!B&&YAHOO.widget.Overlay){B=YAHOO.widget.Overlay;}if(!J&&YAHOO.widget.Menu){J=YAHOO.widget.Menu;}var P=YAHOO.widget.Button.superclass.constructor,O,M;if(arguments.length==1&&!I.isString(Q)&&!Q.nodeName){if(!Q.id){Q.id=G.generateId();}P.call(this,(this.createButtonElement(Q.type)),Q);}else{O={element:null,attributes:(N||{})};if(I.isString(Q)){M=G.get(Q);if(M){if(!O.attributes.id){O.attributes.id=Q;}O.attributes.srcelement=M;A.call(this,O);if(!O.element){O.element=this.createButtonElement(O.attributes.type);}P.call(this,O.element,O.attributes);}}else{if(Q.nodeName){if(!O.attributes.id){if(Q.id){O.attributes.id=Q.id;}else{O.attributes.id=G.generateId();}}O.attributes.srcelement=Q;A.call(this,O);if(!O.element){O.element=this.createButtonElement(O.attributes.type);}P.call(this,O.element,O.attributes);}}}};YAHOO.extend(YAHOO.widget.Button,YAHOO.util.Element,{_button:null,_menu:null,_hiddenFields:null,_onclickAttributeValue:null,_activationKeyPressed:false,_activationButtonPressed:false,_hasKeyEventHandlers:false,_hasMouseEventHandlers:false,NODE_NAME:"SPAN",CHECK_ACTIVATION_KEYS:[32],ACTIVATION_KEYS:[13,32],OPTION_AREA_WIDTH:20,CSS_CLASS_NAME:"yui-button",RADIO_DEFAULT_TITLE:"Unchecked.  Click to check.",RADIO_CHECKED_TITLE:"Checked.  Click another button to uncheck",CHECKBOX_DEFAULT_TITLE:"Unchecked.  Click to check.",CHECKBOX_CHECKED_TITLE:"Checked.  Click to uncheck.",MENUBUTTON_DEFAULT_TITLE:"Menu collapsed.  Click to expand.",MENUBUTTON_MENU_VISIBLE_TITLE:"Menu expanded.  Click or press Esc to collapse.",SPLITBUTTON_DEFAULT_TITLE:("Menu collapsed.  Click inside option region or press Ctrl + Shift + M to show the menu."),SPLITBUTTON_OPTION_VISIBLE_TITLE:"Menu expanded.  Press Esc or Ctrl + Shift + M to hide the menu.",SUBMIT_TITLE:"Click to submit form.",_setType:function(M){if(M=="split"){this.on("option",this._onOption);}},_setLabel:function(M){this._button.innerHTML=M;var O,N;if(YAHOO.env.ua.gecko&&G.inDocument(this.get("element"))){N=this;O=this.CSS_CLASS_NAME;this.removeClass(O);window.setTimeout(function(){N.addClass(O);},0);}},_setTabIndex:function(M){this._button.tabIndex=M;},_setTitle:function(N){var M=N;if(this.get("type")!="link"){if(!M){switch(this.get("type")){case"radio":M=this.RADIO_DEFAULT_TITLE;break;case"checkbox":M=this.CHECKBOX_DEFAULT_TITLE;break;case"menu":M=this.MENUBUTTON_DEFAULT_TITLE;break;case"split":M=this.SPLITBUTTON_DEFAULT_TITLE;break;case"submit":M=this.SUBMIT_TITLE;break;}}this._button.title=M;}},_setDisabled:function(M){if(this.get("type")!="link"){if(M){if(this._menu){this._menu.hide();}if(this.hasFocus()){this.blur();}this._button.setAttribute("disabled","disabled");this.addStateCSSClasses("disabled");this.removeStateCSSClasses("hover");this.removeStateCSSClasses("active");this.removeStateCSSClasses("focus");}else{this._button.removeAttribute("disabled");this.removeStateCSSClasses("disabled");}}},_setHref:function(M){if(this.get("type")=="link"){this._button.href=M;}},_setTarget:function(M){if(this.get("type")=="link"){this._button.setAttribute("target",M);}},_setChecked:function(N){var O=this.get("type"),M;if(O=="checkbox"||O=="radio"){if(N){this.addStateCSSClasses("checked");M=(O=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{this.removeStateCSSClasses("checked");M=(O=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}this.set("title",M);}},_setMenu:function(W){var Q=this.get("lazyloadmenu"),T=this.get("element"),M,Y=false,Z,P,S,O,N,V,R;if(!B){return false;}if(J){M=J.prototype.CSS_CLASS_NAME;}function X(){Z.render(T.parentNode);this.removeListener("appendTo",X);}function U(){if(Z){G.addClass(Z.element,this.get("menuclassname"));G.addClass(Z.element,"yui-"+this.get("type")+"-button-menu");Z.showEvent.subscribe(this._onMenuShow,null,this);Z.hideEvent.subscribe(this._onMenuHide,null,this);Z.renderEvent.subscribe(this._onMenuRender,null,this);if(J&&Z instanceof J){Z.keyDownEvent.subscribe(this._onMenuKeyDown,this,true);Z.subscribe("click",this._onMenuClick,this,true);Z.itemAddedEvent.subscribe(this._onMenuItemAdded,this,true);S=Z.srcElement;if(S&&S.nodeName.toUpperCase()=="SELECT"){S.style.display="none";S.parentNode.removeChild(S);}}else{if(B&&Z instanceof B){if(!K){K=new YAHOO.widget.OverlayManager();}K.register(Z);}}this._menu=Z;if(!Y){if(Q&&J&&!(Z instanceof J)){Z.beforeShowEvent.subscribe(this._onOverlayBeforeShow,null,this);}else{if(!Q){if(G.inDocument(T)){Z.render(T.parentNode);
}else{this.on("appendTo",X);}}}}}}if(W&&J&&(W instanceof J)){Z=W;O=Z.getItems();N=O.length;Y=true;if(N>0){R=N-1;do{V=O[R];if(V){V.cfg.subscribeToConfigEvent("selected",this._onMenuItemSelected,V,this);}}while(R--);}U.call(this);}else{if(B&&W&&(W instanceof B)){Z=W;Y=true;Z.cfg.setProperty("visible",false);Z.cfg.setProperty("context",[T,"tl","bl"]);U.call(this);}else{if(J&&I.isArray(W)){this.on("appendTo",function(){Z=new J(G.generateId(),{lazyload:Q,itemdata:W});U.call(this);});}else{if(I.isString(W)){P=G.get(W);if(P){if(J&&G.hasClass(P,M)||P.nodeName.toUpperCase()=="SELECT"){Z=new J(W,{lazyload:Q});U.call(this);}else{if(B){Z=new B(W,{visible:false,context:[T,"tl","bl"]});U.call(this);}}}}else{if(W&&W.nodeName){if(J&&G.hasClass(W,M)||W.nodeName.toUpperCase()=="SELECT"){Z=new J(W,{lazyload:Q});U.call(this);}else{if(B){if(!W.id){G.generateId(W);}Z=new B(W,{visible:false,context:[T,"tl","bl"]});U.call(this);}}}}}}}},_setOnClick:function(M){if(this._onclickAttributeValue&&(this._onclickAttributeValue!=M)){this.removeListener("click",this._onclickAttributeValue.fn);this._onclickAttributeValue=null;}if(!this._onclickAttributeValue&&I.isObject(M)&&I.isFunction(M.fn)){this.on("click",M.fn,M.obj,M.scope);this._onclickAttributeValue=M;}},_setSelectedMenuItem:function(N){var M=this._menu,O;if(J&&M&&M instanceof J){O=M.getItem(N);if(O&&!O.cfg.getProperty("selected")){O.cfg.setProperty("selected",true);}}},_isActivationKey:function(M){var Q=this.get("type"),N=(Q=="checkbox"||Q=="radio")?this.CHECK_ACTIVATION_KEYS:this.ACTIVATION_KEYS,P=N.length,O;if(P>0){O=P-1;do{if(M==N[O]){return true;}}while(O--);}},_isSplitButtonOptionKey:function(M){return(M.ctrlKey&&M.shiftKey&&L.getCharCode(M)==77);},_addListenersToForm:function(){var S=this.getForm(),R=YAHOO.widget.Button.onFormKeyPress,Q,M,P,O,N;if(S){L.on(S,"reset",this._onFormReset,null,this);L.on(S,"submit",this.createHiddenFields,null,this);M=this.get("srcelement");if(this.get("type")=="submit"||(M&&M.type=="submit")){P=L.getListeners(S,"keypress");Q=false;if(P){O=P.length;if(O>0){N=O-1;do{if(P[N].fn==R){Q=true;break;}}while(N--);}}if(!Q){L.on(S,"keypress",R);}}}},_showMenu:function(R){if(YAHOO.widget.MenuManager){YAHOO.widget.MenuManager.hideVisible();}if(K){K.hideAll();}var P=B.VIEWPORT_OFFSET,Y=this._menu,W=this,Z=W.get("element"),T=false,V=G.getY(Z),U=G.getDocumentScrollTop(),M,Q,b;if(U){V=V-U;}var O=V,N=(G.getViewportHeight()-(V+Z.offsetHeight));function S(){if(T){return(O-P);}else{return(N-P);}}function a(){var c=S();if(Q>c){M=Y.cfg.getProperty("minscrollheight");if(c>M){Y.cfg.setProperty("maxheight",c);if(T){Y.align("bl","tl");}}if(c<M){if(T){Y.cfg.setProperty("context",[Z,"tl","bl"],true);Y.align("tl","bl");}else{Y.cfg.setProperty("context",[Z,"bl","tl"],true);Y.align("bl","tl");T=true;return a();}}}}if(J&&Y&&(Y instanceof J)){Y.cfg.applyConfig({context:[Z,"tl","bl"],clicktohide:false,visible:true});Y.cfg.fireQueue();Y.cfg.setProperty("maxheight",0);Y.align("tl","bl");if(R.type=="mousedown"){L.stopPropagation(R);}Q=Y.element.offsetHeight;b=Y.element.lastChild;a();if(this.get("focusmenu")){this._menu.focus();}}else{if(B&&Y&&(Y instanceof B)){Y.show();Y.align("tl","bl");var X=S();Q=Y.element.offsetHeight;if(X<Q){Y.align("bl","tl");T=true;X=S();if(X<Q){Y.align("tl","bl");}}}}},_hideMenu:function(){var M=this._menu;if(M){M.hide();}},_onMouseOver:function(M){if(!this._hasMouseEventHandlers){this.on("mouseout",this._onMouseOut);this.on("mousedown",this._onMouseDown);this.on("mouseup",this._onMouseUp);this._hasMouseEventHandlers=true;}this.addStateCSSClasses("hover");if(this._activationButtonPressed){this.addStateCSSClasses("active");}if(this._bOptionPressed){this.addStateCSSClasses("activeoption");}if(this._activationButtonPressed||this._bOptionPressed){L.removeListener(document,"mouseup",this._onDocumentMouseUp);}},_onMouseOut:function(M){this.removeStateCSSClasses("hover");if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}if(this._activationButtonPressed||this._bOptionPressed){L.on(document,"mouseup",this._onDocumentMouseUp,null,this);}},_onDocumentMouseUp:function(O){this._activationButtonPressed=false;this._bOptionPressed=false;var P=this.get("type"),M,N;if(P=="menu"||P=="split"){M=L.getTarget(O);N=this._menu.element;if(M!=N&&!G.isAncestor(N,M)){this.removeStateCSSClasses((P=="menu"?"active":"activeoption"));this._hideMenu();}}L.removeListener(document,"mouseup",this._onDocumentMouseUp);},_onMouseDown:function(P){var R,N,Q,O;function M(){this._hideMenu();this.removeListener("mouseup",M);}if((P.which||P.button)==1){if(!this.hasFocus()){this.focus();}R=this.get("type");if(R=="split"){N=this.get("element");Q=L.getPageX(P)-G.getX(N);if((N.offsetWidth-this.OPTION_AREA_WIDTH)<Q){this.fireEvent("option",P);}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}else{if(R=="menu"){if(this.isActive()){this._hideMenu();this._activationButtonPressed=false;}else{this._showMenu(P);this._activationButtonPressed=true;}}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}if(R=="split"||R=="menu"){O=this;this._hideMenuTimerId=window.setTimeout(function(){O.on("mouseup",M);},250);}}},_onMouseUp:function(M){var N=this.get("type");if(this._hideMenuTimerId){window.clearTimeout(this._hideMenuTimerId);}if(N=="checkbox"||N=="radio"){this.set("checked",!(this.get("checked")));}this._activationButtonPressed=false;if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}},_onFocus:function(N){var M;this.addStateCSSClasses("focus");if(this._activationKeyPressed){this.addStateCSSClasses("active");}C=this;if(!this._hasKeyEventHandlers){M=this._button;L.on(M,"blur",this._onBlur,null,this);L.on(M,"keydown",this._onKeyDown,null,this);L.on(M,"keyup",this._onKeyUp,null,this);this._hasKeyEventHandlers=true;}this.fireEvent("focus",N);},_onBlur:function(M){this.removeStateCSSClasses("focus");if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}if(this._activationKeyPressed){L.on(document,"keyup",this._onDocumentKeyUp,null,this);
}C=null;this.fireEvent("blur",M);},_onDocumentKeyUp:function(M){if(this._isActivationKey(L.getCharCode(M))){this._activationKeyPressed=false;L.removeListener(document,"keyup",this._onDocumentKeyUp);}},_onKeyDown:function(N){var M=this._menu;if(this.get("type")=="split"&&this._isSplitButtonOptionKey(N)){this.fireEvent("option",N);}else{if(this._isActivationKey(L.getCharCode(N))){if(this.get("type")=="menu"){this._showMenu(N);}else{this._activationKeyPressed=true;this.addStateCSSClasses("active");}}}if(M&&M.cfg.getProperty("visible")&&L.getCharCode(N)==27){M.hide();this.focus();}},_onKeyUp:function(M){var N;if(this._isActivationKey(L.getCharCode(M))){N=this.get("type");if(N=="checkbox"||N=="radio"){this.set("checked",!(this.get("checked")));}this._activationKeyPressed=false;if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}}},_onClick:function(P){var S=this.get("type"),M,Q,N,O,R;switch(S){case"radio":case"checkbox":if(this.get("checked")){M=(S=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{M=(S=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}this.set("title",M);break;case"submit":this.submitForm();break;case"reset":Q=this.getForm();if(Q){Q.reset();}break;case"menu":M=this._menu.cfg.getProperty("visible")?this.MENUBUTTON_MENU_VISIBLE_TITLE:this.MENUBUTTON_DEFAULT_TITLE;this.set("title",M);break;case"split":O=this.get("element");R=L.getPageX(P)-G.getX(O);if((O.offsetWidth-this.OPTION_AREA_WIDTH)<R){return false;}else{this._hideMenu();N=this.get("srcelement");if(N&&N.type=="submit"){this.submitForm();}}M=this._menu.cfg.getProperty("visible")?this.SPLITBUTTON_OPTION_VISIBLE_TITLE:this.SPLITBUTTON_DEFAULT_TITLE;this.set("title",M);break;}},_onAppendTo:function(N){var M=this;window.setTimeout(function(){M._addListenersToForm();},0);},_onFormReset:function(N){var O=this.get("type"),M=this._menu;if(O=="checkbox"||O=="radio"){this.resetValue("checked");}if(J&&M&&(M instanceof J)){this.resetValue("selectedMenuItem");}},_onDocumentMouseDown:function(P){var M=L.getTarget(P),O=this.get("element"),N=this._menu.element;if(M!=O&&!G.isAncestor(O,M)&&M!=N&&!G.isAncestor(N,M)){this._hideMenu();L.removeListener(document,"mousedown",this._onDocumentMouseDown);}},_onOption:function(M){if(this.hasClass("yui-split-button-activeoption")){this._hideMenu();this._bOptionPressed=false;}else{this._showMenu(M);this._bOptionPressed=true;}},_onOverlayBeforeShow:function(N){var M=this._menu;M.render(this.get("element").parentNode);M.beforeShowEvent.unsubscribe(this._onOverlayBeforeShow);},_onMenuShow:function(N){L.on(document,"mousedown",this._onDocumentMouseDown,null,this);var M,O;if(this.get("type")=="split"){M=this.SPLITBUTTON_OPTION_VISIBLE_TITLE;O="activeoption";}else{M=this.MENUBUTTON_MENU_VISIBLE_TITLE;O="active";}this.addStateCSSClasses(O);this.set("title",M);},_onMenuHide:function(O){var N=this._menu,M,P;if(this.get("type")=="split"){M=this.SPLITBUTTON_DEFAULT_TITLE;P="activeoption";}else{M=this.MENUBUTTON_DEFAULT_TITLE;P="active";}this.removeStateCSSClasses(P);this.set("title",M);if(this.get("type")=="split"){this._bOptionPressed=false;}},_onMenuKeyDown:function(O,N){var M=N[0];if(L.getCharCode(M)==27){this.focus();if(this.get("type")=="split"){this._bOptionPressed=false;}}},_onMenuRender:function(N){var P=this.get("element"),M=P.parentNode,O=this._menu.element;if(M!=O.parentNode){M.appendChild(O);}this.set("selectedMenuItem",this.get("selectedMenuItem"));},_onMenuItemSelected:function(O,N,M){var P=N[0];if(P){this.set("selectedMenuItem",M);}},_onMenuItemAdded:function(O,N,M){var P=N[0];P.cfg.subscribeToConfigEvent("selected",this._onMenuItemSelected,P,this);},_onMenuClick:function(N,M){var P=M[1],O;if(P){O=this.get("srcelement");if(O&&O.type=="submit"){this.submitForm();}this._hideMenu();}},createButtonElement:function(M){var O=this.NODE_NAME,N=document.createElement(O);N.innerHTML="<"+O+" class=\"first-child\">"+(M=="link"?"<a></a>":"<button type=\"button\"></button>")+"</"+O+">";return N;},addStateCSSClasses:function(M){var N=this.get("type");if(I.isString(M)){if(M!="activeoption"){this.addClass(this.CSS_CLASS_NAME+("-"+M));}this.addClass("yui-"+N+("-button-"+M));}},removeStateCSSClasses:function(M){var N=this.get("type");if(I.isString(M)){this.removeClass(this.CSS_CLASS_NAME+("-"+M));this.removeClass("yui-"+N+("-button-"+M));}},createHiddenFields:function(){this.removeHiddenFields();var R=this.getForm(),U,N,P,S,T,O,Q,M;if(R&&!this.get("disabled")){N=this.get("type");P=(N=="checkbox"||N=="radio");if(P||(E==this)){U=F((P?N:"hidden"),this.get("name"),this.get("value"),this.get("checked"));if(U){if(P){U.style.display="none";}R.appendChild(U);}}S=this._menu;if(J&&S&&(S instanceof J)){M=S.srcElement;T=this.get("selectedMenuItem");if(T){if(M&&M.nodeName.toUpperCase()=="SELECT"){R.appendChild(M);M.selectedIndex=T.index;}else{Q=(T.value===null||T.value==="")?T.cfg.getProperty("text"):T.value;O=this.get("name");if(Q&&O){M=F("hidden",(O+"_options"),Q);R.appendChild(M);}}}}if(U&&M){this._hiddenFields=[U,M];}else{if(!U&&M){this._hiddenFields=M;}else{if(U&&!M){this._hiddenFields=U;}}}return this._hiddenFields;}},removeHiddenFields:function(){var P=this._hiddenFields,N,O;function M(Q){if(G.inDocument(Q)){Q.parentNode.removeChild(Q);}}if(P){if(I.isArray(P)){N=P.length;if(N>0){O=N-1;do{M(P[O]);}while(O--);}}else{M(P);}this._hiddenFields=null;}},submitForm:function(){var P=this.getForm(),O=this.get("srcelement"),N=false,M;if(P){if(this.get("type")=="submit"||(O&&O.type=="submit")){E=this;}if(YAHOO.env.ua.ie){N=P.fireEvent("onsubmit");}else{M=document.createEvent("HTMLEvents");M.initEvent("submit",true,true);N=P.dispatchEvent(M);}if((YAHOO.env.ua.ie||YAHOO.env.ua.webkit)&&N){P.submit();}}return N;},init:function(M,T){var O=T.type=="link"?"a":"button",Q=T.srcelement,S=M.getElementsByTagName(O)[0],R;if(!S){R=M.getElementsByTagName("input")[0];if(R){S=document.createElement("button");S.setAttribute("type","button");R.parentNode.replaceChild(S,R);}}this._button=S;YAHOO.widget.Button.superclass.init.call(this,M,T);
D[this.get("id")]=this;this.addClass(this.CSS_CLASS_NAME);this.addClass("yui-"+this.get("type")+"-button");L.on(this._button,"focus",this._onFocus,null,this);this.on("mouseover",this._onMouseOver);this.on("click",this._onClick);this.on("appendTo",this._onAppendTo);var V=this.get("container"),N=this.get("element"),U=G.inDocument(N),P;if(V){if(Q&&Q!=N){P=Q.parentNode;if(P){P.removeChild(Q);}}if(I.isString(V)){L.onContentReady(V,function(){this.appendTo(V);},null,this);}else{this.appendTo(V);}}else{if(!U&&Q&&Q!=N){P=Q.parentNode;if(P){this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:P});P.replaceChild(N,Q);this.fireEvent("appendTo",{type:"appendTo",target:P});}}else{if(this.get("type")!="link"&&U&&Q&&Q==N){this._addListenersToForm();}}}},initAttributes:function(N){var M=N||{};YAHOO.widget.Button.superclass.initAttributes.call(this,M);this.setAttributeConfig("type",{value:(M.type||"push"),validator:I.isString,writeOnce:true,method:this._setType});this.setAttributeConfig("label",{value:M.label,validator:I.isString,method:this._setLabel});this.setAttributeConfig("value",{value:M.value});this.setAttributeConfig("name",{value:M.name,validator:I.isString});this.setAttributeConfig("tabindex",{value:M.tabindex,validator:I.isNumber,method:this._setTabIndex});this.configureAttribute("title",{value:M.title,validator:I.isString,method:this._setTitle});this.setAttributeConfig("disabled",{value:(M.disabled||false),validator:I.isBoolean,method:this._setDisabled});this.setAttributeConfig("href",{value:M.href,validator:I.isString,method:this._setHref});this.setAttributeConfig("target",{value:M.target,validator:I.isString,method:this._setTarget});this.setAttributeConfig("checked",{value:(M.checked||false),validator:I.isBoolean,method:this._setChecked});this.setAttributeConfig("container",{value:M.container,writeOnce:true});this.setAttributeConfig("srcelement",{value:M.srcelement,writeOnce:true});this.setAttributeConfig("menu",{value:null,method:this._setMenu,writeOnce:true});this.setAttributeConfig("lazyloadmenu",{value:(M.lazyloadmenu===false?false:true),validator:I.isBoolean,writeOnce:true});this.setAttributeConfig("menuclassname",{value:(M.menuclassname||"yui-button-menu"),validator:I.isString,method:this._setMenuClassName,writeOnce:true});this.setAttributeConfig("selectedMenuItem",{value:null,method:this._setSelectedMenuItem});this.setAttributeConfig("onclick",{value:M.onclick,method:this._setOnClick});this.setAttributeConfig("focusmenu",{value:(M.focusmenu===false?false:true),validator:I.isBoolean});},focus:function(){if(!this.get("disabled")){this._button.focus();}},blur:function(){if(!this.get("disabled")){this._button.blur();}},hasFocus:function(){return(C==this);},isActive:function(){return this.hasClass(this.CSS_CLASS_NAME+"-active");},getMenu:function(){return this._menu;},getForm:function(){return this._button.form;},getHiddenFields:function(){return this._hiddenFields;},destroy:function(){var O=this.get("element"),N=O.parentNode,M=this._menu,Q;if(M){if(K&&K.find(M)){K.remove(M);}M.destroy();}L.purgeElement(O);L.purgeElement(this._button);L.removeListener(document,"mouseup",this._onDocumentMouseUp);L.removeListener(document,"keyup",this._onDocumentKeyUp);L.removeListener(document,"mousedown",this._onDocumentMouseDown);var P=this.getForm();if(P){L.removeListener(P,"reset",this._onFormReset);L.removeListener(P,"submit",this.createHiddenFields);}this.unsubscribeAll();if(N){N.removeChild(O);}delete D[this.get("id")];Q=G.getElementsByClassName(this.CSS_CLASS_NAME,this.NODE_NAME,P);if(I.isArray(Q)&&Q.length===0){L.removeListener(P,"keypress",YAHOO.widget.Button.onFormKeyPress);}},fireEvent:function(N,M){var O=arguments[0];if(this.DOM_EVENTS[O]&&this.get("disabled")){return ;}return YAHOO.widget.Button.superclass.fireEvent.apply(this,arguments);},toString:function(){return("Button "+this.get("id"));}});YAHOO.widget.Button.onFormKeyPress=function(Q){var O=L.getTarget(Q),R=L.getCharCode(Q),P=O.nodeName&&O.nodeName.toUpperCase(),M=O.type,S=false,U,V,N,W;function T(Z){var Y,X;switch(Z.nodeName.toUpperCase()){case"INPUT":case"BUTTON":if(Z.type=="submit"&&!Z.disabled){if(!S&&!N){N=Z;}if(V&&!W){W=Z;}}break;default:Y=Z.id;if(Y){U=D[Y];if(U){S=true;if(!U.get("disabled")){X=U.get("srcelement");if(!V&&(U.get("type")=="submit"||(X&&X.type=="submit"))){V=U;}}}}break;}}if(R==13&&((P=="INPUT"&&(M=="text"||M=="password"||M=="checkbox"||M=="radio"||M=="file"))||P=="SELECT")){G.getElementsBy(T,"*",this);if(N){N.focus();}else{if(!N&&V){if(W){L.preventDefault(Q);}V.submitForm();}}}};YAHOO.widget.Button.addHiddenFieldsToForm=function(M){var R=G.getElementsByClassName(YAHOO.widget.Button.prototype.CSS_CLASS_NAME,"*",M),P=R.length,Q,N,O;if(P>0){for(O=0;O<P;O++){N=R[O].id;if(N){Q=D[N];if(Q){Q.createHiddenFields();}}}}};YAHOO.widget.Button.getButton=function(M){var N=D[M];if(N){return N;}};})();(function(){var C=YAHOO.util.Dom,B=YAHOO.util.Event,D=YAHOO.lang,A=YAHOO.widget.Button,E={};YAHOO.widget.ButtonGroup=function(J,H){var I=YAHOO.widget.ButtonGroup.superclass.constructor,K,G,F;if(arguments.length==1&&!D.isString(J)&&!J.nodeName){if(!J.id){F=C.generateId();J.id=F;}I.call(this,(this._createGroupElement()),J);}else{if(D.isString(J)){G=C.get(J);if(G){if(G.nodeName.toUpperCase()==this.NODE_NAME){I.call(this,G,H);}}}else{K=J.nodeName.toUpperCase();if(K&&K==this.NODE_NAME){if(!J.id){J.id=C.generateId();}I.call(this,J,H);}}}};YAHOO.extend(YAHOO.widget.ButtonGroup,YAHOO.util.Element,{_buttons:null,NODE_NAME:"DIV",CSS_CLASS_NAME:"yui-buttongroup",_createGroupElement:function(){var F=document.createElement(this.NODE_NAME);return F;},_setDisabled:function(G){var H=this.getCount(),F;if(H>0){F=H-1;do{this._buttons[F].set("disabled",G);}while(F--);}},_onKeyDown:function(K){var G=B.getTarget(K),I=B.getCharCode(K),H=G.parentNode.parentNode.id,J=E[H],F=-1;if(I==37||I==38){F=(J.index===0)?(this._buttons.length-1):(J.index-1);}else{if(I==39||I==40){F=(J.index===(this._buttons.length-1))?0:(J.index+1);}}if(F>-1){this.check(F);this.getButton(F).focus();
}},_onAppendTo:function(H){var I=this._buttons,G=I.length,F;for(F=0;F<G;F++){I[F].appendTo(this.get("element"));}},_onButtonCheckedChange:function(G,F){var I=G.newValue,H=this.get("checkedButton");if(I&&H!=F){if(H){H.set("checked",false,true);}this.set("checkedButton",F);this.set("value",F.get("value"));}else{if(H&&!H.set("checked")){H.set("checked",true,true);}}},init:function(I,H){this._buttons=[];YAHOO.widget.ButtonGroup.superclass.init.call(this,I,H);this.addClass(this.CSS_CLASS_NAME);var J=this.getElementsByClassName("yui-radio-button");if(J.length>0){this.addButtons(J);}function F(K){return(K.type=="radio");}J=C.getElementsBy(F,"input",this.get("element"));if(J.length>0){this.addButtons(J);}this.on("keydown",this._onKeyDown);this.on("appendTo",this._onAppendTo);var G=this.get("container");if(G){if(D.isString(G)){B.onContentReady(G,function(){this.appendTo(G);},null,this);}else{this.appendTo(G);}}},initAttributes:function(G){var F=G||{};YAHOO.widget.ButtonGroup.superclass.initAttributes.call(this,F);this.setAttributeConfig("name",{value:F.name,validator:D.isString});this.setAttributeConfig("disabled",{value:(F.disabled||false),validator:D.isBoolean,method:this._setDisabled});this.setAttributeConfig("value",{value:F.value});this.setAttributeConfig("container",{value:F.container,writeOnce:true});this.setAttributeConfig("checkedButton",{value:null});},addButton:function(J){var L,K,G,F,H,I;if(J instanceof A&&J.get("type")=="radio"){L=J;}else{if(!D.isString(J)&&!J.nodeName){J.type="radio";L=new A(J);}else{L=new A(J,{type:"radio"});}}if(L){F=this._buttons.length;H=L.get("name");I=this.get("name");L.index=F;this._buttons[F]=L;E[L.get("id")]=L;if(H!=I){L.set("name",I);}if(this.get("disabled")){L.set("disabled",true);}if(L.get("checked")){this.set("checkedButton",L);}K=L.get("element");G=this.get("element");if(K.parentNode!=G){G.appendChild(K);}L.on("checkedChange",this._onButtonCheckedChange,L,this);return L;}},addButtons:function(G){var H,I,J,F;if(D.isArray(G)){H=G.length;J=[];if(H>0){for(F=0;F<H;F++){I=this.addButton(G[F]);if(I){J[J.length]=I;}}if(J.length>0){return J;}}}},removeButton:function(H){var I=this.getButton(H),G,F;if(I){this._buttons.splice(H,1);delete E[I.get("id")];I.removeListener("checkedChange",this._onButtonCheckedChange);I.destroy();G=this._buttons.length;if(G>0){F=this._buttons.length-1;do{this._buttons[F].index=F;}while(F--);}}},getButton:function(F){if(D.isNumber(F)){return this._buttons[F];}},getButtons:function(){return this._buttons;},getCount:function(){return this._buttons.length;},focus:function(H){var I,G,F;if(D.isNumber(H)){I=this._buttons[H];if(I){I.focus();}}else{G=this.getCount();for(F=0;F<G;F++){I=this._buttons[F];if(!I.get("disabled")){I.focus();break;}}}},check:function(F){var G=this.getButton(F);if(G){G.set("checked",true);}},destroy:function(){var I=this._buttons.length,H=this.get("element"),F=H.parentNode,G;if(I>0){G=this._buttons.length-1;do{this._buttons[G].destroy();}while(G--);}B.purgeElement(H);F.removeChild(H);},toString:function(){return("ButtonGroup "+this.get("id"));}});})();YAHOO.register("button",YAHOO.widget.Button,{version:"2.5.1",build:"984"});/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
(function(){var B=YAHOO.util.Dom,A=YAHOO.util.Event,C=YAHOO.lang;if(YAHOO.widget.Button){YAHOO.widget.ToolbarButtonAdvanced=YAHOO.widget.Button;YAHOO.widget.ToolbarButtonAdvanced.prototype.buttonType="rich";YAHOO.widget.ToolbarButtonAdvanced.prototype.checkValue=function(F){var E=this.getMenu().getItems();if(E.length===0){this.getMenu()._onBeforeShow();E=this.getMenu().getItems();}for(var D=0;D<E.length;D++){E[D].cfg.setProperty("checked",false);if(E[D].value==F){E[D].cfg.setProperty("checked",true);}}};}else{YAHOO.widget.ToolbarButtonAdvanced=function(){};}YAHOO.widget.ToolbarButton=function(E,D){if(C.isObject(arguments[0])&&!B.get(E).nodeType){D=E;}var G=(D||{});var F={element:null,attributes:G};if(!F.attributes.type){F.attributes.type="push";}F.element=document.createElement("span");F.element.setAttribute("unselectable","on");F.element.className="yui-button yui-"+F.attributes.type+"-button";F.element.innerHTML='<span class="first-child"><a href="#">LABEL</a></span>';F.element.firstChild.firstChild.tabIndex="-1";F.attributes.id=B.generateId();YAHOO.widget.ToolbarButton.superclass.constructor.call(this,F.element,F.attributes);};YAHOO.extend(YAHOO.widget.ToolbarButton,YAHOO.util.Element,{buttonType:"normal",_handleMouseOver:function(){if(!this.get("disabled")){this.addClass("yui-button-hover");this.addClass("yui-"+this.get("type")+"-button-hover");}},_handleMouseOut:function(){this.removeClass("yui-button-hover");this.removeClass("yui-"+this.get("type")+"-button-hover");},checkValue:function(F){if(this.get("type")=="menu"){var E=this._button.options;for(var D=0;D<E.length;D++){if(E[D].value==F){E.selectedIndex=D;}}}},init:function(E,D){YAHOO.widget.ToolbarButton.superclass.init.call(this,E,D);this.on("mouseover",this._handleMouseOver,this,true);this.on("mouseout",this._handleMouseOut,this,true);},initAttributes:function(D){YAHOO.widget.ToolbarButton.superclass.initAttributes.call(this,D);this.setAttributeConfig("value",{value:D.value});this.setAttributeConfig("menu",{value:D.menu||false});this.setAttributeConfig("type",{value:D.type,writeOnce:true,method:function(H){var G,F;if(!this._button){this._button=this.get("element").getElementsByTagName("a")[0];}switch(H){case"select":case"menu":G=document.createElement("select");var I=this.get("menu");for(var E=0;E<I.length;E++){F=document.createElement("option");F.innerHTML=I[E].text;F.value=I[E].value;if(I[E].checked){F.selected=true;}G.appendChild(F);}this._button.parentNode.replaceChild(G,this._button);A.on(G,"change",this._handleSelect,this,true);this._button=G;break;}}});this.setAttributeConfig("disabled",{value:D.disabled||false,method:function(E){if(E){this.addClass("yui-button-disabled");this.addClass("yui-"+this.get("type")+"-button-disabled");}else{this.removeClass("yui-button-disabled");this.removeClass("yui-"+this.get("type")+"-button-disabled");}if(this.get("type")=="menu"){this._button.disabled=E;}}});this.setAttributeConfig("label",{value:D.label,method:function(E){if(!this._button){this._button=this.get("element").getElementsByTagName("a")[0];}if(this.get("type")=="push"){this._button.innerHTML=E;}}});this.setAttributeConfig("title",{value:D.title});this.setAttributeConfig("container",{value:null,writeOnce:true,method:function(E){this.appendTo(E);}});},_handleSelect:function(E){var D=A.getTarget(E);var F=D.options[D.selectedIndex].value;this.fireEvent("change",{type:"change",value:F});},getMenu:function(){return this.get("menu");},destroy:function(){A.purgeElement(this.get("element"),true);this.get("element").parentNode.removeChild(this.get("element"));for(var D in this){if(C.hasOwnProperty(this,D)){this[D]=null;}}},fireEvent:function(E,D){if(this.DOM_EVENTS[E]&&this.get("disabled")){return ;}YAHOO.widget.ToolbarButton.superclass.fireEvent.call(this,E,D);},toString:function(){return"ToolbarButton ("+this.get("id")+")";}});})();(function(){var C=YAHOO.util.Dom,A=YAHOO.util.Event,E=YAHOO.lang;var B=function(G){var F=G;if(E.isString(G)){F=this.getButtonById(G);}if(E.isNumber(G)){F=this.getButtonByIndex(G);}if((!(F instanceof YAHOO.widget.ToolbarButton))&&(!(F instanceof YAHOO.widget.ToolbarButtonAdvanced))){F=this.getButtonByValue(G);}if((F instanceof YAHOO.widget.ToolbarButton)||(F instanceof YAHOO.widget.ToolbarButtonAdvanced)){return F;}return false;};YAHOO.widget.Toolbar=function(J,I){if(E.isObject(arguments[0])&&!C.get(J).nodeType){I=J;}var L=(I||{});var K={element:null,attributes:L};if(E.isString(J)&&C.get(J)){K.element=C.get(J);}else{if(E.isObject(J)&&C.get(J)&&C.get(J).nodeType){K.element=C.get(J);}}if(!K.element){K.element=document.createElement("DIV");K.element.id=C.generateId();if(L.container&&C.get(L.container)){C.get(L.container).appendChild(K.element);}}if(!K.element.id){K.element.id=((E.isString(J))?J:C.generateId());}var G=document.createElement("fieldset");var H=document.createElement("legend");H.innerHTML="Toolbar";G.appendChild(H);var F=document.createElement("DIV");K.attributes.cont=F;C.addClass(F,"yui-toolbar-subcont");G.appendChild(F);K.element.appendChild(G);K.element.tabIndex=-1;K.attributes.element=K.element;K.attributes.id=K.element.id;YAHOO.widget.Toolbar.superclass.constructor.call(this,K.element,K.attributes);};function D(I,F,J){C.addClass(this.element,"yui-toolbar-"+J.get("value")+"-menu");if(C.hasClass(J._button.parentNode.parentNode,"yui-toolbar-select")){C.addClass(this.element,"yui-toolbar-select-menu");}var G=this.getItems();for(var H=0;H<G.length;H++){C.addClass(G[H].element,"yui-toolbar-"+J.get("value")+"-"+((G[H].value)?G[H].value.replace(/ /g,"-").toLowerCase():G[H]._oText.nodeValue.replace(/ /g,"-").toLowerCase()));C.addClass(G[H].element,"yui-toolbar-"+J.get("value")+"-"+((G[H].value)?G[H].value.replace(/ /g,"-"):G[H]._oText.nodeValue.replace(/ /g,"-")));}}YAHOO.extend(YAHOO.widget.Toolbar,YAHOO.util.Element,{buttonType:YAHOO.widget.ToolbarButton,dd:null,_colorData:{"#111111":"Obsidian","#2D2D2D":"Dark Gray","#434343":"Shale","#5B5B5B":"Flint","#737373":"Gray","#8B8B8B":"Concrete","#A2A2A2":"Gray","#B9B9B9":"Titanium","#000000":"Black","#D0D0D0":"Light Gray","#E6E6E6":"Silver","#FFFFFF":"White","#BFBF00":"Pumpkin","#FFFF00":"Yellow","#FFFF40":"Banana","#FFFF80":"Pale Yellow","#FFFFBF":"Butter","#525330":"Raw Siena","#898A49":"Mildew","#AEA945":"Olive","#7F7F00":"Paprika","#C3BE71":"Earth","#E0DCAA":"Khaki","#FCFAE1":"Cream","#60BF00":"Cactus","#80FF00":"Chartreuse","#A0FF40":"Green","#C0FF80":"Pale Lime","#DFFFBF":"Light Mint","#3B5738":"Green","#668F5A":"Lime Gray","#7F9757":"Yellow","#407F00":"Clover","#8A9B55":"Pistachio","#B7C296":"Light Jade","#E6EBD5":"Breakwater","#00BF00":"Spring Frost","#00FF80":"Pastel Green","#40FFA0":"Light Emerald","#80FFC0":"Sea Foam","#BFFFDF":"Sea Mist","#033D21":"Dark Forrest","#438059":"Moss","#7FA37C":"Medium Green","#007F40":"Pine","#8DAE94":"Yellow Gray Green","#ACC6B5":"Aqua Lung","#DDEBE2":"Sea Vapor","#00BFBF":"Fog","#00FFFF":"Cyan","#40FFFF":"Turquoise Blue","#80FFFF":"Light Aqua","#BFFFFF":"Pale Cyan","#033D3D":"Dark Teal","#347D7E":"Gray Turquoise","#609A9F":"Green Blue","#007F7F":"Seaweed","#96BDC4":"Green Gray","#B5D1D7":"Soapstone","#E2F1F4":"Light Turquoise","#0060BF":"Summer Sky","#0080FF":"Sky Blue","#40A0FF":"Electric Blue","#80C0FF":"Light Azure","#BFDFFF":"Ice Blue","#1B2C48":"Navy","#385376":"Biscay","#57708F":"Dusty Blue","#00407F":"Sea Blue","#7792AC":"Sky Blue Gray","#A8BED1":"Morning Sky","#DEEBF6":"Vapor","#0000BF":"Deep Blue","#0000FF":"Blue","#4040FF":"Cerulean Blue","#8080FF":"Evening Blue","#BFBFFF":"Light Blue","#212143":"Deep Indigo","#373E68":"Sea Blue","#444F75":"Night Blue","#00007F":"Indigo Blue","#585E82":"Dockside","#8687A4":"Blue Gray","#D2D1E1":"Light Blue Gray","#6000BF":"Neon Violet","#8000FF":"Blue Violet","#A040FF":"Violet Purple","#C080FF":"Violet Dusk","#DFBFFF":"Pale Lavender","#302449":"Cool Shale","#54466F":"Dark Indigo","#655A7F":"Dark Violet","#40007F":"Violet","#726284":"Smoky Violet","#9E8FA9":"Slate Gray","#DCD1DF":"Violet White","#BF00BF":"Royal Violet","#FF00FF":"Fuchsia","#FF40FF":"Magenta","#FF80FF":"Orchid","#FFBFFF":"Pale Magenta","#4A234A":"Dark Purple","#794A72":"Medium Purple","#936386":"Cool Granite","#7F007F":"Purple","#9D7292":"Purple Moon","#C0A0B6":"Pale Purple","#ECDAE5":"Pink Cloud","#BF005F":"Hot Pink","#FF007F":"Deep Pink","#FF409F":"Grape","#FF80BF":"Electric Pink","#FFBFDF":"Pink","#451528":"Purple Red","#823857":"Purple Dino","#A94A76":"Purple Gray","#7F003F":"Rose","#BC6F95":"Antique Mauve","#D8A5BB":"Cool Marble","#F7DDE9":"Pink Granite","#C00000":"Apple","#FF0000":"Fire Truck","#FF4040":"Pale Red","#FF8080":"Salmon","#FFC0C0":"Warm Pink","#441415":"Sepia","#82393C":"Rust","#AA4D4E":"Brick","#800000":"Brick Red","#BC6E6E":"Mauve","#D8A3A4":"Shrimp Pink","#F8DDDD":"Shell Pink","#BF5F00":"Dark Orange","#FF7F00":"Orange","#FF9F40":"Grapefruit","#FFBF80":"Canteloupe","#FFDFBF":"Wax","#482C1B":"Dark Brick","#855A40":"Dirt","#B27C51":"Tan","#7F3F00":"Nutmeg","#C49B71":"Mustard","#E1C4A8":"Pale Tan","#FDEEE0":"Marble"},_colorPicker:null,STR_COLLAPSE:"Collapse Toolbar",STR_SPIN_LABEL:"Spin Button with value {VALUE}. Use Control Shift Up Arrow and Control Shift Down arrow keys to increase or decrease the value.",STR_SPIN_UP:"Click to increase the value of this input",STR_SPIN_DOWN:"Click to decrease the value of this input",_titlebar:null,browser:YAHOO.env.ua,_buttonList:null,_buttonGroupList:null,_sep:null,_sepCount:null,_dragHandle:null,_toolbarConfigs:{renderer:true},CLASS_CONTAINER:"yui-toolbar-container",CLASS_DRAGHANDLE:"yui-toolbar-draghandle",CLASS_SEPARATOR:"yui-toolbar-separator",CLASS_DISABLED:"yui-toolbar-disabled",CLASS_PREFIX:"yui-toolbar",init:function(G,F){YAHOO.widget.Toolbar.superclass.init.call(this,G,F);
},initAttributes:function(F){YAHOO.widget.Toolbar.superclass.initAttributes.call(this,F);this.addClass(this.CLASS_CONTAINER);this.setAttributeConfig("buttonType",{value:F.buttonType||"basic",writeOnce:true,validator:function(G){switch(G){case"advanced":case"basic":return true;}return false;},method:function(G){if(G=="advanced"){if(YAHOO.widget.Button){this.buttonType=YAHOO.widget.ToolbarButtonAdvanced;}else{this.buttonType=YAHOO.widget.ToolbarButton;}}else{this.buttonType=YAHOO.widget.ToolbarButton;}}});this.setAttributeConfig("buttons",{value:[],writeOnce:true,method:function(H){for(var G in H){if(E.hasOwnProperty(H,G)){if(H[G].type=="separator"){this.addSeparator();}else{if(H[G].group!==undefined){this.addButtonGroup(H[G]);}else{this.addButton(H[G]);}}}}}});this.setAttributeConfig("disabled",{value:false,method:function(G){if(this.get("disabled")===G){return false;}if(G){this.addClass(this.CLASS_DISABLED);this.set("draggable",false);this.disableAllButtons();}else{this.removeClass(this.CLASS_DISABLED);if(this._configs.draggable._initialConfig.value){this.set("draggable",true);}this.resetAllButtons();}}});this.setAttributeConfig("cont",{value:F.cont,readOnly:true});this.setAttributeConfig("grouplabels",{value:((F.grouplabels===false)?false:true),method:function(G){if(G){C.removeClass(this.get("cont"),(this.CLASS_PREFIX+"-nogrouplabels"));}else{C.addClass(this.get("cont"),(this.CLASS_PREFIX+"-nogrouplabels"));}}});this.setAttributeConfig("titlebar",{value:false,method:function(H){if(H){if(this._titlebar&&this._titlebar.parentNode){this._titlebar.parentNode.removeChild(this._titlebar);}this._titlebar=document.createElement("DIV");this._titlebar.tabIndex="-1";A.on(this._titlebar,"focus",function(){this._handleFocus();},this,true);C.addClass(this._titlebar,this.CLASS_PREFIX+"-titlebar");if(E.isString(H)){var G=document.createElement("h2");G.tabIndex="-1";G.innerHTML='<a href="#" tabIndex="0">'+H+"</a>";this._titlebar.appendChild(G);A.on(G.firstChild,"click",function(I){A.stopEvent(I);});A.on([G,G.firstChild],"focus",function(){this._handleFocus();},this,true);}if(this.get("firstChild")){this.insertBefore(this._titlebar,this.get("firstChild"));}else{this.appendChild(this._titlebar);}if(this.get("collapse")){this.set("collapse",true);}}else{if(this._titlebar){if(this._titlebar&&this._titlebar.parentNode){this._titlebar.parentNode.removeChild(this._titlebar);}}}}});this.setAttributeConfig("collapse",{value:false,method:function(I){if(this._titlebar){var H=null;var G=C.getElementsByClassName("collapse","span",this._titlebar);if(I){if(G.length>0){return true;}H=document.createElement("SPAN");H.innerHTML="X";H.title=this.STR_COLLAPSE;C.addClass(H,"collapse");this._titlebar.appendChild(H);A.addListener(H,"click",function(){if(C.hasClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed")){this.collapse(false);}else{this.collapse();}},this,true);}else{H=C.getElementsByClassName("collapse","span",this._titlebar);if(H[0]){if(C.hasClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed")){this.collapse(false);}H[0].parentNode.removeChild(H[0]);}}}}});this.setAttributeConfig("draggable",{value:(F.draggable||false),method:function(G){if(G&&!this.get("titlebar")){if(!this._dragHandle){this._dragHandle=document.createElement("SPAN");this._dragHandle.innerHTML="|";this._dragHandle.setAttribute("title","Click to drag the toolbar");this._dragHandle.id=this.get("id")+"_draghandle";C.addClass(this._dragHandle,this.CLASS_DRAGHANDLE);if(this.get("cont").hasChildNodes()){this.get("cont").insertBefore(this._dragHandle,this.get("cont").firstChild);}else{this.get("cont").appendChild(this._dragHandle);}this.dd=new YAHOO.util.DD(this.get("id"));this.dd.setHandleElId(this._dragHandle.id);}}else{if(this._dragHandle){this._dragHandle.parentNode.removeChild(this._dragHandle);this._dragHandle=null;this.dd=null;}}if(this._titlebar){if(G){this.dd=new YAHOO.util.DD(this.get("id"));this.dd.setHandleElId(this._titlebar);C.addClass(this._titlebar,"draggable");}else{C.removeClass(this._titlebar,"draggable");if(this.dd){this.dd.unreg();this.dd=null;}}}},validator:function(H){var G=true;if(!YAHOO.util.DD){G=false;}return G;}});},addButtonGroup:function(J){if(!this.get("element")){this._queue[this._queue.length]=["addButtonGroup",arguments];return false;}if(!this.hasClass(this.CLASS_PREFIX+"-grouped")){this.addClass(this.CLASS_PREFIX+"-grouped");}var K=document.createElement("DIV");C.addClass(K,this.CLASS_PREFIX+"-group");C.addClass(K,this.CLASS_PREFIX+"-group-"+J.group);if(J.label){var G=document.createElement("h3");G.innerHTML=J.label;K.appendChild(G);}if(!this.get("grouplabels")){C.addClass(this.get("cont"),this.CLASS_PREFIX,"-nogrouplabels");}this.get("cont").appendChild(K);var I=document.createElement("ul");K.appendChild(I);if(!this._buttonGroupList){this._buttonGroupList={};}this._buttonGroupList[J.group]=I;for(var H=0;H<J.buttons.length;H++){var F=document.createElement("li");F.className=this.CLASS_PREFIX+"-groupitem";I.appendChild(F);if((J.buttons[H].type!==undefined)&&J.buttons[H].type=="separator"){this.addSeparator(F);}else{J.buttons[H].container=F;this.addButton(J.buttons[H]);}}},addButtonToGroup:function(H,I,J){var G=this._buttonGroupList[I];var F=document.createElement("li");F.className=this.CLASS_PREFIX+"-groupitem";H.container=F;this.addButton(H,J);G.appendChild(F);},addButton:function(K,J){if(!this.get("element")){this._queue[this._queue.length]=["addButton",arguments];return false;}if(!this._buttonList){this._buttonList=[];}if(!K.container){K.container=this.get("cont");}if((K.type=="menu")||(K.type=="split")||(K.type=="select")){if(E.isArray(K.menu)){for(var Q in K.menu){if(E.hasOwnProperty(K.menu,Q)){var W={fn:function(Z,X,Y){if(!K.menucmd){K.menucmd=K.value;}K.value=((Y.value)?Y.value:Y._oText.nodeValue);},scope:this};K.menu[Q].onclick=W;}}}}var R={},O=false;for(var M in K){if(E.hasOwnProperty(K,M)){if(!this._toolbarConfigs[M]){R[M]=K[M];}}}if(K.type=="select"){R.type="menu";}if(K.type=="spin"){R.type="push";
}if(R.type=="color"){if(YAHOO.widget.Overlay){R=this._makeColorButton(R);}else{O=true;}}if(R.menu){if((YAHOO.widget.Overlay)&&(K.menu instanceof YAHOO.widget.Overlay)){K.menu.showEvent.subscribe(function(){this._button=R;});}else{for(var P=0;P<R.menu.length;P++){if(!R.menu[P].value){R.menu[P].value=R.menu[P].text;}}if(this.browser.webkit){R.focusmenu=false;}}}if(O){K=false;}else{this._configs.buttons.value[this._configs.buttons.value.length]=K;var U=new this.buttonType(R);U.get("element").tabIndex="-1";U.get("element").setAttribute("role","button");U._selected=true;if(!U.buttonType){U.buttonType="rich";U.checkValue=function(Z){var Y=this.getMenu().getItems();if(Y.length===0){this.getMenu()._onBeforeShow();Y=this.getMenu().getItems();}for(var X=0;X<Y.length;X++){Y[X].cfg.setProperty("checked",false);if(Y[X].value==Z){Y[X].cfg.setProperty("checked",true);}}};}if(this.get("disabled")){U.set("disabled",true);}if(!K.id){K.id=U.get("id");}if(J){var G=U.get("element");var N=null;if(J.get){N=J.get("element").nextSibling;}else{if(J.nextSibling){N=J.nextSibling;}}if(N){N.parentNode.insertBefore(G,N);}}U.addClass(this.CLASS_PREFIX+"-"+U.get("value"));var T=document.createElement("span");T.className=this.CLASS_PREFIX+"-icon";U.get("element").insertBefore(T,U.get("firstChild"));if(U._button.tagName.toLowerCase()=="button"){U.get("element").setAttribute("unselectable","on");var V=document.createElement("a");V.innerHTML=U._button.innerHTML;V.href="#";V.tabIndex="-1";A.on(V,"click",function(X){A.stopEvent(X);});U._button.parentNode.replaceChild(V,U._button);U._button=V;}if(K.type=="select"){if(U._button.tagName.toLowerCase()=="select"){T.parentNode.removeChild(T);var H=U._button;var S=U.get("element");S.parentNode.replaceChild(H,S);}else{U.addClass(this.CLASS_PREFIX+"-select");}}if(K.type=="spin"){if(!E.isArray(K.range)){K.range=[10,100];}this._makeSpinButton(U,K);}U.get("element").setAttribute("title",U.get("label"));if(K.type!="spin"){if((YAHOO.widget.Overlay)&&(R.menu instanceof YAHOO.widget.Overlay)){var I=function(Z){var X=true;if(Z.keyCode&&(Z.keyCode==9)){X=false;}if(X){if(this._colorPicker){this._colorPicker._button=K.value;}var Y=U.getMenu().element;if(C.getStyle(Y,"visibility")=="hidden"){U.getMenu().show();}else{U.getMenu().hide();}}YAHOO.util.Event.stopEvent(Z);};U.on("mousedown",I,K,this);U.on("keydown",I,K,this);}else{if((K.type!="menu")&&(K.type!="select")){U.on("keypress",this._buttonClick,K,this);U.on("mousedown",function(X){YAHOO.util.Event.stopEvent(X);this._buttonClick(X,K);},K,this);U.on("click",function(X){});}else{U.on("mousedown",function(X){YAHOO.util.Event.stopEvent(X);});U.on("click",function(X){YAHOO.util.Event.stopEvent(X);});U.on("change",function(X){if(!K.menucmd){K.menucmd=K.value;}K.value=X.value;this._buttonClick(X,K);},this,true);var L=this;if(U.getMenu().mouseDownEvent){U.getMenu().mouseDownEvent.subscribe(function(Z,Y){var X=Y[1];YAHOO.util.Event.stopEvent(Y[0]);U._onMenuClick(Y[0],U);if(!K.menucmd){K.menucmd=K.value;}K.value=((X.value)?X.value:X._oText.nodeValue);L._buttonClick.call(L,Y[1],K);U._hideMenu();return false;});U.getMenu().clickEvent.subscribe(function(Y,X){YAHOO.util.Event.stopEvent(X[0]);});U.getMenu().mouseUpEvent.subscribe(function(Y,X){YAHOO.util.Event.stopEvent(X[0]);});}}}}else{U.on("mousedown",function(X){YAHOO.util.Event.stopEvent(X);});U.on("click",function(X){YAHOO.util.Event.stopEvent(X);});}if(this.browser.ie){}if(this.browser.webkit){U.hasFocus=function(){return true;};}this._buttonList[this._buttonList.length]=U;if((K.type=="menu")||(K.type=="split")||(K.type=="select")){if(E.isArray(K.menu)){var F=U.getMenu();if(F.renderEvent){F.renderEvent.subscribe(D,U);if(K.renderer){F.renderEvent.subscribe(K.renderer,U);}}}}}return K;},addSeparator:function(F,I){if(!this.get("element")){this._queue[this._queue.length]=["addSeparator",arguments];return false;}var G=((F)?F:this.get("cont"));if(!this.get("element")){this._queue[this._queue.length]=["addSeparator",arguments];return false;}if(this._sepCount===null){this._sepCount=0;}if(!this._sep){this._sep=document.createElement("SPAN");C.addClass(this._sep,this.CLASS_SEPARATOR);this._sep.innerHTML="|";}var H=this._sep.cloneNode(true);this._sepCount++;C.addClass(H,this.CLASS_SEPARATOR+"-"+this._sepCount);if(I){var J=null;if(I.get){J=I.get("element").nextSibling;}else{if(I.nextSibling){J=I.nextSibling;}else{J=I;}}if(J){if(J==I){J.parentNode.appendChild(H);}else{J.parentNode.insertBefore(H,J);}}}else{G.appendChild(H);}return H;},_createColorPicker:function(I){if(C.get(I+"_colors")){C.get(I+"_colors").parentNode.removeChild(C.get(I+"_colors"));}var F=document.createElement("div");F.className="yui-toolbar-colors";F.id=I+"_colors";F.style.display="none";A.on(window,"load",function(){document.body.appendChild(F);},this,true);this._colorPicker=F;var H="";for(var G in this._colorData){if(E.hasOwnProperty(this._colorData,G)){H+='<a style="background-color: '+G+'" href="#">'+G.replace("#","")+"</a>";}}H+="<span><em>X</em><strong></strong></span>";window.setTimeout(function(){F.innerHTML=H;},0);A.on(F,"mouseover",function(N){var L=this._colorPicker;var M=L.getElementsByTagName("em")[0];var K=L.getElementsByTagName("strong")[0];var J=A.getTarget(N);if(J.tagName.toLowerCase()=="a"){M.style.backgroundColor=J.style.backgroundColor;K.innerHTML=this._colorData["#"+J.innerHTML]+"<br>"+J.innerHTML;}},this,true);A.on(F,"focus",function(J){A.stopEvent(J);});A.on(F,"click",function(J){A.stopEvent(J);});A.on(F,"mousedown",function(K){A.stopEvent(K);var J=A.getTarget(K);if(J.tagName.toLowerCase()=="a"){var M=this.fireEvent("colorPickerClicked",{type:"colorPickerClicked",target:this,button:this._colorPicker._button,color:J.innerHTML,colorName:this._colorData["#"+J.innerHTML]});if(M!==false){var L={color:J.innerHTML,colorName:this._colorData["#"+J.innerHTML],value:this._colorPicker._button};this.fireEvent("buttonClick",{type:"buttonClick",target:this.get("element"),button:L});}this.getButtonByValue(this._colorPicker._button).getMenu().hide();
}},this,true);},_resetColorPicker:function(){var G=this._colorPicker.getElementsByTagName("em")[0];var F=this._colorPicker.getElementsByTagName("strong")[0];G.style.backgroundColor="transparent";F.innerHTML="";},_makeColorButton:function(F){if(!this._colorPicker){this._createColorPicker(this.get("id"));}F.type="color";F.menu=new YAHOO.widget.Overlay(this.get("id")+"_"+F.value+"_menu",{visible:false,position:"absolute",iframe:true});F.menu.setBody("");F.menu.render(this.get("cont"));C.addClass(F.menu.element,"yui-button-menu");C.addClass(F.menu.element,"yui-color-button-menu");F.menu.beforeShowEvent.subscribe(function(){F.menu.cfg.setProperty("zindex",5);F.menu.cfg.setProperty("context",[this.getButtonById(F.id).get("element"),"tl","bl"]);this._resetColorPicker();var G=this._colorPicker;if(G.parentNode){G.parentNode.removeChild(G);}F.menu.setBody("");F.menu.appendToBody(G);this._colorPicker.style.display="block";},this,true);return F;},_makeSpinButton:function(S,M){S.addClass(this.CLASS_PREFIX+"-spinbutton");var T=this,O=S._button.parentNode.parentNode,J=M.range,I=document.createElement("a"),H=document.createElement("a");I.href="#";H.href="#";I.tabIndex="-1";H.tabIndex="-1";I.className="up";I.title=this.STR_SPIN_UP;I.innerHTML=this.STR_SPIN_UP;H.className="down";H.title=this.STR_SPIN_DOWN;H.innerHTML=this.STR_SPIN_DOWN;O.appendChild(I);O.appendChild(H);var N=YAHOO.lang.substitute(this.STR_SPIN_LABEL,{VALUE:S.get("label")});S.set("title",N);var R=function(U){U=((U<J[0])?J[0]:U);U=((U>J[1])?J[1]:U);return U;};var Q=this.browser;var G=false;var L=this.STR_SPIN_LABEL;if(this._titlebar&&this._titlebar.firstChild){G=this._titlebar.firstChild;}var F=function(V){YAHOO.util.Event.stopEvent(V);if(!S.get("disabled")&&(V.keyCode!=9)){var W=parseInt(S.get("label"),10);W++;W=R(W);S.set("label",""+W);var U=YAHOO.lang.substitute(L,{VALUE:S.get("label")});S.set("title",U);if(!Q.webkit&&G){}T._buttonClick(V,M);}};var P=function(V){YAHOO.util.Event.stopEvent(V);if(!S.get("disabled")&&(V.keyCode!=9)){var W=parseInt(S.get("label"),10);W--;W=R(W);S.set("label",""+W);var U=YAHOO.lang.substitute(L,{VALUE:S.get("label")});S.set("title",U);if(!Q.webkit&&G){}T._buttonClick(V,M);}};var K=function(U){if(U.keyCode==38){F(U);}else{if(U.keyCode==40){P(U);}else{if(U.keyCode==107&&U.shiftKey){F(U);}else{if(U.keyCode==109&&U.shiftKey){P(U);}}}}};S.on("keydown",K,this,true);A.on(I,"mousedown",function(U){A.stopEvent(U);},this,true);A.on(H,"mousedown",function(U){A.stopEvent(U);},this,true);A.on(I,"click",F,this,true);A.on(H,"click",P,this,true);},_buttonClick:function(M,G){var F=true;if(M&&M.type=="keypress"){if(M.keyCode==9){F=false;}else{if((M.keyCode===13)||(M.keyCode===0)||(M.keyCode===32)){}else{F=false;}}}if(F){var O=true,I=false;if(G.value){I=this.fireEvent(G.value+"Click",{type:G.value+"Click",target:this.get("element"),button:G});if(I===false){O=false;}}if(G.menucmd&&O){I=this.fireEvent(G.menucmd+"Click",{type:G.menucmd+"Click",target:this.get("element"),button:G});if(I===false){O=false;}}if(O){this.fireEvent("buttonClick",{type:"buttonClick",target:this.get("element"),button:G});}if(G.type=="select"){var L=this.getButtonById(G.id);if(L.buttonType=="rich"){var K=G.value;for(var J=0;J<G.menu.length;J++){if(G.menu[J].value==G.value){K=G.menu[J].text;break;}}L.set("label",'<span class="yui-toolbar-'+G.menucmd+"-"+(G.value).replace(/ /g,"-").toLowerCase()+'">'+K+"</span>");var N=L.getMenu().getItems();for(var H=0;H<N.length;H++){if(N[H].value.toLowerCase()==G.value.toLowerCase()){N[H].cfg.setProperty("checked",true);}else{N[H].cfg.setProperty("checked",false);}}}}if(M){A.stopEvent(M);}}},_keyNav:null,_navCounter:null,_navigateButtons:function(G){switch(G.keyCode){case 37:case 39:if(G.keyCode==37){this._navCounter--;}else{this._navCounter++;}if(this._navCounter>(this._buttonList.length-1)){this._navCounter=0;}if(this._navCounter<0){this._navCounter=(this._buttonList.length-1);}var F=this._buttonList[this._navCounter].get("element");if(this.browser.ie){F=this._buttonList[this._navCounter].get("element").getElementsByTagName("a")[0];}if(this._buttonList[this._navCounter].get("disabled")){this._navigateButtons(G);}else{F.focus();}break;}},_handleFocus:function(){if(!this._keyNav){var F="keypress";if(this.browser.ie){F="keydown";}A.on(this.get("element"),F,this._navigateButtons,this,true);this._keyNav=true;this._navCounter=-1;}},getButtonById:function(H){var F=this._buttonList.length;for(var G=0;G<F;G++){if(this._buttonList[G].get("id")==H){return this._buttonList[G];}}return false;},getButtonByValue:function(L){var I=this.get("buttons");var G=I.length;for(var J=0;J<G;J++){if(I[J].group!==undefined){for(var F=0;F<I[J].buttons.length;F++){if((I[J].buttons[F].value==L)||(I[J].buttons[F].menucmd==L)){return this.getButtonById(I[J].buttons[F].id);}if(I[J].buttons[F].menu){for(var K=0;K<I[J].buttons[F].menu.length;K++){if(I[J].buttons[F].menu[K].value==L){return this.getButtonById(I[J].buttons[F].id);}}}}}else{if((I[J].value==L)||(I[J].menucmd==L)){return this.getButtonById(I[J].id);}if(I[J].menu){for(var H=0;H<I[J].menu.length;H++){if(I[J].menu[H].value==L){return this.getButtonById(I[J].id);}}}}}return false;},getButtonByIndex:function(F){if(this._buttonList[F]){return this._buttonList[F];}else{return false;}},getButtons:function(){return this._buttonList;},disableButton:function(G){var F=B.call(this,G);if(F){F.set("disabled",true);}else{return false;}},enableButton:function(G){if(this.get("disabled")){return false;}var F=B.call(this,G);if(F){if(F.get("disabled")){F.set("disabled",false);}}else{return false;}},isSelected:function(G){var F=B.call(this,G);if(F){return F._selected;}return false;},selectButton:function(J,H){var G=B.call(this,J);if(G){G.addClass("yui-button-selected");G.addClass("yui-button-"+G.get("value")+"-selected");G._selected=true;if(H){if(G.buttonType=="rich"){var I=G.getMenu().getItems();for(var F=0;F<I.length;F++){if(I[F].value==H){I[F].cfg.setProperty("checked",true);G.set("label",'<span class="yui-toolbar-'+G.get("value")+"-"+(H).replace(/ /g,"-").toLowerCase()+'">'+I[F]._oText.nodeValue+"</span>");
}else{I[F].cfg.setProperty("checked",false);}}}}}else{return false;}},deselectButton:function(G){var F=B.call(this,G);if(F){F.removeClass("yui-button-selected");F.removeClass("yui-button-"+F.get("value")+"-selected");F.removeClass("yui-button-hover");F._selected=false;}else{return false;}},deselectAllButtons:function(){var F=this._buttonList.length;for(var G=0;G<F;G++){this.deselectButton(this._buttonList[G]);}},disableAllButtons:function(){if(this.get("disabled")){return false;}var F=this._buttonList.length;for(var G=0;G<F;G++){this.disableButton(this._buttonList[G]);}},enableAllButtons:function(){if(this.get("disabled")){return false;}var F=this._buttonList.length;for(var G=0;G<F;G++){this.enableButton(this._buttonList[G]);}},resetAllButtons:function(J){if(!E.isObject(J)){J={};}if(this.get("disabled")){return false;}var F=this._buttonList.length;for(var G=0;G<F;G++){var I=this._buttonList[G];var H=I._configs.disabled._initialConfig.value;if(J[I.get("id")]){this.enableButton(I);this.selectButton(I);}else{if(H){this.disableButton(I);}else{this.enableButton(I);}this.deselectButton(I);}}},destroyButton:function(J){var H=B.call(this,J);if(H){var I=H.get("id");H.destroy();var F=this._buttonList.length;for(var G=0;G<F;G++){if(this._buttonList[G].get("id")==I){this._buttonList[G]=null;}}}else{return false;}},destroy:function(){this.get("element").innerHTML="";this.get("element").className="";for(var F in this){if(E.hasOwnProperty(this,F)){this[F]=null;}}return true;},collapse:function(G){var F=C.getElementsByClassName("collapse","span",this._titlebar);if(G===false){C.removeClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed");if(F[0]){C.removeClass(F[0],"collapsed");}this.fireEvent("toolbarExpanded",{type:"toolbarExpanded",target:this});}else{if(F[0]){C.addClass(F[0],"collapsed");}C.addClass(this.get("cont").parentNode,"yui-toolbar-container-collapsed");this.fireEvent("toolbarCollapsed",{type:"toolbarCollapsed",target:this});}},toString:function(){return"Toolbar (#"+this.get("element").id+") with "+this._buttonList.length+" buttons.";}});})();(function(){var C=YAHOO.util.Dom,A=YAHOO.util.Event,D=YAHOO.lang,B=YAHOO.widget.Toolbar;YAHOO.widget.SimpleEditor=function(I,N){var H={};if(D.isObject(I)&&(!I.tagName)&&!N){D.augmentObject(H,I);I=document.createElement("textarea");this.DOMReady=true;if(H.container){var L=C.get(H.container);L.appendChild(I);}else{document.body.appendChild(I);}}else{D.augmentObject(H,N);}var J={element:null,attributes:H},G=null;if(D.isString(I)){G=I;}else{if(J.attributes.id){G=J.attributes.id;}else{G=C.generateId(I);}}J.element=I;var K=document.createElement("DIV");J.attributes.element_cont=new YAHOO.util.Element(K,{id:G+"_container"});var F=document.createElement("div");C.addClass(F,"first-child");J.attributes.element_cont.appendChild(F);if(!J.attributes.toolbar_cont){J.attributes.toolbar_cont=document.createElement("DIV");J.attributes.toolbar_cont.id=G+"_toolbar";F.appendChild(J.attributes.toolbar_cont);}var M=document.createElement("DIV");F.appendChild(M);J.attributes.editor_wrapper=M;YAHOO.widget.SimpleEditor.superclass.constructor.call(this,J.element,J.attributes);};function E(F){return F.replace(/ /g,"-").toLowerCase();}YAHOO.extend(YAHOO.widget.SimpleEditor,YAHOO.util.Element,{_docType:'<!DOCTYPE HTML PUBLIC "-/'+"/W3C/"+"/DTD HTML 4.01/"+'/EN" "http:/'+'/www.w3.org/TR/html4/strict.dtd">',editorDirty:null,_defaultCSS:"html { height: 95%; } body { padding: 7px; background-color: #fff; font:13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a { color: blue; text-decoration: underline; cursor: text; } .warning-localfile { border-bottom: 1px dashed red !important; } .yui-busy { cursor: wait !important; } img.selected { border: 2px dotted #808080; } img { cursor: pointer !important; border: none; }",_defaultToolbar:null,_lastButton:null,_baseHREF:function(){var F=document.location.href;if(F.indexOf("?")!==-1){F=F.substring(0,F.indexOf("?"));}F=F.substring(0,F.lastIndexOf("/"))+"/";return F;}(),_lastImage:null,_blankImageLoaded:null,_fixNodesTimer:null,_nodeChangeTimer:null,_lastNodeChangeEvent:null,_lastNodeChange:0,_rendered:null,DOMReady:null,_selection:null,_mask:null,_showingHiddenElements:null,currentWindow:null,currentEvent:null,operaEvent:null,currentFont:null,currentElement:null,dompath:null,beforeElement:null,afterElement:null,invalidHTML:{form:true,input:true,button:true,select:true,link:true,html:true,body:true,iframe:true,script:true,style:true,textarea:true},toolbar:null,_contentTimer:null,_contentTimerCounter:0,_disabled:["createlink","fontname","fontsize","forecolor","backcolor"],_alwaysDisabled:{},_alwaysEnabled:{},_semantic:{"bold":true,"italic":true,"underline":true},_tag2cmd:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},_createIframe:function(){var J=document.createElement("iframe");J.id=this.get("id")+"_editor";var H={border:"0",frameBorder:"0",marginWidth:"0",marginHeight:"0",leftMargin:"0",topMargin:"0",allowTransparency:"true",width:"100%"};if(this.get("autoHeight")){H.scrolling="no";}for(var I in H){if(D.hasOwnProperty(H,I)){J.setAttribute(I,H[I]);}}var G="javascript:;";if(this.browser.ie){G="about:blank";}J.setAttribute("src",G);var F=new YAHOO.util.Element(J);return F;},_isElement:function(G,F){if(G&&G.tagName&&(G.tagName.toLowerCase()==F)){return true;}if(G&&G.getAttribute&&(G.getAttribute("tag")==F)){return true;}return false;},_hasParent:function(G,F){if(!G||!G.parentNode){return false;}while(G.parentNode){if(this._isElement(G,F)){return G;}if(G.parentNode){G=G.parentNode;}else{return false;}}return false;},_getDoc:function(){var F=false;if(this.get){if(this.get("iframe")){if(this.get("iframe").get){if(this.get("iframe").get("element")){try{if(this.get("iframe").get("element").contentWindow){if(this.get("iframe").get("element").contentWindow.document){F=this.get("iframe").get("element").contentWindow.document;
return F;}}}catch(G){}}}}}return false;},_getWindow:function(){return this.get("iframe").get("element").contentWindow;},_focusWindow:function(F){if(this.browser.webkit){if(F){this._getSelection().setBaseAndExtent(this._getDoc().body.firstChild,0,this._getDoc().body.firstChild,1);if(this.browser.webkit3){this._getSelection().collapseToStart();}else{this._getSelection().collapse(false);}}else{this._getSelection().setBaseAndExtent(this._getDoc().body,1,this._getDoc().body,1);if(this.browser.webkit3){this._getSelection().collapseToStart();}else{this._getSelection().collapse(false);}}this._getWindow().focus();}else{this._getWindow().focus();}},_hasSelection:function(){var H=this._getSelection();var F=this._getRange();var G=false;if(!H||!F){return G;}if(this.browser.ie||this.browser.opera){if(F.text){G=true;}if(F.html){G=true;}}else{if(this.browser.webkit){if(H+""!==""){G=true;}}else{if(H&&(H.toString()!=="")&&(H!==undefined)){G=true;}}}return G;},_getSelection:function(){var F=null;if(this._getDoc()&&this._getWindow()){if(this._getDoc().selection){F=this._getDoc().selection;}else{F=this._getWindow().getSelection();}if(this.browser.webkit){if(F.baseNode){this._selection={};this._selection.baseNode=F.baseNode;this._selection.baseOffset=F.baseOffset;this._selection.extentNode=F.extentNode;this._selection.extentOffset=F.extentOffset;}else{if(this._selection!==null){F=this._getWindow().getSelection();F.setBaseAndExtent(this._selection.baseNode,this._selection.baseOffset,this._selection.extentNode,this._selection.extentOffset);this._selection=null;}}}}return F;},_selectNode:function(G){if(!G){return false;}var H=this._getSelection(),F=null;if(this.browser.ie){try{F=this._getDoc().body.createTextRange();F.moveToElementText(G);F.select();}catch(I){}}else{if(this.browser.webkit){H.setBaseAndExtent(G,0,G,G.innerText.length);}else{if(this.browser.opera){H=this._getWindow().getSelection();F=this._getDoc().createRange();F.selectNode(G);H.removeAllRanges();H.addRange(F);}else{F=this._getDoc().createRange();F.selectNodeContents(G);H.removeAllRanges();H.addRange(F);}}}},_getRange:function(){var F=this._getSelection();if(F===null){return null;}if(this.browser.webkit&&!F.getRangeAt){var H=this._getDoc().createRange();try{H.setStart(F.anchorNode,F.anchorOffset);H.setEnd(F.focusNode,F.focusOffset);}catch(G){H=this._getWindow().getSelection()+"";}return H;}if(this.browser.ie||this.browser.opera){try{return F.createRange();}catch(G){return null;}}if(F.rangeCount>0){return F.getRangeAt(0);}return null;},_setDesignMode:function(F){try{var H=true;if(this.browser.ie&&(F.toLowerCase()=="off")){H=false;}if(H){this._getDoc().designMode=F;}}catch(G){}},_toggleDesignMode:function(){var G=this._getDoc().designMode.toLowerCase(),F="on";if(G=="on"){F="off";}this._setDesignMode(F);return F;},_initEditor:function(){if(this.browser.ie){this._getDoc().body.style.margin="0";}if(!this.get("disabled")){if(this._getDoc().designMode.toLowerCase()!="on"){this._setDesignMode("on");this._contentTimerCounter=0;}}if(!this._getDoc().body){this._contentTimerCounter=0;this._checkLoaded();return false;}this.toolbar.on("buttonClick",this._handleToolbarClick,this,true);A.on(this._getDoc(),"mouseup",this._handleMouseUp,this,true);A.on(this._getDoc(),"mousedown",this._handleMouseDown,this,true);A.on(this._getDoc(),"click",this._handleClick,this,true);A.on(this._getDoc(),"dblclick",this._handleDoubleClick,this,true);A.on(this._getDoc(),"keypress",this._handleKeyPress,this,true);A.on(this._getDoc(),"keyup",this._handleKeyUp,this,true);A.on(this._getDoc(),"keydown",this._handleKeyDown,this,true);if(!this.get("disabled")){this.toolbar.set("disabled",false);}this.fireEvent("editorContentLoaded",{type:"editorLoaded",target:this});if(this.get("dompath")){var F=this;setTimeout(function(){F._writeDomPath.call(F);},150);}this.nodeChange(true);this._setBusy(true);},_checkLoaded:function(){this._contentTimerCounter++;if(this._contentTimer){clearTimeout(this._contentTimer);}if(this._contentTimerCounter>500){return false;}var H=false;try{if(this._getDoc()&&this._getDoc().body){if(this.browser.ie){if(this._getDoc().body.readyState=="complete"){H=true;}}else{if(this._getDoc().body._rteLoaded===true){H=true;}}}}catch(G){H=false;}if(H===true){this._initEditor();}else{var F=this;this._contentTimer=setTimeout(function(){F._checkLoaded.call(F);},20);}},_setInitialContent:function(){var G=D.substitute(this.get("html"),{TITLE:this.STR_TITLE,CONTENT:this._cleanIncomingHTML(this.get("element").value),CSS:this.get("css"),HIDDEN_CSS:((this.get("hiddencss"))?this.get("hiddencss"):"/* No Hidden CSS */"),EXTRA_CSS:((this.get("extracss"))?this.get("extracss"):"/* No Extra CSS */")}),F=true;if(document.compatMode!="BackCompat"){G=this._docType+"\n"+G;}else{}if(this.browser.ie||this.browser.webkit||this.browser.opera||(navigator.userAgent.indexOf("Firefox/1.5")!=-1)){try{if(this.browser.air){var J=this._getDoc().implementation.createHTMLDocument();var K=this._getDoc();K.open();K.close();J.open();J.write(G);J.close();var H=K.importNode(J.getElementsByTagName("html")[0],true);K.replaceChild(H,K.getElementsByTagName("html")[0]);K.body._rteLoaded=true;}else{this._getDoc().open();this._getDoc().write(G);this._getDoc().close();}}catch(I){F=false;}}else{this.get("iframe").get("element").src="data:text/html;charset=utf-8,"+encodeURIComponent(G);}if(F){this._checkLoaded();}},_setMarkupType:function(F){switch(this.get("markup")){case"css":this._setEditorStyle(true);break;case"default":this._setEditorStyle(false);break;case"semantic":case"xhtml":if(this._semantic[F]){this._setEditorStyle(false);}else{this._setEditorStyle(true);}break;}},_setEditorStyle:function(G){try{this._getDoc().execCommand("useCSS",false,!G);}catch(F){}},_getSelectedElement:function(){var I=this._getDoc(),F=null,G=null,J=null;if(this.browser.ie){this.currentEvent=this._getWindow().event;F=this._getRange();if(F){J=F.item?F.item(0):F.parentElement();if(J==I.body){J=null;}}if((this.currentEvent!==null)&&(this.currentEvent.keyCode===0)){J=A.getTarget(this.currentEvent);
}}else{G=this._getSelection();F=this._getRange();if(!G||!F){return null;}if(!this._hasSelection()){if(G.anchorNode&&(G.anchorNode.nodeType==3)){if(G.anchorNode.parentNode){J=G.anchorNode.parentNode;}if(G.anchorNode.nextSibling!=G.focusNode.nextSibling){J=G.anchorNode.nextSibling;}}if(this._isElement(J,"br")){J=null;}if(!J){J=F.commonAncestorContainer;if(!F.collapsed){if(F.startContainer==F.endContainer){if(F.startOffset-F.endOffset<2){if(F.startContainer.hasChildNodes()){J=F.startContainer.childNodes[F.startOffset];}}}}}}}if(this.currentEvent!==null){try{switch(this.currentEvent.type){case"click":case"mousedown":case"mouseup":J=A.getTarget(this.currentEvent);break;default:break;}}catch(H){}}else{if((this.currentElement&&this.currentElement[0])&&(!this.browser.ie)){J=this.currentElement[0];}}if(this.browser.opera||this.browser.webkit){if(this.currentEvent&&!J){J=YAHOO.util.Event.getTarget(this.currentEvent);}}if(!J||!J.tagName){J=I.body;}if(this._isElement(J,"html")){J=I.body;}if(this._isElement(J,"body")){J=I.body;}if(J&&!J.parentNode){J=I.body;}if(J===undefined){J=null;}return J;},_getDomPath:function(F){if(!F){F=this._getSelectedElement();}var G=[];while(F!==null){if(F.ownerDocument!=this._getDoc()){F=null;break;}if(F.nodeName&&F.nodeType&&(F.nodeType==1)){G[G.length]=F;}if(this._isElement(F,"body")){break;}F=F.parentNode;}if(G.length===0){if(this._getDoc()&&this._getDoc().body){G[0]=this._getDoc().body;}}return G.reverse();},_writeDomPath:function(){var L=this._getDomPath(),J=[],H="",M="";for(var F=0;F<L.length;F++){var N=L[F].tagName.toLowerCase();if((N=="ol")&&(L[F].type)){N+=":"+L[F].type;}if(C.hasClass(L[F],"yui-tag")){N=L[F].getAttribute("tag");}if((this.get("markup")=="semantic")||(this.get("markup")=="xhtml")){switch(N){case"b":N="strong";break;case"i":N="em";break;}}if(!C.hasClass(L[F],"yui-non")){if(C.hasClass(L[F],"yui-tag")){M=N;}else{H=((L[F].className!=="")?"."+L[F].className.replace(/ /g,"."):"");if((H.indexOf("yui")!=-1)||(H.toLowerCase().indexOf("apple-style-span")!=-1)){H="";}M=N+((L[F].id)?"#"+L[F].id:"")+H;}switch(N){case"a":if(L[F].getAttribute("href",2)){M+=":"+L[F].getAttribute("href",2).replace("mailto:","").replace("http:/"+"/","").replace("https:/"+"/","");}break;case"img":var G=L[F].height;var K=L[F].width;if(L[F].style.height){G=parseInt(L[F].style.height,10);}if(L[F].style.width){K=parseInt(L[F].style.width,10);}M+="("+G+"x"+K+")";break;}if(M.length>10){M='<span title="'+M+'">'+M.substring(0,10)+"..."+"</span>";}else{M='<span title="'+M+'">'+M+"</span>";}J[J.length]=M;}}var I=J.join(" "+this.SEP_DOMPATH+" ");if(this.dompath.innerHTML!=I){this.dompath.innerHTML=I;}},_fixNodes:function(){var K=this._getDoc(),I=[];for(var F in this.invalidHTML){if(YAHOO.lang.hasOwnProperty(this.invalidHTML,F)){if(F.toLowerCase()!="span"){var G=K.body.getElementsByTagName(F);if(G.length){for(var H=0;H<G.length;H++){I.push(G[H]);}}}}}for(var J=0;J<I.length;J++){if(I[J].parentNode){if(D.isObject(this.invalidHTML[I[J].tagName.toLowerCase()])&&this.invalidHTML[I[J].tagName.toLowerCase()].keepContents){this._swapEl(I[J],"span",function(M){M.className="yui-non";});}else{I[J].parentNode.removeChild(I[J]);}}}var L=this._getDoc().getElementsByTagName("img");C.addClass(L,"yui-img");},_isNonEditable:function(H){if(this.get("allowNoEdit")){var G=A.getTarget(H);if(this._isElement(G,"html")){G=null;}var J=this._getDomPath(G);for(var F=(J.length-1);F>-1;F--){if(C.hasClass(J[F],this.CLASS_NOEDIT)){try{this._getDoc().execCommand("enableObjectResizing",false,"false");}catch(I){}this.nodeChange();A.stopEvent(H);return true;}}try{this._getDoc().execCommand("enableObjectResizing",false,"true");}catch(I){}}return false;},_setCurrentEvent:function(F){this.currentEvent=F;},_handleClick:function(G){if(this._isNonEditable(G)){return false;}this._setCurrentEvent(G);if(this.currentWindow){this.closeWindow();}if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}if(this.browser.webkit){var F=A.getTarget(G);if(this._isElement(F,"a")||this._isElement(F.parentNode,"a")){A.stopEvent(G);this.nodeChange();}}else{this.nodeChange();}},_handleMouseUp:function(G){if(this._isNonEditable(G)){return false;}var F=this;if(this.browser.opera){var H=A.getTarget(G);if(this._isElement(H,"img")){this.nodeChange();if(this.operaEvent){clearTimeout(this.operaEvent);this.operaEvent=null;this._handleDoubleClick(G);}else{this.operaEvent=window.setTimeout(function(){F.operaEvent=false;},700);}}}if(this.browser.webkit||this.browser.opera){if(this.browser.webkit){A.stopEvent(G);}}this.nodeChange();this.fireEvent("editorMouseUp",{type:"editorMouseUp",target:this,ev:G});},_handleMouseDown:function(F){if(this._isNonEditable(F)){return false;}this._setCurrentEvent(F);var G=A.getTarget(F);if(this.browser.webkit&&this._hasSelection()){var H=this._getSelection();if(!this.browser.webkit3){H.collapse(true);}else{H.collapseToStart();}}if(this.browser.webkit&&this._lastImage){C.removeClass(this._lastImage,"selected");this._lastImage=null;}if(this._isElement(G,"img")||this._isElement(G,"a")){if(this.browser.webkit){A.stopEvent(F);if(this._isElement(G,"img")){C.addClass(G,"selected");this._lastImage=G;}}this.nodeChange();}this.fireEvent("editorMouseDown",{type:"editorMouseDown",target:this,ev:F});},_handleDoubleClick:function(F){if(this._isNonEditable(F)){return false;}this._setCurrentEvent(F);var G=A.getTarget(F);if(this._isElement(G,"img")){this.currentElement[0]=G;this.toolbar.fireEvent("insertimageClick",{type:"insertimageClick",target:this.toolbar});this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});}else{if(this._hasParent(G,"a")){this.currentElement[0]=this._hasParent(G,"a");this.toolbar.fireEvent("createlinkClick",{type:"createlinkClick",target:this.toolbar});this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});}}this.nodeChange();this.editorDirty=false;this.fireEvent("editorDoubleClick",{type:"editorDoubleClick",target:this,ev:F});
},_handleKeyUp:function(G){if(this._isNonEditable(G)){return false;}this._setCurrentEvent(G);switch(G.keyCode){case 37:case 38:case 39:case 40:case 46:case 8:case 87:if((G.keyCode==87)&&this.currentWindow&&G.shiftKey&&G.ctrlKey){this.closeWindow();}else{if(!this.browser.ie){if(this._nodeChangeTimer){clearTimeout(this._nodeChangeTimer);}var F=this;this._nodeChangeTimer=setTimeout(function(){F._nodeChangeTimer=null;F.nodeChange.call(F);},100);}else{this.nodeChange();}this.editorDirty=true;}break;}this.fireEvent("editorKeyUp",{type:"editorKeyUp",target:this,ev:G});},_handleKeyPress:function(F){if(this.get("allowNoEdit")){if(F&&F.keyCode&&((F.keyCode==46)||F.keyCode==63272)){A.stopEvent(F);}}if(this._isNonEditable(F)){return false;}this._setCurrentEvent(F);if(this.browser.webkit){if(!this.browser.webkit3){if(F.keyCode&&(F.keyCode==122)&&(F.metaKey)){if(this._hasParent(this._getSelectedElement(),"li")){A.stopEvent(F);}}}this._listFix(F);}this.fireEvent("editorKeyPress",{type:"editorKeyPress",target:this,ev:F});},_listFix:function(L){var O=null,J=null,F=false,H=null;if(this.browser.webkit){if(L.keyCode&&(L.keyCode==13)){if(this._hasParent(this._getSelectedElement(),"li")){var I=this._hasParent(this._getSelectedElement(),"li");var N=this._getDoc().createElement("li");N.innerHTML='<span class="yui-non">&nbsp;</span>&nbsp;';if(I.nextSibling){I.parentNode.insertBefore(N,I.nextSibling);}else{I.parentNode.appendChild(N);}this.currentElement[0]=N;this._selectNode(N.firstChild);if(!this.browser.webkit3){I.parentNode.style.display="list-item";setTimeout(function(){I.parentNode.style.display="block";},1);}A.stopEvent(L);}}}if(L.keyCode&&((!this.browser.webkit3&&(L.keyCode==25))||((this.browser.webkit3||!this.browser.webkit)&&((L.keyCode==9)&&L.shiftKey)))){O=this._getSelectedElement();if(this._hasParent(O,"li")){O=this._hasParent(O,"li");if(this._hasParent(O,"ul")||this._hasParent(O,"ol")){J=this._hasParent(O,"ul");if(!J){J=this._hasParent(O,"ol");}if(this._isElement(J.previousSibling,"li")){J.removeChild(O);J.parentNode.insertBefore(O,J.nextSibling);if(this.browser.ie){H=this._getDoc().body.createTextRange();H.moveToElementText(O);H.collapse(false);H.select();}if(this.browser.webkit){if(!this.browser.webkit3){J.style.display="list-item";J.parentNode.style.display="list-item";setTimeout(function(){J.style.display="block";J.parentNode.style.display="block";},1);}}A.stopEvent(L);}}}}if(L.keyCode&&((L.keyCode==9)&&(!L.shiftKey))){var G=this._getSelectedElement();if(this._hasParent(G,"li")){F=this._hasParent(G,"li").innerHTML;}if(this.browser.webkit){this._getDoc().execCommand("inserttext",false,"\t");}O=this._getSelectedElement();if(this._hasParent(O,"li")){J=this._hasParent(O,"li");var K=this._getDoc().createElement(J.parentNode.tagName.toLowerCase());if(this.browser.webkit){var M=C.getElementsByClassName("Apple-tab-span","span",J);if(M[0]){J.removeChild(M[0]);J.innerHTML=D.trim(J.innerHTML);if(F){J.innerHTML='<span class="yui-non">'+F+"</span>&nbsp;";}else{J.innerHTML='<span class="yui-non">&nbsp;</span>&nbsp;';}}}else{if(F){J.innerHTML=F+"&nbsp;";}else{J.innerHTML="&nbsp;";}}J.parentNode.replaceChild(K,J);K.appendChild(J);if(this.browser.webkit){this._getSelection().setBaseAndExtent(J.firstChild,1,J.firstChild,J.firstChild.innerText.length);if(!this.browser.webkit3){J.parentNode.parentNode.style.display="list-item";setTimeout(function(){J.parentNode.parentNode.style.display="block";},1);}}else{if(this.browser.ie){H=this._getDoc().body.createTextRange();H.moveToElementText(J);H.collapse(false);H.select();}else{this._selectNode(J);}}A.stopEvent(L);}if(this.browser.webkit){A.stopEvent(L);}this.nodeChange();}},_handleKeyDown:function(K){if(this._isNonEditable(K)){return false;}this._setCurrentEvent(K);if(this.currentWindow){this.closeWindow();}if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}var J=false,L=null,H=false;if(K.shiftKey&&K.ctrlKey){J=true;}switch(K.keyCode){case 84:if(K.shiftKey&&K.ctrlKey){var I=this.toolbar.getElementsByTagName("h2")[0];if(I){I.focus();}A.stopEvent(K);J=false;}break;case 27:if(K.shiftKey){this.afterElement.focus();A.stopEvent(K);H=false;}break;case 76:if(this._hasSelection()){if(K.shiftKey&&K.ctrlKey){var G=true;if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){G=false;}}if(G){this.execCommand("createlink","");this.toolbar.fireEvent("createlinkClick",{type:"createlinkClick",target:this.toolbar});this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});J=false;}}}break;case 65:if(K.metaKey&&this.browser.webkit){A.stopEvent(K);this._getSelection().setBaseAndExtent(this._getDoc().body,1,this._getDoc().body,this._getDoc().body.innerHTML.length);}break;case 66:L="bold";break;case 73:L="italic";break;case 85:L="underline";break;case 13:if(this.browser.ie){var M=this._getRange();var F=this._getSelectedElement();if(!this._isElement(F,"li")){if(M){M.pasteHTML("<br>");M.collapse(false);M.select();}A.stopEvent(K);}}}if(this.browser.ie){this._listFix(K);}if(J&&L){this.execCommand(L,null);A.stopEvent(K);this.nodeChange();}this.fireEvent("editorKeyDown",{type:"editorKeyDown",target:this,ev:K});},nodeChange:function(G){var H=parseInt(this.get("nodeChangeThreshold"),10);var N=Math.round(new Date().getTime()/1000);if(G===true){this._lastNodeChange=0;}if((this._lastNodeChange+H)<N){var Q=this;if(this._fixNodesTimer===null){this._fixNodesTimer=window.setTimeout(function(){Q._fixNodes.call(Q);Q._fixNodesTimer=null;},0);}}this._lastNodeChange=N;if(this.currentEvent){this._lastNodeChangeEvent=this.currentEvent.type;}var Y=this.fireEvent("beforeNodeChange",{type:"beforeNodeChange",target:this});if(Y===false){return false;}if(this.get("dompath")){this._writeDomPath();}if(!this.get("disabled")){if(this.STOP_NODE_CHANGE){this.STOP_NODE_CHANGE=false;return false;}else{var S=this._getSelection(),P=this._getRange(),F=this._getSelectedElement(),L=this.toolbar.getButtonByValue("fontname"),K=this.toolbar.getButtonByValue("fontsize");
if(G!==true){this.editorDirty=true;}var M={};if(this._lastButton){M[this._lastButton.id]=true;}if(!this._isElement(F,"body")){if(L){M[L.get("id")]=true;}if(K){M[K.get("id")]=true;}}this.toolbar.resetAllButtons(M);for(var Z=0;Z<this._disabled.length;Z++){var O=this.toolbar.getButtonByValue(this._disabled[Z]);if(O&&O.get){if(this._lastButton&&(O.get("id")===this._lastButton.id)){}else{if(!this._hasSelection()){switch(this._disabled[Z]){case"fontname":case"fontsize":break;default:this.toolbar.disableButton(O);}}else{if(!this._alwaysDisabled[this._disabled[Z]]){this.toolbar.enableButton(O);}}if(!this._alwaysEnabled[this._disabled[Z]]){this.toolbar.deselectButton(O);}}}}var R=this._getDomPath();var a=null,V=null;for(var W=0;W<R.length;W++){a=R[W].tagName.toLowerCase();if(R[W].getAttribute("tag")){a=R[W].getAttribute("tag").toLowerCase();}V=this._tag2cmd[a];if(V===undefined){V=[];}if(!D.isArray(V)){V=[V];}if(R[W].style.fontWeight.toLowerCase()=="bold"){V[V.length]="bold";}if(R[W].style.fontStyle.toLowerCase()=="italic"){V[V.length]="italic";}if(R[W].style.textDecoration.toLowerCase()=="underline"){V[V.length]="underline";}if(V.length>0){for(var U=0;U<V.length;U++){this.toolbar.selectButton(V[U]);this.toolbar.enableButton(V[U]);}}switch(R[W].style.textAlign.toLowerCase()){case"left":case"right":case"center":case"justify":var T=R[W].style.textAlign.toLowerCase();if(R[W].style.textAlign.toLowerCase()=="justify"){T="full";}this.toolbar.selectButton("justify"+T);this.toolbar.enableButton("justify"+T);break;}}if(L){var X=L._configs.label._initialConfig.value;L.set("label",'<span class="yui-toolbar-fontname-'+E(X)+'">'+X+"</span>");this._updateMenuChecked("fontname",X);}if(K){K.set("label",K._configs.label._initialConfig.value);}var J=this.toolbar.getButtonByValue("heading");if(J){J.set("label",J._configs.label._initialConfig.value);this._updateMenuChecked("heading","none");}var I=this.toolbar.getButtonByValue("insertimage");if(I&&this.currentWindow&&(this.currentWindow.name=="insertimage")){this.toolbar.disableButton(I);}}}this.fireEvent("afterNodeChange",{type:"afterNodeChange",target:this});},_updateMenuChecked:function(F,G,I){if(!I){I=this.toolbar;}var H=I.getButtonByValue(F);H.checkValue(G);},_handleToolbarClick:function(G){var I="";var J="";var H=G.button.value;if(G.button.menucmd){I=H;H=G.button.menucmd;}this._lastButton=G.button;if(this.STOP_EXEC_COMMAND){this.STOP_EXEC_COMMAND=false;return false;}else{this.execCommand(H,I);if(!this.browser.webkit){var F=this;setTimeout(function(){F._focusWindow.call(F);},5);}}A.stopEvent(G);},_setupAfterElement:function(){if(!this.beforeElement){this.beforeElement=document.createElement("h2");this.beforeElement.className="yui-editor-skipheader";this.beforeElement.tabIndex="-1";this.beforeElement.innerHTML=this.STR_BEFORE_EDITOR;this.get("element_cont").get("firstChild").insertBefore(this.beforeElement,this.toolbar.get("nextSibling"));}if(!this.afterElement){this.afterElement=document.createElement("h2");this.afterElement.className="yui-editor-skipheader";this.afterElement.tabIndex="-1";this.afterElement.innerHTML=this.STR_LEAVE_EDITOR;this.get("element_cont").get("firstChild").appendChild(this.afterElement);}},_disableEditor:function(G){if(G){if(!this._mask){if(!!this.browser.ie){this._setDesignMode("off");}if(this.toolbar){this.toolbar.set("disabled",true);}this._mask=document.createElement("DIV");C.setStyle(this._mask,"height","100%");C.setStyle(this._mask,"width","100%");C.setStyle(this._mask,"position","absolute");C.setStyle(this._mask,"top","0");C.setStyle(this._mask,"left","0");C.setStyle(this._mask,"opacity",".5");C.addClass(this._mask,"yui-editor-masked");this.get("iframe").get("parentNode").appendChild(this._mask);}}else{if(this._mask){this._mask.parentNode.removeChild(this._mask);this._mask=null;if(this.toolbar){this.toolbar.set("disabled",false);}this._setDesignMode("on");this._focusWindow();var F=this;window.setTimeout(function(){F.nodeChange.call(F);},100);}}},EDITOR_PANEL_ID:"yui-editor-panel",SEP_DOMPATH:"<",STR_LEAVE_EDITOR:"You have left the Rich Text Editor.",STR_BEFORE_EDITOR:"This text field can contain stylized text and graphics. To cycle through all formatting options, use the keyboard shortcut Control + Shift + T to place focus on the toolbar and navigate between option heading names. <h4>Common formatting keyboard shortcuts:</h4><ul><li>Control Shift B sets text to bold</li> <li>Control Shift I sets text to italic</li> <li>Control Shift U underlines text</li> <li>Control Shift L adds an HTML link</li> <li>To exit this text editor use the keyboard shortcut Control + Shift + ESC.</li></ul>",STR_TITLE:"Rich Text Area.",STR_IMAGE_HERE:"Image Url Here",STR_LINK_URL:"Link URL",STOP_EXEC_COMMAND:false,STOP_NODE_CHANGE:false,CLASS_NOEDIT:"yui-noedit",CLASS_CONTAINER:"yui-editor-container",CLASS_EDITABLE:"yui-editor-editable",CLASS_EDITABLE_CONT:"yui-editor-editable-container",CLASS_PREFIX:"yui-editor",browser:function(){var F=YAHOO.env.ua;if(F.webkit>=420){F.webkit3=F.webkit;}else{F.webkit3=0;}return F;}(),init:function(G,F){if(!this._defaultToolbar){this._defaultToolbar={collapse:true,titlebar:"Text Editing Tools",draggable:false,buttons:[{group:"fontstyle",label:"Font Name and Size",buttons:[{type:"select",label:"Arial",value:"fontname",disabled:true,menu:[{text:"Arial",checked:true},{text:"Arial Black"},{text:"Comic Sans MS"},{text:"Courier New"},{text:"Lucida Console"},{text:"Tahoma"},{text:"Times New Roman"},{text:"Trebuchet MS"},{text:"Verdana"}]},{type:"spin",label:"13",value:"fontsize",range:[9,75],disabled:true}]},{type:"separator"},{group:"textstyle",label:"Font Style",buttons:[{type:"push",label:"Bold CTRL + SHIFT + B",value:"bold"},{type:"push",label:"Italic CTRL + SHIFT + I",value:"italic"},{type:"push",label:"Underline CTRL + SHIFT + U",value:"underline"},{type:"separator"},{type:"color",label:"Font Color",value:"forecolor",disabled:true},{type:"color",label:"Background Color",value:"backcolor",disabled:true}]},{type:"separator"},{group:"indentlist",label:"Lists",buttons:[{type:"push",label:"Create an Unordered List",value:"insertunorderedlist"},{type:"push",label:"Create an Ordered List",value:"insertorderedlist"}]},{type:"separator"},{group:"insertitem",label:"Insert Item",buttons:[{type:"push",label:"HTML Link CTRL + SHIFT + L",value:"createlink",disabled:true},{type:"push",label:"Insert Image",value:"insertimage"}]}]};
}YAHOO.widget.SimpleEditor.superclass.init.call(this,G,F);YAHOO.widget.EditorInfo._instances[this.get("id")]=this;this.currentElement=[];this.on("contentReady",function(){this.DOMReady=true;this.fireQueue();},this,true);},initAttributes:function(F){YAHOO.widget.SimpleEditor.superclass.initAttributes.call(this,F);var G=this;this.setAttributeConfig("container",{writeOnce:true,value:F.container||false});this.setAttributeConfig("plainText",{writeOnce:true,value:F.plainText||false});this.setAttributeConfig("iframe",{value:null});this.setAttributeConfig("textarea",{value:null,writeOnce:true});this.setAttributeConfig("container",{readOnly:true,value:null});this.setAttributeConfig("nodeChangeThreshold",{value:F.nodeChangeThreshold||3,validator:YAHOO.lang.isNumber});this.setAttributeConfig("allowNoEdit",{value:F.allowNoEdit||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("limitCommands",{value:F.limitCommands||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("element_cont",{value:F.element_cont});this.setAttributeConfig("editor_wrapper",{value:F.editor_wrapper||null,writeOnce:true});this.setAttributeConfig("height",{value:F.height||C.getStyle(G.get("element"),"height"),method:function(H){if(this._rendered){if(this.get("animate")){var I=new YAHOO.util.Anim(this.get("iframe").get("parentNode"),{height:{to:parseInt(H,10)}},0.5);I.animate();}else{C.setStyle(this.get("iframe").get("parentNode"),"height",H);}}}});this.setAttributeConfig("autoHeight",{value:F.autoHeight||false,method:function(H){if(H){if(this.get("iframe")){this.get("iframe").get("element").setAttribute("scrolling","no");}this.on("afterNodeChange",this._handleAutoHeight,this,true);this.on("editorKeyDown",this._handleAutoHeight,this,true);this.on("editorKeyPress",this._handleAutoHeight,this,true);}else{if(this.get("iframe")){this.get("iframe").get("element").setAttribute("scrolling","auto");}this.unsubscribe("afterNodeChange",this._handleAutoHeight);this.unsubscribe("editorKeyDown",this._handleAutoHeight);this.unsubscribe("editorKeyPress",this._handleAutoHeight);}}});this.setAttributeConfig("width",{value:F.width||C.getStyle(this.get("element"),"width"),method:function(H){if(this._rendered){if(this.get("animate")){var I=new YAHOO.util.Anim(this.get("element_cont").get("element"),{width:{to:parseInt(H,10)}},0.5);I.animate();}else{this.get("element_cont").setStyle("width",H);}}}});this.setAttributeConfig("blankimage",{value:F.blankimage||this._getBlankImage()});this.setAttributeConfig("css",{value:F.css||this._defaultCSS,writeOnce:true});this.setAttributeConfig("html",{value:F.html||'<html><head><title>{TITLE}</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><base href="'+this._baseHREF+'"><style>{CSS}</style><style>{HIDDEN_CSS}</style><style>{EXTRA_CSS}</style></head><body onload="document.body._rteLoaded = true;">{CONTENT}</body></html>',writeOnce:true});this.setAttributeConfig("extracss",{value:F.extracss||"",writeOnce:true});this.setAttributeConfig("handleSubmit",{value:F.handleSubmit||false,method:function(H){if(this.get("element").form){if(!this._formButtons){this._formButtons=[];}if(H){A.on(this.get("element").form,"submit",this._handleFormSubmit,this,true);var I=this.get("element").form.getElementsByTagName("input");for(var K=0;K<I.length;K++){var J=I[K].getAttribute("type");if(J&&(J.toLowerCase()=="submit")){A.on(I[K],"click",this._handleFormButtonClick,this,true);this._formButtons[this._formButtons.length]=I[K];}}}else{A.unsubscribe(this.get("element").form,"submit",this._handleFormSubmit);if(this._formButtons){A.unsubscribe(this._formButtons,"click",this._handleFormButtonClick);}}}}});this.setAttributeConfig("disabled",{value:false,method:function(H){if(this._rendered){this._disableEditor(H);}}});this.setAttributeConfig("toolbar_cont",{value:null,writeOnce:true});this.setAttributeConfig("toolbar",{value:F.toolbar||this._defaultToolbar,writeOnce:true,method:function(H){if(!H.buttonType){H.buttonType=this._defaultToolbar.buttonType;}this._defaultToolbar=H;}});this.setAttributeConfig("animate",{value:((F.animate)?((YAHOO.util.Anim)?true:false):false),validator:function(I){var H=true;if(!YAHOO.util.Anim){H=false;}return H;}});this.setAttributeConfig("panel",{value:null,writeOnce:true,validator:function(I){var H=true;if(!YAHOO.widget.Overlay){H=false;}return H;}});this.setAttributeConfig("focusAtStart",{value:F.focusAtStart||false,writeOnce:true,method:function(){this.on("editorContentLoaded",function(){var H=this;setTimeout(function(){H._focusWindow.call(H,true);H.editorDirty=false;},400);},this,true);}});this.setAttributeConfig("dompath",{value:F.dompath||false,method:function(H){if(H&&!this.dompath){this.dompath=document.createElement("DIV");this.dompath.id=this.get("id")+"_dompath";C.addClass(this.dompath,"dompath");this.get("element_cont").get("firstChild").appendChild(this.dompath);if(this.get("iframe")){this._writeDomPath();}}else{if(!H&&this.dompath){this.dompath.parentNode.removeChild(this.dompath);this.dompath=null;}}}});this.setAttributeConfig("markup",{value:F.markup||"semantic",validator:function(H){switch(H.toLowerCase()){case"semantic":case"css":case"default":case"xhtml":return true;}return false;}});this.setAttributeConfig("removeLineBreaks",{value:F.removeLineBreaks||false,validator:YAHOO.lang.isBoolean});this.on("afterRender",function(){this._renderPanel();});},_getBlankImage:function(){if(!this.DOMReady){this._queue[this._queue.length]=["_getBlankImage",arguments];return"";}var F="";if(!this._blankImageLoaded){if(YAHOO.widget.EditorInfo.blankImage){this.set("blankimage",YAHOO.widget.EditorInfo.blankImage);this._blankImageLoaded=true;}else{var G=document.createElement("div");G.style.position="absolute";G.style.top="-9999px";G.style.left="-9999px";G.className=this.CLASS_PREFIX+"-blankimage";document.body.appendChild(G);F=YAHOO.util.Dom.getStyle(G,"background-image");F=F.replace("url(","").replace(")","").replace(/"/g,"");F=F.replace("app:/","");this.set("blankimage",F);
this._blankImageLoaded=true;YAHOO.widget.EditorInfo.blankImage=F;}}else{F=this.get("blankimage");}return F;},_handleAutoHeight:function(){var J=this._getDoc(),G=J.body,K=J.documentElement;var F=parseInt(C.getStyle(this.get("editor_wrapper"),"height"),10);var H=G.scrollHeight;if(this.browser.webkit){H=K.scrollHeight;}if(H<parseInt(this.get("height"),10)){H=parseInt(this.get("height"),10);}if((F!=H)&&(H>=parseInt(this.get("height"),10))){C.setStyle(this.get("editor_wrapper"),"height",H+"px");if(this.browser.ie){this.get("iframe").setStyle("height","99%");this.get("iframe").setStyle("zoom","1");var I=this;window.setTimeout(function(){I.get("iframe").setStyle("height","100%");},1);}}},_formButtons:null,_formButtonClicked:null,_handleFormButtonClick:function(G){var F=A.getTarget(G);this._formButtonClicked=F;},_handleFormSubmit:function(I){A.stopEvent(I);this.saveHTML();var H=this.get("element").form;var F=this._formButtonClicked||false;var G=this;window.setTimeout(function(){YAHOO.util.Event.removeListener(H,"submit",G._handleFormSubmit);if(YAHOO.env.ua.ie){H.fireEvent("onsubmit");if(F&&!F.disabled){F.click();}}else{if(F&&!F.disabled){F.click();}else{var J=document.createEvent("HTMLEvents");J.initEvent("submit",true,true);H.dispatchEvent(J);if(YAHOO.env.ua.webkit){if(YAHOO.lang.isFunction(H.submit)){H.submit();}}}}},200);},_handleFontSize:function(H){var F=this.toolbar.getButtonById(H.button.id);var G=F.get("label")+"px";this.execCommand("fontsize",G);this.STOP_EXEC_COMMAND=true;},_handleColorPicker:function(H){var G=H.button;var F="#"+H.color;if((G=="forecolor")||(G=="backcolor")){this.execCommand(G,F);}},_handleAlign:function(I){var H=null;for(var F=0;F<I.button.menu.length;F++){if(I.button.menu[F].value==I.button.value){H=I.button.menu[F].value;}}var G=this._getSelection();this.execCommand(H,G);this.STOP_EXEC_COMMAND=true;},_handleAfterNodeChange:function(){var R=this._getDomPath(),M=null,I=null,N=null,G=false;var K=this.toolbar.getButtonByValue("fontname");var L=this.toolbar.getButtonByValue("fontsize");var F=this.toolbar.getButtonByValue("heading");for(var H=0;H<R.length;H++){M=R[H];var Q=M.tagName.toLowerCase();if(M.getAttribute("tag")){Q=M.getAttribute("tag");}I=M.getAttribute("face");if(C.getStyle(M,"font-family")){I=C.getStyle(M,"font-family");I=I.replace(/'/g,"");}if(Q.substring(0,1)=="h"){if(F){for(var J=0;J<F._configs.menu.value.length;J++){if(F._configs.menu.value[J].value.toLowerCase()==Q){F.set("label",F._configs.menu.value[J].text);}}this._updateMenuChecked("heading",Q);}}}if(K){for(var P=0;P<K._configs.menu.value.length;P++){if(I&&K._configs.menu.value[P].text.toLowerCase()==I.toLowerCase()){G=true;I=K._configs.menu.value[P].text;}}if(!G){I=K._configs.label._initialConfig.value;}var O='<span class="yui-toolbar-fontname-'+E(I)+'">'+I+"</span>";if(K.get("label")!=O){K.set("label",O);this._updateMenuChecked("fontname",I);}}if(L){N=parseInt(C.getStyle(M,"fontSize"),10);if((N===null)||isNaN(N)){N=L._configs.label._initialConfig.value;}L.set("label",""+N);}if(!this._isElement(M,"body")&&!this._isElement(M,"img")){this.toolbar.enableButton(K);this.toolbar.enableButton(L);this.toolbar.enableButton("forecolor");this.toolbar.enableButton("backcolor");}if(this._isElement(M,"img")){if(YAHOO.widget.Overlay){this.toolbar.enableButton("createlink");}}if(this._isElement(M,"blockquote")){this.toolbar.selectButton("indent");this.toolbar.disableButton("indent");this.toolbar.enableButton("outdent");}if(this._hasParent(M,"ol")||this._hasParent(M,"ul")){this.toolbar.disableButton("indent");}this._lastButton=null;},_setBusy:function(F){},_handleInsertImageClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("insertimage")){return false;}}this.toolbar.set("disabled",true);this.on("afterExecCommand",function(){var F=this.currentElement[0],H="http://";if(!F){F=this._getSelectedElement();}if(F){if(F.getAttribute("src")){H=F.getAttribute("src",2);if(H.indexOf(this.get("blankimage"))!=-1){H=this.STR_IMAGE_HERE;}}}var G=prompt(this.STR_LINK_URL+": ",H);if((G!=="")&&(G!==null)){F.setAttribute("src",G);}else{if(G===null){F.parentNode.removeChild(F);this.currentElement=[];this.nodeChange();}}this.closeWindow();this.toolbar.set("disabled",false);},this,true);},_handleInsertImageWindowClose:function(){this.nodeChange();},_isLocalFile:function(F){if((F!=="")&&((F.indexOf("file:/")!=-1)||(F.indexOf(":\\")!=-1))){return true;}return false;},_handleCreateLinkClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){return false;}}this.toolbar.set("disabled",true);this.on("afterExecCommand",function(){var H=this.currentElement[0],G="";if(H){if(H.getAttribute("href",2)!==null){G=H.getAttribute("href",2);}}var J=prompt(this.STR_LINK_URL+": ",G);if((J!=="")&&(J!==null)){var I=J;if((I.indexOf(":/"+"/")==-1)&&(I.substring(0,1)!="/")&&(I.substring(0,6).toLowerCase()!="mailto")){if((I.indexOf("@")!=-1)&&(I.substring(0,6).toLowerCase()!="mailto")){I="mailto:"+I;}else{if(I.substring(0,1)!="#"){I="http:/"+"/"+I;}}}H.setAttribute("href",I);}else{if(J!==null){var F=this._getDoc().createElement("span");F.innerHTML=H.innerHTML;C.addClass(F,"yui-non");H.parentNode.replaceChild(F,H);}}this.closeWindow();this.toolbar.set("disabled",false);});},_handleCreateLinkWindowClose:function(){this.nodeChange();this.currentElement=[];},render:function(){if(this._rendered){return false;}if(!this.DOMReady){this._queue[this._queue.length]=["render",arguments];return false;}this._rendered=true;var F=this;window.setTimeout(function(){F._render.call(F);},4);},_render:function(){this._setBusy();var F=this;this.set("textarea",this.get("element"));this.get("element_cont").setStyle("display","none");this.get("element_cont").addClass(this.CLASS_CONTAINER);this.set("iframe",this._createIframe());window.setTimeout(function(){F._setInitialContent.call(F);},10);this.get("editor_wrapper").appendChild(this.get("iframe").get("element"));if(this.get("disabled")){this._disableEditor(true);}var G=this.get("toolbar");
if(G instanceof B){this.toolbar=G;this.toolbar.set("disabled",true);}else{G.disabled=true;this.toolbar=new B(this.get("toolbar_cont"),G);}this.fireEvent("toolbarLoaded",{type:"toolbarLoaded",target:this.toolbar});this.toolbar.on("toolbarCollapsed",function(){if(this.currentWindow){this.moveWindow();}},this,true);this.toolbar.on("toolbarExpanded",function(){if(this.currentWindow){this.moveWindow();}},this,true);this.toolbar.on("fontsizeClick",function(H){this._handleFontSize(H);},this,true);this.toolbar.on("colorPickerClicked",function(H){this._handleColorPicker(H);return false;},this,true);this.toolbar.on("alignClick",function(H){this._handleAlign(H);},this,true);this.on("afterNodeChange",function(){this._handleAfterNodeChange();},this,true);this.toolbar.on("insertimageClick",function(){this._handleInsertImageClick();},this,true);this.on("windowinsertimageClose",function(){this._handleInsertImageWindowClose();},this,true);this.toolbar.on("createlinkClick",function(){this._handleCreateLinkClick();},this,true);this.on("windowcreatelinkClose",function(){this._handleCreateLinkWindowClose();},this,true);this.get("parentNode").replaceChild(this.get("element_cont").get("element"),this.get("element"));this.setStyle("visibility","hidden");this.setStyle("position","absolute");this.setStyle("top","-9999px");this.setStyle("left","-9999px");this.get("element_cont").appendChild(this.get("element"));this.get("element_cont").setStyle("display","block");C.addClass(this.get("iframe").get("parentNode"),this.CLASS_EDITABLE_CONT);this.get("iframe").addClass(this.CLASS_EDITABLE);this.get("element_cont").setStyle("width",this.get("width"));C.setStyle(this.get("iframe").get("parentNode"),"height",this.get("height"));this.get("iframe").setStyle("width","100%");this.get("iframe").setStyle("height","100%");window.setTimeout(function(){F._setupAfterElement.call(F);},0);this.fireEvent("afterRender",{type:"afterRender",target:this});},execCommand:function(H,G){var K=this.fireEvent("beforeExecCommand",{type:"beforeExecCommand",target:this,args:arguments});if((K===false)||(this.STOP_EXEC_COMMAND)){this.STOP_EXEC_COMMAND=false;return false;}this._setMarkupType(H);if(this.browser.ie){this._getWindow().focus();}var F=true;if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue(H)){F=false;}}this.editorDirty=true;if((typeof this["cmd_"+H.toLowerCase()]=="function")&&F){var J=this["cmd_"+H.toLowerCase()](G);F=J[0];if(J[1]){H=J[1];}if(J[2]){G=J[2];}}if(F){try{this._getDoc().execCommand(H,false,G);}catch(I){}}else{}this.on("afterExecCommand",function(){this.unsubscribeAll("afterExecCommand");this.nodeChange();});this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});},cmd_backcolor:function(I){var F=true,G=this._getSelectedElement(),H="backcolor";if(this.browser.gecko||this.browser.opera){this._setEditorStyle(true);H="hilitecolor";}if(!this._isElement(G,"body")){C.setStyle(G,"background-color",I);this._selectNode(G);F=false;}else{this._createCurrentElement("span",{backgroundColor:I});this._selectNode(this.currentElement[0]);F=false;}return[F,H];},cmd_forecolor:function(H){var F=true,G=this._getSelectedElement();if(!this._isElement(G,"body")){C.setStyle(G,"color",H);this._selectNode(G);F=false;}else{this._createCurrentElement("span",{color:H});this._selectNode(this.currentElement[0]);F=false;}return[F];},cmd_unlink:function(F){this._swapEl(this.currentElement[0],"span",function(G){G.className="yui-non";});return[false];},cmd_createlink:function(H){var G=this._getSelectedElement(),F=null;if(this._hasParent(G,"a")){this.currentElement[0]=this._hasParent(G,"a");}else{if(!this._isElement(G,"a")){this._createCurrentElement("a");F=this._swapEl(this.currentElement[0],"a");this.currentElement[0]=F;}else{this.currentElement[0]=G;}}return[false];},cmd_insertimage:function(K){var F=true,G=null,J="insertimage",I=this._getSelectedElement();if(K===""){K=this.get("blankimage");}if(this._isElement(I,"img")){this.currentElement[0]=I;F=false;}else{if(this._getDoc().queryCommandEnabled(J)){this._getDoc().execCommand("insertimage",false,K);var L=this._getDoc().getElementsByTagName("img");for(var H=0;H<L.length;H++){if(!YAHOO.util.Dom.hasClass(L[H],"yui-img")){YAHOO.util.Dom.addClass(L[H],"yui-img");this.currentElement[0]=L[H];}}F=false;}else{if(I==this._getDoc().body){G=this._getDoc().createElement("img");G.setAttribute("src",K);YAHOO.util.Dom.addClass(G,"yui-img");this._getDoc().body.appendChild(G);}else{this._createCurrentElement("img");G=this._getDoc().createElement("img");G.setAttribute("src",K);YAHOO.util.Dom.addClass(G,"yui-img");this.currentElement[0].parentNode.replaceChild(G,this.currentElement[0]);}this.currentElement[0]=G;F=false;}}return[F];},cmd_inserthtml:function(I){var F=true,H="inserthtml",G=null,J=null;if(this.browser.webkit&&!this._getDoc().queryCommandEnabled(H)){this._createCurrentElement("img");G=this._getDoc().createElement("span");G.innerHTML=I;this.currentElement[0].parentNode.replaceChild(G,this.currentElement[0]);F=false;}else{if(this.browser.ie){J=this._getRange();if(J.item){J.item(0).outerHTML=I;}else{J.pasteHTML(I);}F=false;}}return[F];},cmd_list:function(W){var Q=true,T=null,M=0,G=null,P="",U=this._getSelectedElement(),R="insertorderedlist";if(W=="ul"){R="insertunorderedlist";}if((this.browser.webkit&&!this._getDoc().queryCommandEnabled(R))){if(this._isElement(U,"li")&&this._isElement(U.parentNode,W)){G=U.parentNode;T=this._getDoc().createElement("span");YAHOO.util.Dom.addClass(T,"yui-non");P="";var F=G.getElementsByTagName("li");for(M=0;M<F.length;M++){P+="<div>"+F[M].innerHTML+"</div>";}T.innerHTML=P;this.currentElement[0]=G;this.currentElement[0].parentNode.replaceChild(T,this.currentElement[0]);}else{this._createCurrentElement(W.toLowerCase());T=this._getDoc().createElement(W);for(M=0;M<this.currentElement.length;M++){var J=this._getDoc().createElement("li");J.innerHTML=this.currentElement[M].innerHTML+'<span class="yui-non">&nbsp;</span>&nbsp;';T.appendChild(J);if(M>0){this.currentElement[M].parentNode.removeChild(this.currentElement[M]);
}}this.currentElement[0].parentNode.replaceChild(T,this.currentElement[0]);this.currentElement[0]=T;var H=this.currentElement[0].firstChild;H=C.getElementsByClassName("yui-non","span",H)[0];this._getSelection().setBaseAndExtent(H,1,H,H.innerText.length);}Q=false;}else{G=this._getSelectedElement();if(this._isElement(G,"li")&&this._isElement(G.parentNode,W)||(this.browser.ie&&this._isElement(this._getRange().parentElement,"li"))||(this.browser.ie&&this._isElement(G,"ul"))||(this.browser.ie&&this._isElement(G,"ol"))){if(this.browser.ie){if((this.browser.ie&&this._isElement(G,"ul"))||(this.browser.ie&&this._isElement(G,"ol"))){G=G.getElementsByTagName("li")[0];}P="";var I=G.parentNode.getElementsByTagName("li");for(var S=0;S<I.length;S++){P+=I[S].innerHTML+"<br>";}var V=this._getDoc().createElement("span");V.innerHTML=P;G.parentNode.parentNode.replaceChild(V,G.parentNode);}else{this.nodeChange();this._getDoc().execCommand(R,"",G.parentNode);this.nodeChange();}Q=false;}if(this.browser.opera){var O=this;window.setTimeout(function(){var X=O._getDoc().getElementsByTagName("li");for(var Y=0;Y<X.length;Y++){if(X[Y].innerHTML.toLowerCase()=="<br>"){X[Y].parentNode.parentNode.removeChild(X[Y].parentNode);}}},30);}if(this.browser.ie&&Q){var K="";if(this._getRange().html){K="<li>"+this._getRange().html+"</li>";}else{var L=this._getRange().text.split("\n");if(L.length>1){K="";for(var N=0;N<L.length;N++){K+="<li>"+L[N]+"</li>";}}else{K="<li>"+this._getRange().text+"</li>";}}this._getRange().pasteHTML("<"+W+">"+K+"</"+W+">");Q=false;}}return Q;},cmd_insertorderedlist:function(F){return[this.cmd_list("ol")];},cmd_insertunorderedlist:function(F){return[this.cmd_list("ul")];},cmd_fontname:function(H){var F=true,G=this._getSelectedElement();this.currentFont=H;if(G&&G.tagName&&!this._hasSelection()){YAHOO.util.Dom.setStyle(G,"font-family",H);F=false;}return[F];},cmd_fontsize:function(G){if(this.currentElement&&(this.currentElement.length>0)&&(!this._hasSelection())){YAHOO.util.Dom.setStyle(this.currentElement,"fontSize",G);}else{if(!this._isElement(this._getSelectedElement(),"body")){var F=this._getSelectedElement();YAHOO.util.Dom.setStyle(F,"fontSize",G);this._selectNode(F);}else{this._createCurrentElement("span",{"fontSize":G});this._selectNode(this.currentElement[0]);}}return[false];},_swapEl:function(G,F,I){var H=this._getDoc().createElement(F);H.innerHTML=G.innerHTML;if(typeof I=="function"){I.call(this,H);}G.parentNode.replaceChild(H,G);return H;},_createCurrentElement:function(H,U){H=((H)?H:"a");var b=null,G=[],I=this._getDoc();if(this.currentFont){if(!U){U={};}U.fontFamily=this.currentFont;this.currentFont=null;}this.currentElement=[];var X=function(){var f=null;switch(H){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":f=I.createElement(H);break;default:f=I.createElement("span");YAHOO.util.Dom.addClass(f,"yui-tag-"+H);YAHOO.util.Dom.addClass(f,"yui-tag");f.setAttribute("tag",H);for(var e in U){if(YAHOO.util.Lang.hasOwnProperty(U,e)){f.style[e]=U[e];}}break;}return f;};if(!this._hasSelection()){if(this._getDoc().queryCommandEnabled("insertimage")){this._getDoc().execCommand("insertimage",false,"yui-tmp-img");var W=this._getDoc().getElementsByTagName("img");for(var Z=0;Z<W.length;Z++){if(W[Z].getAttribute("src",2)=="yui-tmp-img"){G=X();W[Z].parentNode.replaceChild(G,W[Z]);this.currentElement[this.currentElement.length]=G;}}}else{if(this.currentEvent){b=YAHOO.util.Event.getTarget(this.currentEvent);}else{b=this._getDoc().body;}}if(b){G=X();if(this._isElement(b,"body")||this._isElement(b,"html")){if(this._isElement(b,"html")){b=this._getDoc().body;}b.appendChild(G);}else{if(b.nextSibling){b.parentNode.insertBefore(G,b.nextSibling);}else{b.parentNode.appendChild(G);}}this.currentElement[this.currentElement.length]=G;this.currentEvent=null;if(this.browser.webkit){this._getSelection().setBaseAndExtent(G,0,G,0);if(this.browser.webkit3){this._getSelection().collapseToStart();}else{this._getSelection().collapse(true);}}}}else{this._setEditorStyle(true);this._getDoc().execCommand("fontname",false,"yui-tmp");var F=[];var R=this._getDoc().getElementsByTagName("font");var P=this._getDoc().getElementsByTagName(this._getSelectedElement().tagName);var M=this._getDoc().getElementsByTagName("span");var L=this._getDoc().getElementsByTagName("i");var K=this._getDoc().getElementsByTagName("b");var J=this._getDoc().getElementsByTagName(this._getSelectedElement().parentNode.tagName);for(var V=0;V<R.length;V++){F[F.length]=R[V];}for(var N=0;N<J.length;N++){F[F.length]=J[N];}for(var T=0;T<P.length;T++){F[F.length]=P[T];}for(var S=0;S<M.length;S++){F[F.length]=M[S];}for(var Q=0;Q<L.length;Q++){F[F.length]=L[Q];}for(var O=0;O<K.length;O++){F[F.length]=K[O];}for(var a=0;a<F.length;a++){if((YAHOO.util.Dom.getStyle(F[a],"font-family")=="yui-tmp")||(F[a].face&&(F[a].face=="yui-tmp"))){G=X();G.innerHTML=F[a].innerHTML;if(this._isElement(F[a],"ol")||(this._isElement(F[a],"ul"))){var Y=F[a].getElementsByTagName("li")[0];F[a].style.fontFamily="inherit";Y.style.fontFamily="inherit";G.innerHTML=Y.innerHTML;Y.innerHTML="";Y.appendChild(G);this.currentElement[this.currentElement.length]=G;}else{if(this._isElement(F[a],"li")){F[a].innerHTML="";F[a].appendChild(G);F[a].style.fontFamily="inherit";this.currentElement[this.currentElement.length]=G;}else{if(F[a].parentNode){F[a].parentNode.replaceChild(G,F[a]);this.currentElement[this.currentElement.length]=G;this.currentEvent=null;if(this.browser.webkit){this._getSelection().setBaseAndExtent(G,0,G,0);if(this.browser.webkit3){this._getSelection().collapseToStart();}else{this._getSelection().collapse(true);}}if(this.browser.ie&&U&&U.fontSize){this._getSelection().empty();}if(this.browser.gecko){this._getSelection().collapseToStart();}}}}}}var c=this.currentElement.length;for(var d=0;d<c;d++){if((d+1)!=c){if(this.currentElement[d]&&this.currentElement[d].nextSibling){if(this._isElement(this.currentElement[d],"br")){this.currentElement[this.currentElement.length]=this.currentElement[d].nextSibling;
}}}}}},saveHTML:function(){var F=this.cleanHTML();this.get("element").value=F;return F;},setEditorHTML:function(F){F=this._cleanIncomingHTML(F);this._getDoc().body.innerHTML=F;this.nodeChange();},getEditorHTML:function(){var F=this._getDoc().body;if(F===null){return null;}return this._getDoc().body.innerHTML;},show:function(){if(this.browser.gecko){this._setDesignMode("on");this._focusWindow();}if(this.browser.webkit){var F=this;window.setTimeout(function(){F._setInitialContent.call(F);},10);}if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}this.get("iframe").setStyle("position","static");this.get("iframe").setStyle("left","");},hide:function(){if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}if(this._fixNodesTimer){clearTimeout(this._fixNodesTimer);this._fixNodesTimer=null;}if(this._nodeChangeTimer){clearTimeout(this._nodeChangeTimer);this._nodeChangeTimer=null;}this._lastNodeChange=0;this.get("iframe").setStyle("position","absolute");this.get("iframe").setStyle("left","-9999px");},_cleanIncomingHTML:function(F){F=F.replace(/<strong([^>]*)>/gi,"<b$1>");F=F.replace(/<\/strong>/gi,"</b>");F=F.replace(/<embed([^>]*)>/gi,"<YUI_EMBED$1>");F=F.replace(/<\/embed>/gi,"</YUI_EMBED>");F=F.replace(/<em([^>]*)>/gi,"<i$1>");F=F.replace(/<\/em>/gi,"</i>");F=F.replace(/<YUI_EMBED([^>]*)>/gi,"<embed$1>");F=F.replace(/<\/YUI_EMBED>/gi,"</embed>");if(this.get("plainText")){F=F.replace(/\n/g,"<br>").replace(/\r/g,"<br>");F=F.replace(/  /gi,"&nbsp;&nbsp;");F=F.replace(/\t/gi,"&nbsp;&nbsp;&nbsp;&nbsp;");}F=F.replace(/<script([^>]*)>/gi,"<bad>");F=F.replace(/<\/script([^>]*)>/gi,"</bad>");F=F.replace(/&lt;script([^>]*)&gt;/gi,"<bad>");F=F.replace(/&lt;\/script([^>]*)&gt;/gi,"</bad>");F=F.replace(/\n/g,"<YUI_LF>").replace(/\r/g,"<YUI_LF>");F=F.replace(new RegExp("<bad([^>]*)>(.*?)</bad>","gi"),"");F=F.replace(/<YUI_LF>/g,"\n");return F;},cleanHTML:function(H){if(!H){H=this.getEditorHTML();}var G=this.get("markup");H=this.pre_filter_linebreaks(H,G);H=H.replace(/<img([^>]*)\/>/gi,"<YUI_IMG$1>");H=H.replace(/<img([^>]*)>/gi,"<YUI_IMG$1>");H=H.replace(/<input([^>]*)\/>/gi,"<YUI_INPUT$1>");H=H.replace(/<input([^>]*)>/gi,"<YUI_INPUT$1>");H=H.replace(/<ul([^>]*)>/gi,"<YUI_UL$1>");H=H.replace(/<\/ul>/gi,"</YUI_UL>");H=H.replace(/<blockquote([^>]*)>/gi,"<YUI_BQ$1>");H=H.replace(/<\/blockquote>/gi,"</YUI_BQ>");H=H.replace(/<embed([^>]*)>/gi,"<YUI_EMBED$1>");H=H.replace(/<\/embed>/gi,"</YUI_EMBED>");if((G=="semantic")||(G=="xhtml")){H=H.replace(/<i(\s+[^>]*)?>/gi,"<em$1>");H=H.replace(/<\/i>/gi,"</em>");H=H.replace(/<b([^>]*)>/gi,"<strong$1>");H=H.replace(/<\/b>/gi,"</strong>");}H=H.replace(/<font/gi,"<font");H=H.replace(/<\/font>/gi,"</font>");H=H.replace(/<span/gi,"<span");H=H.replace(/<\/span>/gi,"</span>");if((G=="semantic")||(G=="xhtml")||(G=="css")){H=H.replace(new RegExp('<font([^>]*)face="([^>]*)">(.*?)</font>',"gi"),'<span $1 style="font-family: $2;">$3</span>');H=H.replace(/<u/gi,'<span style="text-decoration: underline;"');if(this.browser.webkit){H=H.replace(new RegExp('<span class="Apple-style-span" style="font-weight: bold;">([^>]*)</span>',"gi"),"<strong>$1</strong>");H=H.replace(new RegExp('<span class="Apple-style-span" style="font-style: italic;">([^>]*)</span>',"gi"),"<em>$1</em>");}H=H.replace(/\/u>/gi,"/span>");if(G=="css"){H=H.replace(/<em([^>]*)>/gi,"<i$1>");H=H.replace(/<\/em>/gi,"</i>");H=H.replace(/<strong([^>]*)>/gi,"<b$1>");H=H.replace(/<\/strong>/gi,"</b>");H=H.replace(/<b/gi,'<span style="font-weight: bold;"');H=H.replace(/\/b>/gi,"/span>");H=H.replace(/<i/gi,'<span style="font-style: italic;"');H=H.replace(/\/i>/gi,"/span>");}H=H.replace(/  /gi," ");}else{H=H.replace(/<u/gi,"<u");H=H.replace(/\/u>/gi,"/u>");}H=H.replace(/<ol([^>]*)>/gi,"<ol$1>");H=H.replace(/\/ol>/gi,"/ol>");H=H.replace(/<li/gi,"<li");H=H.replace(/\/li>/gi,"/li>");H=this.filter_safari(H);H=this.filter_internals(H);H=this.filter_all_rgb(H);H=this.post_filter_linebreaks(H,G);if(G=="xhtml"){H=H.replace(/<YUI_IMG([^>]*)>/g,"<img $1 />");H=H.replace(/<YUI_INPUT([^>]*)>/g,"<input $1 />");}else{H=H.replace(/<YUI_IMG([^>]*)>/g,"<img $1>");H=H.replace(/<YUI_INPUT([^>]*)>/g,"<input $1>");}H=H.replace(/<YUI_UL([^>]*)>/g,"<ul$1>");H=H.replace(/<\/YUI_UL>/g,"</ul>");H=this.filter_invalid_lists(H);H=H.replace(/<YUI_BQ([^>]*)>/g,"<blockquote$1>");H=H.replace(/<\/YUI_BQ>/g,"</blockquote>");H=H.replace(/<YUI_EMBED([^>]*)>/g,"<embed$1>");H=H.replace(/<\/YUI_EMBED>/g,"</embed>");H=YAHOO.lang.trim(H);if(this.get("removeLineBreaks")){H=H.replace(/\n/g,"").replace(/\r/g,"");H=H.replace(/  /gi," ");}if(H.substring(0,6).toLowerCase()=="<span>"){H=H.substring(6);if(H.substring(H.length-7,H.length).toLowerCase()=="</span>"){H=H.substring(0,H.length-7);}}for(var F in this.invalidHTML){if(YAHOO.lang.hasOwnProperty(this.invalidHTML,F)){if(D.isObject(F)&&F.keepContents){H=H.replace(new RegExp("<"+F+"([^>]*)>(.*?)</"+F+">","gi"),"$1");}else{H=H.replace(new RegExp("<"+F+"([^>]*)>(.*?)</"+F+">","gi"),"");}}}this.fireEvent("cleanHTML",{type:"cleanHTML",target:this,html:H});return H;},filter_invalid_lists:function(F){F=F.replace(/<\/li>\n/gi,"</li>");F=F.replace(/<\/li><ol>/gi,"</li><li><ol>");F=F.replace(/<\/ol>/gi,"</ol></li>");F=F.replace(/<\/ol><\/li>\n/gi,"</ol>\n");F=F.replace(/<\/li><ul>/gi,"</li><li><ul>");F=F.replace(/<\/ul>/gi,"</ul></li>");F=F.replace(/<\/ul><\/li>\n/gi,"</ul>\n");F=F.replace(/<\/li>/gi,"</li>\n");F=F.replace(/<\/ol>/gi,"</ol>\n");F=F.replace(/<ol>/gi,"<ol>\n");F=F.replace(/<ul>/gi,"<ul>\n");return F;},filter_safari:function(F){if(this.browser.webkit){F=F.replace(/<span class="Apple-tab-span" style="white-space:pre">([^>])<\/span>/gi,"&nbsp;&nbsp;&nbsp;&nbsp;");F=F.replace(/Apple-style-span/gi,"");F=F.replace(/style="line-height: normal;"/gi,"");F=F.replace(/<li><\/li>/gi,"");F=F.replace(/<li> <\/li>/gi,"");
F=F.replace(/<li>  <\/li>/gi,"");F=F.replace(/<div><\/div>/gi,"");F=F.replace(/<div> <\/div>/gi,"");}return F;},filter_internals:function(F){F=F.replace(/\r/g,"");F=F.replace(/<\/?(body|head|html)[^>]*>/gi,"");F=F.replace(/<YUI_BR><\/li>/gi,"</li>");F=F.replace(/yui-tag-span/gi,"");F=F.replace(/yui-tag/gi,"");F=F.replace(/yui-non/gi,"");F=F.replace(/yui-img/gi,"");F=F.replace(/ tag="span"/gi,"");F=F.replace(/ class=""/gi,"");F=F.replace(/ style=""/gi,"");F=F.replace(/ class=" "/gi,"");F=F.replace(/ class="  "/gi,"");F=F.replace(/ target=""/gi,"");F=F.replace(/ title=""/gi,"");if(this.browser.ie){F=F.replace(/ class= /gi,"");F=F.replace(/ class= >/gi,"");F=F.replace(/_height="([^>])"/gi,"");F=F.replace(/_width="([^>])"/gi,"");}return F;},filter_all_rgb:function(J){var I=new RegExp("rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)","gi");var F=J.match(I);if(D.isArray(F)){for(var H=0;H<F.length;H++){var G=this.filter_rgb(F[H]);J=J.replace(F[H].toString(),G);}}return J;},filter_rgb:function(H){if(H.toLowerCase().indexOf("rgb")!=-1){var K=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");var G=H.replace(K,"$1,$2,$3,$4,$5").split(",");if(G.length==5){var J=parseInt(G[1],10).toString(16);var I=parseInt(G[2],10).toString(16);var F=parseInt(G[3],10).toString(16);J=J.length==1?"0"+J:J;I=I.length==1?"0"+I:I;F=F.length==1?"0"+F:F;H="#"+J+I+F;}}return H;},pre_filter_linebreaks:function(G,F){if(this.browser.webkit){G=G.replace(/<br class="khtml-block-placeholder">/gi,"<YUI_BR>");G=G.replace(/<br class="webkit-block-placeholder">/gi,"<YUI_BR>");}G=G.replace(/<br>/gi,"<YUI_BR>");G=G.replace(/<br (.*?)>/gi,"<YUI_BR>");G=G.replace(/<br\/>/gi,"<YUI_BR>");G=G.replace(/<br \/>/gi,"<YUI_BR>");G=G.replace(/<div><YUI_BR><\/div>/gi,"<YUI_BR>");G=G.replace(/<p>(&nbsp;|&#160;)<\/p>/g,"<YUI_BR>");G=G.replace(/<p><br>&nbsp;<\/p>/gi,"<YUI_BR>");G=G.replace(/<p>&nbsp;<\/p>/gi,"<YUI_BR>");G=G.replace(/<YUI_BR>$/,"");G=G.replace(/<YUI_BR><\/p>/g,"</p>");return G;},post_filter_linebreaks:function(G,F){if(F=="xhtml"){G=G.replace(/<YUI_BR>/g,"<br />");}else{G=G.replace(/<YUI_BR>/g,"<br>");}return G;},clearEditorDoc:function(){this._getDoc().body.innerHTML="&nbsp;";},_renderPanel:function(){},openWindow:function(F){},moveWindow:function(){},_closeWindow:function(){},closeWindow:function(){this.unsubscribeAll("afterExecCommand");this.toolbar.resetAllButtons();this._focusWindow();},destroy:function(){this.saveHTML();this.toolbar.destroy();this.setStyle("visibility","hidden");this.setStyle("position","absolute");this.setStyle("top","-9999px");this.setStyle("left","-9999px");var G=this.get("element");this.get("element_cont").get("parentNode").replaceChild(G,this.get("element_cont").get("element"));this.get("element_cont").get("element").innerHTML="";this.set("handleSubmit",false);for(var F in this){if(D.hasOwnProperty(this,F)){this[F]=null;}}return true;},toString:function(){var F="SimpleEditor";if(this.get&&this.get("element_cont")){F="SimpleEditor (#"+this.get("element_cont").get("id")+")"+((this.get("disabled")?" Disabled":""));}return F;}});YAHOO.widget.EditorInfo={_instances:{},blankImage:"",window:{},panel:null,getEditorById:function(F){if(!YAHOO.lang.isString(F)){F=F.id;}if(this._instances[F]){return this._instances[F];}return false;},toString:function(){var F=0;for(var G in this._instances){F++;}return"Editor Info ("+F+" registered intance"+((F>1)?"s":"")+")";}};})();(function(){var C=YAHOO.util.Dom,A=YAHOO.util.Event,D=YAHOO.lang,B=YAHOO.widget.Toolbar;YAHOO.widget.Editor=function(G,F){YAHOO.widget.Editor.superclass.constructor.call(this,G,F);};function E(F){return F.replace(/ /g,"-").toLowerCase();}YAHOO.extend(YAHOO.widget.Editor,YAHOO.widget.SimpleEditor,{STR_BEFORE_EDITOR:"This text field can contain stylized text and graphics. To cycle through all formatting options, use the keyboard shortcut Control + Shift + T to place focus on the toolbar and navigate between option heading names. <h4>Common formatting keyboard shortcuts:</h4><ul><li>Control Shift B sets text to bold</li> <li>Control Shift I sets text to italic</li> <li>Control Shift U underlines text</li> <li>Control Shift [ aligns text left</li> <li>Control Shift | centers text</li> <li>Control Shift ] aligns text right</li> <li>Control Shift L adds an HTML link</li> <li>To exit this text editor use the keyboard shortcut Control + Shift + ESC.</li></ul>",STR_CLOSE_WINDOW:"Close Window",STR_CLOSE_WINDOW_NOTE:"To close this window use the Control + Shift + W key",STR_IMAGE_PROP_TITLE:"Image Options",STR_IMAGE_URL:"Image Url",STR_IMAGE_TITLE:"Description",STR_IMAGE_SIZE:"Size",STR_IMAGE_ORIG_SIZE:"Original Size",STR_IMAGE_COPY:'<span class="tip"><span class="icon icon-info"></span><strong>Note:</strong>To move this image just highlight it, cut, and paste where ever you\'d like.</span>',STR_IMAGE_PADDING:"Padding",STR_IMAGE_BORDER:"Border",STR_IMAGE_TEXTFLOW:"Text Flow",STR_LOCAL_FILE_WARNING:'<span class="tip"><span class="icon icon-warn"></span><strong>Note:</strong>This image/link points to a file on your computer and will not be accessible to others on the internet.</span>',STR_LINK_PROP_TITLE:"Link Options",STR_LINK_PROP_REMOVE:"Remove link from text",STR_LINK_NEW_WINDOW:"Open in a new window.",STR_LINK_TITLE:"Description",CLASS_LOCAL_FILE:"warning-localfile",CLASS_HIDDEN:"yui-hidden",init:function(G,F){this._defaultToolbar={collapse:true,titlebar:"Text Editing Tools",draggable:false,buttonType:"advanced",buttons:[{group:"fontstyle",label:"Font Name and Size",buttons:[{type:"select",label:"Arial",value:"fontname",disabled:true,menu:[{text:"Arial",checked:true},{text:"Arial Black"},{text:"Comic Sans MS"},{text:"Courier New"},{text:"Lucida Console"},{text:"Tahoma"},{text:"Times New Roman"},{text:"Trebuchet MS"},{text:"Verdana"}]},{type:"spin",label:"13",value:"fontsize",range:[9,75],disabled:true}]},{type:"separator"},{group:"textstyle",label:"Font Style",buttons:[{type:"push",label:"Bold CTRL + SHIFT + B",value:"bold"},{type:"push",label:"Italic CTRL + SHIFT + I",value:"italic"},{type:"push",label:"Underline CTRL + SHIFT + U",value:"underline"},{type:"separator"},{type:"push",label:"Subscript",value:"subscript",disabled:true},{type:"push",label:"Superscript",value:"superscript",disabled:true},{type:"separator"},{type:"color",label:"Font Color",value:"forecolor",disabled:true},{type:"color",label:"Background Color",value:"backcolor",disabled:true},{type:"separator"},{type:"push",label:"Remove Formatting",value:"removeformat",disabled:true},{type:"push",label:"Show/Hide Hidden Elements",value:"hiddenelements"}]},{type:"separator"},{group:"alignment",label:"Alignment",buttons:[{type:"push",label:"Align Left CTRL + SHIFT + [",value:"justifyleft"},{type:"push",label:"Align Center CTRL + SHIFT + |",value:"justifycenter"},{type:"push",label:"Align Right CTRL + SHIFT + ]",value:"justifyright"},{type:"push",label:"Justify",value:"justifyfull"}]},{type:"separator"},{group:"parastyle",label:"Paragraph Style",buttons:[{type:"select",label:"Normal",value:"heading",disabled:true,menu:[{text:"Normal",value:"none",checked:true},{text:"Header 1",value:"h1"},{text:"Header 2",value:"h2"},{text:"Header 3",value:"h3"},{text:"Header 4",value:"h4"},{text:"Header 5",value:"h5"},{text:"Header 6",value:"h6"}]}]},{type:"separator"},{group:"indentlist",label:"Indenting and Lists",buttons:[{type:"push",label:"Indent",value:"indent",disabled:true},{type:"push",label:"Outdent",value:"outdent",disabled:true},{type:"push",label:"Create an Unordered List",value:"insertunorderedlist"},{type:"push",label:"Create an Ordered List",value:"insertorderedlist"}]},{type:"separator"},{group:"insertitem",label:"Insert Item",buttons:[{type:"push",label:"HTML Link CTRL + SHIFT + L",value:"createlink",disabled:true},{type:"push",label:"Insert Image",value:"insertimage"}]}]};
YAHOO.widget.Editor.superclass.init.call(this,G,F);},initAttributes:function(F){YAHOO.widget.Editor.superclass.initAttributes.call(this,F);this.setAttributeConfig("localFileWarning",{value:F.locaFileWarning||true});this.setAttributeConfig("hiddencss",{value:F.hiddencss||".yui-hidden font, .yui-hidden strong, .yui-hidden b, .yui-hidden em, .yui-hidden i, .yui-hidden u, .yui-hidden div,.yui-hidden p,.yui-hidden span,.yui-hidden img, .yui-hidden ul, .yui-hidden ol, .yui-hidden li, .yui-hidden table { border: 1px dotted #ccc; } .yui-hidden .yui-non { border: none; } .yui-hidden img { padding: 2px; }",writeOnce:true});},_fixNodes:function(){YAHOO.widget.Editor.superclass._fixNodes.call(this);var I="";var J=this._getDoc().getElementsByTagName("img");for(var G=0;G<J.length;G++){if(J[G].getAttribute("href",2)){I=J[G].getAttribute("src",2);if(this._isLocalFile(I)){C.addClass(J[G],this.CLASS_LOCAL_FILE);}else{C.removeClass(J[G],this.CLASS_LOCAL_FILE);}}}var H=this._getDoc().body.getElementsByTagName("a");for(var F=0;F<H.length;F++){if(H[F].getAttribute("href",2)){I=H[F].getAttribute("href",2);if(this._isLocalFile(I)){C.addClass(H[F],this.CLASS_LOCAL_FILE);}else{C.removeClass(H[F],this.CLASS_LOCAL_FILE);}}}},_disabled:["createlink","forecolor","backcolor","fontname","fontsize","superscript","subscript","removeformat","heading","indent"],_alwaysDisabled:{"outdent":true},_alwaysEnabled:{hiddenelements:true},_handleKeyDown:function(H){YAHOO.widget.Editor.superclass._handleKeyDown.call(this,H);var G=false,I=null,F=false;if(H.shiftKey&&H.ctrlKey){G=true;}switch(H.keyCode){case 219:I="justifyleft";break;case 220:I="justifycenter";break;case 221:I="justifyright";break;}if(G&&I){this.execCommand(I,null);A.stopEvent(H);this.nodeChange();}},_handleCreateLinkClick:function(){var F=this._getSelectedElement();if(this._isElement(F,"img")){this.STOP_EXEC_COMMAND=true;this.currentElement[0]=F;this.toolbar.fireEvent("insertimageClick",{type:"insertimageClick",target:this.toolbar});this.fireEvent("afterExecCommand",{type:"afterExecCommand",target:this});return false;}if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("createlink")){return false;}}this.on("afterExecCommand",function(){var M=new YAHOO.widget.EditorWindow("createlink",{width:"350px"});var J=this.currentElement[0],I="",P="",N="",K=false;if(J){if(J.getAttribute("href",2)!==null){I=J.getAttribute("href",2);if(this._isLocalFile(I)){M.setFooter(this.STR_LOCAL_FILE_WARNING);K=true;}else{M.setFooter(" ");}}if(J.getAttribute("title")!==null){P=J.getAttribute("title");}if(J.getAttribute("target")!==null){N=J.getAttribute("target");}}var O='<label for="createlink_url"><strong>'+this.STR_LINK_URL+':</strong> <input type="text" name="createlink_url" id="createlink_url" value="'+I+'"'+((K)?' class="warning"':"")+"></label>";O+='<label for="createlink_target"><strong>&nbsp;</strong><input type="checkbox" name="createlink_target_" id="createlink_target" value="_blank"'+((N)?" checked":"")+"> "+this.STR_LINK_NEW_WINDOW+"</label>";O+='<label for="createlink_title"><strong>'+this.STR_LINK_TITLE+':</strong> <input type="text" name="createlink_title" id="createlink_title" value="'+P+'"></label>';var L=document.createElement("div");L.innerHTML=O;var H=document.createElement("div");H.className="removeLink";var G=document.createElement("a");G.href="#";G.innerHTML=this.STR_LINK_PROP_REMOVE;G.title=this.STR_LINK_PROP_REMOVE;A.on(G,"click",function(Q){A.stopEvent(Q);this.execCommand("unlink");this.closeWindow();},this,true);H.appendChild(G);L.appendChild(H);M.setHeader(this.STR_LINK_PROP_TITLE);M.setBody(L);A.onAvailable("createlink_url",function(){window.setTimeout(function(){try{YAHOO.util.Dom.get("createlink_url").focus();}catch(Q){}},50);A.on("createlink_url","blur",function(){var Q=C.get("createlink_url");if(this._isLocalFile(Q.value)){C.addClass(Q,"warning");this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING);}else{C.removeClass(Q,"warning");this.get("panel").setFooter(" ");}},this,true);},this,true);this.openWindow(M);});},_handleCreateLinkWindowClose:function(){var H=C.get("createlink_url"),J=C.get("createlink_target"),L=C.get("createlink_title"),I=this.currentElement[0],F=I;if(H&&H.value){var K=H.value;if((K.indexOf(":/"+"/")==-1)&&(K.substring(0,1)!="/")&&(K.substring(0,6).toLowerCase()!="mailto")){if((K.indexOf("@")!=-1)&&(K.substring(0,6).toLowerCase()!="mailto")){K="mailto:"+K;}else{if(K.substring(0,1)!="#"){K="http:/"+"/"+K;}}}I.setAttribute("href",K);if(J.checked){I.setAttribute("target",J.value);}else{I.setAttribute("target","");}I.setAttribute("title",((L.value)?L.value:""));}else{var G=this._getDoc().createElement("span");G.innerHTML=I.innerHTML;C.addClass(G,"yui-non");I.parentNode.replaceChild(G,I);}this.nodeChange();this.currentElement=[];},_handleInsertImageClick:function(){if(this.get("limitCommands")){if(!this.toolbar.getButtonByValue("insertimage")){return false;}}this._setBusy();this.on("afterExecCommand",function(){var I=this.currentElement[0],S=null,P="",e="",f="",O="",b="",V=75,Y=75,U=0,Q=0,N=0,W=false,M=new YAHOO.widget.EditorWindow("insertimage",{width:"415px"});if(!I){I=this._getSelectedElement();}if(I){if(I.getAttribute("src")){O=I.getAttribute("src",2);if(O.indexOf(this.get("blankimage"))!=-1){O=this.STR_IMAGE_HERE;W=true;}}if(I.getAttribute("alt",2)){f=I.getAttribute("alt",2);}if(I.getAttribute("title",2)){f=I.getAttribute("title",2);}if(I.parentNode&&this._isElement(I.parentNode,"a")){P=I.parentNode.getAttribute("href",2);if(I.parentNode.getAttribute("target")!==null){e=I.parentNode.getAttribute("target");}}V=parseInt(I.height,10);Y=parseInt(I.width,10);if(I.style.height){V=parseInt(I.style.height,10);}if(I.style.width){Y=parseInt(I.style.width,10);}if(I.style.margin){U=parseInt(I.style.margin,10);}if(!I._height){I._height=V;}if(!I._width){I._width=Y;}Q=I._height;N=I._width;}var Z='<label for="insertimage_url"><strong>'+this.STR_IMAGE_URL+':</strong> <input type="text" id="insertimage_url" value="'+O+'" size="40"></label>';S=document.createElement("div");
S.innerHTML=Z;var K=document.createElement("div");K.id="img_toolbar";S.appendChild(K);var F='<label for="insertimage_title"><strong>'+this.STR_IMAGE_TITLE+':</strong> <input type="text" id="insertimage_title" value="'+f+'" size="40"></label>';F+='<label for="insertimage_link"><strong>'+this.STR_LINK_URL+':</strong> <input type="text" name="insertimage_link" id="insertimage_link" value="'+P+'"></label>';F+='<label for="insertimage_target"><strong>&nbsp;</strong><input type="checkbox" name="insertimage_target_" id="insertimage_target" value="_blank"'+((e)?" checked":"")+"> "+this.STR_LINK_NEW_WINDOW+"</label>";var T=document.createElement("div");T.innerHTML=F;S.appendChild(T);M.cache=S;var H=new YAHOO.widget.Toolbar(K,{buttonType:this._defaultToolbar.buttonType,buttons:[{group:"textflow",label:this.STR_IMAGE_TEXTFLOW+":",buttons:[{type:"push",label:"Left",value:"left"},{type:"push",label:"Inline",value:"inline"},{type:"push",label:"Block",value:"block"},{type:"push",label:"Right",value:"right"}]},{type:"separator"},{group:"padding",label:this.STR_IMAGE_PADDING+":",buttons:[{type:"spin",label:""+U,value:"padding",range:[0,50]}]},{type:"separator"},{group:"border",label:this.STR_IMAGE_BORDER+":",buttons:[{type:"select",label:"Border Size",value:"bordersize",menu:[{text:"none",value:"0",checked:true},{text:"1px",value:"1"},{text:"2px",value:"2"},{text:"3px",value:"3"},{text:"4px",value:"4"},{text:"5px",value:"5"}]},{type:"select",label:"Border Type",value:"bordertype",disabled:true,menu:[{text:"Solid",value:"solid",checked:true},{text:"Dashed",value:"dashed"},{text:"Dotted",value:"dotted"}]},{type:"color",label:"Border Color",value:"bordercolor",disabled:true}]}]});var G="0";var X="solid";if(I.style.borderLeftWidth){G=parseInt(I.style.borderLeftWidth,10);}if(I.style.borderLeftStyle){X=I.style.borderLeftStyle;}var d=H.getButtonByValue("bordersize");var a=((parseInt(G,10)>0)?"":"none");d.set("label",'<span class="yui-toolbar-bordersize-'+G+'">'+a+"</span>");this._updateMenuChecked("bordersize",G,H);var R=H.getButtonByValue("bordertype");R.set("label",'<span class="yui-toolbar-bordertype-'+X+'"></span>');this._updateMenuChecked("bordertype",X,H);if(parseInt(G,10)>0){H.enableButton(R);H.enableButton(d);}var J=H.get("cont");var c=document.createElement("div");c.className="yui-toolbar-group yui-toolbar-group-height-width height-width";c.innerHTML="<h3>"+this.STR_IMAGE_SIZE+":</h3>";var L="";if((V!=Q)||(Y!=N)){L='<span class="info">'+this.STR_IMAGE_ORIG_SIZE+"<br>"+N+" x "+Q+"</span>";}c.innerHTML+='<span tabIndex="-1"><input type="text" size="3" value="'+Y+'" id="insertimage_width"> x <input type="text" size="3" value="'+V+'" id="insertimage_height"></span>'+L;J.insertBefore(c,J.firstChild);A.onAvailable("insertimage_width",function(){A.on("insertimage_width","blur",function(){var g=parseInt(C.get("insertimage_width").value,10);if(g>5){I.style.width=g+"px";}},this,true);},this,true);A.onAvailable("insertimage_height",function(){A.on("insertimage_height","blur",function(){var g=parseInt(C.get("insertimage_height").value,10);if(g>5){I.style.height=g+"px";}},this,true);},this,true);if((I.align=="right")||(I.align=="left")){H.selectButton(I.align);}else{if(I.style.display=="block"){H.selectButton("block");}else{H.selectButton("inline");}}if(parseInt(I.style.marginLeft,10)>0){H.getButtonByValue("padding").set("label",""+parseInt(I.style.marginLeft,10));}if(I.style.borderSize){H.selectButton("bordersize");H.selectButton(parseInt(I.style.borderSize,10));}H.on("colorPickerClicked",function(k){var h="1",j="solid",g="black";if(I.style.borderLeftWidth){h=parseInt(I.style.borderLeftWidth,10);}if(I.style.borderLeftStyle){j=I.style.borderLeftStyle;}if(I.style.borderLeftColor){g=I.style.borderLeftColor;}var i=h+"px "+j+" #"+k.color;I.style.border=i;},this.toolbar,true);H.on("buttonClick",function(m){var k=m.button.value,j="";if(m.button.menucmd){k=m.button.menucmd;}var h="1",i="solid",g="black";if(I.style.borderLeftWidth){h=parseInt(I.style.borderLeftWidth,10);}if(I.style.borderLeftStyle){i=I.style.borderLeftStyle;}if(I.style.borderLeftColor){g=I.style.borderLeftColor;}switch(k){case"bordersize":if(this.browser.webkit&&this._lastImage){C.removeClass(this._lastImage,"selected");this._lastImage=null;}j=parseInt(m.button.value,10)+"px "+i+" "+g;I.style.border=j;if(parseInt(m.button.value,10)>0){H.enableButton("bordertype");H.enableButton("bordercolor");}else{H.disableButton("bordertype");H.disableButton("bordercolor");}break;case"bordertype":if(this.browser.webkit&&this._lastImage){C.removeClass(this._lastImage,"selected");this._lastImage=null;}j=h+"px "+m.button.value+" "+g;I.style.border=j;break;case"right":case"left":H.deselectAllButtons();I.style.display="";I.align=m.button.value;break;case"inline":H.deselectAllButtons();I.style.display="";I.align="";break;case"block":H.deselectAllButtons();I.style.display="block";I.align="center";break;case"padding":var l=H.getButtonById(m.button.id);I.style.margin=l.get("label")+"px";break;}H.selectButton(m.button.value);this.moveWindow();},this,true);M.setHeader(this.STR_IMAGE_PROP_TITLE);M.setBody(S);if((this.browser.webkit&&!this.browser.webkit3||this.browser.air)||this.browser.opera){M.setFooter(this.STR_IMAGE_COPY);}this.openWindow(M);A.onAvailable("insertimage_url",function(){this.toolbar.selectButton("insertimage");window.setTimeout(function(){YAHOO.util.Dom.get("insertimage_url").focus();if(W){YAHOO.util.Dom.get("insertimage_url").select();}},50);if(this.get("localFileWarning")){A.on("insertimage_link","blur",function(){var g=C.get("insertimage_link");if(this._isLocalFile(g.value)){C.addClass(g,"warning");this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING);}else{C.removeClass(g,"warning");this.get("panel").setFooter(" ");if((this.browser.webkit&&!this.browser.webkit3||this.browser.air)||this.browser.opera){this.get("panel").setFooter(this.STR_IMAGE_COPY);}}},this,true);A.on("insertimage_url","blur",function(){var i=C.get("insertimage_url");if(i.value&&I){if(i.value==I.getAttribute("src",2)){return false;
}}if(this._isLocalFile(i.value)){C.addClass(i,"warning");this.get("panel").setFooter(this.STR_LOCAL_FILE_WARNING);}else{if(this.currentElement[0]){C.removeClass(i,"warning");this.get("panel").setFooter(" ");if((this.browser.webkit&&!this.browser.webkit3||this.browser.air)||this.browser.opera){this.get("panel").setFooter(this.STR_IMAGE_COPY);}if(i&&i.value&&(i.value!=this.STR_IMAGE_HERE)){this.currentElement[0].setAttribute("src",i.value);var h=this,g=new Image();g.onerror=function(){i.value=h.STR_IMAGE_HERE;g.setAttribute("src",h.get("blankimage"));h.currentElement[0].setAttribute("src",h.get("blankimage"));YAHOO.util.Dom.get("insertimage_height").value=g.height;YAHOO.util.Dom.get("insertimage_width").value=g.width;};window.setTimeout(function(){YAHOO.util.Dom.get("insertimage_height").value=g.height;YAHOO.util.Dom.get("insertimage_width").value=g.width;if(h.currentElement&&h.currentElement[0]){if(!h.currentElement[0]._height){h.currentElement[0]._height=g.height;}if(!h.currentElement[0]._width){h.currentElement[0]._width=g.width;}}},800);if(i.value!=this.STR_IMAGE_HERE){g.src=i.value;}}}}},this,true);}},this,true);});},_handleInsertImageWindowClose:function(){var F=C.get("insertimage_url");var M=C.get("insertimage_title");var J=C.get("insertimage_link");var K=C.get("insertimage_target");var I=this.currentElement[0];if(F&&F.value&&(F.value!=this.STR_IMAGE_HERE)){I.setAttribute("src",F.value);I.setAttribute("title",M.value);I.setAttribute("alt",M.value);var H=I.parentNode;if(J.value){var L=J.value;if((L.indexOf(":/"+"/")==-1)&&(L.substring(0,1)!="/")&&(L.substring(0,6).toLowerCase()!="mailto")){if((L.indexOf("@")!=-1)&&(L.substring(0,6).toLowerCase()!="mailto")){L="mailto:"+L;}else{L="http:/"+"/"+L;}}if(H&&this._isElement(H,"a")){H.setAttribute("href",L);if(K.checked){H.setAttribute("target",K.value);}else{H.setAttribute("target","");}}else{var G=this._getDoc().createElement("a");G.setAttribute("href",L);if(K.checked){G.setAttribute("target",K.value);}else{G.setAttribute("target","");}I.parentNode.replaceChild(G,I);G.appendChild(I);}}else{if(H&&this._isElement(H,"a")){H.parentNode.replaceChild(I,H);}}}else{I.parentNode.removeChild(I);}this.currentElement=[];this.nodeChange();},_renderPanel:function(){var F=null;if(!YAHOO.widget.EditorInfo.panel){F=new YAHOO.widget.Overlay(this.EDITOR_PANEL_ID,{width:"300px",iframe:true,visible:false,underlay:"none",draggable:false,close:false});YAHOO.widget.EditorInfo.panel=F;}else{F=YAHOO.widget.EditorInfo.panel;}this.set("panel",F);this.get("panel").setBody("---");this.get("panel").setHeader(" ");this.get("panel").setFooter(" ");if(this.DOMReady){this.get("panel").render(document.body);C.addClass(this.get("panel").element,"yui-editor-panel");}else{A.onDOMReady(function(){this.get("panel").render(document.body);C.addClass(this.get("panel").element,"yui-editor-panel");},this,true);}this.get("panel").showEvent.subscribe(function(){YAHOO.util.Dom.setStyle(this.element,"display","block");});return this.get("panel");},openWindow:function(K){this.toolbar.set("disabled",true);A.on(document,"keypress",this._closeWindow,this,true);if(YAHOO.widget.EditorInfo.window.win&&YAHOO.widget.EditorInfo.window.scope){YAHOO.widget.EditorInfo.window.scope.closeWindow.call(YAHOO.widget.EditorInfo.window.scope);}YAHOO.widget.EditorInfo.window.win=K;YAHOO.widget.EditorInfo.window.scope=this;var P=this,L=C.getXY(this.currentElement[0]),U=C.getXY(this.get("iframe").get("element")),N=this.get("panel"),T=[(L[0]+U[0]-20),(L[1]+U[1]+10)],O=(parseInt(K.attrs.width,10)/2),R="center",M=null;this.fireEvent("beforeOpenWindow",{type:"beforeOpenWindow",win:K,panel:N});M=document.createElement("div");M.className=this.CLASS_PREFIX+"-body-cont";for(var V in this.browser){if(this.browser[V]){C.addClass(M,V);break;}}C.addClass(M,((YAHOO.widget.Button&&(this._defaultToolbar.buttonType=="advanced"))?"good-button":"no-button"));var S=document.createElement("h3");S.className="yui-editor-skipheader";S.innerHTML=this.STR_CLOSE_WINDOW_NOTE;M.appendChild(S);form=document.createElement("form");form.setAttribute("method","GET");var W=K.name;A.on(form,"submit",function(Y){var X="window"+W+"Submit";P.fireEvent(X,{type:X,target:this});A.stopEvent(Y);},this,true);M.appendChild(form);if(D.isObject(K.body)){form.appendChild(K.body);}else{var F=document.createElement("div");F.innerHTML=K.body;form.appendChild(F);}var J=document.createElement("span");J.innerHTML="X";J.title=this.STR_CLOSE_WINDOW;J.className="close";A.on(J,"click",function(){this.closeWindow();},this,true);var H=document.createElement("span");H.innerHTML="^";H.className="knob";K._knob=H;var I=document.createElement("h3");I.innerHTML=K.header;N.cfg.setProperty("width",K.attrs.width);N.setHeader(" ");N.appendToHeader(I);I.appendChild(J);I.appendChild(H);N.setBody(" ");N.setFooter(" ");if(K.footer!==null){N.setFooter(K.footer);C.addClass(N.footer,"open");}else{C.removeClass(N.footer,"open");}N.appendToBody(M);var Q=function(){N.bringToTop();A.on(N.element,"click",function(X){A.stopPropagation(X);});this._setBusy(true);N.showEvent.unsubscribe(Q);};N.showEvent.subscribe(Q,this,true);var G=function(){this.currentWindow=null;var X="window"+W+"Close";this.fireEvent(X,{type:X,target:this});N.hideEvent.unsubscribe(G);};N.hideEvent.subscribe(G,this,true);this.currentWindow=K;this.moveWindow(true);N.show();this.fireEvent("afterOpenWindow",{type:"afterOpenWindow",win:K,panel:N});},moveWindow:function(G){if(!this.currentWindow){return false;}var J=this.currentWindow,K=C.getXY(this.currentElement[0]),b=C.getXY(this.get("iframe").get("element")),P=this.get("panel"),Z=[(K[0]+b[0]),(K[1]+b[1])],S=(parseInt(J.attrs.width,10)/2),V="center",R=P.cfg.getProperty("xy")||[0,0],H=J._knob,Y=0,M=0,U=false;Z[0]=((Z[0]-S)+20);Z[0]=Z[0]-C.getDocumentScrollLeft(this._getDoc());Z[1]=Z[1]-C.getDocumentScrollTop(this._getDoc());if(this._isElement(this.currentElement[0],"img")){if(this.currentElement[0].src.indexOf(this.get("blankimage"))!=-1){Z[0]=(Z[0]+(75/2));Z[1]=(Z[1]+75);}else{var O=parseInt(this.currentElement[0].width,10);
var X=parseInt(this.currentElement[0].height,10);Z[0]=(Z[0]+(O/2));Z[1]=(Z[1]+X);}Z[1]=Z[1]+15;}else{var L=C.getStyle(this.currentElement[0],"fontSize");if(L&&L.indexOf&&L.indexOf("px")!=-1){Z[1]=Z[1]+parseInt(C.getStyle(this.currentElement[0],"fontSize"),10)+5;}else{Z[1]=Z[1]+20;}}if(Z[0]<b[0]){Z[0]=b[0]+5;V="left";}if((Z[0]+(S*2))>(b[0]+parseInt(this.get("iframe").get("element").clientWidth,10))){Z[0]=((b[0]+parseInt(this.get("iframe").get("element").clientWidth,10))-(S*2)-5);V="right";}try{Y=(Z[0]-R[0]);M=(Z[1]-R[1]);}catch(c){}var Q=b[1]+parseInt(this.get("height"),10);var I=b[0]+parseInt(this.get("width"),10);if(Z[1]>Q){Z[1]=Q;}if(Z[0]>I){Z[0]=(I/2);}Y=((Y<0)?(Y*-1):Y);M=((M<0)?(M*-1):M);if(((Y>10)||(M>10))||G){var T=0,W=0;if(this.currentElement[0].width){W=(parseInt(this.currentElement[0].width,10)/2);}var N=K[0]+b[0]+W;T=N-Z[0];if(T>(parseInt(J.attrs.width,10)-1)){T=((parseInt(J.attrs.width,10)-30)-1);}else{if(T<40){T=1;}}if(isNaN(T)){T=1;}if(G){if(H){H.style.left=T+"px";}if(this.get("animate")){C.setStyle(P.element,"opacity","0");U=new YAHOO.util.Anim(P.element,{opacity:{from:0,to:1}},0.1,YAHOO.util.Easing.easeOut);P.cfg.setProperty("xy",Z);U.onComplete.subscribe(function(){if(this.browser.ie){P.element.style.filter="none";}},this,true);U.animate();}else{P.cfg.setProperty("xy",Z);}}else{if(this.get("animate")){U=new YAHOO.util.Anim(P.element,{},0.5,YAHOO.util.Easing.easeOut);U.attributes={top:{to:Z[1]},left:{to:Z[0]}};U.onComplete.subscribe(function(){P.cfg.setProperty("xy",Z);});var a=new YAHOO.util.Anim(P.iframe,U.attributes,0.5,YAHOO.util.Easing.easeOut);var F=new YAHOO.util.Anim(H,{left:{to:T}},0.6,YAHOO.util.Easing.easeOut);U.animate();a.animate();F.animate();}else{H.style.left=T+"px";P.cfg.setProperty("xy",Z);}}}},_closeWindow:function(F){if((F.charCode==87)&&F.shiftKey&&F.ctrlKey){if(this.currentWindow){this.closeWindow();}}},closeWindow:function(){YAHOO.widget.EditorInfo.window={};this.fireEvent("closeWindow",{type:"closeWindow",win:this.currentWindow});this.currentWindow=null;this.get("panel").hide();this.get("panel").cfg.setProperty("xy",[-900,-900]);this.get("panel").syncIframe();this.unsubscribeAll("afterExecCommand");this.toolbar.set("disabled",false);this.toolbar.resetAllButtons();this._focusWindow();A.removeListener(document,"keypress",this._closeWindow);},cmd_heading:function(J){var G=true,H=null,I="heading",K=this._getSelection(),F=this._getSelectedElement();if(F){K=F;}if(this.browser.ie){I="formatblock";}if(J=="none"){if((K&&K.tagName&&(K.tagName.toLowerCase().substring(0,1)=="h"))||(K&&K.parentNode&&K.parentNode.tagName&&(K.parentNode.tagName.toLowerCase().substring(0,1)=="h"))){if(K.parentNode.tagName.toLowerCase().substring(0,1)=="h"){K=K.parentNode;}if(this._isElement(K,"html")){return[false];}H=this._swapEl(F,"span",function(L){L.className="yui-non";});this._selectNode(H);this.currentElement[0]=H;}G=false;}else{if(this._isElement(F,"h1")||this._isElement(F,"h2")||this._isElement(F,"h3")||this._isElement(F,"h4")||this._isElement(F,"h5")||this._isElement(F,"h6")){H=this._swapEl(F,J);this._selectNode(H);this.currentElement[0]=H;}else{this._createCurrentElement(J);this._selectNode(this.currentElement[0]);}G=false;}return[G,I];},cmd_hiddenelements:function(F){if(this._showingHiddenElements){this._lastButton=null;this._showingHiddenElements=false;this.toolbar.deselectButton("hiddenelements");C.removeClass(this._getDoc().body,this.CLASS_HIDDEN);}else{this._showingHiddenElements=true;C.addClass(this._getDoc().body,this.CLASS_HIDDEN);this.toolbar.selectButton("hiddenelements");}return[false];},cmd_removeformat:function(I){var G=true;if(this.browser.webkit&&!this._getDoc().queryCommandEnabled("removeformat")){var F=this._getSelection()+"";this._createCurrentElement("span");this.currentElement[0].className="yui-non";this.currentElement[0].innerHTML=F;for(var H=1;H<this.currentElement.length;H++){this.currentElement[H].parentNode.removeChild(this.currentElement[H]);}G=false;}return[G];},cmd_script:function(L,K){var H=true,F=L.toLowerCase().substring(0,3),I=null,G=this._getSelectedElement();if(this.browser.webkit){if(this._isElement(G,F)){I=this._swapEl(this.currentElement[0],"span",function(M){M.className="yui-non";});this._selectNode(I);}else{this._createCurrentElement(F);var J=this._swapEl(this.currentElement[0],F);this._selectNode(J);this.currentElement[0]=J;}H=false;}return H;},cmd_superscript:function(F){return[this.cmd_script("superscript",F)];},cmd_subscript:function(F){return[this.cmd_script("subscript",F)];},cmd_indent:function(I){var F=true,H=this._getSelectedElement(),J=null;if(this.browser.webkit||this.browser.ie||this.browser.gecko){if(this._isElement(H,"blockquote")){J=this._getDoc().createElement("blockquote");J.innerHTML=H.innerHTML;H.innerHTML="";H.appendChild(J);this._selectNode(J);}else{this._createCurrentElement("blockquote");for(var G=0;G<this.currentElement.length;G++){J=this._getDoc().createElement("blockquote");J.innerHTML=this.currentElement[G].innerHTML;this.currentElement[G].parentNode.replaceChild(J,this.currentElement[G]);this.currentElement[G]=J;}this._selectNode(this.currentElement[0]);}F=false;}else{I="blockquote";}return[F,"indent",I];},cmd_outdent:function(J){var F=true,I=this._getSelectedElement(),K=null,G=null;if(this.browser.webkit||this.browser.ie||this.browser.gecko){I=this._getSelectedElement();if(this._isElement(I,"blockquote")){var H=I.parentNode;if(this._isElement(I.parentNode,"blockquote")){H.innerHTML=I.innerHTML;this._selectNode(H);}else{G=this._getDoc().createElement("span");G.innerHTML=I.innerHTML;YAHOO.util.Dom.addClass(G,"yui-non");H.replaceChild(G,I);this._selectNode(G);}}else{}F=false;}else{J="blockquote";}return[F,"indent",J];},toString:function(){var F="Editor";if(this.get&&this.get("element_cont")){F="Editor (#"+this.get("element_cont").get("id")+")"+((this.get("disabled")?" Disabled":""));}return F;}});YAHOO.widget.EditorWindow=function(G,F){this.name=G.replace(" ","_");this.attrs=F;};YAHOO.widget.EditorWindow.prototype={_cache:null,header:null,body:null,footer:null,setHeader:function(F){this.header=F;
},setBody:function(F){this.body=F;},setFooter:function(F){this.footer=F;},toString:function(){return"Editor Window ("+this.name+")";}};})();YAHOO.register("editor",YAHOO.widget.Editor,{version:"2.5.1",build:"984"});var JosephJiang = {};
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
                case 'switch-to-editor': {
                    if (!oEditor) {  // 只有第一次會產生 Editor 
                        setEditor();
                    }
                    else {
                        oContainer.replaceClass('yui-textarea-container', 'yui-editor-container');
                        oEditor._setDesignMode('on');
                        var sCode = oEditor.get('textarea').value; 
                        oEditor.setEditorHTML(getHTMLCode(sCode));
                    };
                    // 設定文字
                    dSwitchLink.innerHTML = '檢視原始碼';
                    YUD.replaceClass(dSwitchLink, 'switch-to-editor', 'switch-to-textarea');
                    break;
                };
                case 'switch-to-textarea' : {
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
        if (typeof dp === 'undefined') {return;}
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

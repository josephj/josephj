var dp={sh:{Utils:{},Brushes:{},Strings:{},Version:"1.3.0"}};dp.sh.Strings={AboutDialog:'<html><head><title>About...</title></head><body class="dp-about"><table cellspacing="0"><tr><td class="copy"><p class="title">dp.SyntaxHighlighter</div><div class="para">Version: {V}</p><p><a href="http://www.dreamprojections.com/syntaxhighlighter/?ref=about" target="_blank">http://www.dreamprojections.com/SyntaxHighlighter</a></p>&copy;2004-2005 Alex Gorbatchev. All right reserved.</td></tr><tr><td class="footer"><input type="button" class="close" value="OK" onClick="window.close()"/></td></tr></table></body></html>',ExpandCode:"+ expand code",ViewPlain:"view plain",Print:"print",CopyToClipboard:"copy to clipboard",About:"?",CopiedToClipboard:"The code is in your clipboard now."};dp.SyntaxHighlighter=dp.sh;dp.sh.Utils.Expand=function(A){var C=A;var B=A;while(B!=null&&B.tagName!="SPAN"){B=B.parentNode;}while(C!=null&&C.tagName!="TABLE"){C=C.parentNode;}B.parentNode.removeChild(B);C.tBodies[0].className="show";C.parentNode.style.height="100%";};dp.sh.Utils.ViewSource=function(A){var C=A.parentNode.originalCode;var B=window.open("","_blank","width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=1");C=C.replace(/</g,"&lt;");B.document.write("<pre>"+C+"</pre>");B.document.close();};dp.sh.Utils.ToClipboard=function(A){var B=A.parentNode.originalCode;if(window.clipboardData){window.clipboardData.setData("text",B);alert(dp.sh.Strings.CopiedToClipboard);}};dp.sh.Utils.PrintSource=function(A){var F=A.parentNode;var D=F.processedCode;var B=document.createElement("IFRAME");var E=null;var C=B.style.cssText="position:absolute; width:0px; height:0px; left:-5px; top:-5px;";F.appendChild(B);E=B.contentWindow.document;D=D.replace(/</g,"&lt;");E.open();E.write("<pre>"+D+"</pre>");E.close();B.contentWindow.focus();B.contentWindow.print();F.removeChild(B);};dp.sh.Utils.About=function(){var D=window.open("","_blank","dialog,width=320,height=150,scrollbars=0");var E=D.document;var C=document.getElementsByTagName("style");var A=document.getElementsByTagName("link");E.write(dp.sh.Strings.AboutDialog.replace("{V}",dp.sh.Version));for(var B=0;B<C.length;B++){E.write("<style>"+C[B].innerHTML+"</style>");}for(var B=0;B<A.length;B++){if(A[B].rel.toLowerCase()=="stylesheet"){E.write('<link type="text/css" rel="stylesheet" href="'+A[B].href+'"></link>');}}E.close();D.focus();};dp.sh.Match=function(C,A,B){this.value=C;this.index=A;this.length=C.length;this.css=B;};dp.sh.Highlighter=function(){this.addGutter=true;this.addControls=true;this.collapse=false;this.tabsToSpaces=true;};dp.sh.Highlighter.SortCallback=function(B,A){if(B.index<A.index){return -1;}else{if(B.index>A.index){return 1;}else{if(B.length<A.length){return -1;}else{if(B.length>A.length){return 1;}}}}return 0;};dp.sh.Highlighter.prototype.GetMatches=function(D,C){var B=0;var A=null;while((A=D.exec(this.code))!=null){this.matches[this.matches.length]=new dp.sh.Match(A[0],A.index,C);}};dp.sh.Highlighter.prototype.AddBit=function(F,C){var D=document.createElement("span");F=F.replace(/&/g,"&amp;");F=F.replace(/ /g,"&nbsp;");F=F.replace(/</g,"&lt;");F=F.replace(/\n/gm,"&nbsp;<br>");if(C!=null){var E=new RegExp("<br>","gi");if(E.test(F)){var A=F.split("&nbsp;<br>");F="";for(var B=0;B<A.length;B++){D=document.createElement("SPAN");D.className=C;D.innerHTML=A[B];this.div.appendChild(D);if(B+1<A.length){this.div.appendChild(document.createElement("BR"));}}}else{D.className=C;D.innerHTML=F;this.div.appendChild(D);}}else{D.innerHTML=F;this.div.appendChild(D);}};dp.sh.Highlighter.prototype.IsInside=function(A){if(A==null||A.length==0){return ;}for(var B=0;B<this.matches.length;B++){var C=this.matches[B];if(C==null){continue;}if((A.index>C.index)&&(A.index<=C.index+C.length)){return true;}}return false;};dp.sh.Highlighter.prototype.ProcessRegexList=function(){for(var A=0;A<this.regexList.length;A++){this.GetMatches(this.regexList[A].regex,this.regexList[A].css);}};dp.sh.Highlighter.prototype.ProcessSmartTabs=function(F){var B=F.split("\n");var A="";var G=4;var D="\t";function H(I,O,M){var N=I.substr(0,O);var L=I.substr(O+1,I.length);var J="";for(var K=0;K<M;K++){J+=" ";}return N+J+L;}function E(I,K){if(I.indexOf(D)==-1){return I;}var L=0;while((L=I.indexOf(D))!=-1){var J=K-L%K;I=H(I,L,J);}return I;}for(var C=0;C<B.length;C++){A+=E(B[C],G)+"\n";}return A;};dp.sh.Highlighter.prototype.SwitchToTable=function(){var C=this.div.innerHTML.replace(/<(br)\/?>/gi,"\n");var J=C.split("\n");var H=null;var E=null;var D=null;var C="";var A=" | ";function G(K,L){return'<a href="#" onclick="dp.sh.Utils.'+K+'(this); return false;">'+L+"</a>";}D=document.createElement("TBODY");this.table.appendChild(D);if(this.addGutter==true){H=D.insertRow(-1);E=H.insertCell(-1);E.className="tools-corner";}if(this.addControls==true){var I=document.createElement("THEAD");this.table.appendChild(I);H=I.insertRow(-1);if(this.addGutter==true){E=H.insertCell(-1);E.className="tools-corner";}E=H.insertCell(-1);E.originalCode=this.originalCode;E.processedCode=this.code;E.className="tools";if(this.collapse==true){D.className="hide";E.innerHTML+="<span><b>"+G("Expand",dp.sh.Strings.ExpandCode)+"</b>"+A+"</span>";}E.innerHTML+=G("ViewSource",dp.sh.Strings.ViewPlain)+A+G("PrintSource",dp.sh.Strings.Print);if(window.clipboardData){E.innerHTML+=A+G("ToClipboard",dp.sh.Strings.CopyToClipboard);}E.innerHTML+=A+G("About",dp.sh.Strings.About);}for(var B=0,F=this.firstLine;B<J.length-1;B++,F++){H=D.insertRow(-1);if(this.addGutter==true){E=H.insertCell(-1);E.className="gutter";E.innerHTML=F;}E=H.insertCell(-1);E.className="line"+(B%2+1);E.innerHTML=J[B];}this.div.innerHTML="";};dp.sh.Highlighter.prototype.Highlight=function(D){function F(I){return I.replace(/^\s*(.*?)[\s\n]*$/g,"$1");}function G(I){return I.replace(/\n*$/,"").replace(/^\n*/,"");}function B(O){var I=O.split("\n");var N=new Array();var L=new RegExp("^\\s*","g");var K=1000;for(var J=0;J<I.length&&K>0;J++){if(F(I[J]).length==0){continue;}var M=L.exec(I[J]);if(M!=null&&M.length>0){K=Math.min(M[0].length,K);}}if(K>0){for(var J=0;J<I.length;J++){I[J]=I[J].substr(K);}}return I.join("\n");}function E(I,K,J){return I.substr(K,J-K);}var H=0;this.originalCode=D;this.code=G(B(D));this.div=document.createElement("DIV");this.table=document.createElement("TABLE");this.matches=new Array();if(this.CssClass!=null){this.table.className=this.CssClass;}if(this.tabsToSpaces==true){this.code=this.ProcessSmartTabs(this.code);}this.table.border=0;this.table.cellSpacing=0;this.table.cellPadding=0;this.ProcessRegexList();if(this.matches.length==0){this.AddBit(this.code,null);this.SwitchToTable();return ;}this.matches=this.matches.sort(dp.sh.Highlighter.SortCallback);for(var C=0;C<this.matches.length;C++){if(this.IsInside(this.matches[C])){this.matches[C]=null;}}for(var C=0;C<this.matches.length;C++){var A=this.matches[C];if(A==null||A.length==0){continue;}this.AddBit(E(this.code,H,A.index),null);this.AddBit(A.value,A.css);H=A.index+A.length;}this.AddBit(this.code.substr(H),null);this.SwitchToTable();};dp.sh.Highlighter.prototype.GetKeywords=function(A){return"\\b"+A.replace(/ /g,"\\b|\\b")+"\\b";};dp.sh.HighlightAll=function(S,Q,O,M,D){function H(){var T=arguments;for(var U=0;U<T.length;U++){if(T[U]==null){continue;}if(typeof (T[U])=="string"&&T[U]!=""){return T[U]+"";}if(typeof (T[U])=="object"&&T[U].value!=""){return T[U].value+"";}}return null;}function N(V,U){for(var T=0;T<U.length;T++){if(U[T]==V){return true;}}return false;}function I(U,Y,T){var W=new RegExp("^"+U+"\\[(\\w+)\\]$","gi");var X=null;for(var V=0;V<Y.length;V++){if((X=W.exec(Y[V]))!=null){return X[1];}}return T;}var E=document.getElementsByName(S);var R=null;var P=new Object();var G="value";if(E==null){return ;}for(var A in dp.sh.Brushes){var L=dp.sh.Brushes[A].Aliases;if(L==null){continue;}for(var K=0;K<L.length;K++){P[L[K]]=A;}}for(var K=0;K<E.length;K++){var B=E[K];var C=H(B.attributes["class"],B.className,B.attributes["language"],B.language);var J="";if(C==null){continue;}C=C.split(":");J=C[0].toLowerCase();if(P[J]==null){continue;}R=new dp.sh.Brushes[P[J]]();B.style.display="none";R.addGutter=(Q==null)?!N("nogutter",C):Q;R.addControls=(O==null)?!N("nocontrols",C):O;R.collapse=(M==null)?N("collapse",C):M;R.firstLine=(D==null)?parseInt(I("firstline",C,1)):D;R.Highlight(B[G]);var F=document.createElement("DIV");F.className="dp-highlighter";F.appendChild(R.table);B.parentNode.insertBefore(F,B);}};dp.sh.Brushes.Xml=function(){this.CssClass="dp-xml";};dp.sh.Brushes.Xml.prototype=new dp.sh.Highlighter();dp.sh.Brushes.Xml.Aliases=["xml","xhtml","xslt","html","xhtml"];dp.sh.Brushes.Xml.prototype.ProcessRegexList=function(){function C(F,E){F[F.length]=E;}var B=0;var A=null;var D=null;this.GetMatches(new RegExp("<\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\]>","gm"),"cdata");this.GetMatches(new RegExp("<!--\\s*.*\\s*?-->","gm"),"comments");D=new RegExp("([\\w-.]+)\\s*=\\s*(\".*?\"|'.*?'|\\w+)*","gm");while((A=D.exec(this.code))!=null){C(this.matches,new dp.sh.Match(A[1],A.index,"attribute"));if(A[2]!=undefined){C(this.matches,new dp.sh.Match(A[2],A.index+A[0].indexOf(A[2]),"attribute-value"));}}this.GetMatches(new RegExp("</*\\?*(?!\\!)|/*\\?*>","gm"),"tag");D=new RegExp("</*\\?*\\s*([\\w-.]+)","gm");while((A=D.exec(this.code))!=null){C(this.matches,new dp.sh.Match(A[1],A.index+A[0].indexOf(A[1]),"tag-name"));}};dp.sh.Brushes.Php=function(){var A="and or xor __FILE__ __LINE__ array as break case cfunction class const continue declare default die do echo else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval exit extends for foreach function global if include include_once isset list new old_function print require require_once return static switch unset use var while __FUNCTION__ __CLASS__";this.regexList=[{regex:new RegExp("//.*$","gm"),css:"comment"},{regex:new RegExp("/\\*[\\s\\S]*?\\*/","g"),css:"comment"},{regex:new RegExp('"(?:[^"\n]|["])*?"',"g"),css:"string"},{regex:new RegExp("'(?:[^'\n]|['])*?'","g"),css:"string"},{regex:new RegExp("\\$\\w+","g"),css:"vars"},{regex:new RegExp(this.GetKeywords(A),"gm"),css:"keyword"}];this.CssClass="dp-c";};dp.sh.Brushes.Php.prototype=new dp.sh.Highlighter();dp.sh.Brushes.Php.Aliases=["php"];dp.sh.Brushes.JScript=function(){var A="abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with";this.regexList=[{regex:new RegExp("//.*$","gm"),css:"comment"},{regex:new RegExp("/\\*[\\s\\S]*?\\*/","g"),css:"comment"},{regex:new RegExp('"(?:[^"\n]|["])*?"',"g"),css:"string"},{regex:new RegExp("'(?:[^'\n]|['])*?'","g"),css:"string"},{regex:new RegExp("^\\s*#.*","gm"),css:"preprocessor"},{regex:new RegExp(this.GetKeywords(A),"gm"),css:"keyword"}];this.CssClass="dp-c";};dp.sh.Brushes.JScript.prototype=new dp.sh.Highlighter();dp.sh.Brushes.JScript.Aliases=["js","jscript","javascript"];dp.sh.Brushes.CSS=function(){var B="abbr acronym address applet area a b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dfn dir div dl dt em fieldset form frame frameset h1 h2 h3 h4 h5 h6 head hr html img i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript ol optgroup option p param pre q s samp script select span strike strong style sub sup table tbody td textarea tfoot th thead title tr tt ul u";var C="ascent azimuth background-attachment background-color background-image background-position background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font height letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans outline-color outline-style outline-width outline overflow-x overflow-y overflow padding-top padding-right padding-bottom padding-left padding page page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position quotes richness right left bottom top size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress table-layout text-align text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index zoom important after filter opacity";var A="progid:DXImageTransform.Microsoft.AlphaImageLoader src sizingMethod alpha opacity above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder both bottom braille capitalize center center-left center-right circle close-quote code collapse compact condensed continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia gray green groove handheld hebrew help hidden hide high higher inline-table inline inset inside invert italic justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset outside overline pointer portrait print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";this.regexList=[{regex:new RegExp("//.*$","gm"),css:"comment"},{regex:new RegExp("/\\*[\\s\\S]*?\\*/","g"),css:"comment"},{regex:new RegExp('"(?:[^"\n]|["])*?"',"g"),css:"string"},{regex:new RegExp("'(?:[^'\n]|['])*?'","g"),css:"string"},{regex:new RegExp("^\\s*.*{","gm"),css:"preprocessor"},{regex:new RegExp("}","gm"),css:"preprocessor"},{regex:new RegExp(this.GetKeywordsCSS(C),"gm"),css:"keyword"},{regex:new RegExp(this.GetValuesCSS(A),"gm"),css:"value"},{regex:new RegExp("(-?\\d+)(.\\d+)?(px|em|pt|:|%|)","g"),css:"value"}];this.CssClass="dp-css";};dp.sh.Highlighter.prototype.GetKeywordsCSS=function(A){var A="\\b([a-z_]|)"+A.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";return A;};dp.sh.Highlighter.prototype.GetValuesCSS=function(A){var A="\\b"+A.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";return A;};dp.sh.Brushes.CSS.prototype=new dp.sh.Highlighter();dp.sh.Brushes.CSS.Aliases=["css"];
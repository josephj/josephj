dp.sh.Brushes.JScript=function(){var A="abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with";this.regexList=[{regex:new RegExp("//.*$","gm"),css:"comment"},{regex:new RegExp("/\\*[\\s\\S]*?\\*/","g"),css:"comment"},{regex:new RegExp('"(?:[^"\n]|["])*"',"g"),css:"string"},{regex:new RegExp("'(?:[^'\n]|['])*'","g"),css:"string"},{regex:new RegExp("^\\s*#.*","gm"),css:"preprocessor"},{regex:new RegExp(this.GetKeywords(A),"gm"),css:"keyword"}];this.CssClass="dp-c";};dp.sh.Brushes.JScript.prototype=new dp.sh.Highlighter();dp.sh.Brushes.JScript.Aliases=["js","jscript","javascript"];
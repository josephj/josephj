dp.sh.Brushes.CSS = function() {
    //Not used yet - added to values
    var tags = 'abbr acronym address applet area a b base basefont bdo big blockquote body br button ' +
            'caption center cite code col colgroup dd del dfn dir div dl dt em fieldset form frame frameset h1 h2 h3 h4 h5 h6 head hr html img i ' +
            'iframe img input ins isindex kbd label legend li link map menu meta noframes noscript ol optgroup option p param pre q s samp script select ' +
            'span strike strong style sub sup table tbody td textarea tfoot th thead title tr tt ul u';
    var keywords =  'ascent azimuth background-attachment background-color background-image background-position ' +
            'background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top ' +
            'border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color ' +
            'border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width ' +
            'border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color ' +
            'content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display ' +
            'elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font ' +
            'height letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top ' +
            'margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans ' +
            'outline-color outline-style outline-width outline overflow-x overflow-y overflow padding-top padding-right padding-bottom padding-left padding page ' +
            'page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position ' +
            'quotes richness right left bottom top size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress ' +
            'table-layout text-align text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em ' +
            'vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index zoom important after filter opacity';

    var values = 'progid:DXImageTransform.Microsoft.AlphaImageLoader src sizingMethod alpha opacity ' +
            'above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder both bottom braille capitalize center center-left center-right circle close-quote code collapse compact condensed '+
            'continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia '+
            'gray green groove handheld hebrew help hidden hide high higher inline-table inline inset inside invert italic justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha '+
            'lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset '+
            'outside overline pointer portrait print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow '+
            'small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal '+
            'text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow';
    

    this.regexList = [
        { regex: new RegExp('//.*$', 'gm'),                         css: 'comment' },           // one line comments
        { regex: new RegExp('/\\*[\\s\\S]*?\\*/', 'g'),             css: 'comment' },           // multiline comments
        { regex: new RegExp('"(?:[^"\n]|[\"])*?"', 'g'),            css: 'string' },            // double quoted strings
        { regex: new RegExp("'(?:[^'\n]|[\'])*?'", 'g'),            css: 'string' },            // single quoted strings
        { regex: new RegExp('^\\s*.*{', 'gm'),                      css: 'preprocessor' },      // everything before a {
        { regex: new RegExp('}', 'gm'),                     css: 'preprocessor' },      // The }
        { regex: new RegExp(this.GetKeywordsCSS(keywords), 'gm'),       css: 'keyword' },       // keywords
        { regex: new RegExp(this.GetValuesCSS(values), 'gm'),       css: 'value' },         // values
        { regex: new RegExp('(-?\\d+)(\.\\d+)?(px|em|pt|\:|\%|)', 'g'),  css: 'value' }        //Sizes
        ];
        //Not used any more
        /*
        { regex: new RegExp('(-?\\d+)(\.\\d+)', 'g'),  css: 'value' },        //Plain Numbers
        { regex: new RegExp('(0(?=;))', 'g'),  css: 'value' }        //Number 0
        { regex: new RegExp('\([.]\)', 'gm'),           css: 'string' },            // Things in parenthesis
        { regex: new RegExp('\\#[a-zA-Z0-9]{3,6}', 'g'),            css: 'colors' },            // html colors  
        { regex: new RegExp(this.GetKeywords(tags), 'g'),       css: 'tags' },          // keywords
        */

    this.CssClass = 'dp-css';
}
dp.sh.Highlighter.prototype.GetKeywordsCSS = function(str) {
    //var str = '\\b' + str.replace(/ /g, '(?=:)\\b|\\b') + '\:\\b';
    var str = '\\b([a-z_]|)' + str.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b';
    //console.log(str);
    return str;
}
dp.sh.Highlighter.prototype.GetValuesCSS = function(str) {
    var str = '\\b' + str.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + '\:\\b';
    //console.log(str);
    return str;
}

dp.sh.Brushes.CSS.prototype = new dp.sh.Highlighter();
dp.sh.Brushes.CSS.Aliases   = ['css'];

/* datagrid */
(function(){
    var DataGrid = function(el,attr){
        attr = attr || {};
        if(arguments.length == 1 && !YAHOO.lang.isString(el) && !el.nodeName){
            attr = el;
            el = el.element || null;
        };
        if(!el && !attr.element){
            el = document.body;
        };
        DataGrid.superclass.constructor.call(this, el, attr);
        _init.call(this);
    };
    YAHOO.extend(DataGrid, YAHOO.util.Element);
    var proto = DataGrid.prototype;
    var $E = YAHOO.util.Event;
    var $D = YAHOO.util.Dom;
    var $C = YAHOO.util.Connect;
    proto.initAttributes = function(attr){
        this.constructor.superclass.initAttributes.call(this, attr);
        this.setAttributeConfig('checkClassName',{
            value:attr.checkClassName||'delete-select'
        });
        this.setAttributeConfig('deleteClassName',{
            value:attr.deleteClassName||'delete-button'
        });
        this.setAttributeConfig('deleteUrl',{
            value:attr.deleteUrl||''
        });
        this.setAttributeConfig('editCallback',{
            value:attr.editCallback||function(){},
            validator:YAHOO.lang.isFunction
        });
        this.setAttributeConfig('editClassName',{
            value:attr.editClassName||'edit-button',
            validator:YAHOO.lang.isArray
        });
        this.setAttributeConfig('errorMsg',{
            value:attr.errorMsg||''
        });
        this.setAttributeConfig('formEl',{
            value:attr.formEl||null,
            validator:YAHOO.lang.isObject
        });
        this.setAttributeConfig('priorityClassNames',{
            value:attr.priorityClassNames||['up-button','down-button'],
            validator:YAHOO.lang.isArray
        });
        this.setAttributeConfig('priorityUrl',{
            value:attr.priorityUrl||''
        });
		this.setAttributeConfig('activeColor',{
            value:attr.activeColor||'#ecf4db'
		});
    };
    var _getParentByTag = function(el,tagName){
        while(el['parentNode']){
            el = el['parentNode'];
            var t = el['tagName'];
            if(t && t.toLowerCase() == tagName.toLowerCase()){
                return el;
            };
        };
        return null;
    };
    var _selectedRows = [];
    var _selectedChecks = [];
    proto.selectAllRows = function(){
        var self = this;
        var el = self.get('element');
        var rowEls = el.tBodies[0].getElementsByTagName('tr');
        for(var i=0,j=rowEls.length;i<j;i++){
            var checkEl = YUD.getElementsByClassName('delete-select','input',rowEls[i])[0];
            if(!checkEl.checked){
                _selectedRows[_selectedRows.length] = rowEls[i];
                _selectedChecks[_selectedChecks.length] = checkEl;
                checkEl.checked = true;
            };
        };
    };
    proto.deselectAllRows = function(){
        var self = this;
        var el = self.get('element');
        var rowEls = el.tBodies[0].getElementsByTagName('tr');
        for(var i=0,j=rowEls.length;i<j;i++){
            var checkEl = YUD.getElementsByClassName('delete-select','input',rowEls[i])[0];
            if(checkEl.checked){checkEl.checked = false;};
        };
        _selectedRows.length = 0;
        _selectedChecks.length = 0;
    };
    var _init = function(){
        var self = this;
        var tableEl = self.get('element');
        self.onRowBeforeAdjust = new YAHOO.util.CustomEvent('rowBeforeAdjust');
        self.onRowBeforeDelete = new YAHOO.util.CustomEvent('rowBeforeDelete');
		self.onRowDeleted = new YAHOO.util.CustomEvent('rowDeleted');
        self.onCheckChange = new YAHOO.util.CustomEvent('checkChange');
        /* row needs to be updated while priority changes or row deleted */
        var updateRow = function(){
            // provide image buttons according to their row
			var rows = tableEl.tBodies[0].rows;
			$D.removeClass(rows,'first');
			$D.removeClass(rows,'last');
			for(var i=0,j=rows.length;i<j;i++){
				var priorityEl = $D.getElementsByClassName('priority','td',rows[i])[0].getElementsByTagName('div')[0];
				switch(true){
					case (i==0):{
						$D.addClass(rows[0],'first');
                        if(rows.length>1){
                            priorityEl.innerHTML = '<a href="?" class="down-button"><img class="down-img" src="http://l.yimg.com/tw.yimg.com/i/tw/ks/i8_coe/btn_down.gif?date=20071226" alt="下"></a>';
                        }
                        else {
                            priorityEl.innerHTML = '';
                        }
						break;
					};
					case (i==rows.length-1):{
						$D.addClass(rows[rows.length-1],'last');
						priorityEl.innerHTML = '<a href="?" class="up-button"><img class="up-img" src="http://l.yimg.com/tw.yimg.com/i/tw/ks/i8_coe/btn_down.gif?date=20071226" alt="上"></a>';
						break;
					};
					default:{
						priorityEl.innerHTML = [
	    					'<a href="?" class="up-button"><img class="up-img" src="http://l.yimg.com/tw.yimg.com/i/tw/ks/i8_coe/btn_up.gif?date=20071226" alt="上"></a>',
							'<a href="?" class="down-button"><img class="down-img" src="http://l.yimg.com/tw.yimg.com/i/tw/ks/i8_coe/btn_down.gif?date=20071226" alt="下"></a>'
						].join('\n');
					};
				};
			};
        };
        $D.generateId(tableEl.getElementsByTagName('tr'));
        /* checkbox select */
        $E.on(tableEl,'click',function(e){
            var targetEl = $E.getTarget(e);
            var checkClass = self.get('checkClassName');
            var rowEl = _getParentByTag(targetEl,'tr');
            if($D.hasClass(targetEl,checkClass)){
                // add to array if checked
                if(targetEl.checked){
                    _selectedRows[_selectedRows.length] = rowEl;
                    _selectedChecks[_selectedChecks.length] = targetEl;
                }
                // remove from array if not checked
                else {
                    for(var i=0,j=_selectedRows.length;i<j;i++){
                        if(_selectedRows[i].id == rowEl.id){
                            _selectedRows.splice(i,1);
                            _selectedChecks.splice(i,1);
                            break;
                        };
                    };
                }
                self.onCheckChange.fire();
            };
        });
        /* batch delete */
        $E.on(tableEl,'click',function(e){
            var targetEl = $E.getTarget(e);
            var deleteClass = self.get('deleteClassName');
            if($D.hasClass(targetEl, deleteClass)){
                $E.stopEvent(e);
                self.onRowBeforeDelete.fire();
                var updateUI = function(){
					var rows = [];
                    for(var i=0,j=_selectedRows.length;i<j;i++){
						$D.setStyle(_selectedRows[i],'background',self.get('activeColor'));
						rows[rows.length] = _selectedRows[i].id;
                        if(i==_selectedRows.length-1){
                            var anim = new YAHOO.util.Motion(_selectedRows[i],{opacity:{to:0}});
                            anim.onComplete.subscribe(function(){
                                while(_selectedRows.length){
                                    var el = _selectedRows.shift();
                                    el.parentNode.removeChild(el);
                                };
                                while(_selectedChecks.length){
                                    var el = _selectedChecks.shift();
                                    el.checked = false;
                                    el.parentNode.removeChild(el);
                                };
                                updateRow();
								self.onRowDeleted.fire(rows);
                            });
                            anim.animate();
                        }
                        else {
                            (new YAHOO.util.Motion(_selectedRows[i].id,{opacity:{to:0}})).animate();
                        };
                    };
                };
                var updateData = function(){
                    if (!_selectedChecks.length) {
                        return;
                    };
                    var formEl = self.get('formEl');
                    var deleteUrl = self.get('deleteUrl');
                    if(!deleteUrl||!formEl){return;}
                    $C.setForm(formEl);
                    $C.asyncRequest('POST',deleteUrl,{
                        success:function(o){
                            if(o.responseText.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g,'') == 'true'){
                                updateUI();
                            }
                            else {
                                if(self.get('errorMsg')){
                                    alert(self.get('errorMsg'));
                                };
                            };
                        },
                        failure:function(o){
                            if(self.get('errorMsg')){
                                alert(self.get('errorMsg'));
                            };
                        }
                    });
                };
                updateData();
            };
        });
        /* priority adjust */
        $E.on(tableEl,'click',function(e){
            var targetEl = $E.getTarget(e);
            var priorityClass = self.get('priorityClassNames');
            if($D.hasClass(targetEl.parentNode,priorityClass[0])||$D.hasClass(targetEl.parentNode,priorityClass[1])){targetEl = targetEl.parentNode;}
            if(($D.hasClass(targetEl,priorityClass[0]) || $D.hasClass(targetEl,priorityClass[1]))){
                $E.stopEvent(e);
                self.onRowBeforeAdjust.fire();
                var direction = ($D.hasClass(targetEl,self.get('priorityClassNames')[0]))?'up':'down';
                var rowEl = _getParentByTag(targetEl,'tr');
				var inputEl = $D.getElementsByClassName('delete-select','input',rowEl)[0];
                var rowId = rowEl.id;
                $D.generateId(rowId);
                var newEl = rowEl.cloneNode(true);
                var index = rowEl.rowIndex;
                var updateUI = function(){
                    for(var i=0,j=_selectedRows.length;i<j;i++){
                        if(rowEl.id == _selectedRows[i].id){
                            _selectedRows.splice(i,1,newEl);
                            _selectedChecks.splice(i,1,$D.getElementsByClassName(self.get('checkClassName'),'*',newEl)[0]);
                            break;
                        };
                    };
                    rowEl.parentNode.removeChild(rowEl);
                    $D.setStyle(newEl,'background',self.get('activeColor'));
                    var targetIndex = (direction=='up')?(index-1):(index+1);
                    var affectEl = tableEl.rows[targetIndex];
					if(targetIndex != tableEl.tBodies[0].rows.length+1){
						tableEl.tBodies[0].insertBefore(newEl, affectEl);
					}
					else {
						tableEl.tBodies[0].appendChild(newEl);
					};
					updateRow();
                    setTimeout(function(){
                        (new YAHOO.util.ColorAnim(newEl,{backgroundColor:{to:'#ffffff'}})).animate();
                    },500);
                };
                var updateData = function(){
                    var formEl = self.get('formEl');
                    var priorityUrl = self.get('priorityUrl');
                    if(!priorityUrl||!formEl){return;}
                    $C.setForm(formEl);
                    $C.asyncRequest('POST',priorityUrl,{
                        success:function(o){
                            if(o.responseText.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g,'') === 'true'){
                                updateUI();
                            }
                            else {
                                if(self.get('errorMsg')){
                                    alert(self.get('errorMsg'));
                                };
                            }
                            //debugger;
                        },
                        failure:function(o){
                            if(self.get('errorMsg')){
                                alert(self.get('errorMsg'));
                            };
                        }
                    },'dir=' + direction + '&id=' + inputEl.value);
                };
                updateData();
            };
        });
        /* edit */
        $E.on(tableEl,'click',function(e){
            var targetEl = $E.getTarget(e);
            var editClass = self.get('editClassName');
            if($D.hasClass(targetEl,editClass)){
                $E.stopEvent(e);
                var rowEl = _getParentByTag(targetEl,'tr');
                if(self.get('editCallback')){
                    self.get('editCallback')(rowEl,targetEl);
                };
            };
        });
    };
    YAHOO.widget.DataGrid = DataGrid;
}());

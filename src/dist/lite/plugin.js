/* Source version: 1.2.17 */
(function(g){var w={Events:{INIT:"lite:init",ACCEPT:"lite:accept",REJECT:"lite:reject",SHOW_HIDE:"lite:showHide",TRACKING:"lite:tracking",CHANGE:"lite:change",HOVER_IN:"lite:hover-in",HOVER_OUT:"lite:hover-out"},Commands:{TOGGLE_TRACKING:"lite-toggletracking",TOGGLE_SHOW:"lite-toggleshow",ACCEPT_ALL:"lite-acceptall",REJECT_ALL:"lite-rejectall",ACCEPT_ONE:"lite-acceptone",REJECT_ONE:"lite-rejectone",TOGGLE_TOOLTIPS:"lite-toggletooltips"}},q={show:true,path:"js/opentip-adapter.js",classPath:"OpentipAdapter",cssPath:"css/opentip.css",delay:500},t="%a by %u %t",h=/^[\s\r\n]*$/,y=[{regex:/[\s]*title=\"[^\"]+\"/g,replace:""},{regex:/[\s]*data-selected=\"[^\"]+\"/g,replace:""}],m=[],x=[g.CTRL+88,g.CTRL+120,g.SHIFT+46],e=false,i=false;function d(H){var D,C,G,F,B,I;if(H.nodeType===ice.dom.ELEMENT_NODE){var E=H.childNodes;for(F=0;F<E.length;++F){I=E[F];d(I);C=I.nodeName.toLowerCase();if(C==="ins"||C==="del"){while(I.firstChild){H.insertBefore(I.firstChild,I)}H.removeChild(I)}}}C=H.nodeName.toLowerCase();if(C==="ins"||C==="del"){D=jQuery.makeArray(H.childNodes)}else{D=[H]}return D}function j(B){if(!B||!B.length){return[]}var C=[];B.forEach(function(D){C=C.concat(d(D))});return C}function o(B){return x.indexOf(B)>=0}function l(B){if(B&&B.$&&(typeof B.getDocument==="function")){return B.$}return B}function n(C){for(var B=m.length;B--;){var D=m[B];if(D.editor==C){return B}}return -1}function c(B){var C=n(B);return C>=0?m[C]:null}function p(B){var C=c(B);return C&&C.plugin}function s(B,C){m.push({plugin:C,editor:B})}function v(D,E,B,G){if(null===D||(typeof(D)=="undefined")){D=""}else{D=String(D)}B=String(B);var F=B.length;for(var C=D.length;C<E;C+=F){if(G){D+=B}else{D=B+D}}return D}function z(B,C){return v(B,C,"0")}function a(D){var C=new Date(),H=C.getDate(),F=C.getMonth(),G=C.getFullYear(),E,I;var J=typeof(D);if(J=="string"||J=="number"){D=new Date(D)}var B=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];if(H==D.getDate()&&F==D.getMonth()&&G==D.getFullYear()){E=Math.floor((C.getTime()-D.getTime())/60000);if(E<1){return"now"}else{if(E<2){return"1 minute ago"}else{if(E<60){return(E+" minutes ago")}else{I=D.getHours();E=D.getMinutes();return"on "+z(I,2)+":"+z(E,2,"0")}}}}else{if(G==D.getFullYear()){return"on "+B[D.getMonth()]+" "+D.getDate()}else{return"on "+B[D.getMonth()]+" "+D.getDate()+", "+D.getFullYear()}}}function u(){if(e){return}e=true;var B=parseFloat(g.version);i=isNaN(B)||B<4.4}function A(D,E){var C,B=E&&E.length;if(!D||!B){return false}for(C=0;C<B;++C){if(D.is(E[C])){return true}}return false}g.plugins.add("lite",{icons:"lite-acceptall,lite-acceptone,lite-rejectall,lite-rejectone,lite-toggleshow,lite-toggletracking",hidpi:true,props:{deleteTag:"del",insertTag:"ins",deleteClass:"ice-del",insertClass:"ice-ins",attributes:{changeId:"data-cid",userId:"data-userid",userName:"data-username",sessionId:"data-session-id",changeData:"data-changedata",time:"data-time",lastTime:"data-last-change-time"},stylePrefix:"ice-cts",preserveOnPaste:"p",css:"css/lite.css"},_scriptsLoaded:null,init:function(I){u();var F=c(I);if(F){return}var N=this.path,H=new f(this.props,N),B=g.tools.extend({},I.config.lite||{}),K=B.tooltips;if(undefined==K){K=true}if(K===true){K=q}B.tooltips=K;s(I,H);H.init(I,B);I.on("destroy",(function(O){var P=n(O);if(P>=0){m.splice(P,1)}}).bind(this));if(this._scriptsLoaded){H._onScriptsLoaded();return}else{if(this._scriptsLoaded===false){return}}this._scriptsLoaded=false;var C=(typeof(jQuery)=="function"),M=this,D=B.jQueryPath||"js/jquery.min.js",E=(B.includeType?B["includes_"+B.includeType]:B.includes)||["lite-includes.js"];E=E.slice();for(var G=0,J=E.length;G<J;++G){E[G]=N+E[G]}if(!C){E.splice(0,0,this.path+D)}if(K.path){E.push(this.path+K.path)}var L=function(){if(E.length<1){M._scriptsLoaded=true;if(!C){jQuery.noConflict()}jQuery.each(m,(function(P,Q){Q.plugin._onScriptsLoaded()}))}else{var O=E.shift();g.scriptLoader.load(O,function(){L()},M)}};L(E)},findPlugin:function(B){return p(B)},startNewSession:function(B){var C=p(B);if(C){C.startNewSession()}else{b("startNewSession: plugin not found")}}});var f=function(B,C){this.props=g.tools.clone(B);this.path=C};f.prototype={init:function(I,E){this._editor=I;this._domLoaded=false;this._editor=null;this._tracker=null;this._isVisible=true;this._liteCommandNames=[];this._canAcceptReject=true;this._removeBindings=[];I.ui.addToolbarGroup("lite");this._setPluginFeatures(I,this.props);this._changeTimeout=null;this._notifyChange=this._notifyChange.bind(this);this._notifyTextChange=this._notifyTextChange.bind(this);this._config=E;var B=E.acceptRejectInReadOnly===true;var C=[{command:w.Commands.TOGGLE_TRACKING,exec:this._onToggleTracking,title:"Toggle Tracking Changes",trackingOnly:false},{command:w.Commands.TOGGLE_SHOW,exec:this._onToggleShow,title:"Toggle Tracking Changes",readOnly:true},{command:w.Commands.ACCEPT_ALL,exec:this._onAcceptAll,title:"Accept all changes",readOnly:B},{command:w.Commands.REJECT_ALL,exec:this._onRejectAll,title:"Reject all changes",readOnly:B},{command:w.Commands.ACCEPT_ONE,exec:this._onAcceptOne,title:"Accept Change",readOnly:B},{command:w.Commands.REJECT_ONE,exec:this._onRejectOne,title:"Reject Change",readOnly:B},{command:w.Commands.TOGGLE_TOOLTIPS,exec:this._onToggleTooltips,readOnly:true}];this._isTracking=E.isTracking!==false;this._eventsBounds=false;I.on("contentDom",(function(M){this._onDomLoaded(M)}).bind(this));I.on("dataReady",(function(M){this._onAfterSetData(M)}).bind(this));var L=this.path;var D=E.commands||[w.Commands.TOGGLE_TRACKING,w.Commands.TOGGLE_SHOW,w.Commands.ACCEPT_ALL,w.Commands.REJECT_ALL,w.Commands.ACCEPT_ONE,w.Commands.REJECT_ONE];var K=this;function H(N){I.addCommand(N.command,{exec:N.exec.bind(K),readOnly:N.readOnly||false});if(N.title&&D.indexOf(N.command)>=0){var M=K._commandNameToUIName(N.command);I.ui.addButton(M,{label:N.title,command:N.command,toolbar:"lite"});if(N.trackingOnly!==false){K._liteCommandNames.push(N.command)}}}for(var G=0,J=C.length;G<J;++G){H(C[G])}if(I.addMenuItems){I.addMenuGroup("lite",50);var F={};F[w.Commands.ACCEPT_ONE]={label:"Accept Change",command:w.Commands.ACCEPT_ONE,group:"lite",order:1,icon:L+"icons/accept_one.png"};F[w.Commands.REJECT_ONE]={label:"Reject Change",command:w.Commands.REJECT_ONE,group:"lite",order:2,icon:L+"icons/reject_one.png"};I.addMenuItems(F)}if(I.contextMenu){I.contextMenu.addListener((function(N){if(N&&this._tracker&&this._tracker.currentChangeNode(N)){var M={};M[w.Commands.ACCEPT_ONE]=g.TRISTATE_OFF;M[w.Commands.REJECT_ONE]=g.TRISTATE_OFF;return M}else{return null}}).bind(this))}},toggleTracking:function(B,C){if("boolean"===typeof C){C={notify:C}}C=C||{};var H=(undefined===B)?!this._isTracking:B,G=this._editor,F=C&&C.force;if(!H&&this._isTracking&&!F){var D=this._tracker.countChanges({verify:true});if(D){return window.alert("Your document containssome pending changes.\nPlease resolve them before turning off change tracking.")}}this._isTracking=H;this._setCommandsState(this._liteCommandNames,H?g.TRISTATE_OFF:g.TRISTATE_DISABLED);this._updateTrackingState();this.toggleShow(H,false);this._setCommandsState(w.Commands.TOGGLE_TRACKING,H?g.TRISTATE_ON:g.TRISTATE_OFF);var E=G.ui.get(this._commandNameToUIName(w.Commands.TOGGLE_TRACKING));if(E){this._setButtonTitle(E,H?"Stop tracking changes":"Start tracking changes")}if(C.notify!==false){G.fire(w.Events.TRACKING,{tracking:H,lite:this})}},toggleShow:function(B,C){var E=(typeof(B)=="undefined")?(!this._isVisible):B;this._isVisible=E;if(this._isTracking){this._setCommandsState(w.Commands.TOGGLE_SHOW,E?g.TRISTATE_ON:g.TRISTATE_OFF)}this._tracker.setShowChanges(E&&this._isTracking);var D=this._editor.ui.get(this._commandNameToUIName(w.Commands.TOGGLE_SHOW));if(D){this._setButtonTitle(D,E?"Hide tracked changes":"Show tracked changes")}if(C!==false){this._editor.fire(w.Events.SHOW_HIDE,{show:E,lite:this})}},isVisible:function(){return this._isVisible},isTracking:function(){return this._isTracking},acceptAll:function(B){this._tracker.acceptAll(B);this._cleanup();this._editor.fire(w.Events.ACCEPT,{lite:this,options:B})},rejectAll:function(B){this._tracker.rejectAll(B);this._cleanup();this._editor.fire(w.Events.REJECT,{lite:this,options:B})},setUserInfo:function(B){B=B||{};this._config.userId=String(B.id);this._config.userName=B.name||"";if(this._tracker){this._tracker.setCurrentUser({id:this._config.userId,name:this._config.userName})}},countChanges:function(B){return((this._tracker&&this._tracker.countChanges(B))||0)},enableAcceptReject:function(B){this._canAcceptReject=!!B;this._onIceChange()},filterIceElement:function(B){if(!B){return true}try{if(B.hasClass(this.props.insertClass)||B.hasClass(this.props.deleteClass)){return false}}catch(B){}return true},startNewSession:function(){var B=new Date();this._sessionId=String.fromCharCode(65+Math.round(Math.random()*26))+B.getDate()+B.getDay()+B.getHours()+B.getMinutes()+B.getMilliseconds();if(this._tracker){this._tracker.setSessionId(this._sessionId)}},getCleanMarkup:function(C){if(null===C||undefined===C){C=(this._editor&&this._editor.getData())||""}for(var B=y.length-1;B>=0;--B){C=C.replace(y[B].regex,y[B].replace)}return C},getCleanText:function(){var B=this._getBody();if(!B){return""}var D=[];D.push("");var C=this._tracker.getDeleteClass();this._getCleanText(B,D,C);var E=D.join("\n");E=E.replace(/&nbsp(;)?/ig," ");return E},acceptChange:function(B){B=l(B);if(B&&this._tracker){this._tracker.acceptChange(B);this._cleanup();this._editor.fire(w.Events.ACCEPT,{lite:this});this._onSelectionChanged(null)}},rejectChange:function(B){B=l(B);if(B&&this._tracker){this._tracker.rejectChange(B);this._cleanup();this._editor.fire(w.Events.REJECT,{lite:this});this._onSelectionChanged(null)}},_getCleanText:function(G,F,E){var D=G.getAttribute("class");if(D&&D.indexOf(E)>=0){return}var B;if(B=((G.nodeName&&G.nodeName.toUpperCase()=="BR")||("block"==jQuery(G).css("display")))){if(h.test(F[F.length-1])){F[F.length-1]=""}else{F.push("")}}for(var H=G.firstChild;H;H=H.nextSibling){var C=H.nodeType;if(3==C){F[F.length-1]+=String(H.nodeValue)}else{if(1==C||9==C||11==C){this._getCleanText(H,F,E)}}}if(B){F.push("")}},_onDomLoaded:function(C){this._domLoaded=true;this._editor=C.editor;var B=this._editor.editable();B.attachListener(B,"mousedown",this._onMouseDown,this,null,1);B.attachListener(B,"keypress",this._onKeyPress,this,null,1);this._hideTooltip();this._onReady()},_onScriptsLoaded:function(){this._scriptsLoaded=true;this._onReady()},_loadCSS:function(E,C){var B=E.getElementsByTagName("head")[0];function D(G,H){var F=jQuery(B).find("#"+H);if(!F.length){F=E.createElement("link");F.setAttribute("rel","stylesheet");F.setAttribute("type","text/css");F.setAttribute("id",H);F.setAttribute("href",G);B.appendChild(F)}}D(this.path+C,"__lite__css__");if(this._config.tooltips.cssPath){D(this.path+this._config.tooltips.cssPath,"__lite_tt_css__")}},_onReady:function(){if(!this._scriptsLoaded||!this._domLoaded){return}setTimeout(this._afterReady.bind(this),5)},_getBody:function(){try{return this._editor.editable().$}catch(B){return null}},_afterReady:function(){var I=this._editor,H=I.document.$,B=this._getBody(),E=this._config,C=(E&&E.debug)||{};this._loadCSS(H,(E&&E.cssPath)||"css/lite.css");if(!this._eventsBounds){this._eventsBounds=true;var G=this._onPaste.bind(this);I.on("afterCommandExec",this._onAfterCommand.bind(this));I.on("beforeCommandExec",this._onBeforeCommand.bind(this));if(this._config.handlePaste){I.on("paste",G,null,null,1)}I.on("beforeGetData",this._onBeforeGetData.bind(this));I.on("beoreUndoImage",this._onBeforeGetData.bind(this));I.on("insertHtml",G,null,null,1);I.on("insertText",G,null,null,1);I.on("insertElement",G,null,null,1);I.on("mode",this._onModeChange.bind(this),null,null,1);I.on("readOnly",this._onReadOnly.bind(this))}if(this._tracker){if(B!=this._tracker.getContentElement()){this._tracker.stopTracking(true);jQuery(this._tracker).unbind();this._tracker=null}}if(this._tracker){return}var D={element:B,mergeBlocks:false,currentUser:{id:E.userId||"",name:E.userName||""},userStyles:E.userStyles,changeTypes:{insertType:{tag:this.props.insertTag,alias:this.props.insertClass,action:"Inserted"},deleteType:{tag:this.props.deleteTag,alias:this.props.deleteClass,action:"Deleted"}},hostMethods:{getHostRange:this._getHostRange.bind(this),getHostRangeData:this._getHostRangeData.bind(this),makeHostElement:function(J){return new g.dom.element(J)},getHostNode:function(J){return J&&J.$},setHostRange:this._setHostRange.bind(this),hostCopy:this._hostCopy.bind(this),beforeEdit:this._beforeEdit.bind(this),notifyChange:this._afterEdit.bind(this)}};if(C.log){D.hostMethods.logError=b}D.tooltips=E.tooltips.show;if(D.tooltips){var F=this._hideTooltip.bind(this);D.hostMethods.showTooltip=this._showTooltip.bind(this);D.hostMethods.hideTooltip=F;D.hostMethods.beforeDelete=D.hostMethods.beforeInsert=F;if(E.tooltips.classPath){try{this._tooltipsHandler=new window[E.tooltips.classPath]();D.tooltipsDelay=E.tooltips.delay}catch(I){}if(!this._tooltipsHandler){b("Unable to create tooltip handler",E.tooltips.classPath)}else{this._tooltipsHandler.init(E.tooltips)}}}jQuery.extend(D,this.props);this._tracker=new ice.InlineChangeEditor(D);try{this._tracker.startTracking();this.toggleTracking(this._isTracking,false);this._updateTrackingState();jQuery(this._tracker).on("change",this._onIceChange.bind(this)).on("textChange",this._onIceTextChanged.bind(this));I.fire(w.Events.INIT,{lite:this});this._onSelectionChanged(null);this._onIceChange(null)}catch(I){b("ICE plugin init:",I)}},_onToggleShow:function(){this.toggleShow()},_onToggleTracking:function(){this.toggleTracking()},_onRejectAll:function(){this.rejectAll()},_onAcceptAll:function(){this.acceptAll()},_onAcceptOne:function(){var B=this._tracker.currentChangeNode();return this.acceptChange(B)},_onRejectOne:function(){var B=this._tracker.currentChangeNode();return this.rejectChange(B)},_onToggleTooltips:function(){this._tracker&&this._tracker.toggleTooltips()},_cleanup:function(){var B=this._getBody(),C=jQuery(B).find(self.insertSelector+":empty,"+self.deleteSelector+":empty");C.remove();this._onSelectionChanged(null)},_setButtonTitle:function(B,D){var C=jQuery("#"+B._.id);C.attr("title",D)},_onAfterCommand:function(C){var B=this._tracker&&this._isTracking&&C.data&&C.data.name;if("undo"==B||"redo"==B){this._tracker.reload()}},_onBeforeCommand:function(C){var B=this._tracker&&this._tracker.isTracking()&&C.data&&C.data.name;if("cut"==B){if(k(this._editor,"copy")){this._tracker.prepareToCut()}}else{if("copy"==B){if(k(this._editor,"copy")){this._tracker.prepareToCopy()}}}},_onModeChange:function(B){this._updateTrackingState();setTimeout(this._onIceChange.bind(this),0)},_onKeyPress:function(B){var C=B&&B.data&&B.data.getKeystroke();if(o(C)){B.stop()}},_onKeyDown:function(B){if(!this._tracker||!this._tracker.isTracking()){return}var C=B.data.keyCode;if(o(C)){if(this._tracker.tryToCut()){B.stop()}}},_onMouseDown:function(){this._hideTooltip()},_onBeforeGetData:function(){this._hideTooltip()},_onAfterSetData:function(){this._hideTooltip();this._processContent();if(this._tracker){this._tracker.reload()}},_onReadOnly:function(){this._updateTrackingState()},_updateTrackingState:function(){if(this._tracker){var B=this._isTracking&&this._editor.mode=="wysiwyg"&&!this._editor.readOnly;this._tracker.toggleChangeTracking(B);for(var D=this._removeBindings.length-1;D>=0;--D){this._removeBindings[D].removeListener()}this._removeBindings=[];this._tracker.unlistenToEvents();if(B){var E=this._onSelectionChanged.bind(this),C=this._editor.editable();if(i){this._tracker.listenToEvents()}else{this._removeBindings.push(this._editor.on("key",function(G){if(this._tracker){var F=G.data.domEvent&&G.data.domEvent.$;return F?this._tracker.handleEvent(F):true}return true}.bind(this)))}this._removeBindings.push(C.on("keyup",this._onSelectionChanged.bind(this,null,false)));this._removeBindings.push(C.on("click",E));this._removeBindings.push(this._editor.on("selectionChange",E))}}},_onPaste:function(L){if(!this._tracker||!this._isTracking||!L){return true}var D=L.data||{},H=false,F=null,K=this._config.ignoreSelectors||[],E=window.jQuery,C=(L.name=="insertElement")&&D.$;if(!D){return}if("string"==typeof D){D={dataValue:D,type:"text"}}if(C){H=C.getAttribute("data-track-changes-ignore")}else{if(D.dataValue&&"html"==(D.type||D.mode)){try{C=jQuery(D.dataValue);H=C&&C.attr("data-track-changes-ignore")}catch(G){}}}if(H){return true}if("string"==typeof D.dataValue){try{var J=this._editor.document.$,B=J.createElement("div");B.innerHTML=String(D.dataValue);B=this._tracker.getCleanDOM(B);if(!B.innerHTML){return true}F=jQuery.makeArray(B.childNodes)}catch(G){b("ice plugin paste:",G)}}else{if(C){F=[C]}else{return true}}if(F&&K.length){F=F.filter(function(M){return !A(E(M),K)})}if(F&&F.length){F=j(F);var I=this._editor.focusManager.hasFocus;this._beforeInsert();this._tracker.insert({nodes:F});this._afterInsert();if(I){this._editor.editable().focus()}L.stop();this._onIceTextChanged()}return true},_setCommandsState:function(B,E){if(typeof(B)=="string"){B=B.split(",")}for(var C=B.length-1;C>=0;--C){var D=this._editor.getCommand(B[C]);if(D){D.setState(E)}}},_onSelectionChanged:function(D,B){var C=this._isTracking&&this._tracker&&this._tracker.isInsideChange(null,null,B),E=C&&this._canAcceptReject?g.TRISTATE_OFF:g.TRISTATE_DISABLED;this._setCommandsState([w.Commands.ACCEPT_ONE,w.Commands.REJECT_ONE],E)},_onIceChange:function(D){var B=this._isTracking&&this._tracker&&this._tracker.hasChanges();var C=B&&this._canAcceptReject?g.TRISTATE_OFF:g.TRISTATE_DISABLED;this._setCommandsState([w.Commands.ACCEPT_ALL,w.Commands.REJECT_ALL],C);this._onSelectionChanged();if(D){this._triggerChange()}},_onIceTextChanged:function(B){this._triggerChange()},_triggerChange:function(){if(!this._changeTimeout){this._changeTimeout=setTimeout(this._notifyChange,1)}},_notifyChange:function(){this._changeTimeout=null;this._editor.fire(w.Events.CHANGE,{lite:this})},_notifyTextChange:function(){this._changeTimeout=null;this._editor.fire("change",{lite:this})},_processContent:function(){var B=this._getBody(),E=window.jQuery,H=this.props.insertTag,D=this.props.deleteTag,C,F;if(!B){return}F=B.ownerDocument;function G(L,I){var K=L.parentNode,J=F.createElement(I);E.each(L.attributes,function(N,M){J.setAttribute(M.name,M.value)});J.className=L.className||"";E(L).contents().appendTo(J);K.insertBefore(J,L);K.removeChild(L)}if(H!=="span"){C=E(B).find("span."+this.props.insertClass);C.each(function(I,J){G(J,H)})}if(D!=="span"){C=E(B).find("span."+this.props.deleteClass);C.each(function(I,J){G(J,D)})}},_commandNameToUIName:function(B){return B.replace(".","_")},_setPluginFeatures:function(G,I){function E(){return[I.deleteClass,I.insertClass,I.stylePrefix+"*"]}function B(){var K=["title"];for(var L in I.attributes){if(I.attributes.hasOwnProperty(L)){var M=I.attributes[L];if((typeof M==="string")&&M.indexOf("data-")===0){K.push(M)}}}return K}function D(K){var L={};K.forEach(function(M){L[M]=true});return L}if(!G||!G.filter||!G.filter.addFeature){return}try{var C=[],J,F;J={};F={};F.classes=D(E());F.attributes=D(B());J[I.insertTag]=F;J[I.deleteTag]=g.tools.clone(F);J.br=g.tools.clone(F);J.br.propertiesOnly=true;J.span=g.tools.clone(F);G.filter.addFeature({name:"lite-features",allowedContent:J})}catch(H){b(H)}},_setHostRange:function(B){var C=this._editor&&this._editor.getSelection();if(C){C.selectRanges([B])}},_afterEdit:function(){this._editor.fire("change");this._editor.fire("saveSnapshot")},_beforeEdit:function(){g.iscutting=true;var C=this._editor,B=function(){C.fire("saveSnapshot")};B();setTimeout(function(){g.iscutting=false},100)},_hostCopy:function(){try{if(g.env.ie){r(this._editor,"copy")}else{this._editor.document.$.execCommand("copy",false,null)}}catch(B){b(B)}},_getHostRange:function(){var D=this._editor&&this._editor.getSelection(),B=D&&D.getRanges(),C=B&&B[0];return C||null},_getHostRangeData:function(B){B=B||this._getHostRange();if(!B){return null}return{startContainer:B.startContainer&&B.startContainer.$,endContainer:B.endContainer&&B.endContainer.$,startOffset:B.startOffset,endOffset:B.endOffset}},_showTooltip:function(C,E){var B=this._config.tooltips;if(B.events){return this._editor&&this._editor.fire(w.Events.HOVER_IN,{lite:this,node:C,changeId:E.changeId})}if(B.show){var D=this._makeTooltipTitle(E);if(this._tooltipsHandler){this._tooltipsHandler.hideAll(this._getBody());this._tooltipsHandler.showTooltip(C,D,this._editor.container.$)}else{C.setAttribute("title",D)}}},_hideTooltip:function(D){var C=this._config.tooltips;if(C.events){return this._editor&&this._editor.fire(w.Events.HOVER_OUT,{lite:this,node:D})}if(this._tooltipsHandler){if(D){this._tooltipsHandler.hideTooltip(D)}else{this._tooltipsHandler.hideAll(this._getBody())}}else{if(this._tracker){if(D){D.removeAttribute("title")}else{var B=this._tracker.getIceNodes();if(B){B.removeAttr("title")}}}}},_beforeInsert:function(){this._editor.fire("saveSnapshot")},_afterInsert:function(){var B=this._editor;B.getSelection().scrollIntoView()},_makeTooltipTitle:function(E){var D=this._config.tooltipTemplate||t,C=new Date(E.time),B=new Date(E.lastTime);D=D.replace(/%a/g,"insert"==E.type?"added":"deleted");D=D.replace(/%t/g,a(C));D=D.replace(/%u/g,E.userName);D=D.replace(/%dd/g,z(C.getDate(),2));D=D.replace(/%d/g,C.getDate());D=D.replace(/%mm/g,z(C.getMonth()+1,2));D=D.replace(/%m/g,C.getMonth()+1);D=D.replace(/%yy/g,z(C.getYear()-100,2));D=D.replace(/%y/g,C.getFullYear());D=D.replace(/%nn/g,z(C.getMinutes(),2));D=D.replace(/%n/g,C.getMinutes());D=D.replace(/%hh/g,z(C.getHours(),2));D=D.replace(/%h/g,C.getHours());D=D.replace(/%T/g,a(B));D=D.replace(/%DD/g,z(B.getDate(),2));D=D.replace(/%D/g,B.getDate());D=D.replace(/%MM/g,z(B.getMonth()+1,2));D=D.replace(/%M/g,B.getMonth()+1);D=D.replace(/%YY/g,z(B.getYear()-100,2));D=D.replace(/%Y/g,B.getFullYear());D=D.replace(/%NN/g,z(B.getMinutes(),2));D=D.replace(/%N/g,B.getMinutes());D=D.replace(/%HH/g,z(B.getHours(),2));D=D.replace(/%H/g,B.getHours());return D}};function b(){var B=window.console;if(B&&B.error){B.error.apply(B,[].slice.call(arguments))}}function k(B,D){if(g.env.ie){return r(B,D)}try{return B.document.$.execCommand(D,false,null)}catch(C){return false}}function r(D,G){var E=D.document,B=E.getBody(),C=false,F,H=function(){C=true};B.on(G,H);F=(g.env.version>7?E.$:E.$.selection.createRange())["execCommand"](G,false);B.removeListener(G,H);return F||C}})(window.CKEDITOR);
/* Copyright (C) 2015 LoopIndex - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the LoopIndex Comments CKEditor plugin license.
 *
 * You should have received a copy of the LoopIndex Comments CKEditor plugin license with
 * this file. If not, please write to: loopindex@gmail.com, or visit http://www.loopindex.com
 * written by (David *)Frenkiel (https://github.com/imdfl) 
 */
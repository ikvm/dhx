/*! dhx 2015-06-07 */
$dhx.ui.crud.simple.View.FormWindow={window:[],strWindowID:"$dhx.ui.crud.simple.View.window.",layout:[],form:[],_window:function(a,b,c){var d,e,f,g,h=$dhx.ui.crud.simple.View.FormWindow;c.form.template.length>9?(d=$dhx.getPagePosition("x",990,430),e=$dhx.getPagePosition("y",990,430),f=990,g=430):(d=$dhx.ui.crud.simple.View.settings.FormWindow.window.left,e=$dhx.ui.crud.simple.View.settings.FormWindow.window.top,f=$dhx.ui.crud.simple.View.settings.FormWindow.window.width,g=$dhx.ui.crud.simple.View.settings.FormWindow.window.height),h.window[a]=new $dhx.ui.window({id:h.strWindowID+a,left:d,top:e,width:f,height:g}),h.window[a].button("park").hide(),h.window[a].button("minmax").hide(),h.window[a].button("stick").hide(),h.window[a].attachEvent("onClose",function(c){return b.unbind.form({component:h.form[a],component_id:"$dhx.ui.crud.simple.View.form."+a+".",onSuccess:function(){h.form[a].unload(),h.form[a]=null},onFail:function(){$dhx.ui.crud.simple.View.settings.status_bar._setStatusError("could not unbind from")}}),!0}),h.window[a].setText(h.table[a].CFC()+" - "+$dhx.ui.language.Filloutthefields),h.status_bar=h.window[a].attachStatusBar()},_layout:function(a,b){var c=$dhx.ui.crud.simple.View.FormWindow;c.layout[a]=c.window[a].attachLayout($dhx.ui.crud.simple.View.settings.FormWindow.layout),c.layout[a].cells("a").hideHeader()},_form:function(a,b,c){var d=$dhx.ui.crud.simple.View.FormWindow,e=$dhx.extend($dhx.ui.crud.simple.View.settings.FormWindow.form);if(b.form.template.length<=9)e.template[1].list[0].list=b.form.template,e.template[1].list[2].list=[];else{e.template[1].list[2].list=[],e.template[1].list[0].list=[];for(var f=0;f<b.form.template.length;f++){var g=b.form.template[f];f%2?e.template[1].list[2].list.push(g):e.template[1].list[0].list.push(g)}}d.form[a]=d.layout[a].cells("a").attachForm(e.template),$dhx.isNumber(a)?d.form[a].isEditing=!0:d.form[a].isEditing=!1,c.bind.form({component:d.form[a],component_id:"$dhx.ui.crud.simple.View.form."+a+".",prepare:{settings:e},onSuccess:function(){},onFail:function(){$dhx.ui.crud.simple.View.settings.status_bar._setStatusError("could not bind form")}})},table:[],render:function(a){var b=$dhx.ui.crud.simple.View.FormWindow;a=a||{};var c="undefined"==typeof a.record_id?"new_"+a.table:a.record_id;if(b.table[c]=a.table,$dhx.ui.window_manager.isWindow(b.strWindowID+c))return b.window[c].show(),void b.window[c].bringToTop();var d=$dhx.ui.data.model.settings[a.database][a.table];console.log(),$dhx.showDirections("starting view ... "),b._window(c,a.schema,d),b._layout(c),b._form(c,d,a.schema),a.fnCallBack&&a.fnCallBack(),$dhx.hideDirections()}};
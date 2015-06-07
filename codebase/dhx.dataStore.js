/*! dhx 2015-06-07 */
$dhx.dataStore=function(a){var b=a,c=this;if("Explorer"==$dhx.Browser.name&&$dhx.Browser.version<9)return $dhx._enable_log&&console.log("You need IE 9 or greater. "),dhtmlx.message({type:"error",text:"You need IE 9 or greater."}),void c.showDirections("BROWSER_VERSION_OUT_TO_DATE");if("undefined"==typeof b.data_set_name||0===b.data_set_name.length)return dhtmlx.message({type:"error",text:"data_set_name is missing when creating a dataset"}),void(b.onFail&&b.onFail("data_set_name is missing when creating a dataset"));if("undefined"==typeof b.primary_key||0===b.primary_key.length)return dhtmlx.message({type:"error",text:"primary_key is missing when creating a dataset"}),void(b.onFail&&b.onFail("primary_key is missing when creating a dataset"));try{if(b.api_service=b.api_service||!1,b.api_service&&(b.api_service.end_point=b.api_service.end_point||!1,b.api_service.get_colletion_end_point=b.api_service.get_colletion_end_point||(b.api_service.end_point?b.api_service.end_point:!1),b.api_service.get_end_point=b.api_service.get_end_point||(b.api_service.end_point?b.api_service.end_point:!1),b.api_service.post_end_point=b.api_service.post_end_point||(b.api_service.end_point?b.api_service.end_point:!1),b.api_service.put_end_point=b.api_service.put_end_point||(b.api_service.end_point?b.api_service.end_point:!1),b.api_service.del_end_point=b.api_service.del_end_point||(b.api_service.end_point?b.api_service.end_point:!1),b.api_payload=b.api_payload||""),b.api_service.get_colletion_end_point||b.api_service.get_end_point||b.api_service.post_end_point||b.api_service.put_end_point||b.api_service.del_end_point||(b.api_service=!1),b.overwrite=b.overwrite||!1,"undefined"==typeof b.data&&(b.data=[]),$dhx.isArray(b.data)?b.data=b.data:b.data=[],b.sync=(b.sync&&$dhx.isArray(b.sync)?b.sync:[])||[],b.bind=(b.bind&&$dhx.isArray(b.bind)?b.bind:[])||[],b.cursorPosition=null,b.onSuccess=b.onSuccess||!1,b.onFail=b.onFail||!1,"undefined"!=typeof $dhx.jDBd.data_sets[b.data_set_name]&&1!=b.overwrite)return dhtmlx.message({type:"error",text:"the dataset"+b.data_set_name+" already exists. It was not overwrited."}),void(b.onSuccess&&b.onSuccess($dhx.jDBd.data_sets[b.data_set_name]));if(b.api_service){if("disconnected"==$dhx.REST.API.auth_status)return dhtmlx.message({type:"error",text:"please login into REST.API before creating datasets"}),void(b.onFail&&b.onFail("please login into REST.API before creating datasets"));b.api_service.get_colletion_end_point?(b.api_service.api_payload=b.api_service.api_payload||"",$dhx._enable_log&&console.time("fetch end point data"),$dhx.REST.API.get({resource:b.api_service.get_colletion_end_point,format:"json",payload:b.api_service.api_payload,onSuccess:function(a){$dhx._enable_log&&console.timeEnd("fetch end point data");var d=JSON.parse(a.response);"success"==d.status?($dhx.isArray(d[b.api_service.collection_name])?b.data=d[b.api_service.collection_name]:b.data=[],c._create()):c._create()},onFail:function(a){dhtmlx.message({type:"error",text:a}),c._create()}})):c._create(b)}else c._create(b)}catch(d){b.onFail&&b.onFail(d.stack)}this._create=function(){var c=$dhx.jDBd;$dhx._enable_log&&console.time("create dataset "+a.data_set_name),$dhx._enable_log&&console.time("sorting dataset "+b.data_set_name),a.data.sort(function(a,c){return a[b.primary_key]-c[b.primary_key]}),$dhx._enable_log&&console.timeEnd("sorting dataset "+b.data_set_name),$dhx.jDBdStorage.storeObject(b.data_set_name+".data",a.data),$dhx._enable_log&&console.time("self.data_sets "+b.data_set_name),c.data_sets[b.data_set_name]={data_set_name:b.data_set_name,primary_key:a.primary_key,api_service:a.api_service,onSuccess:a.onSuccess,onFail:a.onFail,_synced_components:[],_bound_components:[]},$dhx._enable_log&&console.timeEnd("self.data_sets "+b.data_set_name),$dhx._enable_log&&console.time("define properties for "+b.data_set_name),Object.defineProperty(c.data_sets[b.data_set_name],"data",{get:function(){return $dhx.jDBdStorage.get(b.data_set_name+".data")},set:function(a){$dhx.jDBdStorage.saveDatabase(b.data_set_name+".data",a)}}),Object.defineProperty(this,"data",{get:function(){return $dhx.jDBdStorage.get(b.data_set_name+".data")}}),$dhx._enable_log&&console.timeEnd("define properties for "+b.data_set_name),$dhx._enable_log&&console.timeEnd("create dataset "+b.data_set_name),$dhx._enable_log&&console.time("execute onSuccess callback function"),a.onSuccess&&a.onSuccess(c.data_sets[a.data_set_name]),$dhx._enable_log&&console.timeEnd("execute onSuccess callback function")},this.sync=function(a){a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.sync(a)},this.bind=function(a){a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.bind(a)},this.unbind=function(a){a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.unbind(a)},this.insert=function(a,c){a.data_set_name=b.data_set_name,$dhx.jDBd.insert(a,c)},this.update=function(a){a.data_set_name=b.data_set_name,$dhx.jDBd.update(a)},this.del=function(a){a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.del(a)},this.get=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.get(a)},this.getCurrentRecord=function(a){return a.data_set_name=b.data_set_name,$dhx.jDBd.getCurrentRecord(a)},this.deleteCurrentRecord=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.deleteCurrentRecord(a)},this.getCursor=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.getCursor(a)},this.getDataForGrid=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.getDataForGrid(a)},this.getRecord=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.getRecord(a)},this.setCursor=function(a){return a.data_set_name=b.data_set_name,$dhx.jDBd.setCursor(a)},this.item=function(a){return a.data_set_name=b.data_set_name,a.record_id=a.record_id,$dhx.jDBd.getRecord(a)},this.dataCount=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.dataCount(a)},this.exists=function(a){return a.data_set_name=b.data_set_name,$dhx.jDBd.exists(a)},this.filter=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.filter(a)},this.first=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.first(a)},this.idByIndex=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.idByIndex(a)},this.indexById=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.indexById(a)},this.last=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.last(a)},this.next=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.next(a)},this.previous=function(a){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.previous(a)},this.remove=function(a){a.data_set_name=b.data_set_name,$dhx.jDBd.del(a)},this.add=function(a,c){a.data_set_name=b.data_set_name,$dhx.jDBd.insert(a,c)},this.sort=function(){return a=a||{},a.data_set_name=b.data_set_name,$dhx.jDBd.sort(a)}};
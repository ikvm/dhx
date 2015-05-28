/*! dhx 2015-05-27 */
$dhx.REST={API:{appName:"REST API Javascript client",version:.1,apiURL:"http://api.dhtmlx.com.br",apiURLdev:"http://api.web2.eti.br:3000",apiURLtest:"http://api.web2.eti.br:3000",OS:"linux",token:"-",date_expiration:0,user:"nobody",http_user:!1,http_secret:!1,auth_status:"disconnected",request:null,isXDR:!1,default_payload:"",getMappedURL:function(a){var b=$dhx.REST.API;return resource=a.resource||!1,type=a.responseType||!1,params=a.params||!1,resource=resource||null,null===resource?null:(type=type||"json",type=type.toLowerCase(),"json"!=type&&"xml"!=type&&"yaml"!=type&&(type=type||"json"),params=params||"",""!=params&&(params="&"+params),b.apiURL+""+resource+"."+type+"?company_id="+b.company_id+"&token="+b.token+params)},XMLHttpFactories:[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],createHttpConnection:function(){for(var a=$dhx.REST.API,b=!1,c=0;c<a.XMLHttpFactories.length;c++){try{b=a.XMLHttpFactories[c]()}catch(d){console.log(d.stack);continue}break}return b},startAjax:function(){var a=$dhx.REST.API;a.request=a.createHttpConnection()},queue:[],inProgress:!1,process_queue:function(a){var b=$dhx.REST.API;if(b.queue.length>-0){b.inProgress=!0;var c=b.queue.shift();c.sync=c.sync||!1;var d={method:c.method,url:c.url,payload:c.payload,sync:c.sync,success:function(d){c.success(d),b.process_queue(a),b.inProgress=!1},error:function(d){c.error(d),b.process_queue(a),b.inProgress=!1},format:c.format};c.user&&d.user,c.user,c.secret&&d.secret,c.secret,b.fetch(d)}else $dhx.hideDirections(),a&&a()},ajax:function(a){var b=$dhx.REST.API;b.queue.push(a),a.user?$dhx.REST.API.http_user=a.user:$dhx.REST.API.http_user=!1,a.secret?$dhx.REST.API.http_secret=a.secret:$dhx.REST.API.http_secret=!1,b.inProgress||b.process_queue()},fetch:function(a){var b=$dhx.REST.API,c=window.location.href,d=c.split("/"),e=(d[0]+"//"+d[2],1);try{if(null==b.request&&b.startAjax(),!b.request)return;if(a.url=a.url.replace(/\?&/gi,"?"),"?"==a.url.charAt(a.url.length-1)?a.url=a.url.substr(0,a.url.length-1):null,a.sync?b.request.open(a.method,a.url,!1):b.request.open(a.method,a.url,!0),b.request.setRequestHeader("Content-type","GET"!=a.method?"application/x-www-form-urlencoded":"text/plain"),b.request.setRequestHeader("X-Company-ID",$dhx.REST.API.company_id||0),b.request.setRequestHeader("X-Company-Branch-ID",$dhx.REST.API.company_branch_id||0),b.request.setRequestHeader("X-Person-Group",$dhx.REST.API.group||0),b.request.setRequestHeader("X-Person-ID",$dhx.REST.API.person_id||0),b.request.setRequestHeader("X-client-session-id",$dhx.REST.API.client_session_id||0),b.request.setRequestHeader("X-browser-name",$dhx.Browser.name),b.request.setRequestHeader("X-browser-version",$dhx.Browser.version),b.request.setRequestHeader("X-browser-os",$dhx.Browser.OS),b.request.setRequestHeader("X-browser-screen-width",screen.width),b.request.setRequestHeader("X-browser-screen-height",screen.height),b.request.setRequestHeader("X-branch","test"==$dhx.environment?$dhx.environment:"dev"==$dhx.environment?$dhx.environment:"production"==$dhx.environment?$dhx.environment:"test"),b.request.setRequestHeader("X-Requested-With",$dhx.REST.API.appName+" "+$dhx.REST.API.version),$dhx.REST.API.http_user&&$dhx.REST.API.http_secret?(b.request.setRequestHeader("Authorization","Basic "+$dhx.crypt.base64_encode($dhx.REST.API.http_user+":"+$dhx.REST.API.http_secret)),b.request.setRequestHeader("X-Authorization","Basic "+$dhx.crypt.base64_encode($dhx.REST.API.http_user+":"+$dhx.REST.API.http_secret))):(b.request.setRequestHeader("Authorization","Digest "+$dhx.crypt.base64_encode($dhx.REST.API.token)),b.request.setRequestHeader("X-Authorization","Digest "+$dhx.crypt.base64_encode($dhx.REST.API.token))),b.request.onerror=function(){console.log(b.request),console.log(b.request.status);var c="Error",d=b.request.status;0==b.request.status&&(c=""+b.apiURL+" is offline",d=503),a.error&&a.error({statusText:b.request.statusText,status:d,response:'{"response":"'+c+'","status":"err"}',responseType:"json",responseXML:null,responseText:'{"response":"'+c+'","status":"err"}'})},b.request.ontimeout=function(){a.error&&a.error(b.request)},b.request.onreadystatechange=function(){if($dhx._enable_log&&console.log("=========  state changed =========="),$dhx._enable_log&&console.log(b.request.readyState),$dhx._enable_log&&console.log(b.request.status),4==b.request.readyState||404==b.request.status||401==b.request.status){if(4==b.request.readyState){if($dhx._enable_log&&console.timeEnd("response received in"),0==b.request.status)return dhtmlx.message({type:"error",text:"The API branch ("+b.apiURL+") is offline"}),$dhx._enable_log&&console.warn("503 - Service Unavailable"),void console.warn("error: request status: "+b.request.status+". could not reach "+a.url);if(400==b.request.status)return dhtmlx.message({type:"error",text:"bad request"}),$dhx._enable_log&&console.warn("400 - Bad request"),void(a.error&&a.error(b.request));if(401==b.request.status){dhtmlx.message({type:"error",text:"unauthorized access"});try{var c=JSON.parse(b.request.response);"err"==c.status?($dhx._enable_log&&console.warn(c.response),$dhx._enable_log&&console.debug(b.request)):console.log(d.stack)}catch(d){$dhx._enable_log&&console.warn("401 - Unauthorized")}return void(a.error&&a.error(b.request))}if(404==b.request.status)return dhtmlx.message({type:"error",text:"resource not found"}),$dhx._enable_log&&console.warn("404 - Not found"),void(a.error&&a.error(b.request));if("undefined"==typeof b.request.response&&(b.request.response=b.request.responseText),500==b.request.status){try{var c=JSON.parse(b.request.response);"err"==c.status&&(console.warn(c.response),console.debug(b.request))}catch(d){console.warn("internal server error: server side error. request status: "+b.request.status)}return $dhx.progressOff("processing data packet number "+e),void(a.error&&a.error(b.request))}if(502==b.request.status)return console.warn("bad gateway: API server is offline"),void(a.error&&a.error(b.request));if(503==b.request.status)return console.warn("service unavailable: API server is offline"),void(a.error&&a.error(b.request));if(200==b.request.status)if($dhx._enable_log&&4==b.request.readyState&&console.warn(b.request.readyState+" "+b.request.statusText+" downloaded. responseText holds complete data from "+a.url+". "),$dhx.progressOff("ready ..."),a.format="json")try{var c=JSON.parse(b.request.response);if("err"==c.status)console.log("error message : ",c.response),a.error&&a.error(b.request);else try{a.success&&a.success(b.request)}catch(d){$dhx._enable_log&&console.warn(d.stack||d.message),$dhx._enable_log&&console.warn("error on callback function"),a.error&&a.error(b.request)}}catch(d){$dhx._enable_log&&console.warn("unevaluable JSON: ",b.request),$dhx._enable_log&&console.warn(d.stack||d.message);var c={response:b.request};a.error&&a.error(JSON.stringify(c))}else a.success&&a.success(b.request)}}else try{$dhx._enable_log&&(2==b.request.readyState?($dhx._enable_log&&console.log(b.request.readyState+" "+b.request.statusText+" sent request to "+a.url+" "),$dhx.progressOn("sending request ...")):3==b.request.readyState&&($dhx._enable_log&&console.log(b.request.readyState+" "+b.request.statusText+" processing and receiving data packet number "+e+" from "+a.url+". "),$dhx.progressOn("processing data packet number "+e),e+=1))}catch(d){}},4==b.request.readyState&&0!=b.request.status)return;try{$dhx._enable_log&&console.time("response received in"),$dhx._enable_log&&console.warn("-----REST client log-----"),$dhx._enable_log&&console.warn(b.request.readyState+" set up "+a.method+" request for "+a.url),window.setTimeout(function(){b.request.send(a.payload)},500)}catch(f){$dhx._enable_log&&console.warn(f.stack||f.message),$dhx._enable_log&&console.warn(b.request),a.error&&a.error(b.request)}}catch(f){}},post:function(a){var b=$dhx.REST.API;"undefined"==typeof a.payload?a.payload=$dhx.REST.API.default_payload?$dhx.REST.API.default_payload:null:"string"==typeof a.payload?""==a.payload?a.payload=$dhx.REST.API.default_payload?$dhx.REST.API.default_payload:null:a.payload=($dhx.REST.API.default_payload?$dhx.REST.API.default_payload+"&":"")+a.payload:a.payload=$dhx.REST.API.default_payload?$dhx.REST.API.default_payload:null,$dhx.isFunction(a.onSuccess)||(a.onSuccess=!1),$dhx.isFunction(a.onFail)||(a.onFail=!1),"undefined"==typeof a.format&&(a.format="json"),"json"!=a.format&&"yaml"!=a.format&&"xml"!=a.format&&(a.format="json"),"undefined"==typeof a.sync&&(a.sync=!1),b.ajax({method:"POST",url:b.apiURL+a.resource+"."+a.format+"?",payload:a.payload,success:a.onSuccess,error:a.onFail,format:a.format,sync:a.sync})},insert:function(a){var b=$dhx.REST.API;b.post(a)},put:function(a){var b=$dhx.REST.API;"undefined"==typeof a.payload?a.payload=$dhx.REST.API.default_payload?$dhx.REST.API.default_payload:null:"string"==typeof a.payload?""==a.payload?a.payload=$dhx.REST.API.default_payload?$dhx.REST.API.default_payload:null:a.payload=($dhx.REST.API.default_payload?$dhx.REST.API.default_payload+"&":"")+a.payload:a.payload=$dhx.REST.API.default_payload?$dhx.REST.API.default_payload:null,$dhx.isFunction(a.onSuccess)||(a.onSuccess=!1),$dhx.isFunction(a.onFail)||(a.onFail=!1),"undefined"==typeof a.format&&(a.format="json"),"json"!=a.format&&"yaml"!=a.format&&"xml"!=a.format&&(a.format="json"),"undefined"==typeof a.sync&&(a.sync=!1),b.ajax({method:"PUT",url:b.apiURL+a.resource+"."+a.format+"?",payload:a.payload,success:a.onSuccess,error:a.onFail,format:a.format,sync:a.sync})},update:function(a){var b=$dhx.REST.API;b.put(a)},get:function(a){var b,c=$dhx.REST.API;$dhx.isFunction(a.onSuccess)||(a.onSuccess=!1),$dhx.isFunction(a.onFail)||(a.onFail=!1),"undefined"==typeof a.format&&(a.format="json"),"json"!=a.format&&"yaml"!=a.format&&"xml"!=a.format&&(a.format="json"),"undefined"==typeof a.payload&&(a.payload=""),b=""==a.payload?c.apiURL+a.resource+"."+a.format+"?"+($dhx.REST.API.default_payload?"&"+$dhx.REST.API.default_payload:""):c.apiURL+a.resource+"."+a.format+"?"+(a.payload?"&"+a.payload:"")+($dhx.REST.API.default_payload?"&"+$dhx.REST.API.default_payload:""),"undefined"==typeof a.sync&&(a.sync=!1),c.ajax({method:"GET",url:b,payload:null,success:a.onSuccess,error:a.onFail,format:a.format,sync:a.sync})},list:function(a){var b=$dhx.REST.API;b.get(a)},del:function(a){var b,c=$dhx.REST.API;"undefined"==typeof a.payload&&(a.payload=null),$dhx.isFunction(a.onSuccess)||(a.onSuccess=!1),$dhx.isFunction(a.onFail)||(a.onFail=!1),"undefined"==typeof a.format&&(a.format="json"),"json"!=a.format&&"yaml"!=a.format&&"xml"!=a.format&&(a.format="json"),"undefined"==typeof a.sync&&(a.sync=!1),b="undefined"==typeof a.payload?c.apiURL+a.resource+"."+a.format+"?"+($dhx.REST.API.default_payload?"&"+$dhx.REST.API.default_payload:""):c.apiURL+a.resource+"."+a.format+"?"+(a.payload?"&"+a.payload:"")+($dhx.REST.API.default_payload?"&"+$dhx.REST.API.default_payload:""),c.ajax({method:"DELETE",url:b,payload:null,success:a.onSuccess,error:a.onFail,format:a.format,sync:a.sync})},_blockWhenTokenExpires:function(){var a=parseInt($dhx.REST.API.date_expiration);window.setInterval(function(){var b=(new Date).getTime();b>a&&$dhx.showDirections("Expired token. Please login on REST.API again ")},6e4)},showCountDown:function(a){var b,c,d,e,f=parseInt($dhx.REST.API.date_expiration),g=document.getElementById(a);window.setInterval(function(){var a=(new Date).getTime(),h=(f-a)/1e3;b=parseInt(h/86400),h%=86400,c=parseInt(h/3600),h%=3600,d=parseInt(h/60),e=parseInt(h%60),g.innerHTML=c+"h, "+d+"m, "+e+"s"},1e3)},authorize:function(c){function success(a){$dhx.hideDirections(),$dhx.cookie.del("apitemp");var b=JSON.parse(self.request.response);$dhx.REST.API.auth_status=b.auth_data.auth_status,$dhx.REST.API.token=b.auth_data.token,$dhx.REST.API.date_expiration=new Number(b.auth_data.date_expiration)+0,Object.defineProperty($dhx.REST.API,"user",{value:b.auth_data.name,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"user_name",{value:b.auth_data.name,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"client_session_id",{value:b.auth_data.person_id,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"person_id",{value:b.auth_data.person_id,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"group",{value:b.auth_data.group,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"company_id",{value:b.auth_data.company_id,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"company_branch_id",{value:b.auth_data.company_branch_id,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"storage_quota",{value:b.auth_data.storage_quota,enumerable:!0,configurable:!1,writable:!1}),Object.defineProperty($dhx.REST.API,"time_zone",{value:b.auth_data.time_zone,enumerable:!0,configurable:!1,writable:!1}),$dhx.REST.API.default_payload="",$dhx.REST.API.auth_request=a,self._blockWhenTokenExpires(),c.onSuccess&&c.onSuccess(a)}function fail(request){$dhx.cookie.del("apitemp");var response=eval("("+request.response+")");c.onFail&&c.onFail(request),$dhx.showDirections("Error: "+response.response)}var self=$dhx.REST.API,url=window.location.href,arr=url.split("/"),origin=arr[0]+"//"+arr[2];if("-"!=$dhx.REST.API.token){var target_date=parseInt($dhx.REST.API.date_expiration),current_date=(new Date).getTime();if(target_date>current_date)return console.warn("You already are authenticated, bypassing the authorization ... "),void(c.onSuccess&&c.onSuccess($dhx.REST.API.auth_request))}return c.credential_token=$dhx.cookie.get("apitemp"),null==c.credential_token?void $dhx.showDirections("Error: application needs a credential's token to authenticate "):($dhx.showDirections("authenticating through the REST API ... "),c.onSuccess=c.onSuccess||!1,c.onFail=c.onFail||!1,"dev"==$dhx.environment?self.apiURL=self.apiURLdev:"production"==$dhx.environment?self.apiURL=self.apiURL:self.apiURL=self.apiURLtest,2!=$dhx.crypt.base64_decode(c.credential_token).split(":").length?(dhtmlx.message({type:"error",text:"invalid API secret"}),void $dhx.showDirections("Error: invalid API secret")):($dhx.showDirections(" Requesting API authorization ... "),void self.ajax({method:"POST",url:self.apiURL+"/auth.json",payload:"",success:success,error:fail,format:"json",user:$dhx.crypt.base64_decode(c.credential_token).split(":")[0],secret:$dhx.crypt.base64_decode(c.credential_token).split(":")[1]})))}}};
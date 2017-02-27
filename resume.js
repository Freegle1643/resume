//router for lang switching
var router=(function(){

	var route={};

	var getParamFromHash=function(reg,hash){
		return reg.exec(hash).slice(1);
	}

	var matchRoute=function(hash){

		//match a route
		for (var r in route) {

			//make a reg
			var reg=(function(r){
				//make reg for a route
				var regPart=r.replace(/[/,.+\-?$#{}\[\]]/g, '\\$&')
							.replace(/\((.*?)\)/g, '(?:$1)?')
							.replace(/(\/\w?:\w+)+/g, '\/([^/]+)')
							.replace(/\*\w*/g, '([^?]*?)');
					
				return new RegExp('^'+regPart+'$');
			})(r);

			//test reg and trigger if match
			if(reg.test(hash)){

				//what to do when trigger
				var callback=route[r]||function(){};

				var params=getParamFromHash(reg,hash);

				//trigger
				callback.apply(this,params);
			}
		}
	}

	return{
		setRule: function(rule,action){
			route[rule]=action;
		},

		init: function(){
			var hash = location.hash.slice(1) || "default";
			
			matchRoute(hash);

			//set listener
			window.addEventListener("hashchange",function () {

				var hash=location.hash.slice(1);

				matchRoute(hash);
			});
		}
	}
})()

/*

initTask:

taskArr is like: [
	{
		type: "get",
		url: "./get",
		name: "getTask"
	},
	{
		type: "post",
		url: "./post",
		body: {
			"key","value"
		},
		name: "getTask"
	}

]

*/
var multipleAjaxLoader=(function(){

	return {
		initTask: function(taskArr,callback){
			
			var cnt=0;
			var max=taskArr.length;

			var retData={};

			var makeRetData=function(name,data){

				if((typeof name=="string")&&(name.length>0)){
					retData[name]=data;
				}
			}

			var checkComplete=function(){
				cnt++;

				if(cnt>=max){
					callback(retData);
				}
			}

			for(var i=0;i<taskArr.length;i++){(function(i){

				var task=taskArr[i];

				var type=task.type;

				var name=task.name;

				if(type=="get"){

					//must have a name field or the return value will not be returned
					$.get(task.url,function(data){
						makeRetData(name,data);
						checkComplete();
					})

				}else if(type=="post"){

					$.post(task.url,task.body,function(data){
						makeRetData(name,data);
						checkComplete();
					})

				}else{
					//not valid task
					checkComplete();
				}
			})(i)}

		}
	}
})()

//read config
$.get("./config.json",function(config){
	//console.log(config)

	var defaultLang=config.defaultLang;

	var lang=config.lang;

	//set router rules
	router.setRule("default",function(){

		loading.start();

		multipleAjaxLoader.initTask(
			[
				{
					type: "get",
					url: lang[defaultLang].content,
					name: "content"
				},
				{
					type: "get",
					url: lang[defaultLang].constStr,
					name: "constStr"
				}
			],
			function(retData){

				render(retData.content,retData.constStr,function(){
					loading.done();
				});
				
			}
		)
	})

	router.setRule("/:name",function(name){

		loading.start();

		multipleAjaxLoader.initTask(
			[
				{
					type: "get",
					url: lang[name].content,
					name: "content"
				},
				{
					type: "get",
					url: lang[name].constStr,
					name: "constStr"
				}
			],
			function(retData){

				render(retData.content,retData.constStr,function(){
					loading.done();
				});

			}
		)
	})

	router.init();
})


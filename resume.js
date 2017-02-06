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

//renderPage
var renderPage=function(content,constStr){

	//header
	$("#name").html(content.name);
	$("#contact").html(content.contact);
	$("#address").html(content.address);

	//footer
	$("#thisRepo").html(constStr.thisRepo);
	$("#repoAddress").attr({"href":constStr.repoAddress}).html(constStr.repoAddress);

	//education
	$("#educationStr").html(constStr.education);
	$("#educationContent").empty();
	for(var i=0;i<content.education.length;i++){
		$("#educationContent")
		.append(
			$("<div>").addClass("education")
			.append(
				$("<h3>")
				.append($("<span>").addClass("institution").html(content.education[i].institution))
				.append($("<span>").addClass("degree").html(content.education[i].degree))
			)
			.append(
				$("<p>")
				.append($("<span>").html(constStr.educationFrom))
				.append($("<span>").html(content.education[i].from))
			)
			.append(
				$("<p>")
				.append($("<span>").html(constStr.educationUntil))
				.append($("<span>").html(content.education[i].until))
			)
		)
	}

	//skill
	$("#skillStr").html(constStr.skill);
	$("#skillContent").empty();
	for(var i=0;i<content.skill.length;i++){
		$("#skillContent")
		.append(
			$("<div>").addClass("skill")
			.append(
				$("<p>").html(content.skill[i].description)
			)
		)
	}

	//project
	$("#projectStr").html(constStr.project);
	$("#projectContent").empty();
	for(var i=0;i<content.project.length;i++){
		$("#projectContent")
		.append(
			$("<div>").addClass("project")
			.append(
				$("<h3>")
				.append($("<span>").html(constStr.projectName))
				.append($("<span>").html(content.project[i].name))
			)
			.append(
				$("<p>").addClass("position")
				.append($("<span>").html(constStr.projectPosition))
				.append($("<span>").html(content.project[i].position))
			)
			.append(
				$("<p>").addClass("time").html(content.project[i].time)
			)
			.append(
				$("<p>").addClass("description").html(content.project[i].description)
			)
		)
	}
}

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

				renderPage(retData.content,retData.constStr);

				loading.done();
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

				renderPage(retData.content,retData.constStr);

				loading.done();

			}
		)
	})

	router.init();
})



//render
var render=function(content,constStr,callback){

	$.get("./content.pug",function(template){
		//console.log(jade.render(template,{content:content,constStr:constStr}));
		$("#content").html(jade.render(template,{content:content,constStr:constStr}));

		if(typeof callback=="function"){
			callback();
		}
	})
}

//console.log(require("./config.json"));

let pug=require("pug");

let fs=require("fs");

//options related to render
const RENDER_OPTION={
	pretty: false,
};

let render=function(content,constStr,target){

	let rendered=pug.renderFile("./resume.pug", (function(){
		let options={};

		options.content={};
		for(let key in content){
			options.content[key]=content[key];
		}

		options.constStr={};
		for(let key in constStr){
			options.constStr[key]=constStr[key];
		}

		for(let key in RENDER_OPTION){
			options[key]=RENDER_OPTION[key];
		}

		//return the option object for pug
		console.log(options);
		return options;
	})());

	
	fs.writeFile(target,rendered,"utf8",function(err){
		//err
		if(err){
			return console.log(err);
		}

		//console.log("Complete.")
	});

}

//render english ver
render(
	require("./content.json"),
	require("./constStr.json"),
	"./index.html"
);

//render chinese ver
render(
	require("./content_cn.json"),
	require("./constStr_cn.json"),
	"./cn.html"
);
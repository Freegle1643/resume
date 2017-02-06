//console.log(require("./config.json"));

let pug=require("pug");

let fs=require("fs");

const RENDERDIR="./render/"

//options related to render
const RENDER_OPTION={
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
		//console.log(options);
		return options;
	})());

	//remove newlines and tabs
	var minStr=rendered
		.replace(/(\r\n|\n|\r)/gm,"")
		.replace(/\t/g,"")

	fs.mkdir(RENDERDIR,function(err){
		//err
		if(err){

		}else{

		}

		fs.writeFile(target,minStr,"utf8",function(err){
			//err
			if(err){
				return console.log(err);
			}

			console.log("Resume HTML file rendered to:",target)
		});
	});
}

let config=require("./config.json");

//render
for(let name in config.lang){

	var lang=config.lang[name];

	render(
		require(lang.content),
		require(lang.constStr),
		RENDERDIR+name+".html"
	)
}

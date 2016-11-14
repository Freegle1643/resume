//console.log(require("./config.json"));

let pug=require("pug");

let fs=require("fs");

let content=require("./content.json");
let constStr=require("./constStr.json");


const RENDER_OPTION={
	pretty: false,
};

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

//console.log(rendered);

fs.writeFile("./index.html",rendered,"utf8",function(err){
	//err
	if(err){
		return console.log(err);
	}

	console.log("complete render.");
});

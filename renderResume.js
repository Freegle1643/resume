//console.log(require("./config.json"));

let pug=require("pug");

let fs=require("fs");

let config=require("./config.json");

const RENDER_OPTION={
	pretty: false,
};

let rendered=pug.renderFile("./resume.pug", (function(){
	let options={};

	for(let key in config){
		options[key]=config[key];
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

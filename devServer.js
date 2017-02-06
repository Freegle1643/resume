/*
A static http server with express
For the local developement of this project
Also can be used in deploy(if the deploy env do not support static http server itself)
*/

var express = require("express");

var app = express();

//static
app.use(express.static(__dirname));

//inedx.html
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+"index.html"));
});


var server=app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Develop server listening at http://%s:%s",host,port);
});
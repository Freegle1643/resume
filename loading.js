var loading=(function(){

	var swicth=function(flag){
		document.getElementById("loadingMask").style.opacity=(flag)?(1):(0);
		setTimeout(function(){
			document.getElementById("loadingMask").style.display=(flag)?("block"):("none");
		},500)
	}

	return {
		done: function(){
			swicth(false);
		},

		start: function(){
			swicth(true);
		}
	}
})()

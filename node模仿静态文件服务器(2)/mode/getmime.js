exports.getMime=function(fs,getMimeEmitter,EventName,extname){  /*获取后缀名的方法*/
    fs.readFile('mode/mime.json',function(err,data){
		if(err) {
			console.log(err);
			return false;
		}
		var Mines = JSON.parse(data.toString());
		getMimeEmitter.emit(EventName, Mines[extname] || 'text/html');
	}); 
}
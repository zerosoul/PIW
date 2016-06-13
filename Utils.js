var DeviceInfo = require('react-native-device-info');

module.exports = {
	distance(x0,y0,x1,y1){
		return Math.sqrt(Math.pow((x1 - x0),2)+Math.sqrt((y1 - y0),2));
	},
	isLeft(width,x){
		return x<width/2?true:false;
	},
	getModel(){
		var modelStr = DeviceInfo.getModel();
		if(modelStr.indexOf("6s")>0){
			return "6s";
		}
		if(modelStr.indexOf("6")>0){
			return "6";
		}
		if(modelStr.indexOf("5s")>0){
			return "5s";
		}
		if(modelStr.indexOf("5")>0){
			return "5";
		}
		return "6";
	}
}
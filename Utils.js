module.exports = {
	distance(x0,y0,x1,y1){
		return Math.sqrt(Math.pow((x1 - x0),2)+Math.sqrt((y1 - y0),2));
	},
	isLeft(width,x){
		return x<width/2?true:false;
	}
}
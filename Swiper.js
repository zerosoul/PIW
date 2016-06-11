'use strict';
import React,{Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	PanResponder,
	CameraRoll,
	AlertIOS

} from 'react-native';
import Waiting from './Waiting.js';
import Utils from './Utils.js';
var SwiperView = require('react-native-swiper');
var NetworkImage = require('react-native-image-progress');
var Progress = require('react-native-progress');
var {width,height} = Dimensions.get('window');
const DOUBLE_TAP_DELAY = 300; // milliseconds
const DOUBLE_TAP_RADIUS = 20;
export default class Swiper extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isWaitingVisible:false
	  };
	  this.wallsJSON=[];
	  this.currentWallIndex = 0;
	  this.prevTouchInfo = {
		X: 0,
		Y: 0,
		timeStamp: 0
	};
	  this.imagePanResponder = {};
	  this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
	  this.handlePanResponderEnd= this.handlePanResponderEnd.bind(this);
	  this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
	}
	componentWillMount() {
	    this.imagePanResponder = PanResponder.create({
	      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
	      onPanResponderGrant: this.handlePanResponderGrant,
	      onPanResponderRelease: this.handlePanResponderEnd,
	      onPanResponderTerminate: this.handlePanResponderEnd
	    });
	  }
	// shouldComponentUpdate(nextProps,nextState){
	// 	console.log(nextState);
	// 	var {isWaitingVisible} = this.state;
	// 	if(Object.keys(nextState).length === 1 && nextState.isWaitingVisible){
	// 		// this.setState({isWaitingVisible:false});
	// 		return false;
	// 	}
	// 	return false;
	// }
	handleStartShouldSetPanResponder(e, gestureState) {
	    return true;
	}
	handlePanResponderGrant(e,gestureState){
		console.log("手指触摸到屏幕啦~~~");
		var currentTouchTimeStamp = Date.now();

		if( this.isDoubleTap(currentTouchTimeStamp, gestureState) ) 
		  this.saveCurrentWallpaperToCameraRoll();

		this.prevTouchInfo = {
		  X: gestureState.x0,
		  Y: gestureState.y0,
		  timeStamp: currentTouchTimeStamp
		};
	}

	handlePanResponderEnd(){
		console.log("手指离开屏幕啦~~~");
	}
	isDoubleTap(currentTouchTimeStamp, {x0, y0}) {
	  var {X, Y, timeStamp} = this.prevTouchInfo;
	  var dt = currentTouchTimeStamp - timeStamp;

	  return (dt < DOUBLE_TAP_DELAY && Utils.distance(X, Y, x0, y0) < DOUBLE_TAP_RADIUS);
	}
	saveCurrentWallpaperToCameraRoll() {
		this.setState({isWaitingVisible:true});
	  var wallsJSON = this.wallsJSON;
	  var currentWall = wallsJSON[this.currentWallIndex];
	  var currentWallURL = `http://unsplash.it/${currentWall.width}/${currentWall.height}?image=${currentWall.id}`;

	  CameraRoll.saveImageWithTag(currentWallURL)
	  .then((data) => {
	  	this.setState({isWaitingVisible:false});
	    AlertIOS.alert(
	      '保存成功',
	      '壁纸已保存到本地相册',
	      [
	        {text: '好哒!', onPress: () => console.log('OK Pressed!')}
	      ]
	    );
	  })
	  .catch((err) =>{
	    console.log('Error saving to camera roll', err);
	  });

	}
	render(){
		var {data} = this.props;
		var {isWaitingVisible} = this.state;
		this.wallsJSON=data;
		return(
			<View>
			<SwiperView 
				dot={<View style={{
	            backgroundColor:'#666', 
	            width: 8, 
	            height: 8,
	            borderRadius: 10, 
	            marginLeft: 3, 
	            marginRight: 3, 
	            marginTop: 3, 
	            marginBottom: 3,
	            // opacity:viewOpacity
	          }} />}

	          activeDot={<View style={{
	            backgroundColor: '#222', 
	            width: 13, 
	            height: 13, 
	            borderRadius: 7, 
	            marginLeft: 7, 
	            marginRight: 7,
	            // opacity:viewOpacity
	          }} />}
	          loop={false}

	          onMomentumScrollEnd={this.onMomentumScrollEnd}
	          >
				{data.map((wallpaper, index) => {
			        return(
			          <View key={index}>
	                  <NetworkImage
	                    source={{uri:`https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
	                    indicator={Progress.Circle}
	                    indicatorProps={{
	                    	color:'rgba(255,255,255,0.8)',
	                    	size:50,
	                    	thickness:4
	                    }}
	                    style={styles.wallpaperImage}
	                    {...this.imagePanResponder.panHandlers}
	                    >
	                     <Text style={styles.label}>Photo by</Text>
   						 <Text style={styles.label_author_name}>{wallpaper.author}</Text>
	                  </NetworkImage>
	                  
	                </View>
			        );
			      })}
			</SwiperView>
			<Waiting width={width} height={height} isVisible={isWaitingVisible} />
			</View>
			);
	}
	onMomentumScrollEnd(e,state,context){
		console.log("swipe end");
		this.currentWallIndex=state.index;
	}
}
const styles=StyleSheet.create({
wallpaperImage:{
	flex:1,
	width:width,
  	backgroundColor:'#000',
  	height:height
  },
label:{
    position:'absolute',
    color:'#fff',
    fontSize:13,
    backgroundColor:'#000',
    padding:5,
    paddingLeft:8,
    top:20,
    left:20
  },
label_author_name:{
    position:'absolute',
    color:'#fff',
    fontSize:15,
    backgroundColor:'#000',
    padding:5,
    paddingLeft:8,
    top:52,
    left:20,
    fontWeight:'bold'
  }
});
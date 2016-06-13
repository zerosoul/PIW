'use strict'

import React,{Component} from 'react';

import {
  	Text,
	View,
	LayoutAnimation,
	Image,
	Dimensions,
	StyleSheet
} from 'react-native';
import Utils from './Utils.js';

const {width,height}=Dimensions.get('window');
export default class HomeMask extends Component{
	constructor(props) {
	    super(props);
	    // this.state={isHome:false,isLock:false};
	    this.DeviceModel=Utils.getModel();

	}
	 componentWillMount() {
	    // Animate creation
	    LayoutAnimation.spring();
	  }

	render(){
		var {isHome,isLock}=this.props;
		var {homeImage,lockImage}=this.generateSourceObjs();
		if(isHome){
			return(
				<View style={styles.home_container}>
					<Image source={homeImage} style={{width:width,height:height}}/>
				</View>
				)
		}else if(isLock){
			return(
					<View style={styles.home_container}>
						<Image source={lockImage} style={{width:width,height:height}}/>
					</View>
				)
		}else{
			return null;
		}
	}
	generateSourceObjs(){
		var homeImage={};
		var lockImage={};
		switch (this.DeviceModel){
			case "6s":
			homeImage=require('./img/ios/6s/home.png');
			lockImage=require('./img/ios/6s/lock.png');
			case "6":
			homeImage=require('./img/ios/6/home.png');
			lockImage=require('./img/ios/6/lock.png');
			case "5s":
			homeImage=require('./img/ios/5s/home.png');
			lockImage=require('./img/ios/5s/lock.png');
			case "5":
			homeImage=require('./img/ios/5/home.png');
			lockImage=require('./img/ios/5/lock.png');
			default:
			homeImage=require('./img/ios/6/home.png');
			lockImage=require('./img/ios/6/lock.png');

		}
		return {
			homeImage,
			lockImage
		}

	}

}

const styles= StyleSheet.create({
	home_container:{
		width:width,
		height:height,
		position:'absolute',
		top:0,
		left:0,
		backgroundColor:'rgba(255,255,255,0.1)',
	},
	container:{
		width:width,
		height:height,
		position:'absolute',
		top:20,
		left:0,
		backgroundColor:'rgba(255,255,255,0.1)',
	},
	iconContainer:{
		flex:4,
		flexWrap:'wrap',
		flexDirection:'row',
		justifyContent:'space-around',
		// alignItems:'center',
	},
	textContainer:{
		flex:4,
		flexWrap:'wrap',
		flexDirection:'row',
		justifyContent:"space-around"
	},	
	icon:{
		width:width/4 - 15,
		height:width/4 -15,
		// flexShrink:8
		// margin:8
	}
})
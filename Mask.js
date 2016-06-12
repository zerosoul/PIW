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
const {width,height}=Dimensions.get('window');
export default class HomeMask extends Component{
	constructor(props) {
	    super(props);
	    // this.state={isHome:false,isLock:false};
	}
	 componentWillMount() {
	    // Animate creation
	    LayoutAnimation.spring();
	  }
	render(){
		var {isHome,isLock}=this.props;
		if(isHome){
			return(
				<View style={styles.home_container}>
					<Image source={require('./img/ios8.png')} style={{width:width,height:height}}/>
				</View>
				)
		}else if(isLock){
			return(
					<View style={styles.home_container}>
						<Image source={require("./img/ios7.lock.png")} style={{width:width,height:height}}/>
					</View>
				)
		}else{
			return null;
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
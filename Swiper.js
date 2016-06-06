'use strict';


import React,{Component} from 'react';
import {
	View,
	Text

} from 'react-native';

var SwiperView = require('react-native-swiper');

export default class Swiper extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:[]
	  };
	}
	render(){
		var {data} = this.props;
		return(
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
			          <Text key={index}>
			            {wallpaper.author}
			          </Text>
			        );
			      })}
			</SwiperView>
			);
	}
	onMomentumScrollEnd(){
		console.log(this)
	}
}
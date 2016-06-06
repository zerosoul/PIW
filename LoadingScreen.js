'use strict'

import React,{Component} from 'react';
import {
	View,
	ActivityIndicatorIOS,
	Text,
	StyleSheet
} from 'react-native'


export default class LoadingScreen extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render(){
		return(
			<View style={styles.loadingContainer}>
	          <ActivityIndicatorIOS
	            animating={true}
	            color={'#fff'}
	            size={'small'} 
	            style={{margin: 15}} />
	            <Text style={{color: '#fff'}}>正在加载数据...</Text>
	     </View>
		);
	}

}

const styles = StyleSheet.create({
	loadingContainer:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'#000'
	}
});


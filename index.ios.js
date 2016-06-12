
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';
import LoadingScreen from './LoadingScreen.js';
import Swiper from './Swiper.js';
var DeviceInfo = require('react-native-device');
var ShakeEvent = require('react-native-shake-event-ios');
var RandManager = require('./RandManager.js');
const NUM_WALLPAPERS = 5;
class PIW extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      wallsJSON:[],
      isLoading:true
    };
    this.Model=DeviceInfo.model;
  }
  componentWillMount(){
    ShakeEvent.addEventListener('shake',()=>{
      this.initialize();
      this.fetchWallsJSON();  
    });
  }
  componentDidMount(){
    console.log("model:"+this.Model);
    this.fetchWallsJSON();
  }
  render() {
    var {isLoading}=this.state;
    if(isLoading){
      return <LoadingScreen/>;
    }else{
      return this.renderResults();
    }
  }
  renderResults(){
    var {wallsJSON} = this.state;
    return(
        <Swiper data={wallsJSON}>
        </Swiper>
      );
  }
  fetchWallsJSON(){
    var url = 'http://unsplash.it/list';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        console.log(jsonData);
        var randomIds = RandManager.uniqueRandomNumbers(NUM_WALLPAPERS,0, jsonData.length);
        var walls = [];
        randomIds.forEach(randomId => {
          walls.push(jsonData[randomId]);
        });

        this.setState({
          wallsJSON:[].concat(walls),
          isLoading:false
        });
      })
      .catch( error => console.log('获取数据有误：' + error) );
  }
  initialize() {
    this.setState({
      wallsJSON: [],
      isLoading: true,
      isWaitingVisible: false
    });
    this.currentWallIndex = 0;
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('PIW', () => PIW);

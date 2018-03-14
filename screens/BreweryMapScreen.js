import React from 'react';
import { StyleSheet, View,Platform, Dimensions,Image,Alert} from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { MapView, Callout } from 'expo';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Layout from '../constants/Layout';
import Expo from "expo";
import AppIntroSlider from 'react-native-app-intro-slider';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Ionicons } from '@expo/vector-icons';
// @connect((data, props) => BreweryMapScreen.getDataProps(data, props))

 
const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('/home/geogirl/Desktop/Ace-Mobile/screens/img/2.jpeg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('/home/geogirl/Desktop/Ace-Mobile/screens/img/2.jpeg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('/home/geogirl/Desktop/Ace-Mobile/screens/img/2.jpeg'),
    backgroundColor: '#22bcb5',
  }
];

export default class BreweryMapScreen extends React.Component {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width,
    height,
    top:80,
    position:'absolute',
  },
  navigationBarContainer: {
    backgroundColor: '#00A5AA',
    height: Layout.HEADER_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#008F93',
    position: 'absolute',
    overflow: 'hidden',
    paddingTop: Constants.statusBarHeight,
    top: 0,
    left: 0,
    right: 0,
  },
  navigationBarTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  }
});

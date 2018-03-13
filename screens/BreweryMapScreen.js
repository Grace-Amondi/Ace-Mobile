import React from 'react';
import { StyleSheet, View,Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../constants/Layout';
import { Constants } from 'expo';
import {Text} from 'native-base';
import { MapView } from 'expo';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

@connect(data => BreweryMapScreen.getDataProps(data))
export default class BreweryMapScreen extends React.Component {
  static getDataProps(data) {
    return {
      breweries: data.breweries.all,
    };
  }

  render() {
    let { breweries } = this.props;

    return (
      
      <View style={{ flex: 1 }}>
      <View key="navbar" style={styles.navigationBarContainer}>
        <View style={styles.navigationBarTitleContainer}>
        <Text style={{ alignItems:'center',color:'white' }}>Wifi Hotspots</Text>
        </View>
      </View>
        <MapView
          style={styles.map}
          loadingBackgroundColor="#f9f5ed"
          showsUserLocation
          initialRegion={{
            latitude: -1.095621,
            longitude: 37.015379,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {this.props.breweries.map(brewery => {
            let { latitude, longitude, name, isOpen } = brewery;

            return (
              <MapView.Marker
                key={name}
                pinColor={isOpen ? 'green' : 'red'}
                coordinate={{ latitude, longitude }}
                title={name}
              />
            );
          })}
        </MapView>
      </View>

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
});

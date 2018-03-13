import React from 'react';
import { StyleSheet, View,Platform, Dimensions,Image} from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { MapView, Callout } from 'expo';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Layout from '../constants/Layout';
import Expo from "expo";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

@connect(data => BreweryMapScreen.getDataProps(data))
export default class BreweryMapScreen extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.brewery !== this.props.brewery;
  }

  static getDataProps(data) {
    return {
      breweries: data.breweries.all,
    };
  }
  onMarkerPressed(marker) {
    this[marker].showCallout();
  }

  renderCallout(marker) {
    return (
      <MapView.Callout tooltip>
        <View>
        <Container style={{width:200, height:200}}>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image source={{uri: 'http://res.cloudinary.com/acemobile/image/upload/c_thumb,h_260,w_260/v1520781441/20180226_154620.jpg'}} style={{height: 120, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http://res.cloudinary.com/acemobile/image/upload/c_thumb,h_200,w_200/v1520781441/20180226_154620.jpg'}} />
                <Body>
                  <Text style={{ fontSize: 12}}>Assembly Hall</Text>
                  <Text note style={{ fontSize: 12}}>Juja,Kiambu</Text>
                  <Text style={{ fontSize: 12}}> CLOSED</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
        </View>
      </MapView.Callout>
    );
  }

  render() {
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
          showsUserLocation={true}
          initialRegion={{
            latitude: -1.095621,
            longitude: 37.015379,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          ref={(c) => { this.mapViewRef = c; }}>

          {this.props.breweries.map((brewery,i) => {
            let { latitude, longitude, name, isOpen } = brewery;
              
            return (
              <MapView.Marker
                key={name}
                pinColor={isOpen ? '#008F93' : 'red'}
                coordinate={{ latitude, longitude }}
                title={name}
                onPress={() => this.onMarkerPressed(`marker + ${i}`)}
                ref={(c) => { this[`marker + ${i}`] = c; }}
              >{this.renderCallout(brewery)}</MapView.Marker>
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

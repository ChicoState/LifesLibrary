import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View, Dimensions} from 'react-native';

/**
* Exports component for App
*/
export default class Map extends React.Component {
  /**
  * @return {HTML} returns page for DOM
  */
  render() {
    // eslint-disable-next-line react/prop-types
    const {region} = this.props;
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} region={region}
          showsUserLocation showsMyLocationButton
          initialRegion={{
            latitude: 39.7285,
            longitude: -121.8375,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

import React, {createRef} from 'react'
import {StyleSheet, Animated} from 'react-native'
import MapView, {Marker, Region, LatLng} from 'react-native-maps'

import {
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
} from '@constants/coordinates'
import {markers} from '@constants/markers'
import layout from '@constants/layout'
import styles from './styles'

interface Props {
  animatedValue: Animated.Value
  onMarkerPress: (marker: LatLng, index: number) => void
}

interface State {
  region: Region
  markers: {key: number; coordinate: LatLng}[]
}

class Map extends React.Component<Props, State> {
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    markers: markers
  }

  map: React.RefObject<MapView> = createRef()

  animateToIndex = (index: number) => {
    const marker = this.state.markers[index]

    if (marker && this.map.current) {
      this.map.current.animateToCoordinate(marker.coordinate)
    }
  }

  handlePressOnCoordinate = (index: number) => {
    const marker = this.state.markers[index]
    this.props.onMarkerPress(marker.coordinate, index)
  }

  render() {
    const translateY = this.props.animatedValue.interpolate({
      inputRange: [layout.bottom, layout.middle],
      outputRange: [0, -(layout.height - layout.middle) / 2],
      extrapolate: 'clamp'
    })

    return (
      <Animated.View
        style={[styles.container, styles.map, {transform: [{translateY}]}]}>
        <MapView
          ref={this.map}
          loadingEnabled
          initialRegion={this.state.region}
          style={styles.map}>
          {this.state.markers.map((marker, index) => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              onPress={() => this.handlePressOnCoordinate(index)}
            />
          ))}
        </MapView>
      </Animated.View>
    )
  }
}

export default Map

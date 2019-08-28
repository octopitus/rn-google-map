import React, {Component, createRef} from 'react'
import {Animated, TouchableWithoutFeedback, View, Text} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import Swiper from 'react-native-swiper'

import layout from '@constants/layout'
import styles from './styles'

const uri = `https://picsum.photos/${layout.width}/${240}`

interface Props {
  animatedValue: Animated.Value
  onSwipeIndexChanged: (index: number) => void
}

class MapResultList extends Component<Props> {
  currentSwipeIndex = 0
  panel: React.RefObject<SlidingUpPanel> = createRef()
  swiper: React.RefObject<Swiper> = createRef()

  public scrollTo = (index: number) => {
    if (this.swiper.current) {
      // @ts-ignore
      this.swiper.current.scrollBy(index - this.currentSwipeIndex)
    }

    if (
      this.panel.current &&
      // @ts-ignore
      this.props.animatedValue.__getValue() < layout.bottom
    ) {
      this.panel.current.show(layout.bottom)
    }
  }

  private handleSwipeIndexChanged = (index: number) => {
    this.currentSwipeIndex = index
    this.props.onSwipeIndexChanged(index)
  }

  private handlePressOnCover = () => {
    if (this.panel.current) {
      this.panel.current.show(layout.middle)
    }
  }

  private renderImage = (index: number) => {
    const borderRadius = this.props.animatedValue.interpolate({
      inputRange: [layout.bottom, layout.middle],
      outputRange: [24, 0]
    })

    return (
      <Animated.View key={index} style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePressOnCover}>
          <Animated.Image
            source={{uri}}
            style={{width: layout.width, height: 240, borderRadius}}
          />
        </TouchableWithoutFeedback>
        <View style={[styles.container, {backgroundColor: '#fff'}]}>
          <Text>{'Content inside panel ' + index}</Text>
        </View>
      </Animated.View>
    )
  }

  private renderImages = (length: number) => {
    return Array.from({length}, (_, i) => this.renderImage(i))
  }

  render() {
    return (
      <SlidingUpPanel
        ref={this.panel}
        showBackdrop={false}
        animatedValue={this.props.animatedValue}
        draggableRange={{bottom: 0, top: layout.top}}
        snappingPoints={[0, layout.bottom, layout.middle, layout.top]}
        minimumDistanceThreshold={1.24}
        minimumVelocityThreshold={0.36}>
        <Swiper
          ref={this.swiper}
          index={this.currentSwipeIndex}
          onIndexChanged={this.handleSwipeIndexChanged}>
          {this.renderImages(4)}
        </Swiper>
      </SlidingUpPanel>
    )
  }
}

export default MapResultList

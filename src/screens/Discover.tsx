import React, {Component, createRef, forwardRef} from 'react'
import {View, Animated} from 'react-native'
import {NavigationScreenProps} from 'react-navigation'
import SlidingUpPanel from 'rn-sliding-up-panel'

import layout, {panelPoints} from '@constants/layout'
import styles from './styles'

interface Props extends NavigationScreenProps {
  forwardedRef: React.Ref<SlidingUpPanel> | null
  screenProps: {
    onPanelDrag: (state: {value: number}) => void
    searchBarAnimatedValue: Animated.Value
    panelAnimatedValue: Animated.Value
  }
}

class Discover extends Component<Props> {
  dragListener?: string

  render() {
    const {panelAnimatedValue} = this.props.screenProps

    return (
      <SlidingUpPanel
        ref={this.props.forwardedRef}
        animatedValue={panelAnimatedValue}
        snappingPoints={[panelPoints.top, layout.middle, panelPoints.bottom]}
        draggableRange={panelPoints}
        friction={0.75}
        showBackdrop={false}>
        <View style={[styles.container, styles.slidingPanel]} />
      </SlidingUpPanel>
    )
  }
}

export default forwardRef<SlidingUpPanel, Props>((props, ref) => {
  return <Discover {...props} forwardedRef={ref} />
})

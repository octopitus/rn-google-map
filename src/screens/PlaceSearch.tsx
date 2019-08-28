import React, {Component, forwardRef} from 'react'
import {View, ScrollView} from 'react-native'
import {NavigationScreenProps} from 'react-navigation'
import {List} from 'react-native-paper'
import SlidingUpPanel from 'rn-sliding-up-panel'

import {panelPoints} from '@constants/layout'
import styles from './styles'

interface Props extends NavigationScreenProps {
  forwardedRef: React.Ref<SlidingUpPanel> | null
  screenProps: any
}

class PlaceSearch extends Component<Props> {
  render() {
    return (
      <SlidingUpPanel
        snappingPoints={[panelPoints.bottom, panelPoints.top]}
        draggableRange={panelPoints}
        showBackdrop={false}>
        <View style={[styles.container, styles.slidingPanel]}>
          <ScrollView>
            <List.Item
              title="Test"
              description="Mock place"
              left={({color}) => <List.Icon icon="place" color={color} />}
            />
            <List.Item
              title="Test"
              description="Mock place"
              left={({color}) => <List.Icon icon="place" color={color} />}
            />
            <List.Item
              title="Test"
              description="Mock place"
              left={({color}) => <List.Icon icon="place" color={color} />}
            />
            <List.Item
              title="Test"
              description="Mock place"
              left={({color}) => <List.Icon icon="place" color={color} />}
            />
          </ScrollView>
        </View>
      </SlidingUpPanel>
    )
  }
}

export default forwardRef<SlidingUpPanel, Props>((props, ref) => {
  return <PlaceSearch {...props} forwardedRef={ref} />
})

import React, {createRef} from 'react'
import {Animated, InteractionManager} from 'react-native'
import {NavigationScreenProps, StackActions} from 'react-navigation'
import {LatLng} from 'react-native-maps'

import Map from '@components/Map'
import AppStack from '@screens/AppStack'
import SearchBar from '@components/SearchBar'
import layout from '@constants/layout'

type Props = NavigationScreenProps

class App extends React.Component<Props> {
  static router = AppStack

  map: React.RefObject<Map> = createRef()
  navigator: React.RefObject<typeof AppStack> = createRef()
  searchBarAnimatedValue = new Animated.Value(layout.bottom)
  panelAnimatedValue = new Animated.Value(layout.bottom)
  dragListener: string | null = null

  componentDidMount() {
    this.addPanelDragListener()
  }

  private addPanelDragListener = () => {
    if (this.dragListener) {
      return
    }

    this.dragListener = this.panelAnimatedValue.addListener(({value}) => {
      this.searchBarAnimatedValue.setValue(value)
    })
  }

  private removePanelDragListener = () => {
    if (this.dragListener) {
      this.panelAnimatedValue.removeListener(this.dragListener)
      this.dragListener = null
    }
  }

  private navigateBack = async () => {
    await InteractionManager.runAfterInteractions()

    if (this.navigator.current) {
      this.navigator.current.dispatch(StackActions.pop({n: 1}))
    }
  }

  handleMarkerPress = (marker: LatLng, index: number) => {
    this.props.navigation.setParams({swipeIndex: index})
  }

  handleSwipeIndexChanged = (index: number) => {
    if (this.map.current) {
      this.map.current.animateToIndex(index)
    }
  }

  render() {
    const screenProps = {
      map: this.map.current,
      searchBarAnimatedValue: this.searchBarAnimatedValue,
      panelAnimatedValue: this.panelAnimatedValue
    }

    return (
      <>
        <Map
          ref={this.map}
          animatedValue={this.panelAnimatedValue}
          onMarkerPress={this.handleMarkerPress}
        />
        <AppStack
          {...this.props}
          screenProps={screenProps}
          ref={this.navigator}
        />
        <SearchBar
          animatedValue={this.searchBarAnimatedValue}
          onBlur={this.navigateBack}
        />
      </>
    )
  }
}

export default App

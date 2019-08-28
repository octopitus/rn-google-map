import React, {createRef} from 'react'
import {Animated, InteractionManager} from 'react-native'
import {createAppContainer, NavigationScreenProps} from 'react-navigation'
import {LatLng} from 'react-native-maps'

import Map from '@components/Map'
import AppStack from '@screens/AppStack'
import SearchBar from '@components/SearchBar'
import layout from '@constants/layout'
import Transitioner from '@screens/Transitioner'

type Props = NavigationScreenProps

class App extends React.Component<Props> {
  static router = AppStack

  map: React.RefObject<Map> = createRef()
  transitioner: React.RefObject<Transitioner> = createRef()
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
    this.props.navigation.pop()
  }

  private navigateTo = (routeName: string) => {
    return async () => {
      if (!this.transitioner.current) {
        return
      }

      const {state} = this.props.navigation
      const currentRoute = state.routes[state.index].routeName

      const {current: currentSceneRef} = this.transitioner.current.sceneRefs[
        currentRoute
      ]

      if (currentSceneRef) {
        currentSceneRef.hide()
      }
      await InteractionManager.runAfterInteractions()

      this.props.navigation.navigate(routeName)
      await InteractionManager.runAfterInteractions()

      const {current: nextSceneRef} = this.transitioner.current.sceneRefs[
        routeName
      ]

      if (nextSceneRef) {
        nextSceneRef.show(layout.top)
      }
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
        <Transitioner
          {...this.props}
          screenProps={screenProps}
          ref={this.transitioner}
        />
        <SearchBar
          animatedValue={this.searchBarAnimatedValue}
          onFocus={this.navigateTo('PlaceSearch')}
          onBlur={this.navigateBack}
        />
      </>
    )
  }
}

export default createAppContainer(App)

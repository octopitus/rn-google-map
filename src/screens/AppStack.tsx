import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Discover from './Discover'
import PlaceSearch from './PlaceSearch'
import PlaceSearchResult from './PlaceSearchResult'
import PlaceDetail from './PlaceDetail'

const AppStack = createStackNavigator(
  {
    Discover: {
      screen: Discover,
      navigationOptions: () => ({cardTransparent: true})
    },
    PlaceSearch: {
      screen: PlaceSearch,
      navigationOptions: () => ({cardTransparent: true})
    },
    PlaceSearchResult: {
      screen: PlaceSearchResult,
      navigationOptions: () => ({cardTransparent: true})
    },
    PlaceDetail: {
      screen: PlaceDetail,
      navigationOptions: () => ({cardTransparent: true})
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default createAppContainer(AppStack)

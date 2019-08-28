import {StackViewTransitionConfigs, StackRouter} from 'react-navigation'

import layout from '@constants/layout'
import Discover from './Discover'
import PlaceSearch from './PlaceSearch'
import PlaceSearchResult from './PlaceSearchResult'
import PlaceDetail from './PlaceDetail'

const AppStack = StackRouter(
  {
    Discover,
    PlaceSearch,
    PlaceSearchResult,
    PlaceDetail
  },
  {}
)

export default AppStack

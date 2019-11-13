/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native'

import App from './App'
import {name as appName} from './app.json'

YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: `-[RCTRootView cancelTouches]`'
])

AppRegistry.registerComponent(appName, () => App)

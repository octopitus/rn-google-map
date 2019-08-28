import {Dimensions, StatusBar} from 'react-native'
const {width, height} = Dimensions.get('window')

const layout = {
  width,
  height,
  top: height - (StatusBar.currentHeight || 0) - 96,
  middle: height / 2,
  searchBar: 96,
  bottom: 86
}

export const panelPoints = {
  top: layout.height - layout.searchBar,
  bottom: layout.bottom
}

export default layout

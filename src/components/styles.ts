import {StyleSheet} from 'react-native'
import layout from '@constants/layout'
import dropShadow from '@utils/dropShadow'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  searchBar: {
    ...StyleSheet.absoluteFillObject,
    bottom: undefined,
    height: layout.searchBar,
    paddingHorizontal: 12,
    justifyContent: 'center'
  },
  searchBarPlaceholder: {
    backgroundColor: '#fff'
  },
  searchBarBackdrop: {
    ...dropShadow(4)
  },
  searchBarDropShadow: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#868e96'
  },
  bubble: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
})

export default styles

import React, {createRef} from 'react'
import {View, Animated, NativeSyntheticEvent} from 'react-native'
import {Searchbar as PaperSearchBar, SearchbarProps} from 'react-native-paper'

import styles from './styles'
import layout from '@constants/layout'

interface Props extends SearchbarProps {
  animatedValue: Animated.Value
  onBlur?: () => void
  onFocus?: () => void
}

interface State {
  icon: string
}

class SearchBar extends React.PureComponent<Props, State> {
  state = {
    icon: 'search'
  }

  inputRef: React.RefObject<PaperSearchBar> = createRef()

  private onIconPress = () => {
    if (!this.inputRef.current) {
      return
    }

    if (this.inputRef.current.isFocused()) {
      this.inputRef.current.blur()
    }
  }

  private onBlur = () => {
    this.props.onBlur && this.props.onBlur()

    this.setState({icon: 'search'}, () => {
      Animated.timing(this.props.animatedValue, {
        toValue: layout.bottom
      }).start()
    })
  }

  private onFocus = () => {
    this.props.onFocus && this.props.onFocus()

    this.setState({icon: 'arrow-back'}, () => {
      Animated.timing(this.props.animatedValue, {
        toValue: layout.top
      }).start()
    })
  }

  render() {
    const opacity = this.props.animatedValue.interpolate({
      inputRange: [layout.top - layout.searchBar, layout.top],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const backdropOpacity = this.props.animatedValue.interpolate({
      inputRange: [layout.top - layout.searchBar, layout.top],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <>
        <Animated.View
          style={[styles.searchBar, styles.searchBarPlaceholder, {opacity}]}
        />
        <Animated.View style={[styles.searchBar, {opacity: backdropOpacity}]}>
          <PaperSearchBar style={styles.searchBarBackdrop} />
        </Animated.View>
        <View style={styles.searchBar}>
          <PaperSearchBar
            {...this.props}
            ref={this.inputRef}
            icon={this.state.icon}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onIconPress={this.onIconPress}
            style={styles.searchBarDropShadow}
          />
        </View>
      </>
    )
  }
}

export default SearchBar

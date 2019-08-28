import React, {Component, createRef} from 'react'
import {View, Animated, LayoutChangeEvent} from 'react-native'
import {
  Transitioner as NavigationTransitioner,
  NavigationTransitionProps,
  NavigationScene,
  NavigationTransitionSpec,
  StackViewTransitionConfigs,
  NavigationScreenProps
} from 'react-navigation'

import styles from './styles'
import SlidingUpPanel from 'rn-sliding-up-panel'

class CustomTransitioner extends NavigationTransitioner {
  handleLayout?: (event: LayoutChangeEvent) => void
  // @ts-ignore
  transitionProps: NavigationTransitionProps
  prevTransitionProps?: NavigationTransitionProps

  render() {
    return (
      <View
        pointerEvents="box-none"
        onLayout={this.handleLayout}
        style={styles.stack}>
        {this.props.render(this.transitionProps, this.prevTransitionProps)}
      </View>
    )
  }
}

interface Props extends NavigationScreenProps {
  screenProps: any
}

class Transitioner extends Component<Props> {
  sceneRefs: Record<string, React.RefObject<SlidingUpPanel>> = {}

  _renderScene(scene: NavigationScene) {
    const {router} = this.props.navigation
    const routeName = scene.route.routeName
    const Scene = router!.getComponentForRouteName(routeName)

    this.sceneRefs[routeName] = this.sceneRefs[routeName] || createRef()

    return (
      <Animated.View
        pointerEvents="box-none"
        key={routeName}
        style={styles.stack}>
        <Scene {...this.props} ref={this.sceneRefs[routeName]} />
      </Animated.View>
    )
  }

  _render = (transitionProps: NavigationTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(scene))

    return scenes
  }

  _configureTransition = (): NavigationTransitionSpec => {
    return StackViewTransitionConfigs.NoAnimation.transitionSpec!
  }

  render() {
    return (
      // @ts-ignore
      <CustomTransitioner
        render={this._render}
        configureTransition={this._configureTransition}
        {...this.props}
      />
    )
  }
}

export default Transitioner

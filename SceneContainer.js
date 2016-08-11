
import React, {PropTypes,} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import Layout from './Layout';
import StaticContainer from './StaticContainer';

export default class SceneContainer extends React.Component {
  static propTypes = {
    ...Animated.View.propTypes,
    selected: PropTypes.bool,

  };

  render() {
    let { selected, ...props } = this.props;

    return (
      <Animated.View
        {...props}
        pointerEvents={selected ? 'auto' : 'none'}
        removeClippedSubviews={!selected}
        style={[
          styles.sceneContainer,
          selected ? null : styles.hiddenSceneContainer,
          props.style,
        ]}>
        <StaticContainer shouldUpdate={selected}>
          {this.props.children}
        </StaticContainer>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  sceneContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Layout.tabBarHeight,
  },
  hiddenSceneContainer: {
    overflow: 'hidden',
    opacity: 0,
  },
});

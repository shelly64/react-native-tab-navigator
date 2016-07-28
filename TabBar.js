'use strict';

import React from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';

import Layout from './Layout';

export default class TabBar extends React.Component {
  static propTypes = {
    ...Animated.View.propTypes,
    shadowStyle: View.propTypes.style,
  };

  render() {
    return (
      // <TouchableNativeFeedback delayPressIn={0} background={TouchableNativeFeedback.Ripple('grey')}>
      //   <View {...this.props} style={[styles.container, this.props.style]}>
          <Animated.View {...this.props} style={[styles.container, this.props.style]}>
            {this.props.children}
            <View style={[styles.shadow, this.props.shadowStyle]} />
          </Animated.View>
    //      </View>
    //  </TouchableNativeFeedback>


    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: Layout.tabBarHeight,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  shadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    height: Layout.pixel,
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS === 'android' ? 0 : -Layout.pixel,
  },
});

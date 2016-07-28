'use strict';

import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class TabNavigatorItem extends React.Component {
  static propTypes = {
    renderIcon: PropTypes.func,
    renderSelectedIcon: PropTypes.func,
    badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    renderBadge: PropTypes.func,
    title: PropTypes.string,
    unSelectedTitle: PropTypes.string,
    titleStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    selected: PropTypes.bool,
    selectedPrev: PropTypes.bool,
    onPress: PropTypes.func,
    allowFontScaling: PropTypes.bool,

    //for android touch feedback
    rippleColor: PropTypes.string,
    isBorderless: PropTypes.bool,
    delayPressIn: PropTypes.number,
  };

  static defaultProps = {
  };

  render() {
    let child = React.Children.only(this.props.children);
    return React.cloneElement(child, {
      style: [child.props.style, this.props.style],
    });
  }
}

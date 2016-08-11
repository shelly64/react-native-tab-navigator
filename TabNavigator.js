'use strict';

import { Set } from 'immutable';
import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';

import Badge from './Badge';
import Layout from './Layout';
import StaticContainer from './StaticContainer';
import Tab from './Tab';
import TabBar from './TabBar';
import TabNavigatorItem from './TabNavigatorItem';
import SceneContainer from './SceneContainer';

export default class TabNavigator extends React.Component {
  static propTypes = {
    ...View.propTypes,
    sceneStyle: SceneContainer.propTypes.style,
    tabBarStyle: TabBar.propTypes.style,
    tabBarShadowStyle: TabBar.propTypes.shadowStyle,
    hidesTabTouch: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderedSceneKeys: this._updateRenderedSceneKeys(props.children),
    };

    this._renderTab = this._renderTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { renderedSceneKeys } = this.state;
    this.setState({
      renderedSceneKeys: this._updateRenderedSceneKeys(
        nextProps.children,
        renderedSceneKeys,
      ),
    });
  }

  _getSceneKey(item, index): string {
    return `scene-${(item.key !== null) ? item.key : index}`;
  }

  _updateRenderedSceneKeys(children, oldSceneKeys = Set()): Set {
    let newSceneKeys = Set().asMutable();
    React.Children.forEach(children, (item, index) => {
      let key = this._getSceneKey(item, index);
      if (oldSceneKeys.has(key) || item.props.selected) {
        newSceneKeys.add(key);
      }
    });
    return newSceneKeys.asImmutable();
  }

  render() {
    let { style, children, tabBarStyle, tabBarShadowStyle, sceneStyle, ...props } = this.props;
    let scenes = [];

    React.Children.forEach(children, (item, index) => {
      let sceneKey = this._getSceneKey(item, index);
      if (!this.state.renderedSceneKeys.has(sceneKey)) {
        return;
      }

      let { selected } = item.props;
      let scene =
        <SceneContainer key={sceneKey} selected={selected} style={sceneStyle}>
          {item}
        </SceneContainer>;

      scenes.push(scene);
    });

    return (

          <View {...props} style={[styles.container, style]}>
            {scenes}
            <TabBar style={tabBarStyle} shadowStyle={tabBarShadowStyle}>
              {React.Children.map(children, this._renderTab)}
            </TabBar>
          </View>


    );
  }

  _renderTab(item) {
    let icon;
    let title;
    if (item.props.selected) {
      title = item.props.title;
      if (item.props.renderSelectedIcon) {
        icon = item.props.renderSelectedIcon();
      } else if (item.props.renderIcon) {
        let defaultIcon = item.props.renderIcon();
        icon = React.cloneElement(defaultIcon, {
          style: [defaultIcon.props.style, styles.defaultSelectedIcon],
        });
      }
    } else if (item.props.renderIcon) {
      icon = item.props.renderIcon();
      title = item.props.unSelectedTitle;
    }

    let badge;
    if (item.props.renderBadge) {
      badge = item.props.renderBadge();
    } else if (item.props.badgeText) {
      badge = <Badge>{item.props.badgeText}</Badge>;
    }

    return (
      <Tab
        testID={item.props.testID}
        title={title}
        allowFontScaling={item.props.allowFontScaling}
        titleStyle={[
          item.props.titleStyle,
          item.props.selected ? [
            styles.defaultSelectedTitle,
            item.props.selectedTitleStyle,
          ] : null,
        ]}
        badge={badge}
        onPress={item.props.onPress}
        hidesTabTouch={this.props.hidesTabTouch}
        style={item.props.tabStyle}
        // for android touch feedback
        rippleColor={item.props.rippleColor}
        isBorderless={item.props.isBorderless}
        delayPressIn={item.props.delayPressIn}
        //for android icon changing
        selected={item.props.selectedTab}
        selectedPrev={item.props.selectedTabPrev}>
        {icon}
      </Tab>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultSelectedTitle: {
    color: 'rgb(0, 122, 255)',
  },
  defaultSelectedIcon: {
    tintColor: 'rgb(0, 122, 255)',
  },
});

TabNavigator.Item = TabNavigatorItem;

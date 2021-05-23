import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CIRCLE, CROSS, FIGURE_SIZE } from './constants';
import { PawnImage } from './PawnImage';

export default class Tile extends Component {
  _renderContent() {
    switch (this.props.value) {
      case CIRCLE:
        return <PawnImage color="white" />;
      case CROSS:
        return <PawnImage color="black" />;
      default:
        return <Text style={styles.text} onPress={this._handlePress} />;
    }
  }

  _handlePress = () => {
    this.props.onPress(this.props.index);
  };

  render() {
    return <View style={styles.container}>{this._renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    width: FIGURE_SIZE,
    height: FIGURE_SIZE,
  },
  text: {
    width: FIGURE_SIZE,
    height: FIGURE_SIZE,
  },
});

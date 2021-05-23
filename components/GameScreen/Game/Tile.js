import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GameContext } from '../GameContext';
import { CIRCLE, CROSS, FIGURE_SIZE } from './constants';
import { PawnImage } from './PawnImage';

export default class Tile extends Component {
  static contextType = GameContext;

  _renderContent() {
    switch (this.props.value) {
      case CIRCLE:
        return <PawnImage color="white" />;
      case CROSS:
        return <PawnImage color="black" />;
      default:
        return (
          <Text
            style={{
              ...styles.text,
              width: this.context.FIGURE_SIZE,
              height: this.context.FIGURE_SIZE,
            }}
            onPress={this._handlePress}
          />
        );
    }
  }

  _handlePress = () => {
    this.props.onPress(this.props.index);
  };

  render() {
    return (
      <View
        style={{
          ...styles.container,
          width: this.context.FIGURE_SIZE,
          height: this.context.FIGURE_SIZE,
        }}>
        {this._renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  text: {},
});

import React, { Component } from 'react';
import TicTacToe from 'tictactoe-agent';
import Board from './Board';
import { Text, View } from 'react-native';
import { USER_FIGURE, AI_FIGURE, EMPTY, DRAW } from './constants';
import { GameContext } from '../GameContext';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
export default class Game extends Component {
  static contextType = GameContext;

  constructor(props, context) {
    super(props);

    this.state = {
      board: [...new Array(context.ROW_SIZE * context.ROW_SIZE)].map(
        _ => EMPTY,
      ),
    };
  }

  _populateTile(index, figure, onFinish = f => f) {
    if (this.state.board[index] !== EMPTY) {
      return;
    }

    const board = [...this.state.board];
    board[index] = figure;

    this.setState(
      {
        board,
      },
      () => {
        const result = this._judgeWinner();

        if (result !== null) {
          this.props.onFinish(result);
        }

        onFinish();
      },
    );
  }

  _AIAct() {
    const input = this.state.board.join('');
    const model = new TicTacToe.Model(input, AI_FIGURE);
    const recommendation = model.getRecommendation();

    this._populateTile(recommendation.index, AI_FIGURE);
  }

  _judgeWinner() {
    console.log(this.state.board);
    if (!this.state.board.some(figure => figure === EMPTY)) {
      return DRAW;
    }

    let winner = null;
    for (let i = 0; i < this.context.VICTORY_CONDITIONS.length; ++i) {
      let figure = this.state.board[this.context.VICTORY_CONDITIONS[i][0]];

      if (
        this.context.VICTORY_CONDITIONS[i].every(tile =>
          this._checkTile(tile, figure),
        )
      ) {
        winner = figure;
        break;
      }
    }

    return winner;
  }

  _checkTile(tile, figure) {
    return (
      this.state.board[tile] === figure && this.state.board[tile] !== EMPTY
    );
  }

  _clearField = () => {
    this.setState({
      board: [...new Array(this.context.ROW_SIZE * this.context.ROW_SIZE)].map(
        _ => EMPTY,
      ),
    });
  };

  _handlePress = index => {
    this._populateTile(index, USER_FIGURE, () => this._AIAct());
  };

  _handleClickMinus = () => {
    this.context.onChangeRowSize(this.context.ROW_SIZE - 1, this._clearField);
  };

  _handleClickPlus = () => {
    this.context.onChangeRowSize(this.context.ROW_SIZE + 1, this._clearField);
  };

  render() {
    return (
      <View>
        <View style={styles.buttons}>
          <Button title="-" onPress={this._handleClickMinus} />
          <Text>{this.context.ROW_SIZE}</Text>
          <Button title="+" onPress={this._handleClickPlus} />
        </View>
        <Board board={this.state.board} onPress={this._handlePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontSize: 30,
    marginBottom: 10,
  },
});

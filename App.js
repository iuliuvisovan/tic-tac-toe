import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlightBase } from 'react-native';
import ticTacToe from './src/tictactoe';
import BlackPawn from './assets/blackPawn';
import WhitePawn from './assets/whitePawn';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    ticTacToe.startNewGame();
    this.state = { ...ticTacToe };
  }

  makePlay = (index) => {
    ticTacToe.makePlay(index);
    this.setState({ ...ticTacToe });
  };

  startNewGame = () => {
    ticTacToe.startNewGame();
    this.setState({ ...ticTacToe });
  };

  showGameOver() {
    if (this.state.gameOver === true) {
      return (
        <View style={styles.content}>
          <Text style={styles.congrats}>Congratulations, {this.state.winningSymbol} won!!</Text>
          <TouchableOpacity onPress={this.startNewGame} style={styles.button}>
            <Text style={{ color: '#F5F5F5' }}>New game</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  showDraw() {
    if (this.state.draw === true) {
      return (
        <View style={styles.content}>
          <Text style={styles.congrats}>You drew..</Text>
          <TouchableOpacity onPress={this.restart()} style={styles.button}>
            <Text style={{ color: '#F5F5F5' }}>New game</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="inverted" />

        <Text style={styles.title}>Tic tac toe</Text>

        <View style={styles.game}>
          {this.state.squares.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.square}
              onPress={() => {
                this.makePlay(index);
              }}
            >
              {value == 'O' ? <WhitePawn /> : value == 'X' ? <BlackPawn /> : null}
            </TouchableOpacity>
          ))}
        </View>
        {this.showGameOver()}
        {this.showDraw()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfc3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  square: {
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
    backgroundColor: '#909cae44',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: '#909cae',
    borderRadius: 15,
  },
  value: {
    color: 'red',
    fontSize: 80,
  },
  title: {
    fontSize: 35,
    marginBottom: 16,
    color: '#F5F5F5',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  congrats: {
    marginTop: 30,
    fontSize: 20,
    color: '#DEDBEC',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    height: 40,
    width: 186,
    borderWidth: 2,
    borderColor: '#909cae',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  description: {
    color: '#DEDBEC',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
});

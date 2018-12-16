/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { Home } from './home';

export default class App extends Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#000' }}
          centerComponent={{ text: 'Top Movies', style: { color: '#000' } }}
          rightComponent={{ icon: 'home', color: '#000' }}
          backgroundColor='#fff'
        />
        <Home />
      </View>
    );
  }
}

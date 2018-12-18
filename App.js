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
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { Home } from './screens/home';
import { MovieDetails } from './screens/movie-details';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Top Movies',
    }
  }

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

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Detail: {
    screen: MovieDetails,
  },
});

const MyApp = createAppContainer(MyDrawerNavigator);
export default MyApp;

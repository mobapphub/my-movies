/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createDrawerNavigator, createAppContainer } from "react-navigation";
import Home from './screens/home';
import MovieDetails from './screens/movie-details';

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

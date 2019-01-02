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
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import SideMenu from './components/side-menu';

Auth.configure(aws_exports);

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
  },
  Detail: {
    screen: MovieDetails,
  },
}, {
    initialRouteName: 'Home',
    contentComponent: SideMenu,
});

const MyApp = createAppContainer(MyDrawerNavigator);
export default withAuthenticator(MyApp);

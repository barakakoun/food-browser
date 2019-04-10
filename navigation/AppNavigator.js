import React from 'react';
import { createAppContainer, createStackNavigator} from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';


const MainNavigator = createStackNavigator({
  // Home: {screen: HomeScreen},
  Search: {screen: SearchScreen},
  Home: {screen: HomeScreen},
});

export default createAppContainer(MainNavigator);
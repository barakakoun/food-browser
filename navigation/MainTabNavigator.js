import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
});

import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import Companies from '../screens/Companies';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  companies: () => Companies,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));

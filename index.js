/**
 * @format
 */
import AuthContextProvider, { AuthContext } from './context/auth-context';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
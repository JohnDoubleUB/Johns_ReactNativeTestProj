import Auth from './components/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Button, Alert, Text } from 'react-native';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import DiceRollerScreen from './src/DiceRollerScreen';
import IngredientsScreen from './src/IngredientsScreen';
import AuthContextProvider from './context/auth-context';
import LightScreen from './src/LightScreen';

export type RootStackParamList = {
	Home: { post: number; };
	'Dice Roller': { name: string; sides: number; };
	Details: { depth: number; };
	Ingredients: undefined;
	LightScreen: undefined;
};

const customData = require('./DataToLoad/customData.json');

const Stack = createNativeStackNavigator<RootStackParamList>();
//https://reactnavigation.org/docs/hello-react-navigation for stack navigation

//You can also define style in the Stack navigator to apply to all screens under it
//Got to: https://reactnavigation.org/docs/header-buttons

function LogoTitle(props: any) 
{
	console.log(props);
	return (
		<View
			style={{ width: '100%', height: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center" }}>
			<Button title="Button 2" />
			<Button title="Button 1" />
		</View>
	);
};

function HeaderButtonRight() 
{
	<Button onPress={() => Alert.alert(customData.PopupTitle)} title="Dumb" color="#fff" />;
};

function App(): JSX.Element 
{
	//TODO: use context here!
	//const authContext = useContext(AuthContext);

	let content: JSX.Element = <Auth />;
	// if (authContext.isAuth)
	// {
	content = (
		<NavigationContainer>
			<AuthContextProvider>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen}
						options={{
							headerTitle: props => <LogoTitle {...props} />,
							headerRight: () => (
								<Button
									onPress={() =>
										Alert.alert(customData.SecretButton.Title, customData.SecretButton.Description, [
											{
												text: customData.SecretButton.Buttons[0],
												onPress: () => console.log('Cancel pressed'),
												style: 'cancel',
											},
											{
												text: customData.SecretButton.Buttons[1],
												onPress: () => console.log('OK pressed'),
												style: 'destructive',
											},
										])
									}
									title="Dumb"
									color="#fff"
								/>
							),
						}} />
					<Stack.Screen name="Details" component={DetailsScreen} />
					<Stack.Screen name="Dice Roller" component={DiceRollerScreen}
						options={({ route }) => ({
							title: route.params?.name + ' Dice Roller!',
							headerStyle: {
								backgroundColor: '#f4511e',
							},
							headerTintColor: '#fff',
							headerTitleStyle: {
								fontWeight: 'bold',
							},
						})}
						initialParams={{ name: 'd6', sides: 6 }} />
					<Stack.Screen name="Ingredients" component={IngredientsScreen} />
					<Stack.Screen name="LightScreen" component={LightScreen} />
				</Stack.Navigator>
			</AuthContextProvider>
		</NavigationContainer>
	);
	//}

	return content;

	// return (
	// 	<AuthContextProvider>
	// 		{content}
	// 		<Text>Test = {authContext.isAuth.toString()}</Text>
	// 	</AuthContextProvider>
	// );
}

export default App;

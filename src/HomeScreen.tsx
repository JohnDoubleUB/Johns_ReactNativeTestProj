import { Text, View, Button, Image, Pressable, StyleSheet, FlatList } from 'react-native';
import Cat from '../components/Cat';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiceOption from '../Models/DiceOption';
import React, { useContext, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { AuthContext } from '../context/auth-context';

const DICEOPTIONS: DiceOption[] = [
  { name: 'd4', sides: 4 },
  { name: 'd6', sides: 6 },
  { name: 'd8', sides: 8 },
];

export type BottomStackParamList = {
  Roller: undefined;
  Ingredient: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: Props): JSX.Element 
{
  const [lastRollTotal, setLastRollTotal] = useState(0);
  const authContext = useContext(AuthContext);

  let logoutButton = <></>;

  if (authContext.isAuth) 
  {
    logoutButton = <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={authContext.logout}>
      <Text style={styles.addButtonTextStyle}>Log Out</Text>
    </Pressable>;
  }

  React.useEffect(() =>
  {
    if (route.params?.post)
    {
      setLastRollTotal(prevState => prevState + route.params.post);
    }
  }, [route.params?.post]);

  function onResetCombinedTotalHandler()
  {
    setLastRollTotal(0);
  };

  function renderDiceItems({ item }: any)
  {
    const diceOption: DiceOption = item;
    return (
      <Pressable onPress={() => navigation.navigate('Dice Roller', diceOption)}>
        <Text
          style={{ fontSize: 18, paddingHorizontal: 12, paddingVertical: 12 }}>
          {diceOption.name}
        </Text>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#ccc',
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }}
        style={{ width: "100%", height: "100%", position: "absolute", opacity: 0.5 }}
      />
      {/* <Tab.Navigator>/</Tab.Navigator> */}
      {/* <Tab.Navigator>
			<Tab.Screen name="Roller" component={DiceRollerTabScreen}/>
			<Tab.Screen name="Ingredient" component={IngredientTabScreen}/>
		</Tab.Navigator> */}
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList data={DICEOPTIONS} renderItem={renderDiceItems} />
      </View>
      <View style={{ bottom: 0, width: "100%", padding: 10, backgroundColor: "white", borderRadius: 10 }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.navigate('Details', { depth: 1 })}>
          <Text style={styles.addButtonTextStyle}>Go to Details</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.navigate('Ingredients')}>
          <Text style={styles.addButtonTextStyle}>Go to Ingredients</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.navigate('LightScreen')}>
          <Text style={styles.addButtonTextStyle}>Go to Light</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() =>
            navigation.navigate('Dice Roller', { name: 'd6', sides: 6 })}>
          <Text style={styles.addButtonTextStyle}>Go To Dice roller</Text>
        </Pressable>
        <Text style={[styles.addButtonTextStyle, { color: "black" }]}>Combined Roll Total: {lastRollTotal}</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={onResetCombinedTotalHandler}>
          <Text style={styles.addButtonTextStyle}>Reset Dice Total</Text>
        </Pressable>
        {logoutButton}

      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Try editing me! 🎉</Text>
        <Cat name="Whiskers" />
        <View>
          <Text>Some more text!</Text>
        </View>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    marginTop: 5,
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#21A5FF',
  },
  addButtonTextStyle: {
    opacity: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
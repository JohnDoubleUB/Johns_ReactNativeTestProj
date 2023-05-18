import { Text, View, Button } from 'react-native';
import DiceRoller from '../components/DiceRoller/DiceRoller';
import DiceOption from '../Models/DiceOption';
import DiceRollerData from '../Models/DiceRollerData';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Dice Roller'>;

export default function DiceRollerScreen({
  route,
  navigation,
}: Props): JSX.Element
{
  const diceOption: DiceOption = route.params;

  const onSideChangeHandler = (newValue: string) =>
  {
    navigation.setOptions({ title: newValue });
  };

  const onReturnKeepDiceDataHandler = (diceRollerData: DiceRollerData) =>
  {
    // Pass and merge params back to the homescreen
    navigation.navigate({
      name: 'Home',
      params: { post: diceRollerData.rollTotal },
      merge: true,
    });
  };

  return (
    <View style={{ flex: 1, width: "100%", height: "100%", position: "absolute", bottom: 0 }}>
      <DiceRoller
        onReturnKeepDiceData={onReturnKeepDiceDataHandler}
        onSideChange={onSideChangeHandler}
        defaultSides={diceOption.sides}
      />
    </View>
  );
}

//export default DiceRollerScreen;

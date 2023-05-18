import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, GestureResponderEvent} from 'react-native';
import DiceRollerData from '../../Models/DiceRollerData';


type Props = {
  defaultSides: number;
  onSideChange: (arg: string) => void;
  onReturnKeepDiceData: (arg: DiceRollerData) => void;
};

function DiceRoller(props : Props) 
{
  const [diceRollerData, setDiceRollerData] = useState(new DiceRollerData());
  const [diceSides, setDiceSides] = useState<number | null>(props.defaultSides);

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  function onRollPressHandler(){
    const diceSidesValue = diceSides == null ? 1 : diceSides;
    const randomRoll = randomIntFromInterval(1, diceSidesValue);

    setDiceRollerData(prevState => {
      return new DiceRollerData({
        lastRoll: randomRoll,
        rollTotal: prevState.rollTotal + randomRoll,
        totalDice: prevState.totalDice + 1,
      });
    });
  };

  function onChangeNumberHandler(value: string) 
  {
    const parsedValue = parseInt(value);
    setDiceSides(isNaN(parsedValue) ? null : parsedValue);
    props.onSideChange(
      (isNaN(parsedValue) ? 'd0' : 'd' + parsedValue.toString()) +
        ' Dice Roller!',
    );
  }

  function onRollResetPressHandler()
  {
    setDiceRollerData(new DiceRollerData());
    setDiceSides(props.defaultSides);
    props.onSideChange('d' + props.defaultSides.toString() + ' Dice Roller!');
  };

  const onReturnAndKeepDiceDataHandler = () => {
    props.onReturnKeepDiceData(diceRollerData);
  };

  const diceSidesValue = diceSides == null ? '' : diceSides.toString();
//(event: GestureResponderEvent) => void) | null | undefined
  function CustomButton(props : { onPress?: (event: GestureResponderEvent) => void | null | undefined, title: string}) {
    const { onPress, title = 'Save' } = props;
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <View style={{flex:1}}>
      <Text style={styles.statText}>Roll Total: {diceRollerData.rollTotal}</Text>
      <Text style={styles.statText}>Last Roll: {diceRollerData.lastRoll}</Text>
      <Text style={styles.statText}>Total Dice: {diceRollerData.totalDice}</Text>

        <View style={[{flex: 1, position:"absolute", width:"100%", bottom:0, padding:5}]}>
        <TextInput
        value={diceSidesValue}
        onChangeText={onChangeNumberHandler}
        keyboardType="numeric"
        style={styles.textField}
      />
            <CustomButton onPress={onRollPressHandler} title="Roll Dice" />
            <CustomButton onPress={onRollResetPressHandler} title="Reset" />
            <CustomButton
                onPress={onReturnAndKeepDiceDataHandler}
                title="Return and Keep Dice Data"
            />
        </View>
    </View>
  );
};

export default DiceRoller;


const styles = StyleSheet.create({
    statText : {
        padding: 15,
        alignItems:'center',
        justifyContent: 'center',
        textAlign: "center",
        fontSize: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor:"#21A5FF",
        marginBottom:5
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },    
      textField: {
        marginBottom: 15,
        textAlign: 'center',
        height: 40,
        margin: 150,
        borderWidth: 1,
        padding: 10,
        backgroundColor:"white"
      }
});
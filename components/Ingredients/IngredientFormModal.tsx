import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, Pressable, Alert } from 'react-native';
import IngredientData from '../../Models/IngredientData';

type Props = {
  onSubmitForm: (ingredient: IngredientData) => void,
  onHideForm: () => void;
};


function IngredientFormModal(props: Props): JSX.Element
{
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredientName, setIngredientName] = useState("");

  console.log("Rendering form modal!");

  function onIngredientSubmitHandler()
  {
    const parsedAmount = parseInt(ingredientAmount);

    const newIngredient: IngredientData = {
      name: ingredientName,
      amount: isNaN(parsedAmount) ? 0 : parsedAmount,
      id: ""
    };

    props.onSubmitForm(newIngredient);

    setIngredientAmount("");
    setIngredientName("");
  }

  return <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() =>
      {
        Alert.alert('Modal has been closed.');
        props.onHideForm();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add an Ingredient</Text>
          <Text style={styles.modalTextSmall}>Ingredient Name</Text>
          <TextInput
            style={styles.modalTextField}
            placeholder="Ingredient Name"
            keyboardType="default"
            onChangeText={(name) => setIngredientName(name)}
            value={ingredientName}
          />
          <Text style={styles.modalTextSmall}>Amount</Text>
          <TextInput style={[styles.modalTextField]}
            placeholder="Amount"
            keyboardType="numeric"
            inputMode="numeric"
            onChangeText={(amount) => setIngredientAmount(amount)}
            value={ingredientAmount}
          />

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.onHideForm()}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onIngredientSubmitHandler}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  </View>;
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    paddingTop: 10,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    marginTop: 5,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButtonTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTextField: {
    marginBottom: 15,
    //textAlign: 'center',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modalTextSmall: {
    padding: 0,
    margin: 0,
    textAlign: 'center',
  },
});

export default React.memo(IngredientFormModal);
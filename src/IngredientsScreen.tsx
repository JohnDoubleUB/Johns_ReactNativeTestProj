import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import React, { useEffect, useState, useCallback, useReducer } from 'react';
import IngredientList from '../components/Ingredients/IngredientList';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import IngredientFormModal from '../components/Ingredients/IngredientFormModal';
import IngredientData from '../Models/IngredientData';
import IngredientSearch from '../components/Ingredients/IngredientSearch';
import LoadingModal from '../components/UI/LoadingModal';
import useHttp from '../hooks/http';


type Props = NativeStackScreenProps<RootStackParamList, 'Ingredients'>;

enum EIngredientReducer
{
	SET,
	ADD,
	DELETE
}

type IngredientAction = { type: EIngredientReducer.SET, ingredients: IngredientData[]; } |
{ type: EIngredientReducer.ADD, ingredient: IngredientData; } |
{ type: EIngredientReducer.DELETE, id: string; };

function ingredientReducer(currentIngredients: IngredientData[], action: IngredientAction) 
{ //Useful if you want to make a bunch of state based update logic all defined in one place, this is a lifesaver if the code you are writing is more complicated
	switch (action.type)
	{
		case EIngredientReducer.SET:
			return action.ingredients;
		case EIngredientReducer.ADD:
			return [...currentIngredients, action.ingredient];
		case EIngredientReducer.DELETE:
			return currentIngredients.filter(ing => ing.id !== action.id);
	}
}//https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700384#questions


export default function IngredientsScreen({ route, navigation }: Props): JSX.Element 
{
	const [userIngredients, userIngredientsDispatcher] = useReducer(ingredientReducer, []);
	const [modalVisibility, setModalVisibility] = useState(false);
	const { isLoading, data, error, effect, sendRequest, clear } = useHttp<{ type: EIngredientReducer, data: any | null | undefined; }>();

	//const testWords: string[] = ["word1", "word2", "word3"];

	//dispatchIngredients({ type: ReducerOption.DELETE, id: "test" });
	//https://blog.logrocket.com/build-better-forms-with-react-native-ui-components/
	//Make an ingredients form component to be used here

	useEffect(() =>
	{
		if (!isLoading && error == null && effect != null) 
		{
			console.log("Effect is happening!");
			switch (effect.type)
			{
				case EIngredientReducer.DELETE:
					userIngredientsDispatcher({ type: EIngredientReducer.DELETE, id: effect.data });
					break;

				case EIngredientReducer.ADD:
					const newIngredient: IngredientData = { ...effect.data, id: data.name };
					userIngredientsDispatcher({ type: EIngredientReducer.ADD, ingredient: newIngredient });
					break;
			}
		}
	}, [data, effect, isLoading, error]);

	function onShowFormHandler(show: boolean)
	{
		setModalVisibility(show);
	}

	function onFormSubmittedHandler(formData: IngredientData)
	{
		sendRequest(
			"https://react-hooks-update-8cb5a-default-rtdb.firebaseio.com/ingredients.json",
			"POST",
			JSON.stringify({ amount: formData.amount, name: formData.name }),
			{ data: formData, type: EIngredientReducer.ADD }
		);

		setModalVisibility(false);
	}

	function onRemoveIngredientHandler(id: string)
	{
		sendRequest(
			`https://react-hooks-update-8cb5a-default-rtdb.firebaseio.com/ingredients/${id}.json`,
			"DELETE",
			null,
			{ data: id, type: EIngredientReducer.DELETE }
		);
	};

	function filteredIngredientsHandler(filteredIngredients: IngredientData[]) 
	{
		//Setting filter
		console.log("filtering");
		userIngredientsDispatcher({ type: EIngredientReducer.SET, ingredients: filteredIngredients });
		//setIngredients(filteredIngredients);
	}


	if (error != null && error.length > 0) 
	{
		console.log("oops");
		Alert.alert("Something went wrong...", error, [
			{
				text: "OK",
				style: 'cancel',
				onPress: () => { clear(); } //() => { dispatchHttp({ type: EHttpState.CLEAR });
			},
		]);
	}

	return (
		<View>
			{/* <Text>{testWords.join(' ')}</Text> */}
			<Pressable
				style={[styles.button, styles.buttonOpen]}
				onPress={() => onShowFormHandler(true)}>
				<Text style={styles.addButtonTextStyle}>+</Text>
			</Pressable>
			<IngredientSearch onLoadIngredients={useCallback(filteredIngredientsHandler, [])} />
			<IngredientList ingredients={userIngredients} onRemoveItem={useCallback(onRemoveIngredientHandler, [sendRequest])} />
			{modalVisibility && <IngredientFormModal onHideForm={() => onShowFormHandler(false)} onSubmitForm={onFormSubmittedHandler} />}
			{isLoading && <LoadingModal />}
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 5,
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	addButtonTextStyle: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	}
});

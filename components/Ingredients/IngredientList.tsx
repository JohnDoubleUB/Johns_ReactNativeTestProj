
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native';
import IngredientData from '../../Models/IngredientData';

type Props = {
	ingredients: IngredientData[];
	onRemoveItem: (arg: string) => void;
};

function IngredientList(props: Props): JSX.Element
{
	console.log("renderList!");


	function myItemSeparator()
	{
		return (
			<View
				style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10, width: "100%" }}
			/>
		);
	};


	function renderIngredientListItem({ item }: any)
	{
		const ingredientData: IngredientData = item;
		return (
			<View style={{ padding: 10 }}>
				<Pressable onPress={() => props.onRemoveItem(item.id)}>
					<Text
						style={{ fontSize: 18 }}
					>
						{ingredientData.name} x{ingredientData.amount}
					</Text>
				</Pressable>
			</View>
		);
	};

	return (
		<View>
			<FlatList
				ItemSeparatorComponent={myItemSeparator}
				data={props.ingredients}
				extraData={props.ingredients}
				renderItem={renderIngredientListItem}
				contentContainerStyle={{}}
			/>
		</View>
	);
};


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

export default React.memo(IngredientList);
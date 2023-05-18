import React, { useState, useEffect, useRef } from 'react';
import IngredientData from '../../Models/IngredientData';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import useHttp from '../../hooks/http';

type Props = {
    onLoadIngredients: (arg: IngredientData[]) => void;
};

function IngredientSearch(props: Props) 
{
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState("");
    const inputRef = useRef("");
    const { isLoading, data, error, sendRequest, clear } = useHttp();

    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
            if (enteredFilter === inputRef.current)
            {
                //const query = enteredFilter.length;
                console.log("rendererd " + enteredFilter);
                const query = enteredFilter.length === 0 ? '' : `?orderBy="name"&equalTo="${enteredFilter}"`;
                sendRequest("https://react-hooks-update-8cb5a-default-rtdb.firebaseio.com/ingredients.json" + query, "GET");
            }
        }, 500);

        //Cleanup function, called for every subsequent call to cleanup the last
        return () =>
        {
            clearTimeout(timer);
        };
    }, [enteredFilter, onLoadIngredients, inputRef, sendRequest]);

    useEffect(() =>
    {
        if (!isLoading && error == null && data) 
        {
            const loadedIngredients: IngredientData[] = [];

            for (const key in data)
            {
                loadedIngredients.push({
                    id: key,
                    name: data[key].name,
                    amount: data[key].amount
                });
            }
            console.log("Initial load ingredients");
            onLoadIngredients(loadedIngredients);
        }
    }, [data, isLoading, error, onLoadIngredients]);

    function onChangedTextHandler(value: string) 
    {
        inputRef.current = value;
        setEnteredFilter(value);
    }

    if (error != null && error.length > 0) 
    {
        console.log("oops");
        Alert.alert("Something went wrong...", error, [
            {
                text: "OK",
                style: 'cancel',
                onPress: () => { clear(); }
            },
        ]);
    }

    return (
        <View>
            <Text style={styles.FilterDescriptor}>Filter by Title {isLoading && <Text>- Loading...</Text>}</Text>
            <TextInput style={styles.input} value={enteredFilter} onChangeText={onChangedTextHandler} />
        </View>
    );

};


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        marginBottom: 0,
        backgroundColor: "white"
    },
    FilterDescriptor: {
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default React.memo(IngredientSearch);
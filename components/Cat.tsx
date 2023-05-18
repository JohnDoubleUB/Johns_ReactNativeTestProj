import React from 'react';
import {Text} from 'react-native';

type CatProps = {name: string | undefined};

const Cat = (props: CatProps) => {
  return <Text>Hello, I am your cat! {props.name}</Text>;
};

export default Cat;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, Button, StyleSheet, Pressable } from 'react-native';
import { RootStackParamList } from '../App';
import { CompositeScreenProps } from '@react-navigation/native';
import ContextTest from '../components/ContextTest';
import AuthContextProvider from '../context/auth-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props): JSX.Element
{
  const { depth } = route.params;

  const depthInt = depth + 1;

  return (
    <View style={{ flex: 1 }}>
      <ContextTest />
      <Text style={{ fontSize: 200, textAlign: "center", paddingTop: 60 }}>{depth}</Text>
      <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 10 }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.push('Details', { depth: depthInt })}>
          <Text style={styles.addButtonTextStyle}>Go to Details... again</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.navigate('Home', { post: 1 })}>
          <Text style={styles.addButtonTextStyle}>Go to Home</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.addButtonTextStyle}>Go back</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => navigation.popToTop()}>
          <Text style={styles.addButtonTextStyle}>Go back to first screen in stack</Text>
        </Pressable>
      </View>
      {/* <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {depth: depthInt})}
      />

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home', {post: 1})}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */}
    </View>
  );
} //I'm not sure why Home is red underlined


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
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
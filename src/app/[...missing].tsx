import { Link, Stack } from 'expo-router'; // imports Link and Stack components from Expo Router
import { StyleSheet } from 'react-native'; // imports StyleSheet from React Native

import { Text, View } from '../components/Themed'; // importing Text and View components from themed components

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} /> 
      <View style={styles.container}> 
        <Text style={styles.title}>This screen doesn't exist.</Text> 

        <Link href="/" style={styles.link}> 
          <Text style={styles.linkText}>Go to home screen!</Text> 
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({ // creating styles using StyleSheet
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'; // import tools from the react-native
import React, { useState } from 'react'; // imports React and useState hook from react
import Button from '../../components/Button'; // imports button component
import Colors from '../../constants/Colors'; // Importing Colors constant
import { Link, Stack } from 'expo-router'; // Importing Link and Stack components from expo-router
import { supabase } from '@/lib/supabase'; // importing the supabase object

const SignInScreen = () => { // definies the SignInScreen functional
  const [email, setEmail] = useState(''); // declares state variables email and setEmail
  const [password, setPassword] = useState(''); // declares state variables password and setPassword
  const [loading, setLoading] = useState(false); // declares state variables loading and setLoading

  async function signInWithEmail() { // declares an asynchronous function signInWithEmail
    setLoading(true); // setting loads state to true
    const { error } = await supabase.auth.signInWithPassword({ // signing in with email and password using the supabase auth module
      email,
      password,
    });

    if (error) Alert.alert(error.message); // displays an alert if there's an error during sign in
    setLoading(false); // setting loads state to false
  }

  return (
    <View style={styles.container}> //  a View component with styles from the container style object
      <Stack.Screen options={{ title: 'Sign in' }} /> // a Stack.Screen component with title 'Sign in'

      <Text style={styles.label}>Email</Text> //  text Email with styles from the label style object
      <TextInput // Rendering a TextInput component for entering email
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text> //  text password with styles from the label style object
      <TextInput //  a TextInput component for entering password
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry //  the text input as secure masked
      />

      <Button // a Button component for signing in
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? 'Signing in...' : 'Sign in'}
      />
      <Link href="/sign-up" style={styles.textButton}> // a Link component for navigating to the sign up screen
        Create an account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({ //  chnage using StyleSheet.create
  container: { // style object for the container
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: { // change object for the label
    color: 'gray',
  },
  input: { // change object for the input
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: { // changes object for the text button
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen; //exports the SignInScreen component to a default

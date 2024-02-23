import { View, Text, ActivityIndicator } from 'react-native'; // import components 
import React from 'react'; // import React
import Button from '../components/Button'; // import Button component 
import { Link, Redirect } from 'expo-router'; // imports Link and Redirect 
import { useAuth } from '@/providers/AuthProvider'; // imports useAuth hook 
import { supabase } from '@/lib/supabase'; // import supabase object 

const index = () => { // defines index functional component
  const { session, loading, isAdmin } = useAuth(); // destructs session, loading, and isAdmin from useAuth hook

  if (loading) { // checks if loading is true
    return <ActivityIndicator />; // rendering activityIndicator component if loading is true
  }

  if (!session) { // checking if there's no active session
    return <Redirect href={'/sign-in'} />; // Redirecting to the sign-in page 
  }

  if (!isAdmin) { // checking if the user is not an admin
    return <Redirect href={'/(user)'} />; // redirecting to the user page 
  }

  return ( // renders the UI components
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}> 
      <Link href={'/(user)'} asChild> 
        <Button text="User" /> 
      </Link>
      <Link href={'/(admin)'} asChild> 
        <Button text="Admin" /> 
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index; // exporting index component as default
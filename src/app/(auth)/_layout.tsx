import { useAuth } from '@/providers/AuthProvider'; // it imports the useAuth hook from the AuthProvider module
import { Redirect, Stack } from 'expo-router'; // its importing the redirect and stack components from the expo library

export default function AuthLayout() { // defines the authLayout component
  const { session } = useAuth(); // is a destructuring the session property from the result of calling the useAuth

  if (session) { // checking if the session exists
    return <Redirect href={'/'} />; // so if session exists, redirecting to the home page
  }

  return <Stack />; // so f session doesn't exist, rendering a Stack component
}
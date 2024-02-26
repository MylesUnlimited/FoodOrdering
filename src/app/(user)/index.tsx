// Importing Redirect component from expo-router
import { Redirect } from 'expo-router';

// Default export for the TabIndex function component
export default function TabIndex() {
  // Redirecting to the specified route
  return <Redirect href={'/(user)/menu/'} />;
}

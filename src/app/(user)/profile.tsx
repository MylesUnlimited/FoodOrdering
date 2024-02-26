// Importing supabase object from the specified path
import { supabase } from '@/lib/supabase';

// Importing View, Text, and Button components from react-native
import { View, Text, Button } from 'react-native';

// ProfileScreen function component
const ProfileScreen = () => {
  return (
    // View component to contain profile information
    <View>
      {/* Text component displaying 'Profile' */}
      <Text>Profile</Text>

      {/* Button component to sign out */}
      <Button
        title="Sign out" // Button title
        onPress={async () => await supabase.auth.signOut()} // Sign out action
      />
    </View>
  );
};

// Default export for the ProfileScreen component
export default ProfileScreen;

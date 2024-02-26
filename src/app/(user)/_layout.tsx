// Importing FontAwesome component from Expo vector-icons with specified path
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Importing Link, Redirect, and Tabs components from expo-router
import { Link, Redirect, Tabs } from 'expo-router';

// Importing Pressable and useColorScheme hooks from react-native
import { Pressable, useColorScheme } from 'react-native';

// Importing Colors module from the specified relative path
import Colors from '../../constants/Colors';

// Importing useAuth hook from the specified path
import { useAuth } from '@/providers/AuthProvider';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// Function component for rendering tab bar icons
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']; // Props for icon name and color
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

// Default export for the TabLayout function component
export default function TabLayout() {
  // Retrieving color scheme from the device
  const colorScheme = useColorScheme();
  
  // Retrieving session information from the useAuth hook
  const { session } = useAuth();

  // Redirect to home if there's no active session
  if (!session) {
    return <Redirect href={'/'} />;
  }

  // Rendering a Tabs component for tab-based navigation
  return (
    <Tabs
      screenOptions={{
        // Customizing tab bar active tint color based on color scheme
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      {/* Screen configuration for the index screen */}
      <Tabs.Screen name="index" options={{ href: null }} />

      {/* Screen configuration for the menu tab */}
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu', // Title for the tab
          headerShown: false, // Hiding the header
          tabBarIcon: ({ color }) => (
            // Custom tab bar icon using TabBarIcon component
            <TabBarIcon name="cutlery" color={color} />
          ),
        }}
      />

      {/* Screen configuration for the orders tab */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders', // Title for the tab
          headerShown: false, // Hiding the header
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />, // Custom tab bar icon
        }}
      />

      {/* Screen configuration for the profile tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile', // Title for the tab
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />, // Custom tab bar icon
        }}
      />
    </Tabs>
  );
}

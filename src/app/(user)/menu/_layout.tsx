// Importing Colors module from the specified path
import Colors from '@/constants/Colors';

// Importing FontAwesome component from Expo vector-icons
import { FontAwesome } from '@expo/vector-icons';

// Importing Link and Stack components from expo-router
import { Link, Stack } from 'expo-router';

// Importing Pressable component from react-native
import { Pressable } from 'react-native';

// Default export for the MenuStack function component
export default function MenuStack() {
  return (
    // Stack component with screenOptions for navigation configuration
    <Stack
      screenOptions={{
        // Configuring headerRight with a Link component leading to the cart screen
        headerRight: () => (
          <Link href="/cart" asChild>
            {/* Pressable component to handle touch feedback */}
            <Pressable>
              {/* FontAwesome icon representing a shopping cart */}
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      {/* Screen configuration for the index screen with the title 'Menu' */}
      <Stack.Screen name="index" options={{ title: 'Menu' }} />
    </Stack>
  );
}

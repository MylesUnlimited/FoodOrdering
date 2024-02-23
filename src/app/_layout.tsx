import FontAwesome from '@expo/vector-icons/FontAwesome'; // imports FontAwesome icon library from Expo
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'; // import themes and ThemeProvider from React Navigation
import { useFonts } from 'expo-font'; // import useFonts hook from Expo to load custom fonts
import { SplashScreen, Stack } from 'expo-router'; // imports SplashScreen and Stack 
import { useEffect } from 'react'; // import useEffect hook from React
import { useColorScheme } from 'react-native'; // imports useColorScheme hook 
import CartProvider from '@/providers/CartProvider'; // imports CartProvider component
import AuthProvider from '@/providers/AuthProvider'; // import AuthProvider component
import QueryProvider from '@/providers/QueryProvider'; // imports QueryProvider component
import { StripeProvider } from '@stripe/stripe-react-native'; // import StripeProvider from 
import NotificationProvider from '@/providers/NotificationProvider'; // imports NotificationProvider component

export {
  // catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'; // exporting ErrorBoundary 

export const unstable_settings = {
  // ensure that reloading on modal keeps a back button present.
  initialRouteName: '(tabs)', // setting initial route name for navigation
};

// prevent the splash screen from auto hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync(); // preventing splash screen from auto-hiding 

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'), // loading custom font SpaceMono
    ...FontAwesome.font, // loading FontAwesome font
  });

  // expo Router uses Error Boundaries to catch errors 
  useEffect(() => {
    if (error) throw error; // throw error if there's an error during font loading
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // hide splash screen when fonts are loaded
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Render null if fonts are not yet loaded
  }

  return <RootLayoutNav />; // render RootLayoutNav component when fonts are loaded
}

function RootLayoutNav() {
  const colorScheme = useColorScheme(); // get the color scheme of the device

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> 
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''} // Provide Stripe publishable key
      >
        <AuthProvider> // Provide authentication context
          <QueryProvider> // Provide data query context
            <NotificationProvider> // Provide notification context
              <CartProvider> // Provide shopping cart context
                <Stack> // Render stack navigator
                  <Stack.Screen
                    name="(admin)"
                    options={{ headerShown: false }} // hide header for admin screen
                  />
                  <Stack.Screen
                    name="(user)"
                    options={{ headerShown: false }} // hide header for user screen
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }} // hide header for authentication screen
                  />
                  <Stack.Screen
                    name="cart"
                    options={{ presentation: 'modal' }} // set cart screen to be presented as a modal
                  />
                </Stack>
              </CartProvider>
            </NotificationProvider>
          </QueryProvider>
        </AuthProvider>
      </StripeProvider>
    </ThemeProvider>
  );
}
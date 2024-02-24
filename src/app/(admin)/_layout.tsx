import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { useAuth } from '@/providers/AuthProvider';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
//This section is the base page that the user sees once signed into the admin side of the app

function TabBarIcon(props: { //This aligns the icons used on the tabs at the bottom of the screen
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />; //size is the size of the icons, and style is used to align them within the bottom tab
}

export default function TabLayout() { //Changing tab layout
  const { isAdmin } = useAuth(); //Use to check if the user is an Admin

  if (!isAdmin) {
    return <Redirect href={'/'} />; //returns them back to the sign in/default screen
  }

  return (
    <Tabs
      screenOptions={{ //Changing and managing tab style, colors, etc
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} /**This section hides an unused tab called index*//> 
      
      <Tabs.Screen
        name="menu" //name of the tab
        options={{
          title: 'Menu', //Titling tab to menu section
          headerShown: false, //set to false so that there isn't a header at the top of the screen with the same name.
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color={color} /> //This is the icon that is pulled from the iconset and is used for to indicate the menu tab
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders', //Titling tab to order section
          headerShown: false, //set to false so that there isn't a header at the top of the screen with the same name.
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />, //indicating List icon for Orders section of app/tabs
        }}
      />
    </Tabs>
  );
}

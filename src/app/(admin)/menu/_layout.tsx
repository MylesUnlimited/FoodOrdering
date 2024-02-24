import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

/*This Function is used to manage the menus layout on the navigation stack*/
/*This section is being defined to create a stack and page layout.*/
/*This the text that you will see in the header of the menu*/
/*This creates the link to the menu creation section for admins*/
/*We are now setting up a button that takes us to menu creation with pressable*/
export default function MenuStack() { 
  return (
    <Stack> 
      <Stack.Screen
        name="index"
        options={{
          title: 'Menu test', 
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild> 
            
              <Pressable> 
                {({ pressed }) => (
                  <FontAwesome /*Using the FontAwsome icon library*/
                    name="plus-square-o" /*This is the icon we will see/press */
                    size={25}
                    color={Colors.light.tint} /*Setting colors*/
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} /*Location of icon relative to the admin's screen*/
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

     
    </Stack>
  );
}

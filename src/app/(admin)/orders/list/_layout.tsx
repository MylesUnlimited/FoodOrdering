import { Tabs, withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator); //This creates a tab at the top of the screen to alternate between presented screens

export default function OrderListNavigator() {
  return ( 
    //This section creates the top tabs background color while also instantiating a tab labled 'Active'
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'white' }}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: 'Active' }} />  
      </TopTabs>
    </SafeAreaView>
  ); //SafeAreaView is used to define the area of the users screen that isn't obstructed by the bars. 
  //This differs across devices, so SafeAreaView is meant to access a devices inset/safe area information easily
}

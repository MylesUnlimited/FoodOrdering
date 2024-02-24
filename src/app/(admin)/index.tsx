import { Redirect } from 'expo-router';

export default function TabIndex() {
  //This sets the first screen the Admin sees upon loading the app. 
  //If it were 'orders' the first screen they see is orders
  return <Redirect href={'/(admin)/menu/'} />; 
}

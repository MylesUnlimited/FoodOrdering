import { Stack } from 'expo-router';

export default function MenuStack() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders' }} /> */}
      {/*This layout.tsx is used to put all the pages under 'orders' together on the same stack. All pages under orders are placed on a stack with 'index' */}
      <Stack.Screen name="list" options={{ headerShown: false }} /**This hides the list header from being shown on the orders page*/  />
    </Stack> 
  );
}

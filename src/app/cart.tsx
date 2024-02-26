import { View, Text, Platform, FlatList } from 'react-native'; // import View, Text, Platform, and FlatList components from React Native
import { StatusBar } from 'expo-status-bar'; // import StatusBar component from Expo

import { useCart } from '@/providers/CartProvider'; // import useCart hook from CartProvider
import CartListItem from '@/components/CartListItem'; // import CartListItem component
import Button from '@/components/Button'; // importing Button component

const CartScreen = () => {
  const { items, total, checkout } = useCart(); // destructuring values from useCart hook

  return (
    <View style={{ padding: 10 }}> // Rendering a view with padding
      <FlatList // rendering a flat list
        data={items} // provides data to the flat list
        renderItem={({ item }) => <CartListItem cartItem={item} />} // rendering CartListItem component for each item
        contentContainerStyle={{ gap: 10 }} // styli the content container of the flat list
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}> 
        Total: ${total} 
      </Text>
      <Button onPress={checkout} text="Checkout" /> 

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> 
    </View>
  );
};

export default CartScreen; // export CartScreen component as default
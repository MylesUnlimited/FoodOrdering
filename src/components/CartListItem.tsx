import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { CartItem } from '../types';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../providers/CartProvider';
import { defaultPizzaImage } from './ProductListItem';
import RemoteImage from './RemoteImage';

type CartListItemProps = {/* defines a typescript type and then specifies the props expected by the component */
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => { /*declares a functional component that takes an object as a argument and extracts the cartItem property */
  const { updateQuantity } = useCart();/*updates rhe quantity of items in a cart */

  return (
    <View style={styles.container}>
      <RemoteImage
        path={cartItem.product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>/* represents the structure of the componenet which display images, name of products, and has styling to the text */
  );
};

const styles = StyleSheet.create({ /*defines styles for different components */
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default CartListItem; /*exports cartlistitem as a default export which makes it available to use in other parts of the app */

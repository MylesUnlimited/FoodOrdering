// Importing necessary components and functions from libraries and files
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';

// Array of pizza sizes
const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

// Defining the ProductDetailsScreen component
const ProductDetailsScreen = () => {
  // Fetching id parameter from local search params
  const { id: idString } = useLocalSearchParams();
  // Parsing the id to float
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  // Fetching product data based on id
  const { data: product, error, isLoading } = useProduct(id);

  // Accessing addItem function from cart provider
  const { addItem } = useCart();

  // Accessing router from expo-router
  const router = useRouter();

  // State for selected pizza size
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  // Function to add selected product to cart
  const addToCart = () => {
    // Checking if product data is available
    if (!product) {
      return;
    }
    // Adding selected product with size to cart
    addItem(product, selectedSize);
    // Navigating to cart screen
    router.push('/cart');
  };

  // Rendering loading indicator if data is still loading
  if (isLoading) {
    return <ActivityIndicator />;
  }

  // Rendering error message if there's an error fetching products
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  // Rendering the product details screen
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      {/* Rendering the product image */}
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />

      {/* Text prompting to select size */}
      <Text>Select size</Text>
      {/* Rendering available sizes */}
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? 'black' : 'gray',
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Displaying product price */}
      <Text style={styles.price}>${product.price}</Text>
      {/* Button to add product to cart */}
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

// Styles for the ProductDetailsScreen component
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

// Exporting the ProductDetailsScreen component
export default ProductDetailsScreen;

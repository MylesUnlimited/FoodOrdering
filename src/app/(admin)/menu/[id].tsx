import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
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
import Button from '@components/Button'; //This imports the button component to make a pressable button
import { useCart } from '@/providers/CartProvider'; //This imports the cart functionality so you can add and manage the cart from other pages
import { PizzaSize } from '@/types'; //The different pizza sizes
import { FontAwesome } from '@expo/vector-icons'; //Expo's icon library, the FontAwesome set
import Colors from '@/constants/Colors'; //Colors set in a separate file to maintain consistency
import { useProduct } from '@/api/products'; //This import gets all the products to list them 
import RemoteImage from '@/components/RemoteImage'; //Remotely grabbing id images/product images

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']; //As the name would imply this is the section for pizza sizes

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart(); //calling addItem function to varialbe for simple adding to cart

  const router = useRouter(); //Calling router for routing pages

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M'); //This is the default selected size of the pizza

  const addToCart = () => { //Adds item to the cart
    if (!product) { //checking if the product is valid
      return;
    }
    addItem(product, selectedSize); //adding item if product is valid
    router.push('/cart'); //This pushes the cart screen to the top of the stack, regardless of if it was already in the stack
  };

  if (isLoading) {
    return <ActivityIndicator />; //this displays a circular indicator with a bar moving around it to indicate the page is loading
  }

  if (error) { 
    return <Text>Failed to fetch products</Text>; //This displays on the product page when there was an issue. 
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    
      <Stack.Screen options={{ title: product.name }} /> 

      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

//This section sets font sizes, placing and background colors for a product
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ProductDetailsScreen;

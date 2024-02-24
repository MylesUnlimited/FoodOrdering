import { ActivityIndicator, FlatList, Text } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/api/products';

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList(); //Getting the list of products, error notifications and/or loading status

  if (isLoading) {
    return <ActivityIndicator />; //displays an icon to indicate to the user that the page is loading.
  }

  if (error) {
    return <Text>Failed to catch products</Text>; //This displays on the menu page when it fails to index the list of products
  }

  return (
    <FlatList //This section is used to display all the available products
      data={products} //Getting the product data
      renderItem={({ item }) => <ProductListItem product={item} />} //Displaying product images
      numColumns={2} //Number of columns of products the user will see on screen
      contentContainerStyle={{ gap: 10, padding: 10 }} //how big the container/space for a product is
      columnWrapperStyle={{ gap: 10 }} //space around column
    />
  );
}

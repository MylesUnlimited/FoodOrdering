// Importing ActivityIndicator, FlatList, and Text components from react-native
import { ActivityIndicator, FlatList, Text } from 'react-native';

// Importing ProductListItem component from the specified path
import ProductListItem from '@components/ProductListItem';

// Importing useProductList hook from the specified path
import { useProductList } from '@/api/products';

// Default export for the MenuScreen function component
export default function MenuScreen() {
  // Destructuring data, error, and isLoading from the useProductList hook
  const { data: products, error, isLoading } = useProductList();

  // If data is loading, render an ActivityIndicator
  if (isLoading) {
    return <ActivityIndicator />;
  }

  // If there's an error, render a Text component indicating failure to fetch products
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  // Render a FlatList to display the products
  return (
    <FlatList
      data={products}
      // Render each item using the ProductListItem component
      renderItem={({ item }) => <ProductListItem product={item} />}
      // Display two columns
      numColumns={2}
      // Apply gap and padding to the content container
      contentContainerStyle={{ gap: 10, padding: 10 }}
      // Apply gap between columns
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

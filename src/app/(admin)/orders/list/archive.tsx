import { Text, FlatList, ActivityIndicator } from 'react-native'; //Getting ActivityIndicator to show page loading and flatlist to display orders
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders'; //Import of api to get order information

export default function OrdersScreen() { //Admin side order listing
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true }); //pulling order, loading and error information from the admin side of the ordering api
//Admin side is different from user side as it gives more information like the status of the order in regards to delivery and preperation
  if (isLoading) {
    return <ActivityIndicator />; //this displays a circular indicator with a bar moving around it to indicate the page is loading
  }
  if (error) {
    return <Text>Failed to fetch</Text>; //This displays on the product page when there was an issue.
  }

  return (
    //This creates the Flatlist for listing the orders under the active and archive tabs
    <FlatList
      data={orders} //Getting list of orders
      renderItem={({ item }) => <OrderListItem order={item} />} //Telling Flatlist to render the orderlist
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}

import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false }); //Using Admin Order for more detailed information regarding order: order status for example

  useInsertOrderSubscription(); //This 

  if (isLoading) {
    return <ActivityIndicator />; //Cicular indicator with a rotating bar to show loading
  }
  if (error) {
    return <Text>Failed to fetch</Text>; //The text that shows when an errors occurs during loading
  }

  return (
    <FlatList
      data={orders} //Getting order data
      renderItem={({ item }) => <OrderListItem order={item} />} //Displaying order data
      contentContainerStyle={{ gap: 10, padding: 10 }} //How the box around the order information looks
    />
  );
}

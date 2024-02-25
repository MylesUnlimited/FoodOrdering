import { useOrderDetails, useUpdateOrder } from '@/api/orders'; //Get order information and upate it
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem'; //The list of current and archived orders
import Colors from '@/constants/Colors'; //Consistent app color information
import { notifyUserAboutOrderUpdate } from '@/lib/notifications'; //sends a notification to the user about their order
import { OrderStatusList } from '@/types'; //The different statuses an order can be
import orders from '@assets/data/orders'; //unused orders import. 
import { Stack, useLocalSearchParams } from 'expo-router'; //stack for user routing, uselocalsearchparams for page ids
import {
  FlatList,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native'; //native imports for pressables and listing features. Text for on screen presentation

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams(); //Variable for product id
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]); //this uses a ternary operator to denote what happens for true and false
  //if also have optional chaining to avoid outputting and ugly error/break and undefined instead, which would be taken as false

  const { data: order, isLoading, error } = useOrderDetails(id); //getting the order details and status
  const { mutate: updateOrder } = useUpdateOrder(); //hook for order updating

  const updateStatus = async (status: string) => { //uses the hook to update the users status
    await updateOrder({
      id: id,
      updatedFields: { status }, //whatever status button is pressed will be used to update status
    });
    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status }); //This notifies the user of their orders status
    }
  };

  if (isLoading) {
    return <ActivityIndicator />; //displays an icon to indicate to the user that the page is loading.
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>; //This displays on the menu page when it fails to get the order information
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} /> {/** This displays the order number/id at the top of the page */}

      {/** This section lists arll the active orders */}

      <FlatList 
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />} //What item is to b e rendered
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          //This section creates buttons that are used to update the users order. Things like, delivered, cooking, etc...
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)} // On the press of one of the status buttons, it will update the user/customer of their order
                  style={{ //This changes how the order status pressables look by default
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint, //ternary of white to indicate unpressed or light tint to indicate pressed
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}

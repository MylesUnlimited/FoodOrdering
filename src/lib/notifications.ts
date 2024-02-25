import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { supabase } from './supabase';
import { Tables } from '@/types';

export async function registerForPushNotificationsAsync() {/* exports an asynchronous function named registerForPushNotificationsAsync. registers device for push notifications */
  let token; /*declares a variable named token to store the push notification token */

  if (Platform.OS === 'android') {/* chech if the app is running on a android platform*/
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    }); /*sets up a notification channel with specific configurations for Android. these channels are used to manage and customize how notifications are displayed */
  }

  if (Device.isDevice) { /*checks if the app is running on a physical device */
    const { status: existingStatus } = 
      await Notifications.getPermissionsAsync(); /* retrieving the existing push notification permission status */
    let finalStatus = existingStatus; /* creates a variabe finalStatus and set it to the existing permission status */
    if (existingStatus !== 'granted') { /* checks if the existing permission is not granted */
      const { status } = await Notifications.requestPermissionsAsync();/* requests push notification permission if not already granted */
      finalStatus = status; /* updates the finalStatus variable with the new permission status */
    }
    if (finalStatus !== 'granted') { 
      alert('Failed to get push token for push notification!');
      return;
    } /* checks if the final permission stauts is still not granted and shows an alert */
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      }) 
    ).data;/*gets the expo push token for the device */
    console.log(token);/* logs the push token to the console */
  } else {
    // alert('Must use physical device for Push Notifications');
    /* closes the check for the physical device */
  }

  return token;/*returns the push token from the function */
}

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification( /* exports an asynchrounous function named sendPushNotification which takes three parameters: expoPushToke, title and body. responsible for sending push notification */
  expoPushToken: string,
  title: string,
  body: string
) {
  const message = { /*creates an abject named message which contains data necessary for sending the push notification, such as the token, title, body and some additional data */
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', { /* uses the fetch function to send an HTTP POST rewuest to the expo push notification server 
  the url is the endpoint where the request is sent, the request includes the message object as JSON date */
    method: 'POST', /* specifies that the HTTP request method is POST which is used to send date to the server */
    headers: {/* defines the headers of the HTTP request, specifies that the client accepts JSON data and supports encoding with gzip or deflate */
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message), /* converts the message object into a JSON string and sets it as the body of the HTTP request. the JSON string contains the data required for the push notification  */
  });
}

const getUserToken = async (userId) => { /* defines an asynchronous arrow function which takes a userId parameter. retrieves the push notification token associated with the given userId from the Supabase database */
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data?.expo_push_token;
};

export const notifyUserAboutOrderUpdate = async (order: Tables<'orders'>) => {/*defines  a asynchronous function that takes an arder object as its parameter */
  const token = await getUserToken(order.user_id); /*retrieves the push notifcation token associated with the user who placed the order. assigns returned token to the variable token */
  console.log('Order: ', order); /*logs the informations about the order object to the console */
  const title = `Your order is ${order.status}`; /*creates a string variable named title that holde a message indicating the status of the order */
  const body = `Body`; /* creates a string variable named body with the value body */
  sendPushNotification(token, title, body);/* calls the sendPushNotifcation fucntion with three arguments: token, title, and body. Send a push notifcation to the user associated with the provided token, informing them about the update in their order */
};

import { Alert } from 'react-native';
import { supabase } from './supabase';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

const fetchPaymentSheetParams = async (amount: number) => { /*defines an asynchronous function that takes an argument amount of type number, fetched parameters required for payment sheet processing */
  const { data, errpr } = await supabase.functions.invoke('payment-sheet', { /* invokes Supabase severless function and passes an aboject containt the amout as the request of body, awaits response which includes date and error(if it occurs) */
    body: { amount },
  });
  if (data) { /* check if the response date exists and if it does logs the date to the console and returns it */
    console.log(data);
    return data; 
  }
  Alert.alert('Error fetching payment sheet params'); /* if thers an erroe or no date received, shows an alert indicating an error occurred */
  return {};/* returns an empty object if no data was recieved or  an error happens*/
};

export const initialisePaymentSheet = async (amount: number) => { /* exports an ansynchronous function that takes an argument amount of type number, initializes the payment sheet process */
  console.log('Initialising payment sheet, for: ', amount); /* logs a message indicating the payment sheet is being initialized for a particular amount */

  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount); /* calls the fetchPaymentSheetParams function to retrieve payment sheet paramets */

  if (!paymentIntent || !publishableKey) return;/* checks if either paymentIntent or publishableKey is missing then it returns early from the function */

  const result = await initPaymentSheet({ /*initializes the payment sheet using parameters obtained from fetchPaymentSheetParams and additonal info */
    merchantDisplayName: 'notJust.dev',
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: {
      name: 'Jane Doe',
    },
  });
  console.log(result); /*logs the result of the payme  sheet initialization to the console */
};

export const openPaymentSheet = async () => { /*exports an asynchronous fucntion that is responsible for poening the payment sheet */
  const { error } = await presentPaymentSheet(); /*calls presentPaymentSheet function to display the payment sheet, awaits the results which includes error if there was any error that occurred */

  if (error) { /* if theres an error, it shows an alert with the error message and returns false */
    Alert.alert(error.message);
    return false;
  }
  return true; /* returns true if the presentation of the payment sheet was successful */
};

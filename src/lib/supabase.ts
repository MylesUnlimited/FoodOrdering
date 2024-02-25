import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const ExpoSecureStoreAdapter = { /* declares a constant named expoSecureStoreAdapter and initializes it as an object */
  getItem: (key: string) => {/*defines a function getItem with the ExpoSecureStoreAdapter object, takes a key parameter of tyoe strjng */
    return SecureStore.getItemAsync(key); /* returns a promise which resolves to the value assocatied with the given key in the secure stoe */
  },
  setItem: (key: string, value: string) => { /* defines a function setItem  that takes key and value as parameters. both of tyoe string*/
    SecureStore.setItemAsync(key, value); /* store the given value associated with the provided key in the secure store */
  },
  removeItem: (key: string) => { /* defines a fucntion named removeItem that takes a key parameter of type string */
    SecureStore.deleteItemAsync(key); /*delets the item associated eweith the provided key from the secure store */
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';/*declares a constant variable and assigns it the value of process.env.EXPO_PUBLIC_SUPABASE_URL or an empty stinf if its not available */
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || ''; /*declares a constant variable and assigns it the value of process.env.EXPO_PUBLIC_SUPABASE_URL or an empty stinf if its not available */

console.log(supabaseUrl, supabaseAnonKey); /*logs the Supabase URL and Supabase anonymous key to the console */

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, { /*exports a supabase object created by invoking createClient function  with Supabase URL, SUpabase anonymous key and other config options like auth storage */
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

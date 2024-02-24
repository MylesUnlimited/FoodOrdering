import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://kfwgbsorlrfzthbkfbdu.supabase.co' || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtmd2dic29ybHJmenRoYmtmYmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NzY4NzAsImV4cCI6MjAyNDI1Mjg3MH0.ljeheboXLRCZPGd3CFA6QiuOMO8TWkkBNlnU6HNWlQE' || process.env.EXPO_PUBLIC_SUPABASE_ANON;

console.log(supabaseUrl, supabaseAnonKey);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://znbxwebefzloetmtzsws.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuYnh3ZWJlZnpsb2V0bXR6c3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNjE3OTYsImV4cCI6MjA1MDgzNzc5Nn0.e62zKZAB229mgs1sarGfqSse1OissnVXN5UDne75yeU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

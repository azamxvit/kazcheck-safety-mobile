import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

// ВРЕМЕННО добавляем проверку:
console.log('URL:', supabaseUrl);
console.log('KEY:', supabaseAnonKey ? 'Ключ найден!' : 'КЛЮЧА НЕТ!');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

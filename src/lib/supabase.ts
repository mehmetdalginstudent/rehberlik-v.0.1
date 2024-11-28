import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rarrgffavmystndbmvbn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcnJnZmZhdm15c3RuZGJtdmJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjgzMzI0MCwiZXhwIjoyMDQ4NDA5MjQwfQ.XrR7gs5agddk_1F2_aqzDuHWs8PmFHCLOo-1BZ2dahs';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
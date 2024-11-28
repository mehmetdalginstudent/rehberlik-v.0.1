import { supabase } from '../supabase';

export const initializeDatabase = async () => {
  try {
    // Check if tables exist
    const { data: appointments } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    const { data: announcements } = await supabase
      .from('announcements')
      .select('id')
      .limit(1);

    const { data: blockedSlots } = await supabase
      .from('blocked_slots')
      .select('id')
      .limit(1);

    if (appointments === null || announcements === null || blockedSlots === null) {
      console.error('Tables not found. Please run the migration SQL in Supabase SQL editor.');
    } else {
      console.log('Database tables verified successfully');
    }
  } catch (error) {
    console.error('Database verification failed:', error);
  }
};
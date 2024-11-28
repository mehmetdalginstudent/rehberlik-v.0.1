import { supabase } from '../supabase';

export const blockedSlotApi = {
  async getAll() {
    const { data, error } = await supabase.from('blocked_slots').select('*');
    if (error) throw error;
    return data.map(slot => ({
      date: slot.date,
      time: slot.time
    }));
  },

  async block(date: string, time: string) {
    const { error } = await supabase
      .from('blocked_slots')
      .insert({ date, time });
    if (error) throw error;
  },

  async unblock(date: string, time: string) {
    const { error } = await supabase
      .from('blocked_slots')
      .delete()
      .eq('date', date)
      .eq('time', time);
    if (error) throw error;
  }
};
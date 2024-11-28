import { supabase } from '../supabase';
import type { Announcement } from '../../types';

export const announcementApi = {
  async getActive() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .gt('expires_at', new Date().toISOString());
    
    if (error) throw error;
    
    return data.map(announcement => ({
      ...announcement,
      id: announcement.id.toString(),
      createdAt: new Date(announcement.created_at),
      expiresAt: new Date(announcement.expires_at),
      isActive: announcement.is_active
    }));
  },

  async create(announcement: Omit<Announcement, 'id' | 'createdAt' | 'isActive'>) {
    const { error } = await supabase.from('announcements').insert({
      title: announcement.title,
      content: announcement.content,
      expires_at: announcement.expiresAt.toISOString(),
      is_active: true
    });
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
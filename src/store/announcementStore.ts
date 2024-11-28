import { create } from 'zustand';
import { Announcement } from '../types';
import { announcementApi } from '../lib/api/announcements';

interface AnnouncementStore {
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'isActive'>) => Promise<void>;
  removeAnnouncement: (id: string) => Promise<void>;
  getActiveAnnouncements: () => Announcement[];
  loadAnnouncements: () => Promise<void>;
}

export const useAnnouncementStore = create<AnnouncementStore>((set, get) => ({
  announcements: [],

  loadAnnouncements: async () => {
    try {
      const announcements = await announcementApi.getActive();
      set({ announcements });
    } catch (error) {
      console.error('Error loading announcements:', error);
    }
  },

  addAnnouncement: async (announcement) => {
    try {
      await announcementApi.create(announcement);
      await get().loadAnnouncements();
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  },

  removeAnnouncement: async (id) => {
    try {
      await announcementApi.delete(id);
      const updatedAnnouncements = get().announcements.filter(a => a.id !== id);
      set({ announcements: updatedAnnouncements });
    } catch (error) {
      console.error('Error removing announcement:', error);
    }
  },

  getActiveAnnouncements: () => {
    const now = new Date();
    return get().announcements.filter(
      announcement => 
        announcement.isActive && 
        new Date(announcement.expiresAt) > now
    );
  },
}));

useAnnouncementStore.getState().loadAnnouncements();
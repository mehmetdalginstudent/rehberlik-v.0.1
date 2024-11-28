import { create } from 'zustand';
import { Appointment } from '../types';
import { appointmentApi } from '../lib/api/appointments';
import { blockedSlotApi } from '../lib/api/blockedSlots';

interface AppointmentStore {
  appointments: Appointment[];
  blockedSlots: { date: string; time: string }[];
  selectedSlot: { date: string; time: string } | null;
  addAppointment: (appointment: Appointment) => Promise<void>;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  blockTimeSlot: (date: string, time: string) => Promise<void>;
  unblockTimeSlot: (date: string, time: string) => Promise<void>;
  isSlotBlocked: (date: string, time: string) => boolean;
  setSelectedSlot: (date: string, time: string) => void;
  clearSelectedSlot: () => void;
  loadInitialData: () => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  blockedSlots: [],
  selectedSlot: null,
  
  loadInitialData: async () => {
    try {
      const [appointments, blockedSlots] = await Promise.all([
        appointmentApi.getAll(),
        blockedSlotApi.getAll()
      ]);
      set({ appointments, blockedSlots });
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  },

  addAppointment: async (appointment) => {
    try {
      await appointmentApi.create(appointment);
      const newAppointments = [...get().appointments, appointment];
      set({ appointments: newAppointments });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  },

  updateAppointment: async (id, updatedAppointment) => {
    try {
      await appointmentApi.update(id, updatedAppointment);
      const newAppointments = get().appointments.map((app) =>
        app.id === id ? { ...app, ...updatedAppointment } : app
      );
      set({ appointments: newAppointments });
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  },

  deleteAppointment: async (id) => {
    try {
      await appointmentApi.delete(id);
      const newAppointments = get().appointments.filter((app) => app.id !== id);
      set({ appointments: newAppointments });
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  },

  blockTimeSlot: async (date: string, time: string) => {
    try {
      await blockedSlotApi.block(date, time);
      const newBlockedSlots = [...get().blockedSlots, { date, time }];
      set({ blockedSlots: newBlockedSlots });
    } catch (error) {
      console.error('Error blocking time slot:', error);
    }
  },

  unblockTimeSlot: async (date: string, time: string) => {
    try {
      await blockedSlotApi.unblock(date, time);
      const newBlockedSlots = get().blockedSlots.filter(
        (slot) => !(slot.date === date && slot.time === time)
      );
      set({ blockedSlots: newBlockedSlots });
    } catch (error) {
      console.error('Error unblocking time slot:', error);
    }
  },

  isSlotBlocked: (date: string, time: string) => {
    return get().blockedSlots.some(
      (slot) => slot.date === date && slot.time === time
    );
  },

  setSelectedSlot: (date: string, time: string) => {
    set({ selectedSlot: { date, time } });
  },

  clearSelectedSlot: () => {
    set({ selectedSlot: null });
  },
}));

useAppointmentStore.getState().loadInitialData();
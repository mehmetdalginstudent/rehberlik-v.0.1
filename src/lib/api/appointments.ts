import { supabase } from '../supabase';
import type { Appointment } from '../../types';

export const appointmentApi = {
  async getAll() {
    const { data, error } = await supabase.from('appointments').select('*');
    if (error) throw error;
    return data.map(app => ({
      ...app,
      date: new Date(app.date),
      id: app.id.toString()
    }));
  },

  async create(appointment: Appointment) {
    const { error } = await supabase.from('appointments').insert({
      id: appointment.id,
      date: appointment.date.toISOString(),
      time: appointment.time,
      client_name: appointment.clientName,
      type: appointment.type,
      summary: appointment.summary,
      status: appointment.status
    });
    if (error) throw error;
  },

  async update(id: string, appointment: Partial<Appointment>) {
    const { error } = await supabase
      .from('appointments')
      .update({
        date: appointment.date?.toISOString(),
        time: appointment.time,
        client_name: appointment.clientName,
        type: appointment.type,
        summary: appointment.summary,
        status: appointment.status
      })
      .eq('id', id);
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};
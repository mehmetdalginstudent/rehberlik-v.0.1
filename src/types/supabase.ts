export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          created_at: string;
          date: string;
          time: string;
          client_name: string;
          type: string;
          summary: string;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          date: string;
          time: string;
          client_name: string;
          type: string;
          summary: string;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          date?: string;
          time?: string;
          client_name?: string;
          type?: string;
          summary?: string;
          status?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string;
          expires_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content: string;
          expires_at: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string;
          expires_at?: string;
          is_active?: boolean;
        };
      };
      blocked_slots: {
        Row: {
          id: string;
          created_at: string;
          date: string;
          time: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          date: string;
          time: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          date?: string;
          time?: string;
        };
      };
    };
  };
}
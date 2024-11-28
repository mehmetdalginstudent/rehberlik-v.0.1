# Randevu Sistemi

## Database Setup

1. Go to your Supabase project's SQL Editor
2. Copy the contents of `supabase/migrations/20240322000000_initial_schema.sql`
3. Paste and execute the SQL in the Supabase SQL Editor
4. This will create all necessary tables with proper permissions

## Development

```bash
npm install
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key (public)

## Features

- Appointment scheduling system
- Administrative dashboard
- Announcement management
- Blocked time slots management
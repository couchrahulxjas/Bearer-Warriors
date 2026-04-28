import { createClient } from "@supabase/supabase-js";

// Safe fallback for demo purposes if environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://mock-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJmock-token";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* 
Expected Supabase Schema Definitions matching user requirements:

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  avatar TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  tags TEXT[],
  upvotes INTEGER DEFAULT 0
);

CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  description TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

CREATE TABLE platform_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_name TEXT,
  is_chat_enabled BOOLEAN DEFAULT true,
  is_stories_enabled BOOLEAN DEFAULT true,
  is_booking_enabled BOOLEAN DEFAULT true
);

-- RLS should be enabled on all tables
*/

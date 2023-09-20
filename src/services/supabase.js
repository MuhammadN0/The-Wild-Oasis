import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://khnydtczbayilurcoymz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobnlkdGN6YmF5aWx1cmNveW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MDk2MTQsImV4cCI6MjAwOTQ4NTYxNH0.VLwCZBb5kOv_ebhgCvC6cChYi3HQUVIiic-oWmmAOAw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
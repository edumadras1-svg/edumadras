import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xidbtzdhkjwhkmzafcdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZGJ0emRoa2p3aGttemFmY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjgxMTYsImV4cCI6MjA5MTA0NDExNn0.5oIa8VHZrDTF1-3pVJLUHT16PBACoXhKUjGrh9fXUAQ'
);

async function checkAMET() {
  const { data } = await supabase.from('colleges').select('name, stream').ilike('name', '%AMET%');
  console.log('AMET data:', data);
}

checkAMET();

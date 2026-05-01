import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xidbtzdhkjwhkmzafcdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZGJ0emRoa2p3aGttemFmY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjgxMTYsImV4cCI6MjA5MTA0NDExNn0.5oIa8VHZrDTF1-3pVJLUHT16PBACoXhKUjGrh9fXUAQ'
);

async function updateAMET() {
  const { data: amet } = await supabase.from('colleges').select('id, name').ilike('name', '%AMET%').single();
  if (amet) {
    const { data, error } = await supabase
      .from('colleges')
      .update({ stream: 'Maritime, Marine' })
      .eq('id', amet.id)
      .select();
    
    console.log('Update result:', data, error);
  } else {
    console.log('AMET not found');
  }
}

updateAMET();

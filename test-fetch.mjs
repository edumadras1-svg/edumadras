import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: 'd:/project/edumadras/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCollege() {
  const id = "033cbc6c-d5fb-4b2d-9362-7938407c6a35";
  console.log('Fetching', id)
  const { data, error } = await supabase.from('colleges').select('*').eq('id', id).single();
  console.log('College:', data, error);
  
  const { data: courses, error: err2 } = await supabase.from('college_courses').select('*, master_courses(name, stream)').eq('college_id', id);
  console.log('Courses:', courses, err2);
}

checkCollege();

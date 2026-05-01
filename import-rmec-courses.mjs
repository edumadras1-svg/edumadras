import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xidbtzdhkjwhkmzafcdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZGJ0emRoa2p3aGttemFmY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjgxMTYsImV4cCI6MjA5MTA0NDExNn0.5oIa8VHZrDTF1-3pVJLUHT16PBACoXhKUjGrh9fXUAQ'
);

async function importRMEC() {
  const collegeName = "R.M. Engineering College";
  
  // 1. Ensure college exists
  let { data: collegeData } = await supabase
    .from('colleges')
    .select('id')
    .ilike('name', `%R.M.%`)
    .limit(1)
    .single();

  if (!collegeData) {
    const { data: newCollege, error } = await supabase
      .from('colleges')
      .insert([{
        name: collegeName,
        stream: 'Engineering',
        type: 'Private'
      }])
      .select('id')
      .single();
    
    if (error) {
      console.error("Error creating college:", error);
      return;
    }
    collegeData = newCollege;
    console.log("Created RMEC");
  } else {
    console.log("Found RMEC:", collegeData.id);
  }

  const collegeId = collegeData.id;

  const courses = [
    { name: "B.E. Civil Engineering", fee: 125000, duration: "4 Years", seats: 60, stream: "Engineering" },
    { name: "B.E. Mechanical Engineering", fee: 125000, duration: "4 Years", seats: 60, stream: "Engineering" },
    { name: "B.E. Electronics & Communication Engineering (ECE)", fee: 125000, duration: "4 Years", seats: 60, stream: "Engineering" },
    { name: "B.E. Computer Science & Engineering (CSE)", fee: 125000, duration: "4 Years", seats: 60, stream: "Engineering" },
    { name: "B.Tech Artificial Intelligence & Data Science", fee: 125000, duration: "4 Years", seats: 60, stream: "Engineering" },
    { name: "B.Tech CSE (Cyber Security)", fee: 125000, duration: "4 Years", seats: 30, stream: "Engineering" }
  ];

  for (const c of courses) {
    // Check if master course exists
    let { data: masterData } = await supabase
      .from('master_courses')
      .select('id')
      .ilike('name', c.name)
      .limit(1)
      .single();

    if (!masterData) {
      const { data: newMaster, error } = await supabase
        .from('master_courses')
        .insert([{ name: c.name, stream: c.stream }])
        .select('id')
        .single();
      if (error) {
        console.error("Error creating master course:", error);
        continue;
      }
      masterData = newMaster;
    }

    const courseId = masterData.id;

    // Check if college_course link exists
    let { data: ccData } = await supabase
      .from('college_courses')
      .select('id')
      .eq('college_id', collegeId)
      .eq('course_id', courseId)
      .limit(1)
      .single();

    const ccPayload = {
      college_id: collegeId,
      course_id: courseId,
      fee: c.fee,
      duration: c.duration,
      seats: c.seats
    };

    if (ccData) {
      await supabase.from('college_courses').update(ccPayload).eq('id', ccData.id);
      console.log(`Updated link: ${c.name}`);
    } else {
      await supabase.from('college_courses').insert([ccPayload]);
      console.log(`Added link: ${c.name}`);
    }
  }

  console.log("Done adding courses to RMEC!");
}

importRMEC();

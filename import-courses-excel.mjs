import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const xlsx = require('xlsx');

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xidbtzdhkjwhkmzafcdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZGJ0emRoa2p3aGttemFmY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjgxMTYsImV4cCI6MjA5MTA0NDExNn0.5oIa8VHZrDTF1-3pVJLUHT16PBACoXhKUjGrh9fXUAQ'
);

async function runImport() {
  const filePath = './public/course.xlsx';
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  console.log(`Starting import for ${data.length} course entries...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const row of data) {
    try {
      const collegeName = row['College'];
      if (!collegeName) continue;

      const degree = row['Degree'] ? String(row['Degree']).trim() : '';
      let spec = row['Specialization'] ? String(row['Specialization']).trim() : '';
      if (spec === '-') spec = '';

      const courseName = spec ? `${degree} (${spec})` : degree;
      if (!courseName) continue;

      const feeStr = String(row['Tuition Fee (Rs.)'] || '');
      const feeNumMatch = feeStr.replace(/,/g, '').match(/\d+/);
      const fee = feeNumMatch ? parseInt(feeNumMatch[0], 10) : null;

      const seatsStr = String(row['Seats'] || '');
      const seats = seatsStr ? parseInt(seatsStr.replace(/\D/g, ''), 10) : null;

      const eligibility = row['Eligibility'] || null;

      // Determine stream roughly from degree name
      let stream = 'Other';
      if (degree.includes('BTech') || degree.includes('BE')) stream = 'Engineering';
      else if (degree.includes('BSc') || degree.includes('MSc')) stream = 'Science';
      else if (degree.includes('BCA') || degree.includes('MCA')) stream = 'IT';
      else if (degree.includes('BCom') || degree.includes('MCom')) stream = 'Commerce';
      else if (degree.includes('BBA') || degree.includes('MBA')) stream = 'Management';

      // 1. Ensure master course exists
      const { data: existingMaster } = await supabase
        .from('master_courses')
        .select('id')
        .ilike('name', courseName)
        .limit(1)
        .single();

      let courseId;
      if (existingMaster) {
        courseId = existingMaster.id;
      } else {
        const { data: newMaster, error: mErr } = await supabase
          .from('master_courses')
          .insert([{ name: courseName, stream: stream }])
          .select('id')
          .single();

        if (mErr || !newMaster) {
          throw new Error(`Failed to create master course: ${mErr?.message}`);
        }
        courseId = newMaster.id;
      }

      // 2. Find college
      const { data: collegeData, error: cErr } = await supabase
        .from('colleges')
        .select('id')
        .ilike('name', `%${collegeName}%`)
        .limit(1)
        .single();

      if (!collegeData || cErr) {
        // Just log warning if college isn't found, master course is still added
        console.log(`⚠️ Added Master Course "${courseName}" but could not find college "${collegeName}" to link it.`);
        successCount++;
        continue;
      }
      
      const collegeId = collegeData.id;

      // 3. Delete existing duplicate college_course if any to avoid issues, or update
      // Actually, we'll just upsert by fetching if exists
      const { data: existingCC } = await supabase
        .from('college_courses')
        .select('id')
        .eq('college_id', collegeId)
        .eq('course_id', courseId)
        .limit(1)
        .single();

      const ccPayload = {
        college_id: collegeId,
        course_id: courseId,
        fee: isNaN(fee) ? null : fee,
        seats: isNaN(seats) ? null : seats,
        eligibility: eligibility,
        duration: null // Not provided cleanly in the sheet
      };

      if (existingCC) {
        const { error: updErr } = await supabase
          .from('college_courses')
          .update(ccPayload)
          .eq('id', existingCC.id);
        if (updErr) throw updErr;
        console.log(`✓ Updated link: ${courseName} @ ${collegeName}`);
      } else {
        const { error: insErr } = await supabase
          .from('college_courses')
          .insert([ccPayload]);
        if (insErr) throw insErr;
        console.log(`✓ Added link: ${courseName} @ ${collegeName}`);
      }
      
      successCount++;
    } catch (err) {
      console.error(`✗ Error processing row:`, err.message);
      errorCount++;
    }
  }

  console.log(`\nImport Summary: ${successCount} successful, ${errorCount} failed.`);
}

runImport();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const xlsx = require('xlsx');

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xidbtzdhkjwhkmzafcdq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZGJ0emRoa2p3aGttemFmY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjgxMTYsImV4cCI6MjA5MTA0NDExNn0.5oIa8VHZrDTF1-3pVJLUHT16PBACoXhKUjGrh9fXUAQ'
);

async function runImport() {
  const filePath = './public/college_data (1).xlsx';
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  console.log(`Starting import for ${data.length} colleges...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const row of data) {
    try {
      const name = row['Institution Name'];
      if (!name) continue;

      const rankStr = String(row['NIRF / Rank'] || '');
      const rank = rankStr.toLowerCase().includes('not') ? null : parseInt(rankStr.replace(/\D/g, ''));

      const studentsStr = String(row['Students Enrolled'] || '');
      const totalStudents = studentsStr ? parseInt(studentsStr.replace(/\D/g, '')) : null;

      const payload = {
        name: name,
        city: row['City'] || null,
        state: row['State'] || null,
        type: row['Institution Type'] || null,
        stream: row['Primary Stream'] || null,
        established_year: row['Established Year'] ? parseInt(row['Established Year']) : null,
        description: row['Description'] || null,
        approvals: row['Approvals'] ? row['Approvals'].split(',').map(s => s.trim()) : [],
        rank: isNaN(rank) ? null : rank,
        rating: row['Rating (/5)'] ? parseFloat(row['Rating (/5)']) : null,
        avg_package: row['Avg Package (LPA)'] ? parseFloat(row['Avg Package (LPA)']) : null,
        highest_package: row['Highest Package (LPA)'] ? parseFloat(row['Highest Package (LPA)']) : null,
        total_students: isNaN(totalStudents) ? null : totalStudents,
        is_recommended: false
      };

      // Upsert by name
      const { data: existing } = await supabase
        .from('colleges')
        .select('id')
        .ilike('name', name)
        .limit(1)
        .single();

      if (existing) {
        const { error } = await supabase.from('colleges').update(payload).eq('id', existing.id);
        if (error) throw error;
        console.log(`✓ Updated: ${name}`);
      } else {
        const { error } = await supabase.from('colleges').insert([payload]);
        if (error) throw error;
        console.log(`✓ Added: ${name}`);
      }
      successCount++;
    } catch (err) {
      console.error(`✗ Error processing "${row['Institution Name']}":`, err.message);
      errorCount++;
    }
  }

  console.log(`\nImport Summary: ${successCount} successful, ${errorCount} failed.`);
}

runImport();

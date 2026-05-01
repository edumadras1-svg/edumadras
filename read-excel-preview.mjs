import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const xlsx = require('xlsx');

function readExcel() {
  const filePath = './public/course.xlsx';
  const workbook = xlsx.readFile(filePath);
  
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const data = xlsx.utils.sheet_to_json(worksheet);
  console.log(`Found ${data.length} rows.`);
  for (const row of data) {
    const courseName = row['Degree'] + (row['Specialization'] ? ' (' + row['Specialization'] + ')' : '');
    console.log(courseName, '||', row['College'], '||', row['Tuition Fee (Rs.)']);
  }
}

readExcel();

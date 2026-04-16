import fs from 'fs';
import mammoth from 'mammoth';

mammoth.extractRawText({path: "public/EduMadras_SEO_Strategy.docx"})
  .then(function(result){
      fs.writeFileSync("seo.txt", result.value, "utf8");
      console.log("Success");
  })
  .catch(console.error);

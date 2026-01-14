import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read character list from src/data/characters.ts
// This parses the typescript file to extract the array
const charactersPath = path.join(__dirname, '../src/data/characters.ts');
const fileContent = fs.readFileSync(charactersPath, 'utf-8');

// Extract all characters from the file content
// We look for single characters in quotes, e.g. '一'
const matches = fileContent.match(/'[\u4E00-\u9FFF]'/g);

if (!matches) {
  console.error('Could not find any chinese characters in src/data/characters.ts');
  process.exit(1);
}

// Parse and deduplicate
const CHARACTERS = [...new Set(matches.map(m => m.replace(/'/g, '')))];

console.log(`Found ${CHARACTERS.length} unique characters to download.`);

const OUTPUT_DIR = path.join(__dirname, '../public/hanzi-data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const downloadFile = (char) => {
  const url = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${char}.json`;
  const dest = path.join(OUTPUT_DIR, `${char}.json`);

  if (fs.existsSync(dest)) {
    console.log(`Skipping ${char}: Already exists`);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${char}: Status Code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${char}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the partial file
      reject(err);
    });
  });
};

async function main() {
  console.log(`Checking ${CHARACTERS.length} characters...`);
  
  for (const char of CHARACTERS) {
    try {
      await downloadFile(char);
    } catch (err) {
      console.error(`Error downloading ${char}:`, err.message);
    }
  }
  
  console.log('All downloads processed!');
}

main();

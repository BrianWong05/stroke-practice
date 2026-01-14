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

// Extract the content between brackets []
const match = fileContent.match(/export const chineseCharacters: string\[\] = \[\s*([\s\S]*?)\]/);

if (!match) {
  console.error('Could not find chineseCharacters array in src/data/characters.ts');
  process.exit(1);
}

// Parse the extracted string into an array
const CHARACTERS = match[1]
  .split(',')
  .map(char => char.trim().replace(/['"]/g, '')) // Remove quotes and whitespace
  .filter(char => char.length === 1); // Ensure valid characters

console.log(`Found ${CHARACTERS.length} characters to download.`);

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

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Character list from src/data/characters.ts
// Keeep this in sync with the frontend!
const CHARACTERS = [
  '一', '二', '三', '四', '五',
  '六', '七', '八', '九', '十',
  '人', '大', '天', '日', '月',
  '山', '水', '火', '土', '木',
];

const OUTPUT_DIR = path.join(__dirname, '../public/hanzi-data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const downloadFile = (char) => {
  const url = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${char}.json`;
  const dest = path.join(OUTPUT_DIR, `${char}.json`);

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
  console.log(`Starting download for ${CHARACTERS.length} characters...`);
  
  for (const char of CHARACTERS) {
    try {
      await downloadFile(char);
    } catch (err) {
      console.error(`Error downloading ${char}:`, err.message);
    }
  }
  
  console.log('All downloads complete!');
}

main();

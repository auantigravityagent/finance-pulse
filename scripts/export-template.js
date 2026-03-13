import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Reconstruct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target the template directory exactly one level up
const targetDir = path.resolve(__dirname, '../../Template-Suitcase');
const rootDir = path.resolve(__dirname, '..');

// Define exactly what comprises the "Suitcase Architecture"
const suitcaseItems = [
  '.agent',
  '.github',
  'README_AG.md'
];

console.log('🎒 Initializing Suitcase Architecture Export...\n');

try {
  // Ensure the target directory exists
  if (!fs.existsSync(targetDir)) {
    console.log(`Creating target directory: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Iterate over our defined components and copy them using Node 20+ methods
  suitcaseItems.forEach((item) => {
    const sourcePath = path.join(rootDir, item);
    const destPath = path.join(targetDir, item);

    if (fs.existsSync(sourcePath)) {
      console.log(`Copying: ${item} -> ${destPath}`);
      fs.cpSync(sourcePath, destPath, { recursive: true, force: true });
    } else {
      console.warn(`⚠️ Warning: Source item not found -> ${item}`);
    }
  });

  console.log('\n✅ Success! The Golden Template has been exported to:');
  console.log(targetDir);

} catch (error) {
  console.error('\n❌ Export failed due to an error:');
  console.error(error.message);
  process.exit(1);
}

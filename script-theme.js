import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // text colors
  content = content.replace(/text-white/g, 'text-neutral-900');
  content = content.replace(/text-neutral-400/g, 'text-neutral-600');
  content = content.replace(/text-neutral-300/g, 'text-neutral-700');
  
  // borders
  content = content.replace(/border-white\/5/g, 'border-black/5');
  content = content.replace(/border-white\/10/g, 'border-black/10');
  content = content.replace(/border-white\/20/g, 'border-black/20');

  // backgrounds
  content = content.replace(/bg-\[\#050505\]/g, 'bg-white');
  content = content.replace(/bg-neutral-900/g, 'bg-neutral-100');
  content = content.replace(/bg-neutral-800/g, 'bg-neutral-200');
  content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-black/[0.02]');
  content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-black/[0.03]');
  content = content.replace(/bg-white\/5/g, 'bg-black/5');
  content = content.replace(/bg-white\/10/g, 'bg-black/10');
  content = content.replace(/bg-white\/20/g, 'bg-black/20');
  
  // specific black/white inversions for buttons and icons
  // It's tricky because some text-white became text-neutral-900. 
  // Let's do it carefully.
  content = content.replace(/text-black/g, 'text-white');
  // the bg-white for buttons should become bg-neutral-900
  content = content.replace(/bg-white(?=[\s'"])/g, 'bg-neutral-900');
  // but wait, bg-white/10 etc already ran? No, bg-white with a boundary.

  // gradients
  content = content.replace(/from-\[\#050505\]/g, 'from-white');
  content = content.replace(/from-\[\#0A0A0A\]/g, 'from-neutral-50');
  content = content.replace(/bg-\[\#0A0A0A\]/g, 'bg-neutral-50');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('./src/components');
walkDir('./src/pages');
replaceInFile('./src/App.tsx');

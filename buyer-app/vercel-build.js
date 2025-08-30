// This script ensures we're in the right directory for the build
const { execSync } = require('child_process');
const path = require('path');

console.log('Running custom build script for Vercel...');
console.log('Current directory:', process.cwd());

// Change to the app directory
process.chdir(__dirname);
console.log('Changed to directory:', process.cwd());

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  
  // Run the build
  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

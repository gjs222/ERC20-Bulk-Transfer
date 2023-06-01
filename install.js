// install.js

const { exec } = require('child_process');

console.log('Installing dependencies...');

exec('npm install fs csv-parser ethers', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  
  console.log('Dependencies installed successfully!');
});

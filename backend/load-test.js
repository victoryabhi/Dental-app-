const { spawn } = require('child_process');
const path = require('path');

console.log('Starting backend server for load testing...');
const serverProcess = spawn('node', [path.join(__dirname, 'server.js')], {
  env: { ...process.env, PORT: '5000', DB_TYPE: 'mock' },
  stdio: ['pipe', 'pipe', 'inherit']
});

let serverStarted = false;

serverProcess.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(`[Server]: ${output.trim()}`);
  
  if (output.includes('Server running on port') && !serverStarted) {
    serverStarted = true;
    runLoadTest();
  }
});

function runLoadTest() {
  console.log('\nBackend server is up. Starting autocannon baseline load test...');
  console.log('Parameters: 100 virtual users (connections), 60 seconds duration.');

  // Run autocannon using npx
  const autocannon = spawn('npx', ['autocannon', '-c', '100', '-d', '60', 'http://localhost:5000/health'], {
    shell: true,
    stdio: 'inherit'
  });

  autocannon.on('close', (code) => {
    console.log(`\nAutocannon finished with code ${code}.`);
    console.log('Stopping backend server...');
    serverProcess.kill();
    process.exit(code);
  });
}

// Fallback timeout in case output matching fails
setTimeout(() => {
  if (!serverStarted) {
    console.log('\nWarning: Server start match timeout. Attempting to start load test anyway...');
    serverStarted = true;
    runLoadTest();
  }
}, 5000);

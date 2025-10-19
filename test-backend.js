// Test script for the portfolio backend
// Run with: node test-backend.js

const http = require('http');

console.log('\n🧪 Testing Portfolio Backend...\n');

// Test 1: Health Check
function testHealth() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3000/api/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Health check PASSED');
          console.log('   Response:', data);
          resolve();
        } else {
          console.log('❌ Health check FAILED');
          reject(new Error(`Status: ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
  });
}

// Test 2: Contact Form
function testContact() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Backend Test',
      message: 'This is a test message from the backend test script.'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('\n✅ Contact form PASSED');
          const result = JSON.parse(data);
          console.log('   Message ID:', result.id);
          if (result.previewUrl) {
            console.log('   📧 Preview URL:', result.previewUrl);
            console.log('   👆 Open this link to see the test email!');
          }
          resolve();
        } else {
          console.log('\n❌ Contact form FAILED');
          console.log('   Status:', res.statusCode);
          console.log('   Response:', data);
          reject(new Error(`Status: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Run tests
async function runTests() {
  try {
    await testHealth();
    await testContact();
    console.log('\n✅ All tests PASSED! Your backend is working perfectly.\n');
  } catch (err) {
    console.error('\n❌ Test failed:', err.message);
    console.error('\n💡 Make sure the server is running: npm start\n');
    process.exit(1);
  }
}

runTests();

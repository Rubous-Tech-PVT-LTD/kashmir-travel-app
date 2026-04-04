const http = require('http');

http.get('http://localhost:5000/api/v1/itineraries?category=popular', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('API Result (Success):', json.success);
      console.log('Count:', json.data?.length);
      if (json.data && json.data.length > 0) {
        console.log('First ID:', json.data[0]._id);
      }
      process.exit(0);
    } catch (e) {
      console.error('JSON Parse Error:', data);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Request Error:', err.message);
  process.exit(1);
});

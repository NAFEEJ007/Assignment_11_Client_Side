
const axios = require('axios');

async function test() {
    try {
        const res = await axios.get('http://localhost:5000/services?limit=6', {
            headers: {
                'Origin': 'http://localhost:5173'
            }
        });
        console.log('Status:', res.status);
        console.log('Access-Control-Allow-Origin:', res.headers['access-control-allow-origin']);
        console.log('Data length:', res.data.length);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.log('Response Status:', error.response.status);
            console.log('Response Headers:', error.response.headers);
        }
    }
}

test();

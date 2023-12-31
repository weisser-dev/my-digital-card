const fs = require('fs');
const path = require('path');
const config = require('./src/config/config.json');

if (config.encodeProfileData) {
  const profileDataPath = path.join(__dirname, 'src', 'data', 'profileData.json');
  const profileData = fs.readFileSync(profileDataPath, 'utf8');
  const encodedData = Buffer.from(profileData).toString('base64');
  const encodedDataPath = path.join(__dirname, 'public', 'data', 'b64ProfileData.json');
  fs.writeFileSync(encodedDataPath, encodedData);
}

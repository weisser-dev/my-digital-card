const fs = require('fs');
const path = require('path');
const config = require('./src/config/config.json');

if (config.encodeProfileData) {
  const profileDataPath = path.join(__dirname, 'src', 'data', 'profileData.json');
  const encodedDataPath = path.join(__dirname, 'public', 'data', 'b64ProfileData.json');

  // Check if profileData.json exists
  if (fs.existsSync(profileDataPath)) {
    const profileDataStat = fs.statSync(profileDataPath);
    let shouldEncode = true;

    // Check if b64ProfileData.json exists
    if (fs.existsSync(encodedDataPath)) {
      const encodedDataStat = fs.statSync(encodedDataPath);
      // Compare modification times
      shouldEncode = profileDataStat.mtime > encodedDataStat.mtime;
    }

    if (shouldEncode) {
      const profileData = fs.readFileSync(profileDataPath, 'utf8');
      const encodedData = Buffer.from(profileData).toString('base64');
      fs.writeFileSync(encodedDataPath, encodedData);
    } else {
      console.log("It seems like you always have a newer b64 encoded profileData.json, to overwrite pls update src/data/profileData.json or remove the generated public/data/b64ProfileData.json")
    }
  } else {
    console.log("It seems like you don't have a src/data/profileData.json yet, copy the profileData.template.json file, rename it to profileData.json, fill out your information and run npm run prebuild.");
  }
}

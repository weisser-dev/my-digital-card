const fs = require('fs');
const path = require('path');
const config = require('./src/config/config.json');

if (config.encodeProfileData) {
  const profileDataPath = path.join(__dirname, 'src', 'data', 'profileData.json');
  const profileTemplatePath = path.join(__dirname, 'src', 'data', 'profileData.template.json');
  const encodedDataPath = path.join(__dirname, 'public', 'data', 'b64ProfileData.json');

  let shouldEncode = true;

  // Check if profileData.json exists, if not create it from template
  if (!fs.existsSync(profileDataPath)) {
    if (fs.existsSync(profileTemplatePath)) {
      fs.copyFileSync(profileTemplatePath, profileDataPath);
      console.log("No profileData.json existing, generating a new one, please fill out your personal information here, or ignore this log, if your b64ProfileData.json is up to date.");
      shouldEncode = false; // The newly created file will be identical to the template
    } else {
      console.log("profileData.template.json is missing, unable to create profileData.json.");
      return;
    }
  } else if (fs.existsSync(encodedDataPath)) {
    const profileDataStat = fs.statSync(profileDataPath);
    const encodedDataStat = fs.statSync(encodedDataPath);

    // Compare modification times
    shouldEncode = profileDataStat.mtime > encodedDataStat.mtime;

    // Check if the content of profileData.json is identical to the template
    const profileDataContent = fs.readFileSync(profileDataPath, 'utf8');
    const templateContent = fs.readFileSync(profileTemplatePath, 'utf8');
    if (profileDataContent === templateContent) {
      shouldEncode = false;
    }
  }

  if (shouldEncode) {
    const profileData = fs.readFileSync(profileDataPath, 'utf8');
    const encodedData = Buffer.from(profileData).toString('base64');
    fs.writeFileSync(encodedDataPath, encodedData);
  } else {
    console.log("The profile data is up to date and does not need to be encoded.");
  }
}

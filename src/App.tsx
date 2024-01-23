import React, {useEffect, useState} from 'react';
import ProfileSection from './components/ProfileSection/ProfileSection';
import CardElement from './components/CardElement/CardElement';
import SocialMediaSection from './components/SocialMedia/Section/SocialMediaSection';
import Footer from './components/Footer/Footer';
import config from './config/config.json';
import './App.css';

const App = () => {
  const [profileData, setProfileData] = useState({
    profile: {
      name: '', background: '', photo: '', description: '',
    }, footer: {
      copyright: {
        text: '',
      }, linkElements: [],
    }, socialMediaElements: [], cardElements: [{
      title: "", description: "", href: "", icon: ""
    }],
  });

  useEffect(() => {
    if (config.encodeProfileData) {
      // Fetch the encoded profile data
      fetch('data/b64ProfileData.json')
        .then(response => response.text())
        .then(encodedData => {
          // Decode the base64 data
          const uint8Array = new Uint8Array(atob(encodedData).split("").map(c => c.charCodeAt(0)));
          const data = new TextDecoder('utf-8').decode(uint8Array);
          setProfileData(JSON.parse(data));
        })
        .catch(error => {
          console.error('Failed to load and decode profile data:', error);
        });
    } else {
      // Import the profile data directly if not encoded
      import('./data/profileData.json')
        .then(() => {
          setProfileData(profileData);
        });
    }
  }, [profileData]);

  // Wait for profile data to be loaded and decoded
  if (!profileData) {
    return <div>Loading...</div>;
  }

  const {profile, footer} = profileData;
  const socialMediaObjects = profileData.socialMediaElements.map(href => ({href}));

  return (<div className="App">
    {/* Content Section */}
    <div className="ContentWrapper">
      <ProfileSection
        name={profile.name}
        backgroundImage={profile.background}
        profileImage={profile.photo}
        description={profile.description}
      />

      {/* Social Media Section */}
      <SocialMediaSection socialMediaElements={socialMediaObjects}/>

      {/* Card Elements Section */}
      {profileData.cardElements.map((element, index) => (<CardElement key={index} {...element} />))}
    </div>

    {/* Footer Section */}
    <Footer
      copyright={footer.copyright}
      linkElements={footer.linkElements}
    />
  </div>);
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debug log

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8081/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        console.log('Response status:', response.status); // Debug log
        console.log('Data:', response.data); // Debug log

        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error); // Debug log
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    console.log('Profile:', profile); // Log profile whenever it changes
  }, [profile]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-card">
        <div className="profile-header">
          <h1>{profile.data?.Name}</h1>
          <h4>ID: {profile.data?.ID}</h4>
          <h4>Role: {profile.data?.Role}</h4>
        </div>
        <div className="profile-details">
          <h2>Contact Details</h2>
          <p><strong>Email:</strong> {profile.data?.Email}</p>
          <p><strong>Contact Number:</strong> {profile.data?.ContactNumber}</p>
          <p><strong>Created At:</strong> {profile.data?.CreatedAt}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNotification } from '../contexts/NotificationContext';

function Profile() {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      const ref = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
        setFormData({ firstName: snap.data().firstName || '', lastName: snap.data().lastName || '' });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setProfile({ ...profile, ...formData });
      setEdit(false);
      showNotification('Profile updated!', 'success');
    } catch (err) {
      showNotification('Failed to update profile', 'error');
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>Profile</Typography>
        <Typography>Email: {currentUser?.email}</Typography>
        {edit ? (
          <>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>Save</Button>
            <Button sx={{ mt: 2, ml: 2 }} onClick={() => setEdit(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2 }}>First Name: {profile?.firstName}</Typography>
            <Typography>Last Name: {profile?.lastName}</Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEdit(true)}>Edit</Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Profile;
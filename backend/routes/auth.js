const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretpulpcapkey123!@#';

// 1. Sign Up / Register
router.post('/register', async (req, res) => {
  const { email, password, name, doctorId, phone, clinicName, clinicAddress } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password and name are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const docId = doctorId || `DOC-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    if (req.db) {
      // Check if email already exists
      const [existing] = await req.db.query('SELECT * FROM doctors WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      await req.db.query(
        `INSERT INTO doctors (id, name, email, password, phone, clinic_name, clinic_address) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [docId, name, email, hashedPassword, phone || '', clinicName || '', clinicAddress || '']
      );

      const token = jwt.sign({ id: docId, email, name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        token,
        doctor: { id: docId, name, email, phone, clinicName, clinicAddress, isDarkTheme: false }
      });
    } else {
      const existing = req.mockDb.doctors.find(d => d.email === email);
      if (existing) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const newDoc = {
        id: docId,
        name,
        email,
        password: hashedPassword,
        phone: phone || '',
        clinic_name: clinicName || '',
        clinic_address: clinicAddress || '',
        profile_photo_uri: null,
        is_biometric_enabled: false,
        is_two_factor_enabled: false,
        is_dark_theme: false
      };
      req.mockDb.doctors.push(newDoc);

      const token = jwt.sign({ id: docId, email, name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        token,
        doctor: { id: docId, name, email, phone, clinicName, clinicAddress, isDarkTheme: false }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// 2. Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    let doctor = null;

    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM doctors WHERE email = ?', [email]);
      if (rows.length > 0) {
        doctor = rows[0];
      }
    } else {
      doctor = req.mockDb.doctors.find(d => d.email === email);
    }

    if (!doctor) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: doctor.id, email: doctor.email, name: doctor.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone || '',
        clinicName: doctor.clinic_name || '',
        clinicAddress: doctor.clinic_address || '',
        profilePhotoUri: doctor.profile_photo_uri,
        isBiometricEnabled: !!doctor.is_biometric_enabled,
        isTwoFactorEnabled: !!doctor.is_two_factor_enabled,
        isDarkTheme: !!doctor.is_dark_theme
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 3. Get Current Profile
router.get('/profile', authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
    let doctor = null;
    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM doctors WHERE id = ?', [id]);
      if (rows.length > 0) doctor = rows[0];
    } else {
      doctor = req.mockDb.doctors.find(d => d.id === id);
    }

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    res.json({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone || '',
      clinicName: doctor.clinic_name || '',
      clinicAddress: doctor.clinic_address || '',
      profilePhotoUri: doctor.profile_photo_uri,
      isBiometricEnabled: !!doctor.is_biometric_enabled,
      isTwoFactorEnabled: !!doctor.is_two_factor_enabled,
      isDarkTheme: !!doctor.is_dark_theme
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// 4. Update Profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { id } = req.user;
  const { name, phone, clinicName, clinicAddress, isBiometricEnabled, isTwoFactorEnabled, isDarkTheme, profilePhotoUri } = req.body;

  try {
    if (req.db) {
      const [existing] = await req.db.query('SELECT * FROM doctors WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      const current = existing[0];
      const updated = {
        name: name !== undefined ? name : current.name,
        phone: phone !== undefined ? phone : current.phone,
        clinic_name: clinicName !== undefined ? clinicName : current.clinic_name,
        clinic_address: clinicAddress !== undefined ? clinicAddress : current.clinic_address,
        is_biometric_enabled: isBiometricEnabled !== undefined ? (isBiometricEnabled ? 1 : 0) : current.is_biometric_enabled,
        is_two_factor_enabled: isTwoFactorEnabled !== undefined ? (isTwoFactorEnabled ? 1 : 0) : current.is_two_factor_enabled,
        is_dark_theme: isDarkTheme !== undefined ? (isDarkTheme ? 1 : 0) : current.is_dark_theme,
        profile_photo_uri: profilePhotoUri !== undefined ? profilePhotoUri : current.profile_photo_uri
      };

      await req.db.query(
        `UPDATE doctors SET name=?, phone=?, clinic_name=?, clinic_address=?, is_biometric_enabled=?, is_two_factor_enabled=?, is_dark_theme=?, profile_photo_uri=? WHERE id=?`,
        [updated.name, updated.phone, updated.clinic_name, updated.clinic_address, updated.is_biometric_enabled, updated.is_two_factor_enabled, updated.is_dark_theme, updated.profile_photo_uri, id]
      );

      return res.json({ message: 'Profile updated successfully', doctor: updated });
    } else {
      const doctor = req.mockDb.doctors.find(d => d.id === id);
      if (!doctor) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      if (name !== undefined) doctor.name = name;
      if (phone !== undefined) doctor.phone = phone;
      if (clinicName !== undefined) doctor.clinic_name = clinicName;
      if (clinicAddress !== undefined) doctor.clinic_address = clinicAddress;
      if (isBiometricEnabled !== undefined) doctor.is_biometric_enabled = isBiometricEnabled;
      if (isTwoFactorEnabled !== undefined) doctor.is_two_factor_enabled = isTwoFactorEnabled;
      if (isDarkTheme !== undefined) doctor.is_dark_theme = isDarkTheme;
      if (profilePhotoUri !== undefined) doctor.profile_photo_uri = profilePhotoUri;

      return res.json({ message: 'Profile updated successfully', doctor });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// 5. Send OTP (Simulated)
router.post('/otp-send', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  // Simulated OTP sending
  res.json({ message: 'OTP sent to email successfully. Use 1234 for verification.' });
});

// 6. Verify OTP & Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: 'Email, OTP, and new password are required' });
  }

  if (otp !== '1234') {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM doctors WHERE email = ?', [email]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Doctor not found with this email' });
      }

      await req.db.query('UPDATE doctors SET password = ? WHERE email = ?', [hashedPassword, email]);
      res.json({ message: 'Password reset successful' });
    } else {
      const doc = req.mockDb.doctors.find(d => d.email === email);
      if (!doc) {
        return res.status(404).json({ error: 'Doctor not found with this email' });
      }
      doc.password = hashedPassword;
      res.json({ message: 'Password reset successful' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;

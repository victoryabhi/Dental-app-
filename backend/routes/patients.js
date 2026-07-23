const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all patient routes
router.use(authMiddleware);

// 1. Get All Patients
router.get('/', async (req, res) => {
  try {
    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM patients');
      res.json(rows);
    } else {
      res.json(req.mockDb.patients);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// 2. Get Patient By ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM patients WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json(rows[0]);
    } else {
      const patient = req.mockDb.patients.find(p => p.id === id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json(patient);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch patient details' });
  }
});

// 3. Create Patient
router.post('/', async (req, res) => {
  const { name, age, gender, history, phone } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Patient name is required' });
  }

  const patientId = `PAT-${Math.floor(10000 + Math.random() * 90000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  const newPatient = {
    id: patientId,
    name,
    age: age || '',
    gender: gender || '',
    history: history || '',
    phone: phone || '',
    status: 'Low Risk',
    date: dateStr,
    profile_photo_uri: null,
    latest_radiograph_uri: null
  };

  try {
    if (req.db) {
      await req.db.query(
        `INSERT INTO patients (id, name, age, gender, history, phone, status, date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [newPatient.id, newPatient.name, newPatient.age, newPatient.gender, newPatient.history, newPatient.phone, newPatient.status, newPatient.date]
      );
      res.status(201).json(newPatient);
    } else {
      req.mockDb.patients.push(newPatient);
      res.status(201).json(newPatient);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add patient' });
  }
});

// 4. Update Patient
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, history, phone, status, latest_radiograph_uri } = req.body;

  try {
    if (req.db) {
      const [existing] = await req.db.query('SELECT * FROM patients WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      const cur = existing[0];
      const updated = {
        name: name !== undefined ? name : cur.name,
        age: age !== undefined ? age : cur.age,
        gender: gender !== undefined ? gender : cur.gender,
        history: history !== undefined ? history : cur.history,
        phone: phone !== undefined ? phone : cur.phone,
        status: status !== undefined ? status : cur.status,
        latest_radiograph_uri: latest_radiograph_uri !== undefined ? latest_radiograph_uri : cur.latest_radiograph_uri
      };

      await req.db.query(
        `UPDATE patients SET name=?, age=?, gender=?, history=?, phone=?, status=?, latest_radiograph_uri=? WHERE id=?`,
        [updated.name, updated.age, updated.gender, updated.history, updated.phone, updated.status, updated.latest_radiograph_uri, id]
      );

      res.json({ message: 'Patient updated successfully', patient: { id, ...updated } });
    } else {
      const patient = req.mockDb.patients.find(p => p.id === id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      if (name !== undefined) patient.name = name;
      if (age !== undefined) patient.age = age;
      if (gender !== undefined) patient.gender = gender;
      if (history !== undefined) patient.history = history;
      if (phone !== undefined) patient.phone = phone;
      if (status !== undefined) patient.status = status;
      if (latest_radiograph_uri !== undefined) patient.latest_radiograph_uri = latest_radiograph_uri;

      res.json({ message: 'Patient updated successfully', patient });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

// 5. Delete Patient
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (req.db) {
      const [existing] = await req.db.query('SELECT * FROM patients WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      await req.db.query('DELETE FROM patients WHERE id = ?', [id]);
      res.json({ message: 'Patient deleted successfully' });
    } else {
      const idx = req.mockDb.patients.findIndex(p => p.id === id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      req.mockDb.patients.splice(idx, 1);
      
      // Also delete analyses of that patient in mockDb
      req.mockDb.analyses = req.mockDb.analyses.filter(a => a.patientId !== id);

      res.json({ message: 'Patient deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

module.exports = router;

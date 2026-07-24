const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// Database connection & fallback simulation storage
let dbConnection = null;
const mockDb = {
  doctors: [
    {
      id: 'doc-1234',
      name: 'Nancy Thorne',
      email: 'doctor@example.com',
      password: '$2a$10$cyYWHAI76RcIoG1XWGhFeegA9JGYXJDBy8F8RRBKfKs./gvNbbmIW', // bcrypt for 'password123'
      phone: '555-0199',
      clinic_name: 'Elite Dental Clinic',
      clinic_address: '123 Medical Drive, Suite A',
      profile_photo_uri: null,
      is_biometric_enabled: false,
      is_two_factor_enabled: false,
      is_dark_theme: false
    }
  ],
  patients: [
    { id: '45210', name: 'Nancy Thorne', age: '38', gender: 'Female', history: 'No major issues', phone: '555-0101', status: 'High Risk', date: '24 Jan, 2024', profile_photo_uri: null, latest_radiograph_uri: null },
    { id: '45211', name: 'David Rice', age: '33', gender: 'Male', history: 'Diabetes Type 2', phone: '555-0102', status: 'Low Risk', date: '23 Jan, 2024', profile_photo_uri: null, latest_radiograph_uri: null },
    { id: '45212', name: 'Sarah Jenkins', age: '45', gender: 'Female', history: 'Hypertension', phone: '555-0103', status: 'Moderate', date: '22 Jan, 2024', profile_photo_uri: null, latest_radiograph_uri: null }
  ],
  analyses: [
    { id: '1', patientId: '45210', patientName: 'Nancy Thorne', result: 'High Risk', time: '10:30 AM', date: '24 Jan, 2024', rdtValue: '0.4 mm', confidence: '98.4%', xrayUri: null, recommendations: 'Direct Pulp Capping recommended due to proximity to pulp chamber.', material: 'Biodentine' },
    { id: '2', patientId: '45211', patientName: 'David Rice', result: 'Low Risk', time: '09:15 AM', date: '23 Jan, 2024', rdtValue: '1.8 mm', confidence: '99.1%', xrayUri: null, recommendations: 'Indirect Pulp Capping or standard restoration suitable.', material: 'Calcium Hydroxide' },
    { id: '3', patientId: '45212', patientName: 'Sarah Jenkins', result: 'Moderate', time: '04:30 PM', date: '22 Jan, 2024', rdtValue: '0.9 mm', confidence: '97.5%', xrayUri: null, recommendations: 'Stepwise excavation or indirect capping suggested.', material: 'MTA' }
  ]
};

async function initDb() {
  if (process.env.DB_TYPE === 'mock' || !process.env.DB_HOST) {
    console.log('Skipping MySQL connection, starting with in-memory mock fallback.');
    dbConnection = null;
    return;
  }
  try {
    dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    console.log('MySQL connected successfully.');
    
    // Setup tables
    await dbConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'pulp_capping_db'}\`;`);
    await dbConnection.query(`USE \`${process.env.DB_NAME || 'pulp_capping_db'}\`;`);
    
    await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        clinic_name VARCHAR(255),
        clinic_address TEXT,
        profile_photo_uri TEXT,
        is_biometric_enabled BOOLEAN DEFAULT FALSE,
        is_two_factor_enabled BOOLEAN DEFAULT FALSE,
        is_dark_theme BOOLEAN DEFAULT FALSE
      );
    `);

    await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age VARCHAR(50) DEFAULT '',
        gender VARCHAR(50) DEFAULT '',
        history TEXT,
        phone VARCHAR(50) DEFAULT '',
        status VARCHAR(100) DEFAULT 'Low Risk',
        date VARCHAR(100) DEFAULT '',
        profile_photo_uri TEXT DEFAULT NULL,
        latest_radiograph_uri TEXT DEFAULT NULL
      );
    `);

    await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS analyses (
        id VARCHAR(255) PRIMARY KEY,
        patient_id VARCHAR(255) NOT NULL,
        patient_name VARCHAR(255) NOT NULL,
        result VARCHAR(100) NOT NULL,
        time VARCHAR(50) NOT NULL,
        date VARCHAR(100) NOT NULL,
        rdt_value VARCHAR(50) NOT NULL,
        confidence VARCHAR(50) NOT NULL,
        xray_uri TEXT DEFAULT NULL,
        recommendations TEXT,
        material VARCHAR(255) DEFAULT '',
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
      );
    `);

    // Seed defaults if empty
    const [docs] = await dbConnection.query('SELECT * FROM doctors LIMIT 1');
    if (docs.length === 0) {
      await dbConnection.query(`
        INSERT INTO doctors (id, name, email, password, phone, clinic_name, clinic_address, profile_photo_uri, is_biometric_enabled, is_two_factor_enabled, is_dark_theme)
        VALUES ('doc-1234', 'Nancy Thorne', 'doctor@example.com', '$2a$10$cyYWHAI76RcIoG1XWGhFeegA9JGYXJDBy8F8RRBKfKs./gvNbbmIW', '555-0199', 'Elite Dental Clinic', '123 Medical Drive, Suite A', NULL, 0, 0, 0);
      `);
      await dbConnection.query(`
        INSERT INTO patients (id, name, age, gender, history, phone, status, date, profile_photo_uri, latest_radiograph_uri) VALUES
        ('45210', 'Nancy Thorne', '38', 'Female', 'No major issues', '555-0101', 'High Risk', '24 Jan, 2024', NULL, NULL),
        ('45211', 'David Rice', '33', 'Male', 'Diabetes Type 2', '555-0102', 'Low Risk', '23 Jan, 2024', NULL, NULL),
        ('45212', 'Sarah Jenkins', '45', 'Female', 'Hypertension', '555-0103', 'Moderate', '22 Jan, 2024', NULL, NULL);
      `);
      await dbConnection.query(`
        INSERT INTO analyses (id, patient_id, patient_name, result, time, date, rdt_value, confidence, xray_uri, recommendations, material) VALUES
        ('1', '45210', 'Nancy Thorne', 'High Risk', '10:30 AM', '24 Jan, 2024', '0.4 mm', '98.4%', NULL, 'Direct Pulp Capping recommended due to proximity to pulp chamber.', 'Biodentine'),
        ('2', '45211', 'David Rice', 'Low Risk', '09:15 AM', '23 Jan, 2024', '1.8 mm', '99.1%', NULL, 'Indirect Pulp Capping or standard restoration suitable.', 'Calcium Hydroxide'),
        ('3', '45212', 'Sarah Jenkins', 'Moderate', '04:30 PM', '22 Jan, 2024', '0.9 mm', '97.5%', NULL, 'Stepwise excavation or indirect capping suggested.', 'MTA');
      `);
    }
  } catch (e) {
    console.error('MySQL connection failed, starting with in-memory fallback. Error:', e.message);
    dbConnection = null;
  }
}

initDb().then(() => {
  // Share DB reference or fallback helper via request
  app.use((req, res, next) => {
    req.db = dbConnection;
    req.mockDb = mockDb;
    next();
  });

  // Mount API Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/patients', require('./routes/patients'));
  app.use('/api/analyses', require('./routes/analyses'));

  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      database: dbConnection ? 'MySQL' : 'In-Memory Mock'
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

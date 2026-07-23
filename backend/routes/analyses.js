const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all analyses routes
router.use(authMiddleware);

// Setup multer for x-ray image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'xray-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// 1. Upload X-Ray File
router.post('/upload-xray', upload.single('xray'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  
  // Return the web accessible URI
  const fileUri = `/uploads/${req.file.filename}`;
  
  res.json({
    message: 'X-Ray uploaded successfully',
    uri: fileUri,
    filename: req.file.filename,
    isValidRadiograph: true, // Simulated image validation
    validationDetails: {
      exposure: 'Optimal',
      contrast: 'Normal',
      contrastRatio: '1.45',
      teethDetected: ['#14', '#15', '#16']
    }
  });
});

// 2. Get All Analyses
router.get('/', async (req, res) => {
  try {
    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM analyses ORDER BY id DESC');
      // Map database snake_case keys to front-end camelCase keys
      const mapped = rows.map(r => ({
        id: r.id,
        patientId: r.patient_id,
        patientName: r.patient_name,
        result: r.result,
        time: r.time,
        date: r.date,
        rdtValue: r.rdt_value,
        confidence: r.confidence,
        xrayUri: r.xray_uri,
        recommendations: r.recommendations,
        material: r.material
      }));
      res.json(mapped);
    } else {
      res.json(req.mockDb.analyses);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

// 3. Get Analysis by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM analyses WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Analysis not found' });
      }
      const r = rows[0];
      res.json({
        id: r.id,
        patientId: r.patient_id,
        patientName: r.patient_name,
        result: r.result,
        time: r.time,
        date: r.date,
        rdtValue: r.rdt_value,
        confidence: r.confidence,
        xrayUri: r.xray_uri,
        recommendations: r.recommendations,
        material: r.material
      });
    } else {
      const analysis = req.mockDb.analyses.find(a => a.id === id);
      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }
      res.json(analysis);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analysis details' });
  }
});

// 4. Get Analyses for Patient
router.get('/patient/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    if (req.db) {
      const [rows] = await req.db.query('SELECT * FROM analyses WHERE patient_id = ? ORDER BY id DESC', [patientId]);
      const mapped = rows.map(r => ({
        id: r.id,
        patientId: r.patient_id,
        patientName: r.patient_name,
        result: r.result,
        time: r.time,
        date: r.date,
        rdtValue: r.rdt_value,
        confidence: r.confidence,
        xrayUri: r.xray_uri,
        recommendations: r.recommendations,
        material: r.material
      }));
      res.json(mapped);
    } else {
      const list = req.mockDb.analyses.filter(a => a.patientId === patientId);
      res.json(list);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch patient analyses' });
  }
});

// 5. Save Analysis
router.post('/', async (req, res) => {
  const { patientId, patientName, result, rdtValue, confidence, xrayUri, recommendations, material } = req.body;
  
  if (!patientId || !result || !rdtValue) {
    return res.status(400).json({ error: 'Patient ID, result, and RDT value are required' });
  }

  const analysisId = Date.now().toString();
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  const newAnalysis = {
    id: analysisId,
    patientId,
    patientName: patientName || 'Unknown Patient',
    result,
    time: timeStr,
    date: dateStr,
    rdtValue,
    confidence: confidence || '95.0%',
    xrayUri: xrayUri || null,
    recommendations: recommendations || '',
    material: material || ''
  };

  try {
    if (req.db) {
      // 1. Insert analysis record
      await req.db.query(
        `INSERT INTO analyses (id, patient_id, patient_name, result, time, date, rdt_value, confidence, xray_uri, recommendations, material)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [newAnalysis.id, newAnalysis.patientId, newAnalysis.patientName, newAnalysis.result, newAnalysis.time, newAnalysis.date, newAnalysis.rdtValue, newAnalysis.confidence, newAnalysis.xrayUri, newAnalysis.recommendations, newAnalysis.material]
      );
      
      // 2. Update patient's latest radiograph and risk status
      await req.db.query(
        'UPDATE patients SET status = ?, latest_radiograph_uri = ? WHERE id = ?',
        [newAnalysis.result, newAnalysis.xrayUri, newAnalysis.patientId]
      );

      res.status(201).json(newAnalysis);
    } else {
      // 1. Insert analysis in mock DB
      req.mockDb.analyses.push(newAnalysis);
      
      // 2. Update patient in mock DB
      const patient = req.mockDb.patients.find(p => p.id === patientId);
      if (patient) {
        patient.status = result;
        patient.latest_radiograph_uri = xrayUri;
      }
      
      res.status(201).json(newAnalysis);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save analysis' });
  }
});

module.exports = router;

-- AI-Based Pulp Capping Database Schema & Seed Data

CREATE DATABASE IF NOT EXISTS pulp_capping_db;
USE pulp_capping_db;

-- 1. Doctors (Authentication & Profile)
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

-- 2. Patients Table
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

-- 3. Analyses Table
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

-- Seed Doctor (Password is 'password123' hashed with bcrypt $2a$10$95Xh6DqDk8BqQZ7v/83.mOzH5e9u7lP0vE00VzJ8n4y2K8y1X32qG)
INSERT INTO doctors (id, name, email, password, phone, clinic_name, clinic_address, profile_photo_uri, is_biometric_enabled, is_two_factor_enabled, is_dark_theme)
VALUES (
    'doc-1234', 
    'Nancy Thorne', 
    'doctor@example.com', 
    '$2a$10$95Xh6DqDk8BqQZ7v/83.mOzH5e9u7lP0vE00VzJ8n4y2K8y1X32qG', 
    '555-0199', 
    'Elite Dental Clinic', 
    '123 Medical Drive, Suite A', 
    NULL, 
    0, 
    0, 
    0
) ON DUPLICATE KEY UPDATE id=id;

-- Seed Patients
INSERT INTO patients (id, name, age, gender, history, phone, status, date, profile_photo_uri, latest_radiograph_uri) VALUES
('45210', 'Nancy Thorne', '38', 'Female', 'No major issues', '555-0101', 'High Risk', '24 Jan, 2024', NULL, NULL),
('45211', 'David Rice', '33', 'Male', 'Diabetes Type 2', '555-0102', 'Low Risk', '23 Jan, 2024', NULL, NULL),
('45212', 'Sarah Jenkins', '45', 'Female', 'Hypertension', '555-0103', 'Moderate', '22 Jan, 2024', NULL, NULL)
ON DUPLICATE KEY UPDATE id=id;

-- Seed Analyses
INSERT INTO analyses (id, patient_id, patient_name, result, time, date, rdt_value, confidence, xray_uri, recommendations, material) VALUES
('1', '45210', 'Nancy Thorne', 'High Risk', '10:30 AM', '24 Jan, 2024', '0.4 mm', '98.4%', NULL, 'Direct Pulp Capping recommended due to proximity to pulp chamber.', 'Biodentine'),
('2', '45211', 'David Rice', 'Low Risk', '09:15 AM', '23 Jan, 2024', '1.8 mm', '99.1%', NULL, 'Indirect Pulp Capping or standard restoration suitable.', 'Calcium Hydroxide'),
('3', '45212', 'Sarah Jenkins', 'Moderate', '04:30 PM', '22 Jan, 2024', '0.9 mm', '97.5%', NULL, 'Stepwise excavation or indirect capping suggested.', 'MTA')
ON DUPLICATE KEY UPDATE id=id;

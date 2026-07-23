package com.saveetha.aipulpcapping.repository

import com.saveetha.aipulpcapping.database.AnalysisDao
import com.saveetha.aipulpcapping.database.PatientDao
import com.saveetha.aipulpcapping.model.Analysis
import com.saveetha.aipulpcapping.model.Patient
import kotlinx.coroutines.flow.Flow

class PulpCappingRepository(
    private val patientDao: PatientDao,
    private val analysisDao: AnalysisDao
) {
    val allPatients: Flow<List<Patient>> = patientDao.getAllPatients()
    val allAnalyses: Flow<List<Analysis>> = analysisDao.getAllAnalyses()

    suspend fun getPatientById(id: String): Patient? = patientDao.getPatientById(id)
    
    suspend fun insertPatient(patient: Patient) = patientDao.insertPatient(patient)
    
    suspend fun updatePatient(patient: Patient) = patientDao.updatePatient(patient)
    
    suspend fun deletePatient(patient: Patient) = patientDao.deletePatient(patient)

    fun getAnalysesForPatient(patientId: String): Flow<List<Analysis>> = 
        analysisDao.getAnalysesForPatient(patientId)

    suspend fun getAnalysisById(id: String): Analysis? = analysisDao.getAnalysisById(id)

    suspend fun insertAnalysis(analysis: Analysis) = analysisDao.insertAnalysis(analysis)
}

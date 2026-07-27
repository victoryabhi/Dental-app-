package com.saveetha.aipulpcapping.repository

import com.saveetha.aipulpcapping.database.AnalysisDao
import com.saveetha.aipulpcapping.database.PatientDao
import com.saveetha.aipulpcapping.model.Analysis
import com.saveetha.aipulpcapping.model.Patient
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.storage.FirebaseStorage
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.tasks.await
import android.net.Uri

class PulpCappingRepository(
    private val patientDao: PatientDao,
    private val analysisDao: AnalysisDao
) {
    private val db = FirebaseFirestore.getInstance()
    private val rtdb = FirebaseDatabase.getInstance("https://ai-based-pulp-capping-default-rtdb.firebaseio.com/").reference
    private val storage = FirebaseStorage.getInstance().reference

    val allPatients: Flow<List<Patient>> = patientDao.getAllPatients()
    val allAnalyses: Flow<List<Analysis>> = analysisDao.getAllAnalyses()

    suspend fun getPatientById(id: String): Patient? = patientDao.getPatientById(id)
    
    suspend fun insertPatient(patient: Patient, userId: String? = null) {
        var updatedPatient = patient
        
        // Upload images if they exist and are local Uris
        userId?.let { uid ->
            val profileUrl = patient.profilePhotoUri?.let { uriStr ->
                if (uriStr.startsWith("content://") || uriStr.startsWith("file://")) {
                    uploadImage(uid, "profiles", patient.id, Uri.parse(uriStr))
                } else uriStr
            }
            
            val xrayUrl = patient.latestRadiographUri?.let { uriStr ->
                if (uriStr.startsWith("content://") || uriStr.startsWith("file://")) {
                    uploadImage(uid, "xrays", patient.id, Uri.parse(uriStr))
                } else uriStr
            }
            
            updatedPatient = patient.copy(
                profilePhotoUri = profileUrl,
                latestRadiographUri = xrayUrl
            )
        }

        patientDao.insertPatient(updatedPatient)
        
        userId?.let { uid ->
            try {
                // Sync to Firestore
                db.collection("doctors").document(uid)
                    .collection("patients").document(updatedPatient.id).set(updatedPatient).await()
                
                // Sync to Realtime Database
                rtdb.child("doctors").child(uid)
                    .child("patients").child(updatedPatient.id).setValue(updatedPatient).await()
            } catch (e: Exception) {
                android.util.Log.e("SYNC", "Failed to sync patient: ${e.message}")
            }
        }
    }

    private suspend fun uploadImage(userId: String, folder: String, fileName: String, uri: Uri): String? {
        android.util.Log.d("STORAGE", "Bypassing cloud upload, saving local URI: $uri")
        return uri.toString()
    }
    
    suspend fun updatePatient(patient: Patient, userId: String? = null) {
        patientDao.updatePatient(patient)
        userId?.let { uid ->
            try {
                // Sync to Firestore
                db.collection("doctors").document(uid)
                    .collection("patients").document(patient.id).set(patient).await()
                
                // Sync to Realtime Database
                rtdb.child("doctors").child(uid)
                    .child("patients").child(patient.id).setValue(patient).await()
            } catch (e: Exception) {
                android.util.Log.e("SYNC", "Failed to sync update: ${e.message}")
            }
        }
    }
    
    suspend fun deletePatient(patient: Patient, userId: String? = null) {
        patientDao.deletePatient(patient)
        userId?.let { uid ->
            try {
                // Delete from Firestore
                db.collection("doctors").document(uid)
                    .collection("patients").document(patient.id).delete().await()
                
                // Delete from Realtime Database
                rtdb.child("doctors").child(uid)
                    .child("patients").child(patient.id).removeValue().await()
            } catch (e: Exception) {
                android.util.Log.e("SYNC", "Failed to sync delete: ${e.message}")
            }
        }
    }

    fun getAnalysesForPatient(patientId: String): Flow<List<Analysis>> = 
        analysisDao.getAnalysesForPatient(patientId)

    suspend fun getAnalysisById(id: String): Analysis? = analysisDao.getAnalysisById(id)

    suspend fun insertAnalysis(analysis: Analysis, userId: String? = null) {
        analysisDao.insertAnalysis(analysis)
        userId?.let { uid ->
            try {
                // Sync to Firestore
                db.collection("doctors").document(uid)
                    .collection("patients").document(analysis.patientId)
                    .collection("analyses").document(analysis.id).set(analysis).await()
                
                // Sync to Realtime Database
                rtdb.child("doctors").child(uid)
                    .child("patients").child(analysis.patientId)
                    .child("analyses").child(analysis.id).setValue(analysis).await()
            } catch (e: Exception) {
                android.util.Log.e("SYNC", "Failed to sync analysis: ${e.message}")
            }
        }
    }
}

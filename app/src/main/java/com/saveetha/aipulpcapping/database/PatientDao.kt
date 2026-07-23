package com.saveetha.aipulpcapping.database

import androidx.room.*
import com.saveetha.aipulpcapping.model.Patient
import kotlinx.coroutines.flow.Flow

@Dao
interface PatientDao {
    @Query("SELECT * FROM patients")
    fun getAllPatients(): Flow<List<Patient>>

    @Query("SELECT * FROM patients WHERE id = :id")
    suspend fun getPatientById(id: String): Patient?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPatient(patient: Patient)

    @Update
    suspend fun updatePatient(patient: Patient)

    @Delete
    suspend fun deletePatient(patient: Patient)
}

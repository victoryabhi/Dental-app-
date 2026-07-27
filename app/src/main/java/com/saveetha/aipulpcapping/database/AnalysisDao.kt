package com.saveetha.aipulpcapping.database

import androidx.room.*
import com.saveetha.aipulpcapping.model.Analysis
import kotlinx.coroutines.flow.Flow

@Dao
interface AnalysisDao {
    @Query("SELECT * FROM analyses ORDER BY id DESC")
    fun getAllAnalyses(): Flow<List<Analysis>>

    @Query("SELECT * FROM analyses WHERE patientId = :patientId")
    fun getAnalysesForPatient(patientId: String): Flow<List<Analysis>>

    @Query("SELECT * FROM analyses WHERE id = :id")
    suspend fun getAnalysisById(id: String): Analysis?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAnalysis(analysis: Analysis)
}

package com.saveetha.aipulpcapping

import android.app.Application
import com.saveetha.aipulpcapping.database.AppDatabase
import com.saveetha.aipulpcapping.repository.PulpCappingRepository

class PulpCappingApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        android.util.Log.d("APP_START", "PulpCappingApplication onCreate")
    }
    val database by lazy { AppDatabase.getDatabase(this) }
    val repository by lazy { PulpCappingRepository(database.patientDao(), database.analysisDao()) }
}

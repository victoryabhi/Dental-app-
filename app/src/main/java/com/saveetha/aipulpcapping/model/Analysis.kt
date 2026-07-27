package com.saveetha.aipulpcapping.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "analyses")
data class Analysis(
    @PrimaryKey val id: String,
    val patientId: String,
    val patientName: String,
    val result: String,
    val time: String,
    val date: String = "",
    val rdtValue: String = "",
    val confidence: String = "",
    val xRayUri: String? = null,
    val recommendations: String = "",
    val material: String = ""
)

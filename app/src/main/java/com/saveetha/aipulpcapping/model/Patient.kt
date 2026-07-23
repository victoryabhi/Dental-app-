package com.saveetha.aipulpcapping.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "patients")
data class Patient(
    @PrimaryKey val id: String,
    val name: String,
    val age: String = "",
    val gender: String = "",
    val history: String = "",
    val phone: String = "",
    val status: String = "Low Risk",
    val date: String = "",
    val profilePhotoUri: String? = null,
    val latestRadiographUri: String? = null
)

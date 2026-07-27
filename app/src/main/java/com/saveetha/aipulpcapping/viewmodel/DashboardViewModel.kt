package com.saveetha.aipulpcapping.viewmodel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.saveetha.aipulpcapping.model.Analysis
import com.saveetha.aipulpcapping.model.Patient
import com.saveetha.aipulpcapping.repository.PulpCappingRepository
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.analytics.logEvent
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class Notification(val id: Int, val title: String, val description: String, val time: String, val patientId: String? = null)

class DashboardViewModel(
    private val repository: PulpCappingRepository?,
    private val authViewModel: AuthViewModel? = null,
    private val context: android.content.Context? = null
) : ViewModel() {

    private var analytics: FirebaseAnalytics? = null

    init {
        context?.let {
            try {
                analytics = FirebaseAnalytics.getInstance(it.applicationContext)
            } catch (e: Exception) {
                android.util.Log.e("ANALYTICS", "Firebase Analytics initialization failed in DashboardViewModel: ${e.message}")
            }
        }
    }

    private val userId: String? get() = authViewModel?.userId

    private val _notifications = mutableStateListOf(
        Notification(1, "AI Analysis Complete", "Analysis for Patient #45210 is ready.", "2m ago", "45210"),
        Notification(2, "System Update", "New clinical AI model version 2.4 deployed.", "1h ago"),
        Notification(3, "Patient Appointment", "David Rice is scheduled for 10:30 AM today.", "3h ago", "45211")
    )
    val notifications: List<Notification> = _notifications

    val patients: StateFlow<List<Patient>> = (repository?.allPatients ?: flowOf(emptyList()))
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val recentAnalyses: StateFlow<List<Analysis>> = (repository?.allAnalyses ?: flowOf(emptyList()))
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    init {
        viewModelScope.launch {
            try {
                if (repository != null) {
                    android.util.Log.d("APP_START", "DashboardViewModel Initializing - Live DB")
                    repository.allPatients.take(1).collect { currentPatients ->
                        if (currentPatients.isEmpty()) {
                            android.util.Log.d("DATABASE", "Seeding initial data")
                            repository.insertPatient(Patient("45210", "Nancy Thorne", "38", "Female", "No major issues", "555-0101", "High Risk", "24 Jan, 2024"))
                            repository.insertPatient(Patient("45211", "David Rice", "33", "Male", "Diabetes Type 2", "555-0102", "Low Risk", "23 Jan, 2024"))
                            repository.insertPatient(Patient("45212", "Sarah Jenkins", "45", "Female", "Hypertension", "555-0103", "Moderate", "22 Jan, 2024"))
                            
                            repository.insertAnalysis(Analysis("1", "45210", "Nancy Thorne", "High Risk", "10:30 AM", "24 Jan, 2024", "0.4 mm", "98.4%", material = "Biodentine", recommendations = "Direct Pulp Capping recommended due to proximity to pulp chamber."))
                            repository.insertAnalysis(Analysis("2", "45211", "David Rice", "Low Risk", "09:15 AM", "23 Jan, 2024", "1.8 mm", "99.1%", material = "MTA", recommendations = "Indirect Pulp Capping or standard restoration suitable."))
                            repository.insertAnalysis(Analysis("3", "45212", "Sarah Jenkins", "Moderate", "04:30 PM", "22 Jan, 2024", "0.9 mm", "97.5%", material = "Calcium Hydroxide", recommendations = "Stepwise excavation or indirect capping suggested."))
                        }
                    }
                }
            } catch (e: Exception) {
                android.util.Log.e("APP_CRASH", "Database seeding failed: ${e.message}", e)
            }
        }
    }

    private val _searchQuery = mutableStateOf("")
    val searchQuery: State<String> = _searchQuery

    private val _selectedImageUri = mutableStateOf<String?>(null)
    val selectedImageUri: State<String?> = _selectedImageUri

    private val _rdtValue = mutableStateOf("")
    val rdtValue: State<String> = _rdtValue

    private val _selectedPatientId = mutableStateOf<String?>(null)
    val selectedPatientId: State<String?> = _selectedPatientId

    private val _calculatedRdt = mutableStateOf(0.4f)
    val calculatedRdt: State<Float> = _calculatedRdt

    private val _riskLevel = mutableStateOf("High Risk")
    val riskLevel: State<String> = _riskLevel

    val aiRecommendedMaterial: String
        get() = when (_riskLevel.value) {
            "High Risk" -> "Biodentine"
            "Moderate Risk" -> "MTA"
            "Low Risk" -> "Calcium Hydroxide"
            else -> "Biodentine"
        }

    val aiRecommendationJustification: String
        get() = when (_riskLevel.value) {
            "High Risk" -> "Given the low RDT and high risk of pulpal exposure, Biodentine is recommended due to its superior sealing ability, biocompatibility, and rapid setting time."
            "Moderate Risk" -> "The moderate RDT suggests a need for a bioactive material with good long-term sealing. MTA is suggested for its proven clinical success in indirect pulp capping."
            "Low Risk" -> "With a safe RDT, Calcium Hydroxide is a standard and effective choice for promoting secondary dentin formation while being cost-effective."
            else -> "Based on the clinical parameters, Biodentine is the most versatile choice for this assessment."
        }

    private val _selectedMaterial = mutableStateOf<String?>(null)
    val selectedMaterial: State<String?> = _selectedMaterial

    fun onSearchQueryChange(query: String) {
        _searchQuery.value = query
    }

    fun onRdtValueChange(value: String) {
        if (value.isEmpty() || value.matches(Regex("""^\d*\.?\d*$"""))) {
            _rdtValue.value = value
        }
    }

    fun setCalculatedRdt(value: Float) {
        _calculatedRdt.value = value
        _riskLevel.value = when {
            value < 0.5f -> "High Risk"
            value < 1.5f -> "Moderate Risk"
            else -> "Low Risk"
        }
    }

    fun setSelectedImage(uri: String) {
        _selectedImageUri.value = uri
    }

    fun setSelectedPatient(patientId: String?) {
        _selectedPatientId.value = patientId
    }

    fun setSelectedMaterial(material: String) {
        _selectedMaterial.value = material
    }

    fun saveAnalysis(
        patientId: String,
        patientName: String,
        result: String,
        rdtValue: String,
        confidence: String,
        material: String,
        recommendations: String,
        context: android.content.Context? = null
    ) {
        viewModelScope.launch {
            val xRayUri = _selectedImageUri.value
            val newAnalysis = Analysis(
                id = (System.currentTimeMillis()).toString(),
                patientId = patientId,
                patientName = patientName,
                result = result,
                time = java.text.SimpleDateFormat("hh:mm a", java.util.Locale.getDefault()).format(java.util.Date()),
                date = java.text.SimpleDateFormat("dd MMM, yyyy", java.util.Locale.getDefault()).format(java.util.Date()),
                rdtValue = rdtValue,
                confidence = confidence,
                xRayUri = xRayUri,
                recommendations = recommendations,
                material = material
            )
            repository?.insertAnalysis(newAnalysis, userId)
            
            try {
                val activeAnalytics = analytics ?: context?.let { FirebaseAnalytics.getInstance(it.applicationContext) }
                activeAnalytics?.logEvent("pulp_cap_analysis") {
                    param("patient_id", patientId)
                    param("result", result)
                    param("rdt_value", rdtValue)
                    param("recommended_material", material)
                }
            } catch (ae: Exception) {
                android.util.Log.e("ANALYTICS", "Failed to log pulp_cap_analysis event: ${ae.message}")
            }
            
            // Show Local Notification
            context?.let {
                com.saveetha.aipulpcapping.utils.NotificationHelper.showAnalysisNotification(
                    it, 
                    "AI Analysis Complete", 
                    "New results for $patientName: $result"
                )
            }
            
            // Update patient's latest radiograph and status
            repository?.getPatientById(patientId)?.let { patient ->
                repository.updatePatient(patient.copy(
                    latestRadiographUri = xRayUri,
                    status = result
                ), userId)
            }
            
            // Reset session state
            _selectedImageUri.value = null
            _rdtValue.value = ""
        }
    }

    fun addPatient(patient: Patient) {
        viewModelScope.launch {
            repository?.insertPatient(patient, userId)
            try {
                analytics?.logEvent("add_patient") {
                    param("patient_id", patient.id)
                    param("risk_level", patient.status)
                }
            } catch (ae: Exception) {
                android.util.Log.e("ANALYTICS", "Failed to log add_patient event: ${ae.message}")
            }
        }
    }

    fun updatePatient(updatedPatient: Patient) {
        viewModelScope.launch {
            repository?.updatePatient(updatedPatient, userId)
            try {
                analytics?.logEvent("update_patient") {
                    param("patient_id", updatedPatient.id)
                }
            } catch (ae: Exception) {
                android.util.Log.e("ANALYTICS", "Failed to log update_patient event: ${ae.message}")
            }
        }
    }

    fun deletePatient(patientId: String) {
        viewModelScope.launch {
            repository?.getPatientById(patientId)?.let {
                repository.deletePatient(it, userId)
                try {
                    analytics?.logEvent("delete_patient") {
                        param("patient_id", patientId)
                    }
                } catch (ae: Exception) {
                    android.util.Log.e("ANALYTICS", "Failed to log delete_patient event: ${ae.message}")
                }
            }
        }
    }

    suspend fun getPatientById(patientId: String): Patient? {
        return repository?.getPatientById(patientId)
    }

    fun getAnalysesForPatient(patientId: String) = repository?.getAnalysesForPatient(patientId) ?: flowOf(emptyList())

    suspend fun getAnalysisById(analysisId: String): Analysis? {
        return repository?.getAnalysisById(analysisId)
    }

    fun clearNotifications() {
        _notifications.clear()
    }

    val totalPatients: StateFlow<Int> = (repository?.allPatients?.map { it.size } ?: flowOf(0))
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)

    val totalAnalyses: StateFlow<Int> = (repository?.allAnalyses?.map { it.size } ?: flowOf(0))
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)

    val highRiskCases: StateFlow<Int> = (repository?.allAnalyses?.map { list -> 
        var count = 0
        for (analysis in list) {
            if (analysis.result == "High Risk") count++
        }
        count
    } ?: flowOf(0))
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), 0)
}

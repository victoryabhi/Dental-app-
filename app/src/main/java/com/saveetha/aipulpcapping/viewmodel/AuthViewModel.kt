package com.saveetha.aipulpcapping.viewmodel

import android.content.Context
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.analytics.logEvent
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class AuthViewModel : ViewModel() {

    private var analytics: FirebaseAnalytics? = null

    private val auth: FirebaseAuth? by lazy {
        try {
            FirebaseAuth.getInstance()
        } catch (e: Exception) {
            android.util.Log.e("AUTH", "Firebase Auth not initialized: ${e.message}")
            null
        }
    }
    private val db: FirebaseFirestore? by lazy {
        try {
            FirebaseFirestore.getInstance()
        } catch (e: Exception) {
            android.util.Log.e("AUTH", "Firestore not initialized: ${e.message}")
            null
        }
    }

    private val _email = mutableStateOf("")
    val email: State<String> = _email

    private val _password = mutableStateOf("")
    val password: State<String> = _password

    private val _emailError = mutableStateOf<String?>(null)
    val emailError: State<String?> = _emailError

    private val _fullName = mutableStateOf("")
    val fullName: State<String> = _fullName

    private val _doctorId = mutableStateOf("")
    val doctorId: State<String> = _doctorId

    private val _profilePhotoUri = mutableStateOf<String?>(null)
    val profilePhotoUri: State<String?> = _profilePhotoUri

    private val _phoneNumber = mutableStateOf("")
    val phoneNumber: State<String> = _phoneNumber

    private val _clinicName = mutableStateOf("")
    val clinicName: State<String> = _clinicName

    private val _clinicAddress = mutableStateOf("")
    val clinicAddress: State<String> = _clinicAddress

    private val _isDarkTheme = mutableStateOf(false)
    val isDarkTheme: State<Boolean> = _isDarkTheme

    private val _isBiometricEnabled = mutableStateOf(false)
    val isBiometricEnabled: State<Boolean> = _isBiometricEnabled

    private val _isTwoFactorEnabled = mutableStateOf(false)
    val isTwoFactorEnabled: State<Boolean> = _isTwoFactorEnabled

    private val _isLoggedIn = mutableStateOf(false)
    val isLoggedIn: State<Boolean> = _isLoggedIn

    private val _passwordError = mutableStateOf<String?>(null)
    val passwordError: State<String?> = _passwordError

    private val _otp = mutableStateOf("")
    val otp: State<String> = _otp

    private val _otpError = mutableStateOf<String?>(null)
    val otpError: State<String?> = _otpError

    val userId: String?
        get() = auth?.currentUser?.uid

    fun initAuth(context: Context) {
        try {
            analytics = FirebaseAnalytics.getInstance(context.applicationContext)
        } catch (e: Exception) {
            android.util.Log.e("ANALYTICS", "Firebase Analytics initialization failed: ${e.message}")
        }
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        val firebaseUser = auth?.currentUser
        _isLoggedIn.value = firebaseUser != null || prefs.getBoolean("is_logged_in", false)
        
        if (firebaseUser != null) {
            viewModelScope.launch {
                fetchProfileFromFirestore(context)
            }
        }

        _fullName.value = prefs.getString("user_name", "") ?: ""
        _doctorId.value = prefs.getString("doctor_id", "DOC-${(1000..9999).random()}") ?: ""
        _profilePhotoUri.value = prefs.getString("profile_photo", null)
        _email.value = prefs.getString("user_email", "") ?: ""
        _phoneNumber.value = prefs.getString("phone_number", "") ?: ""
        _clinicName.value = prefs.getString("clinic_name", "") ?: ""
        _clinicAddress.value = prefs.getString("clinic_address", "") ?: ""
        _isDarkTheme.value = prefs.getBoolean("is_dark_theme", false)
        _isBiometricEnabled.value = prefs.getBoolean("is_biometric_enabled", false)
        _isTwoFactorEnabled.value = prefs.getBoolean("is_two_factor_enabled", false)
    }

    private fun saveAuth(context: Context) {
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().apply {
            putBoolean("is_logged_in", true)
            putString("user_name", _fullName.value)
            putString("doctor_id", _doctorId.value)
            putString("profile_photo", _profilePhotoUri.value)
            putString("user_email", _email.value)
            putString("phone_number", _phoneNumber.value)
            putString("clinic_name", _clinicName.value)
            putString("clinic_address", _clinicAddress.value)
            putBoolean("is_biometric_enabled", _isBiometricEnabled.value)
            putBoolean("is_two_factor_enabled", _isTwoFactorEnabled.value)
            apply()
        }
        _isLoggedIn.value = true
    }

    fun setBiometricEnabled(context: Context, enabled: Boolean) {
        _isBiometricEnabled.value = enabled
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().putBoolean("is_biometric_enabled", enabled).apply()
    }

    fun setTwoFactorEnabled(context: Context, enabled: Boolean) {
        _isTwoFactorEnabled.value = enabled
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().putBoolean("is_two_factor_enabled", enabled).apply()
    }

    fun updateProfile(
        context: Context,
        name: String,
        id: String,
        email: String,
        phone: String,
        clinic: String,
        address: String
    ) {
        _fullName.value = name
        _doctorId.value = id
        _email.value = email
        _phoneNumber.value = phone
        _clinicName.value = clinic
        _clinicAddress.value = address

        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().apply {
            putString("user_name", name)
            putString("doctor_id", id)
            putString("user_email", email)
            putString("phone_number", phone)
            putString("clinic_name", clinic)
            putString("clinic_address", address)
            apply()
        }
    }

    fun setDarkTheme(context: Context, isDark: Boolean) {
        _isDarkTheme.value = isDark
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().putBoolean("is_dark_theme", isDark).apply()
    }

    fun updateProfilePhoto(context: Context, uri: String) {
        _profilePhotoUri.value = uri
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().putString("profile_photo", uri).apply()
    }

    fun updateDoctorDetails(context: Context, name: String, id: String) {
        _fullName.value = name
        _doctorId.value = id
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().apply {
            putString("user_name", name)
            putString("doctor_id", id)
            apply()
        }
    }

    fun onEmailChange(newEmail: String) {
        _email.value = newEmail
        _emailError.value = null
    }

    fun onPasswordChange(newPassword: String) {
        _password.value = newPassword
        _passwordError.value = null
    }

    fun onOtpChange(newOtp: String) {
        if (newOtp.length <= 4) {
            _otp.value = newOtp
            _otpError.value = null
        }
    }

    fun onFullNameChange(newName: String) {
        _fullName.value = newName
    }

    fun onPhoneNumberChange(newPhone: String) {
        _phoneNumber.value = newPhone
    }

    fun validateEmail(): Boolean {
        return if (android.util.Patterns.EMAIL_ADDRESS.matcher(_email.value).matches()) {
            _emailError.value = null
            true
        } else {
            _emailError.value = "Invalid email format"
            false
        }
    }

    fun validatePassword(): Boolean {
        return if (_password.value.length >= 6) {
            _passwordError.value = null
            true
        } else {
            _passwordError.value = "Password must be at least 6 characters"
            false
        }
    }

    fun validateOtp(): Boolean {
        return if (_otp.value == "1234") {
            _otpError.value = null
            true
        } else {
            _otpError.value = "Invalid OTP"
            false
        }
    }

    fun login(context: Context, onSuccess: () -> Unit, onError: () -> Unit) {
        if (_email.value.isEmpty() || _password.value.isEmpty() || auth == null) {
            onError()
            return
        }
        viewModelScope.launch {
            try {
                auth?.signInWithEmailAndPassword(_email.value, _password.value)?.await()
                fetchProfileFromFirestore(context)
                saveAuth(context)
                try {
                    analytics?.logEvent(FirebaseAnalytics.Event.LOGIN) {
                        param(FirebaseAnalytics.Param.METHOD, "email")
                    }
                } catch (ae: Exception) {
                    android.util.Log.e("ANALYTICS", "Failed to log login event: ${ae.message}")
                }
                onSuccess()
            } catch (e: Exception) {
                android.util.Log.e("AUTH", "Login failed: ${e.message}")
                onError()
            }
        }
    }

    fun registerUser(context: Context) {
        if (_email.value.isNotEmpty() && _password.value.isNotEmpty() && auth != null && db != null) {
            viewModelScope.launch {
                try {
                    auth?.createUserWithEmailAndPassword(_email.value, _password.value)?.await()
                    val profile = mapOf(
                        "name" to _fullName.value,
                        "doctorId" to _doctorId.value,
                        "phone" to _phoneNumber.value,
                        "clinic" to _clinicName.value,
                        "address" to _clinicAddress.value,
                        "email" to _email.value
                    )
                    auth?.currentUser?.uid?.let { uid ->
                        db?.collection("doctors")?.document(uid)?.set(profile)?.await()
                    }
                    saveAuth(context)
                    try {
                        analytics?.logEvent(FirebaseAnalytics.Event.SIGN_UP) {
                            param(FirebaseAnalytics.Param.METHOD, "email")
                        }
                    } catch (ae: Exception) {
                        android.util.Log.e("ANALYTICS", "Failed to log sign_up event: ${ae.message}")
                    }
                } catch (e: Exception) {
                    android.util.Log.e("AUTH", "Registration failed: ${e.message}")
                }
            }
        }
    }

    private suspend fun fetchProfileFromFirestore(context: Context) {
        auth?.currentUser?.uid?.let { uid ->
            try {
                val doc = db?.collection("doctors")?.document(uid)?.get()?.await()
                if (doc != null && doc.exists()) {
                    _fullName.value = doc.getString("name") ?: ""
                    _doctorId.value = doc.getString("doctorId") ?: ""
                    _phoneNumber.value = doc.getString("phone") ?: ""
                    _clinicName.value = doc.getString("clinic") ?: ""
                    _clinicAddress.value = doc.getString("address") ?: ""
                }
            } catch (e: Exception) {
                android.util.Log.e("AUTH", "Fetch profile failed: ${e.message}")
            }
        }
    }

    fun logout(context: Context) {
        auth?.signOut()
        val prefs = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)
        prefs.edit().clear().apply()
        _isLoggedIn.value = false
        _fullName.value = ""
        _email.value = ""
        try {
            analytics?.logEvent("logout", null)
        } catch (ae: Exception) {
            android.util.Log.e("ANALYTICS", "Failed to log logout event: ${ae.message}")
        }
    }

    fun simulateValidation(onComplete: () -> Unit) {
        viewModelScope.launch {
            delay(2000)
            onComplete()
        }
    }
}

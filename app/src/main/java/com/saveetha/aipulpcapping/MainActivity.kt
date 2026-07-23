package com.saveetha.aipulpcapping

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.saveetha.aipulpcapping.navigation.SetupNavGraph
import com.saveetha.aipulpcapping.ui.theme.AiBasedPulpCappingTheme
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        android.util.Log.d("APP_START", "MainActivity onCreate - Starting App")
        try {
            val app = application as? PulpCappingApplication
            if (app == null) {
                android.util.Log.e("APP_CRASH", "FATAL: Application is not PulpCappingApplication")
            } else {
                android.util.Log.d("DATABASE", "Database & Repository references retrieved")
            }
            
            enableEdgeToEdge()
            
            val authViewModel = ViewModelProvider(this)[AuthViewModel::class.java]
            try {
                authViewModel.initAuth(this)
            } catch (e: Exception) {
                android.util.Log.e("APP_CRASH", "AuthViewModel initAuth failed: ${e.message}")
            }
            
            setContent {
                val isDark by authViewModel.isDarkTheme
                AiBasedPulpCappingTheme(darkTheme = isDark) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                    ) {
                        val navController = rememberNavController()
                        val dashboardViewModel: DashboardViewModel = viewModel(
                            factory = object : ViewModelProvider.Factory {
                                @Suppress("UNCHECKED_CAST")
                                override fun <T : ViewModel> create(modelClass: Class<T>): T {
                                    return DashboardViewModel(app?.repository) as T
                                }
                            }
                        )
                        SetupNavGraph(
                            navController = navController,
                            authViewModel = authViewModel,
                            dashboardViewModel = dashboardViewModel
                        )
                    }
                }
            }
        } catch (e: Exception) {
            android.util.Log.e("APP_CRASH", "MainActivity onCreate Fatal Failure: ${e.message}", e)
        }
    }
}

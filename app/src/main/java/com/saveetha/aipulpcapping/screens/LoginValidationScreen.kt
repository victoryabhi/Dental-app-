package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.SavePasswordDialog
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel

@Composable
fun LoginValidationScreen(navController: NavController, viewModel: AuthViewModel) {
    val context = LocalContext.current
    var showSaveDialog by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        viewModel.simulateValidation {
            if (viewModel.isTwoFactorEnabled.value) {
                navController.navigate(Screen.OtpVerification.route)
            } else {
                showSaveDialog = true
            }
        }
    }

    if (showSaveDialog) {
        SavePasswordDialog(
            onSave = {
                viewModel.registerUser(context) // Re-using registerUser to save to "prefs" as implemented in AuthViewModel
                showSaveDialog = false
                navController.navigate(Screen.Dashboard.route) {
                    popUpTo(Screen.Splash.route) { inclusive = true }
                }
            },
            onDismiss = {
                showSaveDialog = false
                navController.navigate(Screen.Dashboard.route) {
                    popUpTo(Screen.Splash.route) { inclusive = true }
                }
            }
        )
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8F9FA)),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier
                .padding(24.dp)
                .fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(8.dp)
        ) {
            Column(
                modifier = Modifier.padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(64.dp),
                    color = Color(0xFF007AFF),
                    strokeWidth = 6.dp
                )
                
                Spacer(modifier = Modifier.height(24.dp))
                
                Text(
                    text = "Verifying Credentials",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(12.dp))
                
                Text(
                    text = "Securing your clinical session and synchronizing patient cases...",
                    fontSize = 14.sp,
                    color = Color.Gray,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

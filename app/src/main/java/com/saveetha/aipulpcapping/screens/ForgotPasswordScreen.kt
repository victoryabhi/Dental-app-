package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.components.AppTextField
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ForgotPasswordScreen(navController: NavController, viewModel: AuthViewModel) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
                .padding(paddingValues)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Image Banner Placeholder
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .background(Color(0xFFE3F2FD), shape = androidx.compose.foundation.shape.RoundedCornerShape(24.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    painter = painterResource(id = android.R.drawable.ic_dialog_email),
                    contentDescription = null,
                    tint = Color(0xFF007AFF),
                    modifier = Modifier.size(80.dp)
                )
            }

            Spacer(modifier = Modifier.height(32.dp))

            Text(
                text = "Forgot Password?",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.align(Alignment.Start)
            )
            
            Text(
                text = "Enter your email to receive a 4-digit OTP code for password reset.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(top = 8.dp).align(Alignment.Start)
            )

            Spacer(modifier = Modifier.height(32.dp))

            AppTextField(
                value = viewModel.email.value,
                onValueChange = { viewModel.onEmailChange(it) },
                label = "Email Address",
                isError = viewModel.emailError.value != null,
                errorMessage = viewModel.emailError.value
            )

            Spacer(modifier = Modifier.height(24.dp))

            AppButton(
                text = "Send OTP",
                onClick = {
                    if (viewModel.validateEmail()) {
                        navController.navigate(Screen.OtpVerification.route)
                    }
                }
            )

            Spacer(modifier = Modifier.height(16.dp))

            TextButton(onClick = { navController.navigate(Screen.Login.route) }) {
                Text(text = "Back to Login", color = Color(0xFF007AFF), fontWeight = FontWeight.Bold)
            }
        }
    }
}

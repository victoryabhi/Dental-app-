package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.components.AppTextField
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Fingerprint
import androidx.compose.ui.platform.LocalContext
import androidx.fragment.app.FragmentActivity
import com.saveetha.aipulpcapping.utils.BiometricHelper

@Composable
fun LoginScreen(navController: NavController, viewModel: AuthViewModel) {
    val context = LocalContext.current
    val activity = context as? FragmentActivity

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8F9FA))
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(64.dp))

        Text(
            text = "EndoAI Assistant",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF007AFF)
        )

        Spacer(modifier = Modifier.height(32.dp))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(4.dp)
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Welcome Back",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(24.dp))

                AppTextField(
                    value = viewModel.email.value,
                    onValueChange = { viewModel.onEmailChange(it) },
                    label = "Email Address"
                )

                Spacer(modifier = Modifier.height(16.dp))

                AppTextField(
                    value = viewModel.password.value,
                    onValueChange = { viewModel.onPasswordChange(it) },
                    label = "Password",
                    visualTransformation = androidx.compose.ui.text.input.PasswordVisualTransformation()
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Forgot Password?",
                    modifier = Modifier.align(Alignment.End).clickable {
                        navController.navigate(Screen.ForgotPassword.route)
                    },
                    color = Color(0xFF007AFF),
                    fontSize = 14.sp
                )

                Spacer(modifier = Modifier.height(24.dp))

                AppButton(
                    text = "Sign In",
                    onClick = {
                        viewModel.login(
                            context = context,
                            onSuccess = { navController.navigate(Screen.LoginValidation.route) },
                            onError = { navController.navigate(Screen.LoginError.route) }
                        )
                    }
                )

                if (viewModel.isBiometricEnabled.value && activity != null && BiometricHelper.isBiometricAvailable(context)) {
                    Spacer(modifier = Modifier.height(24.dp))
                    IconButton(
                        onClick = {
                            BiometricHelper.showBiometricPrompt(
                                activity = activity,
                                onSuccess = {
                                    navController.navigate(Screen.Dashboard.route) {
                                        popUpTo(0)
                                    }
                                },
                                onError = { _, _ -> },
                                onFailed = { }
                            )
                        },
                        modifier = Modifier.size(64.dp).background(Color(0xFFE3F2FD), CircleShape)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Fingerprint,
                            contentDescription = "Biometric Login",
                            tint = Color(0xFF007AFF),
                            modifier = Modifier.size(32.dp)
                        )
                    }
                    Text(text = "Biometric Login", fontSize = 12.sp, color = Color.Gray, modifier = Modifier.padding(top = 8.dp))
                }
            }
        }
    }
}

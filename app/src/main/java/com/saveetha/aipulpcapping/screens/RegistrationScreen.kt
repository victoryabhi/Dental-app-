package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.components.AppTextField
import com.saveetha.aipulpcapping.components.SavePasswordDialog
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel

@Composable
fun RegistrationScreen(navController: NavController, viewModel: AuthViewModel) {
    val context = LocalContext.current
    var showSaveDialog by remember { mutableStateOf(false) }

    if (showSaveDialog) {
        SavePasswordDialog(
            onSave = {
                viewModel.registerUser(context)
                showSaveDialog = false
                navController.navigate(Screen.LoginSuccess.route)
            },
            onDismiss = {
                showSaveDialog = false
                navController.navigate(Screen.LoginSuccess.route)
            }
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8F9FA))
            .padding(24.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(48.dp))

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
                    text = "Create Account",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
                
                Text(
                    text = "Join our clinical community",
                    fontSize = 14.sp,
                    color = Color.Gray,
                    modifier = Modifier.padding(top = 4.dp)
                )
                
                Spacer(modifier = Modifier.height(24.dp))

                AppTextField(
                    value = viewModel.fullName.value,
                    onValueChange = { viewModel.onFullNameChange(it) },
                    label = "Full Name"
                )

                Spacer(modifier = Modifier.height(16.dp))

                AppTextField(
                    value = viewModel.phoneNumber.value,
                    onValueChange = { viewModel.onPhoneNumberChange(it) },
                    label = "Phone Number",
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone)
                )

                Spacer(modifier = Modifier.height(16.dp))

                AppTextField(
                    value = viewModel.email.value,
                    onValueChange = { viewModel.onEmailChange(it) },
                    label = "Email Address",
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
                )

                Spacer(modifier = Modifier.height(16.dp))

                AppTextField(
                    value = viewModel.password.value,
                    onValueChange = { viewModel.onPasswordChange(it) },
                    label = "Password",
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)
                )

                Spacer(modifier = Modifier.height(32.dp))

                AppButton(
                    text = "Create Account",
                    onClick = {
                        // Show save password dialog before proceeding
                        showSaveDialog = true
                    }
                )

                Spacer(modifier = Modifier.height(24.dp))

                Row {
                    Text(text = "Already have an account? ", color = Color.Gray, fontSize = 14.sp)
                    Text(
                        text = "Sign In",
                        color = Color(0xFF007AFF),
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        modifier = Modifier.clickable { navController.navigate(Screen.Login.route) }
                    )
                }
            }
        }
    }
}

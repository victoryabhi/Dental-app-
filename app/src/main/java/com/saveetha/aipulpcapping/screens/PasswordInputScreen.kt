package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.components.AppTextField
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PasswordInputScreen(navController: NavController, viewModel: AuthViewModel) {
    var passwordVisible by remember { mutableStateOf(false) }

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
                .padding(24.dp)
        ) {
            Text(
                text = "Enter your password",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "for ${viewModel.email.value}",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(top = 8.dp)
            )

            Spacer(modifier = Modifier.height(32.dp))

            AppTextField(
                value = viewModel.password.value,
                onValueChange = { viewModel.onPasswordChange(it) },
                label = "Password",
                isError = viewModel.passwordError.value != null,
                errorMessage = viewModel.passwordError.value,
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    val image = if (passwordVisible) Icons.Filled.Visibility else Icons.Filled.VisibilityOff
                    IconButton(onClick = { passwordVisible = !passwordVisible }) {
                        Icon(imageVector = image, contentDescription = null)
                    }
                }
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "Forgot?",
                modifier = Modifier.clickable { },
                color = Color(0xFF007AFF),
                fontSize = 14.sp
            )

            Spacer(modifier = Modifier.height(24.dp))

            AppButton(
                text = "Login",
                onClick = {
                    if (viewModel.validatePassword()) {
                        navController.navigate(Screen.LoginValidation.route)
                    }
                }
            )
        }
    }
}

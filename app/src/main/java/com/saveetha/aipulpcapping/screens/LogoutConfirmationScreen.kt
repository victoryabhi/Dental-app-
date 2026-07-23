package com.saveetha.aipulpcapping.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LogoutConfirmationScreen(navController: NavController, authViewModel: AuthViewModel) {
    val context = LocalContext.current

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        "EndoAI Assistant",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF007AFF)
                    )
                },
                actions = {
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.Notifications, contentDescription = null, tint = Color.Gray)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF8F9FA))
                .padding(paddingValues)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // Main Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    // Security Illustration Placeholder
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(180.dp)
                            .clip(RoundedCornerShape(16.dp))
                            .background(Color(0xFFE3F2FD)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Default.Lock,
                            contentDescription = null,
                            tint = Color(0xFF007AFF),
                            modifier = Modifier.size(80.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    // Logout Icon Circle
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clip(CircleShape)
                            .background(Color(0xFFFFEBEE)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.AutoMirrored.Filled.Logout,
                            contentDescription = null,
                            tint = Color.Red,
                            modifier = Modifier.size(24.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        text = "Are you sure you want to log out?",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = "Your current clinical session will be securely closed.",
                        fontSize = 14.sp,
                        color = Color.Gray,
                        textAlign = TextAlign.Center
                    )

                    Spacer(modifier = Modifier.height(32.dp))

                    // Logout Button
                    Button(
                        onClick = {
                            authViewModel.logout(context)
                            Toast.makeText(context, "Logged out successfully", Toast.LENGTH_SHORT).show()
                            navController.navigate(Screen.Login.route) {
                                popUpTo(0) { inclusive = true }
                            }
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFC62828))
                    ) {
                        Text("Logout", fontWeight = FontWeight.Bold, color = Color.White)
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Stay Logged In Button
                    OutlinedButton(
                        onClick = { navController.popBackStack() },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        shape = RoundedCornerShape(12.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF007AFF))
                    ) {
                        Text("Stay Logged In", color = Color(0xFF007AFF), fontWeight = FontWeight.Bold)
                    }

                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Text(
                        text = "SECURE CLINICAL PROTOCOL ACTIVE",
                        fontSize = 11.sp,
                        color = Color.LightGray,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            Spacer(modifier = Modifier.height(48.dp))

            Text(
                text = "EndoAI Assistant v1.2.0\nAuthenticated Session: 8829-XJ",
                fontSize = 12.sp,
                color = Color.LightGray,
                textAlign = TextAlign.Center,
                lineHeight = 18.sp
            )
        }
    }
}

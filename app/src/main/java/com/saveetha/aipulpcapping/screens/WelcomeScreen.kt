package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.R
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen

@Composable
fun WelcomeScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Spacer(modifier = Modifier.height(48.dp))
        
        // Tooth Illustration Section
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(340.dp)
                .clip(RoundedCornerShape(32.dp))
        ) {
            // Main Illustration from Drawable
            Image(
                painter = painterResource(id = R.drawable.tooth_illustration),
                contentDescription = "Tooth Illustration",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )

            // Analysis Info Card overlay at the bottom
            Card(
                modifier = Modifier
                    .padding(16.dp)
                    .fillMaxWidth()
                    .align(Alignment.BottomCenter),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.95f)),
                elevation = CardDefaults.cardElevation(8.dp)
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(Color(0xFFE3F2FD)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Psychology,
                            contentDescription = null,
                            tint = Color(0xFF007AFF),
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = "TOOTH #14 ANALYSIS",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.Black,
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "Sub-millimeter pulp exposure detected",
                            fontSize = 11.sp,
                            color = Color.Gray,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = "Welcome to the future of endodontics",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            color = Color.Black
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Precision AI analysis for pulp capping decisions. Elevate your diagnostic accuracy with real-time endodontic insights.",
            fontSize = 14.sp,
            color = Color.Gray,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.weight(1f))

        AppButton(
            text = "Login",
            onClick = { navController.navigate(Screen.Login.route) }
        )

        Spacer(modifier = Modifier.height(12.dp))

        OutlinedButton(
            onClick = { navController.navigate(Screen.Registration.route) },
            modifier = Modifier.fillMaxWidth().height(56.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text("Create Account")
        }

        Spacer(modifier = Modifier.height(32.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            StatCard("98%", "Accuracy")
            StatCard("50k+", "Case studies")
            StatCard("<2s", "Real-time")
        }
    }
}

@Composable
fun StatCard(value: String, label: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = Color(0xFF007AFF))
        Text(text = label, fontSize = 12.sp, color = Color.Gray)
    }
}

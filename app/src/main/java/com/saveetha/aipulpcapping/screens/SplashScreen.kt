package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.R
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.components.AppLogo
import com.saveetha.aipulpcapping.navigation.Screen

@Composable
fun SplashScreen(navController: NavController) {
    LaunchedEffect(Unit) {
        android.util.Log.d("SCREEN_LOAD", "Splash Screen Loaded Successfully")
    }
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(
                        Color(0xFF007AFF),
                        Color(0xFF00BFFF),
                    )
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(24.dp)
        ) {
            // New Conceptual AI Logo
            AppLogo(modifier = Modifier.size(150.dp), tint = Color.White)

            Spacer(modifier = Modifier.height(24.dp))
            Text(
                text = "AI Pulp Capping",
                color = Color.White,
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Precision diagnosis and smarter clinical confidence for endodontic excellence.",
                color = Color.White.copy(alpha = 0.8f),
                fontSize = 14.sp,
                textAlign = androidx.compose.ui.text.style.TextAlign.Center
            )
        }

        Box(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 48.dp, start = 24.dp, end = 24.dp)
        ) {
            AppButton(
                text = "Get Started",
                onClick = {
                    navController.navigate(Screen.Welcome.route)
                },
                containerColor = Color.White,
                contentColor = Color(0xFF007AFF)
            )
        }
    }
}

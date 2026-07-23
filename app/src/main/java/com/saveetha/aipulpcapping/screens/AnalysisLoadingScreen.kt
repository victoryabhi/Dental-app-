package com.saveetha.aipulpcapping.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.navigation.Screen
import kotlinx.coroutines.delay

@Composable
fun AnalysisLoadingScreen(navController: NavController) {
    var progress by remember { mutableStateOf(0f) }
    val animatedProgress by animateFloatAsState(
        targetValue = progress,
        animationSpec = tween(durationMillis = 3000, easing = LinearEasing),
        label = "Progress"
    )

    LaunchedEffect(Unit) {
        progress = 1f
        delay(3500)
        navController.navigate(Screen.AiProcessing.route) {
            popUpTo(Screen.AnalysisLoading.route) { inclusive = true }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(contentAlignment = Alignment.Center) {
                CircularProgressIndicator(
                    progress = { animatedProgress },
                    modifier = Modifier.size(200.dp),
                    color = Color(0xFF007AFF),
                    strokeWidth = 10.dp,
                    trackColor = Color(0xFFE3F2FD)
                )
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "${(animatedProgress * 100).toInt()}%",
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF007AFF)
                    )
                    Text(text = "Analyzing", fontSize = 14.sp, color = Color.Gray)
                }
            }

            Spacer(modifier = Modifier.height(48.dp))

            Text(
                text = "Initializing AI Engine...",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )
            
            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "Analyzing dental radiographs for potential pathologies and clinical correlations.",
                fontSize = 14.sp,
                color = Color.Gray,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 48.dp)
            )

            Spacer(modifier = Modifier.height(48.dp))

            LoadingStep("Detecting Dental Structures", animatedProgress > 0.3f)
            LoadingStep("Radiograph Quality Validation", animatedProgress > 0.6f)
            LoadingStep("Neural Network Analysis", animatedProgress > 0.9f)
        }
    }
}

@Composable
fun LoadingStep(label: String, isComplete: Boolean) {
    Row(
        modifier = Modifier.padding(vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            color = if (isComplete) Color(0xFF007AFF) else Color.LightGray,
            fontSize = 14.sp,
            fontWeight = if (isComplete) FontWeight.Bold else FontWeight.Normal
        )
    }
}

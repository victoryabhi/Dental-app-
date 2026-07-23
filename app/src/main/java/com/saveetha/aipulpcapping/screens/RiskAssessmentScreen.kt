package com.saveetha.aipulpcapping.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RiskAssessmentScreen(navController: NavController, viewModel: DashboardViewModel) {
    val infiniteTransition = rememberInfiniteTransition(label = "Risk")
    val alpha by infiniteTransition.animateFloat(
        initialValue = 0.4f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "Alpha"
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Risk Assessment", fontWeight = FontWeight.Bold) },
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
                .background(Color(0xFFF8F9FA))
                .padding(paddingValues)
                .padding(24.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(contentAlignment = Alignment.Center, modifier = Modifier.size(200.dp)) {
                CircularProgressIndicator(
                    progress = { 0.85f },
                    modifier = Modifier.size(200.dp),
                    color = Color.Red,
                    strokeWidth = 12.dp,
                    trackColor = Color.Red.copy(alpha = 0.1f)
                )
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        Icons.Default.Warning,
                        contentDescription = null,
                        tint = Color.Red.copy(alpha = alpha),
                        modifier = Modifier.size(48.dp)
                    )
                    Text(text = viewModel.riskLevel.value, fontWeight = FontWeight.Bold, color = Color.Red, fontSize = 20.sp)
                    Text(text = "94% Confidence", fontSize = 12.sp, color = Color.Gray)
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        RiskFactor("Calculated RDT", "${viewModel.calculatedRdt.value} mm", Color.Red)
                        RiskFactor("Pulp Vitality", "High Risk", Color.Red)
                    }
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    HorizontalDivider(color = Color(0xFFF0F0F0))
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Text(text = "AI CLINICAL SUGGESTION", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF007AFF))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Based on the RDT value and radiographic analysis, direct pulp capping is indicated but carries a high risk of failure. Consider Biodentine as a material of choice.",
                        fontSize = 14.sp,
                        color = Color.Gray,
                        lineHeight = 20.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "Continue to Summary",
                onClick = {
                    navController.navigate(Screen.AnalysisSummary.route)
                }
            )
        }
    }
}

@Composable
fun RiskFactor(label: String, value: String, color: Color) {
    Column {
        Text(text = label, color = Color.Gray, fontSize = 12.sp)
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 16.sp, color = color)
    }
}

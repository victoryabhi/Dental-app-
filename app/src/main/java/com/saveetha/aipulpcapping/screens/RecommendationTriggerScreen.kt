package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Person
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
fun RecommendationTriggerScreen(navController: NavController, viewModel: DashboardViewModel) {
    val patientId = viewModel.selectedPatientId.value ?: ""
    var patient by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Patient?>(null) }
    
    LaunchedEffect(patientId) {
        patient = viewModel.getPatientById(patientId)
    }

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
        val currentPatient = patient
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
                .padding(paddingValues)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(Color(0xFFE8F5E9)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF4CAF50), modifier = Modifier.size(48.dp))
            }

            Spacer(modifier = Modifier.height(24.dp))

            Text(text = "Analysis Complete", fontSize = 24.sp, fontWeight = FontWeight.Bold)
            
            Spacer(modifier = Modifier.height(32.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF8F9FA))
            ) {
                Column(modifier = Modifier.padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Person, contentDescription = null, tint = Color.Gray)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = "Patient: ${currentPatient?.name ?: "Unknown"}", fontWeight = FontWeight.Medium)
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "The AI has carefully processed all radiographic data and clinical input. A tailored material recommendation is ready for this specific case.",
                        fontSize = 14.sp,
                        color = Color.Gray,
                        textAlign = TextAlign.Center,
                        lineHeight = 20.sp
                    )
                    Spacer(modifier = Modifier.height(24.dp))
                    Box(
                        modifier = Modifier
                            .background(Color(0xFFE3F2FD), RoundedCornerShape(12.dp))
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Text(text = "98.7% AI Confidence", color = Color(0xFF007AFF), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }

            Spacer(modifier = Modifier.height(48.dp))

            AppButton(
                text = "Generate Recommendation",
                onClick = { navController.navigate(Screen.MaterialSelection.route) }
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Text(
                text = "AI-Driven Pulp Capping Advisor v1.0",
                fontSize = 12.sp,
                color = Color.LightGray
            )
        }
    }
}

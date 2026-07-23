package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
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
fun ResultScreen(navController: NavController, viewModel: DashboardViewModel) {
    val material = viewModel.selectedMaterial.value ?: "Biodentine"
    val patientId = viewModel.selectedPatientId.value ?: ""
    var patient by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Patient?>(null) }
    
    LaunchedEffect(patientId) {
        patient = viewModel.getPatientById(patientId)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Diagnostic Results", fontWeight = FontWeight.Bold) },
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
                .background(Color(0xFFF8F9FA))
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(72.dp)
                    .clip(CircleShape)
                    .background(Color(0xFFE8F5E9)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Check, contentDescription = null, tint = Color(0xFF4CAF50), modifier = Modifier.size(40.dp))
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(text = "Analysis Finalized", fontSize = 24.sp, fontWeight = FontWeight.Bold)
            Text(
                text = "The assessment for the patient is complete and verified.",
                fontSize = 14.sp,
                color = Color.Gray,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 8.dp)
            )

            Spacer(modifier = Modifier.height(32.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(4.dp)
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Text(text = "Summary Report", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = Color.Gray)
                    Spacer(modifier = Modifier.height(20.dp))
                    
                    ResultRowItem("Patient Name", currentPatient?.name ?: "Unknown")
                    ResultRowItem("Patient ID", "#$patientId")
                    ResultRowItem("Calculated RDT", "${viewModel.calculatedRdt.value} mm")
                    ResultRowItem("Risk Assessment", viewModel.riskLevel.value)
                    ResultRowItem("Material Choice", material)
                    ResultRowItem("AI Confidence", "99.1%")
                }
            }

            Spacer(modifier = Modifier.weight(1f))
            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "View Detailed Report",
                onClick = { navController.navigate(Screen.ReportPreview.route) }
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            OutlinedButton(
                onClick = { 
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Splash.route) { inclusive = true }
                    }
                },
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color.LightGray)
            ) {
                Text("Back to Dashboard", color = Color.Gray)
            }
        }
    }
}

@Composable
fun ResultRowItem(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.Gray, fontSize = 14.sp)
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.Black)
    }
}

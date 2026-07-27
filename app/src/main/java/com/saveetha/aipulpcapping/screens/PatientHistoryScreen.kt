package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Image
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PatientHistoryScreen(navController: NavController, viewModel: DashboardViewModel, patientId: String) {
    var patient by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Patient?>(null) }
    val analyses by viewModel.getAnalysesForPatient(patientId).collectAsState(initial = emptyList())

    LaunchedEffect(patientId) {
        patient = viewModel.getPatientById(patientId)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Clinical History", fontWeight = FontWeight.Bold) },
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
        ) {
            if (currentPatient != null) {
                Text(
                    text = "Historical records for ${currentPatient.name}",
                    fontSize = 14.sp,
                    color = Color.Gray,
                    modifier = Modifier.padding(16.dp)
                )
            }

            if (analyses.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text("No clinical history found", color = Color.Gray)
                }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    items(analyses) { analysis ->
                        HistoryAnalysisCard(analysis) {
                            navController.navigate(Screen.PatientSummary.createRoute(patientId))
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun HistoryAnalysisCard(analysis: com.saveetha.aipulpcapping.model.Analysis, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier.size(60.dp).background(Color(0xFFF0F0F0), RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Image, contentDescription = null, tint = Color.LightGray)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(text = "AI Diagnostic Analysis", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text(text = "Date: ${analysis.time}", fontSize = 12.sp, color = Color.Gray)
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Recommended: ${analysis.material}",
                    fontSize = 14.sp,
                    color = Color(0xFF007AFF),
                    fontWeight = FontWeight.Medium
                )
            }
            Text(
                text = analysis.result,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = if (analysis.result == "High Risk") Color.Red else Color(0xFF4CAF50),
                modifier = Modifier
                    .background(
                        if (analysis.result == "High Risk") Color(0xFFFFEBEE) else Color(0xFFE8F5E9),
                        shape = RoundedCornerShape(8.dp)
                    )
                    .padding(horizontal = 8.dp, vertical = 4.dp)
            )
        }
    }
}

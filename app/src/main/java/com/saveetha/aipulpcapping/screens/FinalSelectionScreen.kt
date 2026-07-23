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
import androidx.compose.material.icons.filled.Healing
import androidx.compose.material.icons.filled.Info
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
fun FinalSelectionScreen(navController: NavController, viewModel: DashboardViewModel) {
    val material = viewModel.selectedMaterial.value ?: "Biodentine"
    val patientId = viewModel.selectedPatientId.value ?: ""
    var patientName by remember { mutableStateOf("Unknown Patient") }

    LaunchedEffect(patientId) {
        viewModel.getPatientById(patientId)?.let {
            patientName = it.name
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Selection Confirmed", fontWeight = FontWeight.Bold) },
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
                .verticalScroll(rememberScrollState())
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(CircleShape)
                    .background(Color(0xFFE8F5E9)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Check, contentDescription = null, tint = Color(0xFF4CAF50), modifier = Modifier.size(32.dp))
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(text = "Material Confirmed", fontSize = 24.sp, fontWeight = FontWeight.Bold)
            Text(
                text = "Clinical material has been selected and recorded for this patient's diagnostic history.",
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
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier.size(48.dp).background(Color(0xFFE3F2FD), RoundedCornerShape(12.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.Healing, contentDescription = null, tint = Color(0xFF007AFF))
                        }
                        Spacer(modifier = Modifier.width(16.dp))
                        Column {
                            Text(text = material, fontWeight = FontWeight.Bold, fontSize = 20.sp, color = Color(0xFF007AFF))
                            Text(text = "Final Choice", fontSize = 13.sp, color = Color.Gray)
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    HorizontalDivider(color = Color(0xFFF0F0F0))
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    SelectionRow("Patient", patientName)
                    SelectionRow("Clinical Case", "Class I Cavity")
                    SelectionRow("AI Confidence", "99.1%")
                    
                    Spacer(modifier = Modifier.height(20.dp))
                    
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color(0xFFF8F9FA), RoundedCornerShape(12.dp))
                            .padding(16.dp)
                    ) {
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Info, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(14.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Reasoning", fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color.Gray)
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "Selected based on bioactive properties and high success rate in pulp capping scenarios with RDT < 0.5mm.",
                                fontSize = 12.sp,
                                color = Color.Gray,
                                lineHeight = 18.sp
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.weight(1f))
            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "Proceed to Results",
                onClick = { 
                    viewModel.saveAnalysis(
                        patientId = patientId,
                        patientName = patientName,
                        result = viewModel.riskLevel.value,
                        rdtValue = "${viewModel.calculatedRdt.value} mm",
                        confidence = "99%",
                        material = material,
                        recommendations = "Confirmed $material for pulp capping. Monitor clinical symptoms for 4 weeks."
                    )
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Splash.route) { inclusive = true }
                    }
                }
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            TextButton(
                onClick = { navController.popBackStack() },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Modify Selection", color = Color.Gray)
            }
        }
    }
}

@Composable
fun SelectionRow(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.Gray, fontSize = 14.sp)
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 14.sp)
    }
}

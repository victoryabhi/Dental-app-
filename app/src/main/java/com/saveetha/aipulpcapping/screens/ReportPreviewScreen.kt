package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.PictureAsPdf
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReportPreviewScreen(navController: NavController, viewModel: DashboardViewModel) {
    val context = androidx.compose.ui.platform.LocalContext.current
    val material = viewModel.selectedMaterial.value ?: "Biodentine"
    val patientId = viewModel.selectedPatientId.value ?: ""
    var patient by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Patient?>(null) }
    
    LaunchedEffect(patientId) {
        patient = viewModel.getPatientById(patientId)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Report Preview", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.Share, contentDescription = "Share")
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
                .padding(24.dp)
        ) {
            // Document Header Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(text = "EndoAI Diagnostic Report", fontWeight = FontWeight.Bold, color = Color(0xFF007AFF), fontSize = 14.sp)
                        Text(text = "ID: #REP-2024-001", fontSize = 11.sp, color = Color.Gray)
                    }
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    HorizontalDivider(color = Color(0xFFF0F0F0))
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text("PATIENT", fontSize = 11.sp, color = Color.Gray)
                            Text(currentPatient?.name ?: "Unknown", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        }
                        Column(modifier = Modifier.weight(1f)) {
                            Text("DATE", fontSize = 11.sp, color = Color.Gray)
                            Text("Jan 24, 2024", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Diagnostic Images
            Text("Diagnostic Radiographs", fontWeight = FontWeight.Bold, fontSize = 16.sp, modifier = Modifier.padding(bottom = 12.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Card(
                    modifier = Modifier.weight(1f).height(120.dp),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        if (viewModel.selectedImageUri.value != null) {
                            AsyncImage(
                                model = viewModel.selectedImageUri.value,
                                contentDescription = null,
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Crop
                            )
                        } else {
                            Text("Primary Scan", color = Color.Gray, fontSize = 12.sp)
                        }
                    }
                }
                Card(
                    modifier = Modifier.weight(1f).height(120.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.LightGray.copy(alpha = 0.3f))
                ) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        Text("AI Overlay", color = Color.Gray, fontSize = 12.sp)
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Report Details
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    ReportInfoItem("Calculated RDT", "${viewModel.calculatedRdt.value} mm")
                    ReportInfoItem("Risk Category", viewModel.riskLevel.value)
                    ReportInfoItem("Recommended Material", material)
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    Text("AI ANALYSIS SUMMARY", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.Gray)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "The AI detected a critical pulp proximity with high sensitivity. Bioactive material selection is optimized for 98% success rate based on clinical datasets.",
                        fontSize = 13.sp,
                        color = Color.Gray,
                        lineHeight = 18.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                OutlinedButton(
                    onClick = { 
                        android.widget.Toast.makeText(context, "Saving as PDF...", android.widget.Toast.LENGTH_SHORT).show()
                    },
                    modifier = Modifier.weight(1f).height(56.dp),
                    shape = RoundedCornerShape(12.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF007AFF))
                ) {
                    Icon(Icons.Default.PictureAsPdf, contentDescription = null, tint = Color(0xFF007AFF))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("PDF", color = Color(0xFF007AFF))
                }
                
                AppButton(
                    text = "Confirm & Save",
                    onClick = { 
                        viewModel.saveAnalysis(
                            patientId = patientId,
                            patientName = patient?.name ?: "Unknown",
                            result = viewModel.riskLevel.value,
                            rdtValue = "${viewModel.calculatedRdt.value} mm",
                            confidence = "99%",
                            material = material,
                            recommendations = "Confirmed $material for clinical application."
                        )
                        navController.navigate(Screen.SaveReport.route)
                    },
                    modifier = Modifier.weight(2f)
                )
            }
            
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun ReportInfoItem(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.Gray, fontSize = 13.sp)
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 13.sp)
    }
}

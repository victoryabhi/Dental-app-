package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Image
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
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ImageConfirmationScreen(navController: NavController, viewModel: DashboardViewModel) {
    val patientId = viewModel.selectedPatientId.value ?: "Unknown"
    
    // Simulate AI confidence and quality based on the session
    val confidence = remember { (920..999).random() / 10.0 }
    val quality = if (confidence > 96.0) "High" else "Standard"
    val qualityColor = if (confidence > 96.0) Color(0xFF4CAF50) else Color(0xFFFFA000)

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Scan Confirmation", fontWeight = FontWeight.Bold) },
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
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(60.dp)
                    .clip(CircleShape)
                    .background(Color(0xFF4CAF50)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Check, contentDescription = null, tint = Color.White, modifier = Modifier.size(32.dp))
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(text = "Scan Confirmed", fontSize = 24.sp, fontWeight = FontWeight.Bold)
            Text(
                text = "The radiograph image has been processed and validated for diagnostic quality.",
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
                Column(modifier = Modifier.padding(20.dp)) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(180.dp)
                            .background(Color.Black, RoundedCornerShape(16.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        if (viewModel.selectedImageUri.value != null) {
                            AsyncImage(
                                model = viewModel.selectedImageUri.value,
                                contentDescription = "Processed Radiograph",
                                modifier = Modifier.fillMaxSize()
                            )
                        } else {
                            Icon(Icons.Default.Image, contentDescription = null, tint = Color.DarkGray, modifier = Modifier.size(60.dp))
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(20.dp))
                    
                    Text(text = "Analysis Report", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    Spacer(modifier = Modifier.height(12.dp))
                    
                    ConfirmationInfoRow("Diagnostic Type", "Radiograph Detected", Color(0xFF007AFF))
                    ConfirmationInfoRow("Image Quality", quality, qualityColor)
                    ConfirmationInfoRow("AI Confidence", "$confidence%", Color(0xFF007AFF))
                    ConfirmationInfoRow("Patient ID", "#$patientId", Color.Black)

                    if (confidence < 97.5) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(Color(0xFFFFF3E0), RoundedCornerShape(8.dp))
                                .padding(8.dp)
                        ) {
                            Text(
                                text = "Note: Image shows patterns inconsistent with standard radiographs. Please ensure high-contrast X-ray is used.",
                                fontSize = 11.sp,
                                color = Color(0xFFE65100),
                                textAlign = TextAlign.Center
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            AppButton(
                text = "Proceed to RDT Analysis",
                onClick = { navController.navigate(Screen.RdtInput.route) }
            )

            Spacer(modifier = Modifier.height(12.dp))

            TextButton(onClick = { navController.popBackStack() }) {
                Text("Retake Scan", color = Color.Gray)
            }
        }
    }
}

@Composable
fun ConfirmationInfoRow(label: String, value: String, valueColor: Color) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.Gray, fontSize = 14.sp)
        Text(text = value, color = valueColor, fontWeight = FontWeight.Bold, fontSize = 14.sp)
    }
}

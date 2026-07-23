package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
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
fun DetailedResultScreen(navController: NavController, viewModel: DashboardViewModel) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Clinical Assessment", fontWeight = FontWeight.Bold) },
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
                .padding(24.dp)
        ) {
            // High Res X-Ray
            Card(
                modifier = Modifier.fillMaxWidth().height(240.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.Black)
            ) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    if (viewModel.selectedImageUri.value != null) {
                        AsyncImage(
                            model = viewModel.selectedImageUri.value,
                            contentDescription = "Analysis Radiograph",
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Fit
                        )
                    } else {
                        androidx.compose.foundation.Image(
                            painter = androidx.compose.ui.res.painterResource(id = com.saveetha.aipulpcapping.R.drawable.tooth_illustration),
                            contentDescription = "Placeholder",
                            modifier = Modifier.fillMaxSize().padding(16.dp),
                            contentScale = ContentScale.Fit
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Stats Section
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("AI Confidence", fontSize = 14.sp, color = Color.Gray)
                        Text("99.4%", fontWeight = FontWeight.Bold, color = Color(0xFF007AFF), fontSize = 16.sp)
                    }
                    LinearProgressIndicator(
                        progress = { 0.99f },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 12.dp)
                            .height(8.dp)
                            .clip(RoundedCornerShape(4.dp)),
                        color = Color(0xFF007AFF),
                        trackColor = Color(0xFFE3F2FD)
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Assessment Grid
            Text("Diagnostic Findings", fontWeight = FontWeight.Bold, fontSize = 16.sp, modifier = Modifier.padding(bottom = 12.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    AssessmentRow("Pulp Vitality", "High Risk", Color.Red)
                    AssessmentRow("RDT Accuracy", "98% Validated", Color(0xFF4CAF50))
                    AssessmentRow("Mineralization", "Adequate", Color.Black)
                    AssessmentRow("Caries Depth", "Critical", Color.Red)
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "Generate Treatment Map",
                onClick = { navController.navigate(Screen.ReportPreview.route) }
            )
            
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun AssessmentRow(label: String, value: String, valueColor: Color) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.Gray, fontSize = 14.sp)
        Text(text = value, fontWeight = FontWeight.Bold, color = valueColor, fontSize = 14.sp)
    }
}

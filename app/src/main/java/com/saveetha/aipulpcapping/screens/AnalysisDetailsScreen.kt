package com.saveetha.aipulpcapping.screens

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AnalysisDetailsScreen(navController: NavController, viewModel: DashboardViewModel, analysisId: String) {
    var analysis by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Analysis?>(null) }
    
    LaunchedEffect(analysisId) {
        analysis = viewModel.getAnalysisById(analysisId)
    }
    
    // Debug log for image path
    analysis?.xRayUri?.let {
        Log.d("LOADED_IMAGE", it)
    } ?: Log.d("LOADED_IMAGE", "null")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Analysis Details", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { /* Share */ }) {
                        Icon(Icons.Default.Share, contentDescription = "Share")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { paddingValues ->
        val currentAnalysis = analysis
        if (currentAnalysis == null) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Analysis not found")
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF8F9FA))
                    .padding(paddingValues)
                    .verticalScroll(rememberScrollState())
                    .padding(24.dp)
            ) {
                // Patient Summary Card
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(2.dp)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier.size(48.dp).background(Color(0xFFE3F2FD), RoundedCornerShape(12.dp)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.Person, contentDescription = null, tint = Color(0xFF007AFF))
                            }
                            Spacer(modifier = Modifier.width(16.dp))
                            Column {
                                currentAnalysis.let {
                                    Text(it.patientName, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                                    Text("Patient ID: #${it.patientId}", color = Color.Gray, fontSize = 14.sp)
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // X-Ray Preview Card
                Text("Diagnostic Image", fontWeight = FontWeight.Bold, fontSize = 16.sp, modifier = Modifier.padding(bottom = 12.dp))
                Card(
                    modifier = Modifier.fillMaxWidth().height(200.dp),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.Black)
                ) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        val xRayUri = currentAnalysis?.xRayUri
                        if (!xRayUri.isNullOrEmpty()) {
                            AsyncImage(
                                model = xRayUri,
                                contentDescription = "Radiograph Preview",
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Crop
                            )
                        } else {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Icon(Icons.Default.Image, contentDescription = null, tint = Color.DarkGray, modifier = Modifier.size(64.dp))
                                Text("No Radiograph Available", color = Color.White.copy(alpha = 0.5f), fontSize = 12.sp)
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // Assessment Results
                Text("Assessment Results", fontWeight = FontWeight.Bold, fontSize = 16.sp, modifier = Modifier.padding(bottom = 12.dp))
                currentAnalysis?.let {
                    AssessmentResultCard(it)
                }

                Spacer(modifier = Modifier.height(24.dp))

                // AI Recommendations
                Text("Clinical Recommendations", fontWeight = FontWeight.Bold, fontSize = 16.sp, modifier = Modifier.padding(bottom = 12.dp))
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White)
                ) {
                    currentAnalysis?.let { analysis ->
                        Column(modifier = Modifier.padding(20.dp)) {
                            RecommendationItem(Icons.Default.Description, "Clinical Findings", "Calculated RDT is ${analysis.rdtValue}. AI detected significant proximity to pulp chamber.")
                            Spacer(modifier = Modifier.height(16.dp))
                            RecommendationItem(Icons.Default.Psychology, "AI Advice", analysis.recommendations)
                            Spacer(modifier = Modifier.height(16.dp))
                            RecommendationItem(Icons.Default.Healing, "Recommended Material", analysis.material)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(32.dp))

                AppButton(
                    text = "Download PDF Report",
                    onClick = { /* Generate PDF */ }
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                OutlinedButton(
                    onClick = { navController.popBackStack() },
                    modifier = Modifier.fillMaxWidth().height(56.dp),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("Return to Dashboard", color = Color.Gray)
                }
                
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}

@Composable
fun AssessmentResultCard(analysis: com.saveetha.aipulpcapping.model.Analysis) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            ResultRow("Risk Level", analysis.result, when(analysis.result) {
                "High Risk" -> Color.Red
                "Moderate" -> Color(0xFFFFA000)
                else -> Color(0xFF4CAF50)
            })
            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp), color = Color(0xFFF0F0F0))
            ResultRow("Calculated RDT", analysis.rdtValue, Color.Black)
            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp), color = Color(0xFFF0F0F0))
            ResultRow("AI Confidence", analysis.confidence, Color(0xFF007AFF))
            HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp), color = Color(0xFFF0F0F0))
            ResultRow("Analysis Date", analysis.date, Color.Gray)
        }
    }
}

@Composable
fun ResultRow(label: String, value: String, valueColor: Color) {
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label, color = Color.Gray, fontSize = 14.sp)
        Text(value, color = valueColor, fontWeight = FontWeight.Bold, fontSize = 14.sp)
    }
}

@Composable
fun RecommendationItem(icon: ImageVector, title: String, description: String) {
    Row {
        Icon(icon, contentDescription = null, tint = Color(0xFF007AFF), modifier = Modifier.size(20.dp))
        Spacer(modifier = Modifier.width(12.dp))
        Column {
            Text(title, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Text(description, fontSize = 13.sp, color = Color.Gray)
        }
    }
}

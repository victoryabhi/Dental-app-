package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
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
fun AnalysisSummaryScreen(navController: NavController, viewModel: DashboardViewModel) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Analysis Summary", fontWeight = FontWeight.Bold) },
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
            // Radiograph Preview
            Card(
                modifier = Modifier.fillMaxWidth().height(220.dp),
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

            // Data Grid
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                InfoCard("Calculated RDT", "${viewModel.calculatedRdt.value} mm", Color(0xFF007AFF), Modifier.weight(1f))
                InfoCard("Risk Level", viewModel.riskLevel.value, Color.Red, Modifier.weight(1f))
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Clinical Notes
            Text("Clinical Analysis", fontWeight = FontWeight.Bold, fontSize = 18.sp, modifier = Modifier.padding(bottom = 12.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text(
                        text = "Deep carious lesion detected. ${viewModel.aiRecommendationJustification}",
                        fontSize = 14.sp,
                        color = Color.Gray,
                        lineHeight = 22.sp
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    HorizontalDivider(color = Color(0xFFF0F0F0))
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "AI Recommendation: ${viewModel.aiRecommendedMaterial}",
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF007AFF),
                        fontSize = 14.sp
                    )
                }
            }

            Spacer(modifier = Modifier.weight(1f))
            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "Continue to Recommendation",
                onClick = { navController.navigate(Screen.RecommendationTrigger.route) }
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            TextButton(
                onClick = { navController.navigate(Screen.DetailedResult.route) },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("View Full Analysis Details", color = Color.Gray)
            }
        }
    }
}

@Composable
fun InfoCard(label: String, value: String, valueColor: Color, modifier: Modifier) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(label, fontSize = 12.sp, color = Color.Gray)
            Spacer(modifier = Modifier.height(4.dp))
            Text(value, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = valueColor)
        }
    }
}

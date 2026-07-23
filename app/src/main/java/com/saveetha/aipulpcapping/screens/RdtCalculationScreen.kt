package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.ZoomIn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RdtCalculationScreen(navController: NavController, viewModel: DashboardViewModel) {
    LaunchedEffect(Unit) {
        // Set a realistic simulated RDT value if not set
        if (viewModel.rdtValue.value.isEmpty()) {
            viewModel.setCalculatedRdt(0.38f)
        } else {
            viewModel.setCalculatedRdt(viewModel.rdtValue.value.toFloatOrNull() ?: 0.5f)
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("RDT Calculation", fontWeight = FontWeight.Bold) },
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
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(350.dp)
                    .background(Color.Black, RoundedCornerShape(24.dp)),
                contentAlignment = Alignment.Center
            ) {
                if (viewModel.selectedImageUri.value != null) {
                    AsyncImage(
                        model = viewModel.selectedImageUri.value,
                        contentDescription = "RDT Calculation Image",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Fit,
                        alpha = 0.9f
                    )
                }
                
                // Tooth cross section placeholder overlay
                Text(
                    text = "Tooth RDT Cross-Section", 
                    color = Color.White.copy(alpha = 0.7f),
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.align(Alignment.TopCenter).padding(top = 20.dp)
                )
                
                // Measurement indicators (simulated)
                Box(
                    modifier = Modifier
                        .align(Alignment.Center)
                        .size(120.dp, 2.dp)
                        .background(Color(0xFFFF5252))
                )
                
                Box(
                    modifier = Modifier
                        .align(Alignment.Center)
                        .padding(start = 120.dp)
                        .size(2.dp, 10.dp)
                        .background(Color(0xFFFF5252))
                )

                Box(
                    modifier = Modifier
                        .align(Alignment.Center)
                        .padding(end = 120.dp)
                        .size(2.dp, 10.dp)
                        .background(Color(0xFFFF5252))
                )
                
                Row(
                    modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    SmallFloatingActionButton(onClick = {}, containerColor = Color.White.copy(alpha = 0.4f), contentColor = Color.White) {
                        Icon(Icons.Default.ZoomIn, contentDescription = null)
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Text(text = "Calculated RDT", color = Color.Gray, fontSize = 14.sp)
                    Text(text = "${viewModel.calculatedRdt.value} mm", fontSize = 32.sp, fontWeight = FontWeight.Bold, color = Color.Red)
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Text(
                        text = "The AI has detected critical dentin thickness. Manual verification is recommended for values below 0.5 mm.",
                        fontSize = 14.sp,
                        color = Color.Gray,
                        lineHeight = 20.sp
                    )
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            AppButton(
                text = "Confirm & Proceed",
                onClick = { navController.navigate(Screen.RiskAssessment.route) }
            )
            
            Spacer(modifier = Modifier.height(12.dp))

            OutlinedButton(
                onClick = { /* Recalculate */ },
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(Icons.Default.Refresh, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Recalculate Points")
            }
        }
    }
}

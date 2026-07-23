package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Adjust
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
fun RegionDetectionScreen(navController: NavController, viewModel: DashboardViewModel) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Region Detection", fontWeight = FontWeight.Bold) },
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
            Text(
                text = "Dental structure segmentation and region identification.",
                fontSize = 14.sp,
                color = Color.Gray
            )

            Spacer(modifier = Modifier.height(24.dp))

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
                        contentDescription = "Segmented Image",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Fit,
                        alpha = 0.8f
                    )
                }
                
                // Simulated segmentation overlay
                Icon(
                    Icons.Default.Adjust, 
                    contentDescription = null, 
                    tint = Color(0xFF007AFF).copy(alpha = 0.5f), 
                    modifier = Modifier.size(150.dp)
                )
                
                Text(
                    text = "AI Structure Mapping",
                    color = Color.White.copy(alpha = 0.8f),
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 20.dp)
                )
            }

            Spacer(modifier = Modifier.height(32.dp))

            DetectionLegendItem("Pulp Chamber", Color(0xFFFF5252), "98.2% Confidence")
            DetectionLegendItem("Dentin Layer", Color(0xFFFFEB3B), "94.5% Confidence")
            DetectionLegendItem("Enamel Shell", Color(0xFFFFFFFF), "96.8% Confidence")

            Spacer(modifier = Modifier.weight(1f))

            AppButton(
                text = "Proceed to RDT Calculation",
                onClick = { navController.navigate(Screen.RdtCalculation.route) }
            )
        }
    }
}

@Composable
fun DetectionLegendItem(label: String, dotColor: Color, confidence: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(modifier = Modifier.size(16.dp).background(dotColor, RoundedCornerShape(4.dp)))
        Spacer(modifier = Modifier.width(16.dp))
        Column {
            Text(text = label, fontWeight = FontWeight.Bold, fontSize = 16.sp)
            Text(text = confidence, fontSize = 12.sp, color = Color.Gray)
        }
    }
}

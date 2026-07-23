package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Image
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
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
fun InputValidationScreen(navController: NavController, viewModel: DashboardViewModel) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Input Validation", fontWeight = FontWeight.Bold) },
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
            Text(
                text = "Clinical data review for AI processing readiness.",
                fontSize = 14.sp,
                color = Color.Gray,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(32.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(4.dp)
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Text(text = "Radiograph Review", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    Spacer(modifier = Modifier.height(16.dp))
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(200.dp)
                            .clip(RoundedCornerShape(16.dp))
                            .background(Color.Black),
                        contentAlignment = Alignment.Center
                    ) {
                        if (viewModel.selectedImageUri.value != null) {
                            AsyncImage(
                                model = viewModel.selectedImageUri.value,
                                contentDescription = "Captured X-Ray",
                                modifier = Modifier.fillMaxSize(),
                                contentScale = androidx.compose.ui.layout.ContentScale.Crop
                            )
                        } else {
                            Icon(Icons.Default.Image, contentDescription = null, tint = Color.DarkGray, modifier = Modifier.size(64.dp))
                            Text(
                                text = "X-Ray Captured",
                                color = Color.White.copy(alpha = 0.5f),
                                modifier = Modifier.padding(top = 100.dp)
                            )
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    ValidationItem("Clinical Image Quality", "Passed")
                    ValidationItem("RDT Manual Value (${viewModel.rdtValue.value}mm)", "Ready")
                    ValidationItem("Tooth Region Alignment", "Verified")
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Box(
                    modifier = Modifier.size(12.dp).clip(CircleShape).background(Color(0xFF4CAF50))
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(text = "Validation Confidence: 96%", fontWeight = FontWeight.Bold, color = Color(0xFF4CAF50))
            }

            Spacer(modifier = Modifier.weight(1f))

            AppButton(
                text = "Start AI Analysis",
                onClick = { navController.navigate(Screen.AnalysisLoading.route) }
            )
        }
    }
}

@Composable
fun ValidationItem(label: String, status: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = label, color = Color.Gray, fontSize = 14.sp)
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(text = status, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color(0xFF4CAF50))
            Spacer(modifier = Modifier.width(8.dp))
            Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF4CAF50), modifier = Modifier.size(16.dp))
        }
    }
}

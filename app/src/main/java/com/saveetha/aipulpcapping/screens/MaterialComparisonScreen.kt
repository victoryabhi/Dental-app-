package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
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
fun MaterialComparisonScreen(navController: NavController, viewModel: DashboardViewModel) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Material Comparison", fontWeight = FontWeight.Bold) },
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
            Text(
                text = "Compare pulp capping materials to ensure the best clinical outcome for critical RDT cases.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            // AI Recommendation Banner
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFFE3F2FD), RoundedCornerShape(12.dp))
                    .padding(16.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.AutoAwesome, contentDescription = null, tint = Color(0xFF007AFF), modifier = Modifier.size(20.dp))
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = "AI Suggestion: Biodentine remains the most suitable choice for this patient's 0.38mm RDT.",
                        fontSize = 13.sp,
                        color = Color(0xFF007AFF),
                        fontWeight = FontWeight.Medium
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            ComparisonSection("Biodentine", "Ideal for critical RDT", isRecommended = true) {
                viewModel.setSelectedMaterial("Biodentine")
                navController.navigate(Screen.FinalSelection.route)
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            ComparisonSection("MTA", "Excellent sealing property") {
                viewModel.setSelectedMaterial("MTA")
                navController.navigate(Screen.FinalSelection.route)
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            ComparisonSection("Calcium Hydroxide", "Conventional standard") {
                viewModel.setSelectedMaterial("Calcium Hydroxide")
                navController.navigate(Screen.FinalSelection.route)
            }
            
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun ComparisonSection(name: String, tag: String, isRecommended: Boolean = false, onSelect: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = name, fontWeight = FontWeight.Bold, fontSize = 18.sp, modifier = Modifier.weight(1f))
                if (isRecommended) {
                    Badge(containerColor = Color(0xFFE8F5E9), contentColor = Color(0xFF4CAF50)) {
                        Text("Suggested", modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                    }
                }
            }
            Text(text = tag, color = Color.Gray, fontSize = 13.sp)
            
            Spacer(modifier = Modifier.height(20.dp))
            
            ComparisonRow("Setting Time", if (name == "Biodentine") "12 mins" else "3-4 hours")
            ComparisonRow("Biocompatibility", "Very High")
            ComparisonRow("Success Rate", if (name == "Biodentine") "98.2%" else "92.5%")
            ComparisonRow("Clinical Cost", if (name == "Biodentine") "High" else "Medium")
            
            Spacer(modifier = Modifier.height(20.dp))
            
            Button(
                onClick = onSelect,
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (isRecommended) Color(0xFF007AFF) else Color(0xFFF8F9FA),
                    contentColor = if (isRecommended) Color.White else Color.Black
                )
            ) {
                Text("Select $name")
            }
        }
    }
}

@Composable
fun ComparisonRow(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.Gray, fontSize = 12.sp)
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 12.sp)
    }
}

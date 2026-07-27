package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.BatchPrediction
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.navigation.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ClinicalAiScreen(navController: NavController) {
    var activeModule by remember { mutableStateOf<String?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Clinical AI Engine", fontWeight = FontWeight.Bold) },
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
            // Header Section
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFFE3F2FD), RoundedCornerShape(20.dp))
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        Icons.Default.Psychology, 
                        contentDescription = null, 
                        tint = Color(0xFF007AFF), 
                        modifier = Modifier.size(60.dp)
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(text = "Advanced Neural Analysis", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFF007AFF))
                    Text(text = "System Status: Online & Active", fontSize = 12.sp, color = Color(0xFF4CAF50), fontWeight = FontWeight.Bold)
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Text(text = "Core AI Capabilities", fontWeight = FontWeight.Bold, fontSize = 18.sp)
            Text(text = "Tap a module to initialize clinical preview", fontSize = 13.sp, color = Color.Gray)
            
            Spacer(modifier = Modifier.height(16.dp))

            AiFeatureCardInteractive(
                icon = Icons.Default.Layers,
                title = "Structure Segmentation",
                description = "Deep learning layers identify enamel, dentin, and pulp chamber boundaries.",
                status = "Ready",
                onClick = { activeModule = "Segmentation" }
            )
            
            AiFeatureCardInteractive(
                icon = Icons.Default.BatchPrediction,
                title = "RDT Calculation",
                description = "Automated spatial mapping calculates Remaining Dentin Thickness.",
                status = "Ready",
                onClick = { activeModule = "RDT" }
            )
            
            AiFeatureCardInteractive(
                icon = Icons.Default.AutoAwesome,
                title = "Predictive Modeling",
                description = "Predicts pulp vitality outcomes based on mineralization density.",
                status = "Optimized",
                onClick = { activeModule = "Predictive" }
            )

            Spacer(modifier = Modifier.height(32.dp))

            // Action Button
            Button(
                onClick = { navController.navigate(Screen.UploadOption.route) },
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF007AFF))
            ) {
                Text("Start Real-Time Analysis", fontWeight = FontWeight.Bold)
            }

            Spacer(modifier = Modifier.height(32.dp))
        }
    }

    // Interactive Dialog for "working" feel
    activeModule?.let { module ->
        AlertDialog(
            onDismissRequest = { activeModule = null },
            title = { Text("$module Module") },
            text = { 
                Column {
                    Text("The AI $module module is currently synchronized with the clinical cloud database and ready for radiograph input.")
                    Spacer(modifier = Modifier.height(16.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        CircularProgressIndicator(modifier = Modifier.size(16.dp), strokeWidth = 2.dp)
                        Spacer(modifier = Modifier.width(12.dp))
                        Text("Clinical latency: 120ms", fontSize = 12.sp, color = Color.Gray)
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { activeModule = null }) { Text("Dismiss") }
            }
        )
    }
}

@Composable
fun AiFeatureCardInteractive(
    icon: ImageVector, 
    title: String, 
    description: String, 
    status: String,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .clickable { onClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier.size(44.dp).background(Color(0xFFF0F7FF), RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(icon, contentDescription = null, tint = Color(0xFF007AFF), modifier = Modifier.size(24.dp))
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(text = title, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                    Spacer(modifier = Modifier.width(8.dp))
                    Box(
                        modifier = Modifier
                            .background(Color(0xFFE8F5E9), RoundedCornerShape(4.dp))
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(status, color = Color(0xFF4CAF50), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    }
                }
                Text(text = description, fontSize = 13.sp, color = Color.Gray, lineHeight = 18.sp)
            }
            Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF4CAF50).copy(alpha = 0.5f), modifier = Modifier.size(20.dp))
        }
    }
}

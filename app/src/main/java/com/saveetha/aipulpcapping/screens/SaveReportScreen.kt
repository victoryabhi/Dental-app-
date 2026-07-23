package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CloudDone
import androidx.compose.material.icons.filled.Devices
import androidx.compose.material.icons.filled.FolderShared
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
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SaveReportScreen(navController: NavController, viewModel: DashboardViewModel) {
    var selectedOption by remember { mutableStateOf(0) }
    val patientId = viewModel.selectedPatientId.value ?: ""
    var patient by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Patient?>(null) }
    
    LaunchedEffect(patientId) {
        patient = viewModel.getPatientById(patientId)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Save Report", fontWeight = FontWeight.Bold) },
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
            Text(
                text = "Choose where you would like to archive this clinical diagnostic report.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(bottom = 32.dp)
            )

            SaveOptionItem(
                title = "Patient Record",
                subtitle = "Save directly to patient's clinical history.",
                icon = Icons.Default.FolderShared,
                isSelected = selectedOption == 0,
                onClick = { selectedOption = 0 }
            )

            Spacer(modifier = Modifier.height(16.dp))

            SaveOptionItem(
                title = "Local Storage",
                subtitle = "Save as PDF to your device documents.",
                icon = Icons.Default.Devices,
                isSelected = selectedOption == 1,
                onClick = { selectedOption = 1 }
            )

            Spacer(modifier = Modifier.height(16.dp))

            SaveOptionItem(
                title = "Cloud Archive",
                subtitle = "Sync with secure medical cloud storage.",
                icon = Icons.Default.CloudDone,
                isSelected = selectedOption == 2,
                onClick = { selectedOption = 2 }
            )

            Spacer(modifier = Modifier.height(32.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("REPORT METADATA", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.Gray)
                    Spacer(modifier = Modifier.height(12.dp))
                    MetadataRow("Report ID", "END-240124-001")
                    MetadataRow("Patient", patient?.name ?: "Unknown")
                    MetadataRow("Timestamp", "Jan 24, 2024 • 10:30 AM")
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            AppButton(
                text = "Confirm & Save",
                onClick = { navController.navigate(Screen.DownloadReport.route) }
            )
        }
    }
}

@Composable
fun SaveOptionItem(
    title: String,
    subtitle: String,
    icon: ImageVector,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) Color(0xFFE3F2FD) else Color.White
        ),
        border = if (isSelected) androidx.compose.foundation.BorderStroke(2.dp, Color(0xFF007AFF)) else null
    ) {
        Row(
            modifier = Modifier.padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(
                        if (isSelected) Color(0xFF007AFF) else Color(0xFFF8F9FA),
                        RoundedCornerShape(8.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(icon, contentDescription = null, tint = if (isSelected) Color.White else Color.Gray)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(text = title, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = if (isSelected) Color(0xFF007AFF) else Color.Black)
                Text(text = subtitle, fontSize = 12.sp, color = Color.Gray)
            }
        }
    }
}

@Composable
fun MetadataRow(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.Gray, fontSize = 12.sp)
        Text(text = value, fontWeight = FontWeight.Medium, fontSize = 12.sp)
    }
}

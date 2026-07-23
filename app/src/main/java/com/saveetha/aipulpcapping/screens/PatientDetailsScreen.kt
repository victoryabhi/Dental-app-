package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
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
fun PatientDetailsScreen(navController: NavController, viewModel: DashboardViewModel, patientId: String) {
    var patient by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Patient?>(null) }
    val analyses by viewModel.getAnalysesForPatient(patientId).collectAsState(initial = emptyList())
    
    LaunchedEffect(patientId) {
        patient = viewModel.getPatientById(patientId)
    }
    
    // Debug logs for patient images
    android.util.Log.d("PROFILE_IMAGE", "${patient?.profilePhotoUri}")
    val latestXRay = patient?.latestRadiographUri ?: analyses.firstOrNull()?.xRayUri
    android.util.Log.d("XRAY_IMAGE", "$latestXRay")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Patient Details", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { navController.navigate(Screen.EditPatient.createRoute(patientId)) }) {
                        Icon(Icons.Default.Edit, contentDescription = "Edit")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { paddingValues ->
        val currentPatient = patient
        if (currentPatient == null) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Patient not found")
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF8F9FA))
                    .padding(paddingValues)
                    .padding(16.dp)
            ) {
                item {
                    PatientProfileHeader(currentPatient)
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    if (currentPatient.latestRadiographUri != null || analyses.isNotEmpty()) {
                        val displayUri = currentPatient.latestRadiographUri ?: analyses.firstOrNull()?.xRayUri
                        Text("Radiograph Preview", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(12.dp))
                        Card(
                            modifier = Modifier.fillMaxWidth().height(200.dp),
                            shape = RoundedCornerShape(24.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.Black)
                        ) {
                            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                                if (!displayUri.isNullOrEmpty()) {
                                    AsyncImage(
                                        model = displayUri,
                                        contentDescription = "Latest Radiograph",
                                        modifier = Modifier.fillMaxSize(),
                                        contentScale = androidx.compose.ui.layout.ContentScale.Crop
                                    )
                                    android.util.Log.d("XRAY_IMAGE", "Loaded: $displayUri")
                                } else {
                                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                        Icon(
                                            Icons.Default.Image, 
                                            contentDescription = null, 
                                            tint = Color.DarkGray, 
                                            modifier = Modifier.size(64.dp)
                                        )
                                        Text(
                                            text = "Default Dental X-Ray Placeholder", 
                                            color = Color.White.copy(alpha = 0.5f), 
                                            fontSize = 11.sp,
                                            modifier = Modifier.padding(top = 8.dp)
                                        )
                                    }
                                }
                            }
                        }
                        
                        if (analyses.isNotEmpty()) {
                            val latest = analyses.first()
                            Spacer(modifier = Modifier.height(16.dp))
                            Card(
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(20.dp),
                                colors = CardDefaults.cardColors(containerColor = Color.White)
                            ) {
                                Column(modifier = Modifier.padding(16.dp)) {
                                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                        Text("Latest Analysis", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                        Text(latest.date, color = Color.Gray, fontSize = 12.sp)
                                    }
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Text("RDT: ${latest.rdtValue} | Risk: ${latest.result}", fontSize = 13.sp)
                                    Text("Material: ${latest.material}", fontSize = 13.sp, color = Color(0xFF007AFF), fontWeight = FontWeight.Medium)
                                }
                            }
                        }
                        
                        Spacer(modifier = Modifier.height(24.dp))
                    }
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Recent Analyses", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                        TextButton(onClick = { navController.navigate(Screen.PatientHistory.createRoute(patientId)) }) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.History, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("History")
                            }
                        }
                    }
                    
                    if (analyses.isEmpty()) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(150.dp)
                                .background(Color.White, RoundedCornerShape(16.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("No analysis records yet", color = Color.Gray)
                        }
                    } else {
                        LazyRow(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            items(analyses) { analysis ->
                                SmallAnalysisCard(analysis) {
                                    navController.navigate(Screen.PatientSummary.createRoute(patientId))
                                }
                            }
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(32.dp))
                    
                    AppButton(
                        text = "Start AI Analysis",
                        onClick = { 
                            viewModel.setSelectedPatient(patientId)
                            navController.navigate(Screen.UploadOption.route) 
                        }
                    )
                    
                    Spacer(modifier = Modifier.height(12.dp))
                    
                    OutlinedButton(
                        onClick = { 
                            viewModel.setSelectedPatient(patientId)
                            navController.navigate(Screen.UploadOption.route) 
                        },
                        modifier = Modifier.fillMaxWidth().height(56.dp),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(Icons.Default.Image, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Upload X-Ray Report")
                    }
                }
            }
        }
    }
}

@Composable
fun PatientProfileHeader(patient: com.saveetha.aipulpcapping.model.Patient) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(modifier = Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(Color(0xFFE3F2FD)),
                contentAlignment = Alignment.Center
            ) {
                if (!patient.profilePhotoUri.isNullOrEmpty()) {
                    android.util.Log.d("PROFILE_IMAGE", "Loaded: ${patient.profilePhotoUri}")
                    AsyncImage(
                        model = patient.profilePhotoUri,
                        contentDescription = "Profile Photo",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = androidx.compose.ui.layout.ContentScale.Crop
                    )
                } else {
                    Icon(
                        Icons.Default.Person, 
                        contentDescription = null, 
                        tint = Color(0xFF007AFF),
                        modifier = Modifier.size(40.dp)
                    )
                }
            }
            Spacer(modifier = Modifier.width(20.dp))
            Column {
                Text(patient.name, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                Text("ID: ${patient.id}", fontSize = 14.sp, color = Color.Gray)
                Spacer(modifier = Modifier.height(4.dp))
                Row {
                    Text(text = "Gender: ${patient.gender}", fontSize = 12.sp, color = Color.Gray)
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(text = "Age: ${patient.age}", fontSize = 12.sp, color = Color.Gray)
                }
                if (patient.phone.isNotEmpty()) {
                    Text(text = "Mob: ${patient.phone}", fontSize = 12.sp, color = Color.Gray, modifier = Modifier.padding(top = 2.dp))
                }
            }
        }
    }
}

@Composable
fun SmallAnalysisCard(analysis: com.saveetha.aipulpcapping.model.Analysis, onClick: () -> Unit) {
    Card(
        modifier = Modifier.width(160.dp).clickable { onClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Box(
                modifier = Modifier.fillMaxWidth().height(80.dp).background(Color(0xFFF0F0F0), RoundedCornerShape(8.dp)),
                contentAlignment = Alignment.Center
            ) {
                if (!analysis.xRayUri.isNullOrEmpty()) {
                    AsyncImage(
                        model = analysis.xRayUri,
                        contentDescription = "Analysis Thumbnail",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = androidx.compose.ui.layout.ContentScale.Crop
                    )
                } else {
                    Icon(Icons.Default.Image, contentDescription = null, tint = Color.LightGray)
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = analysis.time, fontSize = 12.sp, color = Color.Gray)
            Text(
                text = analysis.result,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = if (analysis.result == "High Risk") Color.Red else Color(0xFF4CAF50)
            )
        }
    }
}

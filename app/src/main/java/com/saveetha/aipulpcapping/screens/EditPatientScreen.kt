package com.saveetha.aipulpcapping.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AddAPhoto
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.components.AppTextField
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditPatientScreen(navController: NavController, viewModel: DashboardViewModel, patientId: String) {
    var patient by remember { mutableStateOf<com.saveetha.aipulpcapping.model.Patient?>(null) }
    
    LaunchedEffect(patientId) {
        patient = viewModel.getPatientById(patientId)
    }

    var name by remember(patient) { mutableStateOf(patient?.name ?: "") }
    var age by remember(patient) { mutableStateOf(patient?.age ?: "") }
    var gender by remember(patient) { mutableStateOf(patient?.gender ?: "") }
    var phone by remember(patient) { mutableStateOf(patient?.phone ?: "") }
    var history by remember(patient) { mutableStateOf(patient?.history ?: "") }
    var profilePhotoUri by remember(patient) { mutableStateOf(patient?.profilePhotoUri?.let { Uri.parse(it) }) }
    var radiographUri by remember(patient) { mutableStateOf(patient?.latestRadiographUri?.let { Uri.parse(it) }) }
    var showDeleteDialog by remember { mutableStateOf(false) }

    val profilePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickVisualMedia(),
        onResult = { uri -> 
            profilePhotoUri = uri 
            android.util.Log.d("PROFILE_IMAGE", "Updated: $uri")
        }
    )

    val radiographPickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickVisualMedia(),
        onResult = { uri -> 
            radiographUri = uri 
            android.util.Log.d("XRAY_IMAGE", "Updated: $uri")
        }
    )

    if (showDeleteDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteDialog = false },
            title = { Text("Delete Patient") },
            text = { Text("Are you sure you want to delete this patient record? This action cannot be undone.") },
            confirmButton = {
                TextButton(onClick = {
                    viewModel.deletePatient(patientId)
                    navController.popBackStack("patient_list", inclusive = false)
                }) {
                    Text("Delete", color = Color.Red)
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Edit Patient Profile", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { showDeleteDialog = true }) {
                        Icon(Icons.Default.Delete, contentDescription = "Delete", tint = Color.Red)
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
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color.White)
                    .padding(paddingValues)
                    .padding(24.dp)
                    .verticalScroll(rememberScrollState()),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Profile Photo Selection
                Box(
                    modifier = Modifier
                        .size(100.dp)
                        .clip(CircleShape)
                        .background(Color(0xFFF0F0F0))
                        .clickable { 
                            profilePickerLauncher.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
                        },
                    contentAlignment = Alignment.Center
                ) {
                    if (profilePhotoUri != null) {
                        AsyncImage(
                            model = profilePhotoUri,
                            contentDescription = "Profile Photo",
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Crop
                        )
                    } else {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(Icons.Default.Person, contentDescription = null, tint = Color.LightGray, modifier = Modifier.size(40.dp))
                            Text("Change Photo", fontSize = 10.sp, color = Color.Gray)
                        }
                    }
                    
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomEnd)
                            .size(32.dp)
                            .background(Color(0xFF007AFF), CircleShape)
                            .padding(6.dp)
                    ) {
                        Icon(Icons.Default.AddAPhoto, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                Text(text = "Modify patient details and clinical notes below.", fontSize = 14.sp, color = Color.Gray, modifier = Modifier.align(Alignment.Start))
                Spacer(modifier = Modifier.height(24.dp))

                AppTextField(value = name, onValueChange = { name = it }, label = "Full Name")
                Spacer(modifier = Modifier.height(16.dp))
                AppTextField(
                    value = age,
                    onValueChange = { age = it },
                    label = "Age",
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                )
                Spacer(modifier = Modifier.height(16.dp))
                AppTextField(value = gender, onValueChange = { gender = it }, label = "Gender")
                Spacer(modifier = Modifier.height(16.dp))
                AppTextField(value = phone, onValueChange = { phone = it }, label = "Mobile Number", keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone))
                Spacer(modifier = Modifier.height(16.dp))
                AppTextField(
                    value = history,
                    onValueChange = { history = it },
                    label = "Clinical Notes & Medical History",
                    modifier = Modifier.height(150.dp)
                )

                Spacer(modifier = Modifier.height(24.dp))

                // X-Ray Upload Section
                Text(
                    text = "Update Diagnostic Radiograph",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.align(Alignment.Start).padding(bottom = 8.dp)
                )
                Card(
                    onClick = { 
                        radiographPickerLauncher.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
                    },
                    modifier = Modifier.fillMaxWidth().height(150.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFF8F9FA)),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color.LightGray)
                ) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        if (radiographUri != null) {
                            AsyncImage(
                                model = radiographUri,
                                contentDescription = "Radiograph",
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Crop
                            )
                        } else {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Icon(Icons.Default.AddAPhoto, contentDescription = null, tint = Color.Gray)
                                Text("Upload X-Ray", fontSize = 12.sp, color = Color.Gray)
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(32.dp))

                AppButton(
                    text = "Update Changes",
                    onClick = {
                        viewModel.updatePatient(
                            currentPatient.copy(
                                name = name, 
                                age = age,
                                gender = gender,
                                phone = phone, 
                                history = history,
                                profilePhotoUri = profilePhotoUri?.toString(),
                                latestRadiographUri = radiographUri?.toString()
                            )
                        )
                        navController.popBackStack()
                    }
                )

                Spacer(modifier = Modifier.height(12.dp))

                TextButton(
                    onClick = { showDeleteDialog = true },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Delete Patient Record", color = Color.Red)
                }
            }
        }
    }
}

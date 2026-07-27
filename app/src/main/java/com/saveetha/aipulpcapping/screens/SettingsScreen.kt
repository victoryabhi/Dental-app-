package com.saveetha.aipulpcapping.screens

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.components.AppBottomBar
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    navController: NavController, 
    authViewModel: AuthViewModel, 
    dashboardViewModel: DashboardViewModel
) {
    val context = androidx.compose.ui.platform.LocalContext.current
    var isEditing by remember { mutableStateOf(false) }
    var notificationsEnabled by remember { mutableStateOf(true) }
    val isDarkTheme by authViewModel.isDarkTheme
    val isBiometricEnabled by authViewModel.isBiometricEnabled
    val isTwoFactorEnabled by authViewModel.isTwoFactorEnabled

    // Temporary states for editing
    var editName by remember { mutableStateOf(authViewModel.fullName.value) }
    var editDoctorId by remember { mutableStateOf(authViewModel.doctorId.value) }
    var editEmail by remember { mutableStateOf(authViewModel.email.value) }
    var editPhone by remember { mutableStateOf(authViewModel.phoneNumber.value) }
    var editClinic by remember { mutableStateOf(authViewModel.clinicName.value) }
    var editAddress by remember { mutableStateOf(authViewModel.clinicAddress.value) }

    val totalPatients by dashboardViewModel.totalPatients.collectAsState()
    val totalAnalyses by dashboardViewModel.totalAnalyses.collectAsState()
    val highRiskCases by dashboardViewModel.highRiskCases.collectAsState()
    val successfulCases = totalAnalyses - highRiskCases

    val photoLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickVisualMedia()
    ) { uri ->
        uri?.let {
            authViewModel.updateProfilePhoto(context, it.toString())
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (isEditing) "Edit Profile" else "Profile & Settings", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { 
                        if (isEditing) isEditing = false else navController.popBackStack() 
                    }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    if (!isEditing) {
                        TextButton(onClick = { isEditing = true }) {
                            Text("Edit", color = Color(0xFF007AFF), fontWeight = FontWeight.Bold)
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        },
        bottomBar = { AppBottomBar(navController) }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF8F9FA))
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(24.dp)
        ) {
            // User Profile Header
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .size(100.dp)
                            .clip(CircleShape)
                            .background(Color(0xFFE3F2FD))
                            .clickable {
                                photoLauncher.launch(
                                    PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)
                                )
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        if (authViewModel.profilePhotoUri.value != null) {
                            AsyncImage(
                                model = authViewModel.profilePhotoUri.value,
                                contentDescription = "Profile Photo",
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Crop
                            )
                        } else {
                            Icon(
                                Icons.Default.Person,
                                contentDescription = null,
                                tint = Color(0xFF007AFF),
                                modifier = Modifier.size(60.dp)
                            )
                        }
                        
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .background(Color.Black.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                Icons.Default.CameraAlt,
                                contentDescription = "Change Photo",
                                tint = Color.White,
                                modifier = Modifier.size(24.dp)
                            )
                        }
                    }
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    if (isEditing) {
                        OutlinedTextField(
                            value = editName,
                            onValueChange = { editName = it },
                            label = { Text("Full Name") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = editDoctorId,
                            onValueChange = { editDoctorId = it },
                            label = { Text("Doctor ID") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp)
                        )
                    } else {
                        Text(
                            text = authViewModel.fullName.value.ifEmpty { "Enter Name" },
                            fontWeight = FontWeight.Bold,
                            fontSize = 22.sp
                        )
                        Text(
                            text = "ID: ${authViewModel.doctorId.value.ifEmpty { "Enter ID" }}",
                            color = Color(0xFF007AFF),
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 14.sp
                        )
                    }

                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Text(
                        text = "Professional Statistics",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = Color.Gray,
                        modifier = Modifier.fillMaxWidth(),
                        textAlign = androidx.compose.ui.text.style.TextAlign.Start
                    )
                    
                    Spacer(modifier = Modifier.height(12.dp))
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        ProfileStatItem("Total Patients", totalPatients.toString())
                        VerticalDivider(modifier = Modifier.height(30.dp), color = Color.LightGray)
                        ProfileStatItem("Total AI Analyses", totalAnalyses.toString())
                        VerticalDivider(modifier = Modifier.height(30.dp), color = Color.LightGray)
                        ProfileStatItem("Successful Cases", successfulCases.toString())
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            SettingsHeader("Clinic & Account Details")
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    if (isEditing) {
                        OutlinedTextField(
                            value = editEmail,
                            onValueChange = { editEmail = it },
                            label = { Text("Email") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        OutlinedTextField(
                            value = editPhone,
                            onValueChange = { editPhone = it },
                            label = { Text("Phone Number") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        OutlinedTextField(
                            value = editClinic,
                            onValueChange = { editClinic = it },
                            label = { Text("Clinic Name") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        OutlinedTextField(
                            value = editAddress,
                            onValueChange = { editAddress = it },
                            label = { Text("Clinic Address") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp),
                            minLines = 2
                        )
                    } else {
                        AccountDetailItem(Icons.Default.Email, "Email", authViewModel.email.value.ifEmpty { "Not set" })
                        HorizontalDivider(color = Color(0xFFF0F0F0), modifier = Modifier.padding(vertical = 8.dp))
                        AccountDetailItem(Icons.Default.Phone, "Phone", authViewModel.phoneNumber.value.ifEmpty { "Not set" })
                        HorizontalDivider(color = Color(0xFFF0F0F0), modifier = Modifier.padding(vertical = 8.dp))
                        AccountDetailItem(Icons.Default.Business, "Clinic Name", authViewModel.clinicName.value.ifEmpty { "Not set" })
                        HorizontalDivider(color = Color(0xFFF0F0F0), modifier = Modifier.padding(vertical = 8.dp))
                        AccountDetailItem(Icons.Default.LocationOn, "Address", authViewModel.clinicAddress.value.ifEmpty { "Not set" })
                    }
                }
            }

            if (isEditing) {
                Spacer(modifier = Modifier.height(24.dp))
                Button(
                    onClick = {
                        authViewModel.updateProfile(
                            context = context,
                            name = editName,
                            id = editDoctorId,
                            email = editEmail,
                            phone = editPhone,
                            clinic = editClinic,
                            address = editAddress
                        )
                        isEditing = false
                    },
                    modifier = Modifier.fillMaxWidth().height(56.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF007AFF))
                ) {
                    Text("Save Changes", fontWeight = FontWeight.Bold)
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            SettingsHeader("Security & Privacy")
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column {
                    SettingsToggleItem(Icons.Default.Fingerprint, "Biometric Login", isBiometricEnabled) { 
                        authViewModel.setBiometricEnabled(context, it)
                    }
                    HorizontalDivider(color = Color(0xFFF0F0F0))
                    SettingsToggleItem(Icons.Default.Lock, "Two-Factor Authentication", isTwoFactorEnabled) { 
                        authViewModel.setTwoFactorEnabled(context, it)
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            SettingsHeader("App Notifications")
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                SettingsToggleItem(Icons.Default.NotificationsActive, "Push Notifications", notificationsEnabled) {
                    notificationsEnabled = it
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            SettingsHeader("Design Theme")
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                ThemeOptionCard("Light", Icons.Default.LightMode, !isDarkTheme, Modifier.weight(1f)) { 
                    authViewModel.setDarkTheme(context, false)
                }
                ThemeOptionCard("Dark", Icons.Default.DarkMode, isDarkTheme, Modifier.weight(1f)) { 
                    authViewModel.setDarkTheme(context, true)
                }
            }

            Spacer(modifier = Modifier.height(48.dp))

            Button(
                onClick = {
                    navController.navigate(Screen.LogoutConfirmation.route)
                },
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFFFEBEE), contentColor = Color.Red)
            ) {
                Icon(Icons.AutoMirrored.Filled.Logout, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Logout Account", fontWeight = FontWeight.Bold)
            }

            Spacer(modifier = Modifier.height(16.dp))

            TextButton(
                onClick = { navController.navigate(Screen.AboutApp.route) },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("About EndoAI Assistant v1.2.0", color = Color.Gray, fontSize = 13.sp)
            }
            
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun ProfileStatItem(label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = value, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = Color.Black)
        Text(
            text = label, 
            fontSize = 11.sp, 
            color = Color.Gray,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
    }
}

@Composable
fun AccountDetailItem(icon: ImageVector, label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(20.dp))
        Spacer(modifier = Modifier.width(16.dp))
        Column {
            Text(text = label, color = Color.Gray, fontSize = 12.sp)
            Text(text = value, fontSize = 15.sp, fontWeight = FontWeight.Medium)
        }
    }
}

@Composable
fun SettingsHeader(title: String) {
    Text(
        text = title,
        fontSize = 14.sp,
        fontWeight = FontWeight.Bold,
        color = Color.Gray,
        modifier = Modifier.padding(start = 8.dp, bottom = 12.dp)
    )
}

@Composable
fun SettingsToggleItem(icon: ImageVector, title: String, state: Boolean, onToggle: (Boolean) -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(icon, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.width(16.dp))
            Text(text = title, fontSize = 15.sp, fontWeight = FontWeight.Medium)
        }
        Switch(
            checked = state,
            onCheckedChange = onToggle,
            colors = SwitchDefaults.colors(checkedThumbColor = Color.White, checkedTrackColor = Color(0xFF007AFF))
        )
    }
}

@Composable
fun ThemeOptionCard(label: String, icon: ImageVector, isSelected: Boolean, modifier: Modifier, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) Color(0xFFE3F2FD) else Color.White
        ),
        border = if (isSelected) androidx.compose.foundation.BorderStroke(2.dp, Color(0xFF007AFF)) else null
    ) {
        Column(
            modifier = Modifier.padding(16.dp).fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Icon(icon, contentDescription = null, tint = if (isSelected) Color(0xFF007AFF) else Color.Gray)
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = label, fontWeight = FontWeight.Bold, color = if (isSelected) Color(0xFF007AFF) else Color.Gray)
        }
    }
}

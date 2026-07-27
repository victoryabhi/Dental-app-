package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.LibraryBooks
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.github.mikephil.charting.charts.PieChart
import com.github.mikephil.charting.data.PieData
import com.github.mikephil.charting.data.PieDataSet
import com.github.mikephil.charting.data.PieEntry
import com.github.mikephil.charting.utils.ColorTemplate
import com.saveetha.aipulpcapping.components.AppBottomBar
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(navController: NavController, viewModel: DashboardViewModel, authViewModel: AuthViewModel) {
    LaunchedEffect(Unit) {
        android.util.Log.d("SCREEN_LOAD", "Dashboard Loaded Successfully")
    }
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val analyses by viewModel.recentAnalyses.collectAsState()

    val displayName = if (authViewModel.fullName.value.isNotEmpty()) {
        "Dr. ${authViewModel.fullName.value.split(" ").firstOrNull() ?: ""}"
    } else {
        "Dr. Smith"
    }

    val displayInitial = if (authViewModel.fullName.value.isNotEmpty()) {
        authViewModel.fullName.value.take(1).uppercase()
    } else {
        "DS"
    }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                drawerContainerColor = Color.White,
                modifier = Modifier.width(300.dp)
            ) {
                MenuDrawerContent(navController, drawerState, scope, displayName, displayInitial, authViewModel)
            }
        }
    ) {
        Scaffold(
            topBar = {
                CenterAlignedTopAppBar(
                    title = {
                        Text(
                            "EndoAI Assistant",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF007AFF)
                        )
                    },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Default.Menu, contentDescription = "Menu")
                        }
                    },
                    actions = {
                        IconButton(onClick = { navController.navigate(Screen.Notifications.route) }) {
                            Icon(Icons.Default.Notifications, contentDescription = "Notifications")
                        }
                    },
                    colors = TopAppBarDefaults.centerAlignedTopAppBarColors(containerColor = Color.White)
                )
            },
            bottomBar = {
                AppBottomBar(navController)
            }
        ) { paddingValues ->
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF8F9FA))
                    .padding(paddingValues)
                    .padding(16.dp)
            ) {
                item {
                    GreetingSection(navController, displayName)
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Text("Risk Distribution", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(12.dp))
                    AnalyticsChart(viewModel)
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    StatsSection(viewModel)
                    Spacer(modifier = Modifier.height(24.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Recent Analyses", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                        Text(
                            "View All",
                            fontSize = 14.sp,
                            color = Color(0xFF007AFF),
                            modifier = Modifier.clickable { 
                                navController.navigate(Screen.AllAnalyses.route)
                            }
                        )
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                }

                items(analyses.take(5)) { analysis ->
                    AnalysisCard(analysis) {
                        navController.navigate(Screen.PatientDetails.createRoute(analysis.patientId))
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                }
            }
        }
    }
}

@Composable
fun AnalyticsChart(viewModel: DashboardViewModel) {
    val analyses by viewModel.recentAnalyses.collectAsState()
    
    val highCount = analyses.count { it.result == "High Risk" }.toFloat()
    val modCount = analyses.count { it.result == "Moderate" }.toFloat()
    val lowCount = analyses.count { it.result == "Low Risk" }.toFloat()

    Card(
        modifier = Modifier.fillMaxWidth().height(250.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        AndroidView(
            factory = { context ->
                PieChart(context).apply {
                    description.isEnabled = false
                    setUsePercentValues(true)
                    setHoleColor(android.graphics.Color.TRANSPARENT)
                }
            },
            modifier = Modifier.fillMaxSize().padding(16.dp),
            update = { chart ->
                val entries = mutableListOf<PieEntry>()
                if (highCount > 0) entries.add(PieEntry(highCount, "High"))
                if (modCount > 0) entries.add(PieEntry(modCount, "Mod"))
                if (lowCount > 0) entries.add(PieEntry(lowCount, "Low"))
                
                if (entries.isEmpty()) entries.add(PieEntry(1f, "No Data"))

                val dataSet = PieDataSet(entries, "").apply {
                    colors = listOf(
                        android.graphics.Color.RED,
                        android.graphics.Color.YELLOW,
                        android.graphics.Color.GREEN
                    )
                    valueTextSize = 12f
                    valueTextColor = android.graphics.Color.BLACK
                }

                chart.data = PieData(dataSet)
                chart.invalidate()
            }
        )
    }
}

@Composable
fun GreetingSection(navController: NavController, displayName: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column {
            Text(text = "Welcome, $displayName", fontSize = 22.sp, fontWeight = FontWeight.Bold)
            Text(text = "Ready for your clinical cases?", fontSize = 14.sp, color = Color.Gray)
        }
        Button(
            onClick = { navController.navigate(Screen.UploadOption.route) },
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF007AFF))
        ) {
            Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(modifier = Modifier.width(4.dp))
            Text("New Analysis")
        }
    }
}

@Composable
fun StatsSection(viewModel: DashboardViewModel) {
    val totalPatients by viewModel.totalPatients.collectAsState()
    val totalAnalyses by viewModel.totalAnalyses.collectAsState()
    val highRiskCases by viewModel.highRiskCases.collectAsState()

    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        StatCardSmall("Total Patients", totalPatients.toString(), Modifier.weight(1f))
        StatCardSmall("AI Analyses", totalAnalyses.toString(), Modifier.weight(1f))
        StatCardSmall("High Risk", highRiskCases.toString(), Modifier.weight(1f), isAlert = true)
    }
}

@Composable
fun StatCardSmall(label: String, value: String, modifier: Modifier, isAlert: Boolean = false) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = label, fontSize = 12.sp, color = Color.Gray)
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = value,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = if (isAlert) Color.Red else Color.Black
            )
        }
    }
}

@Composable
fun AnalysisCard(analysis: com.saveetha.aipulpcapping.model.Analysis, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(50.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color(0xFFF0F0F0)),
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
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = analysis.patientName, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    Text(text = "#${analysis.patientId}", fontSize = 12.sp, color = Color.Gray)
                }
                
                Spacer(modifier = Modifier.height(4.dp))
                
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "RDT: ${analysis.rdtValue}", fontSize = 12.sp, color = Color.Gray)
                    Spacer(modifier = Modifier.width(8.dp))
                    Box(modifier = Modifier.size(4.dp).clip(CircleShape).background(Color.LightGray))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(text = analysis.date, fontSize = 12.sp, color = Color.Gray)
                }
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = analysis.result,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = when(analysis.result) {
                            "High Risk" -> Color.Red
                            "Moderate" -> Color(0xFFFFA000)
                            else -> Color(0xFF4CAF50)
                        },
                        modifier = Modifier
                            .background(
                                color = when(analysis.result) {
                                    "High Risk" -> Color(0xFFFFEBEE)
                                    "Moderate" -> Color(0xFFFFF3E0)
                                    else -> Color(0xFFE8F5E9)
                                },
                                shape = RoundedCornerShape(8.dp)
                            )
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                    
                    Text(
                        text = "Confidence: ${analysis.confidence}",
                        fontSize = 11.sp,
                        color = Color(0xFF007AFF),
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}

@Composable
fun MenuDrawerContent(
    navController: NavController,
    drawerState: DrawerState,
    scope: kotlinx.coroutines.CoroutineScope,
    displayName: String,
    displayInitial: String,
    authViewModel: AuthViewModel
) {
    val context = androidx.compose.ui.platform.LocalContext.current
    var showLogoutDialog by remember { mutableStateOf(false) }

    if (showLogoutDialog) {
        AlertDialog(
            onDismissRequest = { showLogoutDialog = false },
            title = { Text("Logout") },
            text = { Text("Are you sure you want to logout from EndoAI?") },
            confirmButton = {
                TextButton(onClick = {
                    showLogoutDialog = false
                    authViewModel.logout(context)
                    navController.navigate(Screen.Login.route) {
                        popUpTo(0)
                    }
                }) {
                    Text("Logout", color = Color.Red)
                }
            },
            dismissButton = {
                TextButton(onClick = { showLogoutDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable {
                    scope.launch {
                        drawerState.close()
                        navController.navigate(Screen.Settings.route)
                    }
                },
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier.size(60.dp).clip(CircleShape).background(Color(0xFFE3F2FD)),
                contentAlignment = Alignment.Center
            ) {
                if (authViewModel.profilePhotoUri.value != null) {
                    AsyncImage(
                        model = authViewModel.profilePhotoUri.value,
                        contentDescription = "Profile Photo",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = androidx.compose.ui.layout.ContentScale.Crop
                    )
                } else {
                    Text(displayInitial, fontWeight = FontWeight.Bold, color = Color(0xFF007AFF), fontSize = 20.sp)
                }
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(displayName, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                Text("Endodontist", color = Color.Gray, fontSize = 14.sp)
            }
        }
        
        Spacer(modifier = Modifier.height(40.dp))
        
        DrawerItem(Icons.Default.Dashboard, "Overview", true) { 
            scope.launch { 
                drawerState.close()
                navController.navigate(Screen.NavOverview.route)
            } 
        }
        DrawerItem(Icons.Default.People, "Patient Records") { 
            scope.launch { 
                drawerState.close()
                navController.navigate(Screen.PatientList.route)
            } 
        }
        DrawerItem(Icons.Default.Psychology, "Clinical AI") { 
            scope.launch { 
                drawerState.close()
                navController.navigate(Screen.ClinicalAi.route)
            } 
        }
        DrawerItem(Icons.AutoMirrored.Filled.LibraryBooks, "Material Library") { 
            scope.launch { 
                drawerState.close()
                navController.navigate(Screen.MaterialLibrary.route)
            } 
        }
        DrawerItem(Icons.Default.Settings, "Settings") { 
            scope.launch { 
                drawerState.close()
                navController.navigate(Screen.Settings.route)
            } 
        }
        
        Spacer(modifier = Modifier.weight(1f))
        
        DrawerItem(Icons.AutoMirrored.Filled.Logout, "Logout", textColor = Color.Red) {
             showLogoutDialog = true
        }
    }
}

@Composable
fun DrawerItem(icon: ImageVector, label: String, isSelected: Boolean = false, onClick: () -> Unit) {
    DrawerItem(icon, label, if (isSelected) Color(0xFF007AFF) else Color.Black, onClick)
}

@Composable
fun DrawerItem(icon: ImageVector, label: String, textColor: Color, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(vertical = 16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = textColor, modifier = Modifier.size(24.dp))
        Spacer(modifier = Modifier.width(16.dp))
        Text(text = label, color = textColor, fontSize = 16.sp, fontWeight = FontWeight.Medium)
    }
}

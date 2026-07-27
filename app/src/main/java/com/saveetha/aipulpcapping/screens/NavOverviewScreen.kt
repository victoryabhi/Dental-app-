package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Help
import androidx.compose.material.icons.automirrored.filled.LibraryBooks
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.navigation.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NavOverviewScreen(navController: NavController) {
    val navItems = listOf(
        NavItem("Dashboard", Icons.Default.Dashboard, Screen.Dashboard.route),
        NavItem("Patient Records", Icons.Default.People, Screen.PatientList.route),
        NavItem("Clinical AI", Icons.Default.Psychology, Screen.UploadOption.route),
        NavItem("Material Library", Icons.AutoMirrored.Filled.LibraryBooks, Screen.MaterialSelection.route),
        NavItem("Analytics", Icons.Default.BarChart, Screen.AllAnalyses.route),
        NavItem("Settings", Icons.Default.Settings, Screen.Settings.route)
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Navigation Overview", fontWeight = FontWeight.Bold) },
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
                .padding(16.dp)
        ) {
            Text(
                text = "Access all clinical modules and assistant tools from a single centralized view.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            // Doctor Profile Quick Card
            Card(
                modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Row(modifier = Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier.size(60.dp).clip(CircleShape).background(Color(0xFFE3F2FD)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("DS", color = Color(0xFF007AFF), fontWeight = FontWeight.Bold, fontSize = 20.sp)
                    }
                    Spacer(modifier = Modifier.width(16.dp))
                    Column {
                        Text("Dr. John Smith", fontWeight = FontWeight.Bold, fontSize = 18.sp)
                        Text("Endodontist • 12 Active Cases", color = Color.Gray, fontSize = 14.sp)
                    }
                }
            }

            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(navItems) { item ->
                    NavigationCard(item) {
                        item.route?.let { navController.navigate(it) }
                    }
                }
            }
        }
    }
}

data class NavItem(val label: String, val icon: ImageVector, val route: String?)

@Composable
fun NavigationCard(item: NavItem, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(130.dp)
            .clickable { onClick() },
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize().padding(16.dp),
            horizontalAlignment = Alignment.Start,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Box(
                modifier = Modifier.size(40.dp).background(Color(0xFFE3F2FD), RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(item.icon, contentDescription = null, tint = Color(0xFF007AFF))
            }
            Text(text = item.label, fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }
    }
}

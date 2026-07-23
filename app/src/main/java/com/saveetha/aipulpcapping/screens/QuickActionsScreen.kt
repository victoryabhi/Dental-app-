package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppBottomBar
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun QuickActionsScreen(navController: NavController, viewModel: DashboardViewModel) {
    val actions = listOf(
        QuickActionItem("New Patient", Icons.Default.PersonAdd, Color(0xFFE3F2FD), Screen.AddPatient.route),
        QuickActionItem("Start Analysis", Icons.Default.Psychology, Color(0xFFF3E5F5), Screen.UploadOption.route),
        QuickActionItem("Search ID", Icons.Default.Search, Color(0xFFE8F5E9), Screen.SearchPatient.route),
        QuickActionItem("Emergency", Icons.Default.Warning, Color(0xFFFFF3E0), Screen.Notifications.route),
        QuickActionItem("Reports", Icons.Default.Assessment, Color(0xFFE0F2F1), Screen.AllAnalyses.route),
        QuickActionItem("Quick Scan", Icons.Default.QrCodeScanner, Color(0xFFFBE9E7), Screen.CameraCapture.route)
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Quick Actions", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
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
                .padding(16.dp)
        ) {
            Text(
                text = "Frequently used clinical shortcuts and rapid tools.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(actions) { action ->
                    QuickActionCard(action) {
                        action.route?.let { navController.navigate(it) }
                    }
                }
            }

            // AI Tip Card
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 24.dp),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF007AFF)),
                elevation = CardDefaults.cardElevation(4.dp)
            ) {
                Row(
                    modifier = Modifier.padding(20.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .background(Color.White.copy(alpha = 0.2f), RoundedCornerShape(8.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Lightbulb, contentDescription = null, tint = Color.White)
                    }
                    Spacer(modifier = Modifier.width(16.dp))
                    Column {
                        Text(text = "AI Tip", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                        Text(
                            text = "Always check marginal seal before selecting direct pulp capping material.",
                            color = Color.White.copy(alpha = 0.9f),
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }
}

data class QuickActionItem(val label: String, val icon: ImageVector, val color: Color, val route: String?)

@Composable
fun QuickActionCard(item: QuickActionItem, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(140.dp)
            .clickable { onClick() },
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(50.dp)
                    .background(item.color, RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(item.icon, contentDescription = null, tint = Color(0xFF007AFF))
            }
            Spacer(modifier = Modifier.height(12.dp))
            Text(text = item.label, fontWeight = FontWeight.Bold, fontSize = 14.sp, textAlign = TextAlign.Center)
        }
    }
}

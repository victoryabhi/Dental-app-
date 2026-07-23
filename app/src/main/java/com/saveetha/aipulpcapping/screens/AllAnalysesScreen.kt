package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppBottomBar
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AllAnalysesScreen(navController: NavController, viewModel: DashboardViewModel) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedRiskFilter by remember { mutableStateOf<String?>(null) }
    val analyses by viewModel.recentAnalyses.collectAsState()
    
    val riskLevels = listOf("High Risk", "Moderate", "Low Risk")

    val filteredAnalyses = analyses.filter {
        (searchQuery.isEmpty() || it.patientName.contains(searchQuery, ignoreCase = true) || it.patientId.contains(searchQuery)) &&
        (selectedRiskFilter == null || it.result == selectedRiskFilter)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("All Analyses", fontWeight = FontWeight.Bold) },
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
        ) {
            // Search Bar
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                placeholder = { Text("Search by Patient Name or ID") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                shape = RoundedCornerShape(12.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    unfocusedContainerColor = Color.White,
                    focusedContainerColor = Color.White
                )
            )

            // Filters
            LazyRow(
                modifier = Modifier.padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                item {
                    FilterChip(
                        selected = selectedRiskFilter == null,
                        onClick = { selectedRiskFilter = null },
                        label = { Text("All") }
                    )
                }
                items(riskLevels) { risk ->
                    FilterChip(
                        selected = selectedRiskFilter == risk,
                        onClick = { selectedRiskFilter = risk },
                        label = { Text(risk) }
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Analysis List
            LazyColumn(
                modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(filteredAnalyses) { analysis ->
                    AnalysisCard(analysis) {
                        navController.navigate(Screen.PatientDetails.createRoute(analysis.patientId))
                    }
                }
                item { Spacer(modifier = Modifier.height(80.dp)) }
            }
        }
        
        // Bottom Actions Overlay
        Box(modifier = Modifier.fillMaxSize().padding(paddingValues), contentAlignment = Alignment.BottomCenter) {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                color = Color.White,
                shadowElevation = 8.dp
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    TextButton(onClick = { /* Export */ }) {
                        Icon(Icons.Default.FileDownload, contentDescription = null)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Export All")
                    }
                    TextButton(onClick = { /* Share */ }) {
                        Icon(Icons.Default.Share, contentDescription = null)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Share Reports")
                    }
                }
            }
        }
    }
}

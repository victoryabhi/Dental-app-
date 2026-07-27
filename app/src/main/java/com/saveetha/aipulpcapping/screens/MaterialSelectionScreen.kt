package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MaterialSelectionScreen(navController: NavController, viewModel: DashboardViewModel) {
    val aiRecommendedMaterial = viewModel.aiRecommendedMaterial
    
    var selectedMaterial by remember { mutableStateOf(aiRecommendedMaterial) }
    val materials = listOf("Biodentine", "MTA", "Calcium Hydroxide", "Glass Ionomer")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Material Selection", fontWeight = FontWeight.Bold) },
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
                text = "AI has analyzed the RDT and Risk Level to suggest the most suitable capping material.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(materials) { material ->
                    MaterialItem(
                        name = material,
                        isSelected = selectedMaterial == material,
                        isSuggested = material == aiRecommendedMaterial,
                        onClick = { selectedMaterial = material }
                    )
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            AppButton(
                text = "Confirm Selection",
                onClick = { 
                    viewModel.setSelectedMaterial(selectedMaterial)
                    if (selectedMaterial == aiRecommendedMaterial) {
                        navController.navigate(Screen.AiRecommended.route)
                    } else {
                        navController.navigate(Screen.FinalSelection.route)
                    }
                }
            )

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedButton(
                onClick = { navController.navigate(Screen.MaterialComparison.route) },
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF007AFF))
            ) {
                Text("Compare Materials", color = Color(0xFF007AFF))
            }
        }
    }
}

@Composable
fun MaterialItem(name: String, isSelected: Boolean, isSuggested: Boolean, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .border(
                width = if (isSelected) 2.dp else 1.dp,
                color = if (isSelected) Color(0xFF007AFF) else if (isSuggested) Color(0xFF4CAF50) else Color.LightGray.copy(alpha = 0.5f),
                shape = RoundedCornerShape(16.dp)
            ),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) Color(0xFFE3F2FD) else Color.White
        ),
        elevation = CardDefaults.cardElevation(if (isSelected) 4.dp else 2.dp)
    ) {
        Row(
            modifier = Modifier.padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = name, 
                    fontWeight = FontWeight.Bold, 
                    fontSize = 18.sp,
                    color = if (isSelected) Color(0xFF007AFF) else Color.Black
                )
                if (isSuggested) {
                    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(top = 4.dp)) {
                        Icon(Icons.Default.AutoAwesome, contentDescription = null, tint = Color(0xFF4CAF50), modifier = Modifier.size(14.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(text = "AI Recommended", color = Color(0xFF4CAF50), fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
            if (isSuggested) {
                Icon(
                    Icons.Default.CheckCircle, 
                    contentDescription = "Recommended", 
                    tint = Color(0xFF4CAF50),
                    modifier = Modifier.size(28.dp)
                )
            } else if (isSelected) {
                RadioButton(selected = true, onClick = null, colors = RadioButtonDefaults.colors(selectedColor = Color(0xFF007AFF)))
            }
        }
    }
}

package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PatientFilterScreen(navController: NavController) {
    var selectedRisk by remember { mutableStateOf("All") }
    var sliderPosition by remember { mutableStateOf(0f..100f) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Refine Patient List", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.Close, contentDescription = "Close")
                    }
                },
                actions = {
                    TextButton(onClick = { 
                        selectedRisk = "All"
                        sliderPosition = 0f..100f
                    }) {
                        Text("Reset", color = Color(0xFF007AFF))
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
                .padding(paddingValues)
                .padding(24.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Text(text = "Risk Level", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            Spacer(modifier = Modifier.height(12.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChipGroup(listOf("All", "High Risk", "Moderate", "Low Risk"), selectedRisk) { selectedRisk = it }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Text(text = "Age Range", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            RangeSlider(
                value = sliderPosition,
                onValueChange = { sliderPosition = it },
                valueRange = 0f..100f,
                modifier = Modifier.padding(horizontal = 8.dp)
            )
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(text = "${sliderPosition.start.toInt()} Years", fontSize = 12.sp, color = Color.Gray)
                Text(text = "${sliderPosition.endInclusive.toInt()} Years", fontSize = 12.sp, color = Color.Gray)
            }

            Spacer(modifier = Modifier.height(32.dp))

            Text(text = "Clinical Status", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            Spacer(modifier = Modifier.height(12.dp))
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row {
                    FilterOption("Pulpitis", true)
                    Spacer(modifier = Modifier.width(8.dp))
                    FilterOption("Caries", false)
                }
                Row {
                    FilterOption("Trauma", false)
                    Spacer(modifier = Modifier.width(8.dp))
                    FilterOption("Periapical", true)
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Text(text = "Analysis Date", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            Spacer(modifier = Modifier.height(12.dp))
            OutlinedButton(
                onClick = { },
                modifier = Modifier.fillMaxWidth().height(56.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("Select Date Range", color = Color.Black)
            }

            Spacer(modifier = Modifier.weight(1f))
            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "Apply Filters",
                onClick = { navController.popBackStack() }
            )
        }
    }
}

@Composable
fun FilterChipGroup(options: List<String>, selected: String, onSelected: (String) -> Unit) {
    options.forEach { option ->
        val isSelected = selected == option
        Button(
            onClick = { onSelected(option) },
            colors = ButtonDefaults.buttonColors(
                containerColor = if (isSelected) Color(0xFF007AFF) else Color(0xFFF0F0F0),
                contentColor = if (isSelected) Color.White else Color.Black
            ),
            shape = RoundedCornerShape(12.dp),
            contentPadding = PaddingValues(horizontal = 16.dp),
            modifier = Modifier.height(40.dp)
        ) {
            Text(text = option, fontSize = 12.sp)
        }
    }
}

@Composable
fun FilterOption(label: String, isSelected: Boolean) {
    Box(
        modifier = Modifier
            .background(
                if (isSelected) Color(0xFFE3F2FD) else Color.White,
                RoundedCornerShape(12.dp)
            )
            .border(
                1.dp,
                if (isSelected) Color(0xFF007AFF) else Color.LightGray,
                RoundedCornerShape(12.dp)
            )
            .padding(horizontal = 16.dp, vertical = 12.dp)
    ) {
        Text(text = label, color = if (isSelected) Color(0xFF007AFF) else Color.Black, fontSize = 14.sp)
    }
}

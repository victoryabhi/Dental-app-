package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.R
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.components.AppTextField
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RdtInputScreen(navController: NavController, viewModel: DashboardViewModel) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("RDT Measurement Input", fontWeight = FontWeight.Bold) },
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
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Provide the Remaining Dentin Thickness (RDT) manually set by the clinical assessment.",
                fontSize = 14.sp,
                color = Color.Gray,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Reference Diagram Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = "Reference Diagram", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    Spacer(modifier = Modifier.height(16.dp))
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(180.dp)
                            .background(Color(0xFFF0F0F0), RoundedCornerShape(16.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        if (viewModel.selectedImageUri.value != null) {
                            AsyncImage(
                                model = viewModel.selectedImageUri.value,
                                contentDescription = "User Input Photo",
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Fit
                            )
                        } else {
                            androidx.compose.foundation.Image(
                                painter = painterResource(id = R.drawable.tooth_illustration),
                                contentDescription = "Tooth Anatomy Reference",
                                modifier = Modifier.fillMaxSize().padding(16.dp),
                                contentScale = ContentScale.Fit
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Input Section
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Text(text = "Enter Value (mm)", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    Spacer(modifier = Modifier.height(16.dp))
                    AppTextField(
                        value = viewModel.rdtValue.value,
                        onValueChange = { viewModel.onRdtValueChange(it) },
                        label = "RDT in mm (e.g. 0.8)",
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        RdtChip("0.5 mm") { viewModel.onRdtValueChange("0.5") }
                        RdtChip("1.0 mm") { viewModel.onRdtValueChange("1.0") }
                        RdtChip("1.5 mm") { viewModel.onRdtValueChange("1.5") }
                        RdtChip("2.0 mm") { viewModel.onRdtValueChange("2.0") }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Clinical Guidance
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFFE3F2FD), RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Row(verticalAlignment = Alignment.Top) {
                    Icon(Icons.Default.Info, contentDescription = null, tint = Color(0xFF007AFF))
                    Spacer(modifier = Modifier.width(16.dp))
                    Text(
                        text = "RDT is critical for determining pulp vitality prognosis. Values below 0.5 mm significantly increase the risk of pulpal complications.",
                        fontSize = 12.sp,
                        color = Color(0xFF007AFF),
                        lineHeight = 18.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "Continue to AI Analysis",
                onClick = {
                    if (viewModel.rdtValue.value.isNotEmpty()) {
                        navController.navigate(Screen.InputValidation.route)
                    }
                }
            )
        }
    }
}

@Composable
fun RdtChip(label: String, onClick: () -> Unit) {
    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(8.dp),
        color = Color(0xFFF8F9FA),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color.LightGray)
    ) {
        Text(
            text = label,
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
            fontSize = 12.sp,
            fontWeight = FontWeight.Medium
        )
    }
}

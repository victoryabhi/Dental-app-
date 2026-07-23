package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CloudUpload
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.PhotoCamera
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
import com.saveetha.aipulpcapping.navigation.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UploadOptionScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Diagnostic Upload", fontWeight = FontWeight.Bold) },
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
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Select a method to import dental images for AI analysis. High-resolution DICOM or JPEG formats are recommended.",
                fontSize = 14.sp,
                color = Color.Gray,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(32.dp))

            UploadCard(
                title = "Take Photo",
                subtitle = "Capture a high-quality clinical photo using the device camera.",
                icon = Icons.Default.PhotoCamera,
                onClick = { navController.navigate(Screen.CameraCapture.route) }
            )

            Spacer(modifier = Modifier.height(16.dp))

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                SmallUploadCard(
                    title = "Gallery",
                    icon = Icons.Default.Image,
                    modifier = Modifier.weight(1f),
                    onClick = { navController.navigate(Screen.GallerySelection.route) }
                )
                SmallUploadCard(
                    title = "PACS / Cloud",
                    icon = Icons.Default.CloudUpload,
                    modifier = Modifier.weight(1f),
                    onClick = { /* PACS Import */ }
                )
            }

            Spacer(modifier = Modifier.height(32.dp))

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFFE3F2FD), RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.CloudUpload, contentDescription = null, tint = Color(0xFF007AFF))
                    Spacer(modifier = Modifier.width(16.dp))
                    Text(
                        text = "Imported radiographs will be synced with clinical records for optimal patient review.",
                        fontSize = 12.sp,
                        color = Color(0xFF007AFF),
                        fontWeight = FontWeight.Medium
                    )
                }
            }
            
            Spacer(modifier = Modifier.weight(1f))
            
            // Image Banner Placeholder
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(150.dp)
                    .background(Color.LightGray, RoundedCornerShape(20.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text("Dental X-Ray Image Preview", color = Color.White)
            }
        }
    }
}

@Composable
fun UploadCard(title: String, subtitle: String, icon: ImageVector, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(
            modifier = Modifier.padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier.size(60.dp).background(Color(0xFFE3F2FD), RoundedCornerShape(16.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(icon, contentDescription = null, tint = Color(0xFF007AFF), modifier = Modifier.size(32.dp))
            }
            Spacer(modifier = Modifier.height(16.dp))
            Text(text = title, fontWeight = FontWeight.Bold, fontSize = 18.sp)
            Text(text = subtitle, fontSize = 14.sp, color = Color.Gray, textAlign = TextAlign.Center)
        }
    }
}

@Composable
fun SmallUploadCard(title: String, icon: ImageVector, modifier: Modifier, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = modifier.height(120.dp),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(icon, contentDescription = null, tint = Color(0xFF007AFF), modifier = Modifier.size(28.dp))
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = title, fontWeight = FontWeight.Bold, fontSize = 14.sp)
        }
    }
}

package com.saveetha.aipulpcapping.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AddPhotoAlternate
import androidx.compose.material.icons.filled.Image
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GallerySelectionScreen(navController: NavController, viewModel: DashboardViewModel) {
    var selectedImageUri by remember { mutableStateOf<Uri?>(null) }
    
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickVisualMedia(),
        onResult = { uri -> selectedImageUri = uri }
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Upload from Gallery", fontWeight = FontWeight.Bold) },
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
                .background(Color.White)
                .padding(paddingValues)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            if (selectedImageUri == null) {
                Card(
                    onClick = { 
                        launcher.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(300.dp),
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFF8F9FA)),
                    border = androidx.compose.foundation.BorderStroke(2.dp, Color(0xFFE3F2FD))
                ) {
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Icon(
                            Icons.Default.AddPhotoAlternate,
                            contentDescription = null,
                            tint = Color(0xFF007AFF),
                            modifier = Modifier.size(64.dp)
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            "Tap to select a dental radiograph",
                            fontWeight = FontWeight.Medium,
                            color = Color.Gray
                        )
                    }
                }
            } else {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    shape = RoundedCornerShape(24.dp),
                    elevation = CardDefaults.cardElevation(4.dp)
                ) {
                    AsyncImage(
                        model = selectedImageUri,
                        contentDescription = "Selected Image",
                        modifier = Modifier.fillMaxSize(),
                        contentScale = androidx.compose.ui.layout.ContentScale.Crop
                    )
                }
                
                Spacer(modifier = Modifier.height(24.dp))
                
                TextButton(onClick = { 
                    launcher.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))
                }) {
                    Text("Choose Different Image", color = Color(0xFF007AFF))
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            AppButton(
                text = "Analyze Selected Image",
                onClick = {
                    if (selectedImageUri != null) {
                        viewModel.setSelectedImage(selectedImageUri.toString())
                        navController.navigate(Screen.ImagePreview.route)
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                containerColor = if (selectedImageUri != null) Color(0xFF007AFF) else Color.LightGray
            )
        }
    }
}

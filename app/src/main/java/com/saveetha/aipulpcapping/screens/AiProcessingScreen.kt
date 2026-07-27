package com.saveetha.aipulpcapping.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel
import kotlinx.coroutines.delay

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AiProcessingScreen(navController: NavController, viewModel: DashboardViewModel) {
    var progress by remember { mutableStateOf(0f) }
    val animatedProgress by animateFloatAsState(
        targetValue = progress,
        animationSpec = tween(durationMillis = 2000, easing = LinearEasing),
        label = "Progress"
    )

    LaunchedEffect(Unit) {
        progress = 1f
        delay(2500)
        navController.navigate(Screen.RegionDetection.route) {
            popUpTo(Screen.AiProcessing.route) { inclusive = true }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("AI Processing Engine", fontWeight = FontWeight.Bold) },
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
            Card(
                modifier = Modifier.fillMaxWidth().height(300.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.Black)
            ) {
                Box(modifier = Modifier.fillMaxSize()) {
                    // Image Background
                    if (viewModel.selectedImageUri.value != null) {
                        AsyncImage(
                            model = viewModel.selectedImageUri.value,
                            contentDescription = "Processing Image",
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Fit,
                            alpha = 0.6f
                        )
                    }

                    // Scanning Line Animation
                    val infiniteTransition = rememberInfiniteTransition(label = "Scanning")
                    val scanOffset by infiniteTransition.animateFloat(
                        initialValue = 0f,
                        targetValue = 1f,
                        animationSpec = infiniteRepeatable(
                            animation = tween(2000, easing = LinearEasing),
                            repeatMode = RepeatMode.Restart
                        ),
                        label = "ScanLine"
                    )

                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(2.dp)
                            .offset(y = 300.dp * scanOffset)
                            .background(Color(0xFF007AFF).copy(alpha = 0.8f))
                    )

                    // Overlay Content
                    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                Icons.Default.Psychology,
                                contentDescription = null,
                                tint = Color(0xFF007AFF),
                                modifier = Modifier.size(60.dp)
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Text(
                                text = "${(animatedProgress * 100).toInt()}%",
                                color = Color.White,
                                fontSize = 32.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "ANALYZING DENTAL STRUCTURES",
                                color = Color(0xFF007AFF),
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        LinearProgressIndicator(
                            progress = { animatedProgress },
                            modifier = Modifier.fillMaxWidth().align(Alignment.BottomCenter).height(4.dp),
                            color = Color(0xFF007AFF),
                            trackColor = Color.DarkGray
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            Text(text = "Processing Status", fontWeight = FontWeight.Bold, fontSize = 18.sp)
            Spacer(modifier = Modifier.height(16.dp))

            ProcessingStatusRow("Active Scans", "1/1")
            ProcessingStatusRow("Processing Latency", "120ms")
            ProcessingStatusRow("Neural Analysis", "Ongoing", isAccent = true)
            ProcessingStatusRow("Region Matching", "Syncing")

            Spacer(modifier = Modifier.height(32.dp))

            Text(
                text = "The AI Assistant is currently performing multi-layered neural analysis to segment dental structures and calculate clinical risk parameters.",
                fontSize = 14.sp,
                color = Color.Gray,
                lineHeight = 20.sp
            )
        }
    }
}

@Composable
fun ProcessingStatusRow(label: String, value: String, isAccent: Boolean = false) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 10.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = label, color = Color.Gray, fontSize = 14.sp)
        Text(
            text = value,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp,
            color = if (isAccent) Color(0xFF007AFF) else Color.Black
        )
    }
}

package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Healing
import androidx.compose.material.icons.filled.Image
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.saveetha.aipulpcapping.R

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MaterialLibraryScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Material Library", fontWeight = FontWeight.Bold) },
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
                .verticalScroll(rememberScrollState())
                .padding(24.dp)
        ) {
            Text(
                text = "Clinical database of pulp capping materials and their specific indications.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(bottom = 24.dp)
            )

            MaterialDetailCard(
                name = "Biodentine™",
                description = "Calcium silicate based material. Known for its 'Active Biosilicate Technology'.",
                indications = "Direct pulp capping, perforation repair, and apexification.",
                pros = "Bioactive, high biocompatibility, rapid setting time (12 min).",
                accentColor = Color(0xFF007AFF)
            )

            Spacer(modifier = Modifier.height(24.dp))

            MaterialDetailCard(
                name = "MTA (Mineral Trioxide Aggregate)",
                description = "A standard bioactive material for vital pulp therapy.",
                indications = "Indirect pulp capping, root-end filling, and pulp-potomy.",
                pros = "Excellent seal, low solubility, promotes tissue regeneration.",
                accentColor = Color(0xFF4CAF50)
            )

            Spacer(modifier = Modifier.height(24.dp))

            MaterialDetailCard(
                name = "Calcium Hydroxide",
                description = "Traditional alkaline material for promoting bridge formation.",
                indications = "Standard indirect pulp capping in non-critical cases.",
                pros = "Strong antibacterial action, low cost, easy application.",
                accentColor = Color(0xFFFFA000)
            )

            Spacer(modifier = Modifier.height(24.dp))

            MaterialDetailCard(
                name = "Glass Ionomer (GIC)",
                description = "A resin-modified or conventional restorative material.",
                indications = "Liner or base under permanent restorations.",
                pros = "Fluoride release, chemical bond to tooth structure.",
                accentColor = Color(0xFFE91E63)
            )
            
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun MaterialDetailCard(
    name: String, 
    description: String, 
    indications: String, 
    pros: String,
    accentColor: Color
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column {
            // Material Photo Section
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
                    .background(
                        brush = Brush.verticalGradient(
                            colors = listOf(accentColor.copy(alpha = 0.8f), accentColor.copy(alpha = 0.4f))
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                // In a real app, you would use:
                // AsyncImage(model = "https://example.com/biodentine.jpg", ...)
                // For now, we show a nice icon and placeholder
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        Icons.Default.Healing, 
                        contentDescription = null, 
                        tint = Color.White, 
                        modifier = Modifier.size(64.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "$name Visual Reference", 
                        color = Color.White, 
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }

            Column(modifier = Modifier.padding(20.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier.size(32.dp).background(accentColor.copy(alpha = 0.1f), RoundedCornerShape(8.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Healing, contentDescription = null, tint = accentColor, modifier = Modifier.size(18.dp))
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(text = name, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = accentColor)
                }
                
                Spacer(modifier = Modifier.height(16.dp))
                
                Text(
                    text = description, 
                    fontSize = 14.sp, 
                    fontWeight = FontWeight.Medium,
                    lineHeight = 20.sp
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                HorizontalDivider(color = Color(0xFFF0F0F0))
                Spacer(modifier = Modifier.height(16.dp))
                
                InfoRow("Clinical Indications", indications)
                Spacer(modifier = Modifier.height(8.dp))
                InfoRow("Key Clinical Properties", pros)
            }
        }
    }
}

@Composable
fun InfoRow(label: String, value: String) {
    Column(modifier = Modifier.padding(vertical = 4.dp)) {
        Text(text = label, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color.Gray)
        Text(text = value, fontSize = 13.sp, color = Color.DarkGray, lineHeight = 18.sp)
    }
}

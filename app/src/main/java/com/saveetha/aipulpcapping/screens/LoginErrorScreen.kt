package com.saveetha.aipulpcapping.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Error
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.components.AppButton
import com.saveetha.aipulpcapping.navigation.Screen

@Composable
fun LoginErrorScreen(navController: NavController) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8F9FA)),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier
                .padding(24.dp)
                .fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(8.dp)
        ) {
            Column(
                modifier = Modifier.padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Icon(
                    imageVector = Icons.Default.Error,
                    contentDescription = null,
                    tint = Color.Red,
                    modifier = Modifier.size(64.dp)
                )
                
                Spacer(modifier = Modifier.height(24.dp))
                
                Text(
                    text = "Authentication Failed",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Red
                )
                
                Spacer(modifier = Modifier.height(12.dp))
                
                Text(
                    text = "The email or password you entered is incorrect. Please check your credentials and try again.",
                    fontSize = 14.sp,
                    color = Color.Gray,
                    textAlign = TextAlign.Center
                )
                
                Spacer(modifier = Modifier.height(32.dp))
                
                AppButton(
                    text = "Try Again",
                    onClick = { navController.popBackStack() },
                    containerColor = Color.Red
                )
            }
        }
    }
}

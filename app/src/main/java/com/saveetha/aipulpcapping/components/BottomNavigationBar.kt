package com.saveetha.aipulpcapping.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.FlashOn
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.People
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.saveetha.aipulpcapping.navigation.Screen

@Composable
fun AppBottomBar(navController: NavController) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    NavigationBar(containerColor = Color.White) {
        NavigationBarItem(
            icon = { Icon(Icons.Default.Home, contentDescription = null) },
            label = { Text("Home") },
            selected = currentRoute == Screen.Dashboard.route,
            onClick = {
                if (currentRoute != Screen.Dashboard.route) {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Dashboard.route) { inclusive = true }
                    }
                }
            }
        )
        NavigationBarItem(
            icon = { Icon(Icons.Default.People, contentDescription = null) },
            label = { Text("Patients") },
            selected = currentRoute == Screen.PatientList.route,
            onClick = {
                if (currentRoute != Screen.PatientList.route) {
                    navController.navigate(Screen.PatientList.route)
                }
            }
        )
        NavigationBarItem(
            icon = { Icon(Icons.Default.BarChart, contentDescription = null) },
            label = { Text("Reports") },
            selected = currentRoute == Screen.AllAnalyses.route,
            onClick = {
                if (currentRoute != Screen.AllAnalyses.route) {
                    navController.navigate(Screen.AllAnalyses.route)
                }
            }
        )
        NavigationBarItem(
            icon = { Icon(Icons.Default.FlashOn, contentDescription = null) },
            label = { Text("Actions") },
            selected = currentRoute == Screen.QuickActions.route,
            onClick = {
                if (currentRoute != Screen.QuickActions.route) {
                    navController.navigate(Screen.QuickActions.route)
                }
            }
        )
        NavigationBarItem(
            icon = { Icon(Icons.Default.Person, contentDescription = null) },
            label = { Text("Profile") },
            selected = currentRoute == Screen.Settings.route,
            onClick = {
                if (currentRoute != Screen.Settings.route) {
                    navController.navigate(Screen.Settings.route)
                }
            }
        )
    }
}

package com.saveetha.aipulpcapping.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.saveetha.aipulpcapping.screens.*
import com.saveetha.aipulpcapping.viewmodel.AuthViewModel
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel

sealed class Screen(val route: String) {
    object Splash : Screen("splash")
    object Welcome : Screen("welcome")
    object Registration : Screen("registration")
    object Login : Screen("login")
    object EmailInput : Screen("email_input")
    object PasswordInput : Screen("password_input")
    object LoginValidation : Screen("login_validation")
    object LoginError : Screen("login_error")
    object ForgotPassword : Screen("forgot_password")
    object OtpVerification : Screen("otp_verification")
    object ResetPassword : Screen("reset_password")
    object LoginSuccess : Screen("login_success")
    object Dashboard : Screen("dashboard")
    object Notifications : Screen("notifications")
    object PatientList : Screen("patient_list")
    object AddPatient : Screen("add_patient")
    object PatientDetails : Screen("patient_details/{patientId}") {
        fun createRoute(patientId: String) = "patient_details/$patientId"
    }
    object EditPatient : Screen("edit_patient/{patientId}") {
        fun createRoute(patientId: String) = "edit_patient/$patientId"
    }
    object PatientHistory : Screen("patient_history/{patientId}") {
        fun createRoute(patientId: String) = "patient_history/$patientId"
    }
    object SearchPatient : Screen("search_patient")
    object PatientSummary : Screen("patient_summary/{patientId}") {
        fun createRoute(patientId: String) = "patient_summary/$patientId"
    }
    object QuickActions : Screen("quick_actions")
    object UploadOption : Screen("upload_option")
    object PatientFilter : Screen("patient_filter")
    object CameraCapture : Screen("camera_capture")
    object NavOverview : Screen("nav_overview")
    object GallerySelection : Screen("gallery_selection")
    object ImagePreview : Screen("image_preview")
    object ImageConfirmation : Screen("image_confirmation")
    object RdtInput : Screen("rdt_input")
    object InputValidation : Screen("input_validation")
    object AnalysisLoading : Screen("analysis_loading")
    object AiProcessing : Screen("ai_processing")
    object RegionDetection : Screen("region_detection")
    object RdtCalculation : Screen("rdt_calculation")
    object RiskAssessment : Screen("risk_assessment")
    object Settings : Screen("settings")
    object AllAnalyses : Screen("all_analyses")
    object AnalysisDetails : Screen("analysis_details/{analysisId}") {
        fun createRoute(analysisId: String) = "analysis_details/$analysisId"
    }
    object AnalysisSummary : Screen("analysis_summary")
    object RecommendationTrigger : Screen("recommendation_trigger")
    object MaterialSelection : Screen("material_selection")
    object AiRecommended : Screen("ai_recommended")
    object ManualSelection : Screen("manual_selection")
    object MaterialComparison : Screen("material_comparison")
    object FinalSelection : Screen("final_selection")
    object Result : Screen("result")
    object ReportPreview : Screen("report_preview")
    object DetailedResult : Screen("detailed_result")
    object SaveReport : Screen("save_report")
    object DownloadReport : Screen("download_report")
    object AboutApp : Screen("about_app")
    object ClinicalAi : Screen("clinical_ai")
    object MaterialLibrary : Screen("material_library")
    object LogoutConfirmation : Screen("logout_confirmation")
}

@Composable
fun SetupNavGraph(
    navController: NavHostController,
    authViewModel: AuthViewModel,
    dashboardViewModel: DashboardViewModel,
) {
    val context = androidx.compose.ui.platform.LocalContext.current
    
    androidx.compose.runtime.LaunchedEffect(Unit) {
        try {
            android.util.Log.d("APP_START", "SetupNavGraph Started")
            authViewModel.initAuth(context)
            if (authViewModel.isLoggedIn.value) {
                android.util.Log.d("NAVIGATION", "User logged in, navigating to Dashboard")
                navController.navigate(Screen.Dashboard.route) {
                    popUpTo(Screen.Splash.route) { inclusive = true }
                }
            }
            android.util.Log.d("NAVIGATION", "Initial Screen Loaded: Splash")
        } catch (e: Exception) {
            android.util.Log.e("APP_CRASH", "Navigation startup failed: ${e.message}")
        }
    }

    NavHost(
        navController = navController,
        startDestination = Screen.Splash.route
    ) {
        composable(route = Screen.Splash.route) {
            SplashScreen(navController = navController)
        }
        composable(route = Screen.Welcome.route) {
            WelcomeScreen(navController = navController)
        }
        composable(route = Screen.Registration.route) {
            RegistrationScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.Login.route) {
            LoginScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.EmailInput.route) {
            EmailInputScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.PasswordInput.route) {
            PasswordInputScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.LoginValidation.route) {
            LoginValidationScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.LoginError.route) {
            LoginErrorScreen(navController = navController)
        }
        composable(route = Screen.ForgotPassword.route) {
            ForgotPasswordScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.OtpVerification.route) {
            OtpVerificationScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.ResetPassword.route) {
            ResetPasswordScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.LoginSuccess.route) {
            LoginSuccessScreen(navController = navController, viewModel = authViewModel)
        }
        composable(route = Screen.Dashboard.route) {
            DashboardScreen(navController = navController, viewModel = dashboardViewModel, authViewModel = authViewModel)
        }
        composable(route = Screen.Notifications.route) {
            NotificationsScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.PatientList.route) {
            PatientListScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.AddPatient.route) {
            AddPatientScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.PatientDetails.route) { backStackEntry ->
            val patientId = backStackEntry.arguments?.getString("patientId") ?: ""
            PatientDetailsScreen(navController = navController, viewModel = dashboardViewModel, patientId = patientId)
        }
        composable(route = Screen.EditPatient.route) { backStackEntry ->
            val patientId = backStackEntry.arguments?.getString("patientId") ?: ""
            EditPatientScreen(navController = navController, viewModel = dashboardViewModel, patientId = patientId)
        }
        composable(route = Screen.PatientHistory.route) { backStackEntry ->
            val patientId = backStackEntry.arguments?.getString("patientId") ?: ""
            PatientHistoryScreen(navController = navController, viewModel = dashboardViewModel, patientId = patientId)
        }
        composable(route = Screen.SearchPatient.route) {
            SearchPatientScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.PatientSummary.route) { backStackEntry ->
            val patientId = backStackEntry.arguments?.getString("patientId") ?: ""
            PatientSummaryScreen(navController = navController, viewModel = dashboardViewModel, patientId = patientId)
        }
        composable(route = Screen.QuickActions.route) {
            QuickActionsScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.UploadOption.route) {
            UploadOptionScreen(navController = navController)
        }
        composable(route = Screen.PatientFilter.route) {
            PatientFilterScreen(navController = navController)
        }
        composable(route = Screen.CameraCapture.route) {
            CameraCaptureScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.NavOverview.route) {
            NavOverviewScreen(navController = navController)
        }
        composable(route = Screen.GallerySelection.route) {
            GallerySelectionScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.ImagePreview.route) {
            ImagePreviewScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.ImageConfirmation.route) {
            ImageConfirmationScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.RdtInput.route) {
            RdtInputScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.InputValidation.route) {
            InputValidationScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.AnalysisLoading.route) {
            AnalysisLoadingScreen(navController = navController)
        }
        composable(route = Screen.AiProcessing.route) {
            AiProcessingScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.RegionDetection.route) {
            RegionDetectionScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.RdtCalculation.route) {
            RdtCalculationScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.RiskAssessment.route) {
            RiskAssessmentScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.Settings.route) {
            SettingsScreen(navController = navController, authViewModel = authViewModel, dashboardViewModel = dashboardViewModel)
        }
        composable(route = Screen.AllAnalyses.route) {
            AllAnalysesScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.AnalysisDetails.route) { backStackEntry ->
            val analysisId = backStackEntry.arguments?.getString("analysisId") ?: ""
            AnalysisDetailsScreen(navController = navController, viewModel = dashboardViewModel, analysisId = analysisId)
        }
        composable(route = Screen.AnalysisSummary.route) {
            AnalysisSummaryScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.RecommendationTrigger.route) {
            RecommendationTriggerScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.MaterialSelection.route) {
            MaterialSelectionScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.AiRecommended.route) {
            AiRecommendedScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.ManualSelection.route) {
            ManualSelectionScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.MaterialComparison.route) {
            MaterialComparisonScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.FinalSelection.route) {
            FinalSelectionScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.Result.route) {
            ResultScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.ReportPreview.route) {
            ReportPreviewScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.DetailedResult.route) {
            DetailedResultScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.SaveReport.route) {
            SaveReportScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.DownloadReport.route) {
            DownloadReportScreen(navController = navController, viewModel = dashboardViewModel)
        }
        composable(route = Screen.AboutApp.route) {
            AboutAppScreen(navController = navController)
        }
        composable(route = Screen.ClinicalAi.route) {
            ClinicalAiScreen(navController = navController)
        }
        composable(route = Screen.MaterialLibrary.route) {
            MaterialLibraryScreen(navController = navController)
        }
        composable(route = Screen.LogoutConfirmation.route) {
            LogoutConfirmationScreen(navController = navController, authViewModel = authViewModel)
        }
    }
}

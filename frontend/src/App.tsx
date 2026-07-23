import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import EmailInputScreen from './screens/EmailInputScreen';
import PasswordInputScreen from './screens/PasswordInputScreen';
import LoginValidationScreen from './screens/LoginValidationScreen';
import LoginErrorScreen from './screens/LoginErrorScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OtpVerificationScreen from './screens/OtpVerificationScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import LoginSuccessScreen from './screens/LoginSuccessScreen';
import DashboardScreen from './screens/DashboardScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PatientListScreen from './screens/PatientListScreen';
import AddPatientScreen from './screens/AddPatientScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import EditPatientScreen from './screens/EditPatientScreen';
import PatientHistoryScreen from './screens/PatientHistoryScreen';
import SearchPatientScreen from './screens/SearchPatientScreen';
import PatientSummaryScreen from './screens/PatientSummaryScreen';
import QuickActionsScreen from './screens/QuickActionsScreen';
import UploadOptionScreen from './screens/UploadOptionScreen';
import PatientFilterScreen from './screens/PatientFilterScreen';
import CameraCaptureScreen from './screens/CameraCaptureScreen';
import NavOverviewScreen from './screens/NavOverviewScreen';
import GallerySelectionScreen from './screens/GallerySelectionScreen';
import ImagePreviewScreen from './screens/ImagePreviewScreen';
import ImageConfirmationScreen from './screens/ImageConfirmationScreen';
import RdtInputScreen from './screens/RdtInputScreen';
import InputValidationScreen from './screens/InputValidationScreen';
import AnalysisLoadingScreen from './screens/AnalysisLoadingScreen';
import AiProcessingScreen from './screens/AiProcessingScreen';
import RegionDetectionScreen from './screens/RegionDetectionScreen';
import RdtCalculationScreen from './screens/RdtCalculationScreen';
import RiskAssessmentScreen from './screens/RiskAssessmentScreen';
import SettingsScreen from './screens/SettingsScreen';
import AllAnalysesScreen from './screens/AllAnalysesScreen';
import AnalysisDetailsScreen from './screens/AnalysisDetailsScreen';
import AnalysisSummaryScreen from './screens/AnalysisSummaryScreen';
import RecommendationTriggerScreen from './screens/RecommendationTriggerScreen';
import MaterialSelectionScreen from './screens/MaterialSelectionScreen';
import AiRecommendedScreen from './screens/AiRecommendedScreen';
import ManualSelectionScreen from './screens/ManualSelectionScreen';
import MaterialComparisonScreen from './screens/MaterialComparisonScreen';
import FinalSelectionScreen from './screens/FinalSelectionScreen';
import ResultScreen from './screens/ResultScreen';
import ReportPreviewScreen from './screens/ReportPreviewScreen';
import DetailedResultScreen from './screens/DetailedResultScreen';
import SaveReportScreen from './screens/SaveReportScreen';
import DownloadReportScreen from './screens/DownloadReportScreen';
import AboutAppScreen from './screens/AboutAppScreen';
import ClinicalAiScreen from './screens/ClinicalAiScreen';
import MaterialLibraryScreen from './screens/MaterialLibraryScreen';
import LogoutConfirmationScreen from './screens/LogoutConfirmationScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/registration" element={<RegistrationScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/email_input" element={<EmailInputScreen />} />
        <Route path="/password_input" element={<PasswordInputScreen />} />
        <Route path="/login_validation" element={<LoginValidationScreen />} />
        <Route path="/login_error" element={<LoginErrorScreen />} />
        <Route path="/forgot_password" element={<ForgotPasswordScreen />} />
        <Route path="/otp_verification" element={<OtpVerificationScreen />} />
        <Route path="/reset_password" element={<ResetPasswordScreen />} />
        <Route path="/login_success" element={<LoginSuccessScreen />} />

        {/* Authenticated Dashboard / Workflows */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/patient_list" element={<PatientListScreen />} />
          <Route path="/add_patient" element={<AddPatientScreen />} />
          <Route path="/patient_details/:patientId" element={<PatientDetailsScreen />} />
          <Route path="/edit_patient/:patientId" element={<EditPatientScreen />} />
          <Route path="/patient_history/:patientId" element={<PatientHistoryScreen />} />
          <Route path="/search_patient" element={<SearchPatientScreen />} />
          <Route path="/patient_summary/:patientId" element={<PatientSummaryScreen />} />
          <Route path="/quick_actions" element={<QuickActionsScreen />} />
          <Route path="/upload_option" element={<UploadOptionScreen />} />
          <Route path="/patient_filter" element={<PatientFilterScreen />} />
          <Route path="/camera_capture" element={<CameraCaptureScreen />} />
          <Route path="/nav_overview" element={<NavOverviewScreen />} />
          <Route path="/gallery_selection" element={<GallerySelectionScreen />} />
          <Route path="/image_preview" element={<ImagePreviewScreen />} />
          <Route path="/image_confirmation" element={<ImageConfirmationScreen />} />
          <Route path="/rdt_input" element={<RdtInputScreen />} />
          <Route path="/input_validation" element={<InputValidationScreen />} />
          <Route path="/analysis_loading" element={<AnalysisLoadingScreen />} />
          <Route path="/ai_processing" element={<AiProcessingScreen />} />
          <Route path="/region_detection" element={<RegionDetectionScreen />} />
          <Route path="/rdt_calculation" element={<RdtCalculationScreen />} />
          <Route path="/risk_assessment" element={<RiskAssessmentScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/all_analyses" element={<AllAnalysesScreen />} />
          <Route path="/analysis_details/:analysisId" element={<AnalysisDetailsScreen />} />
          <Route path="/analysis_summary" element={<AnalysisSummaryScreen />} />
          <Route path="/recommendation_trigger" element={<RecommendationTriggerScreen />} />
          <Route path="/material_selection" element={<MaterialSelectionScreen />} />
          <Route path="/ai_recommended" element={<AiRecommendedScreen />} />
          <Route path="/manual_selection" element={<ManualSelectionScreen />} />
          <Route path="/material_comparison" element={<MaterialComparisonScreen />} />
          <Route path="/final_selection" element={<FinalSelectionScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/report_preview" element={<ReportPreviewScreen />} />
          <Route path="/detailed_result" element={<DetailedResultScreen />} />
          <Route path="/save_report" element={<SaveReportScreen />} />
          <Route path="/download_report" element={<DownloadReportScreen />} />
          <Route path="/about_app" element={<AboutAppScreen />} />
          <Route path="/clinical_ai" element={<ClinicalAiScreen />} />
          <Route path="/material_library" element={<MaterialLibraryScreen />} />
          <Route path="/logout_confirmation" element={<LogoutConfirmationScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

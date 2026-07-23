package com.saveetha.aipulpcapping.screens

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.FlashOff
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import androidx.navigation.NavController
import com.saveetha.aipulpcapping.navigation.Screen
import com.saveetha.aipulpcapping.viewmodel.DashboardViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.asExecutor
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

@Composable
fun CameraCaptureScreen(navController: NavController, viewModel: DashboardViewModel) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current

    var hasCameraPermission by remember {
        mutableStateOf(
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED
        )
    }

    val permissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission(),
        onResult = { granted -> hasCameraPermission = granted }
    )

    LaunchedEffect(Unit) {
        if (!hasCameraPermission) {
            permissionLauncher.launch(Manifest.permission.CAMERA)
        }
    }

    if (hasCameraPermission) {
        val previewView = remember { PreviewView(context) }
        val imageCapture = remember { ImageCapture.Builder().build() }
        val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

        LaunchedEffect(hasCameraPermission, lifecycleOwner) {
            if (!hasCameraPermission) return@LaunchedEffect

            try {
                val cameraProvider = withContext(Dispatchers.Main) {
                    suspendCancellableCoroutine<ProcessCameraProvider> { continuation ->
                        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
                        cameraProviderFuture.addListener({
                            try {
                                val provider = cameraProviderFuture.get()
                                if (continuation.isActive) {
                                    continuation.resume(provider)
                                }
                            } catch (e: Exception) {
                                if (continuation.isActive) {
                                    continuation.resumeWithException(e)
                                }
                            }
                        }, ContextCompat.getMainExecutor(context))
                    }
                }

                val preview = Preview.Builder().build().also {
                    it.setSurfaceProvider(previewView.surfaceProvider)
                }

                withContext(Dispatchers.Main) {
                    try {
                        cameraProvider.unbindAll()
                        cameraProvider.bindToLifecycle(
                            lifecycleOwner,
                            cameraSelector,
                            preview,
                            imageCapture
                        )
                    } catch (e: Exception) {
                        Log.e("CameraCapture", "Use case binding failed", e)
                    }
                }
            } catch (e: Exception) {
                Log.e("CameraCapture", "Camera provider initialization failed", e)
            }
        }

        Box(modifier = Modifier.fillMaxSize().background(Color.Black)) {
            AndroidView(
                factory = { previewView },
                modifier = Modifier.fillMaxSize()
            )

            // Top Controls
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp)
                    .align(Alignment.TopCenter),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.Default.Close, contentDescription = "Close", tint = Color.White)
                }
                Text(text = "Tooth Alignment", color = Color.White, fontSize = 16.sp)
                IconButton(onClick = { }) {
                    Icon(Icons.Default.FlashOff, contentDescription = "Flash", tint = Color.White)
                }
            }

            // Alignment Overlay
            Box(
                modifier = Modifier
                    .size(280.dp)
                    .border(2.dp, Color.White.copy(alpha = 0.5f), CircleShape)
                    .align(Alignment.Center)
            )

            // Bottom Controls
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 48.dp)
                    .align(Alignment.BottomCenter),
                contentAlignment = Alignment.Center
            ) {
                Button(
                    onClick = {
                        val outputDirectory = getOutputDirectory(context)
                        val photoFile = File(
                            outputDirectory,
                            SimpleDateFormat("yyyy-MM-dd-HH-mm-ss-SSS", Locale.US).format(System.currentTimeMillis()) + ".jpg"
                        )

                        val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()

                        imageCapture.takePicture(
                            outputOptions,
                            ContextCompat.getMainExecutor(context),
                            object : ImageCapture.OnImageSavedCallback {
                                override fun onError(exception: ImageCaptureException) {
                                    Log.e("CameraCapture", "Photo capture failed: ${exception.message}", exception)
                                }

                                override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                                    val savedUri = Uri.fromFile(photoFile)
                                    viewModel.setSelectedImage(savedUri.toString())
                                    navController.navigate(Screen.ImagePreview.route)
                                }
                            }
                        )
                    },
                    modifier = Modifier.size(80.dp),
                    shape = CircleShape,
                    colors = ButtonDefaults.buttonColors(containerColor = Color.White),
                    contentPadding = PaddingValues(0.dp)
                ) {
                    Icon(Icons.Default.PhotoCamera, contentDescription = "Capture", tint = Color.Black, modifier = Modifier.size(32.dp))
                }
            }
        }
    } else {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("Camera permission required")
        }
    }
}

private fun getOutputDirectory(context: android.content.Context): File {
    val mediaDir = context.externalMediaDirs.firstOrNull()?.let {
        File(it, "AiBasedPulpCapping").apply { mkdirs() }
    }
    return if (mediaDir != null && mediaDir.exists()) mediaDir else context.filesDir
}

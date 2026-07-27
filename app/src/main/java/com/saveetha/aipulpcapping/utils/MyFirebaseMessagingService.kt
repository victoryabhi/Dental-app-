package com.saveetha.aipulpcapping.utils

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d("FCM", "New registration token: $token")
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        Log.d("FCM", "From: ${remoteMessage.from}")

        // Check if message contains data payload
        if (remoteMessage.data.isNotEmpty()) {
            Log.d("FCM", "Message data payload: ${remoteMessage.data}")
            val title = remoteMessage.data["title"] ?: "Clinical Notification"
            val message = remoteMessage.data["message"] ?: "New message received"
            NotificationHelper.showAnalysisNotification(applicationContext, title, message)
        } else {
            // Check if message contains notification payload
            remoteMessage.notification?.let {
                Log.d("FCM", "Message Notification Body: ${it.body}")
                val title = it.title ?: "Clinical Notification"
                val message = it.body ?: "New message received"
                NotificationHelper.showAnalysisNotification(applicationContext, title, message)
            }
        }
    }
}

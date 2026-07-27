package com.saveetha.aipulpcapping.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

@Composable
fun AppLogo(modifier: Modifier = Modifier, tint: Color = Color(0xFF007AFF)) {
    Box(modifier = modifier, contentAlignment = Alignment.Center) {
        Canvas(modifier = Modifier.size(100.dp)) {
            val width = size.width
            val height = size.height
            
            // 1. Draw Stylized Tooth Path
            val toothPath = Path().apply {
                moveTo(width * 0.2f, height * 0.3f)
                quadraticTo(width * 0.2f, height * 0.1f, width * 0.5f, height * 0.1f)
                quadraticTo(width * 0.8f, height * 0.1f, width * 0.8f, height * 0.3f)
                quadraticTo(width * 0.85f, height * 0.6f, width * 0.7f, height * 0.9f)
                lineTo(width * 0.6f, height * 0.8f)
                lineTo(width * 0.5f, height * 0.9f)
                lineTo(width * 0.4f, height * 0.8f)
                lineTo(width * 0.3f, height * 0.9f)
                quadraticTo(width * 0.15f, height * 0.6f, width * 0.2f, height * 0.3f)
            }
            
            drawPath(
                path = toothPath,
                color = tint,
                style = Stroke(width = 4.dp.toPx())
            )

            // 2. Draw "AI Neural" Nodes (3 small circles)
            drawCircle(color = tint, radius = 4.dp.toPx(), center = Offset(width * 0.5f, height * 0.3f))
            drawCircle(color = tint, radius = 3.dp.toPx(), center = Offset(width * 0.4f, height * 0.45f))
            drawCircle(color = tint, radius = 3.dp.toPx(), center = Offset(width * 0.6f, height * 0.45f))
            
            // Connect nodes
            drawLine(color = tint.copy(alpha = 0.5f), start = Offset(width * 0.5f, height * 0.3f), end = Offset(width * 0.4f, height * 0.45f), strokeWidth = 1.dp.toPx())
            drawLine(color = tint.copy(alpha = 0.5f), start = Offset(width * 0.5f, height * 0.3f), end = Offset(width * 0.6f, height * 0.45f), strokeWidth = 1.dp.toPx())

            // 3. Draw RDT Measurement Bracket (Red)
            val rdtColor = Color(0xFFFF5252)
            drawLine(
                color = rdtColor,
                start = Offset(width * 0.35f, height * 0.6f),
                end = Offset(width * 0.65f, height * 0.6f),
                strokeWidth = 2.dp.toPx()
            )
            // Bracket edges
            drawLine(color = rdtColor, start = Offset(width * 0.35f, height * 0.55f), end = Offset(width * 0.35f, height * 0.65f), strokeWidth = 2.dp.toPx())
            drawLine(color = rdtColor, start = Offset(width * 0.65f, height * 0.55f), end = Offset(width * 0.65f, height * 0.65f), strokeWidth = 2.dp.toPx())
        }
    }
}

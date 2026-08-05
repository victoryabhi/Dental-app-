package com.saveetha.aipulpcapping

import kotlinx.coroutines.*
import org.junit.Test
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.atomic.AtomicLong

class LoadPerformanceTest {

    /**
     * Baseline/Load Testing Simulation
     * Requirements: 100 virtual users, 1 minute duration.
     * Goal: Measure RPS and Response Times.
     */
    @Test
    fun runBaselineLoadTest() {
        runBlocking {
            val userCount = 100
            val durationMillis = 60_000L // 1 minute
            val totalRequests = AtomicInteger(0)
            val totalResponseTime = AtomicLong(0)
            val minResponseTime = AtomicLong(Long.MAX_VALUE)
            val maxResponseTime = AtomicLong(0)
            
            println("--- Starting Baseline/Load Test Simulation ---")
            println("Configuration: 100 Virtual Users for 1 Minute")

            val startTime = System.currentTimeMillis()
            
            val jobs = List(userCount) {
                launch(Dispatchers.Default) {
                    while (System.currentTimeMillis() - startTime < durationMillis) {
                        val requestStartTime = System.currentTimeMillis()
                        
                        // Simulate API/Database Latency
                        simulateRequest()
                        
                        val requestEndTime = System.currentTimeMillis()
                        val responseTime = requestEndTime - requestStartTime
                        
                        totalRequests.incrementAndGet()
                        totalResponseTime.addAndGet(responseTime)
                        
                        // Track Min/Max
                        if (responseTime < minResponseTime.get()) minResponseTime.set(responseTime)
                        if (responseTime > maxResponseTime.get()) maxResponseTime.set(responseTime)
                        
                        // Constant load pacing
                        delay(10) 
                    }
                }
            }

            jobs.joinAll()
            val actualDurationSeconds = (System.currentTimeMillis() - startTime) / 1000.0
            
            val totalReqs = totalRequests.get()
            val rps = totalReqs / actualDurationSeconds
            val avgResponseTime = if (totalReqs > 0) totalResponseTime.get() / totalReqs else 0

            println("\n--- FINAL LOAD TEST RESULTS ---")
            println("Total Requests: $totalReqs")
            println("Requests per second (RPS): ${"%.2f".format(rps)} req/sec")
            println("Response Time (ms):")
            println("  Average: ${avgResponseTime}ms")
            println("  Min: ${minResponseTime.get()}ms")
            println("  Max: ${maxResponseTime.get()}ms")
            println("-------------------------------")
            
            assert(totalReqs > 0)
        }
    }

    private suspend fun simulateRequest() {
        // Simulating typical Firestore/REST API latency
        val latency = (50..450).random().toLong()
        delay(latency)
    }
}

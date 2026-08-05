plugins {
    java
}

group = "com.saveetha.aipulpcapping.automation"
version = "1.0-SNAPSHOT"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

dependencies {
    implementation("io.appium:java-client:9.2.3")
    implementation("org.seleniumhq.selenium:selenium-java:4.21.0")
    implementation("org.testng:testng:7.10.2")
    implementation("org.apache.poi:poi-ooxml:5.2.5")
    implementation("com.aventstack:extentreports:5.1.1")
    implementation("commons-io:commons-io:2.16.1")
    implementation("org.slf4j:slf4j-simple:2.0.13")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.17.1")
}

tasks.test {
    useTestNG {
        val testngFile = System.getProperty("testng.file")
        if (testngFile != null) {
            suites(testngFile)
        }
    }
    // Ensure system properties are passed to tests
    systemProperty("testng.file", System.getProperty("testng.file") ?: "testng.xml")
}

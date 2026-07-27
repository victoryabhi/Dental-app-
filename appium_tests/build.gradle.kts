plugins {
    java
}

group = "com.saveetha.aipulpcapping"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("io.appium:java-client:9.2.3")
    testImplementation("org.seleniumhq.webdriver:selenium-java:4.21.0")
    testImplementation("org.apache.poi:poi-ooxml:5.2.5")
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.slf4j:slf4j-simple:2.0.7")
}

tasks.test {
    useJUnit()
}

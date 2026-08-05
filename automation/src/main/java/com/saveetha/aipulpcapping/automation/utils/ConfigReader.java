package com.saveetha.aipulpcapping.automation.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {
    private static Properties properties;

    static {
        String[] paths = {
            "config/config.properties", 
            "automation/config/config.properties",
            "../automation/config/config.properties",
            "../../automation/config/config.properties"
        };
        for (String path : paths) {
            java.io.File file = new java.io.File(path);
            if (file.exists()) {
                try (FileInputStream fis = new FileInputStream(file)) {
                    properties = new Properties();
                    properties.load(fis);
                    System.out.println("Config loaded from absolute path: " + file.getAbsolutePath());
                    break;
                } catch (IOException ignored) {}
            }
        }
        if (properties == null) {
            // Fallback for CI environments where it might be in the classpath or a fixed location
            System.err.println("WARNING: Config file not found in paths. Using empty properties.");
            properties = new Properties();
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
}

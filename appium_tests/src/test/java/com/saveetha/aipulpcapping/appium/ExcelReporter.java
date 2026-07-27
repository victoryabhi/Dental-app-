package com.saveetha.aipulpcapping.appium;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ExcelReporter {
    private static List<TestResult> results = new ArrayList<>();

    public static void recordResult(String testName, String status, String message) {
        results.add(new TestResult(testName, status, message));
    }

    public static void generateReport(String filePath) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Appium Test Results");

            // Header Row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Test Case", "Status", "Remarks"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                CellStyle style = workbook.createCellStyle();
                Font font = workbook.createFont();
                font.setBold(true);
                style.setFont(font);
                cell.setCellStyle(style);
            }

            // Data Rows
            int rowNum = 1;
            for (TestResult result : results) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(result.testName);
                row.createCell(1).setCellValue(result.status);
                row.createCell(2).setCellValue(result.message);
            }

            // Write to file
            try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
                workbook.write(fileOut);
            }
            System.out.println("Excel Report generated at: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static class TestResult {
        String testName;
        String status;
        String message;

        TestResult(String testName, String status, String message) {
            this.testName = testName;
            this.status = status;
            this.message = message;
        }
    }
}

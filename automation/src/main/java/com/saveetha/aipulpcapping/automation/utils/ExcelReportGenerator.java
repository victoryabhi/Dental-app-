package com.saveetha.aipulpcapping.automation.utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelReportGenerator {
    public static void generateReport(String fileName, List<TestResult> results) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Execution Results");

            String[] headers = {"Test ID", "Module", "Test Name", "Priority", "Status", "Execution Time"};
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            int rowNum = 1;
            for (TestResult res : results) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(res.testId);
                row.createCell(1).setCellValue(res.module);
                row.createCell(2).setCellValue(res.testName);
                row.createCell(3).setCellValue(res.priority);
                row.createCell(4).setCellValue(res.status);
                row.createCell(5).setCellValue(res.executionTime);
            }

            java.io.File reportsDir = new java.io.File("reports");
            if (!reportsDir.exists() && !new java.io.File("automation/reports").exists()) {
                reportsDir.mkdirs();
            }
            String finalPath = reportsDir.exists() ? "reports/" + fileName : "automation/reports/" + fileName;

            try (FileOutputStream fileOut = new FileOutputStream(finalPath)) {
                workbook.write(fileOut);
                System.out.println("Excel Report saved to: " + finalPath);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static class TestResult {
        public String testId, module, testName, priority, status, executionTime;
        public TestResult(String tid, String mod, String name, String prio, String stat, String time) {
            this.testId = tid; this.module = mod; this.testName = name;
            this.priority = prio; this.status = stat; this.executionTime = time;
        }
    }
}

import XLSX from 'xlsx';
import path from 'path';

export function generateExcelReport(results) {
  try {
    const workbook = XLSX.utils.book_new();
    
    // Prepare Excel Sheet rows
    const data = [
      ["EndoAI Appium E2E Automation Test Report"],
      [`Generated at: ${new Date().toLocaleString()}`],
      [],
      ["Step ID", "Test Scenario", "Platform", "Status", "Execution Time", "Failure Reason"],
    ];

    results.forEach(res => {
      data.push([
        res.id,
        res.scenario,
        res.platform || 'Android',
        res.status,
        res.duration || 'N/A',
        res.error || ''
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    worksheet['!cols'] = [
      { wch: 10 }, // Step ID
      { wch: 45 }, // Test Scenario
      { wch: 15 }, // Platform
      { wch: 15 }, // Status
      { wch: 18 }, // Execution Time
      { wch: 50 }  // Failure Reason
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "E2E Test Summary");
    
    const outputPath = path.resolve('./Test-Report.xlsx');
    XLSX.writeFile(workbook, outputPath);
    console.log(`Excel test report successfully generated at: ${outputPath}`);
  } catch (error) {
    console.error("Failed to generate Excel report:", error);
  }
}

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export function generateExcelReport(results) {
  try {
    const passed = results.filter(r => r.status === "PASSED");
    const failed = results.filter(r => r.status === "FAILED");
    const skipped = results.filter(r => r.status === "SKIPPED");
    const total = results.length;
    const passRate = ((passed.length / total) * 100).toFixed(2);

    // Create required directories
    const dirs = [
      'Test Results/Excel',
      'Test Results/HTML',
      'Test Results/JSON',
      'Test Results/Screenshots',
      'Test Results/Logs',
      'Test Results/Summary'
    ];
    dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

    // 1. Automation_Test_Report.xlsx
    const allBook = XLSX.utils.book_new();

    // Sheet 1: Executed Test Cases
    const execData = [["Test ID", "Module", "Test Name", "Status", "Execution Time", "Priority"]];
    results.forEach(r => execData.push([r.id, r.module, r.scenario, r.status, r.duration || 'N/A', r.priority || 'MEDIUM']));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(execData), "Executed Test Cases");

    // Sheet 2: Passed Tests
    const passData = [["Test ID", "Module", "Test Name", "Execution Time"]];
    passed.forEach(r => passData.push([r.id, r.module, r.scenario, r.duration]));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(passData), "Passed Tests");

    // Sheet 3: Failed Tests
    const failData = [["Test ID", "Module", "Test Name", "Execution Time", "Failure Reason"]];
    failed.forEach(r => failData.push([r.id, r.module, r.scenario, r.duration, r.error || '']));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(failData), "Failed Tests");

    // Sheet 4: Skipped Tests
    const skipData = [["Test ID", "Module", "Test Name", "Reason"]];
    skipped.forEach(r => skipData.push([r.id, r.module, r.scenario, r.error || '']));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(skipData), "Skipped Tests");

    // Sheet 5: Execution Metrics
    const metricsData = [
      ["Metric Name", "Value"],
      ["Total Test Cases", total],
      ["Executed", passed.length + failed.length],
      ["Passed", passed.length],
      ["Failed", failed.length],
      ["Skipped", skipped.length],
      ["Pass Rate (%)", `${passRate}%`]
    ];
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(metricsData), "Execution Metrics");

    // Sheet 6: Defect Summary
    const defectData = [["Defect ID", "Associated Test ID", "Module", "Error Snippet"]];
    failed.forEach((r, idx) => defectData.push([`DEF-${String(idx+1).padStart(3, '0')}`, r.id, r.module, r.error || 'Unknown']));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(defectData), "Defect Summary");

    XLSX.writeFile(allBook, 'Test Results/Excel/Automation_Test_Report.xlsx');

    // 2. Separate Sheets
    const failedBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(failedBook, XLSX.utils.aoa_to_sheet(failData), "Failed");
    XLSX.writeFile(failedBook, 'Test Results/Excel/Failed_Test_Cases.xlsx');

    const passedBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(passedBook, XLSX.utils.aoa_to_sheet(passData), "Passed");
    XLSX.writeFile(passedBook, 'Test Results/Excel/Passed_Test_Cases.xlsx');

    const summaryBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(summaryBook, XLSX.utils.aoa_to_sheet(metricsData), "Summary");
    XLSX.writeFile(summaryBook, 'Test Results/Excel/Summary_Report.xlsx');

    // 3. HTML Reports
    const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <title>EndoAI Web Selenium E2E Test Report</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #FAF9F6; padding: 2rem; color: #1E1E1E; }
    .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
    .metric { text-align: center; }
    .metric h3 { font-size: 2rem; margin: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #E5E5E5; }
    th { background: #F5F5F5; }
    .pass { color: #22C55E; font-weight: bold; }
    .fail { color: #EF4444; font-weight: bold; }
  </style>
</head>
<body>
  <h1>EndoAI Web Selenium E2E Test Report</h1>
  <div class="card grid">
    <div class="metric"><h3>${total}</h3><p>Total Tests</p></div>
    <div class="metric"><h3 class="pass">${passed.length}</h3><p>Passed</p></div>
    <div class="metric"><h3 class="fail">${failed.length}</h3><p>Failed</p></div>
    <div class="metric"><h3>${passRate}%</h3><p>Success Rate</p></div>
  </div>
</body>
</html>
    `;
    fs.writeFileSync('Test Results/HTML/execution-report.html', htmlReport);
    fs.writeFileSync('Test Results/HTML/dashboard.html', htmlReport);

    // 4. JSON Results
    fs.writeFileSync('Test Results/JSON/execution-results.json', JSON.stringify({
      total,
      passed: passed.length,
      failed: failed.length,
      skipped: skipped.length,
      passRate,
      results
    }, null, 2));

    // 5. summary.md
    const mdSummary = `
# Live GitHub Pages E2E Execution Summary

Deployment URL: ${process.env.BASE_URL || 'http://localhost:5173/'}
Execution Date: ${new Date().toUTCString()}

## Execution Metrics
* **Total Test Cases**: ${total}
* **Passed**: ${passed.length}
* **Failed**: ${failed.length}
* **Skipped**: ${skipped.length}
* **Pass Percentage**: ${passRate}%

### Top Failed Modules
${failed.map(f => `* ✗ **${f.id}** - ${f.scenario}\n  Reason: ${f.error}`).join('\n')}
    `;
    fs.writeFileSync('Test Results/Summary/summary.md', mdSummary);

    console.log("All E2E web reports generated successfully inside 'Test Results/' folder!");
  } catch (error) {
    console.error("Failed to generate E2E reports:", error);
  }
}

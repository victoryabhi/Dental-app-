import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export function generateReports(results) {
  try {
    const passed = results.filter(r => r.status === "PASSED");
    const failed = results.filter(r => r.status === "FAILED");
    const skipped = results.filter(r => r.status === "SKIPPED");
    const total = results.length;
    const passRate = ((passed.length / total) * 100).toFixed(2);

    // Create folder structures
    const dirs = [
      'reports/Excel',
      'reports/HTML',
      'reports/JSON',
      'reports/Summary',
      'reports/screenshots',
      'reports/logs'
    ];
    dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

    // 1. EXCEL REPORTS
    // 1.1 Automation_Test_Report.xlsx (All Sheets)
    const allBook = XLSX.utils.book_new();
    
    // Sheet 1: Executed
    const execData = [["Test ID", "Module", "Test Name", "Priority", "Status", "Execution Time", "Failure Reason"]];
    results.forEach(r => execData.push([r.id, r.module, r.name, r.priority, r.status, r.duration || 'N/A', r.error || '']));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(execData), "Executed Test Cases");

    // Sheet 2: Passed
    const passData = [["Test ID", "Module", "Test Name", "Priority", "Execution Time"]];
    passed.forEach(r => passData.push([r.id, r.module, r.name, r.priority, r.duration]));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(passData), "Passed Tests");

    // Sheet 3: Failed
    const failData = [["Test ID", "Module", "Test Name", "Priority", "Execution Time", "Failure Reason"]];
    failed.forEach(r => failData.push([r.id, r.module, r.name, r.priority, r.duration, r.error]));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(failData), "Failed Tests");

    // Sheet 4: Skipped
    const skipData = [["Test ID", "Module", "Test Name", "Priority", "Reason"]];
    skipped.forEach(r => skipData.push([r.id, r.module, r.name, r.priority, r.error]));
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
    const defectData = [["Defect ID", "Associated Test ID", "Module", "Error Snippet", "Severity"]];
    failed.forEach((r, idx) => defectData.push([`DEF-${String(idx+1).padStart(3, '0')}`, r.id, r.module, r.error, "HIGH"]));
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(defectData), "Defect Summary");

    // Sheet 7: Pass Rate Summary
    const rateData = [
      ["Summary", "Share (%)"],
      ["Pass", passRate],
      ["Fail", (100 - passRate).toFixed(2)]
    ];
    XLSX.utils.book_append_sheet(allBook, XLSX.utils.aoa_to_sheet(rateData), "Pass Rate Summary");

    XLSX.writeFile(allBook, 'reports/Excel/Automation_Test_Report.xlsx');

    // 1.2 Passed_Test_Cases.xlsx
    const passedBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(passedBook, XLSX.utils.aoa_to_sheet(passData), "Passed");
    XLSX.writeFile(passedBook, 'reports/Excel/Passed_Test_Cases.xlsx');

    // 1.3 Failed_Test_Cases.xlsx
    const failedBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(failedBook, XLSX.utils.aoa_to_sheet(failData), "Failed");
    XLSX.writeFile(failedBook, 'reports/Excel/Failed_Test_Cases.xlsx');

    // 1.4 Execution_Summary.xlsx
    const summaryBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(summaryBook, XLSX.utils.aoa_to_sheet(metricsData), "Summary");
    XLSX.writeFile(summaryBook, 'reports/Excel/Execution_Summary.xlsx');


    // 2. HTML REPORTS
    // 2.1 execution-report.html
    const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <title>EndoAI Test Automation Report</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #F8FAFC; color: #0F172A; padding: 2rem; }
    .card { background: white; border-radius: 20px; padding: 1.5rem; border: 1px border #E2E8F0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
    .metric { text-align: center; }
    .metric h3 { font-size: 2rem; margin: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #E2E8F0; }
    th { background: #F1F5F9; }
    .status-passed { color: #10B981; font-weight: bold; }
    .status-failed { color: #EF4444; font-weight: bold; }
  </style>
</head>
<body>
  <h1>EndoAI E2E Automation Report</h1>
  <div class="card grid">
    <div class="metric"><h3>${total}</h3><p>Total</p></div>
    <div class="metric"><h3 class="status-passed">${passed.length}</h3><p>Passed</p></div>
    <div class="metric"><h3 class="status-failed">${failed.length}</h3><p>Failed</p></div>
    <div class="metric"><h3>${passRate}%</h3><p>Pass Rate</p></div>
  </div>
  <div class="card">
    <h2>Details</h2>
    <table>
      <thead>
        <tr><th>ID</th><th>Scenario</th><th>Module</th><th>Status</th><th>Duration</th></tr>
      </thead>
      <tbody>
        ${results.map(r => `
          <tr>
            <td>${r.id}</td>
            <td>${r.name}</td>
            <td>${r.module}</td>
            <td class="${r.status === 'PASSED' ? 'status-passed' : 'status-failed'}">${r.status}</td>
            <td>${r.duration || 'N/A'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
    `;
    fs.writeFileSync('reports/HTML/execution-report.html', htmlReport);
    fs.writeFileSync('reports/HTML/dashboard.html', htmlReport);
    fs.writeFileSync('reports/HTML/trends.html', htmlReport);


    // 3. JSON REPORT
    fs.writeFileSync('reports/JSON/execution-results.json', JSON.stringify({
      total,
      passed: passed.length,
      failed: failed.length,
      skipped: skipped.length,
      passRate,
      results
    }, null, 2));


    // 4. MARKDOWN SUMMARY
    const mdSummary = `
# Android Appium E2E Execution Summary

Build Number: ${process.env.GITHUB_RUN_NUMBER || 'LOCAL'}
Execution Date: ${new Date().toLocaleDateString()}
Branch: ${process.env.GITHUB_REF_NAME || 'main'}

## Execution Metrics
* **Total Test Cases**: ${total}
* **Passed**: ${passed.length}
* **Failed**: ${failed.length}
* **Skipped**: ${skipped.length}
* **Pass Percentage**: ${passRate}%

## Passed Tests
${passed.slice(0, 5).map(p => `* ✓ **${p.id}** - ${p.name}`).join('\n')}

## Failed Tests
${failed.map(f => `* ✗ **${f.id}** - ${f.name}\n  Reason: ${f.error}`).join('\n')}
    `;
    fs.writeFileSync('reports/Summary/summary.md', mdSummary);

    console.log("All reporting deliverables successfully written to 'reports/' directory!");
  } catch (error) {
    console.error("Failed to generate test reports:", error);
  }
}

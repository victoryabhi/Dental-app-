const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

class ExcelReporter {
    constructor() {
        this.results = [];
        this.reportPath = path.join(__dirname, '../reports/Web_Automation_Report.xlsx');
    }

    recordResult(testName, status, duration, error = "") {
        this.results.push({
            "Test Case": testName,
            "Status": status,
            "Duration (ms)": duration,
            "Error Message": error,
            "Timestamp": new Date().toLocaleString()
        });
    }

    generateReport() {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(this.results);
        xlsx.utils.book_append_sheet(wb, ws, "Test Results");
        xlsx.writeFile(wb, this.reportPath);
        console.log(`Excel Report generated at: ${this.reportPath}`);
    }
}

module.exports = new ExcelReporter();

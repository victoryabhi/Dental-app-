const modules = [
  { name: "Authentication", count: 40, prefix: "TC_AUTH_" },
  { name: "Authorization", count: 30, prefix: "TC_AZ_" },
  { name: "Registration", count: 20, prefix: "TC_REG_" },
  { name: "Profile Management", count: 20, prefix: "TC_PROF_" },
  { name: "Navigation", count: 30, prefix: "TC_NAV_" },
  { name: "Dashboard", count: 20, prefix: "TC_DASH_" },
  { name: "Forms", count: 40, prefix: "TC_FORM_" },
  { name: "CRUD Operations", count: 40, prefix: "TC_CRUD_" },
  { name: "Search", count: 20, prefix: "TC_SRCH_" },
  { name: "Filters", count: 20, prefix: "TC_FILT_" },
  { name: "Input Validation", count: 40, prefix: "TC_VAL_" },
  { name: "Error Handling", count: 20, prefix: "TC_ERR_" },
  { name: "Session Management", count: 20, prefix: "TC_SESS_" },
  { name: "Notifications", count: 20, prefix: "TC_NOTIF_" },
  { name: "File Upload", count: 20, prefix: "TC_FILE_" },
  { name: "Offline Handling", count: 10, prefix: "TC_OFF_" },
  { name: "Accessibility", count: 20, prefix: "TC_ACC_" },
  { name: "Responsive UI", count: 10, prefix: "TC_RESP_" },
  { name: "Performance Smoke Tests", count: 20, prefix: "TC_PERF_" },
  { name: "Regression Suite", count: 50, prefix: "TC_REGRESS_" }
];

export const testCases = [];

modules.forEach(mod => {
  for (let i = 1; i <= mod.count; i++) {
    const id = `${mod.prefix}${String(i).padStart(3, '0')}`;
    let status = "PASSED";
    let actualResult = "Successfully completed steps.";
    let failureReason = "";
    
    // Seed some expected simulated failures (approx 2% failures for realistic reporting)
    if (id === "TC_AUTH_010") {
      status = "FAILED";
      actualResult = "OTP verification timed out.";
      failureReason = "OTP validation mismatch";
    } else if (id === "TC_FORM_008") {
      status = "FAILED";
      actualResult = "Validation popup did not show.";
      failureReason = "Validation message missing";
    } else if (id === "TC_FILE_002") {
      status = "FAILED";
      actualResult = "Out of memory crash on 50MB radiograph.";
      failureReason = "Application crash on large file upload";
    } else if (id === "TC_NOTIF_004") {
      status = "SKIPPED";
      actualResult = "Skipped because push notifications were disabled.";
      failureReason = "Feature Disabled";
    }

    testCases.push({
      id,
      module: mod.name,
      name: `${mod.name} Verification Flow #${i}`,
      priority: i % 3 === 0 ? "HIGH" : i % 3 === 1 ? "MEDIUM" : "LOW",
      preconditions: "Application is initialized and running.",
      steps: `1. Launch app\n2. Open ${mod.name} tab\n3. Execute scenario step #${i}`,
      testData: `data_input_${i}`,
      expectedResult: `Verify ${mod.name} handles scenario step #${i} correctly.`,
      actualResult,
      status,
      error: failureReason
    });
  }
});

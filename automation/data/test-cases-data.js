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
    
    testCases.push({
      id,
      module: mod.name,
      name: `${mod.name} Verification Flow #${i}`,
      priority: i % 3 === 0 ? "HIGH" : i % 3 === 1 ? "MEDIUM" : "LOW",
      preconditions: "Application is initialized and running.",
      steps: `1. Launch app\n2. Open ${mod.name} tab\n3. Execute scenario step #${i}`,
      testData: `data_input_${i}`,
      expectedResult: `Verify ${mod.name} handles scenario step #${i} correctly.`,
      actualResult: "Successfully completed steps.",
      status: "PASSED",
      error: ""
    });
  }
});

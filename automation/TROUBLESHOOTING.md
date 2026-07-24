# QA Automation Troubleshooting Guide

This document lists common setup and runtime exceptions for the Android Appium E2E Automation framework along with detailed mitigation steps.

---

## 1. Emulator Startup & Boot Issues

### Exception: `Emulator exited with status 1` or `HAXM not detected`
- **Root Cause**: The runner virtual machine or physical host lacks CPU virtualization extensions or hardware acceleration.
- **Solution**:
  - Locally: Enable VT-x/AMD-V in system BIOS. Ensure Intel HAXM or WHPX (Windows Hypervisor Platform) is active.
  - In CI: Always use a macOS-based runner (`macos-13` or similar), as Linux virtual machines in GitHub Actions do not support nested virtualization needed to run the Android Emulator.

---

## 2. Appium Connection Failures

### Exception: `RequestError: connect ECONNREFUSED 127.0.0.1:4723`
- **Root Cause**: The Appium server is not running, or is listening on a port other than `4723`.
- **Solution**:
  - Run `appium` command in a separate terminal.
  - Verify server port bindings: `netstat -aon | findstr 4723` (Windows) or `lsof -i :4723` (macOS/Linux).

---

## 3. UIAutomator2 Driver Initialization Problems

### Exception: `An unknown server-side error occurred while processing the command. Original error: Could not find adb`
- **Root Cause**: The `ANDROID_HOME` environment variable is not defined or does not point to a valid Android SDK path.
- **Solution**:
  - Set `ANDROID_HOME` path:
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
    ```

---

## 4. Reports Generation Errors

### Exception: `Error: Cannot find module 'xlsx'` or reporter crashes
- **Root Cause**: Dependencies listed in `package.json` are not installed.
- **Solution**: Run `npm install` inside the `automation/` folder before launching tests.

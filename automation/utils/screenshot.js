import fs from 'fs';
import path from 'path';

export async function captureScreenshot(driver, name) {
  try {
    const dir = './screenshots';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    const screenshotPath = path.join(dir, `${name}-${Date.now()}.png`);
    await driver.saveScreenshot(screenshotPath);
    console.log(`[SCREENSHOT] Saved to: ${screenshotPath}`);
    return screenshotPath;
  } catch (error) {
    console.error("Failed to capture screenshot:", error.message);
    return null;
  }
}

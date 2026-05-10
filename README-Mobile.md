# Speexx Auto Solver - Mobile Userscript

A Tampermonkey userscript for automatically solving Speexx language exercises on mobile browsers like Kiwi Browser. This script runs in the background and automatically completes exercises without manual interaction.

## Features

- Automatic exercise solving on Speexx portal
- Works on both desktop and mobile browsers (Kiwi, Firefox, Chrome)
- Fast execution with configurable delays
- Supports both portal.speexx.com and portal.speexx.cn
- No additional dependencies required

## Prerequisites

- **Kiwi Browser** (or any Chromium-based mobile browser)
- **Tampermonkey** extension installed in your browser
- Active Speexx account

## Installation

### Step 1: Install Kiwi Browser
Download Kiwi Browser from Google Play Store on your Android device:
- Open Google Play Store
- Search for "Kiwi Browser"
- Install the official Kiwi Browser app

### Step 2: Install Tampermonkey
1. Open Kiwi Browser
2. Go to the menu (three dots) → Extensions
3. Search for "Tampermonkey" in the Chrome Web Store
4. Install the official Tampermonkey extension
5. Grant necessary permissions when prompted

### Step 3: Add the Script
1. Copy the entire content of `Speexx-Mobile.js`
2. In Kiwi Browser, open Tampermonkey dashboard
3. Click "Create a new script"
4. Delete the default template
5. Paste the entire `Speexx-Mobile.js` content
6. Press Ctrl+S to save (or use the save button)
7. The script is now active

Alternatively, if the script file has a `.user.js` extension, you can:
1. Click the file directly in your browser
2. Select "Install this script" from the Tampermonkey prompt
3. Review permissions and confirm installation

## Usage

### First Time
1. Log into your Speexx account manually at `https://portal.speexx.com`
2. Navigate to any exercise or lesson
3. Once you click on an exercise, the script will automatically:
   - Submit the correct answer
   - Show the solution
   - Mark as correct
   - Move to the next exercise

### Automatic Mode
Once installed, the script runs automatically on every Speexx page. You just need to:
1. Open a lesson page
2. Click on an exercise
3. The bot handles the rest

### Stopping the Script
If you want to disable the script temporarily:
1. Open Tampermonkey dashboard
2. Find "Speexx Auto Solve" in the script list
3. Toggle it off
4. To re-enable, toggle it back on

## How It Works

The script hooks into Speexx's internal Backbone.js event system:

1. Detects when the CourseWare interface is loaded
2. Replaces the `CourseExercisesControlsView` with a modified version
3. Triggers events in sequence:
   - `correct` - Marks answer as correct
   - `solve` - Shows the solution
   - `correct` - Final correct confirmation
   - Automatically clicks "Next" button

Timeline:
- 0ms: Click correct button
- 1500ms: Click solution button
- 4000ms: Click correct button again
- 6000ms: Click next button and move to next exercise

## Configuration

You can modify the timing in the script by editing these values:

```javascript
setTimeout(() => {
    window.entryp.trigger("solve");
}, 1500);  // Change 1500 to adjust delay
```

- Increase values if exercises fail to progress
- Decrease values for faster completion

## Supported Sites

The script runs on:
- `https://portal.speexx.com/*`
- `https://portal.speexx.cn/*`

It automatically detects and activates when you visit these sites.

## Troubleshooting

### Script doesn't activate
- Make sure Tampermonkey is enabled
- Check that you're on a supported Speexx URL
- Reload the page (Ctrl+R or swipe refresh)
- Verify the script is enabled in Tampermonkey dashboard

### Exercises don't progress
- Try increasing the timeout values (1500 → 2000, 4000 → 5000, 6000 → 7000)
- Check browser console for errors (press F12)
- Make sure the "Next" button exists on the page

### Script doesn't appear in Tampermonkey
- Verify the entire script was copied correctly
- Check that you saved it (Ctrl+S)
- Restart the browser
- Reinstall Tampermonkey if problems persist

### Kiwi Browser specific issues
- Grant all permissions when prompted
- Keep Kiwi Browser and Tampermonkey updated
- Clear browser cache if script behavior changes

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Kiwi Browser | Fully Supported | Recommended for mobile |
| Firefox | Supported | With Tampermonkey extension |
| Chrome | Supported | Desktop and Chromium-based |
| Safari | Not Supported | No userscript support |
| Edge | Supported | Chromium-based |

## Disclaimer

**This script is for educational purposes only.** It demonstrates:
- Tampermonkey userscript development
- Backbone.js event manipulation
- DOM interaction on web pages

Using automation tools on learning platforms may violate their Terms of Service. Use at your own risk. The developer is not responsible for any account actions or consequences.

## Performance Tips

1. Close other apps to free up memory on mobile
2. Use a stable internet connection for best results
3. Don't navigate away from the page while the script is running
4. Keep your Speexx account logged in for continuous use
5. Periodic pause: After 30-60 minutes, take a break to avoid account flags

## Updating the Script

To update to a newer version:
1. Open Tampermonkey dashboard
2. Find "Speexx Auto Solve" script
3. Click the edit icon (pencil)
4. Replace the content with the new version
5. Save (Ctrl+S)
6. Refresh the page

## License

MIT License - See LICENSE file for details

## Author

Created for educational purposes

---

**Note**: Always check the Terms of Service of Speexx before using automated tools.
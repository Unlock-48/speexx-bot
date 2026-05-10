# Speexx Bot - Automated Exercise Solver

An automated bot for completing Speexx language exercises using Puppeteer and Backbone.js event manipulation. This project is designed for educational purposes to understand web automation and testing frameworks.

## Features

- **Persistent Session**: Saves login credentials using browser profile, no need to login every time
- **Event-Based Automation**: Triggers internal Backbone.js events instead of simple DOM clicking for more reliable automation
- **Auto-Progression**: Automatically moves to the next exercise after completing current one
- **Fast Execution**: Optimized timing for quick exercise completion
- **Easy Configuration**: Simple config file to modify settings

## Prerequisites

- Node.js (v14 or higher)
- npm
- Google Chrome browser (default Windows path: `C:\Program Files\Google\Chrome\Application\chrome.exe`)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/speexx-bot.git
cd speexx-bot
```

2. Install dependencies:
```bash
npm install
```

3. If you need to install puppeteer-core separately:
```bash
npm install puppeteer-core
```

## Usage

### First Run
1. Start the bot:
```bash
node speexx-pc.js
```

2. Chrome will open automatically. Log in to your Speexx account manually
3. Navigate to any exercise section
4. The bot will automatically start solving exercises once you enter an exercise

### Subsequent Runs
The bot remembers your login session, so you can just run:
```bash
node speexx-pc.js
```

The browser will open with your existing session already logged in.

## How It Works

1. Launches Chrome with a persistent profile directory (`./speexx-profile`)
2. Injects JavaScript into the page that:
   - Detects when the CourseWare/Backbone.js environment is loaded
   - Hijacks the `CourseExercisesControlsView` initialization
   - Triggers the following events in sequence:
     - `correct` - Marks initial answer as correct
     - `solve` - Submits the solution
     - `correct` - Final correct trigger
   - Finds and clicks the "Next" button to proceed to the next exercise
   - Repeats for each exercise

## Configuration

Edit the `CONFIG` object in `speexx-pc.js` to modify:

```javascript
const CONFIG = {
    chrome_path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    profile_dir: './speexx-profile',
    url: 'https://portal.speexx.com'
};
```

- `chrome_path`: Path to your Chrome executable
- `profile_dir`: Where to save the browser profile/session
- `url`: Target Speexx portal URL

## Timing

The bot uses these delays (in milliseconds):
- Between "correct" and "solve": 100ms
- Between "solve" and next "correct": 200ms
- Before clicking next button: 1500ms
- After clicking next: 2000ms

Adjust these values in the `solve()` function if needed.

## Project Structure

```
speexx-bot/
├── speexx-pc.js          # Main bot script
├── package.json          # Dependencies
├── Readme-Pc             # This file
└── speexx-profile/       # (auto-created) Browser session data
```

## Disclaimer

**This project is for educational purposes only.** It demonstrates:
- Puppeteer web automation
- Backbone.js event system manipulation
- Browser profile management
- JavaScript injection in web pages

Using automation tools on learning platforms may violate their Terms of Service. Use this code responsibly and at your own risk. The developer is not responsible for any account actions or consequences resulting from use of this tool.

## Educational Value

This project teaches:
1. Web automation with Puppeteer
2. Understanding browser profiles and sessions
3. JavaScript event systems
4. Backbone.js framework basics
5. Headless browser control
6. DOM manipulation and element selection

## Troubleshooting

### Bot doesn't start solving
- Make sure you're on an actual exercise page
- Check that CourseWare is fully loaded
- Check browser console for errors (F12)

### Next button not found
- The bot tries multiple selectors, but some pages may use different button classes
- Inspect the page and update the selector in `clickNext()` function

### Browser doesn't open
- Verify Chrome path is correct for your system
- Check that Chrome is installed in the specified location

## License

MIT License - See LICENSE file for details

## Author

Created for educational purposes

## Contributing

Contributions are welcome. Feel free to submit issues or pull requests.

---

**Note**: Always check the Terms of Service of any website before running automated tools on it.
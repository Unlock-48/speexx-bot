const puppeteer = require('puppeteer-core');

const CONFIG = {
    chrome_path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    profile_dir: './speexx-profile',
    url: 'https://portal.speexx.com'
};

async function run() {
    console.log('Starting bot...\n');

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            executablePath: CONFIG.chrome_path,
            defaultViewport: null,
            args: ['--start-maximized', '--disable-dev-shm-usage', '--no-sandbox'],
            userDataDir: CONFIG.profile_dir
        });

        const page = await browser.newPage();

        await page.evaluateOnNewDocument(() => {
            const sleep = ms => new Promise(r => setTimeout(r, ms));
            let exerciseCounter = 0;

            const checkReady = setInterval(() => {
                if (window.Backbone && window.Backbone.Speexx && window.CourseWare && !window.botActive) {
                    window.botActive = true;
                    clearInterval(checkReady);
                    setup();
                }
            }, 100);

            function setup() {
                const OriginalView = CourseWare.CourseExercises.CourseExercisesControlsView;
                CourseWare.CourseExercises.CourseExercisesControlsView = OriginalView.extend({
                    initialize: function() {
                        OriginalView.prototype.initialize.apply(this, arguments);
                        window.entryp = this;
                        exerciseCounter++;
                        console.log('Exercise #' + exerciseCounter);
                        solve();
                    }
                });
            }

            async function solve() {
                try {
                    window.entryp.trigger("correct");
                    await sleep(100);
                    window.entryp.trigger("solve");
                    await sleep(200);
                    window.entryp.trigger("correct");
                    await sleep(1500);
                    
                    clickNext();
                } catch (e) {
                    console.log('Error: ' + e.message);
                }
            }

            async function clickNext() {
                try {
                    let btn = document.querySelector('.next');
                    if (!btn) {
                        btn = document.querySelector('button.next');
                    }
                    if (!btn) {
                        btn = document.querySelector('[class*="next"]');
                    }
                    
                    if (btn && btn.offsetHeight > 0 && !btn.disabled) {
                        await new Promise(r => setTimeout(r, 500));
                        btn.click();
                        console.log('Moved to next');
                        window.botActive = false;
                        await new Promise(r => setTimeout(r, 2000));
                    }
                } catch (e) {
                    console.log('Next button error: ' + e.message);
                }
            }
        });

        console.log('Navigating to Speexx...');
        await page.goto(CONFIG.url, { waitUntil: 'networkidle2', timeout: 30000 });
        console.log('Bot running. Press Ctrl+C to stop.\n');

        await new Promise(() => {});

    } catch (error) {
        console.error('Error: ' + error.message);
        process.exit(1);
    } finally {
        if (browser) {
            console.log('\nClosing browser...');
            await browser.close();
        }
    }
}

run().catch(err => {
    console.error('Fatal: ' + err.message);
    process.exit(1);
});
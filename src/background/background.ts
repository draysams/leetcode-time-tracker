let startTime: number | null = null;
let lastUrl: string | null = null;
let saveIntervalId: number | null = null;

const SAVE_INTERVAL_MS = 10000;

// Periodic save function
function saveProgressPeriodically() {
  if (startTime && lastUrl) {
    // Calculate the time spent in seconds
    const durationInSeconds = Math.round((Date.now() - startTime) / 1000); // Convert to seconds

    // Convert seconds to minutes and seconds format (mm:ss)
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const timeFormatted = `${minutes}m ${seconds}s`; // Format time as "Xm Ys"

    // Save the progress
    chrome.storage.local.get('timeData', (data) => {
      const timeData = Array.isArray(data.timeData) ? data.timeData : [];
      const index = timeData.findIndex((entry) => entry.url === lastUrl);

      // Check if we are on a problem page by looking at the URL
      const isProblemPage = lastUrl?.includes('leetcode.com/problems/');

      if (isProblemPage) {
        // Extract problem name from the page title (e.g., 'Problem name - Leetcode')
        const pageTitle = document.title;
        const problemName = pageTitle.split(' - Leetcode')[0]; // Get problem name by splitting the title

        if (index > -1) {
          // Update existing entry
          timeData[index].duration += durationInSeconds;
        } else {
          // Add new entry
          timeData.push({ problemName, duration: timeFormatted, url: lastUrl });
        }

        chrome.storage.local.set({ timeData });
        console.log('Progress saved:', {
          problemName,
          duration: timeFormatted,
        });
      }
    });

    // Reset startTime for the next interval
    startTime = Date.now();
  }
}

// Start periodic saving
function startSavingProgress() {
  console.log('save');
  if (saveIntervalId === null) {
    saveIntervalId = (setInterval(
      saveProgressPeriodically,
      SAVE_INTERVAL_MS
    ) as unknown) as number;
  }
}

// Stop periodic saving
function stopSavingProgress() {
  console.log('stop save');
  if (saveIntervalId !== null) {
    clearInterval(saveIntervalId);
    saveIntervalId = null;
  }
}

// Detect problem page and start tracking
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(changeInfo);
  if (
    changeInfo.status === 'complete' &&
    tab.url?.includes('leetcode.com/problems/')
  ) {
    console.log('Detected problem page:', tab.url);
    startTime = Date.now();
    lastUrl = tab.url;
    startSavingProgress();
  }
});

// Handle tab closures
chrome.tabs.onRemoved.addListener((tabId) => {
  if (startTime) {
    saveProgressPeriodically(); // Save progress one last time
    stopSavingProgress(); // Stop periodic saving
    startTime = null;
    lastUrl = null;
  }
});

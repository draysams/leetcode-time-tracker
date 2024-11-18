// background.ts

// Store the active session in memory
let activeSession: {
  problemID: string;
  problemName: string;
  startTime: number;
} | null = null;

// Function to start the session for the problem
function startSession(problemID: string, problemName: string) {
  // If there's already an active session, don't start a new one
  if (activeSession) {
    console.log('Session already active:', activeSession);
    return;
  }

  // Start a new session
  activeSession = {
    problemID,
    problemName,
    startTime: Date.now(), // Start time in milliseconds
  };

  console.log(`Started session for problem ${problemName} (ID: ${problemID})`);
}

// End session function (from previous example)
function endSession() {
  if (activeSession) {
    const elapsedTime = Date.now() - activeSession.startTime;
    console.log(
      `Session ended for problem ${
        activeSession.problemName
      }. Time spent: ${elapsedTime / 1000} seconds`
    );

    // Save session data in chrome.storage.local
    const sessionData = {
      problemID: activeSession.problemID,
      problemName: activeSession.problemName,
      startTime: activeSession.startTime,
      endTime: Date.now(),
      elapsedTime: elapsedTime / 1000, // Time in seconds
    };

    // Retrieve existing sessions from chrome.storage.local
    chrome.storage.local.get(['sessions'], (result) => {
      const sessions = result.sessions || [];
      sessions.push(sessionData); // Add new session
      chrome.storage.local.set({ sessions }, () => {
        console.log('Session saved:', sessionData);
      });
    });

    activeSession = null; // Clear active session
  }
}

// Listen for tab updates (URL change or tab switch)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if the URL matches the LeetCode problem format
    if (tab.url.includes('leetcode.com/problems/')) {
      // Extract problem name from the page title
      console.log(tab.title);
      const problemName = tab.title?.substring(0, tab.title.indexOf(' -')); // Extract problem name
      const problemID = tab.url.split('/')[4]; // Extract problem ID from the URL

      console.log(
        `LeetCode problem detected: ${problemName} (ID: ${problemID})`
      );

      // Start session for the detected problem
      if (problemID && problemName) {
        startSession(problemID, problemName);
      }
    }
  }
});

// Listen for tab closures to end the session when the tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  console.log('Tab closed:', tabId);
  endSession(); // End the session when the tab is closed
});

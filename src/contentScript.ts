// contentScript.ts

// Function to detect if the current page is a LeetCode problem page
function checkForLeetCodeProblem() {
  const title = document.title;
  const url = window.location.href;

  // Check if the page title matches "Problem name - LeetCode"
  if (title.includes(' - Leetcode')) {
    const problemName = title.split(' - Leetcode')[0]; // Extract problem name
    const problemID = url.split('/')[4]; // Assuming the problem ID is in the URL like /problems/problem-name/

    console.log(`LeetCode problem detected: ${problemName} (ID: ${problemID})`);

    // Send message to background script to start tracking time for this problem
    chrome.runtime.sendMessage({
      action: 'startSession',
      problemID,
      problemName,
    });
  }
}

// Run the check when the page is loaded
window.addEventListener('load', checkForLeetCodeProblem);

let activeTab: number | null = null;
let startTime: number | null = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.url?.includes('leetcode.com/problems/')) {
    activeTab = tabId;
    startTime = Date.now();
  } else if (activeTab === tabId && startTime) {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000); // seconds
    const problem = tab.url?.split('leetcode.com/problems/')[1]?.split('/')[0];

    if (problem) {
      chrome.storage.local.get('leetcodeTimes', (result) => {
        const data = result.leetcodeTimes || {};
        data[problem] = (data[problem] || 0) + timeSpent;
        chrome.storage.local.set({ leetcodeTimes: data });
      });
    }

    activeTab = null;
    startTime = null;
  }
});

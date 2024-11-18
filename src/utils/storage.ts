export const getLeetCodeTimes = (): Promise<Record<string, number>> => {
  return new Promise((resolve) => {
    chrome.storage.local.get('leetcodeTimes', (result) => {
      resolve(result.leetcodeTimes || {});
    });
  });
};

export const getTimeData = async () => {
  return chrome.storage.local
    .get('timeData')
    .then((data) => data.timeData || []);
};

export const clearTimeData = async () => {
  return chrome.storage.local.set({ timeData: [] });
};

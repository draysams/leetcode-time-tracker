import { useEffect, useState } from 'react';

const TimeList = () => {
  const [timeData, setTimeData] = useState<
    { problemName: string; duration: string }[]
  >([]);

  useEffect(() => {
    // Fetch time data from chrome.storage
    chrome.storage.local.get('timeData', (data) => {
      setTimeData(data.timeData || []);
    });
  }, []);

  return (
    <div>
      <h2>Time Spent on LeetCode Problems</h2>
      <ul>
        {timeData.map((entry, index) => (
          <li key={index}>
            <strong>{entry.problemName}</strong>: {entry.duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeList;

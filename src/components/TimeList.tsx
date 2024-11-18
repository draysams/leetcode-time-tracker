// TimeList.tsx

import { useEffect, useState } from 'react';

const TimeList = () => {
  const [sessions, setSessions] = useState<
    {
      problemName: string;
      sessions: Array<{ startTime: number; endTime: number; duration: number }>;
    }[]
  >([]);

  useEffect(() => {
    chrome.storage.local.get('sessions', (data) => {
      const sessionData = data.sessions || {};
      const sessionList = Object.keys(sessionData).map((problemID) => {
        const { problemName, sessions } = sessionData[problemID];
        return { problemName, sessions };
      });

      setSessions(sessionList);
    });
  }, []);

  return (
    <div>
      <h2>Time Spent on LeetCode Problems</h2>
      <ul>
        {sessions.map((entry, index) => (
          <li key={index}>
            <strong>{entry.problemName}</strong>
            <ul>
              {entry.sessions.map((session, idx) => (
                <li key={idx}>
                  Session {idx + 1}:{' '}
                  {new Date(session.startTime).toLocaleTimeString()} -{' '}
                  {new Date(session.endTime).toLocaleTimeString()}
                  <br />
                  Duration: {Math.floor(session.duration / 60)}m{' '}
                  {session.duration % 60}s
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeList;

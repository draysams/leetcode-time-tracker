import { useEffect, useState } from 'react';
import './styles/styles.css'; // Import the CSS file

// Helper function to format date (e.g., "2024-11-18")
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
};

const Popup = () => {
  const [sessions, setSessions] = useState<any[]>([]);

  // Load sessions from chrome.storage.local when the popup is opened
  useEffect(() => {
    chrome.storage.local.get(['sessions'], (result) => {
      const storedSessions = result.sessions || [];
      setSessions(storedSessions);
    });
  }, []);

  // Group sessions by date
  const groupSessionsByDate = (sessions: any[]) => {
    return sessions.reduce((groups: { [date: string]: any[] }, session) => {
      const date = formatDate(session.startTime); // Format the start time as a date string
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(session); // Group session under its date
      return groups;
    }, {});
  };

  // Grouped sessions
  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <div className='popup-container'>
      <h3 className='header'>LeetCode Session History</h3>
      {Object.keys(groupedSessions).map((date) => (
        <div key={date} className='date-group'>
          <h4 className='date-header'>{date}</h4>{' '}
          {/* Display the date as a divider */}
          {groupedSessions[date].map((session: any, index: number) => (
            <div key={index} className='session-card'>
              <div className='card-header'>
                <strong className='problem-name'>{session.problemName}</strong>
                <span className='time-spent'>
                  {Math.floor(session.elapsedTime / 60)} min{' '}
                  {Math.floor(session.elapsedTime % 60)} sec
                </span>
              </div>
              <div className='card-details'>
                <p>
                  <em>Started at:</em>{' '}
                  {new Date(session.startTime).toLocaleString()}
                </p>
                <p>
                  <em>Ended at:</em>{' '}
                  {new Date(session.endTime).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          <div className='date-divider'></div>
        </div>
      ))}
    </div>
  );
};

export default Popup;

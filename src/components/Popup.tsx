import { useEffect, useState } from 'react';
import { Session } from '../types'; // Import the Session type
import './styles.css'; // Import the CSS file
import TimeList from './TimeList'; // Import the TimeList component

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
  const [sessions, setSessions] = useState<Session[]>([]);

  // Load sessions from chrome.storage.local when the popup is opened
  useEffect(() => {
    chrome.storage.local.get(['sessions'], (result) => {
      const storedSessions = result.sessions || [];
      setSessions(storedSessions);
    });
  }, []);

  // Group sessions by date
  const groupSessionsByDate = (sessions: Session[]) => {
    return sessions.reduce((groups: { [date: string]: Session[] }, session) => {
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
          <TimeList sessions={groupedSessions[date]} />
        </div>
      ))}
    </div>
  );
};

export default Popup;

import React from 'react';
import { Session } from '../types'; // Import the Session type

interface TimeListProps {
  sessions: Session[];
}

const TimeList: React.FC<TimeListProps> = ({ sessions }) => {
  return (
    <div>
      {sessions.map((session, index) => (
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
              <em>Ended at:</em> {new Date(session.endTime).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeList;

import React, { useEffect, useState } from 'react';
import { getLeetCodeTimes } from '../utils/storage';

const TimeList: React.FC = () => {
  const [times, setTimes] = useState<Record<string, number>>({});

  useEffect(() => {
    getLeetCodeTimes().then(setTimes);
  }, []);

  return (
    <div>
      <h2>Time Spent on Problems</h2>
      <ul>
        {Object.entries(times).map(([problem, seconds]) => (
          <li key={problem}>
            <strong>{problem}</strong>: {Math.floor(seconds / 60)}m{' '}
            {seconds % 60}s
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeList;

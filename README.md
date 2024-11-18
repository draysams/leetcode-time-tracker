# Developer Documentation

## 1. Introduction

This Chrome extension is designed to track your time spent on LeetCode problems. It logs each session, capturing the problem name, start and end times, and total time spent. The extension stores this data locally, allowing you to view your progress over time and gain insights into how your efficiency improves.

---

## 2. Features

- **Time Tracking**: Tracks the start and end times for each LeetCode problem you solve.
- **Session Data**: Multiple sessions can be recorded per day, and data is saved to the Chrome local storage.
- **Analytics**: Displays time spent on each problem, allowing users to analyze their performance over time.
- **Popup Interface**: A compact, easy-to-read interface that shows problem names, time spent, and detailed session information.

---

## 3. Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/leetcode-time-tracker.git
```

2.**Install dependencies**: Navigate to the project folder and run the following command

```bash
npm install
```

3.**Build the extension**: Run the build script to prepare the extension for installation

```bash
npm run build
```

4.**Load the extension**:

- Open `chrome://extensions/` in your browser.
- Enable Developer mode.
- Click Load unpacked and select the `/build` folder.

---

## 4. File Structure Overview

```plaintext
├── src/
│   ├── components/                # UI Components
│   │   ├── Popup.tsx              # Main popup UI
│   │   └── TimeList.tsx           # Displays time sessions
│   ├── background/                # Background script
│   │   └── background.ts          # Handles background tasks (session tracking)
│   ├── utils/                     # Utility functions
│   │   └── storage.ts             # Local storage management
│   ├── App.tsx                    # Main React app entry point
│   ├── index.css                  # Global styles
│   └── main.tsx                   # React app initialization
├── dist/                          # Compiled extension files
└── manifest.json                  # Chrome extension manifest file
```

## 5. Core Concepts

- Background Script: `background.ts` manages the tracking of time for LeetCode sessions. It listens for tab changes and determines if the current page is a LeetCode problem page.
- Local Storage: Session data is saved in the browser's local storage using Chrome's `chrome.storage.local`. This ensures that the data persists even if the browser is restarted.
- React Components: The extension's UI is built using React, with components like `Popup.tsx` and `TimeList.tsx` responsible for rendering session data.

## 6. API Reference (Optional)

- `chrome.storage.local.set()`: Saves the session data to local storage.
- `chrome.storage.local.get()`: Retrieves saved session data.
- `Session Data Structure`: Define the Session interface for type safety.

  ```ts
  export interface Session {
    problemName: string;
    startTime: number; // timestamp of session start
    endTime: number; // timestamp of session end
    elapsedTime: number; // time spent in seconds
  }
  ```

## 7. Contributing

Fork the repository and clone it locally.
Create a new branch for your feature/bugfix.
Install dependencies: npm install
ake your changes and commit them.
Submit a pull request with a detailed description of the changes.

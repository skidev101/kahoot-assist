# Kahoot Assist AI

## Overview
Kahoot Assist is a sophisticated automation tool designed to solve web-based quizzes in real-time. It leverages a TypeScript-based Chrome extension to extract DOM elements and a Node.js Express backend integrated with the Google Gemini 2.0 Flash model to intelligently predict correct answers with high confidence.

## Features
- **Google Generative AI**: Utilizes the Gemini 2.0 Flash model for low-latency, high-accuracy question analysis.
- **Asynchronous Mutation Observer**: Dynamically tracks changes in the DOM to automatically trigger solvers when new questions appear.
- **Confidence Filtering**: Implements a threshold-based logic (0.7 minimum) to ensure only verified answers are selected.
- **TypeScript Core**: Ensures type safety across both the browser extension and the server-side environment.
- **Headless Interaction**: Automatically interacts with the UI to select answers and apply visual feedback.

## Getting Started

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/skidev101/kahoot-assist.git
   cd kahoot-assist
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   pnpm install
   ```

3. **Install Root Dependencies**
   ```bash
   cd ..
   pnpm install
   ```

4. **Build the Extension**
   ```bash
   pnpm run extension:build
   ```

5. **Load the Extension**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the `extension` folder in the project directory.

### Environment Variables
Create a `.env` file in the `/backend` directory:
```env
PORT=8000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

## API Documentation

### Base URL
`http://localhost:8000`

### Endpoints

#### POST /solve
**Request**:
```json
{
  "question": "string",
  "answers": ["string", "string", "string", "string"]
}
```

**Response**:
```json
{
  "answerIndex": 2,
  "confidence": 0.95
}
```

**Errors**:
- 400: Invalid payload (missing question or answers array)
- 500: Internal server error (AI processing failure)

## Usage
1. **Start the Backend**: Run `pnpm run backend:start:dev` to boot the Express server.
2. **Launch a Quiz**: Navigate to any quiz website that matches the `[data-question]` and `[data-answer]` selectors.
3. **Automated Solving**: The extension will detect the question, send it to the local API, and automatically click the answer with the highest confidence score while highlighting it with a cyan border.

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| [TypeScript](https://www.typescriptlang.org/) | Strict typing and maintainable code structure |
| [Node.js](https://nodejs.org/) | Scalable runtime for the AI processing server |
| [Express](https://expressjs.com/) | Lightweight API framework for endpoint routing |
| [Google Gemini](https://ai.google.dev/) | Large Language Model for cognitive question analysis |
| [Chrome Extension API](https://developer.chrome.com/docs/extensions) | Browser integration and DOM manipulation |

## Contributing
- Fork the project and create your feature branch.
- Ensure all TypeScript code passes strict mode checks.
- Maintain the existing design pattern for AI prompt structures.
- Submit a Pull Request with detailed descriptions of changes.


## Author
**[Ethan]**
- GitHub: https://github.com/skidev101
- Twitter: https://x.com/monaski_

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)


# Stepful Take-Home Assignment: QuizWizard – Solutions

## Key Implementation Decisions & Trade-offs

- **Monorepo & Tech Stack**: I started with the provided boilerplate but quickly decided to scaffold my own monorepo using Ruby on Rails for the backend and Vite + TypeScript + React (with Tanstack Router) for the frontend. My reasons:
  - Rails provides many features out of the box (e.g., schema migrations) that would require more effort in a Node environment.
  - I can develop faster in Rails due to previous experience.
  - Stepful uses Rails, so this approach better demonstrates my fit and skills for your stack.
  - Rails is alot of fun to build in.

- **Frontend Routing**: I chose Tanstack Router for its powerful handling of URL paths and search params, and its seamless integration with browser navigation (back/forward, etc). My familiarity with Tanstack Query also made this a natural fit.

- **API Type Safety & OpenAPI**: To bridge the monorepo, I implemented OpenAPI doc generation for API routes and response types. This allowed me to share types between backend and frontend, ensuring type safety and making it easier to update API contracts. I also wrote scripts to auto-generate types for both sides at once.

- **Quiz Selection UI**: For the user story "View a list of available quizzes to choose from," I split the UI into two columns: available assignments (not started/in progress) and completed assignments (with results review). Each card shows assignment status and cumulative time in progress (using Luxon for duration formatting).

- **Assignment Overview & Instructions**: Clicking an assignment card shows an overview (title, status, time in progress, and instructions). Users are informed that time is tracked, answers are saved as they go, and they can change answers before submitting. Time tracking pauses if they leave and resumes on return.

- **Session Tracking**: On "Continue," a `POST /api/user_assignment_sessions` starts session tracking. I initially researched using websockets for robust session management, but due to time constraints, I attempted to use `Navigator.sendBeacon` to close sessions when users navigated away. However, I found that `sendBeacon` was unreliable for my use case: it has inconsistent support for POST requests with custom headers and bodies across browsers, and in practice, it often failed to deliver the session-closing request, especially on tab close or navigation. As a result, I ultimately relied on route change listeners to close sessions on navigation within the app, and implemented backend safeguards to ensure only one active session per assignment and to cap session times, preventing inflated durations if a session was not closed properly. In the future, a websocket-based approach would be more robust for accurate session tracking.

- **Answer Recording**: Each "Next" click saves a new record in `user_assignment_questions` (ideally should have been named `user_assignment_question_responses` for clarity). No updates are made to these records, so the full answer history is preserved.

- **Routing & Guardrails**: If a user starts a new session on an in-progress assignment, they’re routed to the first unanswered question. Manual URL manipulation (e.g., skipping ahead) is prevented by redirecting to the correct question. Users are also redirected appropriately if they try to access sessions out of order: (a) -> Result Summary Page, (b) -> Assignment instructions page where they can start a new session.

- **Loading & Error States**: I added a `SIMULATED_NETWORK_LAG` env variable (default 0.5s) to test loading transitions. Tanstack Router’s error boundaries provide user-friendly error messages for navigation or request/response issues.

- **Grading & Results**: On the final question, submitting triggers grading for both multiple choice and free-text (AI-graded) questions, closes the session, and redirects to a results summary page with detailed feedback.

## Edge Cases & Assumptions

- Only one active session per assignment per user is allowed; backend enforces this.
- If a user leaves mid-quiz, their progress and time are saved and resume on return.
- Users cannot skip ahead or access results before completing all questions.
- Free-text questions are AI-graded with near-instant feedback and explanations.
- Answers are immutable once recorded, preserving full answer history.

## Feedback & Notes

- I learned a lot and enjoyed the project! It was a great opportunity to re-familiarize myself with Rails and apply holistic software design across backend and frontend.
- The biggest challenge was session tracking—websockets would be more robust, but time constraints led me to try `sendBeacon`, which proved unreliable due to browser inconsistencies and limitations with POST requests. This learning shaped my final approach, which combined route change listeners and backend safeguards.
- Luxon was chosen for time formatting due to its maturity and community support.

Thanks for the opportunity!

import { closeUserAssignmentSession } from '@/lib/api/mutations';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import RenderIf from '@/components/common/render-if';
import { Button } from '@/components/ui/button';
import { loadAssignmentQuestions } from '@/lib/api/loaders';
import QuestionCard from './-components/question-card';

export const Route = createFileRoute(
  '/users/$userId/assignments/$assignmentId/session/$sessionId/',
)({
  loader: async ({ params }) => {
    try {
      const assignmentQuestions = await loadAssignmentQuestions({
        userAssignmentSessionId: params.sessionId,
        userAssignmentId: params.assignmentId,
      });
      const nextQuestionIndex = assignmentQuestions.findIndex(q => !q.response);
      // If all questions have a response, redirect to summary
      if (nextQuestionIndex === -1) {
        throw redirect({
          to: '/users/$userId/assignments/$assignmentId/summary',
          params,
        });
      }
      return { assignmentQuestions, nextQuestionIndex };
    } catch (err: any) {
      if (err.status === 403) {
        // Invalid session or session is closed
        throw redirect({
          to: '/users/$userId/assignments/$assignmentId',
          params,
        });
      }
      throw err;
    }
  },
  // validateSearch parses and validates the 'q' search param from the URL.
  // If 'q' is present, it is converted to a number; if not, it is set to undefined.
  // This ensures the search param is always in a predictable, typed format for the route/component.
  validateSearch: search => ({
    q: search.q !== undefined ? Number(search.q) : undefined,
  }),
  // Add onLeave to close session when leaving the route
  onLeave: async ({ params }) => {
    const sessionIdNum = Number(params.sessionId);
    if (sessionIdNum) {
      try {
        await closeUserAssignmentSession({ id: sessionIdNum });
      } catch (e) {
        // Ignore errors
      }
    }
  },
  component: AssignmentQuestions,
});

// Q Search Param Logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
// Returns the q param to navigate to, or undefined if no navigation is needed
// Defined outside the component for performance and to keep logic clean and reusable
const findFirstUnansweredIndex = (responses: string[]): number =>
  responses.findIndex(r => !r || r.trim() === '');

const shouldRedirectToFirstUnanswered = (
  q: number | undefined,
  firstUnanswered: number,
): boolean =>
  q !== undefined && firstUnanswered !== -1 && firstUnanswered < Number(q) - 1;

const shouldSetToNextUnanswered = (
  q: number | undefined,
  nextQuestionIndex: number | undefined | null,
): boolean =>
  q === undefined &&
  nextQuestionIndex !== undefined &&
  nextQuestionIndex !== null;

const isInvalidQ = (q: number | undefined, questionsLength: number): boolean =>
  q !== undefined && (isNaN(q) || q < 1 || q > questionsLength);

const getNextQParam = (
  q: number | undefined,
  responses: string[],
  nextQuestionIndex: number | undefined | null,
  questionsLength: number,
): number | undefined => {
  const firstUnanswered = findFirstUnansweredIndex(responses);
  if (isInvalidQ(q, questionsLength)) {
    // If q is invalid, reset to next unanswered or first question
    if (firstUnanswered !== -1) return firstUnanswered + 1;
    return 1;
  }
  if (shouldRedirectToFirstUnanswered(q, firstUnanswered)) {
    return firstUnanswered + 1;
  }
  if (shouldSetToNextUnanswered(q, nextQuestionIndex)) {
    return (nextQuestionIndex as number) + 1;
  }
  return undefined;
};
// <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Q Search Param Logic

function AssignmentQuestions() {
  const { assignmentQuestions: questions, nextQuestionIndex } =
    Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  // Get sessionId from route params
  const sessionId = Route.useParams().sessionId;
  const sessionIdNum = Number(sessionId);

  // Track if session is already closed to avoid duplicate calls
  const [sessionClosed, setSessionClosed] = useState(false);

  // Helper to close session (uses sendBeacon for unload, otherwise API call)
  const closeSession = (useBeacon = false) => {
    if (sessionClosed || !sessionIdNum) return;
    setSessionClosed(true);
    const url = `${import.meta.env.VITE_API_BASE_URL || ''}/api/user_assignment_sessions/${sessionIdNum}`;
    if (useBeacon && navigator.sendBeacon) {
      // PATCH with sendBeacon: send empty body, server should handle it
      const headers = { type: 'application/json' };
      navigator.sendBeacon(url, new Blob([JSON.stringify({})], headers));
    } else {
      // Use imported mutation (async, but fire and forget)
      closeUserAssignmentSession({ id: sessionIdNum }).catch(() => {});
    }
  };

  // Browser/tab close or visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        closeSession(true);
      }
    };
    const handleBeforeUnload = () => {
      closeSession(true);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // React unmount fallback
      closeSession();
    };
  }, [sessionIdNum, sessionClosed]);

  // Centralized responses state
  const [responses, setResponses] = useState(() =>
    questions.map(q => q.response ?? ''),
  );

  // Handler to update a response
  const handleResponseChange = (index: number, value: string) => {
    setResponses(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Query param navigation logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>
  useEffect(() => {
    const nextQ = getNextQParam(
      q,
      responses,
      nextQuestionIndex,
      questions.length,
    );
    if (nextQ !== undefined && nextQ !== q) {
      navigate({
        search: prev => ({ ...prev, q: nextQ }),
        replace: true,
      });
    }
  }, [q, responses, nextQuestionIndex, questions.length, navigate]);
  // <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Query param navigation logic

  // Use q (1-based) as currentIndex (0-based)
  const currentIndex =
    q !== undefined ? Math.max(0, Number(q) - 1) : nextQuestionIndex;
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  // Handlers to update q in the URL (pushes new history entry)
  const goToIndex = (newIndex: number) => {
    navigate({
      search: prev => ({ ...prev, q: newIndex + 1 }),
    });
  };
  // <~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Query param navigation logic

  // Button enable/disable logic
  const currentResponse = responses[currentIndex] ?? '';
  const allAnswered = responses.every(r => r && r.trim() !== '');

  return (
    <div className='page'>
      {currentQuestion && (
        <QuestionCard
          questionId={currentQuestion.questionId}
          content={currentQuestion.content}
          choices={currentQuestion.choices}
          points={currentQuestion.points}
          response={currentResponse}
          onResponseChange={value => handleResponseChange(currentIndex, value)}
        />
      )}
      <div className='flex gap-2 mt-4'>
        <RenderIf condition={!isFirst}>
          <Button onClick={() => goToIndex(currentIndex - 1)}>Previous</Button>
        </RenderIf>
        <RenderIf condition={!isLast}>
          <Button
            onClick={() => goToIndex(currentIndex + 1)}
            disabled={!currentResponse || currentResponse.trim() === ''}
          >
            Next
          </Button>
        </RenderIf>
        {isLast && (
          <Button variant='default' disabled={!allAnswered}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

import { closeUserAssignmentSession } from '@/lib/api/mutations';
import { useEffect, useState } from 'react';

export const useCloseSessionOnExit = (sessionIdNum?: number) => {
  const [sessionClosed, setSessionClosed] = useState(false);

  // Helper to close session (uses sendBeacon for unload, otherwise API call)
  const closeSession = (useBeacon = false) => {
    if (sessionClosed || !sessionIdNum) return;
    setSessionClosed(true);
    const url = `${import.meta.env.VITE_API_BASE_URL || ''}/api/user_assignment_sessions/${sessionIdNum}`;
    if (useBeacon && navigator.sendBeacon) {
      const headers = { type: 'application/json' };
      navigator.sendBeacon(url, new Blob([JSON.stringify({})], headers));
    } else {
      closeUserAssignmentSession({ id: sessionIdNum }).catch(() => {});
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionIdNum, sessionClosed]);

  return { sessionClosed, closeSession };
};

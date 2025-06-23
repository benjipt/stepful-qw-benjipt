// TODO: Session close on tab/window unfocus or close is not working reliably.
// Possible reasons:
// 1. The event handlers (visibilitychange, beforeunload) may not be firing as expected.
// 2. The hook may not be mounted or sessionIdNum may be undefined when needed.
// 3. Browser limitations: fetch with keepalive is not always supported for PATCH requests on unload; sendBeacon only supports POST.
// 4. The backend may not accept PATCH requests without a body or with keepalive.
// Potential solutions:
// - Add debug logging to verify handler firing and sessionIdNum value.
// - Switch to a POST endpoint for session close and use sendBeacon for unload events.
// - Ensure the hook is mounted and sessionIdNum is valid at all times.
// - Test in multiple browsers and check for errors in the console and network tab.
// - Consider using a service worker for more reliable background requests (advanced).

import { useEffect } from 'react';

export const useCloseSessionOnExit = (sessionIdNum?: number) => {
  const closeSession = () => {
    if (!sessionIdNum) return;
    const url = `${import.meta.env.VITE_API_BASE_URL || ''}/api/user_assignment_sessions/${sessionIdNum}`;
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {
      // Log to Sentry
    });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        closeSession();
      }
    };
    const handleBeforeUnload = () => {
      closeSession();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionIdNum]);

  return { closeSession };
};

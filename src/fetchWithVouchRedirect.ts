let windowObjectReference: Window | null = null;

export async function fetchWithVouchRedirect(
  initialUrl: string,
  authUrl?: string,
) {
  try {
    return await fetch(initialUrl, {
      credentials: 'include',
    });
  } catch {
    await obtainAuthCookie(initialUrl, authUrl);
    return await fetch(initialUrl, {
      credentials: 'include',
    });
  }

  async function obtainAuthCookie(initialUrl: string, authUrl?: string) {
    const popupUrl = authUrl
      ? `${authUrl}?url=${window.location.origin}/authpopup&vouch-failcount=&X-Vouch-Token=&error=&rd=${window.location.origin}/authpopup`
      : initialUrl;
    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(
        popupUrl,
        'PromoteFirefoxWindowName',
        'resizable,scrollbars,status',
      );
      if (windowObjectReference === null || windowObjectReference.closed) {
        throw new Error(
          'Authentication popup is missing - it could be caused by the browser disallowing the site to open popups',
        );
      }
    } else {
      windowObjectReference.focus();
    }
    window.addEventListener(
      'message',
      event => {
        if (event.origin !== window.location.origin) {
          return;
        }
        if (event.data === 'closePopup') {
          windowObjectReference?.close();
        }
      },
      false,
    );
    await new Promise<void>(res => {
      const timer = setInterval(() => {
        if (windowObjectReference?.closed) {
          clearInterval(timer);
          res();
        }
      }, 500);
    });
  }
}

/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect } from 'react';

export const AuthPopup = () => {
  useEffect(() => {
    if (!window.location.search) {
      window.opener.postMessage('closePopup', window.location.origin);
    } else {
      const currentUrl = new URL(window.location.href);
      var redirectUrl = currentUrl.searchParams.get('url');
      const currentUrlWithoutParams = `${window.location.origin}${window.location.pathname}`;
      window.location.replace(
        `${redirectUrl}?url=${currentUrlWithoutParams}&vouch-failcount=&X-Vouch-Token=&error=&rd=${currentUrlWithoutParams}`,
      );
    }
  }, []);
  return <div></div>;
};

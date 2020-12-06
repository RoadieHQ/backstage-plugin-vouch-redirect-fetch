# Vouch redirect Plugin for Backstage

It aims to enable the usage of web api resources secured by [vouch-proxy](https://github.com/vouch/vouch-proxy). 

This plugin exports a function `fetchWithVouchRedirect` and a component `AuthPopup`.

`AuthPopup` component has to be set as a page in the root backstage reducer like this:

```tsx
import { AuthPopup } from '@roadiehq/backstage-plugin-vouch-redirect';
...
<Routes>
  ...
  <Route path="/authpopup" element={<AuthPopup />} />
</Routes>
```

`fetchWithVouchRedirect` has to be called with two parameters:

- url of the desired resource as a first parameter
- url to the vouch-proxy server login endpoint as a second parameter

```tsx
import { fetchWithVouchRedirect } from '@roadiehq/backstage-plugin-vouch-redirect';
...
    fetchWithVouchRedirect(
      'https://backstage.myorganization.com/api/catalog/entities',
      'https://backstage-vouch.myorganization.com/login',
    );
```

`fetchWithVouchRedirect` function will attempt to fetch the resource and if the vouch session cookie is not set, it will open a popup with the login form (from provider configured in the vouch-proxy server) and after user succesfully logs in, popup will close and the resources will be fetched again.


Following settings are required in vouch-proxy configuration:

- `sameSite` parameter for vouch cookie has to be set to `none`
- backstage origin has to be added to the allowed redirect domains

```yml
  vouch:
    cookie:
      sameSite: none
    domains: ["backstageorigin", ...domains]
```

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { domain, clientId, audience, apiUrl } from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain: 'silve1ra.us.auth0.com',
    clientId: 'm7xjTM4Y2SqGfLRk9Y7hTcr8BbxcifbU',
    redirectUri: window.location.origin,
    audience: 'casting-agency',
  },
  dev: {
    apiUrl: 'http://localhost:5000',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

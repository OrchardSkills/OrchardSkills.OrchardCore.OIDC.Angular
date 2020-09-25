// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientRoot: 'https://localhost:4200/',

  //apiRoot: 'https://securingangularappscoursev2-api.azurewebsites.net/api/',
  //stsAuthority: 'https://securingangularappscoursev2-sts.azurewebsites.net/',
  //clientId: 'spa-client',

  apiRoot: 'https://localhost:44342/api/content/40v9c72yqyan52a9sdfxqxd1xt/',
  stsAuthority: 'https://localhost:44342/',
  clientId: 'code_flow_client_id',
  
  clientCredentialsId: "credentials_client_id",
  clientCredentialsSecret: "C1ientCredentials_$ecret"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

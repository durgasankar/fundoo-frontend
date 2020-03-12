// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  USER_API_URL: "http://localhost:8081/user",
  NOTE_API_URL: "http://localhost:8081/notes",
  // user api urls
  REGISTRATION_URL: "/registration",
  LOGIN_URL: "/login",
  ACTIVATE_ACCOUNT_URL: "/verification",
  FORGOT_PASSWORD_URL: "/forgot-password",
  UPDATE_PASSWORD_URL: "/update-password",
  //note api urls
  CREATE_NOTE_URL: "/create",
  GET_ALL_NOTES_URL: "/fetch/notes",
  GET_ALL_REMAINDER_NOTES_URL: "/fetch/notes/remainders"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  USER_API_URL: "http://localhost:8081/user",
  NOTE_API_URL: "http://localhost:8081/notes",
  LABEL_API_URL: "http://localhost:8081/labels",
  // user api urls
  REGISTRATION_URL: "/registration",
  LOGIN_URL: "/login",
  ACTIVATE_ACCOUNT_URL: "/verification",
  FORGOT_PASSWORD_URL: "/forgot-password",
  UPDATE_PASSWORD_URL: "/update-password",
  //note api urls
  CREATE_NOTE_URL: "/create",
  GET_ALL_NOTES_URL: "/fetch/notes",
  GET_ALL_REMAINDER_NOTES_URL: "/fetch/notes/remainders",
  GET_ALL_ARCHIVED_NOTES_URL: "/fetch/notes/archived",
  GET_ALL_TRASHED_NOTES_URL: "/fetch/notes/trashed",
  GET_ALL_PINNED_NOTES_URL: "/fetch/notes/pinned",
  // update note
  UPDATE_NOTE_URL: "/update?id=",
  DELETE_NOTE_URL: "/trash",
  ARCHIVE_NOTE_URL: "/archive",
  DELETE_FOREVER_NOTE_URL: "/delete",
  RESTORE_NOTE_URL: "/restore",
  PINNED_UNPINNED_NOTE_URL: "/pin",
  CHANGE_COLOR_NOTE_URL: "?color=",
  ADD_REMAINDER_URL: "/remainder/add?time=",
  REMOVE_REMAINDER_URL: "/remainder/remove",
  // label note
  GET_ALL_LABELS_URL: "/fetch",
  CREATE_LABEL_URL: "/create",
  DELETE_LABEL_URL: "/delete",
  RENAME_LABEL_URL: "/edit?labelName=",
  MAP_NOTE_TO_LABEL: "/map?"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

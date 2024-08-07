/**
 * An array of routes the publicly accessible.
 * @type { string[] }
 */

export const publicRoutes: string[] = ["/", "/test"];

/**
 * An array of routes used for authentication.
 * These routes will redirect logged in users to DEFAULT_LOGIN_REDIRECT
 * @type { string[] }
 */

export const authRoutes: string[] = ["/login"];

/**
 * The prefix for API authentication routes.
 * @type { string }
 */

export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type { string }
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/jobs";
export const ProtectedRoutes = "/manage";

/**
 * An array of routes accessible to the public
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
    "/signIn",
    "/signUp"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile"
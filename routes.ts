/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification",
    "/invitation",
    "/invitation/accept",
    "/invitation/decline",
    "/access-denied"
];/* */

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = process.env.DEFAULT_LOGIN_REDIRECT || "/shops";
// Control the access to routes based on user roles
/* export const roleRoutesPermissions = [
    {
        path: "/projects/[id]/edit",
        permissions: [Role.OWNER, Role.ADMIN]
    },
    {
        path: "/dashboard/task-groups/create",
        permissions: [Role.OWNER, Role.ADMIN]
    },
    {
        path: "/dashboard/task-groups/[id]/edit",
        permissions: [Role.OWNER, Role.ADMIN, Role.EDITOR]
    },
    {
        path: "/dashboard/tasks/create",
        permissions: [Role.OWNER, Role.ADMIN]
    },
    {
        path: "/dashboard/members/add",
        permissions: [Role.OWNER, Role.ADMIN]
    }

] */
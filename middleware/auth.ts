// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
    // Skip authentication check on server side for now
    if (process.server) {
        return;
    }

    const { requireAuth, isAdmin } = useAuth();

    // Skip middleware for login and register pages
    if (to.path === '/login' || to.path === '/register') {
        return;
    }

    // Verify authentication (redirects to login if not authenticated)
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) {
        return;
    }

    // Check admin routes
    if (to.meta.requiresAdmin && !isAdmin.value) {
        return navigateTo('/unauthorized');
    }
});
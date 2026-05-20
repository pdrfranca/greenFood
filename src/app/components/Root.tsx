import { Outlet, useLocation } from "react-router";

export function Root() {
  const location = useLocation();
  
  // Routes that don't need the main layout (auth pages, onboarding)
  const authRoutes = ['/', '/register', '/forgot-password', '/onboarding'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  if (isAuthRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}

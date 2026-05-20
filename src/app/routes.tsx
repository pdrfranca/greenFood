import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { Onboarding } from "./components/onboarding/Onboarding";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Inventory } from "./components/inventory/Inventory";
import { MealPlanning } from "./components/meal-planning/MealPlanning";
import { Alerts } from "./components/alerts/Alerts";
import { Reports } from "./components/reports/Reports";
import { Settings } from "./components/settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "onboarding", Component: Onboarding },
      { path: "dashboard", Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "meal-planning", Component: MealPlanning },
      { path: "alerts", Component: Alerts },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
    ],
  },
]);

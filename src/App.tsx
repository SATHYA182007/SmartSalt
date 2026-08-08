import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { Role } from './types';

// Layout
import { AppShell } from './components/layout/AppShell';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AuthPage } from './pages/AuthPage';

// Field Operator Pages
import { OperatorDashboard } from './pages/operator/Dashboard';
import { BlocksPage } from './pages/operator/BlocksPage';
import { MonitoringPage } from './pages/operator/MonitoringPage';
import { AIInsightsPage } from './pages/operator/AIInsightsPage';
import { CrystallizationPage } from './pages/operator/CrystallizationPage';
import { OperatorAlertsPage } from './pages/operator/AlertsPage';
import { WeatherPage } from './pages/operator/WeatherPage';
import { SensorDetailPage } from './pages/operator/SensorDetailPage';
import { ProfilePage } from './pages/operator/ProfilePage';

// System Administrator Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { SensorNodesPage } from './pages/admin/SensorNodesPage';
import { GatewaysPage } from './pages/admin/GatewaysPage';
import { DeviceHealthPage } from './pages/admin/DeviceHealthPage';
import { CalibrationPage } from './pages/admin/CalibrationPage';
import { AdminAlertsPage } from './pages/admin/AdminAlertsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: Role }> = ({
  children,
  requiredRole,
}) => {
  const { user, role } = useAppStore();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/operator/dashboard'} replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Field Operator Routes */}
        <Route
          element={
            <ProtectedRoute requiredRole="operator">
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/operator/dashboard" element={<OperatorDashboard />} />
          <Route path="/operator/blocks" element={<BlocksPage />} />
          <Route path="/operator/monitoring" element={<MonitoringPage />} />
          <Route path="/operator/ai-insights" element={<AIInsightsPage />} />
          <Route path="/operator/crystallization" element={<CrystallizationPage />} />
          <Route path="/operator/alerts" element={<OperatorAlertsPage />} />
          <Route path="/operator/weather" element={<WeatherPage />} />
          <Route path="/operator/sensors/:id" element={<SensorDetailPage />} />
          <Route path="/operator/profile" element={<ProfilePage />} />
        </Route>

        {/* Protected System Administrator Routes */}
        <Route
          element={
            <ProtectedRoute requiredRole="admin">
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/nodes" element={<SensorNodesPage />} />
          <Route path="/admin/gateways" element={<GatewaysPage />} />
          <Route path="/admin/device-health" element={<DeviceHealthPage />} />
          <Route path="/admin/calibration" element={<CalibrationPage />} />
          <Route path="/admin/alerts" element={<AdminAlertsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

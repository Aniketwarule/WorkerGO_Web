import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import BrokerPortal from './pages/BrokerPortal';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';

export const baseUrl = 'http://localhost:3000';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/BrokerPortal" element={<BrokerPortal />} />
          <Route path="/EmployerDashboard" element={<EmployerDashboard />} />          
          <Route
            path="/employer/*"
            element={
              <ProtectedRoute role="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker/*"
            element={
              <ProtectedRoute role="broker">
                <BrokerPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
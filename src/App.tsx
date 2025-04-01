import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import PetitionsPage from './pages/PetitionsPage';
import PetitionDetailPage from './pages/PetitionDetailPage';
import NewPetitionPage from './pages/NewPetitionPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminCreate from './pages/AdminCreate';
import GovernmentUsersPage from './pages/GovernmentUsersPage';
import UpdatePetitionPage from './pages/UpdatePetitionPage';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactElement; allowedRoles?: string[] }> = ({ 
  element, 
  allowedRoles 
}) => {
  // const { currentUser, isAuthenticated } = useAuth();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  
  return element;
};

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/create_user' element={<AdminCreate/>}  />
          <Route path="/" element={<MainLayout />}>
            <Route path='/admin/users' element={<GovernmentUsersPage/>}/>
            <Route index element={<HomePage />} />
            <Route path="petitions" element={<PetitionsPage />} />
            <Route path="petitions/:id" element={<PetitionDetailPage />} />
            <Route path="petitions/update/:id" element={<UpdatePetitionPage />} />
            <Route 
              path="petitions/new" 
              element={
                <ProtectedRoute element={<NewPetitionPage />} />
              } 
            />
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute 
                  element={<DashboardPage />} 
                  allowedRoles={['admin']} 
                />
              } 
            />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Router>
    // </AuthProvider>
  );
}

export default App;
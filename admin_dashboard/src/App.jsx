import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';
import Listings from './pages/Listings';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = localStorage.getItem('adminToken');

  return (
    <Router
    future={{ 
      v7_startTransition: true, 
      v7_relativeSplatPath: true 
    }}
    
    >
      <Routes>
       
        <Route path="/admin-login" element={<LoginPage />} />

       
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                <Sidebar />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <Header />
                  <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f0f4f8' }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/properties" element={<Properties />} />
                      <Route path="/add-property" element={<AddProperty />} />
                      <Route path="/listings" element={<Listings />} />
                      <Route path="/settings" element={<Settings />} />
                     
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
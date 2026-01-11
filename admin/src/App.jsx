import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import Jobs from './pages/Jobs';
import CreateJob from './pages/CreateJob';
import Applications from './pages/Applications';
import MobileOverlay from './components/MobileOverlay';
import './App.css';

const AdminLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking overlay
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <MobileOverlay
        isVisible={isMobileMenuOpen}
        onClick={handleMobileMenuClose}
      />

      {/* Sidebar */}
      <div
        className={`lg:block ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Header */}
      <Header
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
          <Route path="/blogs/edit/:id" element={<CreateBlog />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/create" element={<CreateJob />} />
          <Route path="/jobs/edit/:id" element={<CreateJob />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { RiMenuLine, RiUserLine } from 'react-icons/ri';
import NotificationPanel from './NotificationPanel';
import { useAuth } from '../context/AuthContext';

const Header = ({ onMenuClick, isSidebarCollapsed }) => {
  const { admin } = useAuth();

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white border-b border-border flex items-center justify-between px-6 z-40 transition-all duration-300 ${
        isSidebarCollapsed ? 'left-16' : 'left-64'
      }`}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 active:scale-95 cursor-pointer"
        aria-label="Toggle menu"
      >
        <RiMenuLine className="w-5 h-5 text-gray-600" />
      </button>

      {/* Breadcrumb / Title */}
      <div className="hidden lg:block">
        <span className="text-sm text-gray-500">Panneau d'administration</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <NotificationPanel />

        {/* User Avatar */}
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 active:scale-95 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <RiUserLine className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {admin?.name || admin?.username || 'Admin'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;

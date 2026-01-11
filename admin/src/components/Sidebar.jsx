import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  RiDashboardLine,
  RiArticleLine,
  RiBriefcaseLine,
  RiMailLine,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from 'react-icons/ri';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { icon: RiDashboardLine, label: 'Tableau de bord', path: '/' },
    { icon: RiArticleLine, label: 'Blogs', path: '/blogs' },
    { icon: RiBriefcaseLine, label: 'Emplois', path: '/jobs' },
    { icon: RiMailLine, label: 'Candidatures', path: '/applications' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-primary text-text-light flex flex-col transition-all duration-300 ease-in-out z-50 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-primary-light/20">
        {!isCollapsed && (
          <span className="text-lg font-semibold tracking-wide animate-fadeIn">
            STIP Admin
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-primary-light/20 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <RiMenuUnfoldLine className="w-5 h-5 text-primary-50" />
          ) : (
            <RiMenuFoldLine className="w-5 h-5 text-primary-50" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 active:scale-[0.98] group ${
                    isActive
                      ? 'bg-primary-light/30 text-white'
                      : 'hover:bg-primary-light/20'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 transition-colors duration-200 flex-shrink-0 ${
                        isActive
                          ? 'text-white'
                          : 'text-primary-50 group-hover:text-white'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium animate-fadeIn whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-2 pb-4 border-t border-primary-light/20 pt-4">
        <button className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-red-500/20 transition-all duration-200 active:scale-[0.98] group cursor-pointer">
          <RiLogoutBoxLine className="w-5 h-5 text-primary-50 group-hover:text-red-400 transition-colors duration-200 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium animate-fadeIn whitespace-nowrap group-hover:text-red-400 transition-colors duration-200">
              Déconnexion
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

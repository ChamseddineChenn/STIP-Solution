import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import {
  RiNotificationLine,
  RiFileList3Line,
  RiBriefcaseLine,
  RiMailLine,
  RiTimeLine,
  RiCloseLine,
  RiCheckLine,
} from 'react-icons/ri';
import { notificationAPI } from '../services/api';
import './NotificationPanel.css';

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Set());
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await notificationAPI.getRecent(15);
      if (response.data.success) {
        const newNotifications = response.data.data.notifications;
        setNotifications(newNotifications);

        // Calculate unread count excluding already read ones
        const newUnreadCount = newNotifications.filter(
          (n) => !readNotifications.has(`${n.type}-${n.id}`),
        ).length;
        setUnreadCount(newUnreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = (type, id) => {
    const notificationKey = `${type}-${id}`;
    const newReadNotifications = new Set(readNotifications);
    newReadNotifications.add(notificationKey);
    setReadNotifications(newReadNotifications);

    // Update unread count
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // Mark all as read
  const markAllAsRead = () => {
    const newReadNotifications = new Set(readNotifications);
    notifications.forEach((n) => {
      newReadNotifications.add(`${n.type}-${n.id}`);
    });
    setReadNotifications(newReadNotifications);
    setUnreadCount(0);
  };

  // Fetch on mount and set up socket connection
  useEffect(() => {
    fetchNotifications();

    // Set up Socket.io connection for real-time notifications
    // Remove /api suffix for socket connection (socket.io connects to root)
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const socketUrl = apiUrl.replace('/api', '');
    
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    // Listen for notification updates from server
    socket.on('notification-updated', () => {
      console.log('Real-time notification received');
      fetchNotifications();
    });

    socket.on('connect', () => {
      console.log('Connected to notification server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from notification server');
    });

    // Refresh every 30 seconds as fallback
    const interval = setInterval(fetchNotifications, 30000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'quotation':
        return <RiFileList3Line className="w-5 h-5 text-blue-500" />;
      case 'application':
        return <RiBriefcaseLine className="w-5 h-5 text-green-500" />;
      case 'newsletter':
        return <RiMailLine className="w-5 h-5 text-purple-500" />;
      default:
        return <RiNotificationLine className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'reviewed':
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-CA');
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 active:scale-95 relative cursor-pointer"
        aria-label="Notifications"
      >
        <RiNotificationLine className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-4.5 h-4.5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="px-4 py-3 bg-linear-to-r from-primary to-primary-dark text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <RiNotificationLine className="w-5 h-5" />
              <span className="font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1 hover:bg-white/20 rounded transition-colors text-xs font-medium"
                  title="Marquer tout comme lu"
                >
                  Tout lire
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notification List - Custom Scrollbar */}
          <div className="notification-scroll overflow-y-auto flex-1">
            {isLoading && notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                Chargement...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <RiNotificationLine className="w-12 h-12 mx-auto mb-2 opacity-30" />
                Aucune notification
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const notifKey = `${notification.type}-${notification.id}`;
                  const isRead = readNotifications.has(notifKey);

                  return (
                    <div
                      key={notifKey}
                      className={`flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors group ${
                        isRead ? 'opacity-60' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div className="shrink-0 mt-0.5">
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={notification.link}
                          onClick={() => setIsOpen(false)}
                          className="hover:underline"
                        >
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {notification.message}
                          </p>
                        </Link>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <RiTimeLine className="w-3 h-3" />
                            {formatRelativeTime(notification.createdAt)}
                          </span>
                          {notification.status && (
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded ${getStatusColor(
                                notification.status,
                              )}`}
                            >
                              {notification.status === 'new' && 'Nouveau'}
                              {notification.status === 'pending' &&
                                'En attente'}
                              {notification.status === 'reviewed' && 'Consulté'}
                              {notification.status === 'contacted' &&
                                'Contacté'}
                              {notification.status === 'active' && 'Actif'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Read Button */}
                      {!isRead && (
                        <button
                          onClick={() =>
                            markAsRead(notification.type, notification.id)
                          }
                          className="shrink-0 p-1 rounded hover:bg-primary/10 transition-colors text-primary opacity-0 group-hover:opacity-100"
                          title="Marquer comme lu"
                        >
                          <RiCheckLine className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-100 p-3 bg-gray-50 shrink-0">
              <div className="flex gap-2">
                <Link
                  to="/quotations"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  Soumissions
                </Link>
                <Link
                  to="/applications"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  Candidatures
                </Link>
                <Link
                  to="/newsletter"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-medium text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  Newsletter
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;

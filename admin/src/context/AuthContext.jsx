import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { authAPI, setAuthToken } from '../services/api';

const AuthContext = createContext(null);

// Token storage keys
const ACCESS_TOKEN_KEY = 'stip_admin_access_token';
const ADMIN_DATA_KEY = 'stip_admin_data';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use ref for clearAuth to avoid dependency issues
  const clearAuthRef = useRef(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const storedAdmin = localStorage.getItem(ADMIN_DATA_KEY);

        if (storedToken && storedAdmin) {
          setAccessToken(storedToken);
          setAdmin(JSON.parse(storedAdmin));

          // Verify token is still valid
          try {
            const response = await authAPI.verify(storedToken);
            if (response.data.success) {
              setAdmin(response.data.data.admin);
              setIsAuthenticated(true);
            } else {
              // Token invalid, try to refresh
              try {
                const refreshResponse = await authAPI.refresh();
                if (refreshResponse.data.success) {
                  const newToken = refreshResponse.data.data.accessToken;
                  setAccessToken(newToken);
                  localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
                  setIsAuthenticated(true);
                }
              } catch {
                clearAuthRef.current?.();
              }
            }
          } catch (verifyError) {
            // Token expired or invalid, try to refresh
            if (verifyError.response?.data?.expired) {
              try {
                const refreshResponse = await authAPI.refresh();
                if (refreshResponse.data.success) {
                  const newToken = refreshResponse.data.data.accessToken;
                  setAccessToken(newToken);
                  localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
                  setIsAuthenticated(true);
                }
              } catch {
                clearAuthRef.current?.();
              }
            } else {
              clearAuthRef.current?.();
            }
          }
        } else {
          // No stored auth, try to refresh from cookie
          try {
            const refreshResponse = await authAPI.refresh();
            if (refreshResponse.data.success) {
              const newToken = refreshResponse.data.data.accessToken;
              setAccessToken(newToken);
              localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
              setIsAuthenticated(true);
            }
          } catch {
            // No valid session - this is expected for new users
            setIsAuthenticated(false);
          }
        }
      } catch (initError) {
        console.error('Auth initialization error:', initError);
        clearAuthRef.current?.();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Clear all auth data
  const clearAuth = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ADMIN_DATA_KEY);
    setAccessToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
    setAuthToken(null); // Clear axios token
  }, []);

  // Keep ref updated
  clearAuthRef.current = clearAuth;

  // Update axios default token whenever accessToken changes
  useEffect(() => {
    setAuthToken(accessToken);
  }, [accessToken]);

  // Refresh access token using refresh token cookie
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await authAPI.refresh();

      if (response.data.success) {
        const newToken = response.data.data.accessToken;
        setAccessToken(newToken);
        localStorage.setItem(ACCESS_TOKEN_KEY, newToken);

        // Verify to get admin data
        const verifyResponse = await authAPI.verify(newToken);
        if (verifyResponse.data.success) {
          const adminData = verifyResponse.data.data.admin;
          setAdmin(adminData);
          localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(adminData));
          setIsAuthenticated(true);
          return newToken;
        }
      }
      throw new Error('Refresh failed');
    } catch (error) {
      clearAuth();
      throw error;
    }
  }, [clearAuth]);

  // Login
  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);

      if (response.data.success) {
        const { admin: adminData, accessToken: token } = response.data.data;

        setAccessToken(token);
        setAdmin(adminData);
        setIsAuthenticated(true);

        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(adminData));

        return { success: true };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur de connexion';
      return { success: false, message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (accessToken) {
        await authAPI.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
    }
  };

  // Get current access token (with auto-refresh if needed)
  const getAccessToken = useCallback(async () => {
    if (!accessToken) {
      try {
        return await refreshAccessToken();
      } catch {
        return null;
      }
    }
    return accessToken;
  }, [accessToken, refreshAccessToken]);

  const value = {
    admin,
    accessToken,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshAccessToken,
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

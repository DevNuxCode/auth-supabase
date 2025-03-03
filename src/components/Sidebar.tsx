import React, { useState, useEffect } from 'react';
import { 
  FaBox, 
  FaUsers, 
  FaUserFriends, 
  FaShoppingCart, 
  FaTruck, 
  FaFileInvoice,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from 'react-icons/fa';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  initialDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ initialDarkMode = false }) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage for dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Get user info
    const getUserInfo = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data && data.user) {
          setUserEmail(data.user.email || '');
        }
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    };
    
    getUserInfo();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      // Clear any stored session data
      localStorage.removeItem('supabase.auth.token');
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoading(false);
    }
  };

  const menuItems = [
    { icon: FaBox, text: 'Productos', path: '/dashboard/productos' },
    { icon: FaUserFriends, text: 'Clientes', path: '/dashboard/clientes' },
    { icon: FaUsers, text: 'Usuarios', path: '/dashboard/usuarios' },
    { icon: FaShoppingCart, text: 'Pedidos', path: '/dashboard/pedidos' },
    { icon: FaTruck, text: 'Proveedores', path: '/dashboard/proveedores' },
    { icon: FaFileInvoice, text: 'Facturas', path: '/dashboard/facturas' },
  ];

  return (
    <div className={`fixed left-0 h-screen w-64 p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        
        {userEmail && (
          <div className={`mb-6 p-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p>Conectado como:</p>
            <p className="font-semibold">{userEmail}</p>
          </div>
        )}
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-2">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full ${
              darkMode 
                ? 'hover:bg-gray-700' 
                : 'hover:bg-gray-100'
            }`}
          >
            {darkMode ? (
              <>
                <FaSun className="w-5 h-5" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <FaMoon className="w-5 h-5" />
                <span>Modo Oscuro</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full ${
              darkMode 
                ? 'hover:bg-gray-700 text-red-400' 
                : 'hover:bg-gray-100 text-red-600'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>{isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
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

  useEffect(() => {
    // Check local storage for dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
    await supabase.auth.signOut();
    window.location.href = '/';
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
            className={`flex items-center space-x-3 p-3 rounded-lg w-full ${
              darkMode 
                ? 'hover:bg-gray-700 text-red-400' 
                : 'hover:bg-gray-100 text-red-600'
            }`}
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
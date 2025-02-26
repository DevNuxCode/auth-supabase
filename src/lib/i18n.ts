import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard',
      products: 'Products',
      customers: 'Customers',
      suppliers: 'Suppliers',
      orders: 'Orders',
      sales: 'Sales',
      invoices: 'Invoices',
      login: 'Login',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode'
    }
  },
  es: {
    translation: {
      dashboard: 'Panel de Control',
      products: 'Productos',
      customers: 'Clientes',
      suppliers: 'Proveedores',
      orders: 'Pedidos',
      sales: 'Ventas',
      invoices: 'Facturas',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      email: 'Correo',
      password: 'Contraseña',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
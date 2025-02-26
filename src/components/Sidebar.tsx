import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  styled,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  People,
  Receipt,
  LocalShipping,
  ShoppingCart,
  Description,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { t } = useTranslation();

  const menuItems = [
    { text: t('dashboard'), icon: <Dashboard />, path: '/dashboard' },
    { text: t('products'), icon: <Inventory />, path: '/products' },
    { text: t('customers'), icon: <People />, path: '/customers' },
    { text: t('suppliers'), icon: <LocalShipping />, path: '/suppliers' },
    { text: t('orders'), icon: <ShoppingCart />, path: '/orders' },
    { text: t('sales'), icon: <Receipt />, path: '/sales' },
    { text: t('invoices'), icon: <Description />, path: '/invoices' },
  ];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : theme => theme.spacing(7),
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : theme => theme.spacing(7),
          overflowX: 'hidden',
          transition: theme =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <DrawerHeader />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: isOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ opacity: isOpen ? 1 : 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
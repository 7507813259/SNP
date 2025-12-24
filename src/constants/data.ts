import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Account',
    url: '#',
    icon: 'billing',
    isActive: true,

    items: [
      // {
      //   title: 'Email Subject',
      //   url: '/dashboard/masters/email-subject',
      //   icon: 'userPen',
      //   shortcut: ['m', 'm']
      // }
      // {
      //   title: 'Profile',
      //   url: '/dashboard/profile',
      //   icon: 'userPen',
      //   shortcut: ['m', 'm']
      // },
      // {
      //   title: 'Login',
      //   shortcut: ['l', 'l'],
      //   url: '/',
      //   icon: 'login'
      // }
    ]
  },
  // {
  //   title: 'Prospect List',
  //   url: '/dashboard/prospect-list',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: 'Reports',
  //   url: '/dashboard/report-list',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: 'Export Analytics',
  //   url: '/dashboard/export-analytics',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // }
];

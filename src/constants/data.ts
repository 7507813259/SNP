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
    title: 'मुख्य नियंत्रण फलक',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'प्रशासकीय खाते',
    url: '#',
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'विभाग कार्यक्षमता',
        url: '/dashboard/recent-activity',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'अलीकडील क्रियाकलाप',
        url: '/dashboard/department-efficiency',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'अर्ज व्यवस्थापन',
        shortcut: ['l', 'l'],
        url: '/dashboard/application-management',
        icon: 'login'
      },
      {
        title: 'कर मागोवा',
        shortcut: ['l', 'l'],
        url: '/dashboard/tax-tracking',
        icon: 'login'
      },
      {
        title: 'पाणी जोडणी व्यवस्थापन',
        shortcut: ['l', 'l'],
        url: '/dashboard/water-management',
        icon: 'login'
      }
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

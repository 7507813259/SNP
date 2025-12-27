'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  AlertCircle,
  Baby,
  Users,
  FileCheck,
  FileText,
  Home,
  Droplets,
  Bell,
  AlertTriangle,
  MessageSquare,
  Building,
  ClipboardCheck,
  Shield,
  Calendar,
  Map,
  Heart,
  Flame,
  Ticket,
  FileBarChart,
  Search,
  Download,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Filter,
  Plus,
  BarChart3,
  TrendingUp,
  TrendingDown,
  UserPlus,
  FileUp,
  FileDown,
  Printer,
  Share2,
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Landmark,
  Award,
  Newspaper,
  Megaphone,
  School,
  Stethoscope,
  Truck,
  Database,
  Server,
  Cpu,
  SmartphoneNfc,
  FileSearch,
  FileQuestion,
  FileSignature,
  FileClock,
  FileLock,
  FilePen,
  FileX,
  FileHeart,
  FileKey,
  FileWarning,
  DownloadCloud,
  UploadCloud,
  Settings,
  UserCog,
  BellRing,
  ShieldCheck,
  Lock,
  Unlock,
  CheckSquare,
  XSquare,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Users2,
  UserCheck,
  UserX,
  Building2,
  HomeIcon,
  Factory,
  Store,
  Hotel,
  School as SchoolIcon,
  Hospital,
  Church,
  Castle,
  Crown,
  Award as AwardIcon,
  Target,
  Flag,
  Globe,
  Navigation,
  Compass,
  MapPin as MapPinIcon,
  User,
  Shield as ShieldIcon,
  History,
  FileEdit,
  FileQuestion as FileQuestionIcon,
  PhoneCall,
  HelpCircle,
  Info
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GovernmentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    resolvedApplications: 0,
    activeUsers: 0,
    revenue: 0,
    satisfactionRate: 0,
    userApplications: 0,
    userPendingApplications: 0
  });

  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth?.user;
  const isAdmin = user?.role === 'admin';
  const isAuthenticated = auth?.status === 'authenticated';
  const dashboardStats = isAdmin
    ? [
        {
          title: 'एकूण अर्ज',
          value: stats.totalApplications.toLocaleString(),
          change: '+12.5%',
          icon: FileText,
          color: 'from-[#b01d4f] to-[#7a1e4f]'
        },
        {
          title: 'प्रलंबित अर्ज',
          value: stats.pendingApplications.toLocaleString(),
          change: '-8.2%',
          icon: Clock,
          color: 'from-amber-500 to-amber-700'
        },
        {
          title: 'सक्रिय वापरकर्ते',
          value: stats.activeUsers.toLocaleString(),
          change: '+5.3%',
          icon: Users,
          color: 'from-blue-500 to-blue-700'
        },
        {
          title: 'महसूल',
          value: `₹${(stats.revenue / 100000).toFixed(1)} लाख`,
          change: '+4.2%',
          icon: Landmark,
          color: 'from-green-500 to-green-700'
        }
      ]
    : [
        {
          title: 'माझे एकूण अर्ज',
          value: stats.userApplications.toString(),
          change: '+२ नवीन',
          icon: FileText,
          color: 'from-[#b01d4f] to-[#7a1e4f]'
        },
        {
          title: 'प्रलंबित अर्ज',
          value: stats.userPendingApplications.toString(),
          change: 'सोडवण्यासाठी',
          icon: Clock,
          color: 'from-amber-500 to-amber-700'
        },
        {
          title: 'सोडवलेले अर्ज',
          value: (
            stats.userApplications - stats.userPendingApplications
          ).toString(),
          change: 'यशस्वी',
          icon: CheckCircle,
          color: 'from-green-500 to-green-700'
        },
        {
          title: 'सेवा उपलब्ध',
          value: '१४+',
          change: 'श्रेण्या',
          icon: Award,
          color: 'from-blue-500 to-blue-700'
        }
      ];

  // Service categories - different for admin vs user
  const serviceCategories = isAdmin
    ? [
        {
          id: 'citizen-services',
          name: 'नागरिक सेवा',
          icon: Users,
          count: 9,
          pending: 124,
          color: 'from-[#b01d4f] to-[#7a1e4f]'
        },
        {
          id: 'grievance-services',
          name: 'तक्रार निवारण',
          icon: MessageSquare,
          count: 7,
          pending: 89,
          color: 'from-amber-500 to-amber-700'
        },
        {
          id: 'licenses',
          name: 'परवाने व अनुमती',
          icon: FileSignature,
          count: 7,
          pending: 56,
          color: 'from-blue-500 to-blue-700'
        },
        {
          id: 'town-planning',
          name: 'नगर नियोजन',
          icon: Building,
          count: 5,
          pending: 42,
          color: 'from-green-500 to-green-700'
        },
        {
          id: 'health-sanitation',
          name: 'स्वच्छता व आरोग्य',
          icon: Stethoscope,
          count: 6,
          pending: 67,
          color: 'from-emerald-500 to-emerald-700'
        },
        {
          id: 'water-management',
          name: 'पाणीपुरवठा',
          icon: Droplets,
          count: 6,
          pending: 31,
          color: 'from-cyan-500 to-cyan-700'
        },
        {
          id: 'fire-emergency',
          name: 'अग्निशमन सेवा',
          icon: Flame,
          count: 5,
          pending: 12,
          color: 'from-red-500 to-red-700'
        },
        {
          id: 'welfare-schemes',
          name: 'योजना व लाभ',
          icon: Award,
          count: 6,
          pending: 234,
          color: 'from-purple-500 to-purple-700'
        },
        {
          id: 'tenders',
          name: 'निविदा व जाहिराती',
          icon: Newspaper,
          count: 5,
          pending: 45,
          color: 'from-indigo-500 to-indigo-700'
        }
      ]
    : [
        {
          id: 'citizen-services',
          name: 'नागरिक सेवा',
          icon: Users,
          description: 'जन्म/मृत्यू प्रमाणपत्र, विवाह नोंदणी',
          color: 'from-[#b01d4f] to-[#7a1e4f]'
        },
        {
          id: 'tax-payment',
          name: 'कर भरणा',
          icon: Landmark,
          description: 'मालमत्ता कर, पाणी कर, घरपट्टी',
          color: 'from-green-500 to-green-700'
        },
        {
          id: 'water-connection',
          name: 'नळ कनेक्शन',
          icon: Droplets,
          description: 'नवीन कनेक्शन, दुरुस्ती',
          color: 'from-blue-500 to-blue-700'
        },
        {
          id: 'grievance',
          name: 'तक्रार निवारण',
          icon: MessageSquare,
          description: 'तक्रार नोंदवा, स्थिती तपासा',
          color: 'from-amber-500 to-amber-700'
        },
        {
          id: 'licenses',
          name: 'परवाने',
          icon: FileSignature,
          description: 'दुकान परवाना, बांधकाम परवानगी',
          color: 'from-purple-500 to-purple-700'
        }
      ];

  // User's recent applications
  const userApplications = [
    {
      id: 'APP-2024-001234',
      service: 'जन्म प्रमाणपत्र',
      submitted: '२०२४-०३-१५',
      status: 'approved',
      lastUpdate: '२ दिवसांपूर्वी'
    },
    {
      id: 'APP-2024-001235',
      service: 'मालमत्ता कर भरणा',
      submitted: '२०२४-०३-१४',
      status: 'pending',
      lastUpdate: '१ दिवसापूर्वी'
    },
    {
      id: 'APP-2024-001236',
      service: 'नळ कनेक्शन अर्ज',
      submitted: '२०२४-०३-१३',
      status: 'processing',
      lastUpdate: '३ दिवसांपूर्वी'
    },
    {
      id: 'APP-2024-001237',
      service: 'तक्रार नोंदणी',
      submitted: '२०२४-०३-१२',
      status: 'resolved',
      lastUpdate: 'आज'
    }
  ];

  // Recent applications data (Admin view)
  const recentApplications = [
    {
      id: 'APP-2024-001234',
      applicant: 'राजेश पाटील',
      service: 'जन्म प्रमाणपत्र',
      category: 'नागरिक सेवा',
      submitted: '२०२४-०३-१५ १०:३०',
      status: 'approved',
      assignedTo: 'स्मिता जोशी',
      priority: 'high'
    },
    {
      id: 'APP-2024-001235',
      applicant: 'सुनिता देशमुख',
      service: 'तक्रार नोंदणी',
      category: 'तक्रार निवारण',
      submitted: '२०२४-०३-१४ १४:२०',
      status: 'pending',
      assignedTo: 'अनिल कुमार',
      priority: 'medium'
    },
    {
      id: 'APP-2024-001236',
      applicant: 'विक्रम जोशी',
      service: 'दुकान परवाना',
      category: 'परवाने व अनुमती',
      submitted: '२०२४-०३-१३ ०९:१५',
      status: 'rejected',
      assignedTo: 'प्रिया शर्मा',
      priority: 'low'
    },
    {
      id: 'APP-2024-001237',
      applicant: 'मीनाक्षी शर्मा',
      service: 'बांधकाम परवानगी',
      category: 'नगर नियोजन',
      submitted: '२०२४-०३-१२ ११:४५',
      status: 'approved',
      assignedTo: 'राहुल वर्मा',
      priority: 'high'
    },
    {
      id: 'APP-2024-001238',
      applicant: 'अमित कुमार',
      service: 'नळ कनेक्शन',
      category: 'पाणीपुरवठा',
      submitted: '२०२४-०३-११ १६:३०',
      status: 'processing',
      assignedTo: 'संजय गुप्ता',
      priority: 'high'
    }
  ];

  // Staff management data (Admin only)
  const staffMembers = [
    {
      id: 'EMP-001',
      name: 'स्मिता जोशी',
      department: 'नागरिक सेवा विभाग',
      role: 'विभाग प्रमुख',
      email: 'smita.joshi@shegaon.gov.in',
      phone: '+91 9876543210',
      status: 'active',
      applicationsHandled: 245
    },
    {
      id: 'EMP-002',
      name: 'अनिल कुमार',
      department: 'तक्रार निवारण विभाग',
      role: 'वरिष्ठ अधिकारी',
      email: 'anil.kumar@shegaon.gov.in',
      phone: '+91 9876543211',
      status: 'active',
      applicationsHandled: 189
    },
    {
      id: 'EMP-003',
      name: 'प्रिया शर्मा',
      department: 'परवाना विभाग',
      role: 'अधिकारी',
      email: 'priya.sharma@shegaon.gov.in',
      phone: '+91 9876543212',
      status: 'active',
      applicationsHandled: 156
    }
  ];

  // Performance metrics (Admin only)
  const performanceMetrics = [
    {
      department: 'नागरिक सेवा',
      efficiency: 92,
      satisfaction: 88,
      pending: 124
    },
    {
      department: 'तक्रार निवारण',
      efficiency: 85,
      satisfaction: 82,
      pending: 89
    },
    {
      department: 'परवाना विभाग',
      efficiency: 78,
      satisfaction: 75,
      pending: 56
    },
    { department: 'नगर नियोजन', efficiency: 88, satisfaction: 85, pending: 42 },
    { department: 'पाणीपुरवठा', efficiency: 90, satisfaction: 87, pending: 31 }
  ];

  // Quick actions - different for admin vs user
  const quickActions = isAdmin
    ? [
        {
          label: 'नवीन सेवा जोडा',
          icon: Plus,
          color: 'bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f]',
          onClick: () => {}
        },
        {
          label: 'कर्मचारी नियुक्त करा',
          icon: UserPlus,
          color: 'bg-gradient-to-r from-blue-500 to-blue-700',
          onClick: () => {}
        },
        {
          label: 'अहवाल तयार करा',
          icon: FileBarChart,
          color: 'bg-gradient-to-r from-green-500 to-green-700',
          onClick: () => {}
        },
        {
          label: 'सिस्टम सेटिंग्ज',
          icon: Settings,
          color: 'bg-gradient-to-r from-purple-500 to-purple-700',
          onClick: () => {}
        }
      ]
    : [
        {
          label: 'नवीन अर्ज करा',
          icon: Plus,
          color: 'bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f]',
          onClick: () => router.push('/applications/new')
        },
        {
          label: 'माझे अर्ज पाहा',
          icon: History,
          color: 'bg-gradient-to-r from-blue-500 to-blue-700',
          onClick: () => router.push('/my-applications')
        },
        {
          label: 'तक्रार नोंदवा',
          icon: FileEdit,
          color: 'bg-gradient-to-r from-green-500 to-green-700',
          onClick: () => router.push('/grievance/new')
        },
        {
          label: 'कर भरा',
          icon: Landmark,
          color: 'bg-gradient-to-r from-purple-500 to-purple-700',
          onClick: () => router.push('/tax-payment')
        }
      ];

  // User announcements/notices
  const userAnnouncements = [
    {
      title: 'मालमत्ता कर भरणा तारीख वाढवली',
      description:
        '२०२३-२४ च्या मालमत्ता कर भरण्याची अंतिम तारीख ३१ मार्च २०२४ पर्यंत वाढवण्यात आली आहे.',
      date: '२० मार्च २०२४',
      type: 'important'
    },
    {
      title: 'नवीन नळ कनेक्शन अर्ज प्रक्रिया',
      description:
        'नवीन नळ कनेक्शनासाठी ऑनलाइन अर्ज प्रक्रिया सुरू. सर्व कागदपत्रे ऑनलाइन जमा करता येतील.',
      date: '१५ मार्च २०२४',
      type: 'update'
    },
    {
      title: 'विवाह नोंदणी कॅम्प',
      description:
        'विशेष विवाह नोंदणी कॅम्प २५ ते ३० मार्च. सोबत कमी शुल्कात नोंदणी करा.',
      date: '१० मार्च २०२४',
      type: 'event'
    }
  ];

  // Important contacts for users
  const importantContacts = [
    { name: 'नगराध्यक्ष कार्यालय', phone: '०२४८२-२३४५६७', icon: User },
    { name: 'मुख्याधिकारी कार्यालय', phone: '०२४८२-२३४५६८', icon: ShieldIcon },
    { name: 'तक्रार निवारण केंद्र', phone: '१०७७', icon: PhoneCall },
    { name: 'आपत्कालीन सेवा', phone: '१०८', icon: AlertTriangle }
  ];

  // Load stats on component mount
  useEffect(() => {
    if (isAdmin) {
      // Admin stats
      setStats({
        totalApplications: 2845,
        pendingApplications: 324,
        resolvedApplications: 2356,
        activeUsers: 15845,
        revenue: 1750000,
        satisfactionRate: 92,
        userApplications: 0,
        userPendingApplications: 0
      });
    } else {
      // User stats
      setStats({
        totalApplications: 4,
        pendingApplications: 2,
        resolvedApplications: 2,
        activeUsers: 0,
        revenue: 0,
        satisfactionRate: 0,
        userApplications: 4,
        userPendingApplications: 2
      });
    }
  }, [isAdmin]);

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
      case 'resolved':
        return (
          <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
            मंजूर/सोडवले
          </Badge>
        );
      case 'pending':
        return (
          <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>
            प्रलंबित
          </Badge>
        );
      case 'processing':
        return (
          <Badge className='bg-blue-100 text-blue-800 hover:bg-blue-100'>
            प्रक्रियारत
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className='bg-red-100 text-red-800 hover:bg-red-100'>
            नकार
          </Badge>
        );
      default:
        return (
          <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>
            {status}
          </Badge>
        );
    }
  };

  // Get announcement badge
  const getAnnouncementBadge = (type: string) => {
    switch (type) {
      case 'important':
        return <Badge className='bg-red-100 text-red-800'>महत्त्वाचे</Badge>;
      case 'update':
        return <Badge className='bg-blue-100 text-blue-800'>अद्यतन</Badge>;
      case 'event':
        return <Badge className='bg-green-100 text-green-800'>कार्यक्रम</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>सामान्य</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>
              प्रवेश आवश्यक
            </CardTitle>
            <CardDescription className='text-center'>
              कृपया डॅशबोर्ड पाहण्यासाठी लॉगिन करा
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex flex-col items-center space-y-3'>
              <div className='rounded-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] p-4'>
                <Lock className='h-12 w-12 text-white' />
              </div>
              <p className='text-center text-gray-600'>
                हे पृष्ठ फक्त प्रमाणित वापरकर्त्यांसाठी उपलब्ध आहे. कृपया लॉगिन
                करा किंवा नोंदणी करा.
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <Button
                className='bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] text-white'
                onClick={() => router.push('/auth/sign-in')}
              >
                लॉगिन करा
              </Button>
              <Button
                variant='outline'
                onClick={() => router.push('/auth/sign-up')}
              >
                नोंदणी करा
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              शेगांव नगर परिषद {isAdmin ? 'प्रशासन' : 'नागरिक पोर्टल'}
            </h1>
            <p className='text-gray-600'>
              {isAdmin
                ? 'सर्व सार्वजनिक सेवांचे व्यवस्थापन पोर्टल'
                : 'सर्व सार्वजनिक सेवा एकाच ठिकाणी'}
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] text-white'>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className='hidden md:block'>
                <p className='font-medium'>{user?.name || 'वापरकर्ता'}</p>
                <p className='text-sm text-gray-500'>
                  {isAdmin ? 'प्रशासक' : 'नागरिक'}
                </p>
              </div>
            </div>
            {!isAdmin && (
              <Button className='bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] hover:from-[#7a1e4f] hover:to-[#5a1a3a]'>
                <Plus className='mr-2 h-4 w-4' />
                नवीन अर्ज
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>{stat.title}</p>
                  <h3 className='mt-1 text-2xl font-bold'>{stat.value}</h3>

                  <div className='mt-2 flex items-center'>
                    {stat.change.startsWith('+') && (
                      <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                    )}
                    {stat.change.startsWith('-') && (
                      <TrendingDown className='mr-1 h-4 w-4 text-red-500' />
                    )}
                    <span className='text-sm text-gray-600'>{stat.change}</span>
                  </div>
                </div>

                <div
                  className={`rounded-lg bg-gradient-to-r p-3 ${stat.color}`}
                >
                  <stat.icon className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Left Column */}
        <div className='lg:col-span-2'>
          {isAdmin ? (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='space-y-4'
            >
              <TabsList className='grid grid-cols-3 lg:grid-cols-5'>
                <TabsTrigger value='overview'>आढावा</TabsTrigger>
                <TabsTrigger value='applications'>अर्ज व्यवस्थापन</TabsTrigger>
                <TabsTrigger value='services'>सेवा व्यवस्थापन</TabsTrigger>
                <TabsTrigger value='staff'>कर्मचारी व्यवस्थापन</TabsTrigger>
                <TabsTrigger value='reports'>अहवाल</TabsTrigger>
              </TabsList>

              {/* Overview Tab - Admin */}
              <TabsContent value='overview' className='space-y-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>सेवा श्रेण्या</CardTitle>
                    <CardDescription>
                      सर्व सार्वजनिक सेवांचे विभागानुसार वितरण
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                      {serviceCategories.map((category) => (
                        <Card
                          key={category.id}
                          className='cursor-pointer transition-shadow hover:shadow-lg'
                        >
                          <CardContent className='p-4'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-3'>
                                <div
                                  className={`rounded-lg bg-gradient-to-r p-2 ${category.color}`}
                                >
                                  <category.icon className='h-5 w-5 text-white' />
                                </div>
                                <div>
                                  <h4 className='font-medium'>
                                    {category.name}
                                  </h4>
                                  <p className='text-sm text-gray-500'>
                                    {'count' in category && (
                                      <p className='text-sm text-gray-500'>
                                        {category.count} सेवा
                                      </p>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant='outline'
                                className='bg-red-50 text-red-700'
                              >
                                {'pending' in category && (
                                  <Badge
                                    variant='outline'
                                    className='bg-red-50 text-red-700'
                                  >
                                    {category.pending} प्रलंबित
                                  </Badge>
                                )}
                              </Badge>
                            </div>
                            {'pending' in category && (
                              <Progress
                                value={100 - (category.pending / 300) * 100}
                                className='mt-4'
                              />
                            )}
                            <div className='mt-2 flex justify-between text-sm'>
                              <span className='text-gray-500'>प्रगती</span>
                              {'pending' in category && (
                                <span className='font-medium'>
                                  {Math.round(
                                    100 - (category.pending / 300) * 100
                                  )}
                                  %
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics - Admin */}
                <Card>
                  <CardHeader>
                    <CardTitle>विभाग कार्यक्षमता</CardTitle>
                    <CardDescription>सेवा दर आणि नागरी समाधान</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>विभाग</TableHead>
                          <TableHead className='text-center'>
                            कार्यक्षमता
                          </TableHead>
                          <TableHead className='text-center'>
                            समाधान दर
                          </TableHead>
                          <TableHead className='text-center'>
                            प्रलंबित अर्ज
                          </TableHead>
                          <TableHead className='text-center'>कृती</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {performanceMetrics.map((metric, index) => (
                          <TableRow key={index}>
                            <TableCell className='font-medium'>
                              {metric.department}
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Progress
                                  value={metric.efficiency}
                                  className='mr-2 w-full'
                                />
                                <span className='text-sm font-medium'>
                                  {metric.efficiency}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center justify-center'>
                                <Badge
                                  className={
                                    metric.satisfaction > 85
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }
                                >
                                  {metric.satisfaction}%
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className='text-center'>
                              <Badge variant='outline'>{metric.pending}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant='ghost' size='sm'>
                                <Eye className='mr-1 h-4 w-4' />
                                पाहा
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Management Tab - Admin */}
              <TabsContent value='applications' className='space-y-4'>
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div>
                        <CardTitle>अर्ज व्यवस्थापन</CardTitle>
                        <CardDescription>
                          सर्व प्रलंबित आणि प्रक्रियारत अर्ज
                        </CardDescription>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Select defaultValue='all'>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='स्थितीनुसार फिल्टर करा' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='all'>सर्व</SelectItem>
                            <SelectItem value='pending'>प्रलंबित</SelectItem>
                            <SelectItem value='processing'>
                              प्रक्रियारत
                            </SelectItem>
                            <SelectItem value='approved'>मंजूर</SelectItem>
                            <SelectItem value='rejected'>नकार</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant='outline'>
                          <Download className='mr-2 h-4 w-4' />
                          निर्यात करा
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>अर्ज ID</TableHead>
                          <TableHead>अर्जदार</TableHead>
                          <TableHead>सेवा</TableHead>
                          <TableHead>श्रेणी</TableHead>
                          <TableHead>सदर केले</TableHead>
                          <TableHead>स्थिती</TableHead>
                          <TableHead>प्राधान्य</TableHead>
                          <TableHead className='text-right'>कृती</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentApplications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className='font-medium'>
                              {app.id}
                            </TableCell>
                            <TableCell>{app.applicant}</TableCell>
                            <TableCell>{app.service}</TableCell>
                            <TableCell>{app.category}</TableCell>
                            <TableCell>{app.submitted}</TableCell>
                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                            <TableCell>
                              {app.priority === 'high' ? (
                                <Badge variant='destructive'>उच्च</Badge>
                              ) : app.priority === 'medium' ? (
                                <Badge className='bg-yellow-500 hover:bg-yellow-600'>
                                  मध्यम
                                </Badge>
                              ) : (
                                <Badge className='bg-green-500 hover:bg-green-600'>
                                  कमी
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className='text-right'>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant='ghost' size='sm'>
                                    <MoreVertical className='h-4 w-4' />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                  <DropdownMenuItem>
                                    <Eye className='mr-2 h-4 w-4' />
                                    पाहा
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className='mr-2 h-4 w-4' />
                                    संपादित करा
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CheckCircle className='mr-2 h-4 w-4' />
                                    मंजूर करा
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className='text-red-600'>
                                    <XCircle className='mr-2 h-4 w-4' />
                                    नकार द्या
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Staff Management Tab - Admin */}
              <TabsContent value='staff' className='space-y-4'>
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div>
                        <CardTitle>कर्मचारी व्यवस्थापन</CardTitle>
                        <CardDescription>
                          सर्व कर्मचारी तपशील आणि कार्यक्षमता
                        </CardDescription>
                      </div>
                      <Button className='bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'>
                        <UserPlus className='mr-2 h-4 w-4' />
                        नवीन कर्मचारी
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>कर्मचारी ID</TableHead>
                          <TableHead>नाव</TableHead>
                          <TableHead>विभाग</TableHead>
                          <TableHead>पद</TableHead>
                          <TableHead>संपर्क</TableHead>
                          <TableHead>स्थिती</TableHead>
                          <TableHead>हाताळलेले अर्ज</TableHead>
                          <TableHead className='text-right'>कृती</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staffMembers.map((staff) => (
                          <TableRow key={staff.id}>
                            <TableCell className='font-medium'>
                              {staff.id}
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center space-x-3'>
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] text-white'>
                                  {staff.name.charAt(0)}
                                </div>
                                <span>{staff.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{staff.department}</TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>
                              <div className='space-y-1'>
                                <div className='text-sm'>{staff.email}</div>
                                <div className='text-sm text-gray-500'>
                                  {staff.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {staff.status === 'active' ? (
                                <Badge className='bg-green-100 text-green-800'>
                                  सक्रिय
                                </Badge>
                              ) : (
                                <Badge className='bg-yellow-100 text-yellow-800'>
                                  रजेवर
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className='flex items-center'>
                                <Progress
                                  value={
                                    (staff.applicationsHandled / 300) * 100
                                  }
                                  className='mr-2 w-24'
                                />
                                <span>{staff.applicationsHandled}</span>
                              </div>
                            </TableCell>
                            <TableCell className='text-right'>
                              <Button variant='ghost' size='sm'>
                                <Edit className='h-4 w-4' />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            // User View
            <div className='space-y-6'>
              {/* User's Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>माझे अलीकडील अर्ज</CardTitle>
                  <CardDescription>
                    तुमच्या सर्व अर्जांची स्थिती
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>अर्ज ID</TableHead>
                        <TableHead>सेवा</TableHead>
                        <TableHead>सदर केले</TableHead>
                        <TableHead>स्थिती</TableHead>
                        <TableHead>अंतिम अद्यतन</TableHead>
                        <TableHead className='text-right'>कृती</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userApplications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className='font-medium'>
                            {app.id}
                          </TableCell>
                          <TableCell>{app.service}</TableCell>
                          <TableCell>{app.submitted}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>{app.lastUpdate}</TableCell>
                          <TableCell className='text-right'>
                            <Button variant='ghost' size='sm'>
                              <Eye className='h-4 w-4' />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => router.push('/my-applications')}
                  >
                    सर्व अर्ज पाहा
                  </Button>
                </CardFooter>
              </Card>

              {/* Service Categories for Users */}
              <Card>
                <CardHeader>
                  <CardTitle>लोकप्रिय सेवा</CardTitle>
                  <CardDescription>
                    वारंवार वापरल्या जाणाऱ्या सार्वजनिक सेवा
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {serviceCategories.map((service) => (
                      <Card
                        key={service.id}
                        className='cursor-pointer transition-shadow hover:border-[#b01d4f] hover:shadow-lg'
                        onClick={() => router.push(`/services/${service.id}`)}
                      >
                        <CardContent className='p-4'>
                          <div className='flex items-center space-x-3'>
                            <div
                              className={`rounded-lg bg-gradient-to-r p-3 ${service.color}`}
                            >
                              <service.icon className='h-6 w-6 text-white' />
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-medium'>{service.name}</h4>
                              {'description' in service && (
                                <p className='mt-1 text-sm text-gray-500'>
                                  {service.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button variant='ghost' className='mt-4 w-full'>
                            <span>सेवा घ्या</span>
                            <ChevronRight className='ml-2 h-4 w-4' />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Right Column - Quick Actions and Notifications */}

        <div className='space-y-6'>
          {/* Quick Actions */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>द्रुत कृती</CardTitle>
                <CardDescription>
                  वारंवार वापरल्या जाणाऱ्या कार्ये
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant='outline'
                    className={`w-full justify-start ${action.color} border-0 text-white hover:opacity-90`}
                    onClick={action.onClick}
                  >
                    <action.icon className='mr-2 h-4 w-4' />
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Admin: Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>अलीकडील क्रियाकलाप</CardTitle>
              <CardDescription>सिस्टीममधील नवीनतम बदल</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  {
                    user: 'स्मिता जोशी',
                    action: 'जन्म प्रमाणपत्र मंजूर केले',
                    time: '५ मिनिटांपूर्वी'
                  },
                  {
                    user: 'अनिल कुमार',
                    action: 'नवीन तक्रार नोंदवली',
                    time: '१० मिनिटांपूर्वी'
                  },
                  {
                    user: 'प्रिया शर्मा',
                    action: 'दुकान परवाना नकार दिला',
                    time: '३० मिनिटांपूर्वी'
                  }
                ].map((activity, index) => (
                  <div key={index} className='flex items-start space-x-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] text-sm text-white'>
                      {activity.user.charAt(0)}
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm'>
                        <span className='font-medium'>{activity.user}</span> ने{' '}
                        {activity.action}
                      </p>
                      <p className='text-xs text-gray-500'>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>सेवा स्थिती</CardTitle>
              <CardDescription>सर्व सेवांची वर्तमान स्थिती</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {[
                {
                  service: 'ऑनलाइन अर्ज प्रणाली',
                  status: 'operational',
                  icon: CheckCircle
                },
                {
                  service: 'पेमेंट गेटवे',
                  status: 'operational',
                  icon: CheckCircle
                },
                {
                  service: 'सर्व्हर स्थिती',
                  status: 'operational',
                  icon: CheckCircle
                },
                {
                  service: 'डेटाबेस बॅकअप',
                  status: 'operational',
                  icon: CheckCircle
                }
              ].map((item, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <item.icon className='h-5 w-5 text-green-500' />
                    <span className='text-sm'>{item.service}</span>
                  </div>
                  <Badge>सक्रिय</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className='mt-8 border-t pt-6'>
        <div className='flex flex-col items-center justify-between text-sm text-gray-500 md:flex-row'>
          <div>
            © {new Date().getFullYear()} शेगांव नगर परिषद. सर्व हक्क राखीव.
          </div>
          <div className='mt-2 flex space-x-4 md:mt-0'>
            <span>संस्करण: २.४.१</span>
            <span>अंतिम अद्यतन: २० मार्च २०२४</span>
            <span>समर्थन: support@shegaon.gov.in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

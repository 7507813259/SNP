'use client';
import PageContainer from '@/components/layout/page-container';
import ImprovedDataTable, {
  ImprovedDataTableRef
} from '@/components/table/ImprovedDataTable';
import { Button } from '@/components/ui/button';
import { GetCall } from '@/lib/apiClient';
import { INITIAL_LIMIT, INITIAL_PAGE } from '@/utils/constant';
import { buildQueryParams } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  MessageSquare,
  Building,
  Home,
  Droplets,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Users,
  AlertTriangle
} from 'lucide-react';

const getDummyActivities = () => [
  {
    id: '1',
    description: 'जन्म प्रमाणपत्र अर्ज मंजूर केला',
    details: 'अर्ज ID: APP-2024-001234',
    userName: 'स्मिता जोशी',
    userType: 'staff',
    activityType: 'application_approved',
    service: 'birth-certificate',
    timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    ipAddress: '192.168.1.101'
  },
  {
    id: '2',
    description: 'नवीन तक्रार नोंदवली',
    details: 'पाणीपुरवठा समस्या',
    userName: 'राजेश पाटील',
    userType: 'citizen',
    activityType: 'grievance_created',
    service: 'grievance',
    timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    ipAddress: '103.45.67.89'
  },
  {
    id: '3',
    description: 'कर्मचारी लॉगिन केले',
    details: 'IP: 192.168.1.105',
    userName: 'अनिल कुमार',
    userType: 'staff',
    activityType: 'staff_login',
    service: null,
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    ipAddress: '192.168.1.105'
  },
  {
    id: '4',
    description: 'दुकान परवाना अर्ज नकार दिला',
    details: 'अपूर्ण कागदपत्रे',
    userName: 'प्रिया शर्मा',
    userType: 'staff',
    activityType: 'application_rejected',
    service: 'trade-license',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    ipAddress: '192.168.1.102'
  },
  {
    id: '5',
    description: 'बांधकाम परवानगी अर्ज अपडेट केला',
    details: 'अतिरिक्त कागदपत्रे जोडली',
    userName: 'राहुल वर्मा',
    userType: 'staff',
    activityType: 'application_updated',
    service: 'building-permission',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    ipAddress: '192.168.1.103'
  }
];
const activityTypeFilter = [
  { label: 'अर्ज तयार', value: 'application_created' },
  { label: 'अर्ज अपडेट', value: 'application_updated' },
  { label: 'अर्ज मंजूर', value: 'application_approved' },
  { label: 'अर्ज नकार', value: 'application_rejected' },
  { label: 'तक्रार नोंदवली', value: 'grievance_created' },
  { label: 'तक्रार सोडवली', value: 'grievance_resolved' },
  { label: 'कर्मचारी लॉगिन', value: 'staff_login' },
  { label: 'सिस्टीम अपडेट', value: 'system_update' }
];

const userTypeFilter = [
  { label: 'कर्मचारी', value: 'staff' },
  { label: 'नागरिक', value: 'citizen' },
  { label: 'प्रशासक', value: 'admin' },
  { label: 'सिस्टीम', value: 'system' }
];

function RecentActivityPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(10);
  const dataTableRef = useRef<ImprovedDataTableRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    staffActivities: 0,
    citizenActivities: 0
  });

  useEffect(() => {
    fetchData({
      page: INITIAL_PAGE,
      limit: INITIAL_LIMIT,
      sortOrder: 'desc',
      sortBy: 'timestamp'
    });
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use dummy stats
      setStats({
        total: 1248,
        today: 45,
        thisWeek: 245,
        staffActivities: 189,
        citizenActivities: 56
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values
      setStats({
        total: 1248,
        today: 45,
        thisWeek: 245,
        staffActivities: 189,
        citizenActivities: 56
      });
    }
  };

  const fetchData = async (params?: any) => {
    setIsLoading(true);
    const queryString = buildQueryParams(params);
    try {
      // Use dummy data
      const dummyData = {
        code: 'SUCCESS',
        data: getDummyActivities(),
        total: getDummyActivities().length
      };

      if (dummyData.code === 'SUCCESS') {
        setActivities(dummyData.data);
        setTotalRecords(dummyData.total);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      // Use dummy data as fallback
      setActivities(getDummyActivities());
      setTotalRecords(getDummyActivities().length);
      toast.error(err.message || 'माहिती मिळवताना त्रुटी आली.');
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application_approved':
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'application_rejected':
        return <XCircle className='h-4 w-4 text-red-500' />;
      case 'application_created':
      case 'application_updated':
        return <FileText className='h-4 w-4 text-blue-500' />;
      case 'grievance_created':
      case 'grievance_resolved':
        return <MessageSquare className='h-4 w-4 text-amber-500' />;
      case 'staff_login':
        return <User className='h-4 w-4 text-purple-500' />;
      case 'system_update':
        return <AlertTriangle className='h-4 w-4 text-gray-500' />;
      default:
        return <Clock className='h-4 w-4 text-gray-500' />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'application_approved':
        return <Badge className='bg-green-100 text-green-800'>मंजूर</Badge>;
      case 'application_rejected':
        return <Badge className='bg-red-100 text-red-800'>नकार</Badge>;
      case 'application_created':
        return <Badge className='bg-blue-100 text-blue-800'>नवीन</Badge>;
      case 'application_updated':
        return <Badge className='bg-indigo-100 text-indigo-800'>अपडेट</Badge>;
      case 'grievance_created':
        return <Badge className='bg-amber-100 text-amber-800'>तक्रार</Badge>;
      case 'grievance_resolved':
        return (
          <Badge className='bg-emerald-100 text-emerald-800'>सोडवली</Badge>
        );
      case 'staff_login':
        return <Badge className='bg-purple-100 text-purple-800'>लॉगिन</Badge>;
      case 'system_update':
        return <Badge className='bg-gray-100 text-gray-800'>सिस्टीम</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const getUserTypeBadge = (userType: string) => {
    switch (userType) {
      case 'staff':
        return <Badge className='bg-blue-100 text-blue-800'>कर्मचारी</Badge>;
      case 'citizen':
        return <Badge className='bg-green-100 text-green-800'>नागरिक</Badge>;
      case 'admin':
        return <Badge className='bg-purple-100 text-purple-800'>प्रशासक</Badge>;
      case 'system':
        return <Badge className='bg-gray-100 text-gray-800'>सिस्टीम</Badge>;
      default:
        return <Badge>{userType}</Badge>;
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'birth-certificate':
        return <Users className='h-4 w-4' />;
      case 'property-tax':
        return <Home className='h-4 w-4' />;
      case 'water-tax':
        return <Droplets className='h-4 w-4' />;
      case 'grievance':
        return <MessageSquare className='h-4 w-4' />;
      case 'building-permission':
        return <Building className='h-4 w-4' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'आत्ताच';
    if (diffMins < 60) return `${diffMins} मिनिटांपूर्वी`;
    if (diffHours < 24) return `${diffHours} तासांपूर्वी`;
    if (diffDays < 7) return `${diffDays} दिवसांपूर्वी`;

    return date.toLocaleDateString('mr-IN');
  };

  const columns = [
    {
      key: 'srNo',
      header: '#',
      body: (data: any, options: any) => <span>{options.rowIndex + 1}</span>,
      bodyStyle: { minWidth: 50, maxWidth: 50 }
    },
    {
      key: 'activity',
      header: 'क्रिया',
      field: 'description',
      filter: false,
      bodyStyle: { minWidth: 300, maxWidth: 400 },
      body: (data: any) => (
        <div className='flex items-start gap-3'>
          <div className='mt-1'>{getActivityIcon(data.activityType)}</div>
          <div>
            <p className='font-medium'>{data.description}</p>
            {data.details && (
              <p className='mt-1 text-sm text-gray-500'>{data.details}</p>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'user',
      header: 'वापरकर्ता',
      field: 'userName',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      filterPlaceholder: 'वापरकर्ता',
      body: (data: any) => (
        <div>
          <p className='font-medium'>{data.userName}</p>
          <div className='mt-1'>{getUserTypeBadge(data.userType)}</div>
        </div>
      )
    },
    {
      key: 'activityType',
      header: 'प्रकार',
      field: 'activityType',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: activityTypeFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'प्रकार',
      body: (data: any) => getActivityBadge(data.activityType)
    },
    {
      key: 'service',
      header: 'सेवा',
      field: 'service',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'सेवा',
      body: (data: any) =>
        data.service ? (
          <div className='flex items-center gap-2'>
            {getServiceIcon(data.service)}
            <span>{data.service}</span>
          </div>
        ) : (
          '-'
        )
    },
    {
      key: 'timestamp',
      header: 'वेळ',
      field: 'timestamp',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'वेळ',
      body: (data: any) => (
        <div>
          <p className='font-medium'>{formatTime(data.timestamp)}</p>
          <p className='text-sm text-gray-500'>
            {new Date(data.timestamp).toLocaleTimeString('mr-IN')}
          </p>
        </div>
      )
    },
    {
      key: 'ipAddress',
      header: 'IP पत्ता',
      field: 'ipAddress',
      filter: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'IP पत्ता',
      body: (data: any) => data.ipAddress || '-'
    }
  ];

  const handleExport = async () => {
    try {
      toast.info('क्रियाकलाप निर्यात करत आहे...');
      // Implement export logic
    } catch (error) {
      toast.error('निर्यात करताना त्रुटी आली.');
    }
  };

  const handleRefresh = () => {
    dataTableRef.current?.refreshData();
    fetchStats();
  };

  return (
    <PageContainer scrollable={false}>
      <div className='flex-shrink-0'>
        <div className='mb-6 flex w-full items-center justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-[#ffffff]'>
              अलीकडील क्रियाकलाप
            </h1>
            <p className='text-gray-600'>
              सिस्टीममधील सर्व अलीकडील क्रिया आणि इव्हेंट
            </p>
          </div>
          <div className='flex gap-3'>
            <Button variant='outline' onClick={handleExport}>
              <Download className='mr-2 h-4 w-4' />
              निर्यात करा
            </Button>
            <Button variant='outline' onClick={handleRefresh}>
              <RefreshCw className='mr-2 h-4 w-4' />
              रिफ्रेश करा
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
          {[
            {
              title: 'एकूण क्रिया',
              value: stats.total,
              icon: FileText,
              color: 'from-[#b01d4f] to-[#7a1e4f]',
              description: 'आजपासून'
            },
            {
              title: 'आजच्या क्रिया',
              value: stats.today,
              icon: Calendar,
              color: 'from-blue-500 to-blue-700',
              description: 'आजच्या दिवसात'
            },
            {
              title: 'कर्मचारी क्रिया',
              value: stats.staffActivities,
              icon: User,
              color: 'from-green-500 to-green-700',
              description: 'कर्मचारी क्रिया'
            },
            {
              title: 'नागरिक क्रिया',
              value: stats.citizenActivities,
              icon: Users,
              color: 'from-purple-500 to-purple-700',
              description: 'नागरिक क्रिया'
            }
          ].map((stat, index) => (
            <Card key={index} className='bg-white shadow-sm'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-500'>{stat.title}</p>
                    <h3 className='mt-1 text-2xl font-bold'>
                      {stat.value.toLocaleString()}
                    </h3>
                    <p className='mt-2 text-xs text-gray-500'>
                      {stat.description}
                    </p>
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

        {/* Activity Summary */}
        <Card className='mb-6'>
          <CardContent className='p-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {activityTypeFilter.slice(0, 4).map((type, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-lg bg-gray-50 p-3'
                >
                  <div className='flex items-center gap-3'>
                    {getActivityIcon(type.value)}
                    <span className='text-sm'>{type.label}</span>
                  </div>
                  <Badge variant='outline'>१२४</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ImprovedDataTable
        ref={dataTableRef}
        tableId='recent-activity'
        page={INITIAL_PAGE}
        limit={INITIAL_LIMIT}
        totalRecords={totalRecords}
        data={activities}
        columns={columns}
        loading={isLoading}
        filter={true}
        stripedRows={true}
        showGridlines={true}
        isView={false}
        isEdit={false}
        isDelete={false}
        onLoad={fetchData}
        // emptyMessage="क्रियाकलाप आढळले नाहीत"
        // searchPlaceholder="क्रियाकलाप शोधा..."
      />
    </PageContainer>
  );
}

export default RecentActivityPage;

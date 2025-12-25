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
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Droplets,
  Home,
  User,
  MapPin,
  Ruler,
  Wrench,
  FileCheck,
  TrendingUp,
  TrendingDown,
  FileText,
  AlertCircle,
  Building,
  Phone,
  Mail
} from 'lucide-react';

const getDummyWaterConnections = () => [
  {
    id: 'WC-2024-001',
    applicationId: 'WC-2024-001',
    applicantName: 'राजेश पाटील',
    mobileNumber: '९८७६५४३२१०',
    emailId: 'rajesh.patil@email.com',
    propertyAddress: '१२३, मुख्य रस्ता, शेगाव',
    connectionType: 'domestic',
    pipeSize: '20mm',
    applicationDate: '२०२४-०३-१५',
    status: 'approved',
    assignedTo: 'संजय गुप्ता',
    inspectionDate: '२०२४-०३-१८',
    completionDate: '२०२४-०३-२२',
    remarks: 'सर्व कागदपत्रे पूर्ण'
  },
  {
    id: 'WC-2024-002',
    applicationId: 'WC-2024-002',
    applicantName: 'सुनिता देशमुख',
    mobileNumber: '९८७६५४३२११',
    emailId: 'sunita.desh@email.com',
    propertyAddress: '४५६, नवीन नगर, शेगाव',
    connectionType: 'commercial',
    pipeSize: '25mm',
    applicationDate: '२०२४-०३-१४',
    status: 'processing',
    assignedTo: 'अनिल कुमार',
    inspectionDate: '२०२४-०३-१९',
    completionDate: '',
    remarks: 'निरीक्षण प्रलंबित'
  },
  {
    id: 'WC-2024-003',
    applicationId: 'WC-2024-003',
    applicantName: 'विक्रम जोशी',
    mobileNumber: '९८७६५४३२१२',
    emailId: 'vikram.joshi@email.com',
    propertyAddress: '७८९, जुन नगर, शेगाव',
    connectionType: 'domestic',
    pipeSize: '15mm',
    applicationDate: '२०२४-०३-१३',
    status: 'pending',
    assignedTo: 'प्रिया शर्मा',
    inspectionDate: '',
    completionDate: '',
    remarks: 'कागदपत्रे अपूर्ण'
  },
  {
    id: 'WC-2024-004',
    applicationId: 'WC-2024-004',
    applicantName: 'मीनाक्षी शर्मा',
    mobileNumber: '९८७६५४३२१३',
    emailId: 'meenakshi.sharma@email.com',
    propertyAddress: '१०१, वसई रोड, शेगाव',
    connectionType: 'industrial',
    pipeSize: '32mm',
    applicationDate: '२०२४-०३-१२',
    status: 'rejected',
    assignedTo: 'राहुल वर्मा',
    inspectionDate: '२०२४-०३-१६',
    completionDate: '',
    remarks: 'झोनिंग परवानगी नाही'
  },
  {
    id: 'WC-2024-005',
    applicationId: 'WC-2024-005',
    applicantName: 'अमित कुमार',
    mobileNumber: '९८७६५४३२१४',
    emailId: 'amit.kumar@email.com',
    propertyAddress: '२०२, अकोला रोड, शेगाव',
    connectionType: 'domestic',
    pipeSize: '20mm',
    applicationDate: '२०२४-०३-११',
    status: 'completed',
    assignedTo: 'संजय गुप्ता',
    inspectionDate: '२०२४-०३-१४',
    completionDate: '२०२४-०३-२०',
    remarks: 'यशस्वीरित्या पूर्ण'
  }
];

const connectionTypeFilter = [
  { label: 'घरगुती', value: 'domestic' },
  { label: 'व्यावसायिक', value: 'commercial' },
  { label: 'औद्योगिक', value: 'industrial' },
  { label: 'सार्वजनिक', value: 'public' },
  { label: 'कृषी', value: 'agricultural' }
];

const statusFilter = [
  { label: 'नवीन', value: 'new' },
  { label: 'प्रलंबित', value: 'pending' },
  { label: 'प्रक्रियारत', value: 'processing' },
  { label: 'मंजूर', value: 'approved' },
  { label: 'नकार', value: 'rejected' },
  { label: 'पूर्ण', value: 'completed' }
];

const pipeSizeFilter = [
  { label: '१५ मिमी (१/२")', value: '15mm' },
  { label: '२० मिमी (३/४")', value: '20mm' },
  { label: '२५ मिमी (१")', value: '25mm' },
  { label: '३२ मिमी (१.२५")', value: '32mm' },
  { label: '४० मिमी (१.५")', value: '40mm' }
];

function WaterConnectionPage() {
  const [waterConnections, setWaterConnections] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(10);
  const dataTableRef = useRef<ImprovedDataTableRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    completedApplications: 0,
    rejectedApplications: 0,
    avgProcessingTime: 0,
    thisMonthApplications: 0
  });

  useEffect(() => {
    fetchData({
      page: INITIAL_PAGE,
      limit: INITIAL_LIMIT,
      sortOrder: 'desc',
      sortBy: 'applicationDate'
    });
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use dummy stats
      setStats({
        totalApplications: 1245,
        pendingApplications: 124,
        approvedApplications: 856,
        completedApplications: 245,
        rejectedApplications: 20,
        avgProcessingTime: 5.2,
        thisMonthApplications: 45
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values
      setStats({
        totalApplications: 1245,
        pendingApplications: 124,
        approvedApplications: 856,
        completedApplications: 245,
        rejectedApplications: 20,
        avgProcessingTime: 5.2,
        thisMonthApplications: 45
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
        data: getDummyWaterConnections(),
        total: getDummyWaterConnections().length
      };

      if (dummyData.code === 'SUCCESS') {
        setWaterConnections(dummyData.data);
        setTotalRecords(dummyData.total);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      // Use dummy data as fallback
      setWaterConnections(getDummyWaterConnections());
      setTotalRecords(getDummyWaterConnections().length);
      toast.error(err.message || 'माहिती मिळवताना त्रुटी आली.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className='bg-green-100 text-green-800'>मंजूर</Badge>;
      case 'processing':
        return <Badge className='bg-blue-100 text-blue-800'>प्रक्रियारत</Badge>;
      case 'pending':
        return <Badge className='bg-yellow-100 text-yellow-800'>प्रलंबित</Badge>;
      case 'completed':
        return <Badge className='bg-emerald-100 text-emerald-800'>पूर्ण</Badge>;
      case 'rejected':
        return <Badge className='bg-red-100 text-red-800'>नकार</Badge>;
      case 'new':
        return <Badge className='bg-gray-100 text-gray-800'>नवीन</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getConnectionTypeIcon = (type: string) => {
    switch (type) {
      case 'domestic':
        return <Home className='h-4 w-4' />;
      case 'commercial':
        return <Building className='h-4 w-4' />;
      case 'industrial':
        return <Wrench className='h-4 w-4' />;
      default:
        return <Droplets className='h-4 w-4' />;
    }
  };

  const getPipeSizeBadge = (size: string) => {
    const sizeMap: { [key: string]: string } = {
      '15mm': '१५ मिमी',
      '20mm': '२० मिमी',
      '25mm': '२५ मिमी',
      '32mm': '३२ मिमी',
      '40mm': '४० मिमी'
    };
    return (
      <Badge className='bg-gray-100 text-gray-800'>
        {sizeMap[size] || size}
      </Badge>
    );
  };

  const formatDaysAgo = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    return `${diffDays} दिवस`;
  };

  const columns = [
    {
      key: 'srNo',
      header: '#',
      body: (data: any, options: any) => <span>{options.rowIndex + 1}</span>,
      bodyStyle: { minWidth: 50, maxWidth: 50 }
    },
    {
      key: 'applicationId',
      header: 'अर्ज ID',
      field: 'applicationId',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'अर्ज ID'
    },
    {
      key: 'applicantName',
      header: 'अर्जदाराचे नाव',
      field: 'applicantName',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      filterPlaceholder: 'अर्जदाराचे नाव'
    },
    {
      key: 'mobileNumber',
      header: 'मोबाईल',
      field: 'mobileNumber',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'मोबाईल'
    },
    {
      key: 'connectionType',
      header: 'कनेक्शन प्रकार',
      field: 'connectionType',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: connectionTypeFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'प्रकार',
      body: (data: any) => (
        <div className='flex items-center gap-2'>
          {getConnectionTypeIcon(data.connectionType)}
          <span>
            {connectionTypeFilter.find((t) => t.value === data.connectionType)
              ?.label || data.connectionType}
          </span>
        </div>
      )
    },
    {
      key: 'pipeSize',
      header: 'पाईप आकार',
      field: 'pipeSize',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: pipeSizeFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'आकार',
      body: (data: any) => getPipeSizeBadge(data.pipeSize)
    },
    {
      key: 'status',
      header: 'स्थिती',
      field: 'status',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: statusFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'स्थिती',
      body: (data: any) => getStatusBadge(data.status)
    },
    {
      key: 'applicationDate',
      header: 'अर्ज दिनांक',
      field: 'applicationDate',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'दिनांक'
    },
    {
      key: 'processingTime',
      header: 'प्रक्रिया वेळ',
      field: 'applicationDate',
      filter: false,
      sortable: false,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      body: (data: any) => (
        <div className='text-center'>
          <div className='font-medium'>{formatDaysAgo(data.applicationDate)}</div>
          <div className='text-xs text-gray-500'>पासून</div>
        </div>
      )
    },
    {
      key: 'assignedTo',
      header: 'देय',
      field: 'assignedTo',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'देय',
      body: (data: any) => data.assignedTo || '-'
    },
    {
      key: 'inspectionDate',
      header: 'निरीक्षण दिनांक',
      field: 'inspectionDate',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'निरीक्षण',
      body: (data: any) => data.inspectionDate || '-'
    }
  ];

  const handleExport = async () => {
    try {
      toast.info('नळ कनेक्शन अर्ज निर्यात करत आहे...');
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
              नवीन नळ कनेक्शन अर्ज व्यवस्थापन
            </h1>
            <p className='text-gray-600'>
              सर्व नळ कनेक्शन अर्जांचे व्यवस्थापन आणि निरीक्षण
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
              title: 'एकूण अर्ज',
              value: stats.totalApplications.toLocaleString(),
              icon: FileText,
              color: 'from-[#b01d4f] to-[#7a1e4f]',
              change: '+8.5%',
              description: 'आजपासून'
            },
            {
              title: 'प्रलंबित अर्ज',
              value: stats.pendingApplications.toLocaleString(),
              icon: Clock,
              color: 'from-yellow-500 to-yellow-700',
              change: '-3.2%',
              description: 'एकूणाच्या १०%'
            },
            {
              title: 'मंजूर अर्ज',
              value: stats.approvedApplications.toLocaleString(),
              icon: CheckCircle,
              color: 'from-green-500 to-green-700',
              change: '+12.3%',
              description: 'एकूणाच्या ६९%'
            },
            {
              title: 'पूर्ण कनेक्शन',
              value: stats.completedApplications.toLocaleString(),
              icon: FileCheck,
              color: 'from-emerald-500 to-emerald-700',
              change: '+5.8%',
              description: 'या वर्षीचे'
            }
          ].map((stat, index) => (
            <Card key={index} className='bg-white shadow-sm'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-500'>{stat.title}</p>
                    <h3 className='mt-1 text-2xl font-bold'>{stat.value}</h3>
                    <div className='mt-2 flex items-center'>
                      {stat.change.startsWith('+') ? (
                        <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                      ) : (
                        <TrendingDown className='mr-1 h-4 w-4 text-red-500' />
                      )}
                      <span
                        className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {stat.change}
                      </span>
                      <span className='ml-2 text-xs text-gray-500'>
                        {stat.description}
                      </span>
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

        {/* Additional Stats */}
        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>नकार दिलेले अर्ज</p>
                  <h3 className='mt-1 text-2xl font-bold'>
                    {stats.rejectedApplications.toLocaleString()}
                  </h3>
                  <p className='mt-2 text-xs text-gray-500'>
                    एकूण अर्जांच्या २%
                  </p>
                </div>
                <div className='rounded-lg bg-gradient-to-r from-red-500 to-red-700 p-3'>
                  <XCircle className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>सरासरी प्रक्रिया वेळ</p>
                  <h3 className='mt-1 text-2xl font-bold'>
                    {stats.avgProcessingTime} दिवस
                  </h3>
                  <p className='mt-2 text-xs text-gray-500'>
                    मंजुरीपासून पूर्णतेपर्यंत
                  </p>
                </div>
                <div className='rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-3'>
                  <Calendar className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>या महिन्यातील अर्ज</p>
                  <h3 className='mt-1 text-2xl font-bold'>
                    {stats.thisMonthApplications}
                  </h3>
                  <p className='mt-2 text-xs text-gray-500'>
                    मार्च २०२४
                  </p>
                </div>
                <div className='rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 p-3'>
                  <Droplets className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connection Type Summary */}
        <Card className='mb-6'>
          <CardContent className='p-6'>
            <h3 className='mb-4 text-lg font-semibold'>कनेक्शन प्रकारानुसार विभागणी</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {connectionTypeFilter.slice(0, 4).map((type, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-lg bg-gray-50 p-3'
                >
                  <div className='flex items-center gap-3'>
                    {getConnectionTypeIcon(type.value)}
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
        tableId='water-connection-management'
        page={INITIAL_PAGE}
        limit={INITIAL_LIMIT}
        totalRecords={totalRecords}
        data={waterConnections}
        columns={columns}
        loading={isLoading}
        filter={true}
        stripedRows={true}
        showGridlines={true}
        isView={true}
        isEdit={true}
        isDelete={true}
        onLoad={fetchData}
        // emptyMessage="नळ कनेक्शन अर्ज आढळले नाहीत"
        // searchPlaceholder="नळ कनेक्शन शोधा..."
      />
    </PageContainer>
  );
}

export default WaterConnectionPage;
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
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  MessageSquare,
  Building,
  Home,
  Droplets,
  Shield,
  Landmark,
  Stethoscope,
  Flame,
  Award,
  Download,
  Filter,
  BarChart3,
  Target,
  Award as AwardIcon
} from 'lucide-react';

// For Department Efficiency Page
const getDummyDepartments = () => [
  {
    id: 'citizen-services',
    name: 'नागरिक सेवा',
    efficiency: 92,
    efficiencyChange: 3.2,
    satisfaction: 88,
    satisfactionChange: 1.8,
    totalApplications: 845,
    resolvedApplications: 785,
    pendingApplications: 60,
    avgProcessingTime: 2.5,
    performanceScore: 94,
    staffCount: 15
  },
  {
    id: 'grievance-services',
    name: 'तक्रार निवारण',
    efficiency: 85,
    efficiencyChange: 2.1,
    satisfaction: 82,
    satisfactionChange: 0.5,
    totalApplications: 623,
    resolvedApplications: 550,
    pendingApplications: 73,
    avgProcessingTime: 3.2,
    performanceScore: 87,
    staffCount: 12
  },
  {
    id: 'license-department',
    name: 'परवाना विभाग',
    efficiency: 78,
    efficiencyChange: -1.5,
    satisfaction: 75,
    satisfactionChange: -0.8,
    totalApplications: 512,
    resolvedApplications: 425,
    pendingApplications: 87,
    avgProcessingTime: 5.1,
    performanceScore: 79,
    staffCount: 10
  },
  {
    id: 'town-planning',
    name: 'नगर नियोजन',
    efficiency: 88,
    efficiencyChange: 4.2,
    satisfaction: 85,
    satisfactionChange: 2.3,
    totalApplications: 421,
    resolvedApplications: 385,
    pendingApplications: 36,
    avgProcessingTime: 4.2,
    performanceScore: 90,
    staffCount: 8
  },
  {
    id: 'water-supply',
    name: 'पाणीपुरवठा',
    efficiency: 90,
    efficiencyChange: 2.8,
    satisfaction: 87,
    satisfactionChange: 1.5,
    totalApplications: 389,
    resolvedApplications: 365,
    pendingApplications: 24,
    avgProcessingTime: 2.8,
    performanceScore: 92,
    staffCount: 14
  }
];
const departmentFilter = [
  { label: 'नागरिक सेवा', value: 'citizen-services' },
  { label: 'तक्रार निवारण', value: 'grievance-services' },
  { label: 'परवाना विभाग', value: 'license-department' },
  { label: 'नगर नियोजन', value: 'town-planning' },
  { label: 'स्वच्छता विभाग', value: 'sanitation' },
  { label: 'पाणीपुरवठा', value: 'water-supply' },
  { label: 'अग्निशमन', value: 'fire-department' },
  { label: 'कर विभाग', value: 'tax-department' }
];

const efficiencyFilter = [
  { label: 'उच्च (९०%+)', value: 'high' },
  { label: 'चांगली (७०-८९%)', value: 'good' },
  { label: 'सामान्य (५०-६९%)', value: 'average' },
  { label: 'कमी (५०% खाली)', value: 'low' }
];

function DepartmentEfficiencyPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(10);
  const dataTableRef = useRef<ImprovedDataTableRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [overallStats, setOverallStats] = useState({
    avgEfficiency: 0,
    avgSatisfaction: 0,
    totalApplications: 0,
    resolvedApplications: 0
  });

  useEffect(() => {
    fetchData({
      page: INITIAL_PAGE,
      limit: INITIAL_LIMIT,
      sortOrder: 'desc',
      sortBy: 'efficiency'
    });
    fetchOverallStats();
  }, []);

  const fetchOverallStats = async () => {
    try {
      //   const response = await GetCall('/api/departments/stats');
      setOverallStats({
        avgEfficiency: 85,
        avgSatisfaction: 83,
        totalApplications: 2500,
        resolvedApplications: 2100
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values
      setOverallStats({
        avgEfficiency: 85,
        avgSatisfaction: 83,
        totalApplications: 2500,
        resolvedApplications: 2100
      });
    }
  };

  const fetchData = async (params?: any) => {
    setIsLoading(true);
    const queryString = buildQueryParams(params);
    try {
      //   const response = await GetCall(
      //     `/api/departments/efficiency?${queryString}`
      //   );
      const dummyData = {
        code: 'SUCCESS',
        data: getDummyDepartments(),
        total: getDummyDepartments().length
      };

      if (dummyData.code === 'SUCCESS') {
        setDepartments(dummyData.data);
        setTotalRecords(dummyData.total);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      // Use dummy data as fallback
      setDepartments(getDummyDepartments());
      setTotalRecords(getDummyDepartments().length);
      toast.error(err.message || 'माहिती मिळवताना त्रुटी आली.');
    } finally {
      setIsLoading(false);
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'citizen-services':
        return <Users className='h-5 w-5' />;
      case 'grievance-services':
        return <MessageSquare className='h-5 w-5' />;
      case 'license-department':
        return <FileText className='h-5 w-5' />;
      case 'town-planning':
        return <Building className='h-5 w-5' />;
      case 'sanitation':
        return <Stethoscope className='h-5 w-5' />;
      case 'water-supply':
        return <Droplets className='h-5 w-5' />;
      case 'fire-department':
        return <Flame className='h-5 w-5' />;
      case 'tax-department':
        return <Landmark className='h-5 w-5' />;
      default:
        return <Shield className='h-5 w-5' />;
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'citizen-services':
        return 'from-[#b01d4f] to-[#7a1e4f]';
      case 'grievance-services':
        return 'from-amber-500 to-amber-700';
      case 'license-department':
        return 'from-blue-500 to-blue-700';
      case 'town-planning':
        return 'from-green-500 to-green-700';
      case 'sanitation':
        return 'from-emerald-500 to-emerald-700';
      case 'water-supply':
        return 'from-cyan-500 to-cyan-700';
      case 'fire-department':
        return 'from-red-500 to-red-700';
      case 'tax-department':
        return 'from-purple-500 to-purple-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 90) {
      return <Badge className='bg-green-100 text-green-800'>उत्कृष्ट</Badge>;
    } else if (efficiency >= 70) {
      return <Badge className='bg-blue-100 text-blue-800'>चांगली</Badge>;
    } else if (efficiency >= 50) {
      return <Badge className='bg-yellow-100 text-yellow-800'>सामान्य</Badge>;
    } else {
      return <Badge className='bg-red-100 text-red-800'>सुधारणा आवश्यक</Badge>;
    }
  };

  const getSatisfactionBadge = (satisfaction: number) => {
    if (satisfaction >= 85) {
      return <Badge className='bg-green-100 text-green-800'>उत्तम</Badge>;
    } else if (satisfaction >= 70) {
      return <Badge className='bg-blue-100 text-blue-800'>चांगली</Badge>;
    } else if (satisfaction >= 50) {
      return <Badge className='bg-yellow-100 text-yellow-800'>सामान्य</Badge>;
    } else {
      return <Badge className='bg-red-100 text-red-800'>कमी</Badge>;
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className='h-4 w-4 text-green-500' />;
    } else if (change < 0) {
      return <TrendingDown className='h-4 w-4 text-red-500' />;
    }
    return null;
  };

  const columns = [
    {
      key: 'srNo',
      header: '#',
      body: (data: any, options: any) => <span>{options.rowIndex + 1}</span>,
      bodyStyle: { minWidth: 50, maxWidth: 50 }
    },
    {
      key: 'department',
      header: 'विभाग',
      field: 'name',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: departmentFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 180, maxWidth: 200 },
      filterPlaceholder: 'विभाग',
      body: (data: any) => (
        <div className='flex items-center gap-3'>
          <div
            className={`rounded-lg bg-gradient-to-r p-2 ${getDepartmentColor(data.id)}`}
          >
            {getDepartmentIcon(data.id)}
          </div>
          <div>
            <p className='font-medium'>{data.name}</p>
            <p className='text-sm text-gray-500'>{data.staffCount} कर्मचारी</p>
          </div>
        </div>
      )
    },
    {
      key: 'efficiency',
      header: 'कार्यक्षमता',
      field: 'efficiency',
      filter: false,
      sortable: true,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      body: (data: any) => (
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm'>{data.efficiency}%</span>
            {getEfficiencyBadge(data.efficiency)}
          </div>
          <Progress value={data.efficiency} className='h-2' />
          <div className='flex items-center text-xs text-gray-500'>
            {getTrendIcon(data.efficiencyChange)}
            <span
              className={`ml-1 ${data.efficiencyChange > 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {data.efficiencyChange > 0 ? '+' : ''}
              {data.efficiencyChange}%
            </span>
            <span className='ml-2'>गेल्या महिन्यापेक्षा</span>
          </div>
        </div>
      )
    },
    {
      key: 'satisfaction',
      header: 'समाधान दर',
      field: 'satisfaction',
      filter: false,
      sortable: true,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      body: (data: any) => (
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm'>{data.satisfaction}%</span>
            {getSatisfactionBadge(data.satisfaction)}
          </div>
          <Progress value={data.satisfaction} className='h-2' />
          <div className='flex items-center text-xs text-gray-500'>
            {getTrendIcon(data.satisfactionChange)}
            <span
              className={`ml-1 ${data.satisfactionChange > 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {data.satisfactionChange > 0 ? '+' : ''}
              {data.satisfactionChange}%
            </span>
            <span className='ml-2'>गेल्या महिन्यापेक्षा</span>
          </div>
        </div>
      )
    },
    {
      key: 'applications',
      header: 'अर्ज तपशील',
      field: 'totalApplications',
      filter: false,
      sortable: true,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      body: (data: any) => (
        <div className='space-y-2'>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div className='rounded bg-blue-50 p-2 text-center'>
              <div className='font-semibold'>{data.totalApplications}</div>
              <div className='text-xs text-gray-500'>एकूण</div>
            </div>
            <div className='rounded bg-green-50 p-2 text-center'>
              <div className='font-semibold'>{data.resolvedApplications}</div>
              <div className='text-xs text-gray-500'>सोडवले</div>
            </div>
          </div>
          <div className='text-xs text-gray-500'>
            सरासरी वेळ: {data.avgProcessingTime} दिवस
          </div>
        </div>
      )
    },
    {
      key: 'pending',
      header: 'प्रलंबित',
      field: 'pendingApplications',
      filter: false,
      sortable: true,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      body: (data: any) => (
        <div className='text-center'>
          <div
            className={`text-lg font-bold ${data.pendingApplications > 50 ? 'text-red-600' : 'text-green-600'}`}
          >
            {data.pendingApplications}
          </div>
          <div className='text-xs text-gray-500'>अर्ज</div>
        </div>
      )
    },
    {
      key: 'performance',
      header: 'कामगिरी',
      field: 'performanceScore',
      filter: false,
      sortable: true,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      body: (data: any) => (
        <div className='text-center'>
          <div className='text-lg font-bold'>{data.performanceScore}</div>
          <div className='text-xs text-gray-500'>गुण</div>
        </div>
      )
    }
  ];

  const handleExport = async () => {
    try {
      toast.info('कार्यक्षमता अहवाल निर्यात करत आहे...');
      // Implement export logic
    } catch (error) {
      toast.error('निर्यात करताना त्रुटी आली.');
    }
  };

  const handleRefresh = () => {
    dataTableRef.current?.refreshData();
    fetchOverallStats();
  };

  return (
    <PageContainer scrollable={false}>
      <div className='flex-shrink-0'>
        <div className='mb-6 flex w-full items-center justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-[#ffffff]'>
              विभाग कार्यक्षमता
            </h1>
            <p className='text-gray-600'>
              सर्व विभागांची कार्यक्षमता आणि कामगिरी विश्लेषण
            </p>
          </div>
          <div className='flex gap-3'>
            <Button variant='outline' onClick={handleExport}>
              <Download className='mr-2 h-4 w-4' />
              निर्यात करा
            </Button>
            <Button variant='outline' onClick={handleRefresh}>
              <Filter className='mr-2 h-4 w-4' />
              फिल्टर करा
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
          {[
            {
              title: 'सरासरी कार्यक्षमता',
              value: `${overallStats.avgEfficiency}%`,
              icon: BarChart3,
              color: 'from-[#b01d4f] to-[#7a1e4f]',
              change: '+3.2%',
              description: 'सर्व विभागांची सरासरी'
            },
            {
              title: 'सरासरी समाधान',
              value: `${overallStats.avgSatisfaction}%`,
              icon: Target,
              color: 'from-green-500 to-green-700',
              change: '+1.8%',
              description: 'नागरी समाधान दर'
            },
            {
              title: 'एकूण अर्ज',
              value: overallStats.totalApplications.toLocaleString(),
              icon: FileText,
              color: 'from-blue-500 to-blue-700',
              change: '+12.5%',
              description: 'ह्या महिन्यात'
            },
            {
              title: 'सोडवलेले अर्ज',
              value: overallStats.resolvedApplications.toLocaleString(),
              icon: CheckCircle,
              color: 'from-emerald-500 to-emerald-700',
              change: '+8.7%',
              description: 'यशस्वी प्रक्रिया'
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
                        className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {stat.change}
                      </span>
                      <span className='ml-2 text-sm text-gray-500'>
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

        {/* Top Performing Departments */}
        <Card className='mb-6'>
          <CardContent className='p-6'>
            <h3 className='mb-4 text-lg font-semibold'>
              शीर्ष कामगिरीचे विभाग
            </h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              {departments.slice(0, 3).map((dept, index) => (
                <div key={index} className='rounded-lg border p-4'>
                  <div className='mb-3 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`rounded-lg bg-gradient-to-r p-2 ${getDepartmentColor(dept.id)}`}
                      >
                        {getDepartmentIcon(dept.id)}
                      </div>
                      <div>
                        <h4 className='font-medium'>{dept.name}</h4>
                        <p className='text-sm text-gray-500'>
                          {index + 1} स्थान
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant='outline'
                      className='bg-green-50 text-green-700'
                    >
                      <AwardIcon className='mr-1 h-3 w-3' />
                      शीर्ष
                    </Badge>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>कार्यक्षमता</span>
                      <span className='font-semibold'>{dept.efficiency}%</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>समाधान दर</span>
                      <span className='font-semibold'>
                        {dept.satisfaction}%
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>सोडवलेले अर्ज</span>
                      <span className='font-semibold'>
                        {dept.resolvedApplications}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ImprovedDataTable
        ref={dataTableRef}
        tableId='department-efficiency'
        page={INITIAL_PAGE}
        limit={INITIAL_LIMIT}
        totalRecords={totalRecords}
        data={departments}
        columns={columns}
        loading={isLoading}
        filter={true}
        stripedRows={true}
        showGridlines={true}
        isView={true}
        isEdit={false}
        isDelete={false}
        onLoad={fetchData}
        onView={(item: any) => {
          toast.info(`${item.name} विभागाचे तपशील पाहणे सुरु करत आहे...`);
        }}
        // emptyMessage="विभाग माहिती आढळली नाही"
        // searchPlaceholder="विभाग शोधा..."
      />
    </PageContainer>
  );
}

export default DepartmentEfficiencyPage;

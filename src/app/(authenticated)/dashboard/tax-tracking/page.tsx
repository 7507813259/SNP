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
  Home,
  Droplets,
  Building,
  Receipt,
  CreditCard,
  Wallet,
  TrendingUp,
  TrendingDown,
  FileText,
  AlertCircle,
  Landmark,
  Users
} from 'lucide-react';
const getDummyTaxPayments = () => [
  {
    id: 'TAX-2024-001',
    applicationId: 'TAX-2024-001',
    propertyId: 'PROP-001234',
    applicantName: 'राजेश पाटील',
    mobileNumber: '9876543210',
    propertyAddress: '123, मुख्य रस्ता, शेगाव',
    taxType: 'property-tax',
    amount: 12500,
    paidAmount: 12500,
    pendingAmount: 0,
    paymentStatus: 'paid',
    paymentMethod: 'online',
    paymentDate: '2024-03-15',
    dueDate: '2024-03-31',
    remarks: 'वेळेत भरले'
  },
  {
    id: 'TAX-2024-002',
    applicationId: 'TAX-2024-002',
    propertyId: 'PROP-001235',
    applicantName: 'सुनिता देशमुख',
    mobileNumber: '9876543211',
    propertyAddress: '456, नवीन नगर, शेगाव',
    taxType: 'water-tax',
    amount: 3500,
    paidAmount: 2000,
    pendingAmount: 1500,
    paymentStatus: 'partial',
    paymentMethod: 'cash',
    paymentDate: '2024-03-14',
    dueDate: '2024-03-31',
    remarks: 'आंशिक भरणा'
  },
  {
    id: 'TAX-2024-003',
    applicationId: 'TAX-2024-003',
    propertyId: 'PROP-001236',
    applicantName: 'विक्रम जोशी',
    mobileNumber: '9876543212',
    propertyAddress: '789, जुन नगर, शेगाव',
    taxType: 'gharpatti',
    amount: 8000,
    paidAmount: 0,
    pendingAmount: 8000,
    paymentStatus: 'pending',
    paymentMethod: '',
    paymentDate: '',
    dueDate: '2024-03-31',
    remarks: 'थकबाकी'
  },
  {
    id: 'TAX-2024-004',
    applicationId: 'TAX-2024-004',
    propertyId: 'PROP-001237',
    applicantName: 'मीनाक्षी शर्मा',
    mobileNumber: '9876543213',
    propertyAddress: '101, वसई रोड, शेगाव',
    taxType: 'property-tax',
    amount: 11000,
    paidAmount: 0,
    pendingAmount: 11000,
    paymentStatus: 'overdue',
    paymentMethod: '',
    paymentDate: '',
    dueDate: '2023-12-31',
    remarks: 'देय राहिले'
  },
  {
    id: 'TAX-2024-005',
    applicationId: 'TAX-2024-005',
    propertyId: 'PROP-001238',
    applicantName: 'अमित कुमार',
    mobileNumber: '9876543214',
    propertyAddress: '202, अकोला रोड, शेगाव',
    taxType: 'sanitation-tax',
    amount: 2500,
    paidAmount: 2500,
    pendingAmount: 0,
    paymentStatus: 'paid',
    paymentMethod: 'bank-transfer',
    paymentDate: '2024-03-12',
    dueDate: '2024-03-31',
    remarks: 'वेळेत भरले'
  }
];

const taxTypeFilter = [
  { label: 'मालमत्ता कर', value: 'property-tax' },
  { label: 'पाणी कर', value: 'water-tax' },
  { label: 'घरपट्टी', value: 'gharpatti' },
  { label: 'स्वच्छता कर', value: 'sanitation-tax' },
  { label: 'शिक्षण कर', value: 'education-cess' },
  { label: 'रस्ता कर', value: 'road-tax' },
  { label: 'लाईट कर', value: 'light-tax' },
  { label: 'नाला कर', value: 'drainage-tax' }
];

const paymentStatusFilter = [
  { label: 'थकबाकी', value: 'pending' },
  { label: 'आंशिक भरले', value: 'partial' },
  { label: 'पूर्ण भरले', value: 'paid' },
  { label: 'देय राहिले', value: 'overdue' }
];

const paymentMethodFilter = [
  { label: 'ऑनलाइन', value: 'online' },
  { label: 'रोख', value: 'cash' },
  { label: 'चेक', value: 'cheque' },
  { label: 'बँक हस्तांतरण', value: 'bank-transfer' },
  { label: 'UPI', value: 'upi' }
];

function TaxPaymentPage() {
  const [taxPayments, setTaxPayments] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(10);
  const dataTableRef = useRef<ImprovedDataTableRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalAmount: 0,
    collectedAmount: 0,
    pendingAmount: 0,
    totalProperties: 0,
    paidProperties: 0,
    pendingProperties: 0,
    totalTransactions: 0
  });

  useEffect(() => {
    fetchData({
      page: INITIAL_PAGE,
      limit: INITIAL_LIMIT,
      sortOrder: 'desc',
      sortBy: 'paymentDate'
    });
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use dummy stats
      setStats({
        totalAmount: 12500000,
        collectedAmount: 9850000,
        pendingAmount: 2650000,
        totalProperties: 2845,
        paidProperties: 2356,
        pendingProperties: 489,
        totalTransactions: 5248
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values
      setStats({
        totalAmount: 12500000,
        collectedAmount: 9850000,
        pendingAmount: 2650000,
        totalProperties: 2845,
        paidProperties: 2356,
        pendingProperties: 489,
        totalTransactions: 5248
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
        data: getDummyTaxPayments(),
        total: getDummyTaxPayments().length
      };

      if (dummyData.code === 'SUCCESS') {
        setTaxPayments(dummyData.data);
        setTotalRecords(dummyData.total);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      // Use dummy data as fallback
      setTaxPayments(getDummyTaxPayments());
      setTotalRecords(getDummyTaxPayments().length);
      toast.error(err.message || 'माहिती मिळवताना त्रुटी आली.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className='bg-green-100 text-green-800'>पूर्ण भरले</Badge>
        );
      case 'partial':
        return (
          <Badge className='bg-yellow-100 text-yellow-800'>आंशिक भरले</Badge>
        );
      case 'pending':
        return <Badge className='bg-red-100 text-red-800'>थकबाकी</Badge>;
      case 'overdue':
        return <Badge className='bg-red-500 text-white'>देय राहिले</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTaxTypeIcon = (taxType: string) => {
    switch (taxType) {
      case 'property-tax':
        return <Home className='h-4 w-4' />;
      case 'water-tax':
        return <Droplets className='h-4 w-4' />;
      case 'gharpatti':
        return <Building className='h-4 w-4' />;
      case 'sanitation-tax':
        return <Receipt className='h-4 w-4' />;
      default:
        return <Landmark className='h-4 w-4' />;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'online':
        return <Badge className='bg-blue-100 text-blue-800'>ऑनलाइन</Badge>;
      case 'cash':
        return <Badge className='bg-green-100 text-green-800'>रोख</Badge>;
      case 'cheque':
        return <Badge className='bg-purple-100 text-purple-800'>चेक</Badge>;
      case 'bank-transfer':
        return (
          <Badge className='bg-indigo-100 text-indigo-800'>बँक हस्तांतरण</Badge>
        );
      case 'upi':
        return <Badge className='bg-teal-100 text-teal-800'>UPI</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>अपरिभाषित</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('mr-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
      .format(amount)
      .replace('₹', '₹ ');
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
      key: 'propertyId',
      header: 'मालमत्ता आयडी',
      field: 'propertyId',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'मालमत्ता आयडी'
    },
    {
      key: 'applicantName',
      header: 'मालकाचे नाव',
      field: 'applicantName',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      filterPlaceholder: 'मालकाचे नाव'
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
      key: 'taxType',
      header: 'कर प्रकार',
      field: 'taxType',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: taxTypeFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'कर प्रकार',
      body: (data: any) => (
        <div className='flex items-center gap-2'>
          {getTaxTypeIcon(data.taxType)}
          <span>
            {taxTypeFilter.find((t) => t.value === data.taxType)?.label ||
              data.taxType}
          </span>
        </div>
      )
    },
    {
      key: 'amount',
      header: 'रक्कम',
      field: 'amount',
      filter: false,
      sortable: true,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      body: (data: any) => (
        <div className='space-y-1'>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-500'>एकूण:</span>
            <span className='font-semibold'>{formatCurrency(data.amount)}</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-500'>भरले:</span>
            <span className='font-semibold text-green-600'>
              {formatCurrency(data.paidAmount)}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-500'>बाकी:</span>
            <span
              className={`font-semibold ${data.pendingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}
            >
              {formatCurrency(data.pendingAmount)}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'paymentStatus',
      header: 'पेमेंट स्थिती',
      field: 'paymentStatus',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: paymentStatusFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'स्थिती',
      body: (data: any) => getPaymentStatusBadge(data.paymentStatus)
    },
    {
      key: 'paymentMethod',
      header: 'पेमेंट पद्धत',
      field: 'paymentMethod',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: paymentMethodFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'पद्धत',
      body: (data: any) =>
        data.paymentMethod ? getPaymentMethodBadge(data.paymentMethod) : '-'
    },
    {
      key: 'paymentDate',
      header: 'भरणा दिनांक',
      field: 'paymentDate',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'दिनांक',
      body: (data: any) => data.paymentDate || '-'
    },
    {
      key: 'dueDate',
      header: 'देय दिनांक',
      field: 'dueDate',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'देय दिनांक'
    }
  ];

  const handleExport = async () => {
    try {
      toast.info('कर भरणा अहवाल निर्यात करत आहे...');
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
              मालमत्ता कर भरणा व्यवस्थापन
            </h1>
            <p className='text-gray-600'>
              सर्व कर भरण्याचे व्यवस्थापन आणि निरीक्षण
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
              title: 'एकूण कर रक्कम',
              value: `₹ ${(stats.totalAmount / 100000).toFixed(1)} लाख`,
              icon: Landmark,
              color: 'from-[#b01d4f] to-[#7a1e4f]',
              change: '+8.5%',
              description: 'या वर्षीची'
            },
            {
              title: 'भरलेली रक्कम',
              value: `₹ ${(stats.collectedAmount / 100000).toFixed(1)} लाख`,
              icon: CreditCard,
              color: 'from-green-500 to-green-700',
              change: '+12.3%',
              description: 'एकूणाच्या ७९%'
            },
            {
              title: 'थकबाकी रक्कम',
              value: `₹ ${(stats.pendingAmount / 100000).toFixed(1)} लाख`,
              icon: AlertCircle,
              color: 'from-red-500 to-red-700',
              change: '-5.2%',
              description: 'एकूणाच्या २१%'
            },
            {
              title: 'एकूण लेनदेन',
              value: stats.totalTransactions.toLocaleString(),
              icon: FileText,
              color: 'from-blue-500 to-blue-700',
              change: '+3.8%',
              description: 'या महिन्यात'
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
                  <p className='text-sm text-gray-500'>
                    कर भरणा केलेली मालमत्ता
                  </p>
                  <h3 className='mt-1 text-2xl font-bold'>
                    {stats.paidProperties.toLocaleString()}
                  </h3>
                  <p className='mt-2 text-xs text-gray-500'>
                    एकूण मालमत्तेच्या{' '}
                    {(
                      (stats.paidProperties / stats.totalProperties) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
                <div className='rounded-lg bg-gradient-to-r from-green-500 to-green-700 p-3'>
                  <CheckCircle className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>थकबाकी मालमत्ता</p>
                  <h3 className='mt-1 text-2xl font-bold'>
                    {stats.pendingProperties.toLocaleString()}
                  </h3>
                  <p className='mt-2 text-xs text-gray-500'>
                    एकूण मालमत्तेच्या{' '}
                    {(
                      (stats.pendingProperties / stats.totalProperties) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
                <div className='rounded-lg bg-gradient-to-r from-red-500 to-red-700 p-3'>
                  <Clock className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>सरासरी कर रक्कम</p>
                  <h3 className='mt-1 text-2xl font-bold'>₹ ४,३९८</h3>
                  <p className='mt-2 text-xs text-gray-500'>
                    प्रति मालमत्ता वार्षिक
                  </p>
                </div>
                <div className='rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 p-3'>
                  <Receipt className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tax Type Summary */}
        <Card className='mb-6'>
          <CardContent className='p-6'>
            <h3 className='mb-4 text-lg font-semibold'>
              कर प्रकारानुसार विभागणी
            </h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {taxTypeFilter.slice(0, 4).map((type, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-lg bg-gray-50 p-3'
                >
                  <div className='flex items-center gap-3'>
                    {getTaxTypeIcon(type.value)}
                    <span className='text-sm'>{type.label}</span>
                  </div>
                  <Badge variant='outline'>₹ २,४५,०००</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ImprovedDataTable
        ref={dataTableRef}
        tableId='tax-payment-management'
        page={INITIAL_PAGE}
        limit={INITIAL_LIMIT}
        totalRecords={totalRecords}
        data={taxPayments}
        columns={columns}
        loading={isLoading}
        filter={true}
        stripedRows={true}
        showGridlines={true}
        isView={true}
        isEdit={true}
        isDelete={true}
        onLoad={fetchData}
        // emptyMessage="कर भरणा आढळले नाहीत"
        // searchPlaceholder="कर भरणा शोधा..."
      />
    </PageContainer>
  );
}

export default TaxPaymentPage;

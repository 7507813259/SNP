'use client';
import PageContainer from '@/components/layout/page-container';
import ImprovedDataTable, {
  ImprovedDataTableRef
} from '@/components/table/ImprovedDataTable';
import { Button } from '@/components/ui/button';
import DeleteConfirmationDialog from '@/components/ui/custom/delete-dialog';
import { DeleteCall, GetCall, PostCall, PutCall } from '@/lib/apiClient';
import { ACTIONS, INITIAL_LIMIT, INITIAL_PAGE } from '@/utils/constant';
import { buildQueryParams } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  FormFieldConfig,
  ReusableFormSheet
} from '@/components/drawer/add-fields-drawer';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  Printer,
  MessageSquare,
  Building,
  Home,
  Droplets,
  Users
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const statusFilter = [
  { label: 'प्रलंबित', value: 'pending' },
  { label: 'प्रक्रियारत', value: 'processing' },
  { label: 'मंजूर', value: 'approved' },
  { label: 'नकार', value: 'rejected' }
];

const priorityFilter = [
  { label: 'उच्च', value: 'high' },
  { label: 'मध्यम', value: 'medium' },
  { label: 'कमी', value: 'low' }
];

const departmentFilter = [
  { label: 'नागरिक सेवा', value: 'citizen-services' },
  { label: 'तक्रार निवारण', value: 'grievance-services' },
  { label: 'परवाना विभाग', value: 'license-department' },
  { label: 'नगर नियोजन', value: 'town-planning' },
  { label: 'पाणीपुरवठा', value: 'water-supply' }
];

const applicationSchema = z.object({
  applicantName: z.string().min(1, 'अर्जदाराचे नाव आवश्यक आहे.'),
  mobileNumber: z.string().min(10, 'मोबाईल क्रमांक आवश्यक आहे.'),
  emailId: z
    .string()
    .email({ message: 'कृपया वैध ईमेल टाका.' })
    .optional()
    .or(z.literal('')),
  serviceType: z.string().min(1, 'सेवा प्रकार निवडा.'),
  department: z.string().min(1, 'विभाग निवडा.'),
  address: z.string().min(1, 'पत्ता आवश्यक आहे.'),
  description: z.string().optional(),
  priority: z.string().min(1, 'प्राधान्य निवडा.')
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const newApplicationInitialValues: ApplicationFormData = {
  applicantName: '',
  mobileNumber: '',
  emailId: '',
  serviceType: '',
  department: '',
  address: '',
  description: '',
  priority: 'medium'
};

const applicationFormFields: FormFieldConfig[] = [
  {
    name: 'applicantName',
    label: 'अर्जदाराचे नाव',
    type: 'text',
    placeholder: 'राजेश पाटील'
  },
  {
    name: 'mobileNumber',
    label: 'मोबाईल क्रमांक',
    type: 'text',
    placeholder: '९८७६५४३२१०'
  },
  {
    name: 'emailId',
    label: 'ईमेल आयडी',
    type: 'email',
    placeholder: 'rajesh.patil@email.com'
  },
  {
    name: 'serviceType',
    label: 'सेवा प्रकार',
    type: 'dropdown',
    options: [
      { value: 'birth-certificate', label: 'जन्म प्रमाणपत्र' },
      { value: 'death-certificate', label: 'मृत्यू प्रमाणपत्र' },
      { value: 'marriage-registration', label: 'विवाह नोंदणी' },
      { value: 'property-tax', label: 'मालमत्ता कर भरणा' },
      { value: 'water-tax', label: 'पाणी कर भरणा' },
      { value: 'trade-license', label: 'दुकान परवाना' },
      { value: 'building-permission', label: 'बांधकाम परवानगी' },
      { value: 'grievance', label: 'तक्रार नोंदणी' }
    ]
  },
  {
    name: 'department',
    label: 'विभाग',
    type: 'dropdown',
    options: departmentFilter
  },
  {
    name: 'address',
    label: 'पत्ता',
    type: 'textarea',
    placeholder: 'पूर्ण पत्ता'
  },
  {
    name: 'priority',
    label: 'प्राधान्य',
    type: 'dropdown',
    options: priorityFilter
  },
  {
    name: 'description',
    label: 'अतिरिक्त माहिती',
    type: 'textarea',
    placeholder: 'अर्जाबद्दल अतिरिक्त माहिती'
  }
];

const getDummyApplications = () => [
  {
    applicationId: 'APP-2024-001234',
    applicantName: 'राजेश पाटील',
    mobileNumber: '९८७६५४३२१०',
    emailId: 'rajesh.patil@email.com',
    serviceType: 'birth-certificate',
    department: 'citizen-services',
    status: 'approved',
    priority: 'high',
    submittedDate: '२०२४-०३-१५',
    assignedTo: 'स्मिता जोशी',
    address: '१२३, मुख्य रस्ता, शेगांव'
  },
  {
    applicationId: 'APP-2024-001235',
    applicantName: 'सुनिता देशमुख',
    mobileNumber: '९८७६५४३२११',
    emailId: 'sunita.desh@email.com',
    serviceType: 'property-tax',
    department: 'tax-department',
    status: 'pending',
    priority: 'medium',
    submittedDate: '२०२४-०३-१४',
    assignedTo: 'अनिल कुमार',
    address: '४५६, नवीन नगर, शेगांव'
  },
  {
    applicationId: 'APP-2024-001236',
    applicantName: 'विक्रम जोशी',
    mobileNumber: '९८७६५४३२१२',
    emailId: 'vikram.joshi@email.com',
    serviceType: 'grievance',
    department: 'grievance-services',
    status: 'processing',
    priority: 'high',
    submittedDate: '२०२४-०३-१३',
    assignedTo: 'प्रिया शर्मा',
    address: '७८९, जुन नगर, शेगांव'
  },
  {
    applicationId: 'APP-2024-001237',
    applicantName: 'मीनाक्षी शर्मा',
    mobileNumber: '९८७६५४३२१३',
    emailId: 'meenakshi.sharma@email.com',
    serviceType: 'building-permission',
    department: 'town-planning',
    status: 'rejected',
    priority: 'low',
    submittedDate: '२०२४-०३-१२',
    assignedTo: 'राहुल वर्मा',
    address: '१०१, वसई रोड, शेगांव'
  },
  {
    applicationId: 'APP-2024-001238',
    applicantName: 'अमित कुमार',
    mobileNumber: '९८७६५४३२१४',
    emailId: 'amit.kumar@email.com',
    serviceType: 'water-tax',
    department: 'water-supply',
    status: 'approved',
    priority: 'medium',
    submittedDate: '२०२४-०३-११',
    assignedTo: 'संजय गुप्ता',
    address: '२०२, अकोला रोड, शेगांव'
  }
];

function ApplicationManagementPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(10);
  const dataTableRef = useRef<ImprovedDataTableRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] =
    useState<any>(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchData({
      page: INITIAL_PAGE,
      limit: INITIAL_LIMIT,
      sortOrder: 'desc',
      sortBy: 'createdAt'
    });
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use dummy stats
      setStats({
        total: 1245,
        pending: 124,
        approved: 956,
        rejected: 165
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values
      setStats({
        total: 1245,
        pending: 124,
        approved: 956,
        rejected: 165
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
        data: getDummyApplications(),
        total: getDummyApplications().length
      };

      if (dummyData.code === 'SUCCESS') {
        setApplications(dummyData.data);
        setTotalRecords(dummyData.total);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      // Use dummy data as fallback
      setApplications(getDummyApplications());
      setTotalRecords(getDummyApplications().length);
      toast.error(err.message || 'माहिती मिळवताना त्रुटी आली.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
            मंजूर
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant='destructive'>उच्च</Badge>;
      case 'medium':
        return (
          <Badge className='bg-yellow-500 hover:bg-yellow-600'>मध्यम</Badge>
        );
      case 'low':
        return <Badge className='bg-green-500 hover:bg-green-600'>कमी</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
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
      filterPlaceholder: 'नाव'
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
      key: 'serviceType',
      header: 'सेवा प्रकार',
      field: 'serviceType',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 150, maxWidth: 150 },
      filterPlaceholder: 'सेवा प्रकार',
      body: (data: any) => (
        <div className='flex items-center gap-2'>
          {getServiceIcon(data.serviceType)}
          <span>{data.serviceType}</span>
        </div>
      )
    },
    {
      key: 'department',
      header: 'विभाग',
      field: 'department',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: departmentFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 130, maxWidth: 130 },
      filterPlaceholder: 'विभाग'
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
      key: 'priority',
      header: 'प्राधान्य',
      field: 'priority',
      filter: true,
      sortable: true,
      filterType: 'dropdown' as const,
      filterOptions: priorityFilter,
      filterOptionLabel: 'label',
      filterOptionValue: 'value',
      bodyStyle: { minWidth: 100, maxWidth: 100 },
      filterPlaceholder: 'प्राधान्य',
      body: (data: any) => getPriorityBadge(data.priority)
    },
    {
      key: 'submittedDate',
      header: 'सदर दिनांक',
      field: 'submittedDate',
      filter: true,
      sortable: true,
      filterType: 'text' as const,
      bodyStyle: { minWidth: 120, maxWidth: 120 },
      filterPlaceholder: 'दिनांक'
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
    }
  ];

  const onRowSelect = async (rowData: any, action: any) => {
    if (action === ACTIONS.DELETE) {
      setSelectedApplication(rowData);
      setIsDeleteDialogVisible(true);
    }

    if (action == ACTIONS.EDIT) {
      setSelectedApplication(rowData);
      setIsSheetOpen(true);
    }

    if (action === ACTIONS.VIEW) {
      // Navigate to view details page
      toast.info('अर्ज तपशील पाहणे सुरु करत आहे...');
    }
  };

  const handleOpenCreateSheet = () => {
    setSelectedApplication(null);
    setIsSheetOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogVisible(false);
    setSelectedApplication(null);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedApplication(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedApplication) return;

    setIsDeleting(true);
    try {
      const response = await DeleteCall(
        `/api/applications/${selectedApplication.applicationId}`
      );
      if (response.code === 'SUCCESS') {
        toast.success(
          `अर्ज "${selectedApplication.applicationId}" यशस्वीरित्या हटवला!`
        );
        handleCloseDeleteDialog();
        handleRefresh();
        fetchStats();
      } else {
        toast.error(response.message || 'अर्ज हटवण्यात अयशस्वी.');
      }
    } catch (error: any) {
      toast.error(error.message || 'हटवताना त्रुटी आली.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = async (data: z.infer<typeof applicationSchema>) => {
    setIsSubmitting(true);
    try {
      let response;
      if (selectedApplication) {
        response = await PutCall(
          `/api/applications/${selectedApplication.applicationId}`,
          data
        );
        if (response.code === 'SUCCESS') {
          toast.success('अर्ज यशस्वीरित्या अपडेट केला!');
        }
      } else {
        response = await PostCall('/api/applications', data);
        if (response.code === 'SUCCESS') {
          toast.success('नवीन अर्ज यशस्वीरित्या तयार केला!');
        }
      }

      if (response.code === 'SUCCESS') {
        handleCloseSheet();
        handleRefresh();
        fetchStats();
      } else {
        toast.error(response.message || 'त्रुटी आली.');
      }
    } catch (error: any) {
      toast.error(error.message || 'अनपेक्षित त्रुटी आली.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExport = async () => {
    try {
      toast.info('अर्ज निर्यात करत आहे...');
      // Implement export logic
    } catch (error) {
      toast.error('निर्यात करताना त्रुटी आली.');
    }
  };

  const handleRefresh = () => dataTableRef.current?.refreshData();

  return (
    <PageContainer scrollable={false}>
      <div className='flex-shrink-0'>
        <div className='mb-6 flex w-full items-center justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-[#ffffff]'>
              अर्ज व्यवस्थापन
            </h1>
            <p className='text-gray-600'>
              सर्व अर्जांचे व्यवस्थापन आणि निरीक्षण
            </p>
          </div>
          <div className='flex gap-3'>
            <Button variant='outline' onClick={handleExport}>
              <Download className='mr-2 h-4 w-4' />
              निर्यात करा
            </Button>
            <Button
              className='bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] text-white hover:from-[#7a1e4f] hover:to-[#5a1a3a]'
              onClick={handleOpenCreateSheet}
            >
              + नवीन अर्ज
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
          {[
            {
              title: 'एकूण अर्ज',
              value: stats.total,
              icon: FileText,
              color: 'from-[#b01d4f] to-[#7a1e4f]',
              change: '+12.5%'
            },
            {
              title: 'प्रलंबित',
              value: stats.pending,
              icon: Clock,
              color: 'from-amber-500 to-amber-700',
              change: '-8.2%'
            },
            {
              title: 'मंजूर',
              value: stats.approved,
              icon: CheckCircle,
              color: 'from-green-500 to-green-700',
              change: '+15.3%'
            },
            {
              title: 'नकार',
              value: stats.rejected,
              icon: XCircle,
              color: 'from-red-500 to-red-700',
              change: '-2.1%'
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
                    <div className='mt-2 flex items-center'>
                      <span
                        className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {stat.change}
                      </span>
                      <span className='ml-2 text-xs text-gray-500'>
                        गेल्या आठवड्यापेक्षा
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
      </div>

      <ImprovedDataTable
        ref={dataTableRef}
        tableId='application-management'
        page={INITIAL_PAGE}
        limit={INITIAL_LIMIT}
        totalRecords={totalRecords}
        data={applications}
        columns={columns}
        loading={isLoading}
        filter={true}
        stripedRows={true}
        showGridlines={true}
        isView={true}
        isEdit={true}
        isDelete={true}
        onLoad={fetchData}
        onView={(item: any) => onRowSelect(item, 'view')}
        onEdit={(item: any) => onRowSelect(item, 'edit')}
        onDelete={(item: any) => onRowSelect(item, 'delete')}
        // emptyMessage="अर्ज आढळले नाहीत"
        // searchPlaceholder="अर्ज शोधा..."
      />

      <DeleteConfirmationDialog
        visible={isDeleteDialogVisible}
        isLoading={isDeleting}
        itemDescription={`अर्ज ID: ${selectedApplication?.applicationId || ''}`}
        onHide={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
        // confirmButtonText="हटवा"
        // cancelButtonText="रद्द करा"
        // title="अर्ज हटवण्याची खात्री करा"
        // message="हा अर्ज कायमस्वरूपी हटवला जाईल. ही क्रिया अवश्यक असल्यासच करा."
      />

      <ReusableFormSheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        title={selectedApplication ? 'अर्ज संपादित करा' : 'नवीन अर्ज तयार करा'}
        description='अर्जाची माहिती भरा'
        fields={applicationFormFields}
        schema={applicationSchema}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        initialValues={selectedApplication || newApplicationInitialValues}
        // submitButtonText={selectedApplication ? 'अपडेट करा' : 'तयार करा'}
        // cancelButtonText='रद्द करा'
      />
    </PageContainer>
  );
}

export default ApplicationManagementPage;

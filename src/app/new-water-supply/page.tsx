'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Loader2,
  Search,
  Upload,
  FileText,
  Home,
  User,
  Smartphone,
  Mail,
  CheckCircle,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Users,
  FileCheck,
  Calendar,
  Clock,
  MapPin,
  Download,
  Droplets,
  Building,
  HomeIcon as HomeSimple,
  File,
  Camera,
  Image as ImageIcon,
  Wrench,
  AlertCircle,
  Phone,
  Filter,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Send,
  Plus,
  FileSpreadsheet,
  CreditCard,
  ReceiptIndianRupee
} from 'lucide-react';

interface WaterConnectionData {
  id: string;
  applicationNo: string;
  
  // Applicant Details
  applicantName: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  wardNo: string;
  relationWithOwner: string;
  
  // Water Connection Details
  connectionType: string;
  propertyType: string;
  propertyId: string;
  propertyAddress: string;
  numberOfResidents: number;
  requiredPipeSize: string;
  waterSource: string;
  
  // Property Details
  propertyOwnerName: string;
  ownershipType: string;
  yearsOfResidence: number;
  wardZone: string;
  
  // Status Details
  status: 'Pending' | 'Site-Inspection' | 'Approved' | 'Rejected';
  assignedTo: string;
  assignedDepartment: string;
  siteInspectionDate: string;
  approvalDate: string;
  officerRemarks: string;
  meterNumber: string;
  billingActivated: boolean;
  
  // Fees
  applicationFee: number;
  connectionFee: number;
  meterFee: number;
  totalFee: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
}

const dummyWaterApplications: WaterConnectionData[] = [
  {
    id: '1',
    applicationNo: 'WTR-2024-001234',
    applicantName: 'राजेश कुमार शर्मा',
    mobile: '9876543210',
    email: 'rajesh.sharma@example.com',
    aadhaar: '1234-5678-9012',
    address: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, शेगांव',
    wardNo: 'वॉर्ड क्र. 5',
    relationWithOwner: 'स्वतः',
    
    connectionType: 'घरगुती',
    propertyType: 'निवासी',
    propertyId: 'PROP-5678',
    propertyAddress: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, शेगांव',
    numberOfResidents: 5,
    requiredPipeSize: '¾"',
    waterSource: 'नगर परिषद',
    
    propertyOwnerName: 'राजेश कुमार शर्मा',
    ownershipType: 'स्वतःचे',
    yearsOfResidence: 10,
    wardZone: 'वॉर्ड क्र. 5',
    
    status: 'Pending',
    assignedTo: '',
    assignedDepartment: 'पाणी पुरवठा विभाग',
    siteInspectionDate: '',
    approvalDate: '',
    officerRemarks: 'अर्ज प्राप्त, तपासणी प्रक्रिया सुरू',
    meterNumber: '',
    billingActivated: false,
    
    applicationFee: 500,
    connectionFee: 2000,
    meterFee: 1500,
    totalFee: 4000,
    paymentStatus: 'Pending'
  },
  {
    id: '2',
    applicationNo: 'WTR-2024-001235',
    applicantName: 'सुनिता देशपांडे',
    mobile: '8765432109',
    email: 'sunita.d@example.com',
    aadhaar: '2345-6789-0123',
    address: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, शेगांव',
    wardNo: 'वॉर्ड क्र. 3',
    relationWithOwner: 'भाडेकरू',
    
    connectionType: 'घरगुती',
    propertyType: 'निवासी',
    propertyId: 'PROP-8910',
    propertyAddress: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, शेगांव',
    numberOfResidents: 3,
    requiredPipeSize: '½"',
    waterSource: 'नगर परिषद',
    
    propertyOwnerName: 'महेश साळुंखे',
    ownershipType: 'भाड्याचे',
    yearsOfResidence: 2,
    wardZone: 'वॉर्ड क्र. 3',
    
    status: 'Site-Inspection',
    assignedTo: 'अनिल पाटील',
    assignedDepartment: 'पाणी पुरवठा विभाग',
    siteInspectionDate: '2024-01-25',
    approvalDate: '',
    officerRemarks: 'साइट तपासणीसाठी नियुक्ती केली',
    meterNumber: '',
    billingActivated: false,
    
    applicationFee: 500,
    connectionFee: 2000,
    meterFee: 1500,
    totalFee: 4000,
    paymentStatus: 'Paid'
  },
  {
    id: '3',
    applicationNo: 'WTR-2024-001236',
    applicantName: 'अजय पाटील',
    mobile: '7654321098',
    email: 'ajay.patil@example.com',
    aadhaar: '3456-7890-1234',
    address: 'गाव: शिंदेवाडी, ता: शेगांव, जि: बुलढाणा',
    wardNo: 'वॉर्ड क्र. 8',
    relationWithOwner: 'स्वतः',
    
    connectionType: 'घरगुती',
    propertyType: 'निवासी',
    propertyId: 'PROP-1122',
    propertyAddress: 'गाव: शिंदेवाडी, ता: शेगांव, जि: बुलढाणा',
    numberOfResidents: 6,
    requiredPipeSize: '1"',
    waterSource: 'नगर परिषद',
    
    propertyOwnerName: 'अजय पाटील',
    ownershipType: 'स्वतःचे',
    yearsOfResidence: 15,
    wardZone: 'वॉर्ड क्र. 8',
    
    status: 'Approved',
    assignedTo: 'संजय निकम',
    assignedDepartment: 'पाणी पुरवठा विभाग',
    siteInspectionDate: '2024-01-15',
    approvalDate: '2024-01-20',
    officerRemarks: 'सर्व निकष पूर्ण, कनेक्शन मंजूर',
    meterNumber: 'MTR-567890',
    billingActivated: true,
    
    applicationFee: 500,
    connectionFee: 2000,
    meterFee: 1500,
    totalFee: 4000,
    paymentStatus: 'Paid'
  },
  {
    id: '4',
    applicationNo: 'WTR-2024-001237',
    applicantName: 'मीना शिंदे',
    mobile: '6543210987',
    email: 'meena.shinde@example.com',
    aadhaar: '4567-8901-2345',
    address: 'कुंभारवाडा, शेगांव',
    wardNo: 'वॉर्ड क्र. 2',
    relationWithOwner: 'पती-पत्नी',
    
    connectionType: 'व्यापारी',
    propertyType: 'दुकान',
    propertyId: 'PROP-3344',
    propertyAddress: 'कुंभारवाडा, शेगांव',
    numberOfResidents: 2,
    requiredPipeSize: '1"',
    waterSource: 'नगर परिषद',
    
    propertyOwnerName: 'रवींद्र शिंदे',
    ownershipType: 'स्वतःचे',
    yearsOfResidence: 8,
    wardZone: 'वॉर्ड क्र. 2',
    
    status: 'Rejected',
    assignedTo: 'रवींद्र जाधव',
    assignedDepartment: 'पाणी पुरवठा विभाग',
    siteInspectionDate: '2024-01-10',
    approvalDate: '',
    officerRemarks: 'कागदपत्रे अपुरी, पुन्हा अर्ज करा',
    meterNumber: '',
    billingActivated: false,
    
    applicationFee: 1000,
    connectionFee: 5000,
    meterFee: 2000,
    totalFee: 8000,
    paymentStatus: 'Pending'
  }
];

const wards = [
  'वॉर्ड क्र. 1', 'वॉर्ड क्र. 2', 'वॉर्ड क्र. 3', 'वॉर्ड क्र. 4', 'वॉर्ड क्र. 5',
  'वॉर्ड क्र. 6', 'वॉर्ड क्र. 7', 'वॉर्ड क्र. 8', 'वॉर्ड क्र. 9', 'वॉर्ड क्र. 10'
];

const relationsWithOwner = [
  'स्वतः',
  'पती-पत्नी',
  'भाडेकरू',
  'वडील',
  'आई',
  'मुलगा',
  'मुलगी',
  'नातेवाईक'
];

const connectionTypes = [
  'घरगुती',
  'व्यापारी',
  'संस्था',
  'सार्वजनिक'
];

const propertyTypes = [
  'निवासी',
  'दुकान',
  'कारखाना',
  'शैक्षणिक संस्था',
  'वैद्यकीय संस्था',
  'इतर'
];

const pipeSizes = ['½"', '¾"', '1"', '1.5"', '2"'];

const waterSources = [
  'नगर परिषद',
  'बोअरवेल',
  'तलाव',
  'नदी',
  'इतर'
];

const ownershipTypes = [
  'स्वतःचे',
  'भाड्याचे',
  'लीज',
  'वारसा'
];

const statuses = [
  { value: 'Pending', label: 'प्रलंबित', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Site-Inspection', label: 'साइट तपासणी', color: 'bg-blue-100 text-blue-800' },
  { value: 'Approved', label: 'मंजूर', color: 'bg-green-100 text-green-800' },
  { value: 'Rejected', label: 'नाकारले', color: 'bg-red-100 text-red-800' }
];

interface UploadedDocuments {
  aadhaarCard: boolean;
  propertyTaxReceipt: boolean;
  ownershipProof: boolean;
  buildingPermission: boolean;
  sitePhotograph: boolean;
}

export default function WaterConnectionPage() {
  const [step, setStep] = useState<'search' | 'applicant' | 'connection' | 'property' | 'documents' | 'declaration' | 'confirmation'>('search');
  const [loading, setLoading] = useState(false);
  const [applicantData, setApplicantData] = useState<WaterConnectionData | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [view, setView] = useState<'user' | 'admin'>('user');
  
  const [formData, setFormData] = useState({
    // Applicant Details
    applicantName: '',
    mobile: '',
    email: '',
    aadhaar: '',
    address: '',
    wardNo: '',
    relationWithOwner: 'स्वतः',
    
    // Water Connection Details
    connectionType: 'घरगुती',
    propertyType: 'निवासी',
    propertyId: '',
    propertyAddress: '',
    numberOfResidents: '',
    requiredPipeSize: '¾"',
    waterSource: 'नगर परिषद',
    
    // Property Details
    propertyOwnerName: '',
    ownershipType: 'स्वतःचे',
    yearsOfResidence: '',
    wardZone: '',
    
    // Declaration
    declaration: false,
    
    // For tracking
    trackApplicationId: '',
    trackMobile: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDocuments>({
    aadhaarCard: false,
    propertyTaxReceipt: false,
    ownershipProof: false,
    buildingPermission: false,
    sitePhotograph: false
  });
  
  const [searchAttempts, setSearchAttempts] = useState(0);
  const [searchBlocked, setSearchBlocked] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterWard, setFilterWard] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fee calculation
  const calculateFees = () => {
    let applicationFee = 0;
    let connectionFee = 0;
    let meterFee = 0;
    
    if (formData.connectionType === 'घरगुती') {
      applicationFee = 500;
      connectionFee = 2000;
      meterFee = 1500;
    } else if (formData.connectionType === 'व्यापारी') {
      applicationFee = 1000;
      connectionFee = 5000;
      meterFee = 2000;
    } else {
      applicationFee = 1500;
      connectionFee = 10000;
      meterFee = 3000;
    }
    
    return {
      applicationFee,
      connectionFee,
      meterFee,
      total: applicationFee + connectionFee + meterFee
    };
  };
  
  const fees = calculateFees();

  useEffect(() => {
    // Auto-generate application number when connection details are filled
    if (step === 'connection' && formData.connectionType && formData.propertyType) {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const applicationNo = `WTR-${new Date().getFullYear()}-${timestamp}${random}`;
      setApplicationId(applicationNo);
    }
  }, [step, formData.connectionType, formData.propertyType]);

  const handleMobileSearch = () => {
    if (searchBlocked) {
      alert('Too many search attempts. Please try again after 5 minutes.');
      return;
    }

    if (!mobileNumber.trim()) {
      alert('Please enter mobile number to search');
      return;
    }

    if (searchAttempts >= 3) {
      setSearchBlocked(true);
      setTimeout(() => {
        setSearchBlocked(false);
        setSearchAttempts(0);
      }, 300000);
      alert('Too many search attempts. Please wait 5 minutes before trying again.');
      return;
    }

    setLoading(true);
    setSearchAttempts(prev => prev + 1);

    // Simulate API call
    setTimeout(() => {
      const foundRecord = dummyWaterApplications.find((record) => 
        record.mobile === mobileNumber
      );

      if (foundRecord) {
        setApplicantData(foundRecord);
        setFormData({
          applicantName: foundRecord.applicantName,
          mobile: foundRecord.mobile,
          email: foundRecord.email,
          aadhaar: foundRecord.aadhaar,
          address: foundRecord.address,
          wardNo: foundRecord.wardNo,
          relationWithOwner: foundRecord.relationWithOwner,
          connectionType: foundRecord.connectionType,
          propertyType: foundRecord.propertyType,
          propertyId: foundRecord.propertyId,
          propertyAddress: foundRecord.propertyAddress,
          numberOfResidents: foundRecord.numberOfResidents.toString(),
          requiredPipeSize: foundRecord.requiredPipeSize,
          waterSource: foundRecord.waterSource,
          propertyOwnerName: foundRecord.propertyOwnerName,
          ownershipType: foundRecord.ownershipType,
          yearsOfResidence: foundRecord.yearsOfResidence.toString(),
          wardZone: foundRecord.wardZone,
          declaration: false,
          trackApplicationId: '',
          trackMobile: ''
        });
        setStep('connection');
      } else {
        setStep('applicant');
      }
      setLoading(false);
    }, 1500);
  };

  const handleTrackApplication = () => {
    if (!formData.trackApplicationId.trim() || !formData.trackMobile.trim()) {
      alert('Please enter both Application ID and Mobile Number');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const foundRecord = dummyWaterApplications.find((record) => 
        record.applicationNo === formData.trackApplicationId && 
        record.mobile === formData.trackMobile
      );

      if (foundRecord) {
        setApplicantData(foundRecord);
        setView('user');
        setStep('confirmation');
      } else {
        alert('No application found with the given details');
      }
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type: keyof UploadedDocuments) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));
    console.log(`${type} uploaded successfully`);
  };

  const handleSubmitApplication = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('confirmation');
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredApplications = dummyWaterApplications.filter(app => {
    return (
      (!filterStatus || app.status === filterStatus) &&
      (!filterWard || app.wardNo === filterWard)
    );
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderStatusBadge = (status: string) => {
    const statusInfo = statuses.find(s => s.value === status);
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo?.color || 'bg-gray-100 text-gray-800'}`}>
        {statusInfo?.label || status}
      </span>
    );
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8'>
      <div className='max-w-full px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <Droplets className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              नवीन पाणी कनेक्शन अर्ज
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#b01d4f]/10 p-3'>
              <Droplets className='h-8 w-8 text-[#b01d4f]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद पाणी कनेक्शन पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Water Connection Portal
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className='flex justify-center mb-6'>
            <div className='inline-flex rounded-lg border border-gray-200 p-1'>
              <button
                onClick={() => setView('user')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  view === 'user' 
                    ? 'bg-[#b01d4f] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className='h-4 w-4 inline mr-2' />
                नागरिक
              </button>
            </div>
          </div>
        </div>

        {/* User View */}
        {view === 'user' && (
          <>
            {/* Progress Steps */}
            <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
              {['search', 'applicant', 'connection', 'property', 'documents', 'declaration'].map((stepName, index) => (
                <div key={stepName} className='flex items-center'>
                  <div
                    className={`flex items-center ${step === stepName ? 'text-[#b01d4f]' : index < ['search', 'applicant', 'connection', 'property', 'documents', 'declaration'].indexOf(step) ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
                  >
                    <div
                      className={`flex h-3 w-3 lg:h-8 lg:w-8 md:h-8 md:w-8  items-center justify-center rounded-full ${step === stepName ? 'bg-[#b01d4f]/10' : index < ['search', 'applicant', 'connection', 'property', 'documents', 'declaration'].indexOf(step) ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
                    >
                      {index === 0 && <Search className='h-4 w-4' />}
                      {index === 1 && <User className='h-4 w-4' />}
                      {index === 2 && <Droplets className='h-4 w-4' />}
                      {index === 3 && <HomeSimple className='h-4 w-4' />}
                      {index === 4 && <FileText className='h-4 w-4' />}
                      {index === 5 && <CheckCircle className='h-4 w-4' />}
                    </div>
                    <span className='ml-2 hidden text-sm font-medium md:block'>
                      {index === 0 && 'शोध'}
                      {index === 1 && 'अर्जदार'}
                      {index === 2 && 'कनेक्शन'}
                      {index === 3 && 'मालकी'}
                      {index === 4 && 'कागदपत्र'}
                      {index === 5 && 'जाहीरनामा'}
                    </span>
                  </div>
                  {index < 5 && (
                    <div
                      className={`mx-2 h-1 w-8 ${index < ['search', 'applicant', 'connection', 'property', 'documents', 'declaration'].indexOf(step) ? 'bg-[#7a1e4f]' : 'bg-gray-300'}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Mobile Search / Track */}
            {step === 'search' && (
              <div className='mx-auto  max-w-2xl'>
                {/* New Application */}
                <Card className='border-[#b01d4f]/20'>
                  <CardHeader className='border-b border-[#b01d4f]/10'>
                    <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                      <Plus className='h-6 w-6' />
                      नवीन पाणी कनेक्शन अर्ज
                    </CardTitle>
                    <CardDescription>
                      New Water Connection Application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='pt-6'>
                    <div className='space-y-4'>
                      <div>
                        <Label htmlFor='mobile' className='text-[#7a1e4f]'>
                          <div className='flex items-center gap-2'>
                            <Smartphone className='h-4 w-4' />
                            मोबाइल नंबर
                          </div>
                        </Label>
                        <Input
                          id='mobile'
                          type='tel'
                          placeholder='Enter your mobile number'
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className='mt-1'
                        />
                        <p className='mt-2 text-xs text-gray-500'>
                          • Enter your mobile number to check existing records
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleMobileSearch}
                      disabled={loading || !mobileNumber.trim() || searchBlocked}
                      className='w-full bg-[#b01d4f] hover:bg-[#7a1e4f]'
                    >
                      {loading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          शोधत आहे...
                        </>
                      ) : (
                        <>
                          <Search className='mr-2 h-4 w-4' />
                          शोधा आणि अर्ज सुरू करा
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Track Application */}
                {/* <Card className='border-[#7a1e4f]/20'>
                  <CardHeader className='border-b border-[#7a1e4f]/10'>
                    <CardTitle className='flex items-center gap-2 text-[#7a1e4f]'>
                      <Search className='h-6 w-6' />
                      अर्ज स्थिती तपासा
                    </CardTitle>
                    <CardDescription>
                      Track Application Status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='pt-6'>
                    <div className='space-y-4'>
                      <div>
                        <Label htmlFor='trackApplicationId' className='text-[#7a1e4f]'>
                          अर्ज आयडी
                        </Label>
                        <Input
                          id='trackApplicationId'
                          name='trackApplicationId'
                          value={formData.trackApplicationId}
                          onChange={handleInputChange}
                          placeholder='WTR-2024-001234'
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label htmlFor='trackMobile' className='text-[#7a1e4f]'>
                          मोबाइल नंबर
                        </Label>
                        <Input
                          id='trackMobile'
                          name='trackMobile'
                          type='tel'
                          value={formData.trackMobile}
                          onChange={handleInputChange}
                          placeholder='9876543210'
                          className='mt-1'
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleTrackApplication}
                      disabled={loading}
                      className='w-full bg-[#7a1e4f] hover:bg-[#5a1538]'
                    >
                      {loading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          तपासत आहे...
                        </>
                      ) : (
                        <>
                          <Search className='mr-2 h-4 w-4' />
                          अर्ज स्थिती तपासा
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card> */}
              </div>
            )}

            {/* Step 2: Applicant Details */}
            {step === 'applicant' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <User className='h-6 w-6' />
                    १️⃣ अर्जदाराची माहिती
                  </CardTitle>
                  <CardDescription>
                    Applicant Details
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <Label htmlFor='applicantName' className='text-[#7a1e4f]'>
                        अर्जदाराचे पूर्ण नाव *
                      </Label>
                      <Input
                        id='applicantName'
                        name='applicantName'
                        value={formData.applicantName}
                        onChange={handleInputChange}
                        required
                        className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                      />
                    </div>

                    <div>
                      <Label htmlFor='mobile' className='text-[#7a1e4f]'>
                        मोबाइल नंबर *
                      </Label>
                      <div className='mt-1 flex gap-2'>
                        <Input
                          id='mobile'
                          name='mobile'
                          type='tel'
                          value={formData.mobile}
                          onChange={handleInputChange}
                          required
                          className='border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                        <Button
                          size='sm'
                          variant='outline'
                          className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                        >
                          OTP पाठवा
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor='email' className='text-[#7a1e4f]'>
                        ईमेल आयडी (ऐच्छिक)
                      </Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                      />
                    </div>

                    <div>
                      <Label htmlFor='aadhaar' className='text-[#7a1e4f]'>
                        आधार क्रमांक (ओळखीसाठी) *
                      </Label>
                      <Input
                        id='aadhaar'
                        name='aadhaar'
                        value={formData.aadhaar}
                        onChange={handleInputChange}
                        required
                        className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                      />
                    </div>

                    <div>
                      <Label htmlFor='wardNo' className='text-[#7a1e4f]'>
                        वॉर्ड क्रमांक / झोन *
                      </Label>
                      <Select
                        value={formData.wardNo}
                        onValueChange={(value) => handleSelectChange('wardNo', value)}
                      >
                        <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                          <SelectValue placeholder='वॉर्ड निवडा' />
                        </SelectTrigger>
                        <SelectContent>
                          {wards.map((ward) => (
                            <SelectItem key={ward} value={ward}>
                              {ward}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor='relationWithOwner' className='text-[#7a1e4f]'>
                        मालकाशी नाते *
                      </Label>
                      <Select
                        value={formData.relationWithOwner}
                        onValueChange={(value) => handleSelectChange('relationWithOwner', value)}
                      >
                        <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                          <SelectValue placeholder='नाते निवडा' />
                        </SelectTrigger>
                        <SelectContent>
                          {relationsWithOwner.map((relation) => (
                            <SelectItem key={relation} value={relation}>
                              {relation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='md:col-span-2'>
                      <Label htmlFor='address' className='text-[#7a1e4f]'>
                        संपर्क पत्ता *
                      </Label>
                      <Textarea
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className='mt-1 min-h-[100px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
                  <Button
                    variant='outline'
                    onClick={() => setStep('search')}
                    className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    मागे
                  </Button>
                  <Button
                    onClick={() => setStep('connection')}
                    disabled={!formData.applicantName || !formData.mobile || !formData.aadhaar || !formData.wardNo || !formData.address}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    पुढे: पाणी कनेक्शन तपशील
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Water Connection Details */}
            {step === 'connection' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <Droplets className='h-6 w-6' />
                    २️⃣ पाणी कनेक्शन तपशील
                  </CardTitle>
                  <CardDescription>
                    Water Connection Details
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <Label htmlFor='connectionType' className='text-[#7a1e4f]'>
                          कनेक्शन प्रकार *
                        </Label>
                        <Select
                          value={formData.connectionType}
                          onValueChange={(value) => handleSelectChange('connectionType', value)}
                        >
                          <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                            <SelectValue placeholder='प्रकार निवडा' />
                          </SelectTrigger>
                          <SelectContent>
                            {connectionTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor='propertyType' className='text-[#7a1e4f]'>
                          मालमत्ता प्रकार *
                        </Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => handleSelectChange('propertyType', value)}
                        >
                          <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                            <SelectValue placeholder='प्रकार निवडा' />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor='propertyId' className='text-[#7a1e4f]'>
                          मालमत्ता आयडी / घर नंबर
                        </Label>
                        <Input
                          id='propertyId'
                          name='propertyId'
                          value={formData.propertyId}
                          onChange={handleInputChange}
                          placeholder='नगर परिषद नोंद'
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>

                      <div>
                        <Label htmlFor='numberOfResidents' className='text-[#7a1e4f]'>
                          रहिवाशांची संख्या *
                        </Label>
                        <Input
                          id='numberOfResidents'
                          name='numberOfResidents'
                          type='number'
                          value={formData.numberOfResidents}
                          onChange={handleInputChange}
                          required
                          placeholder='वापराच्या आधारे'
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>

                      <div>
                        <Label htmlFor='requiredPipeSize' className='text-[#7a1e4f]'>
                          आवश्यक पाईप साइझ *
                        </Label>
                        <Select
                          value={formData.requiredPipeSize}
                          onValueChange={(value) => handleSelectChange('requiredPipeSize', value)}
                        >
                          <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                            <SelectValue placeholder='साइझ निवडा' />
                          </SelectTrigger>
                          <SelectContent>
                            {pipeSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor='waterSource' className='text-[#7a1e4f]'>
                          पाणी स्त्रोत *
                        </Label>
                        <Select
                          value={formData.waterSource}
                          onValueChange={(value) => handleSelectChange('waterSource', value)}
                        >
                          <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                            <SelectValue placeholder='स्त्रोत निवडा' />
                          </SelectTrigger>
                          <SelectContent>
                            {waterSources.map((source) => (
                              <SelectItem key={source} value={source}>
                                {source}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='md:col-span-2'>
                        <Label htmlFor='propertyAddress' className='text-[#7a1e4f]'>
                          मालमत्तेचा पूर्ण पत्ता *
                        </Label>
                        <Textarea
                          id='propertyAddress'
                          name='propertyAddress'
                          value={formData.propertyAddress}
                          onChange={handleInputChange}
                          required
                          className='mt-1 min-h-[100px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>
                    </div>

                    {applicationId && (
                      <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                        <div className='flex items-center gap-2'>
                          <CheckCircle className='h-5 w-5 text-green-600' />
                          <div>
                            <p className='font-medium text-green-800'>अर्ज आयडी तयार झाली</p>
                            <p className='text-sm text-green-700'>{applicationId}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Fee Preview */}
                    <div className='rounded-lg border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-4'>
                      <h4 className='mb-4 font-medium text-[#7a1e4f]'>
                        फी स्ट्रक्चर ({formData.connectionType})
                      </h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-[#7a1e4f]'>अर्ज शुल्क</span>
                          <span>{formatCurrency(fees.applicationFee)}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-[#7a1e4f]'>कनेक्शन शुल्क</span>
                          <span>{formatCurrency(fees.connectionFee)}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-[#7a1e4f]'>मीटर शुल्क</span>
                          <span>{formatCurrency(fees.meterFee)}</span>
                        </div>
                        <div className='flex justify-between border-t border-[#b01d4f]/20 pt-2'>
                          <span className='font-semibold text-[#7a1e4f]'>
                            एकूण रक्कम
                          </span>
                          <span className='font-bold text-[#b01d4f]'>
                            {formatCurrency(fees.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
                  <Button
                    variant='outline'
                    onClick={() => setStep('applicant')}
                    className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    मागे: अर्जदार
                  </Button>
                  <Button
                    onClick={() => setStep('property')}
                    disabled={!formData.connectionType || !formData.propertyType || !formData.propertyAddress || !formData.numberOfResidents}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    पुढे: मालकी माहिती
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 4: Property Details */}
            {step === 'property' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <HomeSimple className='h-6 w-6' />
                    ३️⃣ मालकी / निवासी माहिती
                  </CardTitle>
                  <CardDescription>
                    Property Ownership and Residence Details
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <Label htmlFor='propertyOwnerName' className='text-[#7a1e4f]'>
                        मालकाचे पूर्ण नाव *
                      </Label>
                      <Input
                        id='propertyOwnerName'
                        name='propertyOwnerName'
                        value={formData.propertyOwnerName}
                        onChange={handleInputChange}
                        required
                        className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                      />
                    </div>

                    <div>
                      <Label htmlFor='ownershipType' className='text-[#7a1e4f]'>
                        मालकी प्रकार *
                      </Label>
                      <Select
                        value={formData.ownershipType}
                        onValueChange={(value) => handleSelectChange('ownershipType', value)}
                      >
                        <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                          <SelectValue placeholder='प्रकार निवडा' />
                        </SelectTrigger>
                        <SelectContent>
                          {ownershipTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor='yearsOfResidence' className='text-[#7a1e4f]'>
                        निवासाची वर्षे
                      </Label>
                      <Input
                        id='yearsOfResidence'
                        name='yearsOfResidence'
                        type='number'
                        value={formData.yearsOfResidence}
                        onChange={handleInputChange}
                        placeholder='किती वर्षे'
                        className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                      />
                    </div>

                    <div>
                      <Label htmlFor='wardZone' className='text-[#7a1e4f]'>
                        वॉर्ड / झोन
                      </Label>
                      <Select
                        value={formData.wardZone}
                        onValueChange={(value) => handleSelectChange('wardZone', value)}
                      >
                        <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                          <SelectValue placeholder='वॉर्ड निवडा' />
                        </SelectTrigger>
                        <SelectContent>
                          {wards.map((ward) => (
                            <SelectItem key={ward} value={ward}>
                              {ward}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
                  <Button
                    variant='outline'
                    onClick={() => setStep('connection')}
                    className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    मागे: कनेक्शन
                  </Button>
                  <Button
                    onClick={() => setStep('documents')}
                    disabled={!formData.propertyOwnerName}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    पुढे: कागदपत्र
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 5: Documents Upload */}
            {step === 'documents' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <FileText className='h-6 w-6' />
                    ४️⃣ कागदपत्रे अपलोड
                  </CardTitle>
                  <CardDescription>
                    Required Documents for Water Connection Application
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.aadhaarCard ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <File className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            आधार कार्ड
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (आवश्यक)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.aadhaarCard ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('aadhaarCard')}
                            className={
                              uploadedFiles.aadhaarCard
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.aadhaarCard ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.propertyTaxReceipt ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <ReceiptIndianRupee className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            मालमत्ता कर पावती
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (आवश्यक)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.propertyTaxReceipt ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('propertyTaxReceipt')}
                            className={
                              uploadedFiles.propertyTaxReceipt
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.propertyTaxReceipt ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.ownershipProof ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <FileSpreadsheet className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            मालकी पुरावा / भाडेकरू करार
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (आवश्यक)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.ownershipProof ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('ownershipProof')}
                            className={
                              uploadedFiles.ownershipProof
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.ownershipProof ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.buildingPermission ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <FileCheck className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            इमारत परवानगी / NA
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (सशर्त)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.buildingPermission ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('buildingPermission')}
                            className={
                              uploadedFiles.buildingPermission
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.buildingPermission ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.sitePhotograph ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <Camera className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            साइट फोटो
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (ऐच्छिक)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.sitePhotograph ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('sitePhotograph')}
                            className={
                              uploadedFiles.sitePhotograph
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.sitePhotograph ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                      <p className='text-sm text-yellow-700'>
                        📝 <strong>सूचना:</strong> आवश्यक कागदपत्रे अपलोड करणे अनिवार्य आहे. 
                        सशर्त कागदपत्रे काही विशिष्ट प्रकरणांसाठी आवश्यक आहेत.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
                  <Button
                    variant='outline'
                    onClick={() => setStep('property')}
                    className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    मागे: मालकी
                  </Button>
                  <Button
                    onClick={() => setStep('declaration')}
                    disabled={!uploadedFiles.aadhaarCard || !uploadedFiles.propertyTaxReceipt || !uploadedFiles.ownershipProof}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    पुढे: जाहीरनामा
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 6: Declaration */}
            {step === 'declaration' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <CheckCircle className='h-6 w-6' />
                    ५️⃣ अर्ज सबमिशन
                  </CardTitle>
                  <CardDescription>
                    Application Submission and Declaration
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='rounded-lg border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-6'>
                      <h4 className='mb-4 font-medium text-[#7a1e4f]'>
                        अर्ज सारांश
                      </h4>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>अर्ज आयडी</p>
                          <p className='font-medium text-[#b01d4f]'>{applicationId}</p>
                        </div>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>कनेक्शन प्रकार</p>
                          <div className='flex items-center gap-2'>
                            <Droplets className='h-4 w-4 text-[#b01d4f]' />
                            <p className='font-medium text-[#b01d4f]'>{formData.connectionType}</p>
                          </div>
                        </div>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>मालमत्ता प्रकार</p>
                          <p className='font-medium text-[#b01d4f]'>{formData.propertyType}</p>
                        </div>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>पाईप साइझ</p>
                          <p className='font-medium text-[#b01d4f]'>{formData.requiredPipeSize}</p>
                        </div>
                        <div className='md:col-span-2'>
                          <p className='text-sm text-[#7a1e4f]/80'>मालमत्ता पत्ता</p>
                          <p className='font-medium text-[#b01d4f]'>{formData.propertyAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div className='rounded-lg border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-4'>
                      <h4 className='mb-4 font-medium text-[#7a1e4f]'>
                        पेमेंट विवरण
                      </h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-[#7a1e4f]'>अर्ज शुल्क</span>
                          <span>{formatCurrency(fees.applicationFee)}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-[#7a1e4f]'>कनेक्शन शुल्क</span>
                          <span>{formatCurrency(fees.connectionFee)}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-[#7a1e4f]'>मीटर शुल्क</span>
                          <span>{formatCurrency(fees.meterFee)}</span>
                        </div>
                        <div className='flex justify-between border-t border-[#b01d4f]/20 pt-2'>
                          <span className='font-semibold text-[#7a1e4f]'>
                            एकूण रक्कम
                          </span>
                          <span className='font-bold text-[#b01d4f]'>
                            {formatCurrency(fees.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div className='flex items-start space-x-2'>
                        <Checkbox
                          id='declaration'
                          checked={formData.declaration}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              declaration: checked as boolean
                            }))
                          }
                          className='border-[#b01d4f] text-[#b01d4f] data-[state=checked]:bg-[#b01d4f] mt-1'
                        />
                        <div>
                          <label
                            htmlFor='declaration'
                            className='text-sm leading-none font-medium text-[#7a1e4f]'
                          >
                            मी याची खात्री करतो/करते की वरील माहिती खरी आहे
                          </label>
                          <p className='mt-1 text-sm text-[#7a1e4f]/70'>
                            I hereby declare that all the information provided above is true and correct to the best of my knowledge.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
                  <Button
                    variant='outline'
                    onClick={() => setStep('documents')}
                    className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    मागे: कागदपत्र
                  </Button>
                  <Button
                    onClick={handleSubmitApplication}
                    disabled={loading || !formData.declaration}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    {loading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        सबमिट करत आहे...
                      </>
                    ) : (
                      <>
                        <CreditCard className='mr-2 h-4 w-4' />
                        Submit Application & Pay {formatCurrency(fees.total)}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 7: Confirmation */}
            {step === 'confirmation' && (
              <Card className='mx-auto max-w-4xl border-[#7a1e4f]/20'>
                <CardHeader className='border-b border-[#7a1e4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#7a1e4f]'>
                    <CheckCircle className='h-8 w-8' />
                    Application Submitted Successfully!
                  </CardTitle>
                  <CardDescription>
                    Your water connection application has been submitted and is being processed
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='rounded-lg border border-[#7a1e4f]/20 bg-[#7a1e4f]/5 p-6 text-center'>
                      <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#7a1e4f]/10'>
                        <CheckCircle className='h-12 w-12 text-[#7a1e4f]' />
                      </div>
                      <h3 className='mb-2 text-2xl font-bold text-[#7a1e4f]'>
                        Application Confirmed
                      </h3>
                      <p className='text-[#7a1e4f]/80'>
                        Application ID: {applicationId || applicantData?.applicationNo || 'WTR-APP-'+Date.now().toString().slice(-10)}
                      </p>
                      <p className='mt-4 text-lg text-[#b01d4f]'>
                        Status: <span className='font-bold'>{applicantData?.status ? renderStatusBadge(applicantData.status) : 'Under Review'}</span>
                      </p>
                    </div>

                    {applicantData ? (
                      <>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                            <p className='text-sm text-[#7a1e4f]'>Applicant Name</p>
                            <p className='font-medium text-[#b01d4f]'>
                              {applicantData.applicantName}
                            </p>
                          </div>
                          <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                            <p className='text-sm text-[#7a1e4f]'>Connection Type</p>
                            <p className='font-medium text-[#b01d4f]'>
                              {applicantData.connectionType}
                            </p>
                          </div>
                          <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                            <p className='text-sm text-[#7a1e4f]'>Property Type</p>
                            <p className='font-medium text-[#b01d4f]'>
                              {applicantData.propertyType}
                            </p>
                          </div>
                          <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                            <p className='text-sm text-[#7a1e4f]'>Processing Time</p>
                            <p className='font-medium text-[#b01d4f]'>
                              7-15 Working Days
                            </p>
                          </div>
                        </div>

                        {applicantData.officerRemarks && (
                          <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                            <h4 className='mb-2 font-medium text-blue-800'>
                              Officer Remarks
                            </h4>
                            <p className='text-sm text-blue-700'>
                              {applicantData.officerRemarks}
                            </p>
                          </div>
                        )}

                        <div className='rounded-lg border border-[#7a1e4f]/20 bg-[#7a1e4f]/5 p-4'>
                          <h4 className='mb-2 flex items-center gap-2 font-medium text-[#7a1e4f]'>
                            <CheckCircle className='h-4 w-4' />
                            What happens next?
                          </h4>
                          <ul className='space-y-2 text-sm text-[#7a1e4f]'>
                            <li className='flex items-center gap-2'>
                              <CheckCircle className='h-3 w-3 text-green-600' />
                              Application verification in progress
                            </li>
                            <li className='flex items-center gap-2'>
                              <CheckCircle className='h-3 w-3 text-green-600' />
                              Site inspection will be scheduled
                            </li>
                            <li className='flex items-center gap-2'>
                              <CheckCircle className='h-3 w-3 text-green-600' />
                              You will receive SMS/Email updates
                            </li>
                            <li className='flex items-center gap-2'>
                              <CheckCircle className='h-3 w-3 text-green-600' />
                              Connection will be installed after approval
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className='rounded-lg border border-[#7a1e4f]/20 bg-[#7a1e4f]/5 p-4'>
                        <h4 className='mb-2 flex items-center gap-2 font-medium text-[#7a1e4f]'>
                          <CheckCircle className='h-4 w-4' />
                          What happens next?
                        </h4>
                        <ul className='space-y-2 text-sm text-[#7a1e4f]'>
                          <li className='flex items-center gap-2'>
                            <CheckCircle className='h-3 w-3 text-green-600' />
                            Application verification in progress
                          </li>
                          <li className='flex items-center gap-2'>
                            <CheckCircle className='h-3 w-3 text-green-600' />
                            Site inspection will be scheduled
                          </li>
                          <li className='flex items-center gap-2'>
                            <CheckCircle className='h-3 w-3 text-green-600' />
                            You will receive SMS/Email updates
                          </li>
                          <li className='flex items-center gap-2'>
                            <CheckCircle className='h-3 w-3 text-green-600' />
                            Connection will be installed after approval
                          </li>
                        </ul>
                      </div>
                    )}

                    <div className='flex gap-4'>
                      <Button
                        variant='outline'
                        onClick={() => {
                          // Download acknowledgement logic
                          alert('Acknowledgement download functionality to be implemented');
                        }}
                        className='flex-1 border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                      >
                        <Download className='mr-2 h-4 w-4' />
                        Download Acknowledgement
                      </Button>
                      <Button
                        onClick={() => {
                          setStep('search');
                          setApplicantData(null);
                          setMobileNumber('');
                          setApplicationId('');
                          setFormData({
                            applicantName: '',
                            mobile: '',
                            email: '',
                            aadhaar: '',
                            address: '',
                            wardNo: '',
                            relationWithOwner: 'स्वतः',
                            connectionType: 'घरगुती',
                            propertyType: 'निवासी',
                            propertyId: '',
                            propertyAddress: '',
                            numberOfResidents: '',
                            requiredPipeSize: '¾"',
                            waterSource: 'नगर परिषद',
                            propertyOwnerName: '',
                            ownershipType: 'स्वतःचे',
                            yearsOfResidence: '',
                            wardZone: '',
                            declaration: false,
                            trackApplicationId: '',
                            trackMobile: ''
                          });
                          setUploadedFiles({
                            aadhaarCard: false,
                            propertyTaxReceipt: false,
                            ownershipProof: false,
                            buildingPermission: false,
                            sitePhotograph: false
                          });
                        }}
                        className='flex-1 bg-[#b01d4f] hover:bg-[#7a1e4f]'
                      >
                        New Application
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Admin View */}
        {view === 'admin' && (
          <div className='space-y-6'>
            {/* Admin Header */}
            <Card className='border-[#7a1e4f]/20'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-[#7a1e4f]'>
                  <Shield className='h-6 w-6' />
                  प्रशासकीय पाणी कनेक्शन व्यवस्थापन
                </CardTitle>
                <CardDescription>
                  Admin Water Connection Management Dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  <div className='rounded-lg bg-blue-50 p-4'>
                    <p className='text-sm text-blue-700'>एकूण अर्ज</p>
                    <p className='text-2xl font-bold text-blue-800'>{dummyWaterApplications.length}</p>
                  </div>
                  <div className='rounded-lg bg-yellow-50 p-4'>
                    <p className='text-sm text-yellow-700'>प्रलंबित</p>
                    <p className='text-2xl font-bold text-yellow-800'>
                      {dummyWaterApplications.filter(c => c.status === 'Pending').length}
                    </p>
                  </div>
                  <div className='rounded-lg bg-blue-50 p-4'>
                    <p className='text-sm text-blue-700'>साइट तपासणी</p>
                    <p className='text-2xl font-bold text-blue-800'>
                      {dummyWaterApplications.filter(c => c.status === 'Site-Inspection').length}
                    </p>
                  </div>
                  <div className='rounded-lg bg-green-50 p-4'>
                    <p className='text-sm text-green-700'>मंजूर</p>
                    <p className='text-2xl font-bold text-green-800'>
                      {dummyWaterApplications.filter(c => c.status === 'Approved').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className='border-[#7a1e4f]/20'>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div>
                    <Label className='text-[#7a1e4f]'>स्थितीनुसार फिल्टर</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder='सर्व स्थिती' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=''>सर्व स्थिती</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className='text-[#7a1e4f]'>वॉर्डनुसार फिल्टर</Label>
                    <Select value={filterWard} onValueChange={setFilterWard}>
                      <SelectTrigger>
                        <SelectValue placeholder='सर्व वॉर्ड' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=''>सर्व वॉर्ड</SelectItem>
                        {wards.map((ward) => (
                          <SelectItem key={ward} value={ward}>
                            {ward}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex items-end'>
                    <Button
                      onClick={() => {
                        setFilterStatus('');
                        setFilterWard('');
                      }}
                      variant='outline'
                      className='w-full border-[#7a1e4f] text-[#7a1e4f] hover:bg-[#7a1e4f]/10'
                    >
                      <RefreshCw className='mr-2 h-4 w-4' />
                      फिल्टर रीसेट
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applications Table */}
            <Card className='border-[#7a1e4f]/20'>
              <CardHeader>
                <CardTitle className='text-[#7a1e4f]'>पाणी कनेक्शन अर्ज यादी</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b border-gray-200'>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>अर्ज आयडी</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>अर्जदार</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>वॉर्ड</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>कनेक्शन प्रकार</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>स्थिती</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>क्रिया</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {currentApplications.map((application) => (
                        <tr key={application.id} className='hover:bg-gray-50'>
                          <td className='px-4 py-3 text-sm font-medium text-gray-900'>
                            {application.applicationNo}
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-700'>
                            {application.applicantName}
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-700'>
                            {application.wardNo}
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-700'>
                            <div className='flex items-center gap-2'>
                              <Droplets className='h-4 w-4 text-[#b01d4f]' />
                              {application.connectionType}
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            {renderStatusBadge(application.status)}
                          </td>
                          <td className='px-4 py-3'>
                            <Button
                              size='sm'
                              variant='outline'
                              className='border-[#7a1e4f] text-[#7a1e4f] hover:bg-[#7a1e4f]/10'
                              onClick={() => {
                                setApplicantData(application);
                                setView('user');
                                setStep('confirmation');
                              }}
                            >
                              <Eye className='h-4 w-4' />
                              <span className='ml-2'>पहा</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='mt-6 flex items-center justify-between'>
                    <div className='text-sm text-gray-700'>
                      पान {currentPage} पैकी {totalPages}
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className='border-[#7a1e4f] text-[#7a1e4f] hover:bg-[#7a1e4f]/10'
                      >
                        <ChevronLeft className='h-4 w-4' />
                        मागील
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className='border-[#7a1e4f] text-[#7a1e4f] hover:bg-[#7a1e4f]/10'
                      >
                        पुढील
                        <ChevronRight className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
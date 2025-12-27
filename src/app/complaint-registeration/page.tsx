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
  Search,
  Upload,
  FileText,
  User,
  Smartphone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Home,
  Phone,
  Camera,
  File,
  CheckCircle,
  Eye,
  EyeOff,
  XCircle,
  Filter,
  Download,
  Send,
  Plus,
  ChevronRight,
  ChevronLeft,
  Loader2,
  MessageSquare,
  Image as ImageIcon,
  Video,
  FileCheck,
  Building,
  Wrench,
  Droplets,
  Trash2,
  Lightbulb,
  Shield,
  RefreshCw
} from 'lucide-react';
import Image from 'next/image';

interface ComplaintData {
  id: string;
  complaintNo: string;
  
  // Complainant Details
  complainantName: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  wardNo: string;
  
  // Complaint Details
  category: string;
  subCategory: string;
  title: string;
  description: string;
  location: string;
  landmark: string;
  complaintDate: string;
  priority: string;
  
  // Status Details
  status: 'Pending' | 'In-Progress' | 'Resolved' | 'Rejected';
  assignedTo: string;
  assignedDepartment: string;
  resolutionDate: string;
  officerRemarks: string;
  resolutionRemarks: string;
  feedbackRating: number;
  
  // Files
  photo: string;
  video: string;
  document: string;
}

const dummyComplaints: ComplaintData[] = [
  {
    id: '1',
    complaintNo: 'COMP-2024-001234',
    complainantName: 'राजेश कुमार शर्मा',
    mobile: '9876543210',
    email: 'rajesh.sharma@example.com',
    aadhaar: '1234-5678-9012',
    address: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, शेगांव',
    wardNo: 'वॉर्ड क्र. 5',
    category: 'पाणी',
    subCategory: 'पाणी पुरवठा थांबला',
    title: 'पाणी पुरवठा ३ दिवस थांबला आहे',
    description: 'गांधी रोड, शिवाजी नगर येथे गेल्या ३ दिवसांपासून पाणी पुरवठा पूर्णपणे थांबला आहे. लोकांना मोठ्या प्रमाणात त्रास होत आहे.',
    location: 'गांधी रोड, शिवाजी नगर',
    landmark: 'शिवाजी स्टॅच्यूजमागे',
    complaintDate: '2024-01-15',
    priority: 'तातडीची',
    status: 'In-Progress',
    assignedTo: 'अनिल पाटील',
    assignedDepartment: 'पाणी पुरवठा विभाग',
    resolutionDate: '',
    officerRemarks: 'तपासणी करण्यासाठी तंत्रज्ञ पाठवले',
    resolutionRemarks: '',
    feedbackRating: 0,
    photo: '/assets/complaints/water1.jpg',
    video: '',
    document: ''
  },
  {
    id: '2',
    complaintNo: 'COMP-2024-001235',
    complainantName: 'सुनिता देशपांडे',
    mobile: '8765432109',
    email: 'sunita.d@example.com',
    aadhaar: '2345-6789-0123',
    address: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, शेगांव',
    wardNo: 'वॉर्ड क्र. 3',
    category: 'स्वच्छता',
    subCategory: 'कचरा गोळा नाही',
    title: 'कचरा गोळा न करणे',
    description: 'वरदानगर परिसरात गेल्या ५ दिवसांपासून कचरा गोळा केला जात नाही. कचरा ढीग वाढत चालला आहे आणि दुर्गंधीची समस्या निर्माण झाली आहे.',
    location: 'वरदानगर, सह्याद्री सोसायटी समोर',
    landmark: 'सह्याद्री सोसायटी मुख्य गेट',
    complaintDate: '2024-01-14',
    priority: 'सामान्य',
    status: 'Pending',
    assignedTo: '',
    assignedDepartment: 'स्वच्छता विभाग',
    resolutionDate: '',
    officerRemarks: '',
    resolutionRemarks: '',
    feedbackRating: 0,
    photo: '/assets/complaints/garbage1.jpg',
    video: '',
    document: ''
  },
  {
    id: '3',
    complaintNo: 'COMP-2024-001236',
    complainantName: 'अजय पाटील',
    mobile: '7654321098',
    email: 'ajay.patil@example.com',
    aadhaar: '3456-7890-1234',
    address: 'गाव: शिंदेवाडी, ता: शेगांव, जि: बुलढाणा',
    wardNo: 'वॉर्ड क्र. 8',
    category: 'रस्ता',
    subCategory: 'रस्त्यावर खड्डे',
    title: 'रस्त्यावर मोठे खड्डे',
    description: 'शिंदेवाडी ते शेगांव रस्त्यावर अनेक ठिकाणी मोठे खड्डे झाले आहेत. वाहतुकीसाठी धोका निर्माण झाला आहे. गाड्या खड्ड्यात अडकतात.',
    location: 'शिंदेवाडी ते शेगांव रस्ता',
    landmark: 'पान देवस्थानजवळ',
    complaintDate: '2024-01-13',
    priority: 'तातडीची',
    status: 'Resolved',
    assignedTo: 'संजय निकम',
    assignedDepartment: 'रस्ता विभाग',
    resolutionDate: '2024-01-20',
    officerRemarks: 'खड्डे भरण्याचे काम सुरू केले',
    resolutionRemarks: 'सर्व खड्डे भरून रस्ता दुरुस्त करण्यात आला आहे',
    feedbackRating: 4,
    photo: '/assets/complaints/road1.jpg',
    video: '',
    document: ''
  },
  {
    id: '4',
    complaintNo: 'COMP-2024-001237',
    complainantName: 'मीना शिंदे',
    mobile: '6543210987',
    email: 'meena.shinde@example.com',
    aadhaar: '4567-8901-2345',
    address: 'कुंभारवाडा, शेगांव',
    wardNo: 'वॉर्ड क्र. 2',
    category: 'स्ट्रीटलाइट',
    subCategory: 'स्ट्रीटलाइट खराब',
    title: 'स्ट्रीटलाइट चालू नाही',
    description: 'कुंभारवाडा परिसरातील ५ स्ट्रीटलाइट गेल्या १५ दिवसांपासून खराब आहेत. संध्याकाळी अंधारामुळे सुरक्षेची समस्या निर्माण झाली आहे.',
    location: 'कुंभारवाडा मुख्य रस्ता',
    landmark: 'हनुमान मंदिरजवळ',
    complaintDate: '2024-01-12',
    priority: 'सामान्य',
    status: 'In-Progress',
    assignedTo: 'रवींद्र जाधव',
    assignedDepartment: 'वीज विभाग',
    resolutionDate: '',
    officerRemarks: 'तंत्रज्ञ पाठवण्यात आला आहे',
    resolutionRemarks: '',
    feedbackRating: 0,
    photo: '/assets/complaints/streetlight1.jpg',
    video: '',
    document: ''
  }
];

const categories = [
  { value: 'पाणी', label: 'पाणी', icon: Droplets, subCategories: [
    'पाणी पुरवठा थांबला',
    'पाणी गळती',
    'पाणीचा दर्जा खराब',
    'पाणी बिल समस्या',
    'इतर'
  ]},
  { value: 'स्वच्छता', label: 'स्वच्छता', icon: Trash2, subCategories: [
    'कचरा गोळा नाही',
    'कचरा डब्बा भरला',
    'सफाई कर्मचारी नाही',
    'दुर्गंधीची समस्या',
    'इतर'
  ]},
  { value: 'रस्ता', label: 'रस्ता', icon: Wrench, subCategories: [
    'रस्त्यावर खड्डे',
    'रस्ता दुरुस्ती आवश्यक',
    'नाला भरला',
    'प्रकाश नाही',
    'इतर'
  ]},
  { value: 'स्ट्रीटलाइट', label: 'स्ट्रीटलाइट', icon: Lightbulb, subCategories: [
    'स्ट्रीटलाइट खराब',
    'स्ट्रीटलाइट फ्यूज',
    'नवीन स्ट्रीटलाइट आवश्यक',
    'तासाप्रमाणे चालू नाही',
    'इतर'
  ]},
  { value: 'घरपट्टी', label: 'घरपट्टी', icon: Home, subCategories: [
    'घरपट्टी बिल त्रुटी',
    'घरपट्टी राहिला',
    'नवीन कनेक्शन',
    'बिल नाही आले',
    'इतर'
  ]},
  { value: 'इतर', label: 'इतर', icon: Building, subCategories: [
    'सार्वजनिक स्वच्छता',
    'उद्यान देखभाल',
    'नागरी सुविधा',
    'सुरक्षा समस्या',
    'इतर'
  ]}
];

const wards = [
  'वॉर्ड क्र. 1', 'वॉर्ड क्र. 2', 'वॉर्ड क्र. 3', 'वॉर्ड क्र. 4', 'वॉर्ड क्र. 5',
  'वॉर्ड क्र. 6', 'वॉर्ड क्र. 7', 'वॉर्ड क्र. 8', 'वॉर्ड क्र. 9', 'वॉर्ड क्र. 10'
];

const priorities = [
  { value: 'सामान्य', label: 'सामान्य', color: 'bg-blue-100 text-blue-800' },
  { value: 'तातडीची', label: 'तातडीची', color: 'bg-red-100 text-red-800' }
];

const statuses = [
  { value: 'Pending', label: 'प्रलंबित', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'In-Progress', label: 'चालू आहे', color: 'bg-blue-100 text-blue-800' },
  { value: 'Resolved', label: 'सोडवले', color: 'bg-green-100 text-green-800' },
  { value: 'Rejected', label: 'नाकारले', color: 'bg-red-100 text-red-800' }
];

export default function ComplaintManagementSystem() {
  const [step, setStep] = useState<'search' | 'complainant' | 'complaint' | 'documents' | 'submission' | 'tracking' | 'admin'>('search');
  const [loading, setLoading] = useState(false);
  const [complainantData, setComplainantData] = useState<ComplaintData | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [complaintId, setComplaintId] = useState('');
  const [showTrackForm, setShowTrackForm] = useState(false);
  const [view, setView] = useState<'user' | 'admin'>('user');
  
  const [formData, setFormData] = useState({
    // Complainant Details
    complainantName: '',
    mobile: '',
    email: '',
    aadhaar: '',
    address: '',
    wardNo: '',
    
    // Complaint Details
    category: '',
    subCategory: '',
    title: '',
    description: '',
    location: '',
    landmark: '',
    complaintDate: new Date().toISOString().split('T')[0],
    priority: 'सामान्य',
    
    // Declaration
    declaration: false,
    
    // For tracking
    trackComplaintId: '',
    trackMobile: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState({
    photo: false,
    video: false,
    document: false
  });
  
  const [searchAttempts, setSearchAttempts] = useState(0);
  const [searchBlocked, setSearchBlocked] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterWard, setFilterWard] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Auto-generate complaint number when complaint details are filled
    if (step === 'complaint' && formData.category && formData.title) {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const complaintNo = `COMP-${new Date().getFullYear()}-${timestamp}${random}`;
      setComplaintId(complaintNo);
    }
  }, [step, formData.category, formData.title]);

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
      const foundRecord = dummyComplaints.find((record) => 
        record.mobile === mobileNumber
      );

      if (foundRecord) {
        setComplainantData(foundRecord);
        setFormData({
          complainantName: foundRecord.complainantName,
          mobile: foundRecord.mobile,
          email: foundRecord.email,
          aadhaar: foundRecord.aadhaar,
          address: foundRecord.address,
          wardNo: foundRecord.wardNo,
          category: '',
          subCategory: '',
          title: '',
          description: '',
          location: '',
          landmark: '',
          complaintDate: new Date().toISOString().split('T')[0],
          priority: 'सामान्य',
          declaration: false,
          trackComplaintId: '',
          trackMobile: ''
        });
        setStep('complaint');
      } else {
        setStep('complainant');
      }
      setLoading(false);
    }, 1500);
  };

  const handleTrackComplaint = () => {
    if (!formData.trackComplaintId.trim() || !formData.trackMobile.trim()) {
      alert('Please enter both Complaint ID and Mobile Number');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const foundRecord = dummyComplaints.find((record) => 
        record.complaintNo === formData.trackComplaintId && 
        record.mobile === formData.trackMobile
      );

      if (foundRecord) {
        setComplainantData(foundRecord);
        setView('user');
      } else {
        alert('No complaint found with the given details');
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

  const handleFileUpload = (type: keyof typeof uploadedFiles) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));
    console.log(`${type} uploaded successfully`);
  };

  const handleSubmitComplaint = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('submission');
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : Building;
  };

  const getSubCategories = () => {
    const category = categories.find(c => c.value === formData.category);
    return category ? category.subCategories : [];
  };

  const filteredComplaints = dummyComplaints.filter(complaint => {
    return (
      (!filterCategory || complaint.category === filterCategory) &&
      (!filterStatus || complaint.status === filterStatus) &&
      (!filterWard || complaint.wardNo === filterWard)
    );
  });

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, startIndex + itemsPerPage);

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

  const renderPriorityBadge = (priority: string) => {
    const priorityInfo = priorities.find(p => p.value === priority);
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityInfo?.color || 'bg-gray-100 text-gray-800'}`}>
        {priorityInfo?.label || priority}
      </span>
    );
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8'>
      <div className='max-w-full px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <MessageSquare className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              तक्रार व्यवस्थापन प्रणाली
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#b01d4f]/10 p-3'>
              <AlertCircle className='h-8 w-8 text-[#b01d4f]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद तक्रार पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Complaint Portal
              </p>
            </div>
          </div>
        </div>

        {/* User View */}
        {view === 'user' && (
          <>
            {/* Progress Steps */}
            <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
              {['search', 'complainant', 'complaint', 'documents', 'submission'].map((stepName, index) => (
                <div key={stepName} className='flex items-center'>
                  <div
                    className={`flex items-center ${step === stepName ? 'text-[#b01d4f]' : index < ['search', 'complainant', 'complaint', 'documents', 'submission'].indexOf(step) ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
                  >
                    <div
                      className={`flex h-3 w-3 lg:h-8 lg:w-8 md:h-8 md:w-8 items-center justify-center rounded-full ${step === stepName ? 'bg-[#b01d4f]/10' : index < ['search', 'complainant', 'complaint', 'documents', 'submission'].indexOf(step) ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
                    >
                      {index === 0 && <Search className='h-4 w-4' />}
                      {index === 1 && <User className='h-4 w-4' />}
                      {index === 2 && <MessageSquare className='h-4 w-4' />}
                      {index === 3 && <FileText className='h-4 w-4' />}
                      {index === 4 && <CheckCircle className='h-4 w-4' />}
                    </div>
                    <span className='ml-2 hidden text-sm font-medium md:block'>
                      {index === 0 && 'शोध'}
                      {index === 1 && 'तक्रारदार'}
                      {index === 2 && 'तक्रार'}
                      {index === 3 && 'कागदपत्र'}
                      {index === 4 && 'सबमिशन'}
                    </span>
                  </div>
                  {index < 4 && (
                    <div
                      className={`mx-2 h-1 w-8 ${index < ['search', 'complainant', 'complaint', 'documents', 'submission'].indexOf(step) ? 'bg-[#7a1e4f]' : 'bg-gray-300'}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Mobile Search / Track */}
            {step === 'search' && (
              <div className='mx-auto max-w-2xl space-y-6'>
                {/* New Complaint */}
                <Card className='border-[#b01d4f]/20'>
                  <CardHeader className='border-b border-[#b01d4f]/10'>
                    <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                      <Plus className='h-6 w-6' />
                      नवीन तक्रार नोंदवा
                    </CardTitle>
                    <CardDescription>
                      New Complaint Registration
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
                          शोधा आणि तक्रार सुरू करा
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Step 2: Complainant Details */}
            {step === 'complainant' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <User className='h-6 w-6' />
                    १️⃣ तक्रारदाराची माहिती
                  </CardTitle>
                  <CardDescription>
                    Complainant Details
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <Label htmlFor='complainantName' className='text-[#7a1e4f]'>
                        तक्रार करणाऱ्याचे पूर्ण नाव *
                      </Label>
                      <Input
                        id='complainantName'
                        name='complainantName'
                        value={formData.complainantName}
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
                        आधार क्रमांक (ऐच्छिक)
                      </Label>
                      <Input
                        id='aadhaar'
                        name='aadhaar'
                        value={formData.aadhaar}
                        onChange={handleInputChange}
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
                    onClick={() => setStep('complaint')}
                    disabled={!formData.complainantName || !formData.mobile || !formData.wardNo || !formData.address}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    पुढे: तक्रार तपशील
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 3: Complaint Details */}
            {step === 'complaint' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <MessageSquare className='h-6 w-6' />
                    २️⃣ तक्रार तपशील
                  </CardTitle>
                  <CardDescription>
                    Complaint Details
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <Label htmlFor='category' className='text-[#7a1e4f]'>
                          तक्रार श्रेणी *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange('category', value)}
                        >
                          <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                            <SelectValue placeholder='श्रेणी निवडा' />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => {
                              const Icon = category.icon;
                              return (
                                <SelectItem key={category.value} value={category.value}>
                                  <div className='flex items-center gap-2'>
                                    <Icon className='h-4 w-4' />
                                    {category.label}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor='subCategory' className='text-[#7a1e4f]'>
                          उपश्रेणी *
                        </Label>
                        <Select
                          value={formData.subCategory}
                          onValueChange={(value) => handleSelectChange('subCategory', value)}
                          disabled={!formData.category}
                        >
                          <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                            <SelectValue placeholder='प्रथम श्रेणी निवडा' />
                          </SelectTrigger>
                          <SelectContent>
                            {getSubCategories().map((subCat) => (
                              <SelectItem key={subCat} value={subCat}>
                                {subCat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='md:col-span-2'>
                        <Label htmlFor='title' className='text-[#7a1e4f]'>
                          तक्रार शीर्षक *
                        </Label>
                        <Input
                          id='title'
                          name='title'
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          placeholder='थोडक्यात समस्या'
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>

                      <div className='md:col-span-2'>
                        <Label htmlFor='description' className='text-[#7a1e4f]'>
                          तक्रार वर्णन *
                        </Label>
                        <Textarea
                          id='description'
                          name='description'
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          placeholder='सविस्तर माहिती'
                          className='mt-1 min-h-[120px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>

                      <div>
                        <Label htmlFor='location' className='text-[#7a1e4f]'>
                          तक्रार ठिकाण *
                        </Label>
                        <Input
                          id='location'
                          name='location'
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          placeholder='रस्ता / परिसर'
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>

                      <div>
                        <Label htmlFor='landmark' className='text-[#7a1e4f]'>
                          ओळख चिन्ह
                        </Label>
                        <Input
                          id='landmark'
                          name='landmark'
                          value={formData.landmark}
                          onChange={handleInputChange}
                          placeholder='ओळख पटण्यासाठी'
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>

                      <div>
                        <Label htmlFor='complaintDate' className='text-[#7a1e4f]'>
                          तक्रार तारीख
                        </Label>
                        <Input
                          id='complaintDate'
                          name='complaintDate'
                          type='date'
                          value={formData.complaintDate}
                          onChange={handleInputChange}
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>

                      <div>
                        <Label htmlFor='priority' className='text-[#7a1e4f]'>
                          प्राधान्य *
                        </Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => handleSelectChange('priority', value)}
                        >
                          <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                            <SelectValue placeholder='प्राधान्य निवडा' />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {complaintId && (
                      <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                        <div className='flex items-center gap-2'>
                          <CheckCircle className='h-5 w-5 text-green-600' />
                          <div>
                            <p className='font-medium text-green-800'>तक्रार आयडी तयार झाली</p>
                            <p className='text-sm text-green-700'>{complaintId}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
                  <Button
                    variant='outline'
                    onClick={() => setStep('complainant')}
                    className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    मागे: तक्रारदार
                  </Button>
                  <Button
                    onClick={() => setStep('documents')}
                    disabled={!formData.category || !formData.subCategory || !formData.title || !formData.description || !formData.location}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    पुढे: कागदपत्र
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 4: Documents */}
            {step === 'documents' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <FileText className='h-6 w-6' />
                    ३️⃣ कागदपत्र / पुरावा
                  </CardTitle>
                  <CardDescription>
                    Attachments and Supporting Documents
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.photo ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <Camera className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            फोटो
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (ऐच्छिक)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.photo ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('photo')}
                            className={
                              uploadedFiles.photo
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.photo ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.video ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <Video className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            व्हिडिओ
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (ऐच्छिक)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.video ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('video')}
                            className={
                              uploadedFiles.video
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.video ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`rounded-lg border-2 p-4 ${uploadedFiles.document ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                      >
                        <div className='flex flex-col items-center text-center'>
                          <div className='mb-3 rounded-full bg-[#b01d4f]/10 p-3'>
                            <File className='h-6 w-6 text-[#b01d4f]' />
                          </div>
                          <h4 className='mb-1 font-medium text-[#7a1e4f]'>
                            पुराव्याचे कागद
                          </h4>
                          <p className='mb-3 text-xs text-[#7a1e4f]/80'>
                            (ऐच्छिक)
                          </p>
                          <Button
                            size='sm'
                            variant={uploadedFiles.document ? 'outline' : 'default'}
                            onClick={() => handleFileUpload('document')}
                            className={
                              uploadedFiles.document
                                ? 'border-[#7a1e4f] text-[#7a1e4f]'
                                : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                            }
                          >
                            {uploadedFiles.document ? 'Uploaded' : 'Upload'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                      <p className='text-sm text-blue-700'>
                        💡 <strong>सूचना:</strong> फोटो, व्हिडिओ किंवा इतर पुरावे अपलोड करणे ऐच्छिक आहे. 
                        पुरावे उपलब्ध असल्यास तक्रार लवकर हाताळली जाईल.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
                  <Button
                    variant='outline'
                    onClick={() => setStep('complaint')}
                    className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    मागे: तक्रार
                  </Button>
                  <Button
                    onClick={() => setStep('submission')}
                    className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    पुढे: सबमिशन
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Step 5: Submission */}
            {step === 'submission' && (
              <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
                <CardHeader className='border-b border-[#b01d4f]/10'>
                  <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                    <CheckCircle className='h-6 w-6' />
                    ४️⃣ तक्रार सबमिशन
                  </CardTitle>
                  <CardDescription>
                    Complaint Submission and Declaration
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='space-y-6'>
                    <div className='rounded-lg border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-6'>
                      <h4 className='mb-4 font-medium text-[#7a1e4f]'>
                        तक्रार सारांश
                      </h4>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>तक्रार आयडी</p>
                          <p className='font-medium text-[#b01d4f]'>{complaintId}</p>
                        </div>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>श्रेणी</p>
                          <div className='flex items-center gap-2'>
                            {formData.category && (
                              <>
                                {(() => {
                                  const Icon = getCategoryIcon(formData.category);
                                  return <Icon className='h-4 w-4 text-[#b01d4f]' />;
                                })()}
                                <p className='font-medium text-[#b01d4f]'>{formData.category}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>उपश्रेणी</p>
                          <p className='font-medium text-[#b01d4f]'>{formData.subCategory}</p>
                        </div>
                        <div>
                          <p className='text-sm text-[#7a1e4f]/80'>प्राधान्य</p>
                          {renderPriorityBadge(formData.priority)}
                        </div>
                        <div className='md:col-span-2'>
                          <p className='text-sm text-[#7a1e4f]/80'>तक्रार शीर्षक</p>
                          <p className='font-medium text-[#b01d4f]'>{formData.title}</p>
                        </div>
                        <div className='md:col-span-2'>
                          <p className='text-sm text-[#7a1e4f]/80'>तक्रार ठिकाण</p>
                          <p className='font-medium text-[#b01d4f]'>{formData.location}</p>
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
                            माहिती खरी आहे याची मी खात्री करतो/करते
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
                    onClick={handleSubmitComplaint}
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
                        <Send className='mr-2 h-4 w-4' />
                        तक्रार सबमिट करा
                      </>
                    )}
                  </Button>
                </CardFooter>
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
                  प्रशासकीय तक्रार व्यवस्थापन
                </CardTitle>
                <CardDescription>
                  Admin Complaint Management Dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  <div className='rounded-lg bg-blue-50 p-4'>
                    <p className='text-sm text-blue-700'>एकूण तक्रार</p>
                    <p className='text-2xl font-bold text-blue-800'>{dummyComplaints.length}</p>
                  </div>
                  <div className='rounded-lg bg-yellow-50 p-4'>
                    <p className='text-sm text-yellow-700'>प्रलंबित</p>
                    <p className='text-2xl font-bold text-yellow-800'>
                      {dummyComplaints.filter(c => c.status === 'Pending').length}
                    </p>
                  </div>
                  <div className='rounded-lg bg-blue-50 p-4'>
                    <p className='text-sm text-blue-700'>चालू आहेत</p>
                    <p className='text-2xl font-bold text-blue-800'>
                      {dummyComplaints.filter(c => c.status === 'In-Progress').length}
                    </p>
                  </div>
                  <div className='rounded-lg bg-green-50 p-4'>
                    <p className='text-sm text-green-700'>सोडवले</p>
                    <p className='text-2xl font-bold text-green-800'>
                      {dummyComplaints.filter(c => c.status === 'Resolved').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className='border-[#7a1e4f]/20'>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div>
                    <Label className='text-[#7a1e4f]'>श्रेणीनुसार फिल्टर</Label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder='सर्व श्रेण्या' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=''>सर्व श्रेण्या</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                        setFilterCategory('');
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

            {/* Complaints Table */}
            <Card className='border-[#7a1e4f]/20'>
              <CardHeader>
                <CardTitle className='text-[#7a1e4f]'>तक्रार यादी</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b border-gray-200'>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>तक्रार आयडी</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>श्रेणी</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>तक्रारदार</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>वॉर्ड</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>प्राधान्य</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>स्थिती</th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-[#7a1e4f]'>क्रिया</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {currentComplaints.map((complaint) => (
                        <tr key={complaint.id} className='hover:bg-gray-50'>
                          <td className='px-4 py-3 text-sm font-medium text-gray-900'>
                            {complaint.complaintNo}
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex items-center gap-2'>
                              {(() => {
                                const Icon = getCategoryIcon(complaint.category);
                                return <Icon className='h-4 w-4 text-[#b01d4f]' />;
                              })()}
                              <span className='text-sm text-gray-700'>{complaint.category}</span>
                            </div>
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-700'>
                            {complaint.complainantName}
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-700'>
                            {complaint.wardNo}
                          </td>
                          <td className='px-4 py-3'>
                            {renderPriorityBadge(complaint.priority)}
                          </td>
                          <td className='px-4 py-3'>
                            {renderStatusBadge(complaint.status)}
                          </td>
                          <td className='px-4 py-3'>
                            <Button
                              size='sm'
                              variant='outline'
                              className='border-[#7a1e4f] text-[#7a1e4f] hover:bg-[#7a1e4f]/10'
                              onClick={() => {
                                setComplainantData(complaint);
                                setView('user');
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
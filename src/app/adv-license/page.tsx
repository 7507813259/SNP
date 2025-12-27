'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
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
  ReceiptIndianRupee,
  User,
  Smartphone,
  Mail,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Download,
  Package,
  Building,
  Home,
  Calendar,
  Clock,
  MapPin,
  FileCheck,
  Shield,
  BadgeCheck,
  Info,
  Hash,
  FileUp
} from 'lucide-react';

// Interface for Generic Application Data
interface ApplicationData {
  // 1️⃣ अर्जदाराची माहिती (Applicant Details)
  applicantName: string;
  applicantType: 'वैयक्तिक' | 'संस्था' | 'एजन्सी';
  mobileNumber: string;
  email: string;
  aadhaarNumber: string;
  address: string;
  wardZone: string;
  
  // 2️⃣ वस्तू/सेवा माहिती (Item/Service Details)
  itemName: string;
  itemType: 'वस्तू' | 'सेवा' | 'इतर';
  applicationDate: string;
  applicationTime: string;
  quantity: number;
  category: 'सामान्य' | 'विशेष' | 'तातडीचे';
  location: string;
  description: string;
  referenceNo: string;
  
  // 3️⃣ अतिरिक्त माहिती (Additional Details)
  contactPerson: string;
  organization: string;
  authorizedPerson: string;
  nationality: string;
  businessAddress: string;
  
  // 4️⃣ अर्ज माहिती (Application Details)
  applicationType: 'नवीन' | 'नूतनीकरण' | 'दुरुस्ती';
  numberOfCopies: number;
  language: 'मराठी' | 'हिंदी' | 'इंग्रजी';
  purpose: string;
  urgentProcessing: boolean;
  deliveryMethod: 'डिजिटल' | 'भौतिक';
  
  // 5️⃣ कागदपत्रे (Documents)
  identityProof: boolean;
  addressProof: boolean;
  applicantPhoto: boolean;
  itemProof: boolean;
  ownershipProof: boolean;
  affidavit: boolean;
  previousApplicationCopy: boolean;
  
  // 6️⃣ पेमेंट (Payment)
  paymentMethod: 'UPI' | 'नेट बँकिंग' | 'क्रेडिट कार्ड' | 'डेबिट कार्ड';
  paymentStatus: 'पेंडिंग' | 'पूर्ण' | 'अपूर्ण';
  
  // 7️⃣ अर्ज स्थिती (Application Status)
  applicationId: string;
  status: 'पेंडिंग' | 'तपासणी' | 'मंजूर' | 'नाकारले';
  officerRemarks: string;
  submissionDate: string;
}

// Initial form data
const initialFormData: ApplicationData = {
  // Applicant Details
  applicantName: '',
  applicantType: 'वैयक्तिक',
  mobileNumber: '',
  email: '',
  aadhaarNumber: '',
  address: '',
  wardZone: '',
  
  // Item/Service Details
  itemName: '',
  itemType: 'वस्तू',
  applicationDate: '',
  applicationTime: '',
  quantity: 0,
  category: 'सामान्य',
  location: '',
  description: '',
  referenceNo: '',
  
  // Additional Details
  contactPerson: '',
  organization: '',
  authorizedPerson: '',
  nationality: 'भारतीय',
  businessAddress: '',
  
  // Application Details
  applicationType: 'नवीन',
  numberOfCopies: 1,
  language: 'मराठी',
  purpose: '',
  urgentProcessing: false,
  deliveryMethod: 'डिजिटल',
  
  // Documents
  identityProof: false,
  addressProof: false,
  applicantPhoto: false,
  itemProof: false,
  ownershipProof: false,
  affidavit: false,
  previousApplicationCopy: false,
  
  // Payment
  paymentMethod: 'UPI',
  paymentStatus: 'पेंडिंग',
  
  // Application Status
  applicationId: '',
  status: 'पेंडिंग',
  officerRemarks: '',
  submissionDate: new Date().toISOString().split('T')[0]
};

export default function GenericApplication() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  // Ward/Zone options
  const wardOptions = [
    'वार्ड १', 'वार्ड २', 'वार्ड ३', 'वार्ड ४', 'वार्ड ५',
    'वार्ड ६', 'वार्ड ७', 'वार्ड ८', 'वार्ड ९', 'वार्ड १०'
  ];

  // Purpose options
  const purposeOptions = [
    'व्यवसायासाठी',
    'शैक्षणिक हेतू',
    'वैयक्तिक वापर',
    'सरकारी काम',
    'कायदेशीर काम',
    'इतर'
  ];

  // Handle input changes
  const handleInputChange = (field: keyof ApplicationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle document upload
  const handleDocumentUpload = (documentType: keyof ApplicationData) => {
    // In a real app, this would handle file upload
    setFormData(prev => ({
      ...prev,
      [documentType]: true
    }));
    alert(`${documentType} uploaded successfully`);
  };

  // Generate application ID
  const generateApplicationId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `APP${timestamp}${randomNum}`;
  };

  // Submit application
  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    
    // Generate application ID
    const appId = generateApplicationId();
    setTrackingId(appId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setApplicationSubmitted(true);
    
    // Update form data with application ID
    setFormData(prev => ({
      ...prev,
      applicationId: appId,
      status: 'पेंडिंग'
    }));
  };

  // Generate and download PDF receipt
  const generateReceiptPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(176, 29, 79); // #b01d4f
    pdf.text('अर्ज पावती', 105, 30, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Application Receipt', 105, 40, { align: 'center' });
    
    // Application Number
    pdf.setFontSize(12);
    pdf.text(`Application Number: ${formData.applicationId || 'APP-2024-00123'}`, 20, 60);
    pdf.text(`Issue Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 70);
    
    // Line separator
    pdf.setDrawColor(176, 29, 79);
    pdf.setLineWidth(0.5);
    pdf.line(20, 80, 190, 80);
    
    // Application Information
    pdf.setFontSize(14);
    pdf.text('अर्ज माहिती / Application Information', 20, 90);
    
    pdf.setFontSize(12);
    let yPos = 100;
    const info = [
      `वस्तू/सेवा / Item/Service: ${formData.itemName}`,
      `प्रमाण / Quantity: ${formData.quantity}`,
      `अर्ज तारीख / Application Date: ${formData.applicationDate}`,
      `श्रेणी / Category: ${formData.category}`,
      `ठिकाण / Location: ${formData.location}`,
      `वर्णन / Description: ${formData.description}`,
      `संपर्क व्यक्ती / Contact Person: ${formData.contactPerson}`,
      `संस्था / Organization: ${formData.organization}`,
      `अधिकृत व्यक्ती / Authorized Person: ${formData.authorizedPerson}`
    ];
    
    info.forEach(item => {
      pdf.text(item, 20, yPos);
      yPos += 10;
    });
    
    // Applicant Information
    yPos += 10;
    pdf.setFontSize(14);
    pdf.text('अर्जदाराची माहिती / Applicant Information', 20, yPos);
    
    yPos += 10;
    pdf.setFontSize(12);
    pdf.text(`नाव / Name: ${formData.applicantName}`, 20, yPos);
    yPos += 10;
    pdf.text(`मोबाइल नंबर / Mobile: ${formData.mobileNumber}`, 20, yPos);
    yPos += 10;
    pdf.text(`पत्ता / Address: ${formData.address}`, 20, yPos);
    
    // Footer with stamp
    yPos = 250;
    pdf.setFontSize(10);
    pdf.text('Official Stamp', 160, yPos);
    pdf.text('_________________________', 160, yPos + 10);
    pdf.text('Authorized Signatory', 160, yPos + 20);
    pdf.text('Nagar Parishad Office', 160, yPos + 30);
    
    // Save PDF
    pdf.save(`Application_Receipt_${formData.applicationId}.pdf`);
  };

  // Calculate fees
  const calculateFees = () => {
    let total = 100; // Base fee
    if (formData.urgentProcessing) total += 200;
    if (formData.numberOfCopies > 1) total += (formData.numberOfCopies - 1) * 50;
    return total;
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicantName" className="text-[#7a1e4f]">
                  <User className="inline h-4 w-4 mr-2" />
                  अर्जदाराचे नाव *
                </Label>
                <Input
                  id="applicantName"
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  placeholder="पूर्ण नाव प्रविष्ट करा"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="applicantType" className="text-[#7a1e4f]">
                  अर्जदार प्रकार *
                </Label>
                <Select
                  value={formData.applicantType}
                  onValueChange={(value) => handleInputChange('applicantType', value)}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="वैयक्तिक">वैयक्तिक</SelectItem>
                    <SelectItem value="संस्था">संस्था</SelectItem>
                    <SelectItem value="एजन्सी">एजन्सी</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mobileNumber" className="text-[#7a1e4f]">
                  <Smartphone className="inline h-4 w-4 mr-2" />
                  मोबाइल नंबर *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    placeholder="9876543210"
                    className="mt-1"
                  />
                  <Button variant="outline" className="mt-1">
                    OTP पाठवा
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-[#7a1e4f]">
                  <Mail className="inline h-4 w-4 mr-2" />
                  ईमेल आयडी
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="aadhaarNumber" className="text-[#7a1e4f]">
                  <Shield className="inline h-4 w-4 mr-2" />
                  आधार क्रमांक *
                </Label>
                <div className="relative">
                  <Input
                    id="aadhaarNumber"
                    type={showAadhaar ? "text" : "password"}
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                    placeholder="XXXX-XXXX-XXXX"
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAadhaar(!showAadhaar)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showAadhaar ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="wardZone" className="text-[#7a1e4f]">
                  वार्ड क्रमांक / झोन *
                </Label>
                <Select
                  value={formData.wardZone}
                  onValueChange={(value) => handleInputChange('wardZone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="वार्ड निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    {wardOptions.map((ward) => (
                      <SelectItem key={ward} value={ward}>
                        {ward}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-[#7a1e4f]">
                  <Home className="inline h-4 w-4 mr-2" />
                  पत्ता *
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="पूर्ण पत्ता प्रविष्ट करा"
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemName" className="text-[#7a1e4f]">
                  <Package className="inline h-4 w-4 mr-2" />
                  वस्तू/सेवेचे नाव *
                </Label>
                <Input
                  id="itemName"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange('itemName', e.target.value)}
                  placeholder="वस्तू किंवा सेवेचे नाव"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-[#7a1e4f]">प्रकार *</Label>
                <RadioGroup
                  value={formData.itemType}
                  onValueChange={(value) => handleInputChange('itemType', value)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="वस्तू" id="item" />
                    <Label htmlFor="item">वस्तू</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="सेवा" id="service" />
                    <Label htmlFor="service">सेवा</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="इतर" id="other" />
                    <Label htmlFor="other">इतर</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="applicationDate" className="text-[#7a1e4f]">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  अर्ज तारीख *
                </Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => handleInputChange('applicationDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="applicationTime" className="text-[#7a1e4f]">
                  <Clock className="inline h-4 w-4 mr-2" />
                  अर्ज वेळ
                </Label>
                <Input
                  id="applicationTime"
                  type="time"
                  value={formData.applicationTime}
                  onChange={(e) => handleInputChange('applicationTime', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="quantity" className="text-[#7a1e4f]">
                  <Hash className="inline h-4 w-4 mr-2" />
                  प्रमाण *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  className="mt-1"
                  min="1"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-[#7a1e4f]">
                  श्रेणी *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="सामान्य">सामान्य</SelectItem>
                    <SelectItem value="विशेष">विशेष</SelectItem>
                    <SelectItem value="तातडीचे">तातडीचे</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location" className="text-[#7a1e4f]">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  ठिकाण *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="वस्तू/सेवेचे ठिकाण"
                  className="mt-1"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-[#7a1e4f]">
                  तपशील *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="वस्तू/सेवेचे तपशीलवार वर्णन"
                  className="mt-1 min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="referenceNo" className="text-[#7a1e4f]">
                  संदर्भ क्रमांक
                </Label>
                <Input
                  id="referenceNo"
                  value={formData.referenceNo}
                  onChange={(e) => handleInputChange('referenceNo', e.target.value)}
                  placeholder="जर आधीच संदर्भ क्रमांक असेल तर"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson" className="text-[#7a1e4f]">
                  <User className="inline h-4 w-4 mr-2" />
                  संपर्क व्यक्तीचे नाव *
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="संपर्क व्यक्तीचे पूर्ण नाव"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="organization" className="text-[#7a1e4f]">
                  <Building className="inline h-4 w-4 mr-2" />
                  संस्था/कंपनी
                </Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="संस्था किंवा कंपनीचे नाव"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="authorizedPerson" className="text-[#7a1e4f]">
                  <BadgeCheck className="inline h-4 w-4 mr-2" />
                  अधिकृत व्यक्ती
                </Label>
                <Input
                  id="authorizedPerson"
                  value={formData.authorizedPerson}
                  onChange={(e) => handleInputChange('authorizedPerson', e.target.value)}
                  placeholder="अधिकृत व्यक्तीचे नाव"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="nationality" className="text-[#7a1e4f]">
                  राष्ट्रीयता *
                </Label>
                <Select
                  value={formData.nationality}
                  onValueChange={(value) => handleInputChange('nationality', value)}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="भारतीय">भारतीय</SelectItem>
                    <SelectItem value="इतर">इतर</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="businessAddress" className="text-[#7a1e4f]">
                  <Home className="inline h-4 w-4 mr-2" />
                  व्यवसायाचा पत्ता *
                </Label>
                <Textarea
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                  placeholder="व्यवसायाचा पूर्ण पत्ता"
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicationType" className="text-[#7a1e4f]">
                  अर्ज प्रकार *
                </Label>
                <Select
                  value={formData.applicationType}
                  onValueChange={(value) => handleInputChange('applicationType', value)}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="नवीन">नवीन</SelectItem>
                    <SelectItem value="नूतनीकरण">नूतनीकरण</SelectItem>
                    <SelectItem value="दुरुस्ती">दुरुस्ती</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="numberOfCopies" className="text-[#7a1e4f]">
                  प्रतींची संख्या *
                </Label>
                <Select
                  value={formData.numberOfCopies.toString()}
                  onValueChange={(value) => handleInputChange('numberOfCopies', parseInt(value))}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 प्रत</SelectItem>
                    <SelectItem value="2">2 प्रती</SelectItem>
                    <SelectItem value="3">3 प्रती</SelectItem>
                    <SelectItem value="4">4 प्रती</SelectItem>
                    <SelectItem value="5">5 प्रती</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="language" className="text-[#7a1e4f]">
                  भाषा *
                </Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleInputChange('language', value)}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="मराठी">मराठी</SelectItem>
                    <SelectItem value="हिंदी">हिंदी</SelectItem>
                    <SelectItem value="इंग्रजी">इंग्रजी</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="purpose" className="text-[#7a1e4f]">
                  हेतू *
                </Label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) => handleInputChange('purpose', value)}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="हेतू निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOptions.map((purpose) => (
                      <SelectItem key={purpose} value={purpose}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="deliveryMethod" className="text-[#7a1e4f]">
                  वितरण पद्धत *
                </Label>
                <Select
                  value={formData.deliveryMethod}
                  onValueChange={(value) => handleInputChange('deliveryMethod', value)}
                >
                  <SelectTrigger  className='w-full'>
                    <SelectValue placeholder="निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="डिजिटल">डिजिटल (डाउनलोड)</SelectItem>
                    <SelectItem value="भौतिक">भौतिक (पोस्ट)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgentProcessing"
                  checked={formData.urgentProcessing}
                  onCheckedChange={(checked) => 
                    handleInputChange('urgentProcessing', checked)
                  }
                />
                <Label htmlFor="urgentProcessing" className="text-[#7a1e4f]">
                  तातडीची प्रक्रिया (अतिरिक्त फी ₹200)
                </Label>
              </div>
              
              <div className="md:col-span-2">
                <div className="rounded-lg border p-4 bg-gray-50">
                  <h4 className="font-medium text-[#7a1e4f] mb-2">फी तपशील</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>अर्ज शुल्क:</span>
                      <span>₹100</span>
                    </div>
                    {formData.urgentProcessing && (
                      <div className="flex justify-between">
                        <span>तातडीची प्रक्रिया:</span>
                        <span>₹200</span>
                      </div>
                    )}
                    {formData.numberOfCopies > 1 && (
                      <div className="flex justify-between">
                        <span>अतिरिक्त प्रती ({formData.numberOfCopies - 1} × ₹50):</span>
                        <span>₹{(formData.numberOfCopies - 1) * 50}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2 font-bold">
                      <span>एकूण रक्कम:</span>
                      <span>₹{calculateFees()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`border-2 rounded-lg p-4 ${formData.identityProof ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">ओळख पुरावा</h4>
                    <p className="text-sm text-gray-600">आवश्यक</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDocumentUpload('identityProof')}
                    variant={formData.identityProof ? "outline" : "default"}
                  >
                    {formData.identityProof ? "अपलोड केले" : "अपलोड करा"}
                  </Button>
                </div>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${formData.addressProof ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">पत्ता पुरावा</h4>
                    <p className="text-sm text-gray-600">आवश्यक</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDocumentUpload('addressProof')}
                    variant={formData.addressProof ? "outline" : "default"}
                  >
                    {formData.addressProof ? "अपलोड केले" : "अपलोड करा"}
                  </Button>
                </div>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${formData.applicantPhoto ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">अर्जदाराचे फोटो</h4>
                    <p className="text-sm text-gray-600">आवश्यक</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDocumentUpload('applicantPhoto')}
                    variant={formData.applicantPhoto ? "outline" : "default"}
                  >
                    {formData.applicantPhoto ? "अपलोड केले" : "अपलोड करा"}
                  </Button>
                </div>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${formData.itemProof ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">वस्तू/सेवा पुरावा</h4>
                    <p className="text-sm text-gray-600">आवश्यक</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDocumentUpload('itemProof')}
                    variant={formData.itemProof ? "outline" : "default"}
                  >
                    {formData.itemProof ? "अपलोड केले" : "अपलोड करा"}
                  </Button>
                </div>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${formData.ownershipProof ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">मालकी पुरावा</h4>
                    <p className="text-sm text-gray-600">सशर्त</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDocumentUpload('ownershipProof')}
                    variant={formData.ownershipProof ? "outline" : "default"}
                  >
                    {formData.ownershipProof ? "अपलोड केले" : "अपलोड करा"}
                  </Button>
                </div>
              </div>
              
              <div className={`border-2 rounded-lg p-4 ${formData.affidavit ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">शपथपत्र</h4>
                    <p className="text-sm text-gray-600">सशर्त</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDocumentUpload('affidavit')}
                    variant={formData.affidavit ? "outline" : "default"}
                  >
                    {formData.affidavit ? "अपलोड केले" : "अपलोड करा"}
                  </Button>
                </div>
              </div>
              
              {formData.applicationType === 'नूतनीकरण' && (
                <div className={`border-2 rounded-lg p-4 ${formData.previousApplicationCopy ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">जुना अर्ज</h4>
                      <p className="text-sm text-gray-600">सशर्त</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleDocumentUpload('previousApplicationCopy')}
                      variant={formData.previousApplicationCopy ? "outline" : "default"}
                    >
                      {formData.previousApplicationCopy ? "अपलोड केले" : "अपलोड करा"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>नोट:</strong> आवश्यक कागदपत्रे अपलोड करणे अनिवार्य आहे. 
                सशर्त कागदपत्रे फक्त विशिष्ट प्रकरणांसाठी आवश्यक आहेत.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentMethod" className="text-[#7a1e4f]">
                  पेमेंट पद्धत *
                </Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="पेमेंट पद्धत निवडा" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="नेट बँकिंग">नेट बँकिंग</SelectItem>
                    <SelectItem value="क्रेडिट कार्ड">क्रेडिट कार्ड</SelectItem>
                    <SelectItem value="डेबिट कार्ड">डेबिट कार्ड</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <div className="rounded-lg border p-4 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-800">एकूण देय रक्कम</h4>
                      <p className="text-2xl font-bold text-blue-900">₹{calculateFees()}</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ReceiptIndianRupee className="mr-2 h-4 w-4" />
                      पेमेंट करा
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-start space-x-2 p-4 border rounded-lg">
                  <Checkbox id="declaration" />
                  <div>
                    <Label htmlFor="declaration" className="font-medium">
                      मी याची खात्री करतो/करते की:
                    </Label>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• वरील माहिती खरी आणि तपासलेली आहे</li>
                      <li>• सर्व आवश्यक कागदपत्रे अपलोड केली आहेत</li>
                      <li>• फक्त आवश्यक माहिती भरली आहे</li>
                      <li>• मी या अर्जासाठी जबाबदार असेन</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Step titles
  const stepTitles = [
    'अर्जदाराची माहिती',
    'वस्तू/सेवा माहिती',
    'अतिरिक्त माहिती',
    'अर्ज माहिती',
    'कागदपत्रे',
    'पेमेंट व सबमिशन'
  ];

  // Step icons
  const stepIcons = [User, Package, Info, FileText, Upload, ReceiptIndianRupee];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#b01d4f]/10 text-[#b01d4f] px-4 py-2 rounded-full mb-4">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">सामान्य अर्ज</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            नगर परिषद सामान्य अर्ज पोर्टल
          </h1>
          <p className="text-gray-600">Nagar Parishad General Application Portal</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {stepTitles.map((title, index) => {
              const Icon = stepIcons[index];
              const isActive = currentStep === index + 1;
              const isCompleted = currentStep > index + 1;
              
              return (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full
                    ${isActive ? 'bg-[#b01d4f] text-white' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-gray-200 text-gray-500'}
                    transition-all duration-300
                  `}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`
                    text-sm font-medium mt-2 text-center
                    ${isActive ? 'text-[#b01d4f]' : 
                      isCompleted ? 'text-green-600' : 
                      'text-gray-500'}
                  `}>
                    {title}
                  </span>
                </div>
              );
            })}
            <div className="absolute top-6 left-12 right-12 h-1 bg-gray-200 -z-10">
              <div 
                className="h-full bg-[#b01d4f] transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (stepTitles.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        {!applicationSubmitted ? (
          <Card className="border-[#b01d4f]/20 shadow-lg">
            <CardHeader className="border-b border-[#b01d4f]/10">
              <CardTitle className="flex items-center gap-2 text-[#b01d4f]">
                <FileText className="h-6 w-6" />
                {stepTitles[currentStep - 1]}
              </CardTitle>
              <CardDescription>
                Step {currentStep} of {stepTitles.length}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              {renderStepContent()}
            </CardContent>
            
            <CardFooter className="flex justify-between border-t border-[#b01d4f]/10 pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
                className="border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10"
              >
                मागे
              </Button>
              
              {currentStep < stepTitles.length ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="bg-[#b01d4f] hover:bg-[#7a1e4f]"
                >
                  पुढे
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      सबमिट करत आहे...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      अर्ज सबमिट करा
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          // Application Submitted View
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="border-b border-green-200">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-8 w-8" />
                अर्ज यशस्वीरित्या सबमिट केला!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    अर्ज क्रमांक: {trackingId}
                  </h3>
                  <p className="text-gray-600">
                    तुमचा सामान्य अर्ज यशस्वीरित्या सबमिट झाला आहे
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-[#7a1e4f] mb-2">अर्ज तपशील</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">अर्जदार नाव:</span>
                        <span className="font-medium">{formData.applicantName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">वस्तू/सेवा नाव:</span>
                        <span className="font-medium">{formData.itemName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">तारीख:</span>
                        <span className="font-medium">{new Date().toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-[#7a1e4f] mb-2">अर्ज स्थिती</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">स्थिती:</span>
                        <span className="font-medium text-yellow-600">पेंडिंग</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">अंदाजित वेळ:</span>
                        <span className="font-medium">3-5 कामकाजाचे दिवस</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-[#7a1e4f] mb-4">पुढील पायऱ्या</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium">अर्ज तपासणी</p>
                        <p className="text-sm text-gray-600">अधिकाऱ्याद्वारे अर्ज तपासणी</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">मंजुरी</p>
                        <p className="text-sm text-gray-500">मंजुरी प्रक्रिया</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">प्रमाणपत्र जारी</p>
                        <p className="text-sm text-gray-500">प्रमाणपत्र डाउनलोड करणे</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setApplicationSubmitted(false);
                      setCurrentStep(1);
                      setFormData(initialFormData);
                    }}
                  >
                    नवीन अर्ज
                  </Button>
                  <Button
                    className="flex-1 bg-[#b01d4f] hover:bg-[#7a1e4f]"
                    onClick={generateReceiptPDF}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    पावती डाउनलोड करा
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Tracking Section */}
        <Card className="mt-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-[#7a1e4f]">
              <Search className="inline h-5 w-5 mr-2" />
              अर्ज स्थिती तपासणी
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="trackApplicationId">अर्ज आयडी</Label>
                <Input
                  id="trackApplicationId"
                  placeholder="अर्ज आयडी प्रविष्ट करा"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="trackMobile">मोबाइल नंबर</Label>
                <Input
                  id="trackMobile"
                  type="tel"
                  placeholder="मोबाइल नंबर प्रविष्ट करा"
                  className="mt-1"
                />
              </div>
            </div>
            <Button className="w-full mt-4 bg-[#7a1e4f] hover:bg-[#5a1540]">
              स्थिती तपासा
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
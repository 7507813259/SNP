'use client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  ReceiptIndianRupee,
  Home,
  User,
  Smartphone,
  Mail,
  CreditCard,
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
  Building,
  Calculator,
  Wallet,
  FileSignature,
  CheckSquare,
  FileDigit,
  Printer,
  FileSpreadsheet,
  Eye as EyeIcon,
  AlertCircle,
  IndianRupee,
  File,
  House,
  Signature,
  Phone,
  Hash,
  Mail as MailIcon,
  Map,
  CalendarDays,
  UserCheck,
  Newspaper
} from 'lucide-react';

interface ResidenceCertificateData {
  id: string;
  // Applicant Details
  applicantName: string;
  relationWithApplicant: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  idProofType: string;

  // Beneficiary Details
  beneficiaryName: string;
  gender: string;
  dateOfBirth: string;
  beneficiaryAadhaar: string;
  beneficiaryMobile: string;
  maritalStatus: string;
  nationality: string;
  caste: string;

  // Residence Details
  currentAddress: string;
  permanentAddress: string;
  yearsOfResidence: number;
  typeOfResidence: string;
  houseNo: string;
  wardNo: string;

  // Documents
  aadhaarUploaded: boolean;
  rationCardUploaded: boolean;
  electricityBillUploaded: boolean;
  propertyTaxUploaded: boolean;
  rentAgreementUploaded: boolean;
  affidavitUploaded: boolean;

  // Certificate Request
  certificatePurpose: string;
  certificateLanguage: string;
  certificateType: string;
  numberOfCopies: number;

  // Status (Backend/Admin)
  applicationStatus: string;
  applicationNumber: string;
  appliedDate: string;
  verifiedBy: string;
  verifiedDate: string;
  certificateUrl: string;
  remarks: string;
}

const dummyResidenceRecords: ResidenceCertificateData[] = [
  {
    id: '1',
    applicantName: 'राजेश कुमार शर्मा',
    relationWithApplicant: 'स्वतः',
    mobile: '9876543210',
    email: 'rajesh.sharma@example.com',
    aadhaar: '1234-5678-9012',
    address: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    idProofType: 'Aadhaar',

    beneficiaryName: 'राजेश कुमार शर्मा',
    gender: 'पुरुष',
    dateOfBirth: '1985-05-15',
    beneficiaryAadhaar: '1234-5678-9012',
    beneficiaryMobile: '9876543210',
    maritalStatus: 'विवाहित',
    nationality: 'भारतीय',
    caste: 'General',

    currentAddress: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    permanentAddress: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    yearsOfResidence: 10,
    typeOfResidence: 'स्वतःचे',
    houseNo: '45',
    wardNo: 'वार्ड 7',

    aadhaarUploaded: true,
    rationCardUploaded: true,
    electricityBillUploaded: true,
    propertyTaxUploaded: true,
    rentAgreementUploaded: false,
    affidavitUploaded: false,

    certificatePurpose: 'बँक खाते',
    certificateLanguage: 'मराठी',
    certificateType: 'नवीन',
    numberOfCopies: 1,

    applicationStatus: 'Pending',
    applicationNumber: 'RC-2024-001',
    appliedDate: '2024-01-15',
    verifiedBy: '',
    verifiedDate: '',
    certificateUrl: '',
    remarks: ''
  },
  {
    id: '2',
    applicantName: 'सुनिता देशपांडे',
    relationWithApplicant: 'वडील',
    mobile: '8765432109',
    email: 'sunita.d@example.com',
    aadhaar: '2345-6789-0123',
    address: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    idProofType: 'Aadhaar',

    beneficiaryName: 'विजय देशपांडे',
    gender: 'पुरुष',
    dateOfBirth: '1945-08-20',
    beneficiaryAadhaar: '2345-6789-0123',
    beneficiaryMobile: '8765432109',
    maritalStatus: 'विवाहित',
    nationality: 'भारतीय',
    caste: 'OBC',

    currentAddress: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    permanentAddress: 'गाव: शिंदेवाडी, ता: शेगांव, जि: बुलढाणा',
    yearsOfResidence: 5,
    typeOfResidence: 'भाड्याचे',
    houseNo: '304',
    wardNo: 'वार्ड 12',

    aadhaarUploaded: true,
    rationCardUploaded: true,
    electricityBillUploaded: true,
    propertyTaxUploaded: false,
    rentAgreementUploaded: true,
    affidavitUploaded: true,

    certificatePurpose: 'पेन्शन',
    certificateLanguage: 'इंग्रजी',
    certificateType: 'Duplicate',
    numberOfCopies: 2,

    applicationStatus: 'Approved',
    applicationNumber: 'RC-2024-002',
    appliedDate: '2024-01-10',
    verifiedBy: 'श्री. पाटील',
    verifiedDate: '2024-01-12',
    certificateUrl: 'https://example.com/certificate.pdf',
    remarks: 'All documents verified'
  },
  {
    id: '3',
    applicantName: 'अजय पाटील',
    relationWithApplicant: 'पती',
    mobile: '7654321098',
    email: 'ajay.patil@example.com',
    aadhaar: '3456-7890-1234',
    address: 'शॉप नंबर 5, मार्केट यार्ड, बुलढाणा',
    idProofType: 'Voter ID',

    beneficiaryName: 'प्रिया पाटील',
    gender: 'स्त्री',
    dateOfBirth: '1990-11-10',
    beneficiaryAadhaar: '3456-7890-1234',
    beneficiaryMobile: '7654321098',
    maritalStatus: 'विवाहित',
    nationality: 'भारतीय',
    caste: 'ST',

    currentAddress: 'शॉप नंबर 5, मार्केट यार्ड, बुलढाणा',
    permanentAddress: 'शॉप नंबर 5, मार्केट यार्ड, बुलढाणा',
    yearsOfResidence: 8,
    typeOfResidence: 'स्वतःचे',
    houseNo: '5',
    wardNo: 'वार्ड 3',

    aadhaarUploaded: true,
    rationCardUploaded: false,
    electricityBillUploaded: true,
    propertyTaxUploaded: true,
    rentAgreementUploaded: false,
    affidavitUploaded: false,

    certificatePurpose: 'विद्यापीठ प्रवेश',
    certificateLanguage: 'मराठी',
    certificateType: 'नवीन',
    numberOfCopies: 1,

    applicationStatus: 'Pending',
    applicationNumber: 'RC-2024-003',
    appliedDate: '2024-01-05',
    verifiedBy: '',
    verifiedDate: '',
    certificateUrl: '',
    remarks: ''
  }
];

export default function ResidenceCertificatePage() {
  const [step, setStep] = useState<
    | 'search'
    | 'applicant'
    | 'beneficiary'
    | 'residence'
    | 'documents'
    | 'request'
    | 'declaration'
    | 'confirmation'
  >('search');
  const [loading, setLoading] = useState(false);
  const [residenceData, setResidenceData] =
    useState<ResidenceCertificateData | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [formData, setFormData] = useState({
    // Applicant Details
    applicantName: '',
    relationWithApplicant: 'स्वतः',
    mobile: '',
    email: '',
    aadhaar: '',
    address: '',
    idProofType: 'Aadhaar',

    // Beneficiary Details
    beneficiaryName: '',
    gender: 'पुरुष',
    dateOfBirth: '',
    beneficiaryAadhaar: '',
    beneficiaryMobile: '',
    maritalStatus: 'अविवाहित',
    nationality: 'भारतीय',
    caste: '',

    // Residence Details
    currentAddress: '',
    permanentAddress: '',
    yearsOfResidence: 1,
    typeOfResidence: 'स्वतःचे',
    houseNo: '',
    wardNo: 'वार्ड 1',

    // Certificate Request
    certificatePurpose: 'बँक खाते',
    certificateLanguage: 'मराठी',
    certificateType: 'नवीन',
    numberOfCopies: 1,

    // Declaration
    declaration: false,

    // Preferences
    emailNotification: true,
    smsNotification: true
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    aadhaarCard: false,
    rationCard: false,
    electricityBill: false,
    propertyTax: false,
    rentAgreement: false,
    affidavit: false
  });

  const [searchAttempts, setSearchAttempts] = useState(0);
  const [searchBlocked, setSearchBlocked] = useState(false);

  const [wardOptions] = useState([
    'वार्ड 1',
    'वार्ड 2',
    'वार्ड 3',
    'वार्ड 4',
    'वार्ड 5',
    'वार्ड 6',
    'वार्ड 7',
    'वार्ड 8',
    'वार्ड 9',
    'वार्ड 10',
    'वार्ड 11',
    'वार्ड 12',
    'वार्ड 13',
    'वार्ड 14',
    'वार्ड 15'
  ]);

  const [purposeOptions] = useState([
    'बँक खाते',
    'पेन्शन',
    'विद्यापीठ प्रवेश',
    'नोकरी',
    'पासपोर्ट',
    'विमा',
    'कर्ज',
    'इतर'
  ]);

  useEffect(() => {
    // Auto-fill beneficiary details if applicant is applying for themselves
    if (formData.relationWithApplicant === 'स्वतः' && formData.applicantName) {
      setFormData((prev) => ({
        ...prev,
        beneficiaryName: prev.applicantName,
        beneficiaryAadhaar: prev.aadhaar,
        beneficiaryMobile: prev.mobile
      }));
    }
  }, [
    formData.relationWithApplicant,
    formData.applicantName,
    formData.aadhaar,
    formData.mobile
  ]);

  const handleAadhaarSearch = () => {
    if (searchBlocked) {
      alert('Too many search attempts. Please try again after 5 minutes.');
      return;
    }

    if (!aadhaarNumber.trim()) {
      alert('Please enter Aadhaar number to search');
      return;
    }

    if (searchAttempts >= 3) {
      setSearchBlocked(true);
      setTimeout(() => {
        setSearchBlocked(false);
        setSearchAttempts(0);
      }, 300000);
      alert(
        'Too many search attempts. Please wait 5 minutes before trying again.'
      );
      return;
    }

    setLoading(true);
    setSearchAttempts((prev) => prev + 1);

    // Simulate API call
    setTimeout(() => {
      const cleanAadhaar = aadhaarNumber.replace(/-/g, '').trim();

      const foundRecord = dummyResidenceRecords.find((record) => {
        const userCleanAadhaar = record.aadhaar.replace(/-/g, '');
        return (
          cleanAadhaar.length >= 4 &&
          userCleanAadhaar.startsWith(cleanAadhaar.slice(0, 4))
        );
      });

      if (foundRecord) {
        // Mask sensitive data for display
        const maskedRecord = {
          ...foundRecord,
          mobile: 'XXXXXX' + foundRecord.mobile.slice(-4),
          email: foundRecord.email.replace(/(?<=.).(?=.*@)/g, '*'),
          aadhaar: 'XXXX-XXXX-' + foundRecord.aadhaar.slice(-4)
        };

        setResidenceData(maskedRecord);
        setFormData({
          applicantName: foundRecord.applicantName,
          relationWithApplicant: foundRecord.relationWithApplicant,
          mobile: foundRecord.mobile,
          email: foundRecord.email,
          aadhaar: foundRecord.aadhaar,
          address: foundRecord.address,
          idProofType: foundRecord.idProofType,

          beneficiaryName: foundRecord.beneficiaryName,
          gender: foundRecord.gender,
          dateOfBirth: foundRecord.dateOfBirth,
          beneficiaryAadhaar: foundRecord.beneficiaryAadhaar,
          beneficiaryMobile: foundRecord.beneficiaryMobile,
          maritalStatus: foundRecord.maritalStatus,
          nationality: foundRecord.nationality,
          caste: foundRecord.caste,

          currentAddress: foundRecord.currentAddress,
          permanentAddress: foundRecord.permanentAddress,
          yearsOfResidence: foundRecord.yearsOfResidence,
          typeOfResidence: foundRecord.typeOfResidence,
          houseNo: foundRecord.houseNo,
          wardNo: foundRecord.wardNo,

          certificatePurpose: foundRecord.certificatePurpose,
          certificateLanguage: foundRecord.certificateLanguage,
          certificateType: foundRecord.certificateType,
          numberOfCopies: foundRecord.numberOfCopies,

          declaration: false,
          emailNotification: true,
          smsNotification: true
        });

        setUploadedFiles({
          aadhaarCard: foundRecord.aadhaarUploaded,
          rationCard: foundRecord.rationCardUploaded,
          electricityBill: foundRecord.electricityBillUploaded,
          propertyTax: foundRecord.propertyTaxUploaded,
          rentAgreement: foundRecord.rentAgreementUploaded,
          affidavit: foundRecord.affidavitUploaded
        });

        setStep('applicant');
      } else {
        alert('No matching records found. Please check your Aadhaar number.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 1 : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type: keyof typeof uploadedFiles) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));
    console.log(`${type} uploaded successfully`);
  };

  const handleDownloadCertificate = () => {
    const certificateData = {
      certificateNumber: `RC-${Date.now().toString().slice(-10)}`,
      issueDate: new Date().toLocaleDateString('en-IN'),
      issueTime: new Date().toLocaleTimeString('en-IN'),
      beneficiaryName: formData.beneficiaryName,
      fatherName: '', // Optional for residence certificate
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      nationality: formData.nationality,
      caste: formData.caste || 'Not specified',
      currentAddress: formData.currentAddress,
      permanentAddress: formData.permanentAddress,
      yearsOfResidence: formData.yearsOfResidence,
      houseNo: formData.houseNo,
      wardNo: formData.wardNo,
      applicantName: formData.applicantName,
      relation: formData.relationWithApplicant,
      certificatePurpose: formData.certificatePurpose,
      certificateType: formData.certificateType,
      certificateLanguage: formData.certificateLanguage,
      numberOfCopies: formData.numberOfCopies
    };

    // Create a temporary iframe for PDF generation
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = '794px';
    iframe.style.height = '1123px';
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            margin: 0; 
            padding: 40px; 
            font-family: 'Arial', sans-serif; 
            color: #333;
            line-height: 1.6;
            background: white;
          }
          * { box-sizing: border-box; }
          
          .header { 
            text-align: center; 
            color: #7c3aed; 
            margin-bottom: 30px; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #7c3aed;
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: bold;
          }
          .header h2 { 
            margin: 10px 0 0 0; 
            font-size: 20px; 
            color: #555; 
            font-weight: normal;
          }
          .certificate-info { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin: 25px 0; 
            padding: 20px; 
            background: #f5f3ff; 
            border-radius: 8px; 
            border: 1px solid #ddd6fe;
          }
          .section-title { 
            color: #7c3aed; 
            font-size: 18px; 
            font-weight: bold;
            margin: 30px 0 15px 0; 
            padding-bottom: 8px;
            border-bottom: 2px solid #7c3aed;
          }
          .details-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 20px;
          }
          .detail-item { display: flex; flex-direction: column; }
          .label { 
            font-weight: bold; 
            color: #555;
            font-size: 14px;
            margin-bottom: 5px;
          }
          .value { font-size: 15px; color: #333; }
          .address {
            grid-column: 1 / -1;
            margin-top: 10px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 6px;
            border-left: 4px solid #7c3aed;
          }
          .certificate-section {
            background: #7c3aed;
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: center;
          }
          .certificate-number {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
          }
          .valid-badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
          }
          .notes {
            margin: 30px 0;
            padding: 20px;
            background: #fff8e1;
            border-radius: 8px;
            border: 1px solid #ffd54f;
          }
          .note-item {
            margin-bottom: 8px;
            font-size: 13px;
            color: #666;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #ddd;
            color: #777;
            font-size: 14px;
          }
          .stamp {
            text-align: right;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px dashed #7c3aed;
            font-style: italic;
            color: #7c3aed;
          }
          .personal-info {
            background: #f0f9ff;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
            border-left: 4px solid #0ea5e9;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h1>निवास प्रमाणपत्र</h1>
          <h2>Residence Certificate</h2>
        </div>
        
        <!-- Certificate Info -->
        <div class="certificate-info">
          <div class="detail-item">
            <span class="label">Certificate No:</span>
            <span class="value">${certificateData.certificateNumber}</span>
          </div>
          <div class="detail-item">
            <span class="label">Issue Date:</span>
            <span class="value">${certificateData.issueDate}</span>
          </div>
          <div class="detail-item">
            <span class="label">Issue Time:</span>
            <span class="value">${certificateData.issueTime}</span>
          </div>
        </div>
        
        <!-- Personal Details -->
        <div class="section-title">PERSONAL DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Full Name:</span>
            <span class="value">${certificateData.beneficiaryName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Gender:</span>
            <span class="value">${certificateData.gender}</span>
          </div>
          <div class="detail-item">
            <span class="label">Date of Birth:</span>
            <span class="value">${certificateData.dateOfBirth}</span>
          </div>
          <div class="detail-item">
            <span class="label">Marital Status:</span>
            <span class="value">${certificateData.maritalStatus}</span>
          </div>
        </div>
        
        <div class="personal-info">
          <div style="margin-bottom: 5px;"><strong>Nationality:</strong> ${certificateData.nationality}</div>
          <div><strong>Caste:</strong> ${certificateData.caste}</div>
        </div>
        
        <!-- Residence Details -->
        <div class="section-title">RESIDENCE DETAILS</div>
        <div class="address">
          <span class="label">Current Address:</span><br>
          <span class="value">${certificateData.currentAddress}</span>
        </div>
        <div class="address">
          <span class="label">Permanent Address:</span><br>
          <span class="value">${certificateData.permanentAddress}</span>
        </div>
        
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Years of Residence:</span>
            <span class="value">${certificateData.yearsOfResidence} years</span>
          </div>
          <div class="detail-item">
            <span class="label">House No:</span>
            <span class="value">${certificateData.houseNo}</span>
          </div>
          <div class="detail-item">
            <span class="label">Ward No:</span>
            <span class="value">${certificateData.wardNo}</span>
          </div>
        </div>
        
        <!-- Application Details -->
        <div class="section-title">APPLICATION DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Applicant Name:</span>
            <span class="value">${certificateData.applicantName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Relation:</span>
            <span class="value">${certificateData.relation}</span>
          </div>
          <div class="detail-item">
            <span class="label">Certificate Type:</span>
            <span class="value">${certificateData.certificateType}</span>
          </div>
          <div class="detail-item">
            <span class="label">Language:</span>
            <span class="value">${certificateData.certificateLanguage}</span>
          </div>
          <div class="detail-item">
            <span class="label">Purpose:</span>
            <span class="value">${certificateData.certificatePurpose}</span>
          </div>
          <div class="detail-item">
            <span class="label">Number of Copies:</span>
            <span class="value">${certificateData.numberOfCopies}</span>
          </div>
        </div>
        
        <!-- Certificate Validation -->
        <div class="certificate-section">
          <div>Official Residence Certificate</div>
          <div class="certificate-number">${certificateData.certificateNumber}</div>
          <div class="valid-badge">OFFICIALLY REGISTERED</div>
        </div>
        
        <!-- Stamp Section -->
        <div class="stamp">
          <div style="font-weight: bold;">Authorized Signature</div>
          <div>Nagar Parishad Residence Certificate Office</div>
          <div>Government of Maharashtra</div>
        </div>
        
        <!-- Notes -->
        <div class="notes">
          <div class="section-title">IMPORTANT NOTES</div>
          <div class="note-item">✓ This is a computer-generated certificate, valid without signature.</div>
          <div class="note-item">✓ Please preserve this certificate for all official purposes.</div>
          <div class="note-item">✓ For any queries or discrepancies, contact Nagar Parishad office within 30 days.</div>
          <div class="note-item">✓ This certificate is valid for 6 months from the date of issue.</div>
          <div class="note-item">✓ In case of change in address, a new certificate must be obtained.</div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div>Issued by Nagar Parishad Residence Certificate Department</div>
          <div style="font-weight: bold; margin: 10px 0;">Government of Maharashtra</div>
          <div style="margin-top: 10px; font-size: 12px;">
            Customer Care: 1800-XXX-XXXX | Email: residence@nagarpalika.gov.in<br>
            Office Hours: 10:00 AM - 6:00 PM (Mon-Sat)
          </div>
          <div style="margin-top: 15px; font-size: 11px; color: #999;">
            Generated electronically on ${certificateData.issueDate} at ${certificateData.issueTime}
          </div>
        </div>
      </body>
      </html>
    `);
      iframeDoc.close();

      setTimeout(() => {
        const iframeBody = iframeDoc.body;

        if (!iframeBody) {
          if (iframe.parentNode === document.body) {
            document.body.removeChild(iframe);
          }
          alert('Error: Could not generate PDF content.');
          return;
        }

        html2canvas(iframeBody, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(
              `Residence_Certificate_${certificateData.certificateNumber}.pdf`
            );

            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }

            alert(
              `Certificate downloaded successfully!\nFile: Residence_Certificate_${certificateData.certificateNumber}.pdf`
            );
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }
            alert('Error generating PDF. Please try again.');
          });
      }, 500);
    }
  };

  const handleSubmitApplication = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('confirmation');
    }, 2000);
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4 md:p-8'>
      <div className='max-w-full px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#7c3aed]/10 px-4 py-2'>
            <House className='h-4 w-4 text-[#7c3aed]' />
            <span className='text-sm font-medium text-[#7c3aed]'>
              निवास प्रमाणपत्र अर्ज
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#7c3aed]/10 p-3'>
              <Newspaper className='h-8 w-8 text-[#7c3aed]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद निवास प्रमाणपत्र पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Residence Certificate Portal
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
          {[
            'search',
            'applicant',
            'beneficiary',
            'residence',
            'documents',
            'request',
            'declaration'
          ].map((stepName, index) => (
            <div key={stepName} className='flex items-center'>
              <div
                className={`flex items-center ${step === stepName ? 'text-[#7c3aed]' : index < ['search', 'applicant', 'beneficiary', 'residence', 'documents', 'request', 'declaration'].indexOf(step) ? 'text-[#6d28d9]' : 'text-gray-400'}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step === stepName ? 'bg-[#7c3aed]/10' : index < ['search', 'applicant', 'beneficiary', 'residence', 'documents', 'request', 'declaration'].indexOf(step) ? 'bg-[#6d28d9]/10' : 'bg-gray-100'}`}
                >
                  {index === 0 && <Search className='h-4 w-4' />}
                  {index === 1 && <User className='h-4 w-4' />}
                  {index === 2 && <UserCheck className='h-4 w-4' />}
                  {index === 3 && <Home className='h-4 w-4' />}
                  {index === 4 && <FileText className='h-4 w-4' />}
                  {index === 5 && <FileCheck className='h-4 w-4' />}
                  {index === 6 && <CheckCircle className='h-4 w-4' />}
                </div>
                <span className='ml-2 hidden text-sm font-medium md:block'>
                  {index === 0 && 'शोध'}
                  {index === 1 && 'अर्जदार'}
                  {index === 2 && 'लाभार्थी'}
                  {index === 3 && 'निवास'}
                  {index === 4 && 'कागद'}
                  {index === 5 && 'अर्ज'}
                  {index === 6 && 'जाहीरनामा'}
                </span>
              </div>
              {index < 6 && (
                <div
                  className={`mx-2 h-1 w-8 ${index < ['search', 'applicant', 'beneficiary', 'residence', 'documents', 'request', 'declaration'].indexOf(step) ? 'bg-[#6d28d9]' : 'bg-gray-300'}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Aadhaar Search */}
        {step === 'search' && (
          <Card className='mx-auto max-w-2xl border-[#7c3aed]/20'>
            <CardHeader className='border-b border-[#7c3aed]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7c3aed]'>
                <Search className='h-6 w-6' />
                Search Existing Records
              </CardTitle>
              <CardDescription>
                Enter Aadhaar number to search for existing residence
                certificate records
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='aadhaar' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <Lock className='h-4 w-4' />
                      आधार क्रमांक (Aadhaar Number)
                    </div>
                  </Label>
                  <div className='relative mt-1'>
                    <Input
                      id='aadhaar'
                      type={showAadhaar ? 'text' : 'password'}
                      placeholder='Enter Aadhaar number'
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      className='pr-10'
                    />
                    <button
                      type='button'
                      onClick={() => setShowAadhaar(!showAadhaar)}
                      className='absolute top-1/2 right-3 -translate-y-1/2'
                    >
                      {showAadhaar ? (
                        <EyeOff className='h-4 w-4 text-gray-500' />
                      ) : (
                        <Eye className='h-4 w-4 text-gray-500' />
                      )}
                    </button>
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>
                    • Try first 4 digits of demo Aadhaar numbers • Personal data
                    is masked for security
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleAadhaarSearch}
                disabled={loading || !aadhaarNumber.trim() || searchBlocked}
                className='w-full bg-[#7c3aed] hover:bg-[#6d28d9]'
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
        )}

        {/* Step 2: Applicant Details */}
        {step === 'applicant' && residenceData && (
          <Card className='mx-auto max-w-4xl border-[#7c3aed]/20'>
            <CardHeader className='border-b border-[#7c3aed]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7c3aed]'>
                <User className='h-6 w-6' />
                1️⃣ अर्ज करणाऱ्याची माहिती
              </CardTitle>
              <CardDescription>
                जो व्यक्ती अर्ज करत आहे (स्वतः किंवा कुटुंबातील सदस्यासाठी)
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='applicantName' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      अर्ज करणाऱ्याचे पूर्ण नाव
                    </div>
                  </Label>
                  <Input
                    id='applicantName'
                    name='applicantName'
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='relationWithApplicant'
                    className='text-[#6d28d9]'
                  >
                    संबंध
                  </Label>
                  <Select
                    value={formData.relationWithApplicant}
                    onValueChange={(value) =>
                      handleSelectChange('relationWithApplicant', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                      <SelectValue placeholder='Select relation' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='स्वतः'>स्वतः</SelectItem>
                      <SelectItem value='वडील'>वडील</SelectItem>
                      <SelectItem value='आई'>आई</SelectItem>
                      <SelectItem value='पती'>पती</SelectItem>
                      <SelectItem value='पत्नी'>पत्नी</SelectItem>
                      <SelectItem value='पालक'>पालक</SelectItem>
                      <SelectItem value='इतर'>इतर</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='mobile' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4' />
                      मोबाइल नंबर
                    </div>
                  </Label>
                  <div className='mt-1 flex gap-2'>
                    <Input
                      id='mobile'
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className='border-[#7c3aed]/20 focus:border-[#7c3aed]'
                    />
                    <Button
                      size='sm'
                      variant='outline'
                      className='border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
                    >
                      OTP पाठवा
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor='email' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <MailIcon className='h-4 w-4' />
                      ईमेल आयडी (Optional)
                    </div>
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>

                <div>
                  <Label htmlFor='aadhaar' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <FileDigit className='h-4 w-4' />
                      आधार क्रमांक
                    </div>
                  </Label>
                  <Input
                    id='aadhaar'
                    name='aadhaar'
                    value={formData.aadhaar}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>

                <div>
                  <Label htmlFor='idProofType' className='text-[#6d28d9]'>
                    ओळख पुरावा प्रकार
                  </Label>
                  <Select
                    value={formData.idProofType}
                    onValueChange={(value) =>
                      handleSelectChange('idProofType', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                      <SelectValue placeholder='Select ID proof' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Aadhaar'>Aadhaar</SelectItem>
                      <SelectItem value='Voter ID'>Voter ID</SelectItem>
                      <SelectItem value='PAN'>PAN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='md:col-span-2'>
                  <Label htmlFor='address' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <Map className='h-4 w-4' />
                      अर्ज करणाऱ्याचा सध्याचा पत्ता
                    </div>
                  </Label>
                  <Textarea
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#7c3aed]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('search')}
                className='border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
              >
                Back to Search
              </Button>
              <Button
                onClick={() => setStep('beneficiary')}
                className='bg-[#7c3aed] hover:bg-[#6d28d9]'
              >
                Next: Beneficiary Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Beneficiary Details */}
        {step === 'beneficiary' && (
          <Card className='mx-auto max-w-4xl border-[#7c3aed]/20'>
            <CardHeader className='border-b border-[#7c3aed]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7c3aed]'>
                <UserCheck className='h-6 w-6' />
                2️⃣ ज्याच्यासाठी दाखला हवा आहे त्याची माहिती
              </CardTitle>
              <CardDescription>
                Beneficiary / Certificate Holder Details
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='beneficiaryName' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      पूर्ण नाव
                    </div>
                  </Label>
                  <Input
                    id='beneficiaryName'
                    name='beneficiaryName'
                    value={formData.beneficiaryName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                    placeholder='Enter beneficiary full name'
                  />
                </div>

                <div>
                  <Label className='text-[#6d28d9]'>लिंग</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleSelectChange('gender', value)
                    }
                    className='mt-1 flex gap-4'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='पुरुष' id='male' />
                      <Label htmlFor='male' className='text-[#6d28d9]'>
                        पुरुष
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='स्त्री' id='female' />
                      <Label htmlFor='female' className='text-[#6d28d9]'>
                        स्त्री
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='इतर' id='other' />
                      <Label htmlFor='other' className='text-[#6d28d9]'>
                        इतर
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor='dateOfBirth' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <CalendarDays className='h-4 w-4' />
                      जन्मतारीख
                    </div>
                  </Label>
                  <Input
                    id='dateOfBirth'
                    name='dateOfBirth'
                    type='date'
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='beneficiaryAadhaar'
                    className='text-[#6d28d9]'
                  >
                    <div className='flex items-center gap-2'>
                      <FileDigit className='h-4 w-4' />
                      आधार क्रमांक
                    </div>
                  </Label>
                  <Input
                    id='beneficiaryAadhaar'
                    name='beneficiaryAadhaar'
                    value={formData.beneficiaryAadhaar}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>

                <div>
                  <Label htmlFor='beneficiaryMobile' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4' />
                      मोबाइल नंबर (Optional)
                    </div>
                  </Label>
                  <Input
                    id='beneficiaryMobile'
                    name='beneficiaryMobile'
                    value={formData.beneficiaryMobile}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>

                <div>
                  <Label htmlFor='maritalStatus' className='text-[#6d28d9]'>
                    वैवाहिक स्थिती
                  </Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) =>
                      handleSelectChange('maritalStatus', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                      <SelectValue placeholder='Select marital status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='अविवाहित'>अविवाहित</SelectItem>
                      <SelectItem value='विवाहित'>विवाहित</SelectItem>
                      <SelectItem value='विधवा'>विधवा</SelectItem>
                      <SelectItem value='विभक्त'>विभक्त</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='nationality' className='text-[#6d28d9]'>
                    राष्ट्रीयता
                  </Label>
                  <Input
                    id='nationality'
                    name='nationality'
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                  />
                </div>

                <div>
                  <Label htmlFor='caste' className='text-[#6d28d9]'>
                    जात (Optional)
                  </Label>
                  <Input
                    id='caste'
                    name='caste'
                    value={formData.caste}
                    onChange={handleInputChange}
                    className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                    placeholder='Enter caste if applicable'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#7c3aed]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('applicant')}
                className='border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
              >
                Back to Applicant
              </Button>
              <Button
                onClick={() => setStep('residence')}
                className='bg-[#7c3aed] hover:bg-[#6d28d9]'
              >
                Next: Residence Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Residence Details */}
        {step === 'residence' && (
          <Card className='mx-auto max-w-4xl border-[#7c3aed]/20'>
            <CardHeader className='border-b border-[#7c3aed]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7c3aed]'>
                <Home className='h-6 w-6' />
                3️⃣ निवासी माहिती
              </CardTitle>
              <CardDescription>Residence Details</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label
                      htmlFor='yearsOfResidence'
                      className='text-[#6d28d9]'
                    >
                      किती वर्षे वास्तव
                    </Label>
                    <Input
                      id='yearsOfResidence'
                      name='yearsOfResidence'
                      type='number'
                      min='1'
                      value={formData.yearsOfResidence}
                      onChange={handleInputChange}
                      className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                    />
                  </div>

                  <div>
                    <Label htmlFor='typeOfResidence' className='text-[#6d28d9]'>
                      निवास प्रकार
                    </Label>
                    <Select
                      value={formData.typeOfResidence}
                      onValueChange={(value) =>
                        handleSelectChange('typeOfResidence', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                        <SelectValue placeholder='Select residence type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='स्वतःचे'>स्वतःचे</SelectItem>
                        <SelectItem value='भाड्याचे'>भाड्याचे</SelectItem>
                        <SelectItem value='वारसा'>वारसा</SelectItem>
                        <SelectItem value='इतर'>इतर</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='houseNo' className='text-[#6d28d9]'>
                      हाउस नंबर / मालमत्ता आयडी
                    </Label>
                    <Input
                      id='houseNo'
                      name='houseNo'
                      value={formData.houseNo}
                      onChange={handleInputChange}
                      className='mt-1 border-[#7c3aed]/20 focus:border-[#7c3aed]'
                      placeholder='Enter house number or property ID'
                    />
                  </div>

                  <div>
                    <Label htmlFor='wardNo' className='text-[#6d28d9]'>
                      वार्ड क्रमांक / झोन
                    </Label>
                    <Select
                      value={formData.wardNo}
                      onValueChange={(value) =>
                        handleSelectChange('wardNo', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                        <SelectValue placeholder='Select ward number' />
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
                </div>

                <div>
                  <Label htmlFor='currentAddress' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <Map className='h-4 w-4' />
                      सध्याचा पत्ता
                    </div>
                  </Label>
                  <Textarea
                    id='currentAddress'
                    name='currentAddress'
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#7c3aed]/20 focus:border-[#7c3aed]'
                    placeholder='Enter current residential address'
                  />
                </div>

                <div>
                  <Label htmlFor='permanentAddress' className='text-[#6d28d9]'>
                    <div className='flex items-center gap-2'>
                      <MapPin className='h-4 w-4' />
                      कायमचा पत्ता
                    </div>
                  </Label>
                  <Textarea
                    id='permanentAddress'
                    name='permanentAddress'
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#7c3aed]/20 focus:border-[#7c3aed]'
                    placeholder='Enter permanent address'
                  />
                </div>

                {formData.typeOfResidence === 'भाड्याचे' && (
                  <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                    <p className='text-sm text-yellow-700'>
                      📝 <strong>Note:</strong> For rented residence, please
                      upload rent agreement and property owner`&apos;`s NOC in
                      the documents section.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#7c3aed]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('beneficiary')}
                className='border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
              >
                Back to Beneficiary
              </Button>
              <Button
                onClick={() => setStep('documents')}
                className='bg-[#7c3aed] hover:bg-[#6d28d9]'
              >
                Next: Documents Upload
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Documents Upload */}
        {step === 'documents' && (
          <Card className='mx-auto max-w-4xl border-[#7c3aed]/20'>
            <CardHeader className='border-b border-[#7c3aed]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7c3aed]'>
                <FileText className='h-6 w-6' />
                4️⃣ कागदपत्रे अपलोड
              </CardTitle>
              <CardDescription>
                Required documents for residence certificate application
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.aadhaarCard ? 'border-[#6d28d9] bg-[#6d28d9]/5' : 'border-[#7c3aed]/20 hover:border-[#7c3aed]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#6d28d9]'>
                          Aadhaar Card
                        </h4>
                        <p className='text-sm text-[#6d28d9]/80'>
                          Required - लाभार्थ्याचे
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.aadhaarCard ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('aadhaarCard')}
                        className={
                          uploadedFiles.aadhaarCard
                            ? 'border-[#6d28d9] text-[#6d28d9]'
                            : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
                        }
                      >
                        {uploadedFiles.aadhaarCard ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.electricityBill ? 'border-[#6d28d9] bg-[#6d28d9]/5' : 'border-[#7c3aed]/20 hover:border-[#7c3aed]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#6d28d9]'>
                          Electricity / Water Bill
                        </h4>
                        <p className='text-sm text-[#6d28d9]/80'>
                          Required - पत्त्याचा पुरावा
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.electricityBill ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('electricityBill')}
                        className={
                          uploadedFiles.electricityBill
                            ? 'border-[#6d28d9] text-[#6d28d9]'
                            : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
                        }
                      >
                        {uploadedFiles.electricityBill ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.rationCard ? 'border-[#6d28d9] bg-[#6d28d9]/5' : 'border-[#7c3aed]/20 hover:border-[#7c3aed]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#6d28d9]'>
                          Ration Card
                        </h4>
                        <p className='text-sm text-[#6d28d9]/80'>Optional</p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.rationCard ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('rationCard')}
                        className={
                          uploadedFiles.rationCard
                            ? 'border-[#6d28d9] text-[#6d28d9]'
                            : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
                        }
                      >
                        {uploadedFiles.rationCard ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.propertyTax ? 'border-[#6d28d9] bg-[#6d28d9]/5' : 'border-[#7c3aed]/20 hover:border-[#7c3aed]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#6d28d9]'>
                          Property Tax Receipt
                        </h4>
                        <p className='text-sm text-[#6d28d9]/80'>Optional</p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.propertyTax ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('propertyTax')}
                        className={
                          uploadedFiles.propertyTax
                            ? 'border-[#6d28d9] text-[#6d28d9]'
                            : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
                        }
                      >
                        {uploadedFiles.propertyTax ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.rentAgreement ? 'border-[#6d28d9] bg-[#6d28d9]/5' : 'border-[#7c3aed]/20 hover:border-[#7c3aed]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#6d28d9]'>
                          Rent Agreement
                        </h4>
                        <p className='text-sm text-[#6d28d9]/80'>
                          Conditional - भाड्याचे घर असल्यास
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.rentAgreement ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('rentAgreement')}
                        className={
                          uploadedFiles.rentAgreement
                            ? 'border-[#6d28d9] text-[#6d28d9]'
                            : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
                        }
                      >
                        {uploadedFiles.rentAgreement ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.affidavit ? 'border-[#6d28d9] bg-[#6d28d9]/5' : 'border-[#7c3aed]/20 hover:border-[#7c3aed]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#6d28d9]'>
                          Affidavit
                        </h4>
                        <p className='text-sm text-[#6d28d9]/80'>
                          Conditional - मागणी असल्यास
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.affidavit ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('affidavit')}
                        className={
                          uploadedFiles.affidavit
                            ? 'border-[#6d28d9] text-[#6d28d9]'
                            : 'bg-[#7c3aed] hover:bg-[#6d28d9]'
                        }
                      >
                        {uploadedFiles.affidavit ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                  <p className='text-sm text-yellow-700'>
                    📝 <strong>नोंद:</strong> Aadhaar Card and Electricity/Water
                    Bill are mandatory documents. Other documents are optional
                    or conditional based on your residence type.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#7c3aed]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('residence')}
                className='border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
              >
                Back to Residence
              </Button>
              <Button
                onClick={() => setStep('request')}
                className='bg-[#7c3aed] hover:bg-[#6d28d9]'
              >
                Next: Certificate Request
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 6: Certificate Request */}
        {step === 'request' && (
          <Card className='mx-auto max-w-4xl border-[#7c3aed]/20'>
            <CardHeader className='border-b border-[#7c3aed]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7c3aed]'>
                <FileCheck className='h-6 w-6' />
                5️⃣ दाखला मागणी तपशील
              </CardTitle>
              <CardDescription>Certificate Request Details</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label
                      htmlFor='certificatePurpose'
                      className='text-[#6d28d9]'
                    >
                      दाखला उद्देश
                    </Label>
                    <Select
                      value={formData.certificatePurpose}
                      onValueChange={(value) =>
                        handleSelectChange('certificatePurpose', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                        <SelectValue placeholder='Select purpose' />
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
                    <Label
                      htmlFor='certificateLanguage'
                      className='text-[#6d28d9]'
                    >
                      दाखला भाषा
                    </Label>
                    <Select
                      value={formData.certificateLanguage}
                      onValueChange={(value) =>
                        handleSelectChange('certificateLanguage', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                        <SelectValue placeholder='Select language' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='मराठी'>मराठी</SelectItem>
                        <SelectItem value='इंग्रजी'>English</SelectItem>
                        <SelectItem value='दोन्ही'>Both (Dual)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='certificateType' className='text-[#6d28d9]'>
                      दाखला प्रकार
                    </Label>
                    <Select
                      value={formData.certificateType}
                      onValueChange={(value) =>
                        handleSelectChange('certificateType', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                        <SelectValue placeholder='Select certificate type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='नवीन'>नवीन (New)</SelectItem>
                        <SelectItem value='Duplicate'>Duplicate</SelectItem>
                        <SelectItem value='Correction'>Correction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='numberOfCopies' className='text-[#6d28d9]'>
                      प्रतींची संख्या
                    </Label>
                    <Select
                      value={formData.numberOfCopies.toString()}
                      onValueChange={(value) =>
                        handleSelectChange('numberOfCopies', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#7c3aed]/20 focus:border-[#7c3aed]'>
                        <SelectValue placeholder='Select number of copies' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>1 Copy</SelectItem>
                        <SelectItem value='2'>2 Copies</SelectItem>
                        <SelectItem value='3'>3 Copies</SelectItem>
                        <SelectItem value='4'>4 Copies</SelectItem>
                        <SelectItem value='5'>5 Copies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='rounded-lg border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-4'>
                  <h4 className='mb-4 font-medium text-[#6d28d9]'>
                    Fee Structure (if applicable)
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-[#6d28d9]'>Application Fee</span>
                      <span>₹50</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#6d28d9]'>
                        Certificate Fee (per copy)
                      </span>
                      <span>₹100</span>
                    </div>
                    <div className='flex justify-between border-t border-[#7c3aed]/20 pt-2'>
                      <span className='font-semibold text-[#6d28d9]'>
                        Total Amount ({formData.numberOfCopies} copies)
                      </span>
                      <span className='font-bold text-[#7c3aed]'>
                        ₹{50 + formData.numberOfCopies * 100}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='emailNotification'
                      checked={formData.emailNotification}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          emailNotification: checked as boolean
                        }))
                      }
                      className='border-[#7c3aed] text-[#7c3aed] data-[state=checked]:bg-[#7c3aed]'
                    />
                    <label
                      htmlFor='emailNotification'
                      className='text-sm leading-none font-medium text-[#6d28d9]'
                    >
                      Email Notification (Status updates and certificate
                      download)
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='smsNotification'
                      checked={formData.smsNotification}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          smsNotification: checked as boolean
                        }))
                      }
                      className='border-[#7c3aed] text-[#7c3aed] data-[state=checked]:bg-[#7c3aed]'
                    />
                    <label
                      htmlFor='smsNotification'
                      className='text-sm leading-none font-medium text-[#6d28d9]'
                    >
                      SMS Notification (OTP and application status)
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#7c3aed]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('documents')}
                className='border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
              >
                Back to Documents
              </Button>
              <Button
                onClick={() => setStep('declaration')}
                className='bg-[#7c3aed] hover:bg-[#6d28d9]'
              >
                Next: Declaration
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 7: Declaration */}
        {step === 'declaration' && (
          <Card className='mx-auto max-w-4xl border-[#7c3aed]/20'>
            <CardHeader className='border-b border-[#7c3aed]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7c3aed]'>
                <CheckCircle className='h-6 w-6' />
                6️⃣ जाहीरनामा व सबमिशन
              </CardTitle>
              <CardDescription>
                Declaration and application submission
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-6'>
                  <h4 className='mb-4 font-medium text-[#6d28d9]'>
                    महत्वाची माहिती
                  </h4>
                  <div className='space-y-3 text-sm text-[#6d28d9]/80'>
                    <div className='flex items-start gap-2'>
                      <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                      <span>सर्व माहिती खरी आणि तपासलेली आहे</span>
                    </div>
                    <div className='flex items-start gap-2'>
                      <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                      <span>सर्व आवश्यक कागदपत्रे अपलोड केली आहेत</span>
                    </div>
                    <div className='flex items-start gap-2'>
                      <CheckCircle className='mt-0.5 h-4 w-4 text-green-600' />
                      <span>
                        पत्ता सत्यापनासाठी नगर परिषद कर्मचारी भेट देऊ शकतात
                      </span>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <h4 className='mb-2 font-medium text-green-800'>
                    Application Summary
                  </h4>
                  <div className='space-y-2 text-sm text-green-700'>
                    <div className='flex justify-between'>
                      <span>Beneficiary Name:</span>
                      <span className='font-medium'>
                        {formData.beneficiaryName || 'Not provided'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Address:</span>
                      <span className='font-medium'>
                        {formData.currentAddress.substring(0, 30)}...
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Years of Residence:</span>
                      <span className='font-medium'>
                        {formData.yearsOfResidence} years
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Processing Time:</span>
                      <span className='font-medium'>3-5 Working Days</span>
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
                      className='mt-1 border-[#7c3aed] text-[#7c3aed] data-[state=checked]:bg-[#7c3aed]'
                    />
                    <div>
                      <label
                        htmlFor='declaration'
                        className='text-sm leading-none font-medium text-[#6d28d9]'
                      >
                        मी याची खात्री करतो/करते की वरील माहिती खरी आहे
                      </label>
                      <p className='mt-1 text-sm text-[#6d28d9]/70'>
                        I hereby declare that all the information provided above
                        is true and correct to the best of my knowledge. I
                        understand that providing false information may lead to
                        legal action.
                      </p>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label className='text-[#6d28d9]'>
                      <div className='flex items-center gap-2'>
                        <Signature className='h-4 w-4' />
                        Applicant Signature (Optional - Can be uploaded later)
                      </div>
                    </Label>
                    <Input
                      type='file'
                      accept='.png,.jpg,.jpeg,.pdf'
                      className='border-[#7c3aed]/20 focus:border-[#7c3aed]'
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#7c3aed]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('request')}
                className='border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
              >
                Back to Request
              </Button>
              <Button
                onClick={handleSubmitApplication}
                disabled={loading || !formData.declaration}
                className='bg-[#7c3aed] hover:bg-[#6d28d9]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <CheckCircle className='mr-2 h-4 w-4' />
                    Submit Application
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 8: Confirmation */}
        {step === 'confirmation' && (
          <Card className='mx-auto max-w-4xl border-[#6d28d9]/20'>
            <CardHeader className='border-b border-[#6d28d9]/10'>
              <CardTitle className='flex items-center gap-2 text-[#6d28d9]'>
                <CheckCircle className='h-8 w-8' />
                Application Submitted Successfully!
              </CardTitle>
              <CardDescription>
                Your residence certificate application has been submitted and is
                being processed
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg border border-[#6d28d9]/20 bg-[#6d28d9]/5 p-6 text-center'>
                  <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#6d28d9]/10'>
                    <CheckCircle className='h-12 w-12 text-[#6d28d9]' />
                  </div>
                  <h3 className='mb-2 text-2xl font-bold text-[#6d28d9]'>
                    Application Confirmed
                  </h3>
                  <p className='text-[#6d28d9]/80'>
                    Application ID: RC-APP-{Date.now().toString().slice(-10)}
                  </p>
                  <p className='mt-4 text-lg text-[#7c3aed]'>
                    Status:{' '}
                    <span className='font-bold'>Under Verification</span>
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='rounded-lg bg-[#7c3aed]/5 p-4'>
                    <p className='text-sm text-[#6d28d9]'>Beneficiary Name</p>
                    <p className='font-medium text-[#7c3aed]'>
                      {formData.beneficiaryName || 'Not provided'}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#7c3aed]/5 p-4'>
                    <p className='text-sm text-[#6d28d9]'>Address</p>
                    <p className='font-medium text-[#7c3aed]'>
                      {formData.wardNo}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#7c3aed]/5 p-4'>
                    <p className='text-sm text-[#6d28d9]'>Certificate Type</p>
                    <p className='font-medium text-[#7c3aed]'>
                      {formData.certificateType}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#7c3aed]/5 p-4'>
                    <p className='text-sm text-[#6d28d9]'>Processing Time</p>
                    <p className='font-medium text-[#7c3aed]'>
                      3-5 Working Days
                    </p>
                  </div>
                </div>

                <div className='rounded-lg border border-[#6d28d9]/20 bg-[#6d28d9]/5 p-4'>
                  <h4 className='mb-2 flex items-center gap-2 font-medium text-[#6d28d9]'>
                    <CheckCircle className='h-4 w-4' />
                    What happens next?
                  </h4>
                  <ul className='space-y-2 text-sm text-[#6d28d9]'>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Application verification in progress
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Document verification by Nagar Parishad
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Address verification may be conducted
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      {formData.emailNotification &&
                        `Email updates sent to ${formData.email}`}
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      {formData.smsNotification &&
                        `SMS updates sent to ${formData.mobile}`}
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Certificate will be available for download after approval
                    </li>
                  </ul>
                </div>

                <div className='flex gap-4'>
                  <Button
                    variant='outline'
                    onClick={handleDownloadCertificate}
                    className='flex-1 border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10'
                  >
                    <Download className='mr-2 h-4 w-4' />
                    Download Acknowledgement
                  </Button>
                  <Button
                    onClick={() => {
                      setStep('search');
                      setResidenceData(null);
                      setAadhaarNumber('');
                      setFormData({
                        applicantName: '',
                        relationWithApplicant: 'स्वतः',
                        mobile: '',
                        email: '',
                        aadhaar: '',
                        address: '',
                        idProofType: 'Aadhaar',
                        beneficiaryName: '',
                        gender: 'पुरुष',
                        dateOfBirth: '',
                        beneficiaryAadhaar: '',
                        beneficiaryMobile: '',
                        maritalStatus: 'अविवाहित',
                        nationality: 'भारतीय',
                        caste: '',
                        currentAddress: '',
                        permanentAddress: '',
                        yearsOfResidence: 1,
                        typeOfResidence: 'स्वतःचे',
                        houseNo: '',
                        wardNo: 'वार्ड 1',
                        certificatePurpose: 'बँक खाते',
                        certificateLanguage: 'मराठी',
                        certificateType: 'नवीन',
                        numberOfCopies: 1,
                        declaration: false,
                        emailNotification: true,
                        smsNotification: true
                      });
                      setUploadedFiles({
                        aadhaarCard: false,
                        rationCard: false,
                        electricityBill: false,
                        propertyTax: false,
                        rentAgreement: false,
                        affidavit: false
                      });
                    }}
                    className='flex-1 bg-[#7c3aed] hover:bg-[#6d28d9]'
                  >
                    New Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

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
  Heart,
  UserPlus,
  Clover
} from 'lucide-react';

interface MarriageCertificateData {
  id: string;
  // Applicant Details
  applicantName: string;
  applicantRelation: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  idProofType: string;

  // Groom Details
  groomName: string;
  groomDOB: string;
  groomAge: number;
  groomAadhaar: string;
  groomMaritalStatus: string;
  groomOccupation: string;
  groomReligion: string;
  groomPermanentAddress: string;

  // Bride Details
  brideName: string;
  brideDOB: string;
  brideAge: number;
  brideAadhaar: string;
  brideMaritalStatus: string;
  brideOccupation: string;
  brideReligion: string;
  bridePermanentAddress: string;

  // Marriage Details
  marriageDate: string;
  marriagePlace: string;
  marriageType: string;
  registrationOffice: string;

  // Witness Details (Minimum 3)
  witnesses: Array<{
    name: string;
    relation: string;
    aadhaar: string;
    address: string;
  }>;

  // Request Details
  certificateType: string;
  numberOfCopies: number;
  language: string;
  urgentService: boolean;
}

const dummyMarriageRecords: MarriageCertificateData[] = [
  {
    id: '1',
    applicantName: 'राजेश पाटील',
    applicantRelation: 'पती',
    mobile: '9876543210',
    email: 'rajesh.patil@example.com',
    aadhaar: '1234-5678-9012',
    address: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    idProofType: 'Aadhaar',

    groomName: 'राजेश पाटील',
    groomDOB: '1990-05-15',
    groomAge: 34,
    groomAadhaar: '1234-5678-9012',
    groomMaritalStatus: 'अविवाहित',
    groomOccupation: 'इंजिनियर',
    groomReligion: 'हिंदू',
    groomPermanentAddress: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',

    brideName: 'प्रिया पाटील',
    brideDOB: '1992-08-20',
    brideAge: 32,
    brideAadhaar: '2345-6789-0123',
    brideMaritalStatus: 'अविवाहित',
    brideOccupation: 'शिक्षिका',
    brideReligion: 'हिंदू',
    bridePermanentAddress: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',

    marriageDate: '2024-02-14',
    marriagePlace: 'शिवाजी नगर, नागपूर',
    marriageType: 'हिंदू',
    registrationOffice: 'नागपूर नगर परिषद',

    witnesses: [
      {
        name: 'रवींद्र शर्मा',
        relation: 'मित्र',
        aadhaar: '3456-7890-1234',
        address: 'नागपूर'
      },
      {
        name: 'सुनीता देशमुख',
        relation: 'बहीण',
        aadhaar: '4567-8901-2345',
        address: 'नागपूर'
      },
      {
        name: 'अमित जोशी',
        relation: 'चुलत भाऊ',
        aadhaar: '5678-9012-3456',
        address: 'नागपूर'
      }
    ],

    certificateType: 'नवीन',
    numberOfCopies: 1,
    language: 'मराठी',
    urgentService: false
  },
  {
    id: '2',
    applicantName: 'सुमन देशपांडे',
    applicantRelation: 'पत्नी',
    mobile: '8765432109',
    email: 'suman.d@example.com',
    aadhaar: '2345-6789-0123',
    address: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    idProofType: 'Aadhaar',

    groomName: 'अजय देशपांडे',
    groomDOB: '1988-03-10',
    groomAge: 36,
    groomAadhaar: '9876-5432-1098',
    groomMaritalStatus: 'अविवाहित',
    groomOccupation: 'डॉक्टर',
    groomReligion: 'हिंदू',
    groomPermanentAddress: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',

    brideName: 'सुमन देशपांडे',
    brideDOB: '1990-07-25',
    brideAge: 34,
    brideAadhaar: '2345-6789-0123',
    brideMaritalStatus: 'अविवाहित',
    brideOccupation: 'नर्स',
    brideReligion: 'हिंदू',
    bridePermanentAddress: 'गाव: शिंदेवाडी, ता: शेगांव, जि: बुलढाणा',

    marriageDate: '2023-12-20',
    marriagePlace: 'शेगांव, बुलढाणा',
    marriageType: 'हिंदू',
    registrationOffice: 'शेगांव नगर परिषद',

    witnesses: [
      {
        name: 'विजय देशपांडे',
        relation: 'वडील',
        aadhaar: '6789-0123-4567',
        address: 'शेगांव'
      },
      {
        name: 'मीना देशपांडे',
        relation: 'आई',
        aadhaar: '7890-1234-5678',
        address: 'शेगांव'
      },
      {
        name: 'राहुल पाटील',
        relation: 'मित्र',
        aadhaar: '8901-2345-6789',
        address: 'शेगांव'
      }
    ],

    certificateType: 'Duplicate',
    numberOfCopies: 2,
    language: 'इंग्रजी',
    urgentService: true
  }
];

interface UploadedDocuments {
  groomAadhaar: boolean;
  brideAadhaar: boolean;
  ageProofGroom: boolean;
  ageProofBride: boolean;
  addressProof: boolean;
  marriagePhotos: boolean;
  divorceDeathCertificate: boolean;
  witnessIdProof: boolean;
}

export default function MarriageCertificatePage() {
  const [step, setStep] = useState<
    | 'search'
    | 'applicant'
    | 'groom'
    | 'bride'
    | 'marriage'
    | 'witnesses'
    | 'documents'
    | 'request'
    | 'declaration'
    | 'confirmation'
  >('search');
  const [loading, setLoading] = useState(false);
  const [marriageData, setMarriageData] =
    useState<MarriageCertificateData | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [formData, setFormData] = useState({
    // Applicant Details
    applicantName: '',
    applicantRelation: 'पती',
    mobile: '',
    email: '',
    aadhaar: '',
    address: '',
    idProofType: 'Aadhaar',

    // Groom Details
    groomName: '',
    groomDOB: '',
    groomAge: '',
    groomAadhaar: '',
    groomMaritalStatus: 'अविवाहित',
    groomOccupation: '',
    groomReligion: 'हिंदू',
    groomPermanentAddress: '',

    // Bride Details
    brideName: '',
    brideDOB: '',
    brideAge: '',
    brideAadhaar: '',
    brideMaritalStatus: 'अविवाहित',
    brideOccupation: '',
    brideReligion: 'हिंदू',
    bridePermanentAddress: '',

    // Marriage Details
    marriageDate: '',
    marriagePlace: '',
    marriageType: 'हिंदू',
    registrationOffice: 'नागपूर नगर परिषद',

    // Witness Details (initial 3 witnesses)
    witnesses: [
      { name: '', relation: '', aadhaar: '', address: '' },
      { name: '', relation: '', aadhaar: '', address: '' },
      { name: '', relation: '', aadhaar: '', address: '' }
    ],

    // Request Details
    certificateType: 'नवीन',
    numberOfCopies: 1,
    language: 'मराठी',
    urgentService: false,

    // Declaration
    declaration: false,

    // Payment
    paymentMethod: 'UPI',
    upiId: '',
    emailNotification: true,
    smsNotification: true
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedDocuments>({
    groomAadhaar: false,
    brideAadhaar: false,
    ageProofGroom: false,
    ageProofBride: false,
    addressProof: false,
    marriagePhotos: false,
    divorceDeathCertificate: false,
    witnessIdProof: false
  });

  const [searchAttempts, setSearchAttempts] = useState(0);
  const [searchBlocked, setSearchBlocked] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    walletType: '',
    walletId: ''
  });
  const [fees, setFees] = useState({
    applicationFee: 150,
    urgentFee: 300,
    copyFee: 75,
    total: 150
  });

  useEffect(() => {
    // Calculate fees when form data changes
    let total = fees.applicationFee;
    if (formData.urgentService) total += fees.urgentFee;
    if (formData.numberOfCopies > 1)
      total += (formData.numberOfCopies - 1) * fees.copyFee;
    setFees((prev) => ({ ...prev, total }));
  }, [formData.urgentService, formData.numberOfCopies]);

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
      }, 300000); // 5 minutes
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

      // For demo purposes, show only if full or partial match of first 4 digits
      const foundRecord = dummyMarriageRecords.find((record) => {
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

        setMarriageData(maskedRecord);
        setFormData({
          applicantName: foundRecord.applicantName,
          applicantRelation: foundRecord.applicantRelation,
          mobile: foundRecord.mobile,
          email: foundRecord.email,
          aadhaar: foundRecord.aadhaar,
          address: foundRecord.address,
          idProofType: foundRecord.idProofType,

          groomName: foundRecord.groomName,
          groomDOB: foundRecord.groomDOB,
          groomAge: foundRecord.groomAge.toString(),
          groomAadhaar: foundRecord.groomAadhaar,
          groomMaritalStatus: foundRecord.groomMaritalStatus,
          groomOccupation: foundRecord.groomOccupation,
          groomReligion: foundRecord.groomReligion,
          groomPermanentAddress: foundRecord.groomPermanentAddress,

          brideName: foundRecord.brideName,
          brideDOB: foundRecord.brideDOB,
          brideAge: foundRecord.brideAge.toString(),
          brideAadhaar: foundRecord.brideAadhaar,
          brideMaritalStatus: foundRecord.brideMaritalStatus,
          brideOccupation: foundRecord.brideOccupation,
          brideReligion: foundRecord.brideReligion,
          bridePermanentAddress: foundRecord.bridePermanentAddress,

          marriageDate: foundRecord.marriageDate,
          marriagePlace: foundRecord.marriagePlace,
          marriageType: foundRecord.marriageType,
          registrationOffice: foundRecord.registrationOffice,

          witnesses: foundRecord.witnesses,

          certificateType: foundRecord.certificateType,
          numberOfCopies: foundRecord.numberOfCopies,
          language: foundRecord.language,
          urgentService: foundRecord.urgentService,

          declaration: false,
          paymentMethod: 'UPI',
          upiId: `${foundRecord.mobile.slice(-4)}@upi`,
          emailNotification: true,
          smsNotification: true
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWitnessChange = (index: number, field: string, value: string) => {
    const updatedWitnesses = [...formData.witnesses];
    updatedWitnesses[index] = { ...updatedWitnesses[index], [field]: value };
    setFormData((prev) => ({ ...prev, witnesses: updatedWitnesses }));
  };

  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  };

  const handleDOBChange = (person: 'groom' | 'bride', dob: string) => {
    const age = calculateAge(dob);
    if (person === 'groom') {
      setFormData((prev) => ({
        ...prev,
        groomDOB: dob,
        groomAge: age
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        brideDOB: dob,
        brideAge: age
      }));
    }
  };

  const handleFileUpload = (type: keyof UploadedDocuments) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));
    console.log(`${type} uploaded successfully`);
  };

  const handleDownloadCertificate = () => {
    // Create certificate data
    const certificateData = {
      certificateNumber: `MC-${Date.now().toString().slice(-10)}`,
      registrationNumber: `MR-${Date.now().toString().slice(-8)}`,
      issueDate: new Date().toLocaleDateString('en-IN'),
      issueTime: new Date().toLocaleTimeString('en-IN'),

      groomName: formData.groomName,
      groomDOB: formData.groomDOB,
      groomAge: formData.groomAge,
      groomMaritalStatus: formData.groomMaritalStatus,
      groomOccupation: formData.groomOccupation,
      groomReligion: formData.groomReligion,
      groomAddress: formData.groomPermanentAddress,

      brideName: formData.brideName,
      brideDOB: formData.brideDOB,
      brideAge: formData.brideAge,
      brideMaritalStatus: formData.brideMaritalStatus,
      brideOccupation: formData.brideOccupation,
      brideReligion: formData.brideReligion,
      brideAddress: formData.bridePermanentAddress,

      marriageDate: formData.marriageDate,
      marriagePlace: formData.marriagePlace,
      marriageType: formData.marriageType,
      registrationOffice: formData.registrationOffice,

      witnesses: formData.witnesses,

      applicantName: formData.applicantName,
      applicantRelation: formData.applicantRelation,
      certificateType: formData.certificateType,
      language: formData.language,
      numberOfCopies: formData.numberOfCopies
    };

    // Create a temporary iframe with your HTML content
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
          
          /* Certificate Styles */
          .header { 
            text-align: center; 
            color: #b01d4f; 
            margin-bottom: 30px; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #b01d4f;
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
            background: #f9f9f9; 
            border-radius: 8px; 
            border: 1px solid #e0e0e0;
          }
          .section-title { 
            color: #b01d4f; 
            font-size: 18px; 
            font-weight: bold;
            margin: 30px 0 15px 0; 
            padding-bottom: 8px;
            border-bottom: 2px solid #b01d4f;
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
            border-left: 4px solid #b01d4f;
          }
          .certificate-section {
            background: linear-gradient(135deg, #b01d4f, #7a1e4f);
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: center;
          }
          .couple-names {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
          }
          .heart {
            color: #ff6b9d;
            font-size: 24px;
            margin: 0 10px;
          }
          .valid-badge {
            display: inline-block;
            background: #28a745;
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
            border-top: 2px dashed #b01d4f;
            font-style: italic;
            color: #b01d4f;
          }
          .witness-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .witness-table th,
          .witness-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          .witness-table th {
            background: #f5f5f5;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h1>विवाह प्रमाणपत्र</h1>
          <h2>Marriage Certificate</h2>
        </div>
        
        <!-- Certificate Info -->
        <div class="certificate-info">
          <div class="detail-item">
            <span class="label">Certificate No:</span>
            <span class="value">${certificateData.certificateNumber}</span>
          </div>
          <div class="detail-item">
            <span class="label">Registration No:</span>
            <span class="value">${certificateData.registrationNumber}</span>
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
        
        <!-- Couple Details Section -->
        <div class="certificate-section">
          <div>We certify the marriage of</div>
          <div class="couple-names">
            ${certificateData.groomName} <span class="heart">&amp;</span> ${certificateData.brideName}
          </div>
          <div>Marriage Solemnized on: ${certificateData.marriageDate}</div>
          <div class="valid-badge">OFFICIALLY REGISTERED</div>
        </div>
        
        <!-- Groom Details -->
        <div class="section-title">GROOM DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Full Name:</span>
            <span class="value">${certificateData.groomName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Date of Birth:</span>
            <span class="value">${certificateData.groomDOB} (Age: ${certificateData.groomAge} years)</span>
          </div>
          <div class="detail-item">
            <span class="label">Marital Status:</span>
            <span class="value">${certificateData.groomMaritalStatus}</span>
          </div>
          <div class="detail-item">
            <span class="label">Occupation:</span>
            <span class="value">${certificateData.groomOccupation}</span>
          </div>
          <div class="detail-item">
            <span class="label">Religion:</span>
            <span class="value">${certificateData.groomReligion}</span>
          </div>
        </div>
        <div class="address">
          <span class="label">Permanent Address:</span><br>
          <span class="value">${certificateData.groomAddress}</span>
        </div>
        
        <!-- Bride Details -->
        <div class="section-title">BRIDE DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Full Name:</span>
            <span class="value">${certificateData.brideName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Date of Birth:</span>
            <span class="value">${certificateData.brideDOB} (Age: ${certificateData.brideAge} years)</span>
          </div>
          <div class="detail-item">
            <span class="label">Marital Status:</span>
            <span class="value">${certificateData.brideMaritalStatus}</span>
          </div>
          <div class="detail-item">
            <span class="label">Occupation:</span>
            <span class="value">${certificateData.brideOccupation}</span>
          </div>
          <div class="detail-item">
            <span class="label">Religion:</span>
            <span class="value">${certificateData.brideReligion}</span>
          </div>
        </div>
        <div class="address">
          <span class="label">Permanent Address:</span><br>
          <span class="value">${certificateData.brideAddress}</span>
        </div>
        
        <!-- Marriage Details -->
        <div class="section-title">MARRIAGE DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Marriage Date:</span>
            <span class="value">${certificateData.marriageDate}</span>
          </div>
          <div class="detail-item">
            <span class="label">Marriage Place:</span>
            <span class="value">${certificateData.marriagePlace}</span>
          </div>
          <div class="detail-item">
            <span class="label">Marriage Type:</span>
            <span class="value">${certificateData.marriageType}</span>
          </div>
          <div class="detail-item">
            <span class="label">Registration Office:</span>
            <span class="value">${certificateData.registrationOffice}</span>
          </div>
        </div>
        
        <!-- Witness Details -->
        <div class="section-title">WITNESS DETAILS (Minimum 3 Witnesses)</div>
        <table class="witness-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Relation</th>
              <th>Aadhaar Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            ${certificateData.witnesses
              .map(
                (witness, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${witness.name}</td>
                <td>${witness.relation}</td>
                <td>${witness.aadhaar}</td>
                <td>${witness.address}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
        
        <!-- Application Details -->
        <div class="section-title">APPLICATION DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Applicant Name:</span>
            <span class="value">${certificateData.applicantName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Relation to Couple:</span>
            <span class="value">${certificateData.applicantRelation}</span>
          </div>
          <div class="detail-item">
            <span class="label">Certificate Type:</span>
            <span class="value">${certificateData.certificateType}</span>
          </div>
          <div class="detail-item">
            <span class="label">Language:</span>
            <span class="value">${certificateData.language}</span>
          </div>
          <div class="detail-item">
            <span class="label">Number of Copies:</span>
            <span class="value">${certificateData.numberOfCopies}</span>
          </div>
        </div>
        
        <!-- Stamp Section -->
        <div class="stamp">
          <div style="font-weight: bold;">Authorized Signature</div>
          <div>Marriage Registration Office</div>
          <div>${certificateData.registrationOffice}</div>
        </div>
        
        <!-- Notes -->
        <div class="notes">
          <div class="section-title">IMPORTANT NOTES</div>
          <div class="note-item">✓ This is a computer-generated certificate, valid without signature.</div>
          <div class="note-item">✓ Please preserve this certificate for all legal purposes (passport, visa, property).</div>
          <div class="note-item">✓ For any queries or discrepancies, contact Marriage Registration office within 30 days.</div>
          <div class="note-item">✓ This certificate is essential for passport application, visa, and legal documentation.</div>
          <div class="note-item">✓ In case of loss, apply for a duplicate certificate with the same certificate number.</div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div>Issued by Marriage Registration Department</div>
          <div style="font-weight: bold; margin: 10px 0;">Government of Maharashtra</div>
          <div style="margin-top: 10px; font-size: 12px;">
            Customer Care: 1800-XXX-XXXX | Email: marriagecert@nagarpalika.gov.in<br>
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

      // Wait for iframe to load
      setTimeout(() => {
        const iframeBody = iframeDoc.body;

        if (!iframeBody) {
          // Clean up if no body found
          if (iframe.parentNode === document.body) {
            document.body.removeChild(iframe);
          }
          alert('Error: Could not generate PDF content.');
          return;
        }

        // Convert to PDF
        html2canvas(iframeBody, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: false,
          removeContainer: true,
          foreignObjectRendering: false
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(
              `Marriage_Certificate_${certificateData.certificateNumber}.pdf`
            );

            // Safe cleanup
            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }

            alert(
              `Certificate downloaded successfully!\nFile: Marriage_Certificate_${certificateData.certificateNumber}.pdf`
            );
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);

            // Safe cleanup
            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }

            alert('Error generating PDF. Please try again.');
          });
      }, 500); // Give iframe time to load
    } else {
      // Clean up if iframe creation failed
      if (iframe.parentNode === document.body) {
        document.body.removeChild(iframe);
      }
      alert('Error: Could not create PDF generator.');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderPaymentForm = () => {
    switch (formData.paymentMethod) {
      case 'CreditCard':
      case 'DebitCard':
        return (
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <Label htmlFor='cardNumber' className='text-[#7a1e4f]'>
                  Card Number
                </Label>
                <Input
                  id='cardNumber'
                  name='cardNumber'
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      cardNumber: e.target.value
                    }))
                  }
                  placeholder='1234 5678 9012 3456'
                  maxLength={19}
                  className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                />
              </div>
              <div>
                <Label htmlFor='cardHolder' className='text-[#7a1e4f]'>
                  Card Holder Name
                </Label>
                <Input
                  id='cardHolder'
                  name='cardHolder'
                  value={paymentDetails.cardHolder}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      cardHolder: e.target.value
                    }))
                  }
                  placeholder='John Doe'
                  className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                />
              </div>
              <div>
                <Label htmlFor='expiryDate' className='text-[#7a1e4f]'>
                  Expiry Date
                </Label>
                <Input
                  id='expiryDate'
                  name='expiryDate'
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      expiryDate: e.target.value
                    }))
                  }
                  placeholder='MM/YY'
                  className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                />
              </div>
              <div>
                <Label htmlFor='cvv' className='text-[#7a1e4f]'>
                  CVV
                </Label>
                <Input
                  id='cvv'
                  name='cvv'
                  type='password'
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      cvv: e.target.value
                    }))
                  }
                  placeholder='123'
                  maxLength={3}
                  className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                />
              </div>
            </div>
          </div>
        );

      case 'NetBanking':
        return (
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <Label htmlFor='bankName' className='text-[#7a1e4f]'>
                  Bank Name
                </Label>
                <Input
                  id='bankName'
                  name='bankName'
                  value={paymentDetails.bankName}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      bankName: e.target.value
                    }))
                  }
                  placeholder='State Bank of India'
                  className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                />
              </div>
              <div>
                <Label htmlFor='accountNumber' className='text-[#7a1e4f]'>
                  Account Number
                </Label>
                <Input
                  id='accountNumber'
                  name='accountNumber'
                  value={paymentDetails.accountNumber}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      accountNumber: e.target.value
                    }))
                  }
                  placeholder='1234567890'
                  className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                />
              </div>
              <div>
                <Label htmlFor='ifscCode' className='text-[#7a1e4f]'>
                  IFSC Code
                </Label>
                <Input
                  id='ifscCode'
                  name='ifscCode'
                  value={paymentDetails.ifscCode}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      ifscCode: e.target.value
                    }))
                  }
                  placeholder='SBIN0001234'
                  className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                />
              </div>
            </div>
          </div>
        );

      case 'UPI':
        return (
          <div className='space-y-4'>
            <div>
              <Label htmlFor='upiId' className='text-[#7a1e4f]'>
                UPI ID
              </Label>
              <Input
                id='upiId'
                name='upiId'
                value={formData.upiId}
                onChange={handleInputChange}
                placeholder='mobile@upi'
                className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
              />
            </div>
          </div>
        );

      default:
        return null;
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
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8'>
      <div className='max-w-full px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <Clover className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              विवाह प्रमाणपत्र अर्ज
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#b01d4f]/10 p-3'>
              <Heart className='h-8 w-8 text-[#b01d4f]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद विवाह प्रमाणपत्र पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Marriage Certificate Portal
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
          {[
            'search',
            'applicant',
            'groom',
            'bride',
            'marriage',
            'witnesses',
            'documents',
            'request',
            'declaration'
          ].map((stepName, index) => (
            <div key={stepName} className='flex items-center'>
              <div
                className={`flex items-center ${step === stepName ? 'text-[#b01d4f]' : index < ['search', 'applicant', 'groom', 'bride', 'marriage', 'witnesses', 'documents', 'request', 'declaration'].indexOf(step) ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step === stepName ? 'bg-[#b01d4f]/10' : index < ['search', 'applicant', 'groom', 'bride', 'marriage', 'witnesses', 'documents', 'request', 'declaration'].indexOf(step) ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
                >
                  {index === 0 && <Search className='h-4 w-4' />}
                  {index === 1 && <User className='h-4 w-4' />}
                  {index === 2 && <UserPlus className='h-4 w-4' />}
                  {index === 3 && <User className='h-4 w-4' />}
                  {index === 4 && <Heart className='h-4 w-4' />}
                  {index === 5 && <Users className='h-4 w-4' />}
                  {index === 6 && <FileText className='h-4 w-4' />}
                  {index === 7 && <FileCheck className='h-4 w-4' />}
                  {index === 8 && <CheckCircle className='h-4 w-4' />}
                </div>
                <span className='ml-2 hidden text-sm font-medium md:block'>
                  {index === 0 && 'शोध'}
                  {index === 1 && 'अर्जदार'}
                  {index === 2 && 'वर'}
                  {index === 3 && 'वधू'}
                  {index === 4 && 'विवाह'}
                  {index === 5 && 'साक्षीदार'}
                  {index === 6 && 'कागद'}
                  {index === 7 && 'अर्ज'}
                  {index === 8 && 'जाहीरनामा'}
                </span>
              </div>
              {index < 8 && (
                <div
                  className={`mx-2 h-1 w-8 ${index < ['search', 'applicant', 'groom', 'bride', 'marriage', 'witnesses', 'documents', 'request', 'declaration'].indexOf(step) ? 'bg-[#7a1e4f]' : 'bg-gray-300'}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Aadhaar Search */}
        {step === 'search' && (
          <Card className='mx-auto max-w-2xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <Search className='h-6 w-6' />
                Search Marriage Records
              </CardTitle>
              <CardDescription>
                Enter Aadhaar number to search for marriage records
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='aadhaar' className='text-[#7a1e4f]'>
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
        )}

        {/* Step 2: Applicant Details */}
        {step === 'applicant' && marriageData && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <User className='h-6 w-6' />
                अर्जदाराची माहिती
              </CardTitle>
              <CardDescription>
                Person applying for the marriage certificate
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='applicantName' className='text-[#7a1e4f]'>
                    अर्जदाराचे पूर्ण नाव
                  </Label>
                  <Input
                    id='applicantName'
                    name='applicantName'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='applicantRelation' className='text-[#7a1e4f]'>
                    नाते (पती / पत्नी / पालक)
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('applicantRelation', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select relation' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='पती'>पती</SelectItem>
                      <SelectItem value='पत्नी'>पत्नी</SelectItem>
                      <SelectItem value='वडील'>वडील</SelectItem>
                      <SelectItem value='आई'>आई</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='mobile' className='text-[#7a1e4f]'>
                    मोबाइल नंबर (OTP)
                  </Label>
                  <div className='mt-1 flex gap-2'>
                    <Input
                      id='mobile'
                      name='mobile'
                      onChange={handleInputChange}
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
                    ई-मेल (ऐच्छिक)
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='aadhaar' className='text-[#7a1e4f]'>
                    आधार क्रमांक
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
                  <Label htmlFor='idProofType' className='text-[#7a1e4f]'>
                    ओळखपत्र प्रकार
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('idProofType', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select ID proof' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Aadhaar'>Aadhaar</SelectItem>
                      <SelectItem value='PAN'>PAN</SelectItem>
                      <SelectItem value='Voter ID'>Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='md:col-span-2'>
                  <Label htmlFor='address' className='text-[#7a1e4f]'>
                    पत्ता
                  </Label>
                  <Textarea
                    id='address'
                    name='address'
                    onChange={handleInputChange}
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
                Back to Search
              </Button>
              <Button
                onClick={() => setStep('groom')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Groom Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Groom Details */}
        {step === 'groom' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <UserPlus className='h-6 w-6' />
                वराची माहिती
              </CardTitle>
              <CardDescription>Groom information</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='groomName' className='text-[#7a1e4f]'>
                    पूर्ण नाव
                  </Label>
                  <Input
                    id='groomName'
                    name='groomName'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='groomDOB' className='text-[#7a1e4f]'>
                    जन्मतारीख
                  </Label>
                  <Input
                    id='groomDOB'
                    name='groomDOB'
                    type='date'
                    onChange={(e) => handleDOBChange('groom', e.target.value)}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                  
                </div>

                <div>
                  <Label htmlFor='groomAadhaar' className='text-[#7a1e4f]'>
                    आधार क्रमांक
                  </Label>
                  <Input
                    id='groomAadhaar'
                    name='groomAadhaar'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='groomMaritalStatus'
                    className='text-[#7a1e4f]'
                  >
                    वैवाहिक स्थिती
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('groomMaritalStatus', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select marital status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='अविवाहित'>अविवाहित</SelectItem>
                      <SelectItem value='विवाहित'>विवाहित</SelectItem>
                      <SelectItem value='विभक्त'>विभक्त</SelectItem>
                      <SelectItem value='वैधव्य'>वैधव्य</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='groomOccupation' className='text-[#7a1e4f]'>
                    व्यवसाय
                  </Label>
                  <Input
                    id='groomOccupation'
                    name='groomOccupation'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Enter occupation'
                  />
                </div>

                <div>
                  <Label htmlFor='groomReligion' className='text-[#7a1e4f]'>
                    धर्म / राष्ट्रीयत्व
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('groomReligion', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select religion' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='हिंदू'>हिंदू</SelectItem>
                      <SelectItem value='मुस्लिम'>मुस्लिम</SelectItem>
                      <SelectItem value='ख्रिश्चन'>ख्रिश्चन</SelectItem>
                      <SelectItem value='शीख'>शीख</SelectItem>
                      <SelectItem value='जैन'>जैन</SelectItem>
                      <SelectItem value='बौद्ध'>बौद्ध</SelectItem>
                      <SelectItem value='इतर'>इतर</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='md:col-span-2'>
                  <Label
                    htmlFor='groomPermanentAddress'
                    className='text-[#7a1e4f]'
                  >
                    कायमचा पत्ता
                  </Label>
                  <Textarea
                    id='groomPermanentAddress'
                    name='groomPermanentAddress'
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('applicant')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Applicant
              </Button>
              <Button
                onClick={() => setStep('bride')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Bride Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Bride Details */}
        {step === 'bride' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <User className='h-6 w-6' />
                वधूची माहिती
              </CardTitle>
              <CardDescription>Bride information</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='brideName' className='text-[#7a1e4f]'>
                    पूर्ण नाव
                  </Label>
                  <Input
                    id='brideName'
                    name='brideName'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='brideDOB' className='text-[#7a1e4f]'>
                    जन्मतारीख
                  </Label>
                  <Input
                    id='brideDOB'
                    name='brideDOB'
                    type='date'
                    onChange={(e) => handleDOBChange('bride', e.target.value)}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='brideAadhaar' className='text-[#7a1e4f]'>
                    आधार क्रमांक
                  </Label>
                  <Input
                    id='brideAadhaar'
                    name='brideAadhaar'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label
                    htmlFor='brideMaritalStatus'
                    className='text-[#7a1e4f]'
                  >
                    वैवाहिक स्थिती
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('brideMaritalStatus', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select marital status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='अविवाहित'>अविवाहित</SelectItem>
                      <SelectItem value='विवाहित'>विवाहित</SelectItem>
                      <SelectItem value='विभक्त'>विभक्त</SelectItem>
                      <SelectItem value='वैधव्य'>वैधव्य</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='brideOccupation' className='text-[#7a1e4f]'>
                    व्यवसाय
                  </Label>
                  <Input
                    id='brideOccupation'
                    name='brideOccupation'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Enter occupation'
                  />
                </div>

                <div>
                  <Label htmlFor='brideReligion' className='text-[#7a1e4f]'>
                    धर्म / राष्ट्रीयत्व
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('brideReligion', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select religion' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='हिंदू'>हिंदू</SelectItem>
                      <SelectItem value='मुस्लिम'>मुस्लिम</SelectItem>
                      <SelectItem value='ख्रिश्चन'>ख्रिश्चन</SelectItem>
                      <SelectItem value='शीख'>शीख</SelectItem>
                      <SelectItem value='जैन'>जैन</SelectItem>
                      <SelectItem value='बौद्ध'>बौद्ध</SelectItem>
                      <SelectItem value='इतर'>इतर</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='md:col-span-2'>
                  <Label
                    htmlFor='bridePermanentAddress'
                    className='text-[#7a1e4f]'
                  >
                    कायमचा पत्ता
                  </Label>
                  <Textarea
                    id='bridePermanentAddress'
                    name='bridePermanentAddress'
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('groom')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Groom
              </Button>
              <Button
                onClick={() => setStep('marriage')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Marriage Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Marriage Details */}
        {step === 'marriage' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <Heart className='h-6 w-6' />
                विवाह तपशील
              </CardTitle>
              <CardDescription>Marriage ceremony details</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='marriageDate' className='text-[#7a1e4f]'>
                    विवाह तारीख
                  </Label>
                  <Input
                    id='marriageDate'
                    name='marriageDate'
                    type='date'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='marriagePlace' className='text-[#7a1e4f]'>
                    विवाह ठिकाण
                  </Label>
                  <Input
                    id='marriagePlace'
                    name='marriagePlace'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Enter marriage venue'
                  />
                </div>

                <div>
                  <Label htmlFor='marriageType' className='text-[#7a1e4f]'>
                    विवाह प्रकार
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('marriageType', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select marriage type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='हिंदू'>हिंदू विवाह</SelectItem>
                      <SelectItem value='मुस्लिम'>मुस्लिम विवाह</SelectItem>
                      <SelectItem value='विशेष विवाह कायदा'>
                        विशेष विवाह कायदा
                      </SelectItem>
                      <SelectItem value='ख्रिश्चन'>ख्रिश्चन विवाह</SelectItem>
                      <SelectItem value='पारशी'>पारशी विवाह</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor='registrationOffice'
                    className='text-[#7a1e4f]'
                  >
                    नोंदणी कार्यालय
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('registrationOffice', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select registration office' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='नागपूर नगर परिषद'>
                        नागपूर नगर परिषद
                      </SelectItem>
                      <SelectItem value='शेगांव नगर परिषद'>
                        शेगांव नगर परिषद
                      </SelectItem>
                      <SelectItem value='मुंबई महापालिका'>
                        मुंबई महापालिका
                      </SelectItem>
                      <SelectItem value='पुणे महापालिका'>
                        पुणे महापालिका
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('bride')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Bride
              </Button>
              <Button
                onClick={() => setStep('witnesses')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Witness Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 6: Witness Details */}
        {step === 'witnesses' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <Users className='h-6 w-6' />
                साक्षीदार माहिती (किमान 3)
              </CardTitle>
              <CardDescription>
                Witness information (Minimum 3 witnesses required)
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                {formData.witnesses.map((witness, index) => (
                  <div
                    key={index}
                    className='rounded-lg border border-[#b01d4f]/20 p-4'
                  >
                    <h4 className='mb-4 font-medium text-[#7a1e4f]'>
                      साक्षीदार {index + 1}
                    </h4>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <Label
                          htmlFor={`witnessName${index}`}
                          className='text-[#7a1e4f]'
                        >
                          साक्षीदाराचे नाव
                        </Label>
                        <Input
                          id={`witnessName${index}`}
                          onChange={(e) =>
                            handleWitnessChange(index, 'name', e.target.value)
                          }
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={`witnessRelation${index}`}
                          className='text-[#7a1e4f]'
                        >
                          नाते
                        </Label>
                        <Input
                          id={`witnessRelation${index}`}
                          onChange={(e) =>
                            handleWitnessChange(
                              index,
                              'relation',
                              e.target.value
                            )
                          }
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                          placeholder='मित्र, नातेवाईक, इ.'
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={`witnessAadhaar${index}`}
                          className='text-[#7a1e4f]'
                        >
                          आधार क्रमांक
                        </Label>
                        <Input
                          id={`witnessAadhaar${index}`}
                          onChange={(e) =>
                            handleWitnessChange(
                              index,
                              'aadhaar',
                              e.target.value
                            )
                          }
                          className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={`witnessAddress${index}`}
                          className='text-[#7a1e4f]'
                        >
                          पत्ता
                        </Label>
                        <Textarea
                          id={`witnessAddress${index}`}
                          onChange={(e) =>
                            handleWitnessChange(
                              index,
                              'address',
                              e.target.value
                            )
                          }
                          className='mt-1 min-h-[60px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                  <p className='text-sm text-yellow-700'>
                    📝 <strong>Note:</strong> Minimum 3 witnesses are required
                    for marriage registration. Witnesses must be adults and
                    present during the marriage ceremony.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('marriage')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Marriage
              </Button>
              <Button
                onClick={() => setStep('documents')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Documents
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 7: Documents Upload */}
        {step === 'documents' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <FileText className='h-6 w-6' />
                कागदपत्रे (Uploads)
              </CardTitle>
              <CardDescription>
                Required documents for marriage certificate application
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.groomAadhaar ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          वर व वधूचे आधार
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - Groom & Bride Aadhaar
                        </p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleFileUpload('groomAadhaar')}
                        className={
                          uploadedFiles.groomAadhaar
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.groomAadhaar ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.ageProofGroom ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          वयाचा पुरावा
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - जन्म प्रमाणपत्र / शाळेचा दाखला
                        </p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleFileUpload('ageProofGroom')}
                        className={
                          uploadedFiles.ageProofGroom
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.ageProofGroom ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.addressProof ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          पत्त्याचा पुरावा
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - For both groom and bride
                        </p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleFileUpload('addressProof')}
                        className={
                          uploadedFiles.addressProof
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.addressProof ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.marriagePhotos ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          विवाह फोटो
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - Marriage ceremony photos
                        </p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleFileUpload('marriagePhotos')}
                        className={
                          uploadedFiles.marriagePhotos
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.marriagePhotos ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.divorceDeathCertificate ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          घटस्फोट आदेश / मृत्यू प्रमाणपत्र
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          If applicable - For previously married
                        </p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() =>
                          handleFileUpload('divorceDeathCertificate')
                        }
                        className={
                          uploadedFiles.divorceDeathCertificate
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.divorceDeathCertificate
                          ? 'Uploaded'
                          : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.witnessIdProof ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          साक्षीदारांचे ओळखपत्र
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - For all witnesses
                        </p>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleFileUpload('witnessIdProof')}
                        className={
                          uploadedFiles.witnessIdProof
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.witnessIdProof ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                  <p className='text-sm text-yellow-700'>
                    📝 <strong>Note:</strong> Required documents must be
                    uploaded for application processing. All documents should be
                    clear and legible.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('witnesses')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Witnesses
              </Button>
              <Button
                onClick={() => setStep('request')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Certificate Request
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 8: Request Details */}
        {step === 'request' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <FileCheck className='h-6 w-6' />
                प्रमाणपत्र तपशील
              </CardTitle>
              <CardDescription>Certificate request details</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='certificateType' className='text-[#7a1e4f]'>
                      प्रमाणपत्र प्रकार
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange('certificateType', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                        <SelectValue placeholder='Select certificate type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='नवीन'>नवीन (New)</SelectItem>
                        <SelectItem value='Duplicate'>Duplicate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='numberOfCopies' className='text-[#7a1e4f]'>
                      प्रतींची संख्या
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange('numberOfCopies', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                        <SelectValue placeholder='Select number of copies' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>1 Copy</SelectItem>
                        <SelectItem value='2'>2 Copies</SelectItem>
                        <SelectItem value='3'>3 Copies</SelectItem>
                        <SelectItem value='4'>4 Copies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='language' className='text-[#7a1e4f]'>
                      भाषा
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange('language', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                        <SelectValue placeholder='Select language' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='मराठी'>मराठी</SelectItem>
                        <SelectItem value='इंग्रजी'>English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='md:col-span-2'>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='urgentService'
                        checked={formData.urgentService}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            urgentService: checked as boolean
                          }))
                        }
                        className='border-[#b01d4f] text-[#b01d4f] data-[state=checked]:bg-[#b01d4f]'
                      />
                      <label
                        htmlFor='urgentService'
                        className='text-sm leading-none font-medium text-[#7a1e4f]'
                      >
                        तातडी सेवा (असल्यास)
                      </label>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-4'>
                  <h4 className='mb-4 font-medium text-[#7a1e4f]'>
                    Fee Structure
                  </h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-[#7a1e4f]'>Application Fee</span>
                      <span>{formatCurrency(fees.applicationFee)}</span>
                    </div>
                    {formData.urgentService && (
                      <div className='flex justify-between'>
                        <span className='text-[#7a1e4f]'>
                          Urgent Service Fee
                        </span>
                        <span>{formatCurrency(fees.urgentFee)}</span>
                      </div>
                    )}
                    {formData.numberOfCopies > 1 && (
                      <div className='flex justify-between'>
                        <span className='text-[#7a1e4f]'>
                          Additional Copies ({formData.numberOfCopies - 1} ×{' '}
                          {formatCurrency(fees.copyFee)})
                        </span>
                        <span>
                          {formatCurrency(
                            (formData.numberOfCopies - 1) * fees.copyFee
                          )}
                        </span>
                      </div>
                    )}
                    <div className='flex justify-between border-t border-[#b01d4f]/20 pt-2'>
                      <span className='font-semibold text-[#7a1e4f]'>
                        Total Amount
                      </span>
                      <span className='font-bold text-[#b01d4f]'>
                        {formatCurrency(fees.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor='paymentMethod' className='text-[#7a1e4f]'>
                    Payment Method
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('paymentMethod', value)
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select payment method' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='UPI'>UPI</SelectItem>
                      <SelectItem value='NetBanking'>Net Banking</SelectItem>
                      <SelectItem value='CreditCard'>Credit Card</SelectItem>
                      <SelectItem value='DebitCard'>Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>{renderPaymentForm()}</div>

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
                      className='border-[#b01d4f] text-[#b01d4f] data-[state=checked]:bg-[#b01d4f]'
                    />
                    <label
                      htmlFor='emailNotification'
                      className='text-sm leading-none font-medium text-[#7a1e4f]'
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
                      className='border-[#b01d4f] text-[#b01d4f] data-[state=checked]:bg-[#b01d4f]'
                    />
                    <label
                      htmlFor='smsNotification'
                      className='text-sm leading-none font-medium text-[#7a1e4f]'
                    >
                      SMS Notification (OTP and application status)
                    </label>
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
                Back to Documents
              </Button>
              <Button
                onClick={() => setStep('declaration')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Declaration
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 9: Declaration */}
        {step === 'declaration' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <CheckCircle className='h-6 w-6' />
                जाहीरनामा व सबमिशन
              </CardTitle>
              <CardDescription>
                Declaration and application submission
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-6'>
                  <h4 className='mb-4 font-medium text-[#7a1e4f]'>
                    महत्वाची माहिती
                  </h4>
                  <div className='space-y-3 text-sm text-[#7a1e4f]/80'>
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
                      <span>फक्त आवश्यक माहिती भरली आहे</span>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <h4 className='mb-2 font-medium text-green-800'>
                    Application Summary
                  </h4>
                  <div className='space-y-2 text-sm text-green-700'>
                    <div className='flex justify-between'>
                      <span>Groom Name:</span>
                      <span className='font-medium'>
                        {formData.groomName || 'Not provided'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Bride Name:</span>
                      <span className='font-medium'>
                        {formData.brideName || 'Not provided'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Marriage Date:</span>
                      <span className='font-medium'>
                        {formData.marriageDate || 'Not provided'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Application Fee:</span>
                      <span className='font-medium'>
                        {formatCurrency(fees.total)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Processing Time:</span>
                      <span className='font-medium'>
                        {formData.urgentService
                          ? '2-3 Working Days'
                          : '5-7 Working Days'}
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
                      className='mt-1 border-[#b01d4f] text-[#b01d4f] data-[state=checked]:bg-[#b01d4f]'
                    />
                    <div>
                      <label
                        htmlFor='declaration'
                        className='text-sm leading-none font-medium text-[#7a1e4f]'
                      >
                        माहिती खरी असल्याचा जाहीरनामा
                      </label>
                      <p className='mt-1 text-sm text-[#7a1e4f]/70'>
                        I hereby declare that all the information provided above
                        is true and correct to the best of my knowledge.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='digitalSignature'
                      className='border-[#b01d4f] text-[#b01d4f] data-[state=checked]:bg-[#b01d4f]'
                    />
                    <label
                      htmlFor='digitalSignature'
                      className='text-sm leading-none font-medium text-[#7a1e4f]'
                    >
                      डिजिटल स्वाक्षरी
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('request')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Request
              </Button>
              <Button
                onClick={handleSubmitApplication}
                disabled={loading || !formData.declaration}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <CheckCircle className='mr-2 h-4 w-4' />
                    Submit Application & Pay {formatCurrency(fees.total)}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 10: Confirmation */}
        {step === 'confirmation' && (
          <Card className='mx-auto max-w-4xl border-[#7a1e4f]/20'>
            <CardHeader className='border-b border-[#7a1e4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7a1e4f]'>
                <CheckCircle className='h-8 w-8' />
                Application Submitted Successfully!
              </CardTitle>
              <CardDescription>
                Your marriage certificate application has been submitted and is
                being processed
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg border border-[#7a1e4f]/20 bg-[#7a1e4f]/5 p-6 text-center'>
                  <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#7a1e4f]/10'>
                    <Heart className='h-12 w-12 text-[#7a1e4f]' />
                  </div>
                  <h3 className='mb-2 text-2xl font-bold text-[#7a1e4f]'>
                    Marriage Certificate Application Confirmed
                  </h3>
                  <p className='text-[#7a1e4f]/80'>
                    Application ID: MC-APP-{Date.now().toString().slice(-10)}
                  </p>
                  <p className='mt-4 text-lg text-[#b01d4f]'>
                    Status: <span className='font-bold'>Under Review</span>
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Groom Name</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.groomName || 'Not provided'}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Bride Name</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.brideName || 'Not provided'}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Marriage Date</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.marriageDate || 'Not provided'}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Application Type</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.certificateType}
                    </p>
                  </div>
                </div>

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
                      Document verification by Marriage Registration Office
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
                    className='flex-1 border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    <Download className='mr-2 h-4 w-4' />
                    Download Acknowledgement
                  </Button>
                  <Button
                    onClick={() => {
                      setStep('search');
                      setMarriageData(null);
                      setAadhaarNumber('');
                      setFormData({
                        applicantName: '',
                        applicantRelation: 'पती',
                        mobile: '',
                        email: '',
                        aadhaar: '',
                        address: '',
                        idProofType: 'Aadhaar',
                        groomName: '',
                        groomDOB: '',
                        groomAge: '',
                        groomAadhaar: '',
                        groomMaritalStatus: 'अविवाहित',
                        groomOccupation: '',
                        groomReligion: 'हिंदू',
                        groomPermanentAddress: '',
                        brideName: '',
                        brideDOB: '',
                        brideAge: '',
                        brideAadhaar: '',
                        brideMaritalStatus: 'अविवाहित',
                        brideOccupation: '',
                        brideReligion: 'हिंदू',
                        bridePermanentAddress: '',
                        marriageDate: '',
                        marriagePlace: '',
                        marriageType: 'हिंदू',
                        registrationOffice: 'नागपूर नगर परिषद',
                        witnesses: [
                          { name: '', relation: '', aadhaar: '', address: '' },
                          { name: '', relation: '', aadhaar: '', address: '' },
                          { name: '', relation: '', aadhaar: '', address: '' }
                        ],
                        certificateType: 'नवीन',
                        numberOfCopies: 1,
                        language: 'मराठी',
                        urgentService: false,
                        declaration: false,
                        paymentMethod: 'UPI',
                        upiId: '',
                        emailNotification: true,
                        smsNotification: true
                      });
                      setUploadedFiles({
                        groomAadhaar: false,
                        brideAadhaar: false,
                        ageProofGroom: false,
                        ageProofBride: false,
                        addressProof: false,
                        marriagePhotos: false,
                        divorceDeathCertificate: false,
                        witnessIdProof: false
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
      </div>
    </main>
  );
}

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
  Baby,
  Users,
  FileCheck,
  Calendar,
  Clock,
  MapPin,
  Download,
  Skull,
  Heart
} from 'lucide-react';

interface DeathCertificateData {
  id: string;
  // Applicant Details
  applicantName: string;
  relationToDeceased: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  idProofType: string;
  
  // Deceased Details
  deceasedName: string;
  gender: string;
  dateOfDeath: string;
  timeOfDeath: string;
  ageAtDeath: number;
  placeOfDeath: string;
  deathPlaceName: string;
  cityTaluka: string;
  district: string;
  state: string;
  causeOfDeath: string;
  deathRegistrationNo: string;
  
  // Family Details
  fatherName: string;
  motherName: string;
  spouseName: string;
  nationality: string;
  permanentAddress: string;
  
  // Request Details
  certificateType: string;
  numberOfCopies: number;
  language: string;
  purpose: string;
  urgentService: boolean;
}

const dummyDeathRecords: DeathCertificateData[] = [
  {
    id: '1',
    applicantName: 'राजेश कुमार शर्मा',
    relationToDeceased: 'मुलगा',
    mobile: '9876543210',
    email: 'rajesh.sharma@example.com',
    aadhaar: '1234-5678-9012',
    address: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    idProofType: 'Aadhaar',
    
    deceasedName: 'रामकुमार शर्मा',
    gender: 'पुरुष',
    dateOfDeath: '2023-11-15',
    timeOfDeath: '14:30',
    ageAtDeath: 75,
    placeOfDeath: 'रुग्णालय',
    deathPlaceName: 'सिव्हिल हॉस्पिटल',
    cityTaluka: 'Shegaon',
    district: 'Buldhana',
    state: 'Maharashtra',
    causeOfDeath: 'Heart Failure',
    deathRegistrationNo: 'DR-2023-0456',
    
    fatherName: 'कृष्ण कुमार शर्मा',
    motherName: 'सरला देवी',
    spouseName: 'गीता देवी',
    nationality: 'भारतीय',
    permanentAddress: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    
    certificateType: 'नवीन',
    numberOfCopies: 1,
    language: 'मराठी',
    purpose: 'बँक',
    urgentService: false
  },
  {
    id: '2',
    applicantName: 'सुनिता देशपांडे',
    relationToDeceased: 'बहीण',
    mobile: '8765432109',
    email: 'sunita.d@example.com',
    aadhaar: '2345-6789-0123',
    address: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    idProofType: 'Aadhaar',
    
    deceasedName: 'राहुल देशपांडे',
    gender: 'पुरुष',
    dateOfDeath: '2022-08-20',
    timeOfDeath: '10:45',
    ageAtDeath: 68,
    placeOfDeath: 'घर',
    deathPlaceName: 'घर',
    cityTaluka: 'Shegaon',
    district: 'Buldhana',
    state: 'Maharashtra',
    causeOfDeath: 'Natural Causes',
    deathRegistrationNo: 'DR-2022-0789',
    
    fatherName: 'विजय देशपांडे',
    motherName: 'लता देशपांडे',
    spouseName: 'मीना देशपांडे',
    nationality: 'भारतीय',
    permanentAddress: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    
    certificateType: 'Duplicate',
    numberOfCopies: 2,
    language: 'इंग्रजी',
    purpose: 'विमा',
    urgentService: true
  },
  {
    id: '3',
    applicantName: 'अजय पाटील',
    relationToDeceased: 'भाऊ',
    mobile: '7654321098',
    email: 'ajay.patil@example.com',
    aadhaar: '3456-7890-1234',
    address: 'गाव: शिंदेवाडी, ता: शेगाव, जि: बुलढाणा',
    idProofType: 'Voter ID',
    
    deceasedName: 'संजय पाटील',
    gender: 'पुरुष',
    dateOfDeath: '2024-01-10',
    timeOfDeath: '18:15',
    ageAtDeath: 42,
    placeOfDeath: 'रुग्णालय',
    deathPlaceName: 'मेडिकेअर हॉस्पिटल',
    cityTaluka: 'Shegaon',
    district: 'Buldhana',
    state: 'Maharashtra',
    causeOfDeath: 'Accident',
    deathRegistrationNo: 'DR-2024-1234',
    
    fatherName: 'बाळासाहेब पाटील',
    motherName: 'सुशीला पाटील',
    spouseName: 'प्रिया पाटील',
    nationality: 'भारतीय',
    permanentAddress: 'गाव: शिंदेवाडी, ता: शेगाव, जि: बुलढाणा',
    
    certificateType: 'नवीन',
    numberOfCopies: 1,
    language: 'मराठी',
    purpose: 'वारसा',
    urgentService: false
  }
];

interface UploadedDocuments {
  hospitalDeathReport: boolean;
  doctorCertificate: boolean;
  applicantIdProof: boolean;
  deceasedAadhaar: boolean;
  cremationCertificate: boolean;
  affidavit: boolean;
  oldCertificate: boolean;
}

export default function DeathCertificatePage() {
  const [step, setStep] = useState<
    'search' | 'applicant' | 'deceased' | 'family' | 'documents' | 'request' | 'declaration' | 'confirmation'
  >('search');
  const [loading, setLoading] = useState(false);
  const [deathData, setDeathData] = useState<DeathCertificateData | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [formData, setFormData] = useState({
    // Applicant Details
    applicantName: '',
    relationToDeceased: '',
    mobile: '',
    email: '',
    aadhaar: '',
    address: '',
    idProofType: 'Aadhaar',
    
    // Deceased Details
    deceasedName: '',
    gender: 'पुरुष',
    dateOfDeath: '',
    timeOfDeath: '',
    ageAtDeath: '',
    placeOfDeath: 'रुग्णालय',
    deathPlaceName: '',
    // Constant values
    cityTaluka: 'Shegaon', // Constant
    district: 'Buldhana', // Constant
    state: 'Maharashtra', // Constant
    causeOfDeath: '',
    deathRegistrationNo: '',
    
    // Family Details
    fatherName: '',
    motherName: '',
    spouseName: '',
    nationality: 'भारतीय',
    permanentAddress: '',
    
    // Request Details
    certificateType: 'नवीन',
    numberOfCopies: 1,
    language: 'मराठी',
    purpose: 'बँक',
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
    hospitalDeathReport: false,
    doctorCertificate: false,
    applicantIdProof: false,
    deceasedAadhaar: false,
    cremationCertificate: false,
    affidavit: false,
    oldCertificate: false
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
    applicationFee: 100,
    urgentFee: 200,
    copyFee: 50,
    total: 100
  });

  useEffect(() => {
    // Calculate fees when form data changes
    let total = fees.applicationFee;
    if (formData.urgentService) total += fees.urgentFee;
    if (formData.numberOfCopies > 1) total += (formData.numberOfCopies - 1) * fees.copyFee;
    setFees(prev => ({ ...prev, total }));
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
      alert('Too many search attempts. Please wait 5 minutes before trying again.');
      return;
    }

    setLoading(true);
    setSearchAttempts(prev => prev + 1);

    // Simulate API call
    setTimeout(() => {
      const cleanAadhaar = aadhaarNumber.replace(/-/g, '').trim();

      // For demo purposes, show only if full or partial match of first 4 digits
      const foundRecord = dummyDeathRecords.find((record) => {
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

        setDeathData(maskedRecord);
        setFormData({
          applicantName: foundRecord.applicantName,
          relationToDeceased: foundRecord.relationToDeceased,
          mobile: foundRecord.mobile,
          email: foundRecord.email,
          aadhaar: foundRecord.aadhaar,
          address: foundRecord.address,
          idProofType: foundRecord.idProofType,
          
          deceasedName: foundRecord.deceasedName,
          gender: foundRecord.gender,
          dateOfDeath: foundRecord.dateOfDeath,
          timeOfDeath: foundRecord.timeOfDeath,
          ageAtDeath: foundRecord.ageAtDeath.toString(),
          placeOfDeath: foundRecord.placeOfDeath,
          deathPlaceName: foundRecord.deathPlaceName,
          cityTaluka: 'Shegaon', // Constant
          district: 'Buldhana', // Constant
          state: 'Maharashtra', // Constant
          causeOfDeath: foundRecord.causeOfDeath,
          deathRegistrationNo: foundRecord.deathRegistrationNo,
          
          fatherName: foundRecord.fatherName,
          motherName: foundRecord.motherName,
          spouseName: foundRecord.spouseName,
          nationality: foundRecord.nationality,
          permanentAddress: foundRecord.permanentAddress,
          
          certificateType: foundRecord.certificateType,
          numberOfCopies: foundRecord.numberOfCopies,
          language: foundRecord.language,
          purpose: foundRecord.purpose,
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

  const handleFileUpload = (type: keyof UploadedDocuments) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));
    console.log(`${type} uploaded successfully`);
  };

  const handleDownloadCertificate = () => {
    // Create certificate data
    const certificateData = {
      certificateNumber: `DC-${Date.now().toString().slice(-10)}`,
      registrationNumber: `DR-${Date.now().toString().slice(-8)}`,
      issueDate: new Date().toLocaleDateString('en-IN'),
      issueTime: new Date().toLocaleTimeString('en-IN'),
      deceasedName: formData.deceasedName,
      gender: formData.gender,
      dateOfDeath: formData.dateOfDeath,
      timeOfDeath: formData.timeOfDeath || 'Not specified',
      ageAtDeath: formData.ageAtDeath,
      placeOfDeath: formData.placeOfDeath,
      deathPlaceName: formData.deathPlaceName,
      cityTaluka: formData.cityTaluka,
      district: formData.district,
      state: formData.state,
      causeOfDeath: formData.causeOfDeath,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      spouseName: formData.spouseName,
      nationality: formData.nationality,
      permanentAddress: formData.permanentAddress,
      applicantName: formData.applicantName,
      relation: formData.relationToDeceased,
      certificateType: formData.certificateType,
      language: formData.language,
      purpose: formData.purpose,
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
            background: #b01d4f;
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
          .death-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
            border-left: 4px solid #6c757d;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h1>मृत्यु प्रमाणपत्र</h1>
          <h2>Death Certificate</h2>
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
        
        <!-- Deceased Details -->
        <div class="section-title">DECEASED PERSON DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Deceased Name:</span>
            <span class="value">${certificateData.deceasedName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Gender:</span>
            <span class="value">${certificateData.gender}</span>
          </div>
          <div class="detail-item">
            <span class="label">Date of Death:</span>
            <span class="value">${certificateData.dateOfDeath}</span>
          </div>
          <div class="detail-item">
            <span class="label">Time of Death:</span>
            <span class="value">${certificateData.timeOfDeath}</span>
          </div>
          <div class="detail-item">
            <span class="label">Age at Death:</span>
            <span class="value">${certificateData.ageAtDeath} years</span>
          </div>
        </div>
        
        <!-- Death Information -->
        <div class="death-info">
          <div style="margin-bottom: 5px;"><strong>Cause of Death:</strong> ${certificateData.causeOfDeath}</div>
          <div><strong>Place of Death:</strong> ${certificateData.deathPlaceName} (${certificateData.placeOfDeath})</div>
        </div>
        
        <!-- Death Location -->
        <div class="section-title">DEATH LOCATION</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">City/Taluka:</span>
            <span class="value">${certificateData.cityTaluka}</span>
          </div>
          <div class="detail-item">
            <span class="label">District:</span>
            <span class="value">${certificateData.district}</span>
          </div>
          <div class="detail-item">
            <span class="label">State:</span>
            <span class="value">${certificateData.state}</span>
          </div>
        </div>
        
        <!-- Family Details -->
        <div class="section-title">FAMILY DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Father's Name:</span>
            <span class="value">${certificateData.fatherName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Mother's Name:</span>
            <span class="value">${certificateData.motherName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Spouse Name:</span>
            <span class="value">${certificateData.spouseName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Nationality:</span>
            <span class="value">${certificateData.nationality}</span>
          </div>
        </div>
        <div class="address">
          <span class="label">Permanent Address:</span><br>
          <span class="value">${certificateData.permanentAddress}</span>
        </div>
        
        <!-- Application Details -->
        <div class="section-title">APPLICATION DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Applicant Name:</span>
            <span class="value">${certificateData.applicantName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Relation to Deceased:</span>
            <span class="value">${certificateData.relation}</span>
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
            <span class="label">Purpose:</span>
            <span class="value">${certificateData.purpose}</span>
          </div>
          <div class="detail-item">
            <span class="label">Number of Copies:</span>
            <span class="value">${certificateData.numberOfCopies}</span>
          </div>
        </div>
        
        <!-- Certificate Validation -->
        <div class="certificate-section">
          <div>Official Death Certificate</div>
          <div class="certificate-number">${certificateData.certificateNumber}</div>
          <div class="valid-badge">OFFICIALLY REGISTERED</div>
        </div>
        
        <!-- Stamp Section -->
        <div class="stamp">
          <div style="font-weight: bold;">Authorized Signature</div>
          <div>Nagar Parishad Death Registration Office</div>
          <div>${certificateData.cityTaluka}, ${certificateData.district}, ${certificateData.state}</div>
        </div>
        
        <!-- Notes -->
        <div class="notes">
          <div class="section-title">IMPORTANT NOTES</div>
          <div class="note-item">✓ This is a computer-generated certificate, valid without signature.</div>
          <div class="note-item">✓ Please preserve this certificate for all legal purposes (bank, insurance, inheritance).</div>
          <div class="note-item">✓ For any queries or discrepancies, contact Nagar Parishad office within 30 days.</div>
          <div class="note-item">✓ This certificate is essential for settlement of bank accounts, insurance claims, and property transfer.</div>
          <div class="note-item">✓ In case of loss, apply for a duplicate certificate with the same certificate number.</div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div>Issued by Nagar Parishad Death Registration Department</div>
          <div style="font-weight: bold; margin: 10px 0;">Government of Maharashtra</div>
          <div style="margin-top: 10px; font-size: 12px;">
            Customer Care: 1800-XXX-XXXX | Email: deathcert@nagarpalika.gov.in<br>
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
            pdf.save(`Death_Certificate_${certificateData.certificateNumber}.pdf`);

            // Safe cleanup
            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }

            alert(
              `Certificate downloaded successfully!\nFile: Death_Certificate_${certificateData.certificateNumber}.pdf`
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
            <Skull className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              मृत्यु प्रमाणपत्र अर्ज
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#b01d4f]/10 p-3'>
              <FileCheck className='h-8 w-8 text-[#b01d4f]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद मृत्यु प्रमाणपत्र पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Death Certificate Portal
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
          {['search', 'applicant', 'deceased', 'family', 'documents', 'request', 'declaration'].map((stepName, index) => (
            <div key={stepName} className='flex items-center'>
              <div
                className={`flex items-center ${step === stepName ? 'text-[#b01d4f]' : index < ['search', 'applicant', 'deceased', 'family', 'documents', 'request', 'declaration'].indexOf(step) ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step === stepName ? 'bg-[#b01d4f]/10' : index < ['search', 'applicant', 'deceased', 'family', 'documents', 'request', 'declaration'].indexOf(step) ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
                >
                  {index === 0 && <Search className='h-4 w-4' />}
                  {index === 1 && <User className='h-4 w-4' />}
                  {index === 2 && <Skull className='h-4 w-4' />}
                  {index === 3 && <Users className='h-4 w-4' />}
                  {index === 4 && <FileText className='h-4 w-4' />}
                  {index === 5 && <FileCheck className='h-4 w-4' />}
                  {index === 6 && <CheckCircle className='h-4 w-4' />}
                </div>
                <span className='ml-2 hidden text-sm font-medium md:block'>
                  {index === 0 && 'शोध'}
                  {index === 1 && 'अर्जदार'}
                  {index === 2 && 'मृत व्यक्ती'}
                  {index === 3 && 'कुटुंब'}
                  {index === 4 && 'कागद'}
                  {index === 5 && 'अर्ज'}
                  {index === 6 && 'जाहीरनामा'}
                </span>
              </div>
              {index < 6 && (
                <div
                  className={`mx-2 h-1 w-8 ${index < ['search', 'applicant', 'deceased', 'family', 'documents', 'request', 'declaration'].indexOf(step) ? 'bg-[#7a1e4f]' : 'bg-gray-300'}`}
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
                Search Death Records
              </CardTitle>
              <CardDescription>
                Enter Aadhaar number to search for death records
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
                    • Try first 4 digits of demo Aadhaar numbers • Personal data is masked for security
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
        {step === 'applicant' && deathData && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <User className='h-6 w-6' />
                अर्ज करणाऱ्याची माहिती
              </CardTitle>
              <CardDescription>
                Family member applying for the death certificate
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='applicantName' className='text-[#7a1e4f]'>
                    अर्ज करणाऱ्याचे पूर्ण नाव
                  </Label>
                  <Input
                    id='applicantName'
                    name='applicantName'
                    value={formData.applicantName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='relationToDeceased' className='text-[#7a1e4f]'>
                    मृत व्यक्तीशी नाते
                  </Label>
                  <Select
                    value={formData.relationToDeceased}
                    onValueChange={(value) => handleSelectChange('relationToDeceased', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select relation' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='पती'>पती</SelectItem>
                      <SelectItem value='पत्नी'>पत्नी</SelectItem>
                      <SelectItem value='मुलगा'>मुलगा</SelectItem>
                      <SelectItem value='मुलगी'>मुलगी</SelectItem>
                      <SelectItem value='वडील'>वडील</SelectItem>
                      <SelectItem value='आई'>आई</SelectItem>
                      <SelectItem value='भाऊ'>भाऊ</SelectItem>
                      <SelectItem value='बहीण'>बहीण</SelectItem>
                      <SelectItem value='नातेवाईक'>नातेवाईक</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='mobile' className='text-[#7a1e4f]'>
                    मोबाइल नंबर
                  </Label>
                  <div className='mt-1 flex gap-2'>
                    <Input
                      id='mobile'
                      name='mobile'
                      value={formData.mobile}
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
                    ईमेल आयडी (Optional)
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
                    ओळख पुरावा प्रकार
                  </Label>
                  <Select
                    value={formData.idProofType}
                    onValueChange={(value) => handleSelectChange('idProofType', value)}
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
                    value={formData.address}
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
                onClick={() => setStep('deceased')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Deceased Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Deceased Details */}
        {step === 'deceased' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <Skull className='h-6 w-6' />
                मृत व्यक्तीची माहिती
              </CardTitle>
              <CardDescription>
                Deceased person information
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='deceasedName' className='text-[#7a1e4f]'>
                    मृत व्यक्तीचे पूर्ण नाव
                  </Label>
                  <Input
                    id='deceasedName'
                    name='deceasedName'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Enter deceased person full name'
                  />
                </div>

                <div>
                  <Label className='text-[#7a1e4f]'>लिंग</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                    className='mt-1 flex gap-4'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='पुरुष' id='male' />
                      <Label htmlFor='male' className='text-[#7a1e4f]'>
                        पुरुष
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='स्त्री' id='female' />
                      <Label htmlFor='female' className='text-[#7a1e4f]'>
                        स्त्री
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='इतर' id='other' />
                      <Label htmlFor='other' className='text-[#7a1e4f]'>
                        इतर
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor='dateOfDeath' className='text-[#7a1e4f]'>
                    मृत्यू तारीख
                  </Label>
                  <Input
                    id='dateOfDeath'
                    name='dateOfDeath'
                    type='date'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='timeOfDeath' className='text-[#7a1e4f]'>
                    मृत्यू वेळ (Optional)
                  </Label>
                  <Input
                    id='timeOfDeath'
                    name='timeOfDeath'
                    type='time'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='ageAtDeath' className='text-[#7a1e4f]'>
                    वय (वर्षांमध्ये)
                  </Label>
                  <Input
                    id='ageAtDeath'
                    name='ageAtDeath'
                    type='number'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Age in years'
                  />
                </div>

                <div>
                  <Label htmlFor='placeOfDeath' className='text-[#7a1e4f]'>
                    मृत्यू ठिकाण प्रकार
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange('placeOfDeath', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select place of death' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='रुग्णालय'>रुग्णालय</SelectItem>
                      <SelectItem value='घर'>घर</SelectItem>
                      <SelectItem value='इतर'>इतर</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='deathPlaceName' className='text-[#7a1e4f]'>
                    हॉस्पिटल / गाव नाव
                  </Label>
                  <Input
                    id='deathPlaceName'
                    name='deathPlaceName'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Enter hospital or village name'
                  />
                </div>

                <div>
                  <Label htmlFor='causeOfDeath' className='text-[#7a1e4f]'>
                    मृत्यू कारण (Medical reason)
                  </Label>
                  <Input
                    id='causeOfDeath'
                    name='causeOfDeath'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Cause of death'
                  />
                </div>

                <div>
                  <Label htmlFor='deathRegistrationNo' className='text-[#7a1e4f]'>
                    मृत्यू नोंदणी क्रमांक (जर आधी नोंद असेल तर)
                  </Label>
                  <Input
                    id='deathRegistrationNo'
                    name='deathRegistrationNo'
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    placeholder='Death registration number if available'
                  />
                </div>

                {/* Constant Values - Display Only */}
                <div>
                  <Label htmlFor='cityTaluka' className='text-[#7a1e4f]'>
                    शहर / तालुका
                  </Label>
                  <Input
                    id='cityTaluka'
                    name='cityTaluka'
                    value={formData.cityTaluka}
                    readOnly
                    className='mt-1 bg-gray-100 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='district' className='text-[#7a1e4f]'>
                    जिल्हा
                  </Label>
                  <Input
                    id='district'
                    name='district'
                    value={formData.district}
                    readOnly
                    className='mt-1 bg-gray-100 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='state' className='text-[#7a1e4f]'>
                    राज्य
                  </Label>
                  <Input
                    id='state'
                    name='state'
                    value={formData.state}
                    readOnly
                    className='mt-1 bg-gray-100 border-[#b01d4f]/20 focus:border-[#b01d4f]'
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
                onClick={() => setStep('family')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Family Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Family Details */}
        {step === 'family' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <Users className='h-6 w-6' />
                कुटुंब माहिती
              </CardTitle>
              <CardDescription>
                Family information of the deceased
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='fatherName' className='text-[#7a1e4f]'>
                    वडिलांचे पूर्ण नाव
                  </Label>
                  <Input
                    id='fatherName'
                    name='fatherName'
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='motherName' className='text-[#7a1e4f]'>
                    आईचे पूर्ण नाव
                  </Label>
                  <Input
                    id='motherName'
                    name='motherName'
                    value={formData.motherName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='spouseName' className='text-[#7a1e4f]'>
                    पती / पत्नीचे नाव
                  </Label>
                  <Input
                    id='spouseName'
                    name='spouseName'
                    value={formData.spouseName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>

                <div>
                  <Label htmlFor='nationality' className='text-[#7a1e4f]'>
                    राष्ट्रीयता
                  </Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => handleSelectChange('nationality', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                      <SelectValue placeholder='Select nationality' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='भारतीय'>भारतीय</SelectItem>
                      <SelectItem value='Other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='md:col-span-2'>
                  <Label htmlFor='permanentAddress' className='text-[#7a1e4f]'>
                    मृत व्यक्तीचा कायमचा पत्ता
                  </Label>
                  <Textarea
                    id='permanentAddress'
                    name='permanentAddress'
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('deceased')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Deceased
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

        {/* Step 5: Documents Upload */}
        {step === 'documents' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <FileText className='h-6 w-6' />
                कागदपत्रे अपलोड
              </CardTitle>
              <CardDescription>
                Required documents for death certificate application
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.hospitalDeathReport ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Hospital Death Report
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - Government / Private
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.hospitalDeathReport ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('hospitalDeathReport')}
                        className={
                          uploadedFiles.hospitalDeathReport
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.hospitalDeathReport ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.doctorCertificate ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Doctor Certificate
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - Cause of death
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.doctorCertificate ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('doctorCertificate')}
                        className={
                          uploadedFiles.doctorCertificate
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.doctorCertificate ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.applicantIdProof ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Applicant ID Proof
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Required - Aadhaar / Voter ID
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.applicantIdProof ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('applicantIdProof')}
                        className={
                          uploadedFiles.applicantIdProof
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.applicantIdProof ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.deceasedAadhaar ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Deceased Aadhaar
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Optional - If available
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.deceasedAadhaar ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('deceasedAadhaar')}
                        className={
                          uploadedFiles.deceasedAadhaar
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.deceasedAadhaar ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.cremationCertificate ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Cremation / Burial Certificate
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Conditional - Some Nagar Parishad requirements
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.cremationCertificate ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('cremationCertificate')}
                        className={
                          uploadedFiles.cremationCertificate
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.cremationCertificate ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.affidavit ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Affidavit
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Conditional - Required for home death
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.affidavit ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('affidavit')}
                        className={
                          uploadedFiles.affidavit
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.affidavit ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.oldCertificate ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Old Certificate Copy
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Optional - For duplicate copy
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.oldCertificate ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('oldCertificate')}
                        className={
                          uploadedFiles.oldCertificate
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.oldCertificate ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                  <p className='text-sm text-yellow-700'>
                    📝 <strong>Note:</strong> Required documents must be uploaded for application processing. 
                    Conditional documents are required only in specific cases.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('family')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Family
              </Button>
              <Button
                onClick={() => setStep('request')}
                className='bg-[#b01d4f] hover:bg-[#7a1e4f]'
              >
                Next: Request Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 6: Request Details */}
        {step === 'request' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <FileCheck className='h-6 w-6' />
                प्रमाणपत्र मागणी माहिती
              </CardTitle>
              <CardDescription>
                Certificate request details
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='certificateType' className='text-[#7a1e4f]'>
                      प्रमाणपत्र प्रकार
                    </Label>
                    <Select
                      value={formData.certificateType}
                      onValueChange={(value) => handleSelectChange('certificateType', value)}
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
                      value={formData.numberOfCopies.toString()}
                      onValueChange={(value) => handleSelectChange('numberOfCopies', value)}
                    >
                      <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                        <SelectValue placeholder='Select number of copies' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='1'>1 Copy</SelectItem>
                        <SelectItem value='2'>2 Copies</SelectItem>
                        <SelectItem value='3'>3 Copies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='language' className='text-[#7a1e4f]'>
                      भाषा
                    </Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => handleSelectChange('language', value)}
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

                  <div>
                    <Label htmlFor='purpose' className='text-[#7a1e4f]'>
                      हेतू
                    </Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) => handleSelectChange('purpose', value)}
                    >
                      <SelectTrigger className='mt-1 w-full border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                        <SelectValue placeholder='Select purpose' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='बँक'>Bank</SelectItem>
                        <SelectItem value='विमा'>Insurance</SelectItem>
                        <SelectItem value='वारसा'>Inheritance</SelectItem>
                        <SelectItem value='सरकारी काम'>Government Work</SelectItem>
                        <SelectItem value='इतर'>Other</SelectItem>
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
                        Urgent Service (Express processing available)
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
                        <span className='text-[#7a1e4f]'>Urgent Service Fee</span>
                        <span>{formatCurrency(fees.urgentFee)}</span>
                      </div>
                    )}
                    {formData.numberOfCopies > 1 && (
                      <div className='flex justify-between'>
                        <span className='text-[#7a1e4f]'>Additional Copies ({formData.numberOfCopies - 1} × {formatCurrency(fees.copyFee)})</span>
                        <span>{formatCurrency((formData.numberOfCopies - 1) * fees.copyFee)}</span>
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
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange('paymentMethod', value)}
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
                      Email Notification (Status updates and certificate download)
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

        {/* Step 7: Declaration */}
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
                      <CheckCircle className='h-4 w-4 mt-0.5 text-green-600' />
                      <span>सर्व माहिती खरी आणि तपासलेली आहे</span>
                    </div>
                    <div className='flex items-start gap-2'>
                      <CheckCircle className='h-4 w-4 mt-0.5 text-green-600' />
                      <span>सर्व आवश्यक कागदपत्रे अपलोड केली आहेत</span>
                    </div>
                    <div className='flex items-start gap-2'>
                      <CheckCircle className='h-4 w-4 mt-0.5 text-green-600' />
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
                      <span>Deceased Name:</span>
                      <span className='font-medium'>{formData.deceasedName || 'Not provided'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Application Fee:</span>
                      <span className='font-medium'>{formatCurrency(fees.total)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Processing Time:</span>
                      <span className='font-medium'>{formData.urgentService ? '1-2 Working Days' : '3-5 Working Days'}</span>
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

        {/* Step 8: Confirmation */}
        {step === 'confirmation' && (
          <Card className='mx-auto max-w-4xl border-[#7a1e4f]/20'>
            <CardHeader className='border-b border-[#7a1e4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7a1e4f]'>
                <CheckCircle className='h-8 w-8' />
                Application Submitted Successfully!
              </CardTitle>
              <CardDescription>
                Your death certificate application has been submitted and is being processed
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
                    Application ID: DC-APP-{Date.now().toString().slice(-10)}
                  </p>
                  <p className='mt-4 text-lg text-[#b01d4f]'>
                    Status: <span className='font-bold'>Under Review</span>
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Deceased Name</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.deceasedName || 'Not provided'}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Date of Death</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.dateOfDeath || 'Not provided'}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Application Type</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.certificateType}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Processing Time</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.urgentService ? '1-2 Working Days' : '3-5 Working Days'}
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
                      Document verification by Nagar Parishad
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      {formData.emailNotification && `Email updates sent to ${formData.email}`}
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      {formData.smsNotification && `SMS updates sent to ${formData.mobile}`}
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
                      setDeathData(null);
                      setAadhaarNumber('');
                      setFormData({
                        applicantName: '',
                        relationToDeceased: '',
                        mobile: '',
                        email: '',
                        aadhaar: '',
                        address: '',
                        idProofType: 'Aadhaar',
                        deceasedName: '',
                        gender: 'पुरुष',
                        dateOfDeath: '',
                        timeOfDeath: '',
                        ageAtDeath: '',
                        placeOfDeath: 'रुग्णालय',
                        deathPlaceName: '',
                        cityTaluka: 'Shegaon',
                        district: 'Buldhana',
                        state: 'Maharashtra',
                        causeOfDeath: '',
                        deathRegistrationNo: '',
                        fatherName: '',
                        motherName: '',
                        spouseName: '',
                        nationality: 'भारतीय',
                        permanentAddress: '',
                        certificateType: 'नवीन',
                        numberOfCopies: 1,
                        language: 'मराठी',
                        purpose: 'बँक',
                        urgentService: false,
                        declaration: false,
                        paymentMethod: 'UPI',
                        upiId: '',
                        emailNotification: true,
                        smsNotification: true
                      });
                      setUploadedFiles({
                        hospitalDeathReport: false,
                        doctorCertificate: false,
                        applicantIdProof: false,
                        deceasedAadhaar: false,
                        cremationCertificate: false,
                        affidavit: false,
                        oldCertificate: false
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
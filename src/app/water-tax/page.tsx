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
  Droplets,
  Building,
  FileDigit,
  Calculator,
  Wallet,
  FileSignature,
  CheckSquare,
  GlassWater
} from 'lucide-react';

interface WaterTaxData {
  id: string;
  // Payer Details
  payerName: string;
  relationWithOwner: string;
  mobile: string;
  email: string;
  aadhaar: string;
  address: string;
  
  // Water Connection Details
  consumerNumber: string;
  propertyId: string;
  connectionType: string;
  connectionStatus: string;
  meterAvailable: string;
  meterNumber: string;
  waterPipeSize: string;
  connectionDate: string;
  
  // Property Details
  propertyOwnerName: string;
  propertyAddress: string;
  wardNo: string;
  usageType: string;
  numberOfResidents: number;
  
  // Tax Calculation
  billingPeriod: string;
  previousDue: number;
  currentCharges: number;
  penaltyFee: number;
  totalPayable: number;
  
  // Payment Details
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  paymentStatus: string;
}

const dummyWaterTaxRecords: WaterTaxData[] = [
  {
    id: '1',
    payerName: 'राजेश कुमार शर्मा',
    relationWithOwner: 'स्वतः',
    mobile: '9876543210',
    email: 'rajesh.sharma@example.com',
    aadhaar: '1234-5678-9012',
    address: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    
    consumerNumber: 'WT-2023-0456',
    propertyId: 'PROP-001',
    connectionType: 'घरगुती',
    connectionStatus: 'Active',
    meterAvailable: 'होय',
    meterNumber: 'MTR-789012',
    waterPipeSize: '¾”',
    connectionDate: '2018-06-15',
    
    propertyOwnerName: 'राजेश कुमार शर्मा',
    propertyAddress: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    wardNo: 'वार्ड 7',
    usageType: 'निवासी',
    numberOfResidents: 4,
    
    billingPeriod: 'तिमाही',
    previousDue: 0,
    currentCharges: 1200,
    penaltyFee: 0,
    totalPayable: 1200,
    
    paymentMethod: 'UPI',
    transactionId: 'TXN-001',
    paymentDate: '2024-01-15',
    paymentStatus: 'Success'
  },
  {
    id: '2',
    payerName: 'सुनिता देशपांडे',
    relationWithOwner: 'भाडेकरू',
    mobile: '8765432109',
    email: 'sunita.d@example.com',
    aadhaar: '2345-6789-0123',
    address: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    
    consumerNumber: 'WT-2022-0789',
    propertyId: 'PROP-002',
    connectionType: 'घरगुती',
    connectionStatus: 'Active',
    meterAvailable: 'नाही',
    meterNumber: '',
    waterPipeSize: '½”',
    connectionDate: '2015-03-20',
    
    propertyOwnerName: 'विजय देशपांडे',
    propertyAddress: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    wardNo: 'वार्ड 12',
    usageType: 'निवासी',
    numberOfResidents: 3,
    
    billingPeriod: 'महिना',
    previousDue: 450,
    currentCharges: 800,
    penaltyFee: 50,
    totalPayable: 1300,
    
    paymentMethod: 'Net Banking',
    transactionId: 'TXN-002',
    paymentDate: '2024-01-10',
    paymentStatus: 'Success'
  },
  {
    id: '3',
    payerName: 'अजय पाटील',
    relationWithOwner: 'स्वतः',
    mobile: '7654321098',
    email: 'ajay.patil@example.com',
    aadhaar: '3456-7890-1234',
    address: 'शॉप नंबर 5, मार्केट यार्ड, बुलढाणा',
    
    consumerNumber: 'WT-2024-1234',
    propertyId: 'PROP-003',
    connectionType: 'व्यापारी',
    connectionStatus: 'Active',
    meterAvailable: 'होय',
    meterNumber: 'MTR-345678',
    waterPipeSize: '1”',
    connectionDate: '2020-11-10',
    
    propertyOwnerName: 'अजय पाटील',
    propertyAddress: 'शॉप नंबर 5, मार्केट यार्ड, बुलढाणा',
    wardNo: 'वार्ड 3',
    usageType: 'व्यापारी',
    numberOfResidents: 0,
    
    billingPeriod: 'वर्ष',
    previousDue: 0,
    currentCharges: 5000,
    penaltyFee: 0,
    totalPayable: 5000,
    
    paymentMethod: 'Card',
    transactionId: 'TXN-003',
    paymentDate: '2024-01-05',
    paymentStatus: 'Success'
  }
];

interface UploadedDocuments {
  previousBill: boolean;
  ownerIdProof: boolean;
  connectionLetter: boolean;
  propertyProof: boolean;
}

export default function WaterTaxPage() {
  const [step, setStep] = useState<
    'search' | 'payer' | 'connection' | 'property' | 'calculation' | 'payment' | 'documents' | 'confirmation'
  >('search');
  const [loading, setLoading] = useState(false);
  const [waterTaxData, setWaterTaxData] = useState<WaterTaxData | null>(null);
  const [consumerNumber, setConsumerNumber] = useState('');
  const [formData, setFormData] = useState({
    // Payer Details
    payerName: '',
    relationWithOwner: 'स्वतः',
    mobile: '',
    email: '',
    aadhaar: '',
    address: '',
    
    // Water Connection Details
    consumerNumber: '',
    propertyId: '',
    connectionType: 'घरगुती',
    connectionStatus: 'Active',
    meterAvailable: 'होय',
    meterNumber: '',
    waterPipeSize: '¾”',
    connectionDate: '',
    
    // Property Details
    propertyOwnerName: '',
    propertyAddress: '',
    wardNo: 'वार्ड 1',
    usageType: 'निवासी',
    numberOfResidents: 1,
    
    // Tax Calculation
    billingPeriod: 'तिमाही',
    previousDue: 0,
    currentCharges: 0,
    penaltyFee: 0,
    totalPayable: 0,
    
    // Payment Details
    paymentMethod: 'UPI',
    transactionId: '',
    paymentDate: '',
    paymentStatus: 'Pending',
    
    // Declaration
    declaration: false,
    
    // Preferences
    emailNotification: true,
    smsNotification: true,
    autoRenewal: false
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDocuments>({
    previousBill: false,
    ownerIdProof: false,
    connectionLetter: false,
    propertyProof: false
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
  const [wardOptions] = useState([
    'वार्ड 1', 'वार्ड 2', 'वार्ड 3', 'वार्ड 4', 'वार्ड 5',
    'वार्ड 6', 'वार्ड 7', 'वार्ड 8', 'वार्ड 9', 'वार्ड 10',
    'वार्ड 11', 'वार्ड 12', 'वार्ड 13', 'वार्ड 14', 'वार्ड 15'
  ]);

  useEffect(() => {
    // Calculate total payable when charges change
    const total = formData.previousDue + formData.currentCharges + formData.penaltyFee;
    setFormData(prev => ({ ...prev, totalPayable: total }));
  }, [formData.previousDue, formData.currentCharges, formData.penaltyFee]);

  const handleConsumerSearch = () => {
    if (searchBlocked) {
      alert('Too many search attempts. Please try again after 5 minutes.');
      return;
    }

    if (!consumerNumber.trim()) {
      alert('Please enter Consumer Number to search');
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
      const foundRecord = dummyWaterTaxRecords.find((record) =>
        record.consumerNumber.toLowerCase().includes(consumerNumber.toLowerCase()) ||
        record.consumerNumber === consumerNumber
      );

      if (foundRecord) {
        setWaterTaxData(foundRecord);
        setFormData({
          payerName: foundRecord.payerName,
          relationWithOwner: foundRecord.relationWithOwner,
          mobile: foundRecord.mobile,
          email: foundRecord.email,
          aadhaar: foundRecord.aadhaar,
          address: foundRecord.address,
          
          consumerNumber: foundRecord.consumerNumber,
          propertyId: foundRecord.propertyId,
          connectionType: foundRecord.connectionType,
          connectionStatus: foundRecord.connectionStatus,
          meterAvailable: foundRecord.meterAvailable,
          meterNumber: foundRecord.meterNumber,
          waterPipeSize: foundRecord.waterPipeSize,
          connectionDate: foundRecord.connectionDate,
          
          propertyOwnerName: foundRecord.propertyOwnerName,
          propertyAddress: foundRecord.propertyAddress,
          wardNo: foundRecord.wardNo,
          usageType: foundRecord.usageType,
          numberOfResidents: foundRecord.numberOfResidents,
          
          billingPeriod: foundRecord.billingPeriod,
          previousDue: foundRecord.previousDue,
          currentCharges: foundRecord.currentCharges,
          penaltyFee: foundRecord.penaltyFee,
          totalPayable: foundRecord.totalPayable,
          
          paymentMethod: foundRecord.paymentMethod,
          transactionId: foundRecord.transactionId,
          paymentDate: foundRecord.paymentDate,
          paymentStatus: foundRecord.paymentStatus,
          
          declaration: false,
          emailNotification: true,
          smsNotification: true,
          autoRenewal: false
        });
        setStep('payer');
      } else {
        alert('No matching records found. Please check your Consumer Number.');
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
      [name]: type === 'number' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type: keyof UploadedDocuments) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));
    console.log(`${type} uploaded successfully`);
  };

  const calculateWaterCharges = () => {
    let baseCharge = 0;
    
    // Calculate based on connection type and usage
    if (formData.connectionType === 'घरगुती') {
      if (formData.meterAvailable === 'होय') {
        baseCharge = 300; // Fixed charge + meter rent
      } else {
        baseCharge = 250; // Fixed charge for non-metered
      }
      // Add per resident charge
      baseCharge += formData.numberOfResidents * 50;
    } else if (formData.connectionType === 'व्यापारी') {
      baseCharge = 1000; // Commercial base charge
    } else if (formData.connectionType === 'औद्योगिक') {
      baseCharge = 2500; // Industrial base charge
    }
    
    // Adjust for pipe size
    if (formData.waterPipeSize === '½”') baseCharge *= 0.8;
    else if (formData.waterPipeSize === '1”') baseCharge *= 1.2;
    
    // Adjust for billing period
    if (formData.billingPeriod === 'महिना') baseCharge *= 1;
    else if (formData.billingPeriod === 'तिमाही') baseCharge *= 3;
    else if (formData.billingPeriod === 'वर्ष') baseCharge *= 12;
    
    setFormData(prev => ({ ...prev, currentCharges: baseCharge }));
  };

  useEffect(() => {
    calculateWaterCharges();
  }, [formData.connectionType, formData.meterAvailable, formData.numberOfResidents, 
      formData.waterPipeSize, formData.billingPeriod]);

  const handleDownloadReceipt = () => {
    const receiptData = {
      receiptNumber: `WT-RCPT-${Date.now().toString().slice(-8)}`,
      issueDate: new Date().toLocaleDateString('en-IN'),
      issueTime: new Date().toLocaleTimeString('en-IN'),
      payerName: formData.payerName,
      consumerNumber: formData.consumerNumber,
      propertyAddress: formData.propertyAddress,
      wardNo: formData.wardNo,
      billingPeriod: formData.billingPeriod,
      previousDue: formData.previousDue,
      currentCharges: formData.currentCharges,
      penaltyFee: formData.penaltyFee,
      totalPayable: formData.totalPayable,
      paymentMethod: formData.paymentMethod,
      transactionId: `TXN-${Date.now().toString().slice(-10)}`,
      paymentDate: new Date().toLocaleDateString('en-IN'),
      paymentStatus: 'Success',
      connectionType: formData.connectionType,
      usageType: formData.usageType,
      meterAvailable: formData.meterAvailable,
      meterNumber: formData.meterNumber || 'N/A'
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
            color: #1e88e5; 
            margin-bottom: 30px; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #1e88e5;
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
          .receipt-info { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin: 25px 0; 
            padding: 20px; 
            background: #f0f9ff; 
            border-radius: 8px; 
            border: 1px solid #bbdefb;
          }
          .section-title { 
            color: #1e88e5; 
            font-size: 18px; 
            font-weight: bold;
            margin: 30px 0 15px 0; 
            padding-bottom: 8px;
            border-bottom: 2px solid #1e88e5;
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
          .payment-section {
            background: #1e88e5;
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: center;
          }
          .payment-amount {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
          }
          .paid-badge {
            display: inline-block;
            background: #4caf50;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 10px;
          }
          .breakdown {
            margin: 30px 0;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
          }
          .breakdown-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #ddd;
          }
          .breakdown-total {
            font-weight: bold;
            font-size: 18px;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #1e88e5;
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
            border-top: 2px dashed #1e88e5;
            font-style: italic;
            color: #1e88e5;
          }
          .connection-info {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h1>पाणी कर भरणा पावती</h1>
          <h2>Water Tax Payment Receipt</h2>
        </div>
        
        <!-- Receipt Info -->
        <div class="receipt-info">
          <div class="detail-item">
            <span class="label">Receipt No:</span>
            <span class="value">${receiptData.receiptNumber}</span>
          </div>
          <div class="detail-item">
            <span class="label">Transaction ID:</span>
            <span class="value">${receiptData.transactionId}</span>
          </div>
          <div class="detail-item">
            <span class="label">Issue Date:</span>
            <span class="value">${receiptData.issueDate}</span>
          </div>
          <div class="detail-item">
            <span class="label">Issue Time:</span>
            <span class="value">${receiptData.issueTime}</span>
          </div>
        </div>
        
        <!-- Payer Details -->
        <div class="section-title">PAYER DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Payer Name:</span>
            <span class="value">${receiptData.payerName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Consumer Number:</span>
            <span class="value">${receiptData.consumerNumber}</span>
          </div>
        </div>
        
        <!-- Property Details -->
        <div class="section-title">PROPERTY DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Property Address:</span>
            <span class="value">${receiptData.propertyAddress}</span>
          </div>
          <div class="detail-item">
            <span class="label">Ward No:</span>
            <span class="value">${receiptData.wardNo}</span>
          </div>
        </div>
        
        <!-- Connection Information -->
        <div class="connection-info">
          <div style="margin-bottom: 5px;"><strong>Connection Type:</strong> ${receiptData.connectionType}</div>
          <div><strong>Meter Available:</strong> ${receiptData.meterAvailable} ${receiptData.meterNumber ? `(No: ${receiptData.meterNumber})` : ''}</div>
        </div>
        
        <!-- Payment Breakdown -->
        <div class="section-title">PAYMENT BREAKDOWN</div>
        <div class="breakdown">
          <div class="breakdown-item">
            <span>Billing Period:</span>
            <span>${receiptData.billingPeriod}</span>
          </div>
          <div class="breakdown-item">
            <span>Previous Due:</span>
            <span>₹${receiptData.previousDue.toFixed(2)}</span>
          </div>
          <div class="breakdown-item">
            <span>Current Water Charges:</span>
            <span>₹${receiptData.currentCharges.toFixed(2)}</span>
          </div>
          <div class="breakdown-item">
            <span>Penalty / Late Fee:</span>
            <span>₹${receiptData.penaltyFee.toFixed(2)}</span>
          </div>
          <div class="breakdown-item breakdown-total">
            <span>Total Amount Paid:</span>
            <span>₹${receiptData.totalPayable.toFixed(2)}</span>
          </div>
        </div>
        
        <!-- Payment Confirmation -->
        <div class="payment-section">
          <div>Payment Successful</div>
          <div class="payment-amount">₹${receiptData.totalPayable.toFixed(2)}</div>
          <div class="paid-badge">PAID</div>
          <div style="margin-top: 15px; font-size: 14px;">
            Paid via ${receiptData.paymentMethod}
          </div>
        </div>
        
        <!-- Payment Details -->
        <div class="section-title">PAYMENT DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Payment Method:</span>
            <span class="value">${receiptData.paymentMethod}</span>
          </div>
          <div class="detail-item">
            <span class="label">Transaction ID:</span>
            <span class="value">${receiptData.transactionId}</span>
          </div>
          <div class="detail-item">
            <span class="label">Payment Date:</span>
            <span class="value">${receiptData.paymentDate}</span>
          </div>
          <div class="detail-item">
            <span class="label">Payment Status:</span>
            <span class="value">${receiptData.paymentStatus}</span>
          </div>
        </div>
        
        <!-- Stamp Section -->
        <div class="stamp">
          <div style="font-weight: bold;">Authorized Signature</div>
          <div>Nagar Parishad Water Tax Department</div>
          <div>Government of Maharashtra</div>
        </div>
        
        <!-- Notes -->
        <div class="notes">
          <div class="section-title">IMPORTANT NOTES</div>
          <div class="note-item">✓ This is a computer-generated receipt, valid without signature.</div>
          <div class="note-item">✓ Please preserve this receipt for all future references.</div>
          <div class="note-item">✓ For any billing queries, contact Nagar Parishad office within 7 days.</div>
          <div class="note-item">✓ Next billing date will be as per your billing cycle.</div>
          <div class="note-item">✓ Keep your consumer number handy for future transactions.</div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div>Issued by Nagar Parishad Water Tax Department</div>
          <div style="font-weight: bold; margin: 10px 0;">Government of Maharashtra</div>
          <div style="margin-top: 10px; font-size: 12px;">
            Customer Care: 1800-XXX-XXXX | Email: watertax@nagarpalika.gov.in<br>
            Office Hours: 9:00 AM - 5:00 PM (Mon-Sat)
          </div>
          <div style="margin-top: 15px; font-size: 11px; color: #999;">
            Generated electronically on ${receiptData.issueDate} at ${receiptData.issueTime}
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
            pdf.save(`Water_Tax_Receipt_${receiptData.receiptNumber}.pdf`);

            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }

            alert(`Receipt downloaded successfully!\nFile: Water_Tax_Receipt_${receiptData.receiptNumber}.pdf`);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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
                <Label htmlFor='cardNumber' className='text-[#1e3a8a]'>
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
                  className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                />
              </div>
              <div>
                <Label htmlFor='cardHolder' className='text-[#1e3a8a]'>
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
                  className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                />
              </div>
              <div>
                <Label htmlFor='expiryDate' className='text-[#1e3a8a]'>
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
                  className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                />
              </div>
              <div>
                <Label htmlFor='cvv' className='text-[#1e3a8a]'>
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
                  className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
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
                <Label htmlFor='bankName' className='text-[#1e3a8a]'>
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
                  className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                />
              </div>
              <div>
                <Label htmlFor='accountNumber' className='text-[#1e3a8a]'>
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
                  className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                />
              </div>
              <div>
                <Label htmlFor='ifscCode' className='text-[#1e3a8a]'>
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
                  className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                />
              </div>
            </div>
          </div>
        );

      case 'UPI':
        return (
          <div className='space-y-4'>
            <div>
              <Label htmlFor='upiId' className='text-[#1e3a8a]'>
                UPI ID
              </Label>
              <Input
                id='upiId'
                name='upiId'
                value={paymentDetails.walletId}
                onChange={(e) =>
                  setPaymentDetails((prev) => ({
                    ...prev,
                    walletId: e.target.value
                  }))
                }
                placeholder='mobile@upi'
                className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmitPayment = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('confirmation');
    }, 2000);
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 md:p-8'>
      <div className='max-w-full px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#1e88e5]/10 px-4 py-2'>
            <Droplets className='h-4 w-4 text-[#1e88e5]' />
            <span className='text-sm font-medium text-[#1e88e5]'>
              पाणी कर भरणा पोर्टल
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#1e88e5]/10 p-3'>
              <GlassWater className='h-8 w-8 text-[#1e88e5]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद पाणी कर पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Water Tax Portal
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
          {['search', 'payer', 'connection', 'property', 'calculation', 'payment', 'documents'].map((stepName, index) => (
            <div key={stepName} className='flex items-center'>
              <div
                className={`flex items-center ${step === stepName ? 'text-[#1e88e5]' : index < ['search', 'payer', 'connection', 'property', 'calculation', 'payment', 'documents'].indexOf(step) ? 'text-[#1e3a8a]' : 'text-gray-400'}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step === stepName ? 'bg-[#1e88e5]/10' : index < ['search', 'payer', 'connection', 'property', 'calculation', 'payment', 'documents'].indexOf(step) ? 'bg-[#1e3a8a]/10' : 'bg-gray-100'}`}
                >
                  {index === 0 && <Search className='h-4 w-4' />}
                  {index === 1 && <User className='h-4 w-4' />}
                  {index === 2 && <Droplets className='h-4 w-4' />}
                  {index === 3 && <Building className='h-4 w-4' />}
                  {index === 4 && <Calculator className='h-4 w-4' />}
                  {index === 5 && <Wallet className='h-4 w-4' />}
                  {index === 6 && <FileText className='h-4 w-4' />}
                </div>
                <span className='ml-2 hidden text-sm font-medium md:block'>
                  {index === 0 && 'शोध'}
                  {index === 1 && 'भरकर्ता'}
                  {index === 2 && 'कनेक्शन'}
                  {index === 3 && 'मालमत्ता'}
                  {index === 4 && 'गणना'}
                  {index === 5 && 'भरणा'}
                  {index === 6 && 'कागद'}
                </span>
              </div>
              {index < 6 && (
                <div
                  className={`mx-2 h-1 w-8 ${index < ['search', 'payer', 'connection', 'property', 'calculation', 'payment', 'documents'].indexOf(step) ? 'bg-[#1e3a8a]' : 'bg-gray-300'}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Consumer Search */}
        {step === 'search' && (
          <Card className='mx-auto max-w-2xl border-[#1e88e5]/20'>
            <CardHeader className='border-b border-[#1e88e5]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e88e5]'>
                <Search className='h-6 w-6' />
                Search Water Connection
              </CardTitle>
              <CardDescription>
                Enter Consumer Number to search for water tax records
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='consumerNumber' className='text-[#1e3a8a]'>
                    <div className='flex items-center gap-2'>
                      <FileDigit className='h-4 w-4' />
                      ग्राहक क्रमांक / कनेक्शन आयडी
                    </div>
                  </Label>
                  <Input
                    id='consumerNumber'
                    type='text'
                    placeholder='Enter Consumer Number (e.g., WT-2023-0456)'
                    value={consumerNumber}
                    onChange={(e) => setConsumerNumber(e.target.value)}
                    className='mt-1'
                  />
                  <p className='mt-2 text-xs text-gray-500'>
                    • Try demo numbers: WT-2023-0456, WT-2022-0789, WT-2024-1234
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleConsumerSearch}
                disabled={loading || !consumerNumber.trim() || searchBlocked}
                className='w-full bg-[#1e88e5] hover:bg-[#1e3a8a]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    शोधत आहे...
                  </>
                ) : (
                  <>
                    <Search className='mr-2 h-4 w-4' />
                    शोधा आणि कर भरा
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Payer Details */}
        {step === 'payer' && waterTaxData && (
          <Card className='mx-auto max-w-4xl border-[#1e88e5]/20'>
            <CardHeader className='border-b border-[#1e88e5]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e88e5]'>
                <User className='h-6 w-6' />
                1️⃣ अर्ज करणाऱ्याची माहिती
              </CardTitle>
              <CardDescription>
                Payer / Applicant Details
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='payerName' className='text-[#1e3a8a]'>
                    कर भरणाऱ्याचे पूर्ण नाव
                  </Label>
                  <Input
                    id='payerName'
                    name='payerName'
                    value={formData.payerName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>

                <div>
                  <Label htmlFor='relationWithOwner' className='text-[#1e3a8a]'>
                    मालकाशी संबंध
                  </Label>
                  <Select
                    value={formData.relationWithOwner}
                    onValueChange={(value) => handleSelectChange('relationWithOwner', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#1e88e5]/20 focus:border-[#1e88e5]'>
                      <SelectValue placeholder='Select relation' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='स्वतः'>स्वतः</SelectItem>
                      <SelectItem value='पती-पत्नी'>पती-पत्नी</SelectItem>
                      <SelectItem value='मुलगा'>मुलगा</SelectItem>
                      <SelectItem value='मुलगी'>मुलगी</SelectItem>
                      <SelectItem value='भाडेकरू'>भाडेकरू</SelectItem>
                      <SelectItem value='इतर'>इतर</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='mobile' className='text-[#1e3a8a]'>
                    मोबाइल नंबर
                  </Label>
                  <div className='mt-1 flex gap-2'>
                    <Input
                      id='mobile'
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className='border-[#1e88e5]/20 focus:border-[#1e88e5]'
                    />
                    <Button
                      size='sm'
                      variant='outline'
                      className='border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
                    >
                      OTP पाठवा
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor='email' className='text-[#1e3a8a]'>
                    ईमेल आयडी
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>

                <div>
                  <Label htmlFor='aadhaar' className='text-[#1e3a8a]'>
                    आधार क्रमांक (Optional)
                  </Label>
                  <Input
                    id='aadhaar'
                    name='aadhaar'
                    value={formData.aadhaar}
                    onChange={handleInputChange}
                    className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>

                <div className='md:col-span-2'>
                  <Label htmlFor='address' className='text-[#1e3a8a]'>
                    संपर्क पत्ता
                  </Label>
                  <Textarea
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#1e88e5]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('search')}
                className='border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
              >
                Back to Search
              </Button>
              <Button
                onClick={() => setStep('connection')}
                className='bg-[#1e88e5] hover:bg-[#1e3a8a]'
              >
                Next: Connection Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Water Connection Details */}
        {step === 'connection' && (
          <Card className='mx-auto max-w-4xl border-[#1e88e5]/20'>
            <CardHeader className='border-b border-[#1e88e5]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e88e5]'>
                <Droplets className='h-6 w-6' />
                2️⃣ पाणी कनेक्शन माहिती
              </CardTitle>
              <CardDescription>
                Water Connection Details
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='consumerNumber' className='text-[#1e3a8a]'>
                    ग्राहक क्रमांक / कनेक्शन आयडी
                  </Label>
                  <Input
                    id='consumerNumber'
                    name='consumerNumber'
                    value={formData.consumerNumber}
                    readOnly
                    className='mt-1 bg-gray-100 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>

                <div>
                  <Label htmlFor='propertyId' className='text-[#1e3a8a]'>
                    मालमत्ता आयडी (जर लागू असेल तर)
                  </Label>
                  <Input
                    id='propertyId'
                    name='propertyId'
                    value={formData.propertyId}
                    onChange={handleInputChange}
                    className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>

                <div>
                  <Label htmlFor='connectionType' className='text-[#1e3a8a]'>
                    कनेक्शन प्रकार
                  </Label>
                  <Select
                    value={formData.connectionType}
                    onValueChange={(value) => handleSelectChange('connectionType', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#1e88e5]/20 focus:border-[#1e88e5]'>
                      <SelectValue placeholder='Select connection type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='घरगुती'>घरगुती</SelectItem>
                      <SelectItem value='व्यापारी'>व्यापारी</SelectItem>
                      <SelectItem value='औद्योगिक'>औद्योगिक</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='connectionStatus' className='text-[#1e3a8a]'>
                    कनेक्शन स्थिती
                  </Label>
                  <Input
                    id='connectionStatus'
                    name='connectionStatus'
                    value={formData.connectionStatus}
                    readOnly
                    className='mt-1 bg-gray-100 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>

                <div>
                  <Label className='text-[#1e3a8a]'>मीटर उपलब्ध</Label>
                  <RadioGroup
                    value={formData.meterAvailable}
                    onValueChange={(value) => handleSelectChange('meterAvailable', value)}
                    className='mt-1 flex gap-4'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='होय' id='yes-meter' />
                      <Label htmlFor='yes-meter' className='text-[#1e3a8a]'>
                        होय
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='नाही' id='no-meter' />
                      <Label htmlFor='no-meter' className='text-[#1e3a8a]'>
                        नाही
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.meterAvailable === 'होय' && (
                  <div>
                    <Label htmlFor='meterNumber' className='text-[#1e3a8a]'>
                      मीटर नंबर
                    </Label>
                    <Input
                      id='meterNumber'
                      name='meterNumber'
                      value={formData.meterNumber}
                      onChange={handleInputChange}
                      className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                      placeholder='Enter meter number'
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor='waterPipeSize' className='text-[#1e3a8a]'>
                    पाणी पाईप साइज
                  </Label>
                  <Select
                    value={formData.waterPipeSize}
                    onValueChange={(value) => handleSelectChange('waterPipeSize', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#1e88e5]/20 focus:border-[#1e88e5]'>
                      <SelectValue placeholder='Select pipe size' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='½”'>½”</SelectItem>
                      <SelectItem value='¾”'>¾”</SelectItem>
                      <SelectItem value='1”'>1”</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='connectionDate' className='text-[#1e3a8a]'>
                    कनेक्शन तारीख (Optional)
                  </Label>
                  <Input
                    id='connectionDate'
                    name='connectionDate'
                    type='date'
                    value={formData.connectionDate}
                    onChange={handleInputChange}
                    className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#1e88e5]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('payer')}
                className='border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
              >
                Back to Payer
              </Button>
              <Button
                onClick={() => setStep('property')}
                className='bg-[#1e88e5] hover:bg-[#1e3a8a]'
              >
                Next: Property Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Property Details */}
        {step === 'property' && (
          <Card className='mx-auto max-w-4xl border-[#1e88e5]/20'>
            <CardHeader className='border-b border-[#1e88e5]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e88e5]'>
                <Building className='h-6 w-6' />
                3️⃣ मालमत्ता / वापरकर्ता माहिती
              </CardTitle>
              <CardDescription>
                Property Details
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor='propertyOwnerName' className='text-[#1e3a8a]'>
                    मालकाचे नाव
                  </Label>
                  <Input
                    id='propertyOwnerName'
                    name='propertyOwnerName'
                    value={formData.propertyOwnerName}
                    onChange={handleInputChange}
                    className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>

                <div>
                  <Label htmlFor='wardNo' className='text-[#1e3a8a]'>
                    वार्ड क्रमांक / झोन
                  </Label>
                  <Select
                    value={formData.wardNo}
                    onValueChange={(value) => handleSelectChange('wardNo', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#1e88e5]/20 focus:border-[#1e88e5]'>
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

                <div>
                  <Label htmlFor='usageType' className='text-[#1e3a8a]'>
                    वापर प्रकार
                  </Label>
                  <Select
                    value={formData.usageType}
                    onValueChange={(value) => handleSelectChange('usageType', value)}
                  >
                    <SelectTrigger className='mt-1 w-full border-[#1e88e5]/20 focus:border-[#1e88e5]'>
                      <SelectValue placeholder='Select usage type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='निवासी'>निवासी</SelectItem>
                      <SelectItem value='व्यापारी'>व्यापारी</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.usageType === 'निवासी' && (
                  <div>
                    <Label htmlFor='numberOfResidents' className='text-[#1e3a8a]'>
                      रहिवाशांची संख्या (घरगुती साठी)
                    </Label>
                    <Input
                      id='numberOfResidents'
                      name='numberOfResidents'
                      type='number'
                      min='1'
                      value={formData.numberOfResidents}
                      onChange={handleInputChange}
                      className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                    />
                  </div>
                )}

                <div className='md:col-span-2'>
                  <Label htmlFor='propertyAddress' className='text-[#1e3a8a]'>
                    पूर्ण पत्ता
                  </Label>
                  <Textarea
                    id='propertyAddress'
                    name='propertyAddress'
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    className='mt-1 min-h-[100px] border-[#1e88e5]/20 focus:border-[#1e88e5]'
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#1e88e5]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('connection')}
                className='border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
              >
                Back to Connection
              </Button>
              <Button
                onClick={() => setStep('calculation')}
                className='bg-[#1e88e5] hover:bg-[#1e3a8a]'
              >
                Next: Tax Calculation
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Tax Calculation */}
        {step === 'calculation' && (
          <Card className='mx-auto max-w-4xl border-[#1e88e5]/20'>
            <CardHeader className='border-b border-[#1e88e5]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e88e5]'>
                <Calculator className='h-6 w-6' />
                4️⃣ कर गणना माहिती
              </CardTitle>
              <CardDescription>
                Water Tax Calculation
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='billingPeriod' className='text-[#1e3a8a]'>
                      बिलिंग कालावधी
                    </Label>
                    <Select
                      value={formData.billingPeriod}
                      onValueChange={(value) => handleSelectChange('billingPeriod', value)}
                    >
                      <SelectTrigger className='mt-1 w-full border-[#1e88e5]/20 focus:border-[#1e88e5]'>
                        <SelectValue placeholder='Select billing period' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='महिना'>महिना</SelectItem>
                        <SelectItem value='तिमाही'>तिमाही</SelectItem>
                        <SelectItem value='वर्ष'>वर्ष</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='previousDue' className='text-[#1e3a8a]'>
                      मागील थकबाकी
                    </Label>
                    <Input
                      id='previousDue'
                      name='previousDue'
                      type='number'
                      value={formData.previousDue}
                      onChange={handleInputChange}
                      className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                    />
                  </div>

                  <div>
                    <Label htmlFor='currentCharges' className='text-[#1e3a8a]'>
                      चालू पाणी शुल्क
                    </Label>
                    <Input
                      id='currentCharges'
                      name='currentCharges'
                      type='number'
                      value={formData.currentCharges}
                      onChange={handleInputChange}
                      className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                    />
                  </div>

                  <div>
                    <Label htmlFor='penaltyFee' className='text-[#1e3a8a]'>
                      दंड / उशीर शुल्क
                    </Label>
                    <Input
                      id='penaltyFee'
                      name='penaltyFee'
                      type='number'
                      value={formData.penaltyFee}
                      onChange={handleInputChange}
                      className='mt-1 border-[#1e88e5]/20 focus:border-[#1e88e5]'
                    />
                  </div>
                </div>

                <div className='rounded-lg border border-[#1e88e5]/20 bg-[#1e88e5]/5 p-6'>
                  <h4 className='mb-4 font-medium text-[#1e3a8a]'>
                    कर भरणा सारांश
                  </h4>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-[#1e3a8a]'>मागील थकबाकी:</span>
                      <span>{formatCurrency(formData.previousDue)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#1e3a8a]'>चालू पाणी शुल्क:</span>
                      <span>{formatCurrency(formData.currentCharges)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#1e3a8a]'>दंड / उशीर शुल्क:</span>
                      <span>{formatCurrency(formData.penaltyFee)}</span>
                    </div>
                    <div className='flex justify-between border-t border-[#1e88e5]/20 pt-3'>
                      <span className='font-bold text-[#1e3a8a]'>एकूण देय रक्कम:</span>
                      <span className='font-bold text-lg text-[#1e88e5]'>
                        {formatCurrency(formData.totalPayable)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <p className='text-sm text-green-700'>
                    💡 <strong>नोंद:</strong> पाणी शुल्क आपल्या कनेक्शन प्रकार, वापर, 
                    मीटर उपलब्धता आणि बिलिंग कालावधीनुसार मोजले जाते.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#1e88e5]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('property')}
                className='border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
              >
                Back to Property
              </Button>
              <Button
                onClick={() => setStep('payment')}
                className='bg-[#1e88e5] hover:bg-[#1e3a8a]'
              >
                Next: Payment
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 6: Payment Details */}
        {step === 'payment' && (
          <Card className='mx-auto max-w-4xl border-[#1e88e5]/20'>
            <CardHeader className='border-b border-[#1e88e5]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e88e5]'>
                <Wallet className='h-6 w-6' />
                5️⃣ पेमेंट माहिती
              </CardTitle>
              <CardDescription>
                Payment Details
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='paymentMethod' className='text-[#1e3a8a]'>
                      पेमेंट पद्धत
                    </Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                    >
                      <SelectTrigger className='mt-1 w-full border-[#1e88e5]/20 focus:border-[#1e88e5]'>
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
                </div>

                <div>{renderPaymentForm()}</div>

                <div className='rounded-lg border border-[#1e88e5]/20 bg-[#1e88e5]/5 p-4'>
                  <div className='text-center'>
                    <div className='mb-2 text-2xl font-bold text-[#1e88e5]'>
                      {formatCurrency(formData.totalPayable)}
                    </div>
                    <p className='text-sm text-[#1e3a8a]'>
                      Total Amount to Pay
                    </p>
                  </div>
                </div>

                <div className='space-y-3'>
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
                      className='border-[#1e88e5] text-[#1e88e5] data-[state=checked]:bg-[#1e88e5]'
                    />
                    <label
                      htmlFor='emailNotification'
                      className='text-sm leading-none font-medium text-[#1e3a8a]'
                    >
                      ईमेल सूचना (पावती आणि अपडेटसाठी)
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
                      className='border-[#1e88e5] text-[#1e88e5] data-[state=checked]:bg-[#1e88e5]'
                    />
                    <label
                      htmlFor='smsNotification'
                      className='text-sm leading-none font-medium text-[#1e3a8a]'
                    >
                      एसएमएस सूचना (OTP आणि पेमेंट स्टेटससाठी)
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='autoRenewal'
                      checked={formData.autoRenewal}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          autoRenewal: checked as boolean
                        }))
                      }
                      className='border-[#1e88e5] text-[#1e88e5] data-[state=checked]:bg-[#1e88e5]'
                    />
                    <label
                      htmlFor='autoRenewal'
                      className='text-sm leading-none font-medium text-[#1e3a8a]'
                    >
                      ऑटो-रिन्यूअल (पुढील बिलिंगसाठी स्वयंचलित पेमेंट)
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#1e88e5]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('calculation')}
                className='border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
              >
                Back to Calculation
              </Button>
              <Button
                onClick={() => setStep('documents')}
                className='bg-[#1e88e5] hover:bg-[#1e3a8a]'
              >
                Next: Documents
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 7: Documents Upload */}
        {step === 'documents' && (
          <Card className='mx-auto max-w-4xl border-[#1e88e5]/20'>
            <CardHeader className='border-b border-[#1e88e5]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e88e5]'>
                <FileText className='h-6 w-6' />
                6️⃣ कागदपत्रे (Optional Documents)
              </CardTitle>
              <CardDescription>
                Optional documents for reference
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.previousBill ? 'border-[#1e3a8a] bg-[#1e3a8a]/5' : 'border-[#1e88e5]/20 hover:border-[#1e88e5]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#1e3a8a]'>
                          Previous Water Bill
                        </h4>
                        <p className='text-sm text-[#1e3a8a]/80'>
                          Optional - For reference
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.previousBill ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('previousBill')}
                        className={
                          uploadedFiles.previousBill
                            ? 'border-[#1e3a8a] text-[#1e3a8a]'
                            : 'bg-[#1e88e5] hover:bg-[#1e3a8a]'
                        }
                      >
                        {uploadedFiles.previousBill ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.ownerIdProof ? 'border-[#1e3a8a] bg-[#1e3a8a]/5' : 'border-[#1e88e5]/20 hover:border-[#1e88e5]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#1e3a8a]'>
                          Owner ID Proof
                        </h4>
                        <p className='text-sm text-[#1e3a8a]/80'>
                          Optional - Aadhaar / PAN
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.ownerIdProof ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('ownerIdProof')}
                        className={
                          uploadedFiles.ownerIdProof
                            ? 'border-[#1e3a8a] text-[#1e3a8a]'
                            : 'bg-[#1e88e5] hover:bg-[#1e3a8a]'
                        }
                      >
                        {uploadedFiles.ownerIdProof ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.connectionLetter ? 'border-[#1e3a8a] bg-[#1e3a8a]/5' : 'border-[#1e88e5]/20 hover:border-[#1e88e5]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#1e3a8a]'>
                          Connection Approval Letter
                        </h4>
                        <p className='text-sm text-[#1e3a8a]/80'>
                          Optional - For new connections
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.connectionLetter ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('connectionLetter')}
                        className={
                          uploadedFiles.connectionLetter
                            ? 'border-[#1e3a8a] text-[#1e3a8a]'
                            : 'bg-[#1e88e5] hover:bg-[#1e3a8a]'
                        }
                      >
                        {uploadedFiles.connectionLetter ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.propertyProof ? 'border-[#1e3a8a] bg-[#1e3a8a]/5' : 'border-[#1e88e5]/20 hover:border-[#1e88e5]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#1e3a8a]'>
                          Property Proof
                        </h4>
                        <p className='text-sm text-[#1e3a8a]/80'>
                          Optional - Property tax receipt
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={uploadedFiles.propertyProof ? 'outline' : 'default'}
                        onClick={() => handleFileUpload('propertyProof')}
                        className={
                          uploadedFiles.propertyProof
                            ? 'border-[#1e3a8a] text-[#1e3a8a]'
                            : 'bg-[#1e88e5] hover:bg-[#1e3a8a]'
                        }
                      >
                        {uploadedFiles.propertyProof ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                  <p className='text-sm text-blue-700'>
                    📝 <strong>नोंद:</strong> ही कागदपत्रे ऐच्छिक आहेत. 
                    ती फक्त संदर्भासाठी अपलोड करा.
                  </p>
                </div>

                <div className='space-y-3'>
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
                      className='border-[#1e88e5] text-[#1e88e5] data-[state=checked]:bg-[#1e88e5] mt-1'
                    />
                    <div>
                      <label
                        htmlFor='declaration'
                        className='text-sm leading-none font-medium text-[#1e3a8a]'
                      >
                        मी याची खात्री करतो/करते की वरील माहिती खरी आहे
                      </label>
                      <p className='mt-1 text-sm text-[#1e3a8a]/70'>
                        I hereby declare that all the information provided above is true and correct.
                        I agree to pay the water tax amount of {formatCurrency(formData.totalPayable)}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#1e88e5]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('payment')}
                className='border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
              >
                Back to Payment
              </Button>
              <Button
                onClick={handleSubmitPayment}
                disabled={loading || !formData.declaration}
                className='bg-[#1e88e5] hover:bg-[#1e3a8a]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckSquare className='mr-2 h-4 w-4' />
                    Submit & Pay {formatCurrency(formData.totalPayable)}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 8: Confirmation */}
        {step === 'confirmation' && (
          <Card className='mx-auto max-w-4xl border-[#1e3a8a]/20'>
            <CardHeader className='border-b border-[#1e3a8a]/10'>
              <CardTitle className='flex items-center gap-2 text-[#1e3a8a]'>
                <CheckCircle className='h-8 w-8' />
                7️⃣ रसीद व कन्फर्मेशन
              </CardTitle>
              <CardDescription>
                Receipt & Confirmation
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg border border-[#1e3a8a]/20 bg-[#1e3a8a]/5 p-6 text-center'>
                  <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1e3a8a]/10'>
                    <CheckCircle className='h-12 w-12 text-[#1e3a8a]' />
                  </div>
                  <h3 className='mb-2 text-2xl font-bold text-[#1e3a8a]'>
                    Payment Successful!
                  </h3>
                  <p className='text-[#1e3a8a]/80'>
                    Receipt No: WT-RCPT-{Date.now().toString().slice(-8)}
                  </p>
                  <p className='mt-4 text-lg text-[#1e88e5]'>
                    Transaction ID: <span className='font-bold'>TXN-{Date.now().toString().slice(-10)}</span>
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='rounded-lg bg-[#1e88e5]/5 p-4'>
                    <p className='text-sm text-[#1e3a8a]'>Consumer Number</p>
                    <p className='font-medium text-[#1e88e5]'>
                      {formData.consumerNumber}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#1e88e5]/5 p-4'>
                    <p className='text-sm text-[#1e3a8a]'>Amount Paid</p>
                    <p className='font-medium text-[#1e88e5]'>
                      {formatCurrency(formData.totalPayable)}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#1e88e5]/5 p-4'>
                    <p className='text-sm text-[#1e3a8a]'>Payment Method</p>
                    <p className='font-medium text-[#1e88e5]'>
                      {formData.paymentMethod}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#1e88e5]/5 p-4'>
                    <p className='text-sm text-[#1e3a8a]'>Payment Date</p>
                    <p className='font-medium text-[#1e88e5]'>
                      {new Date().toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className='rounded-lg border border-[#1e3a8a]/20 bg-[#1e3a8a]/5 p-4'>
                  <h4 className='mb-2 flex items-center gap-2 font-medium text-[#1e3a8a]'>
                    <CheckCircle className='h-4 w-4' />
                    What happens next?
                  </h4>
                  <ul className='space-y-2 text-sm text-[#1e3a8a]'>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Payment confirmation sent to your mobile and email
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Receipt will be generated and available for download
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Your water tax payment is recorded in Nagar Parishad system
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Next billing date will be as per your billing cycle
                    </li>
                  </ul>
                </div>

                <div className='flex flex-col gap-4 sm:flex-row'>
                  <Button
                    variant='outline'
                    onClick={handleDownloadReceipt}
                    className='flex-1 border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10'
                  >
                    <Download className='mr-2 h-4 w-4' />
                    Download Receipt (PDF)
                  </Button>
                  <Button
                    onClick={() => {
                      setStep('search');
                      setWaterTaxData(null);
                      setConsumerNumber('');
                      setFormData({
                        payerName: '',
                        relationWithOwner: 'स्वतः',
                        mobile: '',
                        email: '',
                        aadhaar: '',
                        address: '',
                        consumerNumber: '',
                        propertyId: '',
                        connectionType: 'घरगुती',
                        connectionStatus: 'Active',
                        meterAvailable: 'होय',
                        meterNumber: '',
                        waterPipeSize: '¾”',
                        connectionDate: '',
                        propertyOwnerName: '',
                        propertyAddress: '',
                        wardNo: 'वार्ड 1',
                        usageType: 'निवासी',
                        numberOfResidents: 1,
                        billingPeriod: 'तिमाही',
                        previousDue: 0,
                        currentCharges: 0,
                        penaltyFee: 0,
                        totalPayable: 0,
                        paymentMethod: 'UPI',
                        transactionId: '',
                        paymentDate: '',
                        paymentStatus: 'Pending',
                        declaration: false,
                        emailNotification: true,
                        smsNotification: true,
                        autoRenewal: false
                      });
                      setUploadedFiles({
                        previousBill: false,
                        ownerIdProof: false,
                        connectionLetter: false,
                        propertyProof: false
                      });
                    }}
                    className='flex-1 bg-[#1e88e5] hover:bg-[#1e3a8a]'
                  >
                    New Payment
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
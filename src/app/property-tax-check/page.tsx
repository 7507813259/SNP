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
  IndianRupee
} from 'lucide-react';

interface PropertyTaxData {
  id: string;
  // Search Information
  propertyId: string;
  houseNo: string;
  ownerName: string;
  mobile: string;
  wardNo: string;
  surveyNo: string;

  // Property Details (Auto-fetched)
  propertyOwnerName: string;
  propertyAddress: string;
  propertyType: string;
  builtUpArea: number;
  assessmentNo: string;
  usageType: string;

  // Dues Details
  dues: {
    financialYear: string;
    propertyTaxAmount: number;
    waterTaxDues: number;
    otherCharges: number;
    penaltyInterest: number;
    totalOutstanding: number;
  }[];

  // Total Summary
  totalOutstanding: number;
  totalPropertyTax: number;
  totalWaterTax: number;
  totalOtherCharges: number;
  totalPenaltyInterest: number;

  // Payment Status
  paymentStatus: string;
  lastPaymentDate: string;
}

const dummyPropertyTaxRecords: PropertyTaxData[] = [
  {
    id: '1',
    propertyId: 'PROP-001',
    houseNo: '45',
    ownerName: 'राजेश कुमार शर्मा',
    mobile: '9876543210',
    wardNo: 'वार्ड 7',
    surveyNo: 'CTS-12345',

    propertyOwnerName: 'राजेश कुमार शर्मा',
    propertyAddress: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    propertyType: 'Residential',
    builtUpArea: 850,
    assessmentNo: 'ASS-2023-001',
    usageType: 'निवासी',

    dues: [
      {
        financialYear: '2023-2024',
        propertyTaxAmount: 4500,
        waterTaxDues: 1200,
        otherCharges: 300,
        penaltyInterest: 250,
        totalOutstanding: 6250
      },
      {
        financialYear: '2022-2023',
        propertyTaxAmount: 4200,
        waterTaxDues: 1100,
        otherCharges: 280,
        penaltyInterest: 420,
        totalOutstanding: 6000
      },
      {
        financialYear: '2021-2022',
        propertyTaxAmount: 4000,
        waterTaxDues: 1000,
        otherCharges: 250,
        penaltyInterest: 600,
        totalOutstanding: 5850
      }
    ],

    totalOutstanding: 18100,
    totalPropertyTax: 12700,
    totalWaterTax: 3300,
    totalOtherCharges: 830,
    totalPenaltyInterest: 1270,

    paymentStatus: 'Pending',
    lastPaymentDate: '2021-03-15'
  },
  {
    id: '2',
    propertyId: 'PROP-002',
    houseNo: '304',
    ownerName: 'सुनिता देशपांडे',
    mobile: '8765432109',
    wardNo: 'वार्ड 12',
    surveyNo: 'CTS-23456',

    propertyOwnerName: 'विजय देशपांडे',
    propertyAddress: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    propertyType: 'Residential',
    builtUpArea: 650,
    assessmentNo: 'ASS-2023-002',
    usageType: 'निवासी',

    dues: [
      {
        financialYear: '2023-2024',
        propertyTaxAmount: 3200,
        waterTaxDues: 800,
        otherCharges: 200,
        penaltyInterest: 150,
        totalOutstanding: 4350
      }
    ],

    totalOutstanding: 4350,
    totalPropertyTax: 3200,
    totalWaterTax: 800,
    totalOtherCharges: 200,
    totalPenaltyInterest: 150,

    paymentStatus: 'Partially Paid',
    lastPaymentDate: '2023-12-10'
  },
  {
    id: '3',
    propertyId: 'PROP-003',
    houseNo: '5',
    ownerName: 'अजय पाटील',
    mobile: '7654321098',
    wardNo: 'वार्ड 3',
    surveyNo: 'CTS-34567',

    propertyOwnerName: 'अजय पाटील',
    propertyAddress: 'शॉप नंबर 5, मार्केट यार्ड, बुलढाणा',
    propertyType: 'Commercial',
    builtUpArea: 1200,
    assessmentNo: 'ASS-2023-003',
    usageType: 'व्यापारी',

    dues: [
      {
        financialYear: '2023-2024',
        propertyTaxAmount: 8500,
        waterTaxDues: 2500,
        otherCharges: 500,
        penaltyInterest: 420,
        totalOutstanding: 11920
      },
      {
        financialYear: '2022-2023',
        propertyTaxAmount: 8200,
        waterTaxDues: 2400,
        otherCharges: 480,
        penaltyInterest: 620,
        totalOutstanding: 11700
      }
    ],

    totalOutstanding: 23620,
    totalPropertyTax: 16700,
    totalWaterTax: 4900,
    totalOtherCharges: 980,
    totalPenaltyInterest: 1040,

    paymentStatus: 'Pending',
    lastPaymentDate: '2022-02-20'
  }
];

export default function PropertyTaxDueCheckPage() {
  const [step, setStep] = useState<
    'search' | 'property' | 'dues' | 'payment' | 'applicant' | 'confirmation'
  >('search');
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyTaxData | null>(
    null
  );
  const [searchForm, setSearchForm] = useState({
    propertyId: '',
    houseNo: '',
    ownerName: '',
    mobile: '',
    wardNo: 'वार्ड 1',
    surveyNo: ''
  });

  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: 'UPI',
    transactionId: '',
    emailNotification: true,
    smsNotification: true,
    agreeTerms: false
  });

  const [applicantForm, setApplicantForm] = useState({
    applicantName: '',
    relationWithOwner: 'स्वतः',
    purpose: 'माहिती'
  });

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

  const handleSearch = () => {
    if (!searchForm.propertyId.trim() && !searchForm.houseNo.trim()) {
      alert('Please enter Property ID or House Number to search');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const foundRecord = dummyPropertyTaxRecords.find(
        (record) =>
          record.propertyId.toLowerCase() ===
            searchForm.propertyId.toLowerCase() ||
          record.houseNo === searchForm.houseNo ||
          (searchForm.ownerName &&
            record.ownerName
              .toLowerCase()
              .includes(searchForm.ownerName.toLowerCase()))
      );

      if (foundRecord) {
        setPropertyData(foundRecord);
        // Auto-select all years for payment
        setSelectedYears(foundRecord.dues.map((dues) => dues.financialYear));
        setStep('property');
      } else {
        alert(
          'No matching property records found. Please check your search criteria.'
        );
      }
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleYearSelection = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const calculateSelectedTotal = () => {
    if (!propertyData) return 0;

    return propertyData.dues
      .filter((dues) => selectedYears.includes(dues.financialYear))
      .reduce((sum, dues) => sum + dues.totalOutstanding, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleDownloadStatement = () => {
    if (!propertyData) return;

    const statementData = {
      statementNumber: `PT-STMT-${Date.now().toString().slice(-8)}`,
      issueDate: new Date().toLocaleDateString('en-IN'),
      issueTime: new Date().toLocaleTimeString('en-IN'),
      propertyId: propertyData.propertyId,
      houseNo: propertyData.houseNo,
      ownerName: propertyData.propertyOwnerName,
      propertyAddress: propertyData.propertyAddress,
      wardNo: propertyData.wardNo,
      assessmentNo: propertyData.assessmentNo,
      dues: propertyData.dues,
      totalOutstanding: propertyData.totalOutstanding,
      totalPropertyTax: propertyData.totalPropertyTax,
      totalWaterTax: propertyData.totalWaterTax,
      totalOtherCharges: propertyData.totalOtherCharges,
      totalPenaltyInterest: propertyData.totalPenaltyInterest,
      paymentStatus: propertyData.paymentStatus,
      lastPaymentDate: propertyData.lastPaymentDate
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
            color: #059669; 
            margin-bottom: 30px; 
            padding-bottom: 20px; 
            border-bottom: 3px solid #059669;
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
          .statement-info { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin: 25px 0; 
            padding: 20px; 
            background: #f0fdf4; 
            border-radius: 8px; 
            border: 1px solid #bbf7d0;
          }
          .section-title { 
            color: #059669; 
            font-size: 18px; 
            font-weight: bold;
            margin: 30px 0 15px 0; 
            padding-bottom: 8px;
            border-bottom: 2px solid #059669;
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
          .table-container {
            margin: 30px 0;
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th {
            background: #059669;
            color: white;
            padding: 12px 15px;
            text-align: left;
            font-weight: bold;
          }
          td {
            padding: 10px 15px;
            border-bottom: 1px solid #e5e7eb;
          }
          tr:nth-child(even) {
            background: #f9fafb;
          }
          tr:hover {
            background: #f0fdf4;
          }
          .total-row {
            font-weight: bold;
            background: #dcfce7 !important;
            border-top: 2px solid #059669;
          }
          .warning-row {
            background: #fef3c7 !important;
            color: #92400e;
          }
          .summary-box {
            background: #f0fdf4;
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #059669;
            margin: 30px 0;
          }
          .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #bbf7d0;
          }
          .summary-total {
            font-weight: bold;
            font-size: 18px;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #059669;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
          }
          .status-pending {
            background: #fef3c7;
            color: #92400e;
          }
          .status-paid {
            background: #dcfce7;
            color: #065f46;
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
            border-top: 2px dashed #059669;
            font-style: italic;
            color: #059669;
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h1>मालमत्ता कर थकबाकी विवरण</h1>
          <h2>Property Tax Outstanding Statement</h2>
        </div>
        
        <!-- Statement Info -->
        <div class="statement-info">
          <div class="detail-item">
            <span class="label">Statement No:</span>
            <span class="value">${statementData.statementNumber}</span>
          </div>
          <div class="detail-item">
            <span class="label">Issue Date:</span>
            <span class="value">${statementData.issueDate}</span>
          </div>
          <div class="detail-item">
            <span class="label">Property ID:</span>
            <span class="value">${statementData.propertyId}</span>
          </div>
          <div class="detail-item">
            <span class="label">House No:</span>
            <span class="value">${statementData.houseNo}</span>
          </div>
        </div>
        
        <!-- Property Details -->
        <div class="section-title">PROPERTY DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Owner Name:</span>
            <span class="value">${statementData.ownerName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Ward No:</span>
            <span class="value">${statementData.wardNo}</span>
          </div>
          <div class="detail-item">
            <span class="label">Assessment No:</span>
            <span class="value">${statementData.assessmentNo}</span>
          </div>
          <div class="detail-item">
            <span class="label">Payment Status:</span>
            <span class="value">
              <span class="status-badge status-pending">${statementData.paymentStatus}</span>
            </span>
          </div>
        </div>
        <div style="margin: 15px 0;">
          <span class="label">Property Address:</span><br>
          <span class="value">${statementData.propertyAddress}</span>
        </div>
        
        <!-- Outstanding Summary -->
        <div class="section-title">OUTSTANDING SUMMARY</div>
        <div class="summary-box">
          <div class="summary-item">
            <span>Total Property Tax:</span>
            <span>${formatCurrency(statementData.totalPropertyTax)}</span>
          </div>
          <div class="summary-item">
            <span>Total Water Tax Dues:</span>
            <span>${formatCurrency(statementData.totalWaterTax)}</span>
          </div>
          <div class="summary-item">
            <span>Total Other Charges:</span>
            <span>${formatCurrency(statementData.totalOtherCharges)}</span>
          </div>
          <div class="summary-item">
            <span>Total Penalty/Interest:</span>
            <span>${formatCurrency(statementData.totalPenaltyInterest)}</span>
          </div>
          <div class="summary-item summary-total">
            <span>Total Outstanding Amount:</span>
            <span style="color: #dc2626; font-size: 20px;">${formatCurrency(statementData.totalOutstanding)}</span>
          </div>
        </div>
        
        <!-- Detailed Dues -->
        <div class="section-title">DETAILED DUES BY FINANCIAL YEAR</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Financial Year</th>
                <th>Property Tax</th>
                <th>Water Tax</th>
                <th>Other Charges</th>
                <th>Penalty/Interest</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${statementData.dues
                .map(
                  (dues) => `
                <tr class="${dues.financialYear === '2023-2024' ? 'warning-row' : ''}">
                  <td>${dues.financialYear}</td>
                  <td>${formatCurrency(dues.propertyTaxAmount)}</td>
                  <td>${formatCurrency(dues.waterTaxDues)}</td>
                  <td>${formatCurrency(dues.otherCharges)}</td>
                  <td>${formatCurrency(dues.penaltyInterest)}</td>
                  <td><strong>${formatCurrency(dues.totalOutstanding)}</strong></td>
                </tr>
              `
                )
                .join('')}
              <tr class="total-row">
                <td><strong>GRAND TOTAL</strong></td>
                <td><strong>${formatCurrency(statementData.totalPropertyTax)}</strong></td>
                <td><strong>${formatCurrency(statementData.totalWaterTax)}</strong></td>
                <td><strong>${formatCurrency(statementData.totalOtherCharges)}</strong></td>
                <td><strong>${formatCurrency(statementData.totalPenaltyInterest)}</strong></td>
                <td><strong style="color: #dc2626;">${formatCurrency(statementData.totalOutstanding)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Payment Information -->
        <div class="section-title">PAYMENT INFORMATION</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Last Payment Date:</span>
            <span class="value">${statementData.lastPaymentDate || 'No recent payment'}</span>
          </div>
          <div class="detail-item">
            <span class="label">Current Status:</span>
            <span class="value">
              <span class="status-badge status-pending">${statementData.paymentStatus}</span>
            </span>
          </div>
        </div>
        
        <!-- Stamp Section -->
        <div class="stamp">
          <div style="font-weight: bold;">Authorized Signature</div>
          <div>Nagar Parishad Property Tax Department</div>
          <div>Government of Maharashtra</div>
        </div>
        
        <!-- Notes -->
        <div class="notes">
          <div class="section-title">IMPORTANT NOTES</div>
          <div class="note-item">✓ This is a computer-generated statement, valid for reference only.</div>
          <div class="note-item">✓ Please pay your outstanding dues before the end of financial year to avoid additional penalties.</div>
          <div class="note-item">✓ For any billing queries, contact Nagar Parishad office within 7 days.</div>
          <div class="note-item">✓ Online payment is available through the Nagar Parishad portal.</div>
          <div class="note-item">✓ Keep this statement for future reference and tax filing purposes.</div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div>Issued by Nagar Parishad Property Tax Department</div>
          <div style="font-weight: bold; margin: 10px 0;">Government of Maharashtra</div>
          <div style="margin-top: 10px; font-size: 12px;">
            Customer Care: 1800-XXX-XXXX | Email: propertytax@nagarpalika.gov.in<br>
            Office Hours: 9:00 AM - 5:00 PM (Mon-Sat)
          </div>
          <div style="margin-top: 15px; font-size: 11px; color: #999;">
            Generated electronically on ${statementData.issueDate} at ${statementData.issueTime}
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
              `Property_Tax_Statement_${statementData.statementNumber}.pdf`
            );

            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }

            alert(
              `Statement downloaded successfully!\nFile: Property_Tax_Statement_${statementData.statementNumber}.pdf`
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

  const renderPaymentForm = () => {
    switch (paymentForm.paymentMethod) {
      case 'CreditCard':
      case 'DebitCard':
        return (
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <Label htmlFor='cardNumber' className='text-[#065f46]'>
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
                  className='mt-1 border-[#059669]/20 focus:border-[#059669]'
                />
              </div>
              <div>
                <Label htmlFor='cardHolder' className='text-[#065f46]'>
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
                  className='mt-1 border-[#059669]/20 focus:border-[#059669]'
                />
              </div>
              <div>
                <Label htmlFor='expiryDate' className='text-[#065f46]'>
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
                  className='mt-1 border-[#059669]/20 focus:border-[#059669]'
                />
              </div>
              <div>
                <Label htmlFor='cvv' className='text-[#065f46]'>
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
                  className='mt-1 border-[#059669]/20 focus:border-[#059669]'
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
                <Label htmlFor='bankName' className='text-[#065f46]'>
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
                  className='mt-1 border-[#059669]/20 focus:border-[#059669]'
                />
              </div>
              <div>
                <Label htmlFor='accountNumber' className='text-[#065f46]'>
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
                  className='mt-1 border-[#059669]/20 focus:border-[#059669]'
                />
              </div>
              <div>
                <Label htmlFor='ifscCode' className='text-[#065f46]'>
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
                  className='mt-1 border-[#059669]/20 focus:border-[#059669]'
                />
              </div>
            </div>
          </div>
        );

      case 'UPI':
        return (
          <div className='space-y-4'>
            <div>
              <Label htmlFor='upiId' className='text-[#065f46]'>
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
                className='mt-1 border-[#059669]/20 focus:border-[#059669]'
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

  const handlePrintStatement = () => {
    window.print();
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 md:p-8'>
      <div className='max-w-full px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#059669]/10 px-4 py-2'>
            <Calculator className='h-4 w-4 text-[#059669]' />
            <span className='text-sm font-medium text-[#059669]'>
              मालमत्ता कर थकबाकी तपासणी
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#059669]/10 p-3'>
              <Building className='h-8 w-8 text-[#059669]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद मालमत्ता कर पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Property Tax Portal
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className='mb-8 flex flex-wrap items-center justify-center gap-4'>
          {['search', 'property', 'dues', 'payment', 'applicant'].map(
            (stepName, index) => (
              <div key={stepName} className='flex items-center'>
                <div
                  className={`flex items-center ${step === stepName ? 'text-[#059669]' : index < ['search', 'property', 'dues', 'payment', 'applicant'].indexOf(step) ? 'text-[#065f46]' : 'text-gray-400'}`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${step === stepName ? 'bg-[#059669]/10' : index < ['search', 'property', 'dues', 'payment', 'applicant'].indexOf(step) ? 'bg-[#065f46]/10' : 'bg-gray-100'}`}
                  >
                    {index === 0 && <Search className='h-4 w-4' />}
                    {index === 1 && <Home className='h-4 w-4' />}
                    {index === 2 && <FileSpreadsheet className='h-4 w-4' />}
                    {index === 3 && <Wallet className='h-4 w-4' />}
                    {index === 4 && <User className='h-4 w-4' />}
                  </div>
                  <span className='ml-2 hidden text-sm font-medium md:block'>
                    {index === 0 && 'शोध'}
                    {index === 1 && 'मालमत्ता'}
                    {index === 2 && 'थकबाकी'}
                    {index === 3 && 'भरणा'}
                    {index === 4 && 'अर्जदार'}
                  </span>
                </div>
                {index < 4 && (
                  <div
                    className={`mx-2 h-1 w-8 ${index < ['search', 'property', 'dues', 'payment', 'applicant'].indexOf(step) ? 'bg-[#065f46]' : 'bg-gray-300'}`}
                  ></div>
                )}
              </div>
            )
          )}
        </div>

        {/* Step 1: Search Information */}
        {step === 'search' && (
          <Card className='mx-auto max-w-2xl border-[#059669]/20'>
            <CardHeader className='border-b border-[#059669]/10'>
              <CardTitle className='flex items-center gap-2 text-[#059669]'>
                <Search className='h-6 w-6' />
                1️⃣ शोध माहिती
              </CardTitle>
              <CardDescription>
                थकबाकी तपासण्यासाठी आवश्यक किमान माहिती
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='propertyId' className='text-[#065f46]'>
                      <div className='flex items-center gap-2'>
                        <FileDigit className='h-4 w-4' />
                        मालमत्ता क्रमांक / हाउस नंबर
                      </div>
                    </Label>
                    <Input
                      id='propertyId'
                      name='propertyId'
                      placeholder='PROP-001 or House No'
                      value={searchForm.propertyId}
                      onChange={handleInputChange}
                      className='mt-1'
                    />
                  </div>

                  <div>
                    <Label htmlFor='ownerName' className='text-[#065f46]'>
                      मालकाचे नाव (Optional)
                    </Label>
                    <Input
                      id='ownerName'
                      name='ownerName'
                      placeholder='Enter owner name'
                      value={searchForm.ownerName}
                      onChange={handleInputChange}
                      className='mt-1'
                    />
                  </div>

                  <div>
                    <Label htmlFor='wardNo' className='text-[#065f46]'>
                      वार्ड क्रमांक / झोन
                    </Label>
                    <Select
                      value={searchForm.wardNo}
                      onValueChange={(value) =>
                        handleSelectChange('wardNo', value)
                      }
                    >
                      <SelectTrigger className='mt-1 w-full'>
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
                    <Label htmlFor='mobile' className='text-[#065f46]'>
                      मोबाइल नंबर (Optional - OTP verification)
                    </Label>
                    <div className='mt-1 flex gap-2'>
                      <Input
                        id='mobile'
                        name='mobile'
                        placeholder='9876543210'
                        value={searchForm.mobile}
                        onChange={handleInputChange}
                      />
                      {searchForm.mobile && (
                        <Button
                          size='sm'
                          variant='outline'
                          className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
                        >
                          OTP पाठवा
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <Label htmlFor='surveyNo' className='text-[#065f46]'>
                      सर्वे क्रमांक / CTS क्रमांक (जर उपलब्ध असेल तर)
                    </Label>
                    <Input
                      id='surveyNo'
                      name='surveyNo'
                      placeholder='CTS-12345'
                      value={searchForm.surveyNo}
                      onChange={handleInputChange}
                      className='mt-1'
                    />
                  </div>
                </div>

                <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                  <p className='text-sm text-yellow-700'>
                    💡 <strong>नोंद:</strong> Demo data for testing: PROP-001,
                    PROP-002, PROP-003
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSearch}
                disabled={
                  loading ||
                  (!searchForm.propertyId.trim() && !searchForm.houseNo.trim())
                }
                className='w-full bg-[#059669] hover:bg-[#065f46]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    शोधत आहे...
                  </>
                ) : (
                  <>
                    <Search className='mr-2 h-4 w-4' />
                    थकबाकी तपासा
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Property Details */}
        {step === 'property' && propertyData && (
          <Card className='mx-auto max-w-6xl border-[#059669]/20'>
            <CardHeader className='border-b border-[#059669]/10'>
              <CardTitle className='flex items-center gap-2 text-[#059669]'>
                <Home className='h-6 w-6' />
                2️⃣ मालमत्ता माहिती
              </CardTitle>
              <CardDescription>
                Property ID टाकल्यावर system मधून येणारी माहिती
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label className='text-[#065f46]'>मालकाचे नाव</Label>
                    <Input
                      value={propertyData.propertyOwnerName}
                      readOnly
                      className='mt-1 bg-gray-100'
                    />
                  </div>
                  <div>
                    <Label className='text-[#065f46]'>मालमत्ता प्रकार</Label>
                    <Input
                      value={propertyData.propertyType}
                      readOnly
                      className='mt-1 bg-gray-100'
                    />
                  </div>
                  <div>
                    <Label className='text-[#065f46]'>Assessment क्रमांक</Label>
                    <Input
                      value={propertyData.assessmentNo}
                      readOnly
                      className='mt-1 bg-gray-100'
                    />
                  </div>
                  <div>
                    <Label className='text-[#065f46]'>वापर प्रकार</Label>
                    <Input
                      value={propertyData.usageType}
                      readOnly
                      className='mt-1 bg-gray-100'
                    />
                  </div>
                  <div>
                    <Label className='text-[#065f46]'>
                      Built-up Area (sq.ft)
                    </Label>
                    <Input
                      value={propertyData.builtUpArea}
                      readOnly
                      className='mt-1 bg-gray-100'
                    />
                  </div>
                  <div>
                    <Label className='text-[#065f46]'>वार्ड क्रमांक</Label>
                    <Input
                      value={propertyData.wardNo}
                      readOnly
                      className='mt-1 bg-gray-100'
                    />
                  </div>
                </div>

                <div>
                  <Label className='text-[#065f46]'>पूर्ण पत्ता</Label>
                  <Textarea
                    value={propertyData.propertyAddress}
                    readOnly
                    className='mt-1 min-h-[80px] bg-gray-100'
                  />
                </div>

                <div className='rounded-lg border border-[#059669]/20 bg-[#059669]/5 p-4'>
                  <h4 className='mb-2 flex items-center gap-2 font-medium text-[#065f46]'>
                    <AlertCircle className='h-4 w-4' />
                    Quick Summary
                  </h4>
                  <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-[#059669]'>
                        {propertyData.dues.length}
                      </div>
                      <div className='text-sm text-[#065f46]'>
                        Financial Years
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-red-600'>
                        {formatCurrency(propertyData.totalOutstanding)}
                      </div>
                      <div className='text-sm text-[#065f46]'>
                        Total Outstanding
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-sm font-medium text-[#065f46]'>
                        {propertyData.paymentStatus}
                      </div>
                      <div className='text-sm text-[#065f46]'>
                        Payment Status
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-sm font-medium text-[#065f46]'>
                        {propertyData.lastPaymentDate || 'No payment'}
                      </div>
                      <div className='text-sm text-[#065f46]'>Last Payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#059669]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('search')}
                className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
              >
                Back to Search
              </Button>
              <Button
                onClick={() => setStep('dues')}
                className='bg-[#059669] hover:bg-[#065f46]'
              >
                Next: Dues Details
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Dues Details */}
        {step === 'dues' && propertyData && (
          <Card className='mx-auto max-w-6xl border-[#059669]/20'>
            <CardHeader className='border-b border-[#059669]/10'>
              <CardTitle className='flex items-center gap-2 text-[#059669]'>
                <FileSpreadsheet className='h-6 w-6' />
                3️⃣ थकबाकी तपशील
              </CardTitle>
              <CardDescription>वर्षनिहाय माहिती</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                {/* Year Selection for Payment */}
                <div className='rounded-lg border border-[#059669]/20 bg-[#059669]/5 p-4'>
                  <h4 className='mb-3 font-medium text-[#065f46]'>
                    Select Years to Pay (Optional)
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    {propertyData.dues.map((dues) => (
                      <div
                        key={dues.financialYear}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox
                          id={`year-${dues.financialYear}`}
                          checked={selectedYears.includes(dues.financialYear)}
                          onCheckedChange={() =>
                            handleYearSelection(dues.financialYear)
                          }
                          className='border-[#059669] text-[#059669] data-[state=checked]:bg-[#059669]'
                        />
                        <label
                          htmlFor={`year-${dues.financialYear}`}
                          className='text-sm font-medium text-[#065f46]'
                        >
                          {dues.financialYear} -{' '}
                          {formatCurrency(dues.totalOutstanding)}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedYears.length > 0 && (
                    <div className='mt-3 border-t border-[#059669]/20 pt-3'>
                      <div className='flex items-center justify-between'>
                        <span className='font-medium text-[#065f46]'>
                          Selected Total ({selectedYears.length} years):
                        </span>
                        <span className='text-xl font-bold text-red-600'>
                          {formatCurrency(calculateSelectedTotal())}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dues Table */}
                <div className='overflow-x-auto'>
                  <table className='w-full border-collapse'>
                    <thead>
                      <tr className='bg-[#059669] text-white'>
                        <th className='p-3 text-left'>Financial Year</th>
                        <th className='p-3 text-right'>Property Tax</th>
                        <th className='p-3 text-right'>Water Tax Dues</th>
                        <th className='p-3 text-right'>Other Charges</th>
                        <th className='p-3 text-right'>Penalty/Interest</th>
                        <th className='p-3 text-right'>Total Outstanding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propertyData.dues.map((dues) => (
                        <tr
                          key={dues.financialYear}
                          className={`border-b hover:bg-gray-50 ${selectedYears.includes(dues.financialYear) ? 'bg-emerald-50' : ''}`}
                        >
                          <td className='p-3'>{dues.financialYear}</td>
                          <td className='p-3 text-right'>
                            {formatCurrency(dues.propertyTaxAmount)}
                          </td>
                          <td className='p-3 text-right'>
                            {formatCurrency(dues.waterTaxDues)}
                          </td>
                          <td className='p-3 text-right'>
                            {formatCurrency(dues.otherCharges)}
                          </td>
                          <td className='p-3 text-right'>
                            {formatCurrency(dues.penaltyInterest)}
                          </td>
                          <td className='p-3 text-right font-semibold'>
                            {formatCurrency(dues.totalOutstanding)}
                          </td>
                        </tr>
                      ))}
                      <tr className='bg-gray-100 font-bold'>
                        <td className='p-3'>GRAND TOTAL</td>
                        <td className='p-3 text-right'>
                          {formatCurrency(propertyData.totalPropertyTax)}
                        </td>
                        <td className='p-3 text-right'>
                          {formatCurrency(propertyData.totalWaterTax)}
                        </td>
                        <td className='p-3 text-right'>
                          {formatCurrency(propertyData.totalOtherCharges)}
                        </td>
                        <td className='p-3 text-right'>
                          {formatCurrency(propertyData.totalPenaltyInterest)}
                        </td>
                        <td className='p-3 text-right text-lg text-red-600'>
                          {formatCurrency(propertyData.totalOutstanding)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Total Outstanding Summary */}
                <div className='rounded-lg border-2 border-red-200 bg-red-50 p-6'>
                  <div className='text-center'>
                    <div className='mb-2 text-lg font-medium text-red-800'>
                      एकूण थकबाकी
                    </div>
                    <div className='mb-4 text-4xl font-bold text-red-600'>
                      {formatCurrency(propertyData.totalOutstanding)}
                    </div>
                    <div className='flex justify-center gap-4'>
                      <Button
                        variant='outline'
                        onClick={handleDownloadStatement}
                        className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
                      >
                        <Download className='mr-2 h-4 w-4' />
                        Download PDF
                      </Button>
                      <Button
                        variant='outline'
                        onClick={handlePrintStatement}
                        className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
                      >
                        <Printer className='mr-2 h-4 w-4' />
                        Print Statement
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#059669]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('property')}
                className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
              >
                Back to Property
              </Button>
              <div className='flex gap-3'>
                <Button
                  onClick={() => setStep('applicant')}
                  className='bg-gray-600 hover:bg-gray-700'
                >
                  View Statement Only
                </Button>
                <Button
                  onClick={() => setStep('payment')}
                  className='bg-[#059669] hover:bg-[#065f46]'
                >
                  <Wallet className='mr-2 h-4 w-4' />
                  Pay Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Payment Options */}
        {step === 'payment' && propertyData && (
          <Card className='mx-auto max-w-4xl border-[#059669]/20'>
            <CardHeader className='border-b border-[#059669]/10'>
              <CardTitle className='flex items-center gap-2 text-[#059669]'>
                <Wallet className='h-6 w-6' />
                4️⃣ पेमेंट पर्याय
              </CardTitle>
              <CardDescription>
                जर user ला लगेच कर भरायचा असेल तर
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                {/* Payment Summary */}
                <div className='rounded-lg border border-[#059669]/20 bg-[#059669]/5 p-6'>
                  <div className='text-center'>
                    <div className='mb-2 text-lg font-medium text-[#065f46]'>
                      Payment Summary
                    </div>
                    <div className='mb-4 text-3xl font-bold text-red-600'>
                      {selectedYears.length > 0
                        ? formatCurrency(calculateSelectedTotal())
                        : formatCurrency(propertyData.totalOutstanding)}
                    </div>
                    <div className='text-sm text-[#065f46]'>
                      {selectedYears.length > 0
                        ? `Selected ${selectedYears.length} year(s): ${selectedYears.join(', ')}`
                        : 'Full outstanding amount (all years)'}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <Label htmlFor='paymentMethod' className='text-[#065f46]'>
                    पेमेंट पद्धत
                  </Label>
                  <Select
                    value={paymentForm.paymentMethod}
                    onValueChange={(value) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        paymentMethod: value
                      }))
                    }
                  >
                    <SelectTrigger className='mt-1 w-full border-[#059669]/20 focus:border-[#059669]'>
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

                {/* Payment Form */}
                <div>{renderPaymentForm()}</div>

                {/* Preferences */}
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='emailNotification'
                      checked={paymentForm.emailNotification}
                      onCheckedChange={(checked) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          emailNotification: checked as boolean
                        }))
                      }
                      className='border-[#059669] text-[#059669] data-[state=checked]:bg-[#059669]'
                    />
                    <label
                      htmlFor='emailNotification'
                      className='text-sm leading-none font-medium text-[#065f46]'
                    >
                      ईमेल सूचना (रसीद आणि अपडेटसाठी)
                    </label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='smsNotification'
                      checked={paymentForm.smsNotification}
                      onCheckedChange={(checked) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          smsNotification: checked as boolean
                        }))
                      }
                      className='border-[#059669] text-[#059669] data-[state=checked]:bg-[#059669]'
                    />
                    <label
                      htmlFor='smsNotification'
                      className='text-sm leading-none font-medium text-[#065f46]'
                    >
                      एसएमएस सूचना (OTP आणि पेमेंट स्टेटससाठी)
                    </label>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <Checkbox
                      id='agreeTerms'
                      checked={paymentForm.agreeTerms}
                      onCheckedChange={(checked) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          agreeTerms: checked as boolean
                        }))
                      }
                      className='mt-1 border-[#059669] text-[#059669] data-[state=checked]:bg-[#059669]'
                    />
                    <div>
                      <label
                        htmlFor='agreeTerms'
                        className='text-sm leading-none font-medium text-[#065f46]'
                      >
                        मी सर्व अटी व नियमांशी सहमत आहे
                      </label>
                      <p className='mt-1 text-sm text-[#065f46]/70'>
                        I agree to pay the property tax amount and accept all
                        terms & conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#059669]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('dues')}
                className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
              >
                Back to Dues
              </Button>
              <Button
                onClick={() => setStep('applicant')}
                disabled={loading || !paymentForm.agreeTerms}
                className='bg-[#059669] hover:bg-[#065f46]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Processing...
                  </>
                ) : (
                  <>
                    <IndianRupee className='mr-2 h-4 w-4' />
                    Proceed to Pay{' '}
                    {formatCurrency(
                      calculateSelectedTotal() || propertyData.totalOutstanding
                    )}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Applicant Information */}
        {step === 'applicant' && propertyData && (
          <Card className='mx-auto max-w-4xl border-[#059669]/20'>
            <CardHeader className='border-b border-[#059669]/10'>
              <CardTitle className='flex items-center gap-2 text-[#059669]'>
                <User className='h-6 w-6' />
                6️⃣ अर्ज करणाऱ्याची माहिती
              </CardTitle>
              <CardDescription>Optional – Audit Purpose</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='applicantName' className='text-[#065f46]'>
                      अर्ज करणाऱ्याचे नाव
                    </Label>
                    <Input
                      id='applicantName'
                      name='applicantName'
                      value={applicantForm.applicantName}
                      onChange={(e) =>
                        setApplicantForm((prev) => ({
                          ...prev,
                          applicantName: e.target.value
                        }))
                      }
                      placeholder='Enter applicant name'
                      className='mt-1 border-[#059669]/20 focus:border-[#059669]'
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor='relationWithOwner'
                      className='text-[#065f46]'
                    >
                      मालकाशी संबंध
                    </Label>
                    <Select
                      value={applicantForm.relationWithOwner}
                      onValueChange={(value) =>
                        setApplicantForm((prev) => ({
                          ...prev,
                          relationWithOwner: value
                        }))
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#059669]/20 focus:border-[#059669]'>
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

                  <div className='md:col-span-2'>
                    <Label htmlFor='purpose' className='text-[#065f46]'>
                      हेतू
                    </Label>
                    <Select
                      value={applicantForm.purpose}
                      onValueChange={(value) =>
                        setApplicantForm((prev) => ({
                          ...prev,
                          purpose: value
                        }))
                      }
                    >
                      <SelectTrigger className='mt-1 w-full border-[#059669]/20 focus:border-[#059669]'>
                        <SelectValue placeholder='Select purpose' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='माहिती'>माहिती</SelectItem>
                        <SelectItem value='पेमेंट'>पेमेंट</SelectItem>
                        <SelectItem value='कर्ज माफी'>कर्ज माफी</SelectItem>
                        <SelectItem value='तपासणी'>तपासणी</SelectItem>
                        <SelectItem value='इतर'>इतर</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                  <p className='text-sm text-yellow-700'>
                    📝 <strong>नोंद:</strong> ही माहिती केवळ ऑडिट उद्देशासाठी
                    आहे. Statement download करण्यासाठी भरणा अनिवार्य नाही.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#059669]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('dues')}
                className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitPayment}
                className='bg-[#059669] hover:bg-[#065f46]'
              >
                <CheckSquare className='mr-2 h-4 w-4' />
                Submit & Download Statement
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 6: Confirmation */}
        {step === 'confirmation' && propertyData && (
          <Card className='mx-auto max-w-4xl border-[#065f46]/20'>
            <CardHeader className='border-b border-[#065f46]/10'>
              <CardTitle className='flex items-center gap-2 text-[#065f46]'>
                <CheckCircle className='h-8 w-8' />
                डाउनलोड / प्रिंट पर्याय
              </CardTitle>
              <CardDescription>थकबाकी विवरण तयार झाले आहे</CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg border border-[#065f46]/20 bg-[#065f46]/5 p-6 text-center'>
                  <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#065f46]/10'>
                    <CheckCircle className='h-12 w-12 text-[#065f46]' />
                  </div>
                  <h3 className='mb-2 text-2xl font-bold text-[#065f46]'>
                    Statement Generated Successfully!
                  </h3>
                  <p className='text-[#065f46]/80'>
                    Statement No: PT-STMT-{Date.now().toString().slice(-8)}
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='rounded-lg bg-[#059669]/5 p-4'>
                    <p className='text-sm text-[#065f46]'>Property ID</p>
                    <p className='font-medium text-[#059669]'>
                      {propertyData.propertyId}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#059669]/5 p-4'>
                    <p className='text-sm text-[#065f46]'>Total Outstanding</p>
                    <p className='font-medium text-red-600'>
                      {formatCurrency(propertyData.totalOutstanding)}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#059669]/5 p-4'>
                    <p className='text-sm text-[#065f46]'>Financial Years</p>
                    <p className='font-medium text-[#059669]'>
                      {propertyData.dues.length} years
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#059669]/5 p-4'>
                    <p className='text-sm text-[#065f46]'>Payment Status</p>
                    <p className='font-medium text-[#059669]'>
                      {propertyData.paymentStatus}
                    </p>
                  </div>
                </div>

                <div className='rounded-lg border border-[#065f46]/20 bg-[#065f46]/5 p-4'>
                  <h4 className='mb-2 flex items-center gap-2 font-medium text-[#065f46]'>
                    <EyeIcon className='h-4 w-4' />
                    Available Options
                  </h4>
                  <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                    <Button
                      variant='outline'
                      onClick={handleDownloadStatement}
                      className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
                    >
                      <Download className='mr-2 h-4 w-4' />
                      Download PDF
                    </Button>
                    <Button
                      variant='outline'
                      onClick={handlePrintStatement}
                      className='border-[#059669] text-[#059669] hover:bg-[#059669]/10'
                    >
                      <Printer className='mr-2 h-4 w-4' />
                      Print Statement
                    </Button>
                    <Button
                      onClick={() => {
                        setStep('search');
                        setPropertyData(null);
                        setSearchForm({
                          propertyId: '',
                          houseNo: '',
                          ownerName: '',
                          mobile: '',
                          wardNo: 'वार्ड 1',
                          surveyNo: ''
                        });
                        setSelectedYears([]);
                        setPaymentForm({
                          paymentMethod: 'UPI',
                          transactionId: '',
                          emailNotification: true,
                          smsNotification: true,
                          agreeTerms: false
                        });
                        setApplicantForm({
                          applicantName: '',
                          relationWithOwner: 'स्वतः',
                          purpose: 'माहिती'
                        });
                      }}
                      className='bg-[#059669] hover:bg-[#065f46]'
                    >
                      New Search
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

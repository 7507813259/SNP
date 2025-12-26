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
  Lock
} from 'lucide-react';

interface UserData {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  aadhaar: string;
  pan: string;
  propertyId: string;
  address: string;
  propertyType: 'Residential' | 'Commercial' | 'Industrial';
  floor: string;
  area: number;
  owner: string;
  previousTax: number;
  currentTax: number;
  lateFee: number;
  totalPayable: number;
}

const dummyUsers: UserData[] = [
  {
    id: '1',
    fullName: 'राजेश कुमार शर्मा',
    mobile: '9876543210',
    email: 'rajesh.sharma@example.com',
    aadhaar: '1234-5678-9012',
    pan: 'ABCDE1234F',
    propertyId: 'NP-2023-0456',
    address: 'हाउस नंबर 45, गांधी रोड, शिवाजी नगर, नागपूर',
    propertyType: 'Residential',
    floor: '2nd Floor, Block B',
    area: 1200,
    owner: 'राजेश कुमार शर्मा',
    previousTax: 8500,
    currentTax: 9200,
    lateFee: 500,
    totalPayable: 9700
  },
  {
    id: '2',
    fullName: 'सुनिता देशपांडे',
    mobile: '8765432109',
    email: 'sunita.d@example.com',
    aadhaar: '2345-6789-0123',
    pan: 'BCDEF2345G',
    propertyId: 'NP-2023-0789',
    address: 'शॉप नंबर 12, मार्केट यार्ड, सिटी सेंटर, नागपूर',
    propertyType: 'Commercial',
    floor: 'Ground Floor',
    area: 800,
    owner: 'सुनिता देशपांडे',
    previousTax: 12500,
    currentTax: 13500,
    lateFee: 1200,
    totalPayable: 14700
  },
  {
    id: '3',
    fullName: 'अजय पाटील',
    mobile: '7654321098',
    email: 'ajay.patil@example.com',
    aadhaar: '3456-7890-1234',
    pan: 'CDEFG3456H',
    propertyId: 'NP-2023-1234',
    address: 'फैक्ट्री नंबर 5, औद्योगिक क्षेत्र, हिंगणा, नागपूर',
    propertyType: 'Industrial',
    floor: 'Complete Plot',
    area: 5000,
    owner: 'अजय पाटील & संजय पाटील',
    previousTax: 45000,
    currentTax: 48000,
    lateFee: 0,
    totalPayable: 48000
  },
  {
    id: '4',
    fullName: 'मीनाक्षी आपटे',
    mobile: '6543210987',
    email: 'meenakshi.apte@example.com',
    aadhaar: '4567-8901-2345',
    pan: 'DEFGH4567I',
    propertyId: 'NP-2023-1567',
    address: 'फ्लॅट नंबर 304, सह्याद्री सोसायटी, वरदानगर, नागपूर',
    propertyType: 'Residential',
    floor: '3rd Floor, Wing A',
    area: 950,
    owner: 'मीनाक्षी आपटे',
    previousTax: 7200,
    currentTax: 7800,
    lateFee: 300,
    totalPayable: 8100
  },
  {
    id: '5',
    fullName: 'विक्रम सिंह',
    mobile: '5432109876',
    email: 'vikram.singh@example.com',
    aadhaar: '5678-9012-3456',
    pan: 'EFGHI5678J',
    propertyId: 'NP-2023-1890',
    address: 'ऑफिस नंबर 45, ट्रेड सेंटर, सिविल लाइन्स, नागपूर',
    propertyType: 'Commercial',
    floor: '5th Floor',
    area: 1500,
    owner: 'विक्रम सिंह',
    previousTax: 21000,
    currentTax: 22500,
    lateFee: 1500,
    totalPayable: 24000
  }
];

export default function PropertyTaxPaymentPage() {
  const [step, setStep] = useState<
    'search' | 'form' | 'payment' | 'confirmation'
  >('search');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    aadhaar: '',
    pan: '',
    propertyId: '',
    address: '',
    propertyType: 'Residential' as 'Residential' | 'Commercial' | 'Industrial',
    floor: '',
    area: '',
    owner: '',
    paymentMethod: 'UPI',
    upiId: '',
    emailNotification: true,
    smsNotification: true
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    identityProof: false,
    ownershipProof: false,
    propertyMap: false,
    previousReceipt: false
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

  const handleDownloadReceipt = () => {
    // Create receipt data
    const receiptData = {
      transactionId: `NP-TX-${Date.now().toString().slice(-8)}`,
      receiptNumber: `RC-${Date.now().toString().slice(-10)}`,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN'),
      propertyId: formData.propertyId,
      ownerName: formData.fullName,
      propertyAddress: formData.address,
      propertyType: formData.propertyType,
      area: formData.area,
      previousTax: userData?.previousTax || 0,
      currentTax: taxDetails.currentTax,
      lateFee: taxDetails.lateFee,
      totalAmount: taxDetails.total,
      paymentMethod: formData.paymentMethod,
      paymentRef:
        formData.paymentMethod === 'UPI' ? formData.upiId : 'Completed'
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
          
          /* Receipt Styles */
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
          .receipt-info { 
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
          .total-section {
            background: #b01d4f;
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: center;
          }
          .total-amount {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
          }
          .success-badge {
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
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h1>नगर परिषद संपत्ती कर पावती</h1>
          <h2>Nagar Parishad Property Tax Receipt</h2>
        </div>
        
        <!-- Receipt Info -->
        <div class="receipt-info">
          <div class="detail-item">
            <span class="label">Receipt No:</span>
            <span class="value">${receiptData.receiptNumber}</span>
          </div>
          <div class="detail-item">
            <span class="label">Date:</span>
            <span class="value">${receiptData.date}</span>
          </div>
          <div class="detail-item">
            <span class="label">Transaction ID:</span>
            <span class="value">${receiptData.transactionId}</span>
          </div>
          <div class="detail-item">
            <span class="label">Time:</span>
            <span class="value">${receiptData.time}</span>
          </div>
        </div>
        
        <!-- Property Details -->
        <div class="section-title">PROPERTY DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Property ID:</span>
            <span class="value">${receiptData.propertyId}</span>
          </div>
          <div class="detail-item">
            <span class="label">Property Type:</span>
            <span class="value">${receiptData.propertyType}</span>
          </div>
          <div class="detail-item">
            <span class="label">Owner Name:</span>
            <span class="value">${receiptData.ownerName}</span>
          </div>
          <div class="detail-item">
            <span class="label">Area:</span>
            <span class="value">${receiptData.area} sq.ft</span>
          </div>
        </div>
        <div class="address">
          <span class="label">Property Address:</span><br>
          <span class="value">${receiptData.propertyAddress}</span>
        </div>
        
        <!-- Tax Details -->
        <div class="section-title">TAX DETAILS</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Previous Year Tax:</span>
            <span class="value">₹${receiptData.previousTax.toLocaleString('en-IN')}</span>
          </div>
          <div class="detail-item">
            <span class="label">Current Tax Amount:</span>
            <span class="value">₹${receiptData.currentTax.toLocaleString('en-IN')}</span>
          </div>
          <div class="detail-item">
            <span class="label">Late Fee/Penalty:</span>
            <span class="value">₹${receiptData.lateFee.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <!-- Total Amount -->
        <div class="total-section">
          <div>Total Payable Amount</div>
          <div class="total-amount">₹${receiptData.totalAmount.toLocaleString('en-IN')}</div>
          <div class="success-badge">PAYMENT SUCCESSFUL</div>
        </div>
        
        <!-- Payment Information -->
        <div class="section-title">PAYMENT INFORMATION</div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Payment Method:</span>
            <span class="value">${receiptData.paymentMethod}</span>
          </div>
          <div class="detail-item">
            <span class="label">Payment Reference:</span>
            <span class="value">${receiptData.paymentRef}</span>
          </div>
        </div>
        
        <!-- Notes -->
        <div class="notes">
          <div class="section-title">IMPORTANT NOTES</div>
          <div class="note-item">✓ This is a computer-generated receipt, valid without signature.</div>
          <div class="note-item">✓ Please preserve this receipt for future reference and tax filing.</div>
          <div class="note-item">✓ For any queries or discrepancies, contact Nagar Parishad office within 30 days.</div>
          <div class="note-item">✓ Keep this receipt for income tax deductions under Section 24(b).</div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div>Thank you for paying your taxes on time!</div>
          <div style="font-weight: bold; margin: 10px 0;">Nagar Parishad Tax Department</div>
          <div style="margin-top: 10px; font-size: 12px;">
            ग्राहक केंद्र: 1800-XXX-XXXX | ईमेल: tax@nagarpalika.gov.in<br>
            Office Hours: 10:00 AM - 6:00 PM (Mon-Sat)
          </div>
          <div style="margin-top: 15px; font-size: 11px; color: #999;">
            Generated electronically on ${receiptData.date} at ${receiptData.time}
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
            pdf.save(`Tax_Receipt_${receiptData.receiptNumber}.pdf`);

            // Safe cleanup
            if (iframe.parentNode === document.body) {
              document.body.removeChild(iframe);
            }

            alert(
              `Receipt downloaded successfully!\nFile: Tax_Receipt_${receiptData.receiptNumber}.pdf`
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
      const foundUser = dummyUsers.find((user) => {
        const userCleanAadhaar = user.aadhaar.replace(/-/g, '');
        // Show data only if at least first 4 digits match exactly
        return (
          cleanAadhaar.length >= 4 &&
          userCleanAadhaar.startsWith(cleanAadhaar.slice(0, 4))
        );
      });

      if (foundUser) {
        // Mask sensitive data for display
        const maskedUser = {
          ...foundUser,
          mobile: 'XXXXXX' + foundUser.mobile.slice(-4),
          email: foundUser.email.replace(/(?<=.).(?=.*@)/g, '*'),
          pan: foundUser.pan.slice(0, 2) + 'XXXXX' + foundUser.pan.slice(-1),
          aadhaar: 'XXXX-XXXX-' + foundUser.aadhaar.slice(-4)
        };

        setUserData(maskedUser);
        setFormData({
          fullName: foundUser.fullName,
          mobile: foundUser.mobile,
          email: foundUser.email,
          aadhaar: foundUser.aadhaar,
          pan: foundUser.pan,
          propertyId: foundUser.propertyId,
          address: foundUser.address,
          propertyType: foundUser.propertyType,
          floor: foundUser.floor,
          area: foundUser.area.toString(),
          owner: foundUser.owner,
          paymentMethod: 'UPI',
          upiId: `${foundUser.mobile.slice(-4)}@upi`,
          emailNotification: true,
          smsNotification: true
        });
        setStep('form');
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

  const handleFileUpload = (type: keyof typeof uploadedFiles) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));

    // Simulate upload delay
    setTimeout(() => {
      console.log(`${type} uploaded successfully`);
    }, 500);
  };

  const calculateTax = () => {
    if (!userData) return { currentTax: 0, lateFee: 0, total: 0 };

    const baseTax = userData.currentTax;
    const lateFee = userData.lateFee;
    return {
      currentTax: baseTax,
      lateFee: lateFee,
      total: baseTax + lateFee
    };
  };

  const handlePayment = () => {
    setLoading(true);

    // Simulate payment processing
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

  const taxDetails = calculateTax();

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
            <div className='rounded-md border border-blue-200 bg-blue-50 p-3'>
              <p className='text-sm text-blue-700'>
                💳 Demo card: Use any 16-digit number, valid future date, and
                any 3-digit CVV
              </p>
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
            <div className='rounded-md border border-green-200 bg-green-50 p-3'>
              <p className='text-sm text-green-700'>
                📱 Demo UPI: Use any valid format (e.g., 9876543210@upi,
                name@okbank)
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <Label htmlFor='paymentId' className='text-[#7a1e4f]'>
              {formData.paymentMethod === 'Wallet'
                ? 'Wallet ID/Number'
                : 'Payment ID'}
            </Label>
            <Input
              id='paymentId'
              name='paymentId'
              value={paymentDetails.walletId}
              onChange={(e) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  walletId: e.target.value
                }))
              }
              placeholder={
                formData.paymentMethod === 'Wallet'
                  ? 'Enter wallet ID or mobile number'
                  : 'Enter payment details'
              }
              className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
            />
          </div>
        );
    }
  };
  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8'>
      <div className='mx-auto max-w-full px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
            <ReceiptIndianRupee className='h-4 w-4 text-[#b01d4f]' />
            <span className='text-sm font-medium text-[#b01d4f]'>
              संपत्ती कर भरण
            </span>
          </div>

          <div className='mb-4 flex items-center justify-center gap-3'>
            <div className='rounded-full bg-[#b01d4f]/10 p-3'>
              <ReceiptIndianRupee className='h-8 w-8 text-[#b01d4f]' />
            </div>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                नगर परिषद संपत्ती कर भरण पोर्टल
              </h1>
              <p className='text-gray-600'>
                Nagar Parishad Property Tax Payment Portal
              </p>
            </div>
          </div>

          <div className='mt-4 inline-block rounded-lg border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-4'>
            <div className='flex items-center gap-2'>
              <Shield className='h-4 w-4 text-[#b01d4f]' />
              <p className='text-sm text-[#7a1e4f]'>
                <strong>सुरक्षा सूचना:</strong> आपली वैयक्तिक माहिती सुरक्षित
                आहे. आधार क्रमांक दिल्यानंतरच माहिती पूर्ण दिसेल.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className='mb-8 flex items-center justify-center'>
          <div className='flex items-center'>
            <div
              className={`flex items-center ${step === 'search' ? 'text-[#b01d4f]' : step === 'form' || step === 'payment' || step === 'confirmation' ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 'search' ? 'bg-[#b01d4f]/10' : step === 'form' || step === 'payment' || step === 'confirmation' ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
              >
                <Search className='h-5 w-5' />
              </div>
              <span className='ml-2 font-medium'>शोध</span>
            </div>
            <div
              className={`mx-4 h-1 w-24 ${step === 'form' || step === 'payment' || step === 'confirmation' ? 'bg-[#7a1e4f]' : 'bg-gray-300'}`}
            ></div>

            <div
              className={`flex items-center ${step === 'form' ? 'text-[#b01d4f]' : step === 'payment' || step === 'confirmation' ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 'form' ? 'bg-[#b01d4f]/10' : step === 'payment' || step === 'confirmation' ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
              >
                <User className='h-5 w-5' />
              </div>
              <span className='ml-2 font-medium'>माहिती</span>
            </div>
            <div
              className={`mx-4 h-1 w-24 ${step === 'payment' || step === 'confirmation' ? 'bg-[#7a1e4f]' : 'bg-gray-300'}`}
            ></div>

            <div
              className={`flex items-center ${step === 'payment' ? 'text-[#b01d4f]' : step === 'confirmation' ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 'payment' ? 'bg-[#b01d4f]/10' : step === 'confirmation' ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
              >
                <CreditCard className='h-5 w-5' />
              </div>
              <span className='ml-2 font-medium'>पेमेंट</span>
            </div>
            <div
              className={`mx-4 h-1 w-24 ${step === 'confirmation' ? 'bg-[#7a1e4f]' : 'bg-gray-300'}`}
            ></div>

            <div
              className={`flex items-center ${step === 'confirmation' ? 'text-[#7a1e4f]' : 'text-gray-400'}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step === 'confirmation' ? 'bg-[#7a1e4f]/10' : 'bg-gray-100'}`}
              >
                <CheckCircle className='h-5 w-5' />
              </div>
              <span className='ml-2 font-medium'>पूर्ण</span>
            </div>
          </div>
        </div>

        {/* Step 1: Aadhaar Search */}
        {step === 'search' && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <Search className='h-6 w-6' />
                Search Property Tax Records
              </CardTitle>
              <CardDescription>
                Enter your Aadhaar number to retrieve your property tax details
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

                {/* <div className='rounded-md border border-[#b01d4f]/20 bg-[#b01d4f]/5 p-4'>
                  <h4 className='mb-2 flex items-center gap-2 font-medium text-[#7a1e4f]'>
                    <Shield className='h-4 w-4' />
                    डेमो माहिती (Demo Information)
                  </h4>
                  <div className='space-y-1 text-sm text-[#7a1e4f]/80'>
                    <div className='flex justify-between'>
                      <span>राजेश शर्मा</span>
                      <span className='font-mono'>1234-XXXX-XXXX</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>सुनिता देशपांडे</span>
                      <span className='font-mono'>2345-XXXX-XXXX</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>अजय पाटील</span>
                      <span className='font-mono'>3456-XXXX-XXXX</span>
                    </div>
                    <div className='mt-2 text-xs text-[#7a1e4f]/60'>
                      नोंद: केवळ पहिले ४ अंक वापरा. संपूर्ण माहिती पूर्ण आधार
                      क्रमांक दिल्यानंतरच दिसेल.
                    </div>
                  </div>
                </div> */}

                {searchBlocked && (
                  <div className='rounded-md border border-red-200 bg-red-50 p-4'>
                    <p className='text-sm text-red-600'>
                      ⚠️ बहुत शोध प्रयत्न. कृपया ५ मिनिटांनंतर पुन्हा प्रयत्न
                      करा.
                    </p>
                  </div>
                )}
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
                    शोधा आणि माहिती भरा
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Form Details */}
        {step === 'form' && userData && (
          <div className='space-y-6'>
            <Card className='border-[#b01d4f]/20'>
              <CardHeader className='border-b border-[#b01d4f]/10'>
                <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                  <User className='h-6 w-6' />
                  वापरकर्ता आणि मालमत्ता माहिती
                </CardTitle>
                <CardDescription className='flex items-center gap-2'>
                  <Shield className='h-4 w-4 text-green-600' />
                  <span className='text-green-600'>
                    आधार क्रमांक सत्यापित: {userData.aadhaar}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='fullName' className='text-[#7a1e4f]'>
                      मालकाचे पूर्ण नाव
                    </Label>
                    <Input
                      id='fullName'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    />
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
                      ईमेल आयडी
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
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor='pan' className='text-[#7a1e4f]'>
                      पॅन क्रमांक
                    </Label>
                    <Input
                      id='pan'
                      name='pan'
                      value={formData.pan}
                      onChange={handleInputChange}
                      className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    />
                  </div>

                  <div>
                    <Label htmlFor='propertyId' className='text-[#7a1e4f]'>
                      मालमत्ता आयडी
                    </Label>
                    <Input
                      id='propertyId'
                      name='propertyId'
                      value={formData.propertyId}
                      onChange={handleInputChange}
                      className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <Label htmlFor='address' className='text-[#7a1e4f]'>
                      मालमत्तेचा पूर्ण पत्ता
                    </Label>
                    <Textarea
                      id='address'
                      name='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      className='mt-1 min-h-[100px] border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    />
                  </div>

                  <div>
                    <Label htmlFor='propertyType' className='text-[#7a1e4f]'>
                      मालमत्तेचा प्रकार
                    </Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) =>
                        handleSelectChange('propertyType', value)
                      }
                    >
                      <SelectTrigger className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                        <SelectValue placeholder='Select property type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value='Residential'
                          className='text-[#7a1e4f]'
                        >
                          Residential (निवासी)
                        </SelectItem>
                        <SelectItem
                          value='Commercial'
                          className='text-[#7a1e4f]'
                        >
                          Commercial (व्यावसायिक)
                        </SelectItem>
                        <SelectItem
                          value='Industrial'
                          className='text-[#7a1e4f]'
                        >
                          Industrial (औद्योगिक)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor='floor' className='text-[#7a1e4f]'>
                      मजला / ब्लॉक
                    </Label>
                    <Input
                      id='floor'
                      name='floor'
                      value={formData.floor}
                      onChange={handleInputChange}
                      className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    />
                  </div>

                  <div>
                    <Label htmlFor='area' className='text-[#7a1e4f]'>
                      क्षेत्रफळ (sq.ft)
                    </Label>
                    <Input
                      id='area'
                      name='area'
                      type='number'
                      value={formData.area}
                      onChange={handleInputChange}
                      className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    />
                  </div>

                  <div>
                    <Label htmlFor='owner' className='text-[#7a1e4f]'>
                      सध्याचे मालक / सह-मालक
                    </Label>
                    <Input
                      id='owner'
                      name='owner'
                      value={formData.owner}
                      onChange={handleInputChange}
                      className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Calculation Card */}
            <Card className='border-[#b01d4f]/20'>
              <CardHeader className='border-b border-[#b01d4f]/10'>
                <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                  <ReceiptIndianRupee className='h-6 w-6' />
                  कर गणना आणि पेमेंट
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between rounded-lg bg-[#b01d4f]/5 p-4'>
                      <div>
                        <p className='text-sm text-[#7a1e4f]'>
                          Previous Year Tax Paid
                        </p>
                        <p className='text-2xl font-bold text-[#b01d4f]'>
                          {formatCurrency(userData.previousTax)}
                        </p>
                      </div>
                      <FileText className='h-8 w-8 text-[#b01d4f]/40' />
                    </div>

                    <div className='flex items-center justify-between rounded-lg bg-[#b01d4f]/10 p-4'>
                      <div>
                        <p className='text-sm text-[#7a1e4f]'>
                          Current Tax Amount
                        </p>
                        <p className='text-2xl font-bold text-[#b01d4f]'>
                          {formatCurrency(taxDetails.currentTax)}
                        </p>
                      </div>
                      <ReceiptIndianRupee className='h-8 w-8 text-[#b01d4f]' />
                    </div>

                    <div className='flex items-center justify-between rounded-lg bg-red-50 p-4'>
                      <div>
                        <p className='text-sm text-[#7a1e4f]'>
                          Late Fee / Penalty
                        </p>
                        <p className='text-2xl font-bold text-red-700'>
                          {formatCurrency(taxDetails.lateFee)}
                        </p>
                      </div>
                      <span
                        className={`text-lg font-bold ${taxDetails.lateFee > 0 ? 'text-red-500' : 'text-green-500'}`}
                      >
                        {taxDetails.lateFee > 0 ? 'Overdue' : 'On Time'}
                      </span>
                    </div>

                    <div className='flex items-center justify-between rounded-lg border-2 border-[#7a1e4f]/30 bg-[#7a1e4f]/10 p-4'>
                      <div>
                        <p className='text-sm text-[#7a1e4f]'>
                          Total Payable Amount
                        </p>
                        <p className='text-3xl font-bold text-[#7a1e4f]'>
                          {formatCurrency(taxDetails.total)}
                        </p>
                      </div>
                      <ReceiptIndianRupee className='h-10 w-10 text-[#7a1e4f]' />
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='paymentMethod' className='text-[#7a1e4f]'>
                        पेमेंट पद्धत
                      </Label>
                      <Select
                        value={formData.paymentMethod}
                        onValueChange={(value) =>
                          handleSelectChange('paymentMethod', value)
                        }
                      >
                        <SelectTrigger className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'>
                          <SelectValue placeholder='Select payment method' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='UPI' className='text-[#7a1e4f]'>
                            UPI
                          </SelectItem>
                          <SelectItem
                            value='NetBanking'
                            className='text-[#7a1e4f]'
                          >
                            Net Banking
                          </SelectItem>
                          <SelectItem
                            value='CreditCard'
                            className='text-[#7a1e4f]'
                          >
                            Credit Card
                          </SelectItem>
                          <SelectItem
                            value='DebitCard'
                            className='text-[#7a1e4f]'
                          >
                            Debit Card
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor='upiId' className='text-[#7a1e4f]'>
                        {formData.paymentMethod === 'UPI'
                          ? 'UPI ID'
                          : formData.paymentMethod === 'NetBanking'
                            ? 'Bank Account Number'
                            : formData.paymentMethod === 'CreditCard'
                              ? 'Credit Card Number'
                              : formData.paymentMethod === 'DebitCard'
                                ? 'Debit Card Number'
                                : 'Wallet ID'}
                      </Label>
                      <Input
                        id='upiId'
                        name='upiId'
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className='mt-1 border-[#b01d4f]/20 focus:border-[#b01d4f]'
                        placeholder={
                          formData.paymentMethod === 'UPI'
                            ? 'mobile@upi'
                            : 'Enter details'
                        }
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-[#7a1e4f]'>Notifications</Label>
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
                          Email Notification (रसीद / notification साठी)
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
                          SMS Notification (OTP verification साठी)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Upload Card */}
            <Card className='border-[#b01d4f]/20'>
              <CardHeader className='border-b border-[#b01d4f]/10'>
                <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                  <Upload className='h-6 w-6' />
                  कागदपत्रे अपलोड
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.identityProof ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Identity Proof
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Aadhaar / PAN / Voter ID
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.identityProof ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('identityProof')}
                        className={
                          uploadedFiles.identityProof
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.identityProof ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.ownershipProof ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Ownership Proof
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Sale Deed / Mutation Certificate
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.ownershipProof ? 'outline' : 'default'
                        }
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
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.propertyMap ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Property Map / Layout Plan
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Optional, Nagar Parishad requirement
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.propertyMap ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('propertyMap')}
                        className={
                          uploadedFiles.propertyMap
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.propertyMap ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border-2 p-4 ${uploadedFiles.previousReceipt ? 'border-[#7a1e4f] bg-[#7a1e4f]/5' : 'border-[#b01d4f]/20 hover:border-[#b01d4f]'}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium text-[#7a1e4f]'>
                          Previous Tax Receipt
                        </h4>
                        <p className='text-sm text-[#7a1e4f]/80'>
                          Optional, verification
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant={
                          uploadedFiles.previousReceipt ? 'outline' : 'default'
                        }
                        onClick={() => handleFileUpload('previousReceipt')}
                        className={
                          uploadedFiles.previousReceipt
                            ? 'border-[#7a1e4f] text-[#7a1e4f]'
                            : 'bg-[#b01d4f] hover:bg-[#7a1e4f]'
                        }
                      >
                        {uploadedFiles.previousReceipt ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
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
                  onClick={() => setStep('payment')}
                  className='ml-auto bg-[#b01d4f] hover:bg-[#7a1e4f]'
                >
                  Proceed to Payment
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 'payment' && userData && (
          <Card className='mx-auto max-w-4xl border-[#b01d4f]/20'>
            <CardHeader className='border-b border-[#b01d4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#b01d4f]'>
                <CreditCard className='h-6 w-6' />
                Payment Processing
              </CardTitle>
              <CardDescription>
                Complete your payment for Property Tax
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                  <div className='mb-4 flex items-center justify-between'>
                    <h3 className='font-semibold text-[#7a1e4f]'>
                      Payment Summary
                    </h3>
                    <span className='font-mono text-sm text-[#b01d4f]'>
                      {formData.propertyId}
                    </span>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-[#7a1e4f]'>Property Owner</span>
                      <span className='font-medium text-[#b01d4f]'>
                        {formData.fullName}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#7a1e4f]'>Current Tax</span>
                      <span>{formatCurrency(taxDetails.currentTax)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-[#7a1e4f]'>Late Fee / Penalty</span>
                      <span
                        className={
                          taxDetails.lateFee > 0
                            ? 'text-red-600'
                            : 'text-green-600'
                        }
                      >
                        {formatCurrency(taxDetails.lateFee)}
                      </span>
                    </div>
                    <div className='flex justify-between border-t border-[#b01d4f]/20 pt-2'>
                      <span className='text-lg font-semibold text-[#7a1e4f]'>
                        Total Amount
                      </span>
                      <span className='text-2xl font-bold text-[#7a1e4f]'>
                        {formatCurrency(taxDetails.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-[#b01d4f]/30 bg-[#b01d4f]/10 p-4'>
                  <h4 className='mb-2 font-medium text-[#7a1e4f]'>
                    Selected Payment Method
                  </h4>
                  <div className='mb-4 flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-[#b01d4f]'>
                        {formData.paymentMethod}
                      </p>
                      {formData.paymentMethod === 'UPI' && (
                        <p className='text-sm text-[#7a1e4f]'>
                          {formData.upiId}
                        </p>
                      )}
                    </div>
                    <div className='rounded border border-[#b01d4f]/20 bg-white p-2'>
                      {formData.paymentMethod === 'UPI' && '📱'}
                      {formData.paymentMethod === 'NetBanking' && '🏦'}
                      {formData.paymentMethod === 'CreditCard' && '💳'}
                      {formData.paymentMethod === 'DebitCard' && '💳'}
                      {formData.paymentMethod === 'Wallet' && '👛'}
                    </div>
                  </div>

                  {/* Payment Details Form */}
                  <div className='mt-4'>{renderPaymentForm()}</div>
                </div>

                <div className='rounded-lg border-2 border-dashed border-[#b01d4f]/30 p-4 text-center'>
                  <div className='mb-4'>
                    <div className='mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-[#b01d4f]/10'>
                      <Lock className='h-8 w-8 text-[#b01d4f]' />
                    </div>
                    <p className='mb-2 font-medium text-[#7a1e4f]'>
                      Secure Payment Gateway
                    </p>
                    <p className='text-sm text-[#7a1e4f]/80'>
                      You will be redirected to a secure payment gateway
                    </p>
                  </div>
                  <div className='flex items-center justify-center gap-2 text-xs text-[#7a1e4f]/60'>
                    <Shield className='h-3 w-3' />
                    <span>256-bit SSL Encryption</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t border-[#b01d4f]/10 pt-6'>
              <Button
                variant='outline'
                onClick={() => setStep('form')}
                className='border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
              >
                Back to Details
              </Button>
              <Button
                onClick={handlePayment}
                disabled={loading}
                className='bg-[#7a1e4f] hover:bg-[#5a1639]'
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Processing Payment...
                  </>
                ) : (
                  <>Pay {formatCurrency(taxDetails.total)}</>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirmation' && userData && (
          <Card className='mx-auto max-w-4xl border-[#7a1e4f]/20'>
            <CardHeader className='border-b border-[#7a1e4f]/10'>
              <CardTitle className='flex items-center gap-2 text-[#7a1e4f]'>
                <CheckCircle className='h-8 w-8' />
                Payment Successful!
              </CardTitle>
              <CardDescription>
                Your property tax payment has been processed successfully
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <div className='space-y-6'>
                <div className='rounded-lg border border-[#7a1e4f]/20 bg-[#7a1e4f]/5 p-6 text-center'>
                  <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#7a1e4f]/10'>
                    <CheckCircle className='h-12 w-12 text-[#7a1e4f]' />
                  </div>
                  <h3 className='mb-2 text-2xl font-bold text-[#7a1e4f]'>
                    Payment Confirmed
                  </h3>
                  <p className='text-[#7a1e4f]/80'>
                    Transaction ID: NP-TX-{Date.now().toString().slice(-8)}
                  </p>
                  <p className='mt-4 text-3xl font-bold text-[#b01d4f]'>
                    {formatCurrency(taxDetails.total)}
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Property ID</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.propertyId}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Payment Date</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {new Date().toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Payment Method</p>
                    <p className='font-medium text-[#b01d4f]'>
                      {formData.paymentMethod}
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#b01d4f]/5 p-4'>
                    <p className='text-sm text-[#7a1e4f]'>Receipt Number</p>
                    <p className='font-medium text-[#b01d4f]'>
                      RC-{Date.now().toString().slice(-10)}
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
                      Digital receipt has been generated
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      {formData.emailNotification &&
                        `Email sent to ${formData.email.replace(/(?<=.).(?=.*@)/g, '*')}`}
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      {formData.smsNotification &&
                        `SMS sent to XXXXXX${formData.mobile.slice(-4)}`}
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Payment recorded in Nagar Parishad database
                    </li>
                    <li className='flex items-center gap-2'>
                      <CheckCircle className='h-3 w-3 text-green-600' />
                      Tax status updated for Financial Year 2023-24
                    </li>
                  </ul>
                </div>

                <div className='flex gap-4'>
                  <Button
                    variant='outline'
                    onClick={handleDownloadReceipt}
                    className='flex-1 border-[#b01d4f] text-[#b01d4f] hover:bg-[#b01d4f]/10'
                  >
                    <FileText className='mr-2 h-4 w-4' />
                    Download Receipt (PDF)
                  </Button>
                  <Button
                    onClick={() => {
                      setStep('search');
                      setUserData(null);
                      setAadhaarNumber('');
                      setFormData({
                        fullName: '',
                        mobile: '',
                        email: '',
                        aadhaar: '',
                        pan: '',
                        propertyId: '',
                        address: '',
                        propertyType: 'Residential',
                        floor: '',
                        area: '',
                        owner: '',
                        paymentMethod: 'UPI',
                        upiId: '',
                        emailNotification: true,
                        smsNotification: true
                      });
                      setUploadedFiles({
                        identityProof: false,
                        ownershipProof: false,
                        propertyMap: false,
                        previousReceipt: false
                      });
                      setPaymentDetails({
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
                    }}
                    className='flex-1 bg-[#b01d4f] hover:bg-[#7a1e4f]'
                  >
                    Make Another Payment
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

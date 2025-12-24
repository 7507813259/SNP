'use client'

import { useState } from 'react'
import { 
  FileText, 
  Download, 
  Calendar, 
  IndianRupee,
  Clock,
  Filter,
  Search,
  AlertCircle,
  Eye,
  Printer,
  Share2
} from 'lucide-react'
import { format } from 'date-fns'

export default function TendersPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const tenders = [
    {
      id: 'NP/TENDER/2024/001',
      title: 'स्वच्छता कंत्राटदार निवड',
      description: 'नगर परिषद क्षेत्रातील स्वच्छता कामासाठी कंत्राटदार निवड',
      department: 'स्वच्छता विभाग',
      estimatedAmount: '५०,००,०००',
      publishedDate: '2024-01-15',
      closingDate: '2024-02-15',
      status: 'active',
      category: 'service',
      documents: 3
    },
    {
      id: 'NP/TENDER/2024/002',
      title: 'नागरी हॉटेल बांधकाम',
      description: 'नवीन नागरी हॉटेल बांधकाम व देखभाल',
      department: 'बांधकाम विभाग',
      estimatedAmount: '२,००,००,०००',
      publishedDate: '2024-01-10',
      closingDate: '2024-02-10',
      status: 'active',
      category: 'construction',
      documents: 5
    },
    {
      id: 'NP/TENDER/2024/003',
      title: 'पाणीपुरवठा यंत्रसामग्री',
      description: 'पाणीपुरवठा प्रणालीसाठी यंत्रसामग्री खरेदी',
      department: 'पाणीपुरवठा विभाग',
      estimatedAmount: '७५,००,०००',
      publishedDate: '2024-01-05',
      closingDate: '2024-02-05',
      status: 'active',
      category: 'purchase',
      documents: 4
    },
    {
      id: 'NP/TENDER/2023/125',
      title: 'कचरा वाहतूक वाहने',
      description: 'कचरा वाहतुकीसाठी नवीन वाहने खरेदी',
      department: 'स्वच्छता विभाग',
      estimatedAmount: '१,५०,००,०००',
      publishedDate: '2023-12-20',
      closingDate: '2024-01-20',
      status: 'closed',
      category: 'purchase',
      documents: 6
    },
    {
      id: 'NP/TENDER/2023/124',
      title: 'स्ट्रीट लाइटिंग',
      description: 'नगरपरिषद क्षेत्रातील स्ट्रीट लाइटिंग सिस्टम',
      department: 'विद्युत विभाग',
      estimatedAmount: '८०,००,०००',
      publishedDate: '2023-12-15',
      closingDate: '2024-01-15',
      status: 'closed',
      category: 'service',
      documents: 3
    },
    {
      id: 'NP/TENDER/2024/004',
      title: 'सॉफ्टवेअर विकास',
      description: 'नगर परिषदेसाठी सॉफ्टवेअर विकास',
      department: 'आयटी विभाग',
      estimatedAmount: '३०,००,०००',
      publishedDate: '2024-01-18',
      closingDate: '2024-02-18',
      status: 'active',
      category: 'service',
      documents: 2
    },
  ]

  const filters = [
    { id: 'all', label: 'सर्व टेंडर' },
    { id: 'active', label: 'सक्रिय' },
    { id: 'closed', label: 'बंद' },
    { id: 'construction', label: 'बांधकाम' },
    { id: 'purchase', label: 'खरेदी' },
    { id: 'service', label: 'सेवा' },
  ]

  const filteredTenders = tenders.filter(tender => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'active') return tender.status === 'active'
    if (activeFilter === 'closed') return tender.status === 'closed'
    return tender.category === activeFilter
  })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-800 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">टेंडर</h1>
        <p className="text-xl text-green-100">
          शेगाव नगर परिषदेकडून जाहीर केलेले सर्व टेंडर
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">सक्रिय टेंडर</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">४</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">एकूण मूल्य</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">३.५५Cr</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <IndianRupee className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">बंद टेंडर</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">२</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Clock className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">सरासरी प्रतिसाद</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">१२</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">टेंडर सूची</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="टेंडर शोधा..."
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              <span>फिल्टर</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === filter.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Tenders List */}
        <div className="space-y-4">
          {filteredTenders.map((tender) => (
            <div
              key={tender.id}
              className="border border-gray-200 rounded-xl p-6 hover:border-green-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">{tender.id}</span>
                      <h3 className="text-xl font-semibold text-gray-800 mt-1">{tender.title}</h3>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      tender.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tender.status === 'active' ? 'सक्रिय' : 'बंद'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{tender.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FileText size={14} />
                      <span>{tender.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee size={14} />
                      <span>अंदाजित किंमत: ₹{tender.estimatedAmount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>प्रकाशन: {format(new Date(tender.publishedDate), 'dd/MM/yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>समाप्ती: {format(new Date(tender.closingDate), 'dd/MM/yyyy')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Download size={16} />
                    डाउनलोड
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Eye size={16} />
                    पहा
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 size={16} />
                    शेअर
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  {tender.category === 'construction' ? 'बांधकाम' : 
                   tender.category === 'purchase' ? 'खरेदी' : 'सेवा'}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                  {tender.documents} दस्तऐवज
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                  ई-टेंडर
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tender Process */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">टेंडर प्रक्रिया</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '१', title: 'टेंडर जाहीर', desc: 'वेबसाइटवर प्रकाशित' },
            { step: '२', title: 'दस्तऐवज डाउनलोड', desc: 'टेंडर दस्तऐवज' },
            { step: '३', title: 'प्रश्न विचारणे', desc: 'क्वेरी विंडो' },
            { step: '४', title: 'बोली सादर करणे', desc: 'ऑफलाइन/ऑनलाईन' },
            { step: '५', title: 'निवड प्रक्रिया', desc: 'तकनिकी आणि आर्थिक' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
        <div className="flex items-start gap-4">
          <AlertCircle className="text-amber-600 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">महत्वाची सूचना</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>सर्व बोली अर्ज निर्धारित तारखेपूर्वी मिळाले पाहिजेत.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>बोली अर्जासोबत ई.एम.डी. अपेक्षित आहे.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>तकनिकी आणि आर्थिक बोली वेगवेगळ्या सीलबंद लिफाफ्यात सादर करावी.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>अपूर्ण बोली अर्ज नाकारण्यात येतील.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Bell, AlertCircle, Calendar, FileText, Download, Megaphone, Clock, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

const SidebarNotifications = () => {
  const [activeTab, setActiveTab] = useState<'notices' | 'tenders' | 'circulars'>('notices')

  const notices = [
    {
      id: 1,
      title: 'पाणीपुरवठा बंद असलेल्या भागांसाठी सूचना',
      date: '2024-01-15',
      type: 'urgent',
      category: 'पाणीपुरवठा',
      description: 'उद्या सकाळी १० वाजेपासून दुपारी ४ वाजेपर्यंत पाणीपुरवठा बंद राहील.'
    },
    {
      id: 2,
      title: 'कर भरण्याची अंतिम मुदत वाढवणे',
      date: '2024-01-14',
      type: 'important',
      category: 'कर संग्रह',
      description: 'मालमत्ता कर भरण्याची अंतिम मुदत ३१ जानेवारी पर्यंत वाढवण्यात आली आहे.'
    },
    {
      id: 3,
      title: 'नवीन बस मार्ग सुरू करणे',
      date: '2024-01-13',
      type: 'info',
      category: 'परिवहन',
      description: 'शेगाव ते अकोला नवीन बस मार्ग सुरू करण्यात येत आहे.'
    },
    {
      id: 4,
      title: 'नागरी संमेलनाची सूचना',
      date: '2024-01-12',
      type: 'event',
      category: 'कार्यक्रम',
      description: '२० जानेवारी रोजी नागरी संमेलन आयोजित करण्यात येत आहे.'
    },
  ]

  const tenders = [
    {
      id: 1,
      title: 'स्वच्छता कंत्राटदार निवड',
      date: '2024-01-20',
      amount: '५० लाख',
      category: 'स्वच्छता'
    },
    {
      id: 2,
      title: 'नागरी हॉटेल बांधकाम',
      date: '2024-01-25',
      amount: '२ कोटी',
      category: 'बांधकाम'
    }
  ]

  const circulars = [
    {
      id: 1,
      title: 'नवीन नियमावली अंमलबजावणी',
      date: '2024-01-10',
      department: 'कायदा खाते'
    },
    {
      id: 2,
      title: 'कर्मचारी निवड प्रक्रिया',
      date: '2024-01-09',
      department: 'प्रशासन'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="text-red-500" size={16} />
      case 'important': return <AlertCircle className="text-orange-500" size={16} />
      case 'event': return <Calendar className="text-green-500" size={16} />
      default: return <Bell className="text-blue-500" size={16} />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone size={24} />
            <h2 className="text-xl font-bold">सूचना व जाहिराती</h2>
          </div>
          <Bell size={20} />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('notices')}
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'notices' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Bell size={16} />
              <span>सूचना</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tenders')}
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'tenders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={16} />
              <span>टेंडर</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('circulars')}
            className={`flex-1 py-3 text-center font-medium ${activeTab === 'circulars' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Download size={16} />
              <span>परिपत्रके</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {activeTab === 'notices' && (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(notice.type)}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      notice.type === 'urgent' ? 'bg-red-100 text-red-800' :
                      notice.type === 'important' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {notice.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock size={12} />
                    {format(new Date(notice.date), 'dd/MM/yyyy')}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{notice.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{notice.description}</p>
                <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-800">
                  अधिक वाचा
                  <ExternalLink size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tenders' && (
          <div className="space-y-4">
            {tenders.map((tender) => (
              <div key={tender.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {tender.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(tender.date), 'dd/MM')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{tender.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    अंदाजित किंमत: {tender.amount}
                  </span>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    डाउनलोड
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'circulars' && (
          <div className="space-y-4">
            {circulars.map((circular) => (
              <div key={circular.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                    {circular.department}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(circular.date), 'dd/MM')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{circular.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    परिपत्रक क्रमांक: NP/2024/{circular.id}
                  </span>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    पीडीएफ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-4 pt-4 border-t">
          <button className="w-full py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200">
            सर्व सूचना पहा
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">द्रुत दुवे</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">नागरी सेवा पोर्टल</span>
              <ExternalLink size={14} />
            </a>
            <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">ऑनलाईन कर भरणे</span>
              <ExternalLink size={14} />
            </a>
            <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <span className="text-sm">गुन्हा नोंदणी</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarNotifications
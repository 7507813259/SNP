'use client'

import { useState } from 'react'
import { 
  User, 
  Phone, 
  Mail, 
  Building2, 
  Search,
  Filter,
  Award,
  Calendar,
  FileText,
  ExternalLink
} from 'lucide-react'

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const departments = [
    { id: 'all', name: 'सर्व विभाग' },
    { id: 'administration', name: 'प्रशासन' },
    { id: 'tax', name: 'कर संग्रह' },
    { id: 'sanitation', name: 'स्वच्छता' },
    { id: 'water', name: 'पाणीपुरवठा' },
    { id: 'planning', name: 'योजना' },
    { id: 'legal', name: 'कायदा' },
    { id: 'it', name: 'आयटी' },
  ]

  const staffMembers = [
    {
      id: 1,
      name: 'श्री. रमेश पाटील',
      designation: 'महापौर',
      department: 'administration',
      email: 'mayor@shegaonnp.gov.in',
      phone: '02585-222200',
      extension: '100',
      room: 'कक्ष १०१',
      image: null,
      responsibilities: ['नगर परिषद प्रमुख', 'निर्णय समिती अध्यक्ष']
    },
    {
      id: 2,
      name: 'श्री. विजय कुमार',
      designation: 'मुख्य कार्यकारी अधिकारी',
      department: 'administration',
      email: 'ceo@shegaonnp.gov.in',
      phone: '02585-222201',
      extension: '101',
      room: 'कक्ष १०२',
      image: null,
      responsibilities: ['प्रशासकीय प्रमुख', 'विभाग समन्वय']
    },
    {
      id: 3,
      name: 'श्रीमती. सुनंदा जाधव',
      designation: 'कर अधिकारी',
      department: 'tax',
      email: 'tax.officer@shegaonnp.gov.in',
      phone: '02585-222202',
      extension: '102',
      room: 'कक्ष १०३',
      image: null,
      responsibilities: ['कर संग्रह', 'मालमत्ता कर']
    },
    {
      id: 4,
      name: 'श्री. संजय देशमुख',
      designation: 'अभियंता',
      department: 'water',
      email: 'engineer@shegaonnp.gov.in',
      phone: '02585-222203',
      extension: '103',
      room: 'कक्ष १०४',
      image: null,
      responsibilities: ['पाणीपुरवठा', 'बांधकाम देखरेख']
    },
    {
      id: 5,
      name: 'श्री. प्रवीण गायकवाड',
      designation: 'योजना अधिकारी',
      department: 'planning',
      email: 'planning@shegaonnp.gov.in',
      phone: '02585-222204',
      extension: '104',
      room: 'कक्ष १०५',
      image: null,
      responsibilities: ['योजना अंमलबजावणी', 'बजेट']
    },
    {
      id: 6,
      name: 'श्री. अजित पवार',
      designation: 'कायदा सल्लागार',
      department: 'legal',
      email: 'legal@shegaonnp.gov.in',
      phone: '02585-222205',
      extension: '105',
      room: 'कक्ष १०६',
      image: null,
      responsibilities: ['कायदेशीर मुद्दे', 'करार']
    },
    {
      id: 7,
      name: 'श्रीमती. मीना शर्मा',
      designation: 'आयटी अधिकारी',
      department: 'it',
      email: 'it@shegaonnp.gov.in',
      phone: '02585-222206',
      extension: '106',
      room: 'कक्ष १०७',
      image: null,
      responsibilities: ['तंत्रज्ञान', 'वेबसाइट']
    },
    {
      id: 8,
      name: 'श्री. राजेश कुमार',
      designation: 'स्वच्छता अधीक्षक',
      department: 'sanitation',
      email: 'sanitation@shegaonnp.gov.in',
      phone: '02585-222207',
      extension: '107',
      room: 'कक्ष १०८',
      image: null,
      responsibilities: ['स्वच्छता', 'कचरा व्यवस्थापन']
    },
  ]

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      administration: 'bg-blue-100 text-blue-800',
      tax: 'bg-green-100 text-green-800',
      sanitation: 'bg-yellow-100 text-yellow-800',
      water: 'bg-cyan-100 text-cyan-800',
      planning: 'bg-purple-100 text-purple-800',
      legal: 'bg-red-100 text-red-800',
      it: 'bg-indigo-100 text-indigo-800',
    }
    return colors[dept] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">अधिकारी व कर्मचारी</h1>
        <p className="text-xl text-purple-100">
          शेगाव नगर परिषदेतील सर्व अधिकाऱ्यांची संपूर्ण माहिती
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">एकूण कर्मचारी</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">२५०+</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">अधिकारी</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">३५</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Award className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">विभाग</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">८</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Building2 className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">नागरी सनद दर</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">९२%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FileText className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">कर्मचारी निर्देशिका</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="नाव, पद किंवा विभाग शोधा..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              <span>फिल्टर</span>
            </button>
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDepartment === dept.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {staff.name.charAt(0)}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{staff.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{staff.designation}</p>
                
                <div className="mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDepartmentColor(staff.department)}`}>
                    {departments.find(d => d.id === staff.department)?.name}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">फोन:</span>
                    <span className="font-medium">{staff.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">एक्सटेंशन:</span>
                    <span className="font-medium">{staff.extension}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">कक्ष:</span>
                    <span className="font-medium">{staff.room}</span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mt-4 pt-4 border-t w-full">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">जबाबदाऱ्या:</h4>
                  <ul className="space-y-1">
                    {staff.responsibilities.slice(0, 2).map((resp, idx) => (
                      <li key={idx} className="text-xs text-gray-600 text-left">• {resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 w-full">
                  <a
                    href={`mailto:${staff.email}`}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    <Mail size={14} />
                    ईमेल
                  </a>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    <ExternalLink size={14} />
                    पीडीएफ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizational Structure */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">संस्थात्मक रचना</h2>
        <div className="relative">
          {/* Top Level - Mayor */}
          <div className="flex justify-center mb-12">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl w-64 text-center">
              <h3 className="font-bold text-lg">महापौर</h3>
              <p className="text-sm opacity-90">श्री. रमेश पाटील</p>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex justify-center mb-8">
            <div className="h-8 w-0.5 bg-gray-300"></div>
          </div>

          {/* Second Level - CEO */}
          <div className="flex justify-center mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl w-64 text-center">
              <h3 className="font-bold text-lg">मुख्य कार्यकारी अधिकारी</h3>
              <p className="text-sm opacity-90">श्री. विजय कुमार</p>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex justify-center mb-8">
            <div className="h-8 w-0.5 bg-gray-300"></div>
          </div>

          {/* Third Level - Departments */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'कर संग्रह', head: 'श्रीमती. सुनंदा जाधव', color: 'from-green-500 to-green-700' },
              { name: 'स्वच्छता', head: 'श्री. राजेश कुमार', color: 'from-yellow-500 to-yellow-700' },
              { name: 'पाणीपुरवठा', head: 'श्री. संजय देशमुख', color: 'from-cyan-500 to-cyan-700' },
              { name: 'योजना', head: 'श्री. प्रवीण गायकवाड', color: 'from-purple-500 to-purple-700' },
            ].map((dept, index) => (
              <div key={index} className={`bg-gradient-to-r ${dept.color} text-white p-4 rounded-lg text-center`}>
                <h4 className="font-semibold">{dept.name}</h4>
                <p className="text-xs opacity-90 mt-1">{dept.head}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Working Hours and Availability */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" />
              कार्यालयीन वेळ
            </h3>
            <div className="bg-white p-4 rounded-lg">
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium">सोमवार ते शनिवार</span>
                  <span>सकाळी १० - संध्याकाळी ६</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">दुपारी विश्रांती</span>
                  <span>दुपारी १:३० - २:३०</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">रविवार</span>
                  <span className="text-red-600">सुट्टी</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">सार्वजनिक सुट्ट्या</span>
                  <span className="text-red-600">बंद</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Phone className="text-green-600" />
              संपर्क सुविधा
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-green-600" size={20} />
                  <span className="font-semibold">हेल्पलाइन</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">1800-123-456</p>
                <p className="text-sm text-gray-500 mt-1">24x7 उपलब्ध</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-blue-600" size={20} />
                  <span className="font-semibold">ईमेल</span>
                </div>
                <p className="text-gray-800">help@shegaonnp.gov.in</p>
                <p className="text-sm text-gray-500 mt-1">48 तासांत प्रतिसाद</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
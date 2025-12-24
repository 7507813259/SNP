'use client'

import { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Building2,
  User,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  })

  const [submitted, setSubmitted] = useState(false)

  const departments = [
    {
      name: 'प्रशासकीय विभाग',
      officer: 'श्री. रमेश पाटील',
      phone: '02585-222201',
      email: 'admin@shegaonnp.gov.in',
      location: 'कक्ष क्रमांक 101, पहिला मजला'
    },
    {
      name: 'कर संग्रह विभाग',
      officer: 'श्रीमती. सुनंदा जाधव',
      phone: '02585-222202',
      email: 'tax@shegaonnp.gov.in',
      location: 'कक्ष क्रमांक 102, पहिला मजला'
    },
    {
      name: 'स्वच्छता विभाग',
      officer: 'श्री. विजय शिंदे',
      phone: '02585-222203',
      email: 'sanitation@shegaonnp.gov.in',
      location: 'कक्ष क्रमांक 103, पहिला मजला'
    },
    {
      name: 'पाणीपुरवठा विभाग',
      officer: 'श्री. संजय देशमुख',
      phone: '02585-222204',
      email: 'water@shegaonnp.gov.in',
      location: 'कक्ष क्रमांक 104, पहिला मजला'
    },
    {
      name: 'योजना विभाग',
      officer: 'श्री. प्रवीण गायकवाड',
      phone: '02585-222205',
      email: 'planning@shegaonnp.gov.in',
      location: 'कक्ष क्रमांक 105, पहिला मजला'
    },
    {
      name: 'कायदा विभाग',
      officer: 'श्री. अजित पवार',
      phone: '02585-222206',
      email: 'legal@shegaonnp.gov.in',
      location: 'कक्ष क्रमांक 106, पहिला मजला'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: 'general'
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">संपर्क</h1>
        <p className="text-xl text-blue-100">
          शेगाव नगर परिषदेशी संपर्क साधण्यासाठी खालील माहिती वापरा
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Phone className="text-blue-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">फोन</h3>
          <p className="text-gray-600 mb-1">02585-222222</p>
          <p className="text-sm text-gray-500">हेल्पलाइन: 1800-123-456</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <Mail className="text-green-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">ईमेल</h3>
          <p className="text-gray-600 mb-1">shegaonnp@maharashtra.gov.in</p>
          <p className="text-sm text-gray-500">help@shegaonnp.gov.in</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
            <Clock className="text-orange-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">कार्यालयीन वेळ</h3>
          <p className="text-gray-600 mb-1">सोम-शनि: सकाळी १० - संध्याकाळी ६</p>
          <p className="text-sm text-gray-500">रविवार सुट्टी</p>
        </div>
      </div>

      {/* Address and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MapPin className="text-red-600" />
            पत्ता
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">मुख्य कार्यालय</h3>
              <p className="text-gray-600">
                नगर परिषद कार्यालय, मुख्य रस्ता,<br />
                शेगाव, जिल्हा बुलढाणा,<br />
                महाराष्ट्र - ४४३२०१
              </p>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">झोन कार्यालय</h3>
              <p className="text-gray-600">
                झोन कार्यालय, नवीन बस स्टेशन समोर,<br />
                शेगाव पश्चिम, बुलढाणा
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">संपर्क फॉर्म</h2>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle size={20} />
                <span className="font-medium">तुमचा संदेश यशस्वीरित्या पाठवला गेला आहे!</span>
              </div>
              <p className="text-green-600 text-sm mt-2">
                २४ तासांमध्ये तुमच्याशी संपर्क साधण्यात येईल.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    तुमचे नाव <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="तुमचे पूर्ण नाव"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    फोन नंबर <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="९८७६५४३२१०"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ईमेल <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  विषय <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="general">सामान्य प्रश्न</option>
                  <option value="complaint">तक्रार</option>
                  <option value="suggestion">सूचना</option>
                  <option value="service">सेवा संबंधित</option>
                  <option value="other">इतर</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  संदेश <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="तुमचा संदेश इथे लिहा..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                संदेश पाठवा
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Departments Contact */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Building2 className="text-purple-600" />
          विभागवार संपर्क
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              <h3 className="font-semibold text-gray-800 text-lg mb-3">{dept.name}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="text-gray-400 mt-0.5" size={16} />
                  <span className="text-gray-600 text-sm">{dept.officer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-400" size={16} />
                  <span className="text-gray-600 text-sm">{dept.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-gray-600 text-sm">{dept.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="text-gray-400 mt-0.5" size={16} />
                  <span className="text-gray-600 text-sm">{dept.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 border border-red-200">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-600" />
              आणीबाणी संपर्क
            </h2>
            <p className="text-gray-600 mb-6">
              आणीबाणीच्या परिस्थितीत खालील नंबरवर संपर्क साधा. या हेल्पलाइन २४x७ उपलब्ध आहेत.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'पोलिस', number: '100', desc: 'आणीबाणी पोलिस हेल्पलाइन' },
                { name: 'रुग्णवाहिका', number: '108', desc: 'वैद्यकीय आणीबाणी' },
                { name: 'अग्निशामक', number: '101', desc: 'अग्निशामक दल' },
                { name: 'महिला हेल्पलाइन', number: '1091', desc: 'महिला संरक्षण' },
              ].map((contact, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.desc}</p>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{contact.number}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
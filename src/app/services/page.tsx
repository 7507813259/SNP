import { 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Building,
  Home,
  User,
  Phone,
  Mail,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

export default function ServicesPage() {
  const onlineServices = [
    {
      title: 'मालमत्ता कर भरणे',
      description: 'ऑनलाईन मालमत्ता कर भरण्याची सुविधा',
      icon: '₹',
      time: '24x7',
      status: 'active',
      link: '#'
    },
    {
      title: 'जन्म प्रमाणपत्र',
      description: 'जन्म नोंदणी व प्रमाणपत्र मिळवा',
      icon: '👶',
      time: '3 कामकाजाचे दिवस',
      status: 'active',
      link: '#'
    },
    {
      title: 'मृत्यु प्रमाणपत्र',
      description: 'मृत्यू नोंदणी व प्रमाणपत्र',
      icon: '✝️',
      time: '3 कामकाजाचे दिवस',
      status: 'active',
      link: '#'
    },
    {
      title: 'ट्रेड लायसन्स',
      description: 'व्यापार परवाना अर्ज',
      icon: '🏪',
      time: '7 कामकाजाचे दिवस',
      status: 'active',
      link: '#'
    },
    {
      title: 'बांधकाम परवाना',
      description: 'इमारत बांधकाम परवाना',
      icon: '🏗️',
      time: '15 कामकाजाचे दिवस',
      status: 'active',
      link: '#'
    },
    {
      title: 'तक्रार नोंदणी',
      description: 'ऑनलाईन तक्रार सबमिट करा',
      icon: '📢',
      time: '24 तास',
      status: 'active',
      link: '#'
    },
    {
      title: 'आरटीआय अर्ज',
      description: 'माहिती हक्क अर्ज',
      icon: 'ℹ️',
      time: '30 दिवस',
      status: 'active',
      link: '#'
    },
    {
      title: 'पाणी कनेक्शन',
      description: 'नवीन पाणी कनेक्शन अर्ज',
      icon: '💧',
      time: '10 कामकाजाचे दिवस',
      status: 'active',
      link: '#'
    },
  ]

  const offlineServices = [
    {
      title: 'निवास प्रमाणपत्र',
      department: 'प्रशासकीय विभाग',
      location: 'कक्ष क्रमांक 101',
      officer: 'श्री. पाटील',
      contact: '02585-222201'
    },
    {
      title: 'आर्थिक सहाय्य',
      department: 'सामाजिक विभाग',
      location: 'कक्ष क्रमांक 102',
      officer: 'श्रीमती. देशमुख',
      contact: '02585-222202'
    },
    {
      title: 'लायसन्स नूतनीकरण',
      department: 'कर विभाग',
      location: 'कक्ष क्रमांक 103',
      officer: 'श्री. जाधव',
      contact: '02585-222203'
    },
    {
      title: 'अनुदान अर्ज',
      department: 'योजना विभाग',
      location: 'कक्ष क्रमांक 104',
      officer: 'श्री. शिंदे',
      contact: '02585-222204'
    },
  ]

  const documents = [
    'आधार कार्ड',
    'राहण्याचा पुरावा',
    'जुन्या कर पावत्या',
    'मालकी पुरावा',
    'पासपोर्ट आकाराचे फोटो',
    'सह्या प्रमाणपत्र'
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">नागरी सेवा</h1>
        <p className="text-xl text-blue-100">
          शेगाव नगर परिषदेकडून उपलब्ध असलेल्या सर्व सेवांची माहिती
        </p>
      </div>

      {/* Service Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ऑनलाईन सेवा</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">२४</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">सरासरी प्रतिसाद वेळ</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">३ दिवस</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ग्राहक समाधान</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">९२%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Online Services */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            ऑनलाईन सेवा
          </h2>
          <div className="text-sm text-gray-500">
            <CheckCircle className="inline mr-1 text-green-500" size={14} />
            सर्व सेवा सध्या सक्रिय आहेत
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {onlineServices.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{service.icon}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {service.status === 'active' ? 'सक्रिय' : 'निष्क्रीय'}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={12} />
                  {service.time}
                </div>
                <a href={service.link} className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center gap-1">
                  सेवा वापरा
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offline Services */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Building className="text-orange-600" />
          कार्यालयीन सेवा
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">सेवा</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">विभाग</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">स्थान</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">अधिकारी</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">संपर्क</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {offlineServices.map((service, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{service.title}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">{service.department}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">{service.location}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">{service.officer}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-gray-600">{service.contact}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">आवश्यक कागदपत्रे</h2>
            <p className="text-gray-600 mb-6">
              सेवा घेण्यासाठी खालील कागदपत्रे आवश्यक आहेत. कृपया अर्ज करण्यापूर्वी तयार करा.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                  <FileText className="text-blue-600" size={18} />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">मदत केंद्र</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="text-blue-600" size={16} />
                <span>हेल्पलाइन: 1800-123-456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-blue-600" size={16} />
                <span>help@shegaonnp.gov.in</span>
              </div>
              <div className="text-sm text-gray-500 mt-4">
                सोम-शनि: सकाळी १० ते संध्याकाळी ६
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Process */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">सेवा प्रक्रिया</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '१', title: 'अर्ज भरा', desc: 'ऑनलाईन फॉर्म भरा' },
            { step: '२', title: 'दस्तऐवज अपलोड', desc: 'आवश्यक कागदपत्रे' },
            { step: '३', title: 'फी भरणे', desc: 'ऑनलाईन पेमेंट' },
            { step: '४', title: 'प्रमाणपत्र मिळवा', desc: 'डिजिटल स्वरूपात' },
          ].map((item, index) => (
            <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
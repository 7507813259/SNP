import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin, Shield } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    'गोपनीयता धोरण',
    'साइट मॅप',
    'प्रशासकीय अहवाल',
    'नागरी सनद',
    'नोकरी',
    'पारदर्शकता'
  ]

  const departments = [
    'प्रशासकीय विभाग',
    'कर संग्रह विभाग',
    'स्वच्छता विभाग',
    'पाणीपुरवठा विभाग',
    'योजना विभाग',
    'कायदा विभाग'
  ]

  const services = [
    'जन्म नोंदणी',
    'मृत्यू प्रमाणपत्र',
    'मालमत्ता कर',
    'ट्रेड लायसन्स',
    'बांधकाम परवाना',
    'तक्रार नोंदणी'
  ]

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield />
              शेगांव नगर परिषद
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-blue-300" size={18} />
                <p className="text-gray-300">
                  नगर परिषद कार्यालय, मुख्य रस्ता,<br />
                  शेगांव, जिल्हा बुलढाणा,<br />
                  महाराष्ट्र - ४४३२०१
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-300" size={18} />
                <span className="text-gray-300">02585-222222</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-300" size={18} />
                <span className="text-gray-300">shegaonnp@maharashtra.gov.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">द्रुत दुवे</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-xl font-bold mb-4">विभाग</h3>
            <ul className="space-y-2">
              {departments.map((dept) => (
                <li key={dept}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {dept}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">सेवा</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-red-600 p-2 rounded-full hover:bg-red-700">
                <Youtube size={20} />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700">
                <Instagram size={20} />
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {new Date().getFullYear()} शेगांव नगर परिषद. सर्व हक्क राखीव.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                महाराष्ट्र शासनाच्या अधिकृत वेबसाइटशी संलग्न
              </p>
            </div>
          </div>
        </div>

        {/* Government Links */}
        <div className="mt-6 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white">महाराष्ट्र शासन</a>
            <span>•</span>
            <a href="#" className="hover:text-white">नगरविकास विभाग</a>
            <span>•</span>
            <a href="#" className="hover:text-white">डिजिटल इंडिया</a>
            <span>•</span>
            <a href="#" className="hover:text-white">मायगॉव महाराष्ट्र</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
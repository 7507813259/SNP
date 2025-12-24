import { 
  Home, 
  User, 
  Building2, 
  FileText, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  Search,
  Download,
  Bell
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const navItems = [
    { name: 'मुख्यपृष्ठ', href: '/', icon: Home },
    { name: 'अधिकारी व कर्मचारी', href: '/staff', icon: User },
    { name: 'विभाग', href: '/departments', icon: Building2 },
    { name: 'सेवा', href: '/services', icon: FileText },
    { name: 'नियमावली', href: '/rules', icon: FileText },
    { name: 'टेंडर', href: '/tenders', icon: Download },
    { name: 'संपर्क', href: '/contact', icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-sm">02585-222222</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-sm">shegaonnp@maharashtra.gov.in</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm hover:text-blue-200 flex items-center gap-1">
                <Bell size={16} />
                <span>अलर्ट</span>
              </button>
              <select className="bg-blue-900 text-white px-3 py-1 rounded text-sm">
                <option>मराठी</option>
                <option>English</option>
                <option>हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Building2 className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                शेगाव नगर परिषद
              </h1>
              <p className="text-gray-600">
                जिल्हा बुलढाणा, महाराष्ट्र शासन
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="सर्व्हिस शोधा..."
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="flex flex-wrap justify-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 group"
                >
                  <Icon size={18} className="group-hover:text-blue-600" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
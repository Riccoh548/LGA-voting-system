import {
  Wrench,
  Plug,
  Phone,
  Laptop,
  Clock,
  Shield,
  ChevronRight,
  MapPin,
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Wrench className="w-8 h-8 text-white absolute" />
                <Plug className="w-8 h-8 text-white rotate-45" />
              </div>
              <span className="text-white text-xl font-bold">RicoStylus</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-blue-200">
                Services
              </a>
              <a href="#about" className="text-white hover:text-blue-200">
                About
              </a>
              <a href="#contact" className="text-white hover:text-blue-200">
                Contact
              </a>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Tech Repair & Rental Made Simple
              </h1>
              <p className="mt-4 text-xl text-blue-100">
                Affordable gadget repairs and rentals for students and
                professionals
              </p>
              <button className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold flex items-center hover:bg-blue-50 transition-colors">
                Book a Repair <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
                alt="Tech Repair"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Phone className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone Repairs</h3>
              <p className="text-gray-600">
                Quick and reliable repairs for all smartphone brands
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Laptop className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Laptop Services</h3>
              <p className="text-gray-600">
                Hardware upgrades, repairs, and maintenance
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gadget Rentals</h3>
              <p className="text-gray-600">
                Short-term rentals for laptops and accessories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose RicoStylus
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Guaranteed Quality
                </h3>
                <p className="text-gray-600">
                  All repairs come with a 90-day warranty and satisfaction
                  guarantee
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
                <p className="text-gray-600">
                  Most repairs completed within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Visit Our Store
              </h2>
              <div className="flex items-start space-x-2">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-gray-600">
                  209 Block D, Magufuli hostel
                  <br />
                  Open Mon-Sat: 9AM - 7PM
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="relative">
                <Wrench className="w-6 h-6 text-white absolute" />
                <Plug className="w-6 h-6 text-white rotate-45" />
              </div>
              <span className="text-xl font-bold">RicoStylus</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 RicoStylus TechFix & Rent. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

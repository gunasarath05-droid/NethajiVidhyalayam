import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdPhone, MdEmail } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import logo from '../images/logo 512.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuItems = [
    { title: 'Home', path: '/' },
    {
      title: 'About Us',
      path: '/about',
      submenu: [
        { title: 'About', path: '/about' },
        { title: "Principal's Message", path: '/about/principal-message' },
        { title: 'History', path: '/about/history' },
      ],
    },
    {
      title: 'Admissions',
      path: '/admissions',
      submenu: [
        { title: 'Admission Enquiry', path: '/admissions/enquiry' },
        { title: 'Admissions Overview', path: '/admissions' },
        // { title: 'Fee Structure', path: '/admissions/fees' },
        { title: 'Faculty & Staff', path: '/admissions/faculty' },
      ],
    },
    {
      title: 'Academics',
      path: '/academics',
      submenu: [
        { title: 'Academics – Nursery', path: '/academics/nursery' },
        { title: 'Academics – Primary', path: '/academics/primary' },
        { title: 'Curriculum', path: '/academics/curriculum' },
      ],
    },
    { title: 'Facilities', path: '/facilities' },
    {
      title: 'Gallery & Events',
      path: '/gallery',
      submenu: [
        { title: 'Gallery', path: '/gallery' },
        { title: 'Events', path: '/events' },
      ],
    },
    { title: 'Career', path: '/career' },
    { title: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-6">
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <MdPhone size={16} /> +91 123 456 7890
            </a>
            <a href="mailto:info@nethajividyalayam.com" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <MdEmail size={16} /> info@nethajividyalayam.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-gray-200 transition-colors">Login</Link>
            <Link to="/pay-fees" className="hover:text-gray-200 transition-colors">FeeDesk</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            {/* Placeholder for Logo */}
            <img src={logo} alt="Netaji School" className="h-28 w-auto object-contain" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-secondary leading-tight">NETHAJI</span>
              <span className="text-xl font-semibold text-primary tracking-wider">VIDYALAYAM</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.submenu ? (
                  <button className="flex items-center px-3 py-2 text-secondary hover:text-primary font-medium transition-colors group-hover:text-primary">
                    {item.title}
                    <FaChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-3 py-2 text-secondary hover:text-primary font-medium transition-colors"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border-t-2 border-primary">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-100 last:border-0"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={toggleMenu}
      />

      {/* Mobile Side Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-5 border-b flex justify-between items-center">
          <span className="font-bold text-lg text-primary">Menu</span>
          <button onClick={toggleMenu} className="text-gray-500 hover:text-red-500">
            <MdClose size={24} />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-70px)] py-4">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    {item.title}
                    <FaChevronDown
                      size={14}
                      className={`transform transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  <div
                    className={`bg-gray-50 overflow-hidden transition-all duration-300 ${activeDropdown === index ? 'max-h-96' : 'max-h-0'
                      }`}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block px-10 py-3 text-sm text-gray-600 hover:text-primary transition-colors"
                        onClick={toggleMenu}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="block px-6 py-4 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

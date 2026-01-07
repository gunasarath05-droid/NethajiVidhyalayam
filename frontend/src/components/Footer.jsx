import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaChevronRight } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* School Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
                            About Us
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Nethaji Vidyalayam has been in the field of education for over two decades. With a rich experience in moulding the young generation, we provide quality education of international standard with modern technology and state-of-the-art facilities.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="flex items-center hover:text-primary transition-colors group">
                                    <FaChevronRight size={14} className="text-primary mr-2 group-hover:translate-x-1 transition-transform" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/admissions" className="flex items-center hover:text-primary transition-colors group">
                                    <FaChevronRight size={14} className="text-primary mr-2 group-hover:translate-x-1 transition-transform" />
                                    School Timing
                                </Link>
                            </li>
                            <li>
                                <Link to="/academics" className="flex items-center hover:text-primary transition-colors group">
                                    <FaChevronRight size={14} className="text-primary mr-2 group-hover:translate-x-1 transition-transform" />
                                    Uniform
                                </Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="flex items-center hover:text-primary transition-colors group">
                                    <FaChevronRight size={14} className="text-primary mr-2 group-hover:translate-x-1 transition-transform" />
                                    Attendance
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="flex items-center hover:text-primary transition-colors group">
                                    <FaChevronRight size={14} className="text-primary mr-2 group-hover:translate-x-1 transition-transform" />
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt size={20} className="text-primary mt-1 shrink-0" />
                                <span className="text-sm text-gray-400">
                                    10, 1st Main Rd, Babu Nagar,<br />
                                    Medavakkam, Chennai - 600100
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt size={20} className="text-primary shrink-0" />
                                <a href="tel:+919876543210" className="text-sm text-gray-400 hover:text-primary transition-colors">+91 98765 43210</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope size={20} className="text-primary shrink-0" />
                                <a href="mailto:info@nethajividyalayam.edu.in" className="text-sm text-gray-400 hover:text-primary transition-colors">info@nethajividyalayam.edu.in</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / Map Placeholder */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary">
                            Find Us
                        </h3>
                        <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-800 shadow-lg">
                            <iframe
                                src="https://www.google.com/maps?q=Nethaji+Vidyalayam+10,+1st+Main+Rd,+Babu+Nagar,+Medavakkam,+Chennai,+Tamil+Nadu+600100&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Nethaji Vidyalayam Map"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Nethaji Vidyalayam. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

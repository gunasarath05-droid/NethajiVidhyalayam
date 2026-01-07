import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane, FaUser, FaComment, FaArrowRight } from 'react-icons/fa';

import { API_BASE_URL } from '../api/config';

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact/messages/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Thank you! We will get back to you soon.');
                setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Connection error. Please check your internet.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: <FaPhoneAlt size={32} />,
            title: "Call Us Directly",
            primary: "+91 9445602389",
            secondary: "Mon-Fri, 8 AM - 4 PM",
            action: "Call Now",
            link: "tel:+919445602389",
            gradient: "from-green-400 to-green-600"
        },
        {
            icon: <FaEnvelope size={32} />,
            title: "Send an Email",
            primary: "netajividhyalayamschool@gmail.com",
            secondary: "24-hour response time",
            action: "Email Us",
            link: "mailto:netajividhyalayamschool@gmail.com",
            gradient: "from-blue-400 to-blue-600"
        },
        {
            icon: <FaMapMarkerAlt size={32} />,
            title: "Visit Campus",
            primary: "10, 1st Main Rd, Babu Nagar",
            secondary: "Medavakkam, Chennai - 600100",
            action: "Get Directions",
            link: "https://www.google.com/maps/dir/?api=1&destination=Nethaji+Vidyalayam,+10,+1st+Main+Rd,+Babu+Nagar,+Munusamy+Nagar,+Vimala+Nagar,+Medavakkam,+Chennai,+Tamil+Nadu+600100",
            gradient: "from-purple-400 to-purple-600"
        }
    ];

    return (
        <div className="font-sans bg-gray-50">
            {/* Centered Hero */}
            <section className="relative bg-gradient-to-br from-secondary via-primary to-purple-600 text-white py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
                        We're Here to Help
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Have questions about admissions, our curriculum, or campus life? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Method Cards */}
            <section className="py-12 -mt-20 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                                <div className={`bg-gradient-to-r ${method.gradient} p-8 text-white text-center`}>
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                                        {method.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{method.title}</h3>
                                </div>
                                <div className="p-8 text-center">
                                    <a href={method.link} className="block font-bold text-gray-900 mb-1 hover:text-primary transition-colors">
                                        {method.primary}
                                    </a>
                                    <p className="text-gray-500 text-sm mb-6">{method.secondary}</p>
                                    <a
                                        href={method.link}
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors"
                                    >
                                        {method.action} <FaArrowRight size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <FaComment className="mx-auto mb-4 text-primary" size={48} />
                        <h2 className="text-4xl font-bold text-secondary mb-4">Send Us a Message</h2>
                        <p className="text-gray-600 text-lg">Fill out the form and our team will respond within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                                    <FaUser size={18} className="text-primary" /> Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                                    <FaEnvelope size={18} className="text-primary" /> Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                                    <FaPhoneAlt size={18} className="text-primary" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                    placeholder="+91 12345 67890"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-3">Subject *</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                                >
                                    <option value="">Choose a topic</option>
                                    <option value="admissions">Admissions Inquiry</option>
                                    <option value="general">General Question</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                                <FaComment size={18} className="text-primary" /> Your Message *
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
                                placeholder="Tell us how we can help you..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-primary/50 text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Sending...' : <><FaPaperPlane size={22} /> Send Message</>}
                        </button>
                    </form>
                </div>
            </section>

            {/* Map with Overlay */}
            <section id="map" className="relative h-[600px] bg-gray-900">
                <iframe
                    src="https://maps.google.com/maps?q=Nethaji%20Vidyalayam,%2010,%201st%20Main%20Rd,%20Babu%20Nagar,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(30%)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="School Location"
                ></iframe>

                {/* Centered Info Card */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg pointer-events-auto">
                        <FaMapMarkerAlt className="mx-auto mb-4 text-primary" size={48} />
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Visit Our Campus</h3>
                        <p className="text-gray-600 mb-2 text-center"><strong>Nethaji Vidyalayam</strong></p>
                        <p className="text-gray-600 mb-6 text-center">10, 1st Main Rd, Babu Nagar, Medavakkam<br />Chennai - 600100, Tamil Nadu</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://www.google.com/maps/dir/?api=1&destination=Nethaji+Vidyalayam,+10,+1st+Main+Rd,+Babu+Nagar,+Munusamy+Nagar,+Vimala+Nagar,+Medavakkam,+Chennai,+Tamil+Nadu+600100"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl transition-all text-center"
                            >
                                Get Directions
                            </a>
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all">
                                Schedule Visit
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Hours Banner */}
            <section className="py-16 bg-secondary text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <FaClock className="mb-4" size={48} />
                            <h3 className="text-3xl font-bold mb-2">We're Open!</h3>
                            <p className="text-gray-300">Visit us during office hours or call for appointments.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 min-w-[300px]">
                            <div className="space-y-3 text-lg">
                                <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span>Mon - Fri</span>
                                    <span className="font-bold">8:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span>Saturday</span>
                                    <span className="font-bold">8:00 AM - 12:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-bold text-gray-400">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;

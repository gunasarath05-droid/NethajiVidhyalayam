import React, { useState, useEffect } from 'react';
import { Search, MapPin, ArrowRight, Sun, Moon, Facebook, Globe, Mail, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/logo 512.png';

const Poster = ({ onClose }) => {
    return (
        <div className="min-h-screen transition-colors duration-500 flex items-center justify-center p-4 md:p-8 lg:p-10 overflow-x-hidden font-sans ">

            {/* Wrapper for positioning */}
            <div className="relative w-full max-w-6xl z-10 mt-8">
                {/* Close Button - Outside */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 z-50 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-colors shadow-lg backdrop-blur-sm cursor-pointer border border-gray-200"
                    >
                        <X className="w-6 h-6 text-red-600" />
                    </button>
                )}

                {/* Main Container */}
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-200">
                    {/* Header Section */}
                    <header className="bg-white  px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 ">
                        <div className="flex items-center gap-2">
                            <Link to="/" onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-3xl shadow-lg shadow-orange-500/30">
                                <img src={logo} alt="NVS" />
                            </Link>
                            <div>
                                <h1 className="font-black text-xl text-primary tracking-tight leading-none uppercase">
                                    Nethaji Vidhyalayam
                                </h1>
                                <p className="text-[10px] font-bold text-gray-500 text-gray-400 tracking-widest uppercase mt-1">
                                    Est. 2001 | 25 Years of Excellence
                                </p>
                            </div>
                        </div>

                        <Link to="/contact" onClick={onClose} className="px-4 bg-gradient-to-r from-primary to-pink-600 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-orange-500/40 transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 active:scale-95">
                            Contact Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </header>

                    {/* Main Content Area */}
                    <main className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">

                        {/* Decorative Background Elements */}
                        <div className="absolute top-10 left-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 opacity-40 animate-pulse"></div>
                        <div className="absolute bottom-20 left-1/3 w-10 h-10 border-4 border-orange-500/10 rotate-12 rounded-xl"></div>

                        {/* Left Hero Section */}
                        <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                            <div className="mb-6">
                                <span className="bg-gradient-to-r from-orange-500 to-pink-600 text-white text-[10px] font-black px-5 py-2 rounded-tr-2xl rounded-bl-2xl uppercase tracking-[0.2em] shadow-lg">
                                    Vijaya Dhasami 2025
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1]">
                                ADMISSIONS <br />
                                <span className="text-orange-500">OPEN NOW</span>
                            </h2>

                            <div className="mb-10">
                                <div className="inline-flex items-center px-10 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-black text-xl tracking-widest bg-slate-50/50 dark:bg-white/5">
                                    PreKG TO 5<sup>th</sup>Grade
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-[2px] rounded-2xl shadow-xl shadow-orange-500/20">
                                    <div className="bg-white dark:bg-[#1e294b] px-6 py-3 rounded-[14px]">
                                        <p className="text-orange-600 dark:text-orange-400 font-black text-lg leading-tight">50% DISCOUNT</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter">On Tuition Fee</p>
                                    </div>
                                </div>
                                <div className="bg-secondary px-8 py-3 rounded-2xl shadow-xl shadow-secondary/20 flex items-center">
                                    <p className="text-white font-black text-sm uppercase tracking-widest">No Donation</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Event Card Section */}
                        <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex items-center justify-center bg-slate-50/50 dark:bg-black/20 relative z-10">
                            <div className="w-full max-w-sm bg-white dark:bg-[#252f50] rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5 group transition-all duration-500 hover:translate-y-[-10px]">

                                <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-10 text-center text-white relative">
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                    <p className="font-black tracking-[0.2em] text-xs mb-3 uppercase opacity-90">Special Initiation</p>
                                    <h3 className="text-3xl font-black tracking-tight">2 OCT, 10 AM</h3>

                                    {/* Decorative Notch */}
                                    <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white dark:bg-[#252f50]" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 50% 90%, 0% 0%)' }}></div>
                                </div>

                                <div className="p-10 pt-12 text-center">
                                    <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-1 tracking-tight">AKSHARABHYASAM</h4>
                                    <p className="text-slate-500 dark:text-gray-400 font-bold text-sm uppercase tracking-widest mb-8">Event Celebration</p>

                                    <div className="flex items-center justify-center gap-2 text-orange-500 mb-10 bg-orange-50 dark:bg-orange-500/10 py-3 rounded-xl">
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">Medavakkam, Chennai</span>
                                    </div>

                                    <Link to="/admissions/enquiry" onClick={onClose} className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-orange-500/40 transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 active:scale-95">
                                        Register Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-white px-8 py-6 flex flex-wrap justify-between items-center gap-4 border-t border-gray-100">
                        <div className="flex gap-8">
                            {[{ title: 'About', link: '/about' }, { title: 'Curriculum', link: '/academics/curriculum' }, { title: 'Facilities', link: '/facilities' }].map((item) => (
                                <Link key={item.title} to={item.link} onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors">
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Connect:</span>
                            <div className="flex gap-4 text-slate-400">
                                <Facebook className="w-4 h-4 cursor-pointer hover:text-orange-500" />
                                <Globe className="w-4 h-4 cursor-pointer hover:text-orange-500" />
                                <a href="mailto:nethajividhyalayam2016@gmail.com">
                                    <Mail className="w-4 h-4 cursor-pointer hover:text-orange-500" />
                                </a>
                                <a href="tel:+919444662737">
                                    <Phone className="w-4 h-4 cursor-pointer hover:text-orange-500" />
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Poster;
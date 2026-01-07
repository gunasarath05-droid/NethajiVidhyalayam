import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCalendarAlt, FaAward, FaChartLine, FaBuilding } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';

const History = () => {
    const [pageContent, setPageContent] = useState(null);
    const [milestones, setMilestones] = useState([]);

    const iconMap = {
        Calendar: <FaCalendarAlt size={24} />,
        Award: <FaAward size={24} />,
        TrendingUp: <FaChartLine size={24} />,
        Building: <FaBuilding size={24} />,
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchHistoryData = async () => {
            try {
                const [contentRes, milestonesRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/core/history-page-content/current/`),
                    fetch(`${API_BASE_URL}/api/core/milestones/`)
                ]);

                if (contentRes.ok) {
                    const data = await contentRes.json();
                    setPageContent(data);
                }

                if (milestonesRes.ok) {
                    const data = await milestonesRes.json();
                    setMilestones(data);
                }
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        };
        fetchHistoryData();
    }, []);

    return (
        <div className="font-sans bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-secondary/90 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-50"
                    style={{
                        backgroundImage: `url(${pageContent?.hero_image ? (pageContent.hero_image.startsWith('http') ? pageContent.hero_image : `${API_BASE_URL}${pageContent.hero_image}`) : 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`
                    }}
                ></div>
                <div className="relative z-20 container mx-auto px-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold tracking-wider mb-4 border border-white/30 uppercase">
                        {pageContent?.hero_subtitle || "EST. 2001"}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        {pageContent?.hero_title || "Our Journey"}
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-200 font-light">
                        {pageContent?.hero_description || "From a small classroom to a leading institution, explore the milestones that define our legacy."}
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 overflow-hidden">
                <div className="container mx-auto px-4 relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

                    <div className="space-y-24">
                        {(milestones.length > 0 ? milestones : [
                            {
                                year: "2001",
                                title: "The Inception",
                                description: "Nethaji Vidyalayam was founded with a humble vision: to provide quality education rooted in strong moral values.",
                                icon_name: "Building",
                                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            }
                        ]).map((item, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 relative ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Timeline Dot (Desktop) */}
                                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border-4 border-primary rounded-full z-10 hidden md:flex items-center justify-center shadow-lg">
                                    <div className="w-4 h-4 bg-secondary rounded-full"></div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2">
                                    <div className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-primary group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <span className="text-5xl font-bold text-gray-100 group-hover:text-primary/10 transition-colors duration-300">{item.year}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-secondary mb-3">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                                        <div className={`inline-flex items-center text-primary font-semibold ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                            <span className="p-2 bg-primary/10 rounded-lg mr-2">
                                                {iconMap[item.icon_name] || <FaBuilding size={24} />}
                                            </span>
                                            <span>Milestone Achieved</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="w-full md:w-1/2">
                                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-[300px]">
                                        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        <img
                                            src={item.image ? (item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`) : "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-secondary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">
                        {pageContent?.cta_title || "Be Part of Our Future"}
                    </h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
                        {pageContent?.cta_description || "The story of Nethaji Vidyalayam is still being written. Join us and help shape the next chapter of excellence."}
                    </p>
                    <Link
                        to="/admissions"
                        className="inline-flex items-center bg-white text-secondary font-bold px-10 py-4 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-lg"
                    >
                        Apply for Admission <FaArrowRight className="ml-2" size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default History;

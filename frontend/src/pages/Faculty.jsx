import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaGraduationCap, FaAward } from 'react-icons/fa';
import { API_BASE_URL } from '../api/config';

const Faculty = () => {
    const [pageContent, setPageContent] = useState(null);
    const [leadership, setLeadership] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [facultyMembers, setFacultyMembers] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const [contentRes, leadRes, deptRes, membersRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/faculty/page-content/current/`),
                    fetch(`${API_BASE_URL}/api/faculty/leadership/`),
                    fetch(`${API_BASE_URL}/api/faculty/departments/`),
                    fetch(`${API_BASE_URL}/api/faculty/members/`)
                ]);

                if (contentRes.ok) setPageContent(await contentRes.json());
                if (leadRes.ok) setLeadership(await leadRes.json());
                if (deptRes.ok) setDepartments(await deptRes.json());
                if (membersRes.ok) setFacultyMembers(await membersRes.json());
            } catch (error) {
                console.error("Error fetching faculty data:", error);
            }
        };
        fetchData();
    }, []);

    const iconMap = {
        GraduationCap: <FaGraduationCap size={16} className="mr-2 text-primary" />,
        Award: <FaAward size={14} className="mr-1" />
    };

    return (
        <div className="font-sans bg-gray-50">
            {/* Modern Minimal Hero */}
            <section className="bg-secondary text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h4 className="text-primary font-bold tracking-widest uppercase mb-4">
                        {pageContent?.hero_subtitle || "The Mentors"}
                    </h4>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        {pageContent?.hero_title || "Our Faculty"}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {pageContent?.hero_description || "Dedicated educators committed to nurturing the next generation of leaders with wisdom, compassion, and excellence."}
                    </p>
                </div>
            </section>

            {/* Leadership Cards - Dark Theme Contrast */}
            <section className="py-16 md:py-20 bg-white relative -mt-16 z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {(leadership?.length > 0 ? leadership : [
                            {
                                name: "Dr.K. PRAMILA", role: "Principal",
                                qualification: "M.Sc.,M.Phil.,Ph.d.",
                                message: "Empowering students to become global citizens through holistic education.",
                                img: "../images/DSC07211.JPG"
                            },
                        ]).map((leader, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row border-t-4 border-primary">
                                <div className="sm:w-2/5 h-64 sm:h-auto relative">
                                    <img
                                        src={leader?.image ? (leader.image.startsWith('http') ? leader.image : `${API_BASE_URL}${leader.image}`) : (leader?.img || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")}
                                        alt={leader?.name || "Leader"}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent sm:hidden"></div>
                                </div>
                                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-secondary mb-1">{leader?.name}</h3>
                                    <p className="text-primary font-bold uppercase text-sm tracking-wide mb-4">{leader?.role}</p>
                                    <p className="text-gray-600 italic mb-6">"{leader?.message}"</p>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        {iconMap.GraduationCap}
                                        {leader?.qualification}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academic Pillars & Faculty */}
            <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Departments & Educators</h4>
                        <h2 className="text-3xl font-bold text-secondary">Academic Pillars</h2>
                    </div>

                    {/* Departments Grid */}
                    {departments?.length > 0 && (
                        <div className="mb-20">
                            <h3 className="text-xl font-bold text-secondary mb-8 border-l-4 border-primary pl-4">Our Departments</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {departments.map((dept, index) => (
                                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={dept?.image ? (dept.image.startsWith('http') ? dept.image : `${API_BASE_URL}${dept.image}`) : (dept?.img || "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")}
                                                alt={dept?.head_name || "Department Head"}
                                                loading="lazy"
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">{dept?.name}</h3>
                                            <p className="text-primary text-sm font-medium mb-4">Head: {dept?.head_name}</p>
                                            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                                <span className="text-gray-500 text-sm flex items-center">
                                                    {iconMap.Award} Excellent
                                                </span>
                                                <span className="text-gray-400 text-xs">{dept?.members_count} Faculty Members</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Faculty Members Grid */}
                    {facultyMembers?.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-secondary mb-8 border-l-4 border-primary pl-4">Our Dedicated Faculty</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {facultyMembers.map((member, index) => (
                                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                        <div className="h-48 overflow-hidden relative bg-gray-100">
                                            <img
                                                src={member?.image ? (member.image.startsWith('http') ? member.image : `${API_BASE_URL}${member.image}`) : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                                                alt={member?.name || "Faculty Member"}
                                                loading="lazy"
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{member?.name}</h3>
                                            <p className="text-primary text-xs font-bold uppercase tracking-wider mb-3">{member?.role}</p>

                                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                                <div className="flex items-center text-gray-600 text-sm">
                                                    <FaGraduationCap size={14} className="mr-2 text-primary shrink-0" />
                                                    <span className="truncate">{member?.qualification}</span>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-xs italic">
                                                    <FaAward size={12} className="mr-2 text-primary shrink-0" />
                                                    <span>{member?.department}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Faculty;

import React, { useState, useEffect } from 'react';
import {
    FaUsers,
    FaComment,
    FaBriefcase,
    FaSignOutAlt,
    FaThLarge,
    FaPlus,
    FaTrash,
    FaEdit,
    FaCheckCircle,
    FaDownload,
    FaBars,
    FaTimes,
    FaCalendarAlt,
    FaFilter,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
    FaPrint
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminStaff = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Data States
    const [students, setStudents] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [careers, setCareers] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [events, setEvents] = useState([]);
    const [, setLoading] = useState(true);

    // Fetch Data
    const fetchData = async () => {
        try {
            setLoading(true);
            const [studentsRes, enquiriesRes, careersRes, contactRes, eventsRes] = await Promise.all([
                api.get('/administration/students/'),
                api.get('/admissions/inquiries/'),
                api.get('/contact/career-applications/'),
                api.get('/contact/messages/'),
                api.get('/events/events/')
            ]);
            setStudents(studentsRes.data);

            // Map Admission Inquiries to match fields expected by UI (name, email, phone, message)
            const mappedEnquiries = enquiriesRes.data.map(enq => ({
                id: enq.id,
                name: enq.student_name || 'Unknown',
                gender: enq.gender,
                email: enq.father_contact, // Use father contact as email placeholder or create a display field
                phone: enq.father_contact,
                date: enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'N/A', // Ensure date exists
                message: `Gender: ${enq.gender}, Class: ${enq.class_applied}, Father: ${enq.father_name}${enq.has_previous_schooling ? `, Prev School: ${enq.previous_school_name}, Prev Class: ${enq.previous_class}` : ''}`,
                status: enq.status || 'Pending' // Ensure status exists
            }));
            setEnquiries(mappedEnquiries);

            // Map Career Applications if needed, though they seem to have 'name'
            const mappedCareers = careersRes.data.map(job => {
                const positions = [];
                if (job.position) positions.push(job.position);

                return {
                    ...job,
                    positions_display: positions.join(', ') || 'N/A',
                    applied_date: job.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'
                };
            });
            setCareers(mappedCareers);

            setContactMessages(contactRes.data);
            setEvents(eventsRes?.data || []);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    // Student Filters
    const [studentSearch, setStudentSearch] = useState('');
    const [studentClass, setStudentClass] = useState('All');
    const [studentSection, setStudentSection] = useState('All');

    // Enquiry Filters
    const [enquiryStatus, setEnquiryStatus] = useState('All');
    const [enquiryDate, setEnquiryDate] = useState('');
    const [enquiryMonth, setEnquiryMonth] = useState('All');
    const [enquiryYear, setEnquiryYear] = useState('All');

    // Modals
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    // --- FILTER LOGIC ---
    const filteredStudents = students.filter(student => {
        const matchesSearch = (student.name || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
            student.student_id?.toLowerCase().includes(studentSearch.toLowerCase());
        const matchesClass = studentClass === 'All' || student.class_name === studentClass;
        const matchesSection = studentSection === 'All' || student.section === studentSection;
        return matchesSearch && matchesClass && matchesSection;
    });

    const filteredEnquiries = enquiries.filter(enq => {
        const matchesStatus = enquiryStatus === 'All' || enq.status === enquiryStatus;

        let matchesDate = true;
        if (enquiryDate) {
            matchesDate = enq.date === enquiryDate;
        } else {
            if (enq.date) {
                const [y, m] = enq.date.split('-');
                const matchesMonth = enquiryMonth === 'All' || parseInt(m) === parseInt(enquiryMonth);
                const matchesYear = enquiryYear === 'All' || y === enquiryYear;
                matchesDate = matchesMonth && matchesYear;
            }
        }
        return matchesStatus && matchesDate;
    });

    const uniqueClasses = ['All', ...new Set(students.map(s => s.class_name))].sort();
    const uniqueSections = ['All', ...new Set(students.map(s => s.section))].sort();
    const uniqueYears = ['All', '2023', '2024', '2025'];
    const months = [
        { val: 'All', label: 'Month: All' },
        { val: '01', label: 'January' }, { val: '02', label: 'February' }, { val: '03', label: 'March' },
        { val: '04', label: 'April' }, { val: '05', label: 'May' }, { val: '06', label: 'June' },
        { val: '07', label: 'July' }, { val: '08', label: 'August' }, { val: '09', label: 'September' },
        { val: '10', label: 'October' }, { val: '11', label: 'November' }, { val: '12', label: 'December' }
    ];

    // --- HANDLERS ---
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/login');
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.delete(`/administration/students/${id}/`);
                setStudents(students.filter(s => s.id !== id));
            } catch (error) {
                console.error("Failed to delete student", error);
                alert("Failed to delete student");
            }
        }
    };

    const handleSaveStudent = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Map form fields to backend model fields
        const studentData = {
            ...data,
            class_name: data.class,
            parent_name: data.parent,
            student_id: currentStudent ? currentStudent.student_id : `STU${Math.floor(Math.random() * 10000)}`
        };

        try {
            if (currentStudent) {
                const res = await api.put(`/administration/students/${currentStudent.id}/`, studentData);
                setStudents(students.map(s => s.id === currentStudent.id ? res.data : s));
            } else {
                const res = await api.post('/administration/students/', studentData);
                setStudents([...students, res.data]);
            }
            setIsStudentModalOpen(false);
            setCurrentStudent(null);
        } catch (error) {
            console.error("Failed to save student", error);
            alert("Failed to save student");
        }
    };

    const openStudentModal = (student = null) => {
        setCurrentStudent(student);
        setIsStudentModalOpen(true);
    };

    const handleResolveEnquiry = async (id) => {
        try {

            const res = await api.patch(`/admissions/inquiries/${id}/`, { status: 'Resolved' });
            setEnquiries(enquiries.map(e => e.id === id ? res.data : e));
        } catch (error) {
            console.error("Failed to resolve enquiry", error);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await api.delete(`/events/events/${id}/`);
                setEvents(events.filter(e => e.id !== id));
            } catch (error) {
                console.error("Failed to delete event", error);
                alert("Failed to delete event");
            }
        }
    };

    const handleSaveEvent = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Handle file input for image
        const imageFile = formData.get('image');
        if (imageFile.size === 0) {
            formData.delete('image');
        }

        try {
            if (currentEvent) {
                const res = await api.put(`/events/events/${currentEvent.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setEvents(events.map(ev => ev.id === currentEvent.id ? res.data : ev));
            } else {
                const res = await api.post('/events/events/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setEvents([...events, res.data]);
            }
            setIsEventModalOpen(false);
            setCurrentEvent(null);
        } catch (error) {
            console.error("Failed to save event", error);
            alert("Failed to save event");
        }
    };

    const openEventModal = (event = null) => {
        setCurrentEvent(event);
        setIsEventModalOpen(true);
    };

    const handlePrint = () => {
        window.print();
    };

    // --- COMPONENTS ---

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-6 py-4 transition-colors ${activeTab === id ? 'bg-[var(--color-secondary)] text-white border-r-4 border-[var(--color-primary)]' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </button>
    );

    const StatCard = ({ label, value, icon: Icon, color, onClick }) => (
        <div
            onClick={onClick}
            className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] group`}
        >
            <div className={`p-4 rounded-full ${color} text-white group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );

    const EnquiryCard = ({ enq }) => (
        <div className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${enq.status === 'Resolved' ? 'opacity-90' : ''}`}>
            <div className="flex flex-col md:flex-row min-h-[160px]">
                {/* Left: Contact Info */}
                <div className="p-6 md:w-[280px] lg:w-[320px] bg-gray-50/80 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center md:items-start text-center md:text-left justify-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${enq.status === 'Resolved' ? 'bg-green-500' : 'bg-orange-500'}`}></div>

                    <div className="flex items-center gap-4 mb-4 z-10 w-full justify-center md:justify-start">
                        <div className="w-12 h-12 bg-white text-[var(--color-primary)] border-2 border-[var(--color-primary)]/10 rounded-full flex items-center justify-center text-xl font-bold shadow-sm shrink-0">
                            {enq.name ? enq.name.charAt(0) : '?'}
                        </div>
                        <div className="overflow-hidden text-left">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-800 text-lg leading-tight truncate">{enq.name}</h3>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${enq.gender === 'Female' ? 'bg-pink-100 text-pink-600' : enq.gender === 'Male' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {enq.gender ? enq.gender.charAt(0) : '?'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-400 font-medium flex items-center mt-1">
                                <FaClock size={12} className="mr-1" /> {enq.date}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 w-full z-10 pl-1">
                        <div className="flex items-center justify-center md:justify-start text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                            <FaPhoneAlt size={14} className="mr-3 text-gray-600 font-semibold" />
                            <span className="font-semibold" title={enq.phone}>{enq.phone}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                            <FaEnvelope size={14} className="mr-3 text-gray-600" />
                            <span className="truncate font-semibold" title={enq.email}>{enq.email}</span>
                        </div>
                    </div>
                </div>

                {/* Middle: Message */}
                <div className="p-8 flex-1 flex flex-col justify-center relative bg-white">
                    <FaComment className="absolute top-6 left-6 text-gray-50 -z-0" size={80} />
                    <div className="relative z-10 pl-4 border-l-2 border-gray-100">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Enquiry Message</h4>
                        <p className="text-gray-700 leading-relaxed text-base font-medium">
                            "{enq.message}"
                        </p>
                    </div>
                </div>

                {/* Right: Actions & Status */}
                <div className="p-6 md:w-48 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 bg-gray-50/50 border-t md:border-t-0 md:border-l border-gray-100">
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${enq.status === 'Resolved' ? 'bg-green-100 text-green-700 ring-1 ring-green-200' : 'bg-orange-100 text-orange-700 ring-1 ring-orange-200 animate-pulse'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${enq.status === 'Resolved' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                        {enq.status}
                    </div>

                    {enq.status === 'Pending' ? (
                        <button
                            onClick={() => handleResolveEnquiry(enq.id)}
                            className="group md:w-full flex items-center justify-center gap-2 bg-white hover:bg-green-500 text-gray-600 hover:text-white px-4 py-2.5 rounded-xl border border-gray-200 hover:border-green-500 transition-all shadow-sm hover:shadow-md"
                            title="Mark as Resolved"
                        >
                            <FaCheckCircle size={18} className="text-green-500 group-hover:text-white transition-colors" />
                            <span className="font-bold text-sm">Resolve</span>
                        </button>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-green-500 opacity-80">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-1">
                                <FaCheckCircle size={24} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">Completed</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden no-print" onClick={() => setSidebarOpen(false)}></div>}

            {/* Sidebar (HIDDEN ON PRINT) */}
            <aside className={`fixed inset-y-0 left-0 bg-[var(--color-brand-navy)] w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col shadow-2xl no-print`}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-white">
                        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center font-bold">N</div>
                        <span className="text-lg font-bold tracking-wide">ADMIN PANEL</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400"><FaTimes size={24} /></button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <SidebarItem id="dashboard" icon={FaThLarge} label="Overview" />
                    <SidebarItem id="students" icon={FaUsers} label="Students" />
                    <SidebarItem id="enquiries" icon={FaComment} label="Admissions" />
                    <SidebarItem id="events" icon={FaCalendarAlt} label="Events" />
                    <SidebarItem id="careers" icon={FaBriefcase} label="Careers" />
                    <SidebarItem id="messages" icon={FaEnvelope} label="Contact Msgs" />
                </div>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center space-x-3 text-red-400 hover:text-red-300 px-4 py-2 w-full transition-colors">
                        <FaSignOutAlt size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col max-w-full overflow-hidden">
                {/* Header (HIDDEN ON PRINT) */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 z-10 no-print">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600"><FaBars size={24} /></button>
                    <div className="flex-1"></div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-800">Staff Admin</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold border-2 border-white shadow-sm">
                            SA
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 lg:p-8">

                    {/* --- DASHBOARD OVERVIEW --- */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in duration-500 no-print">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                                <p className="text-gray-500">Welcome back, here's what's happening today.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard label="Total Students" value={students.length} icon={FaUsers} color="bg-blue-500" onClick={() => setActiveTab('students')} />
                                <StatCard label="Admissions" value={enquiries.length} icon={FaComment} color="bg-orange-500" onClick={() => setActiveTab('enquiries')} />
                                <StatCard label="Events" value={events.length} icon={FaCalendarAlt} color="bg-green-500" onClick={() => setActiveTab('events')} />
                                <StatCard label="Career Apps" value={careers.length} icon={FaBriefcase} color="bg-purple-500" onClick={() => setActiveTab('careers')} />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Recent Enquiries Preview */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-bold text-gray-800">Recent Enquiries</h2>
                                        <button onClick={() => setActiveTab('enquiries')} className="text-sm text-[var(--color-primary)] font-medium hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-4">
                                        {enquiries.slice(0, 3).map(enq => (
                                            <div key={enq.id} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${enq.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                    {enq.name ? enq.name.charAt(0) : '?'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-bold text-gray-800 truncate">{enq.name}</h3>
                                                    <p className="text-xs text-gray-500 truncate mb-1">{enq.message}</p>
                                                    <div className="flex items-center text-[10px] text-gray-400">
                                                        <FaClock size={10} className="mr-1" /> {enq.date}
                                                    </div>
                                                </div>
                                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${enq.status === 'Resolved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    {enq.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Careers Preview */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-bold text-gray-800">Recent Applications</h2>
                                        <button onClick={() => setActiveTab('careers')} className="text-sm text-[var(--color-primary)] font-medium hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-4">
                                        {careers.slice(0, 3).map(job => (
                                            <div key={job.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                                                    <FaBriefcase size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-bold text-gray-800 truncate">{job.position || 'Unknown Role'}</h3>
                                                    <p className="text-xs text-gray-600 truncate">{job.name || 'Unknown Applicant'}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] text-gray-400 font-medium">{job.applied_date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- STUDENTS MANAGEMENT --- */}
                    {activeTab === 'students' && (
                        <div className="space-y-6 animate-in fade-in duration-500 no-print">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Students Directory</h1>
                                    <p className="text-gray-500">Manage student records and details.</p>
                                </div>
                                <button onClick={() => openStudentModal()} className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors shadow-md">
                                    <FaPlus size={18} className="mr-2" /> Add Student
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                                <div className="relative flex-1 w-full">
                                    <input type="text" placeholder="Search by Name or ID..." className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <select className="flex-1 md:w-32 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-gray-50" value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
                                        <option value="All">Class: All</option>
                                        {uniqueClasses.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <select className="flex-1 md:w-32 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-gray-50" value={studentSection} onChange={(e) => setStudentSection(e.target.value)}>
                                        <option value="All">Section: All</option>
                                        {uniqueSections.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            {/* Students Table */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                                <th className="p-4 font-semibold">ID</th>
                                                <th className="p-4 font-semibold">Name</th>
                                                <th className="p-4 font-semibold">Class</th>
                                                <th className="p-4 font-semibold">Parent</th>
                                                <th className="p-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredStudents.map(student => (
                                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-4 text-gray-600 font-medium text-sm">{student.student_id}</td>
                                                    <td className="p-4"><div className="font-bold text-gray-800">{student.name}</div><div className="text-xs text-gray-400">{student.email}</div></td>
                                                    <td className="p-4 text-gray-600"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">{student.class_name} - {student.section}</span></td>
                                                    <td className="p-4"><div className="text-sm text-gray-800">{student.parent_name}</div><div className="text-xs text-gray-500">{student.phone}</div></td>
                                                    <td className="p-4 text-right space-x-2">
                                                        <button onClick={() => openStudentModal(student)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEdit size={16} /></button>
                                                        <button onClick={() => handleDeleteStudent(student.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- ENQUIRIES SECTION --- */}
                    {activeTab === 'enquiries' && (
                        <div className="space-y-6 animate-in fade-in duration-500">

                            {/* Header (HIDDEN ON PRINT) */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4 no-print">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Enquiries</h1>
                                    <p className="text-gray-500">View and manage form submissions</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handlePrint}
                                        className="flex items-center px-4 py-2 bg-[var(--color-brand-navy)] text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm font-medium"
                                    >
                                        <FaPrint size={18} className="mr-2" />
                                        Print Enquiries
                                    </button>
                                </div>
                            </div>

                            {/* FILTERS (Aesthetics: Status Left, Date Right) */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
                                {/* Left Side: Status Filter */}
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="flex items-center text-gray-500 font-medium">
                                        <FaFilter size={18} className="mr-2" />
                                        <span className="hidden md:inline">Filter Status:</span>
                                    </div>
                                    <select
                                        className="flex-1 md:w-40 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-gray-50 font-medium text-gray-700"
                                        value={enquiryStatus}
                                        onChange={(e) => setEnquiryStatus(e.target.value)}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>

                                {/* Right Side: Date/Month Filters */}
                                <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
                                    <input
                                        type="date"
                                        className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-sm text-gray-600 shadow-sm"
                                        value={enquiryDate}
                                        onChange={(e) => { setEnquiryDate(e.target.value); if (e.target.value) { setEnquiryMonth('All'); setEnquiryYear('All'); } }}
                                    />
                                    <span className="text-gray-400 text-[10px] font-bold uppercase mx-1">OR</span>
                                    <select
                                        className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-gray-50 text-sm shadow-sm"
                                        value={enquiryMonth}
                                        onChange={(e) => { setEnquiryMonth(e.target.value); setEnquiryDate(''); }}
                                    >
                                        {months.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                                    </select>
                                    <select
                                        className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-gray-50 text-sm shadow-sm"
                                        value={enquiryYear}
                                        onChange={(e) => { setEnquiryYear(e.target.value); setEnquiryDate(''); }}
                                    >
                                        <option value="All">Year: All</option>
                                        {uniqueYears.filter(y => y !== 'All').map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>

                                    {(enquiryDate || enquiryMonth !== 'All' || enquiryYear !== 'All' || enquiryStatus !== 'All') && (
                                        <button
                                            onClick={() => { setEnquiryDate(''); setEnquiryMonth('All'); setEnquiryYear('All'); setEnquiryStatus('All'); }}
                                            className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors ml-2"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* CARDS LIST (HIDDEN ON PRINT) */}
                            <div className="grid grid-cols-1 gap-5 w-full mx-auto md:mx-0 print:hidden">
                                {filteredEnquiries.length > 0 ? (
                                    filteredEnquiries.map(enq => <EnquiryCard key={enq.id} enq={enq} />)
                                ) : (
                                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                                        <div className="mb-4 text-gray-300 flex justify-center"><FaComment size={48} /></div>
                                        <p className="text-gray-500 font-medium">No enquiries found matching your filters.</p>
                                        <button
                                            onClick={() => { setEnquiryDate(''); setEnquiryMonth('All'); setEnquiryYear('All'); setEnquiryStatus('All'); }}
                                            className="mt-4 text-[var(--color-primary)] hover:underline text-sm font-bold"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* --- PRINT ONLY REPORT TABLE --- */}
                            <div className="hidden print:block print:w-full">
                                <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
                                    <h1 className="text-3xl font-bold mb-2 text-[var(--color-brand-navy)]">NETHAJI VIDYALAYAM</h1>
                                    <p className="uppercase tracking-widest text-sm font-bold text-gray-600">Enquiry Report</p>
                                    <p className="text-xs text-gray-500 mt-1">Generated on: {new Date().toLocaleString()}</p>
                                </div>
                                {filteredEnquiries.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-gray-800 text-black">
                                                <th className="py-2 pr-4 text-sm font-bold uppercase">Date</th>
                                                <th className="py-2 pr-4 text-sm font-bold uppercase">Name</th>
                                                <th className="py-2 pr-4 text-sm font-bold uppercase">Gender</th>
                                                <th className="py-2 pr-4 text-sm font-bold uppercase">Phone</th>
                                                <th className="py-2 pr-4 text-sm font-bold uppercase">Email</th>
                                                <th className="py-2 text-sm font-bold uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEnquiries.map(enq => (
                                                <tr key={enq.id} className="border-b border-gray-300">
                                                    <td className="py-3 pr-4 text-sm text-gray-800">{enq.date}</td>
                                                    <td className="py-3 pr-4 text-sm font-semibold text-gray-900">{enq.name}</td>
                                                    <td className="py-3 pr-4 text-sm text-gray-800">{enq.gender}</td>
                                                    <td className="py-3 pr-4 text-sm text-gray-800">{enq.phone}</td>
                                                    <td className="py-3 pr-4 text-sm text-gray-800">{enq.email}</td>
                                                    <td className="py-3 pr-4 text-sm text-gray-800">
                                                        <span className={` ${enq.status === 'Resolved' ? 'text-green-700 font-bold' : 'text-orange-700 font-bold'}`}>
                                                            {enq.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center text-gray-500 italic mt-8">No matching enquiries found.</p>
                                )}
                                <div className="mt-8 pt-4 border-t border-gray-400 flex justify-between">
                                    <div className="text-xs text-gray-500">Confidential Report</div>
                                    <div className="text-xs text-gray-500">Page 1</div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* --- EVENTS MANAGEMENT --- */}
                    {activeTab === 'events' && (
                        <div className="space-y-6 animate-in fade-in duration-500 no-print">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Events Management</h1>
                                    <p className="text-gray-500">Manage school events and activities.</p>
                                </div>
                                <button onClick={() => openEventModal()} className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors shadow-md">
                                    <FaPlus size={18} className="mr-2" /> Add Event
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                                <th className="p-4 font-semibold">Date</th>
                                                <th className="p-4 font-semibold">Title</th>
                                                <th className="p-4 font-semibold">Category</th>
                                                <th className="p-4 font-semibold">Location</th>
                                                <th className="p-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {events.map(ev => (
                                                <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-4 text-gray-600 font-medium text-sm">
                                                        <div>{ev.date}</div>
                                                        <div className="text-xs text-gray-400">{ev.time}</div>
                                                    </td>
                                                    <td className="p-4 font-bold text-gray-800">{ev.title}</td>
                                                    <td className="p-4">
                                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold uppercase">{ev.category}</span>
                                                    </td>
                                                    <td className="p-4 text-gray-600 text-sm">{ev.location}</td>
                                                    <td className="p-4 text-right space-x-2">
                                                        <button onClick={() => openEventModal(ev)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEdit size={16} /></button>
                                                        <button onClick={() => handleDeleteEvent(ev.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {events.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="p-8 text-center text-gray-500">No events found. Add your first event!</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- CAREERS VIEW --- */}
                    {activeTab === 'careers' && (
                        <div className="space-y-6 animate-in fade-in duration-500 no-print">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
                                <p className="text-gray-500">Review received applications for open positions.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-semibold">Applicant Name</th>
                                            <th className="p-4 font-semibold">Position</th>
                                            <th className="p-4 font-semibold">Qualification</th>
                                            <th className="p-4 font-semibold">Prof. Degree</th>
                                            <th className="p-4 font-semibold">Applied Date</th>
                                            <th className="p-4 font-semibold text-right">Resume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {careers.map(job => (
                                            <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4"><div className="font-bold text-gray-800">{job.name}</div><div className="text-xs text-gray-400">{job.email}</div></td>
                                                <td className="p-4 text-gray-700 font-medium">{job.positions_display}</td>
                                                <td className="p-4 text-gray-600 text-sm">{job.qualification || 'N/A'}</td>
                                                <td className="p-4 text-gray-600 text-sm">{job.professional_degree || 'N/A'}</td>
                                                <td className="p-4 text-gray-500 text-sm">{job.applied_date}</td>
                                                <td className="p-4 text-right">
                                                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[var(--color-brand-navy)] transition-colors">
                                                        <FaDownload size={14} className="mr-2" /> Download
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    )}

                    {/* --- CONTACT MESSAGES VIEW --- */}
                    {activeTab === 'messages' && (
                        <div className="space-y-6 animate-in fade-in duration-500 no-print">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
                                <p className="text-gray-500">General inquiries and feedback from Contact Us page.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-semibold">Date</th>
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">Subject</th>
                                            <th className="p-4 font-semibold">Message</th>
                                            <th className="p-4 font-semibold text-right">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {contactMessages.map(msg => (
                                            <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 text-gray-500 text-sm">{new Date(msg.created_at).toLocaleDateString()}</td>
                                                <td className="p-4 font-bold text-gray-800">{msg.name}</td>
                                                <td className="p-4 text-gray-700">
                                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold uppercase">{msg.subject}</span>
                                                </td>
                                                <td className="p-4 text-gray-600 text-sm max-w-xs truncate" title={msg.message}>{msg.message}</td>
                                                <td className="p-4 text-right">
                                                    <div className="text-sm text-gray-800">{msg.email}</div>
                                                    <div className="text-xs text-gray-500">{msg.phone}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Student Add/Edit Modal (NO PRINT) */}
            {isStudentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">{currentStudent ? 'Edit Student' : 'Add New Student'}</h2>
                            <button onClick={() => setIsStudentModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={24} /></button>
                        </div>
                        <form onSubmit={handleSaveStudent} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label><input name="name" defaultValue={currentStudent?.name} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-bold text-gray-700 mb-1">Email</label><input name="email" type="email" defaultValue={currentStudent?.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-bold text-gray-700 mb-1">Class</label><input name="class" defaultValue={currentStudent?.class_name} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-bold text-gray-700 mb-1">Section</label><input name="section" defaultValue={currentStudent?.section} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-bold text-gray-700 mb-1">Parent</label><input name="parent" defaultValue={currentStudent?.parent_name} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                                <div><label className="block text-sm font-bold text-gray-700 mb-1">Phone</label><input name="phone" defaultValue={currentStudent?.phone} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                            </div>
                            <div className="pt-4 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsStudentModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg font-bold">Save Student</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Event Add/Edit Modal (NO PRINT) */}
            {
                isEventModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h2 className="text-xl font-bold text-gray-800">{currentEvent ? 'Edit Event' : 'Add New Event'}</h2>
                                <button onClick={() => setIsEventModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FaTimes size={24} /></button>
                            </div>
                            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Event Title</label><input name="title" defaultValue={currentEvent?.title} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Date</label><input name="date" type="date" defaultValue={currentEvent?.date} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Time</label><input name="time" type="time" defaultValue={currentEvent?.time} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                        <select name="category" defaultValue={currentEvent?.category || 'Academic'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                                            <option value="Academic">Academic</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Cultural">Cultural</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Celebration">Celebration</option>
                                        </select>
                                    </div>
                                    <div><label className="block text-sm font-bold text-gray-700 mb-1">Location</label><input name="location" defaultValue={currentEvent?.location} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                    <textarea name="description" rows="4" defaultValue={currentEvent?.description} required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Event Image</label>
                                    {currentEvent?.image && <div className="text-xs text-gray-500 mb-2">Current: {currentEvent.image}</div>}
                                    <input name="image" type="file" accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 mt-4">
                                    <button type="button" onClick={() => setIsEventModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg font-bold">Save Event</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminStaff;

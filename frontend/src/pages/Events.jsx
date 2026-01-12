import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight, FaTimes, FaFilter } from 'react-icons/fa';
import api from '../api/config';
import { API_BASE_URL } from '../api/config';

const CATEGORIES = ["All", "Academic", "Sports", "Cultural", "Workshop", "Celebration"];

const Events = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await api.get('/events/events/');
                const mappedEvents = response.data.map(e => ({
                    ...e,
                    category: e.category || 'General' // Fallback
                }));
                setEvents(mappedEvents);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = selectedCategory === "All"
        ? events
        : events.filter(event => event.category === selectedCategory);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">

            {/* Hero Section */}
            <div className="relativePath relative h-[400px] bg-[var(--color-brand-navy)] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                    src="../src/images/C0475T01.JPG"
                    alt="Events Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-white backdrop-blur-sm text-lg font-semibold mb-4 animate-slide-up">
                        Nethaji Vedhyalayam
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif tracking-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
                        Upcoming Events
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl animate-slide-up opacity-90" style={{ animationDelay: '200ms' }}>
                        Join us in celebrating academics, sports, and culture. Stay updated with all the happenings at our campus.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-lg p-4 mb-10 overflow-x-auto">
                    <div className="flex items-center space-x-2 min-w-max">
                        <div className="flex items-center text-gray-400 mr-4 border-r border-gray-200 pr-4">
                            <FaFilter size={20} />
                            <span className="ml-2 text-sm font-medium">Filter by:</span>
                        </div>
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                            px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                            ${selectedCategory === category
                                        ? 'bg-[var(--color-brand-navy)] text-white shadow-md'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary)]'}
                        `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading events...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col"
                            >
                                {/* Event Image */}
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={event.image ? (event.image.startsWith('http') ? event.image : `${API_BASE_URL}${event.image}`) : 'https://via.placeholder.com/400x300'}
                                        alt={event.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-sm text-center min-w-[70px]">
                                        <p className="text-xs font-bold text-gray-500 uppercase">
                                            {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                        </p>
                                        <p className="text-xl font-bold text-[var(--color-brand-navy)] leading-none mt-1">
                                            {new Date(event.date).getDate()}
                                        </p>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full shadow-sm">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start text-gray-600 text-sm">
                                            <FaClock className="w-4 h-4 mr-3 mt-0.5 text-[var(--color-primary)]" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-start text-gray-600 text-sm">
                                            <FaMapMarkerAlt className="w-4 h-4 mr-3 mt-0.5 text-[var(--color-primary)]" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {event.description}
                                    </p>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => setSelectedEvent(event)}
                                            className="w-full py-3 px-4 bg-gray-50 hover:bg-[var(--color-brand-navy)] hover:text-white text-[var(--color-brand-navy)] font-semibold rounded-xl transition-all duration-300 flex items-center justify-center group/btn"
                                        >
                                            View Details
                                            <FaArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredEvents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No events found in this category.</p>
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className="mt-4 text-[var(--color-primary)] font-medium hover:underline"
                        >
                            View all events
                        </button>
                    </div>
                )}

            </div>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in slide-in-from-bottom-10 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white z-10 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="h-64 md:h-full relative">
                                <img
                                    src={selectedEvent.image ? (selectedEvent.image.startsWith('http') ? selectedEvent.image : `${API_BASE_URL}${selectedEvent.image}`) : 'https://via.placeholder.com/400x300'}
                                    alt={selectedEvent.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                                <div className="absolute bottom-4 left-4 right-4 md:hidden text-white">
                                    <span className="inline-block px-3 py-1 bg-[var(--color-primary)] text-xs font-bold rounded-full mb-2">
                                        {selectedEvent.category}
                                    </span>
                                    <h2 className="text-2xl font-bold leading-tight">{selectedEvent.title}</h2>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 bg-white">
                                <div className="hidden md:block mb-6">
                                    <span className="inline-block px-3 py-1 bg-blue-50 text-[var(--color-brand-navy)] text-xs font-bold rounded-full tracking-wide">
                                        {selectedEvent.category}
                                    </span>
                                </div>

                                <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-6 leading-tight">
                                    {selectedEvent.title}
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-4 text-[var(--color-primary)]">
                                            <FaCalendarAlt size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Date</p>
                                            <p className="font-medium">
                                                {new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4 text-[var(--color-brand-navy)]">
                                            <FaClock size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Time</p>
                                            <p className="font-medium">{selectedEvent.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-4 text-green-600">
                                            <FaMapMarkerAlt size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                                            <p className="font-medium">{selectedEvent.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-blue text-gray-600 mb-8">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">About Event</h4>
                                    <p className="leading-relaxed">
                                        {selectedEvent.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Events;

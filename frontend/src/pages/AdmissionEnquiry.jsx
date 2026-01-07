import React, { useEffect, useState } from 'react';
import { FaPen, FaUser, FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt, FaBriefcase, FaSchool, FaSpinner, FaCheckCircle, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';

const AdmissionEnquiry = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        student_name: '',
        gender: '',
        class_applied: '',
        date_of_birth: '',
        age_completed: '',
        father_name: '',
        father_occupation: '',
        father_contact: '',
        mother_name: '',
        mother_occupation: '',
        mother_contact: '',
        address: '',
        has_previous_schooling: false,
        previous_school_name: '',
        previous_class: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRadioChange = (val) => {
        setFormData(prev => ({
            ...prev,
            has_previous_schooling: val,
            previous_school_name: val ? prev.previous_school_name : '',
            previous_class: val ? prev.previous_class : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions/inquiries/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({
                    student_name: '',
                    gender: '',
                    class_applied: '',
                    date_of_birth: '',
                    age_completed: '',
                    father_name: '',
                    father_occupation: '',
                    father_contact: '',
                    mother_name: '',
                    mother_occupation: '',
                    mother_contact: '',
                    address: '',
                    has_previous_schooling: false,
                    previous_school_name: '',
                    previous_class: ''
                });
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            alert("Connection error. Please check your internet.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="font-sans bg-gray-50 min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full transform transition-all animate-fade-in-up">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FaCheckCircle size={64} />
                    </div>
                    <h2 className="text-4xl font-bold text-secondary mb-4">Application Sent!</h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Thank you for your interest in Nethaji Vidyalayam. Our admissions team has received your enquiry and will contact you within 24-48 working hours.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-primary/40 transition-all"
                    >
                        Send Another Enquiry
                    </button>
                    <Link to="/" className="block mt-6 text-primary font-bold hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[300px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544531696-297f0a8a927d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
                <div className="absolute inset-0 bg-secondary/80 z-10" />
                <div className="relative z-20 container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Enquiry</h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200">Start your child's journey with Nethaji Vidyalayam.</p>
                </div>
            </section>

            {/* Admission Form */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-8 border-secondary">
                        <div className="flex items-center gap-3 mb-8 text-secondary">
                            <FaPen size={32} />
                            <h2 className="text-3xl font-bold text-primary">Admission Application Form</h2>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {/* Student Details */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                    <FaUser size={20} className="text-primary" /> Student Details
                                </h3>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Name of the Student</label>
                                    <input
                                        type="text"
                                        name="student_name"
                                        required
                                        value={formData.student_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                        placeholder="Enter student's full name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Gender <span className="text-red-500">*</span></label>
                                        <div className="flex gap-6 py-2">
                                            {['Male', 'Female', 'Other'].map((option) => (
                                                <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={option}
                                                        checked={formData.gender === option}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-5 h-5 text-secondary focus:ring-secondary border-gray-300"
                                                    />
                                                    <span className="text-gray-700 group-hover:text-secondary transition-colors">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Class Applied for</label>
                                        <select
                                            name="class_applied"
                                            required
                                            value={formData.class_applied}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                        >
                                            <option value="">Select Class</option>
                                            <option value="Pre-KG">Pre-KG</option>
                                            <option value="LKG">LKG</option>
                                            <option value="UKG">UKG</option>
                                            <option value="Grade 1">Grade 1</option>
                                            <option value="Grade 2">Grade 2</option>
                                            <option value="Grade 3">Grade 3</option>
                                            <option value="Grade 4">Grade 4</option>
                                            <option value="Grade 5">Grade 5</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Date of Birth (DOB) <span className="text-red-500">*</span></label>
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            required
                                            value={formData.date_of_birth}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Age Completed as on Date</label>
                                    <input
                                        type="text"
                                        name="age_completed"
                                        required
                                        value={formData.age_completed}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                        placeholder="e.g. 5 Years 2 Months"
                                    />
                                </div>
                            </div>

                            {/* Parent Details */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                    <FaUser size={20} className="text-primary" /> Parent Details
                                </h3>

                                {/* Father's Info */}
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="font-bold text-secondary mb-4 uppercase tracking-wide">Father's Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Father Name</label>
                                            <input
                                                type="text"
                                                name="father_name"
                                                required
                                                value={formData.father_name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                placeholder="Enter father's name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Occupation</label>
                                            <input
                                                type="text"
                                                name="father_occupation"
                                                required
                                                value={formData.father_occupation}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                placeholder="Enter occupation"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 font-semibold mb-2">Contact Number <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <FaPhoneAlt className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                <input
                                                    type="tel"
                                                    name="father_contact"
                                                    required
                                                    value={formData.father_contact}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                    placeholder="Father's contact number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mother's Info */}
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="font-bold text-secondary mb-4 uppercase tracking-wide">Mother's Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Mother Name</label>
                                            <input
                                                type="text"
                                                name="mother_name"
                                                required
                                                value={formData.mother_name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                placeholder="Enter mother's name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Occupation</label>
                                            <input
                                                type="text"
                                                name="mother_occupation"
                                                required
                                                value={formData.mother_occupation}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                placeholder="Enter occupation"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 font-semibold mb-2">Contact Number</label>
                                            <div className="relative">
                                                <FaPhoneAlt className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                <input
                                                    type="tel"
                                                    name="mother_contact"
                                                    required
                                                    value={formData.mother_contact}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                    placeholder="Mother's contact number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                    <FaMapMarkerAlt size={20} className="text-primary" /> Additional Details
                                </h3>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Residential Address</label>
                                    <textarea
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                        placeholder="Enter full address"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Previous Schooling?</label>
                                    <div className="flex gap-6 mb-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="has_previous_schooling"
                                                checked={formData.has_previous_schooling === true}
                                                onChange={() => handleRadioChange(true)}
                                                className="w-5 h-5 text-secondary focus:ring-secondary"
                                            />
                                            <span>Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="has_previous_schooling"
                                                checked={formData.has_previous_schooling === false}
                                                onChange={() => handleRadioChange(false)}
                                                className="w-5 h-5 text-secondary focus:ring-secondary"
                                            />
                                            <span>No</span>
                                        </label>
                                    </div>

                                    {formData.has_previous_schooling && (
                                        <div className="animate-fade-in-down space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-gray-700 font-semibold mb-2">Name of the School <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <FaSchool className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="previous_school_name"
                                                            required={formData.has_previous_schooling}
                                                            value={formData.previous_school_name}
                                                            onChange={handleChange}
                                                            className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                            placeholder="Enter previous school name"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-semibold mb-2">Previous Class <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <FaBookOpen className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="previous_class"
                                                            required={formData.has_previous_schooling}
                                                            value={formData.previous_class}
                                                            onChange={handleChange}
                                                            className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                                            placeholder="Enter previous class"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" size={24} /> Processing...
                                    </>
                                ) : (
                                    "Submit Enquiry"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdmissionEnquiry;

import React, { useState, useRef, useEffect } from 'react';
import { FaBriefcase, FaUpload, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { API_BASE_URL } from '../api/config';

const Career = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const fileInputRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: 'Female',
        email: '',
        contact_number: '',
        address: '',
        qualification: '',
        professional_degree: '',
        current_position: '',
        position_teaching: false,
        position_non_teaching: false,
        position_admin: false,
        experience: '',
        resume: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'resume') {
                data.append(key, formData[key]);
            }
        });
        if (formData.resume) {
            data.append('resume', formData.resume);
        } else {
            alert("Please upload your resume.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact/career-applications/`, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                setIsSuccess(true);
                window.scrollTo(0, 0);
            } else {
                const errorData = await response.json();
                console.error("Submission error", errorData);
                alert("Something went wrong. Please check your inputs.");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
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
                    <h2 className="text-4xl font-bold text-secondary mb-4">Application Received!</h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Thank you for applying to Nethaji Vidyalayam. We have received your application and will review it shortly.
                    </p>
                    <button
                        onClick={() => {
                            setIsSuccess(false);
                            setFormData({
                                name: '', dob: '', gender: 'Female', email: '', contact_number: '', address: '',
                                qualification: '', professional_degree: '',
                                current_position: '', position_teaching: false, position_non_teaching: false,
                                position_admin: false, experience: '', resume: null
                            });
                        }}
                        className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-primary/40 transition-all"
                    >
                        Submit Another Application
                    </button>
                    <a href="/" className="block mt-6 text-primary font-bold hover:underline">Return to Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[300px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
                <div className="absolute inset-0 bg-primary/80 z-10" />
                <div className="relative z-20 container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200">Shape the future with us at Nethaji Vidyalayam.</p>
                </div>
            </section>

            {/* Career Inquiry Form */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-8 border-primary">
                        <div className="flex items-center gap-3 mb-8 text-primary">
                            <FaBriefcase size={32} />
                            <h2 className="text-3xl font-bold text-secondary">Career Inquiry Form</h2>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {/* Personal Details */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Personal Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Name of the Applicant</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Date of Birth (DOB)</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <div className="text-primary px-4 py-2 rounded-lg border border-primary font-semibold flex items-center gap-2 whitespace-nowrap">
                                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                                            Female Candidates Only
                                        </div>
                                        <p className="text-xs text-gray-400 italic">* Current openings are for female candidates only as per school policy.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email ID<span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="example@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Contact Number<span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            name="contact_number"
                                            value={formData.contact_number}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Address</label>
                                    <textarea
                                        rows="3"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Enter your residential address"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Academic & Professional Details */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Academic & Professional Details</h3>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Academic Qualification <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="E.g. B.Sc, M.Sc, M.A, B.Com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Professional Degree <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="professional_degree"
                                        value={formData.professional_degree}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Professional Degree (e.g. B.Ed, D.Ed)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Current Position (If any)</label>
                                    <input
                                        type="text"
                                        name="current_position"
                                        value={formData.current_position}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="e.g. Senior Teacher"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Position Applying For</label>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-2 rounded-lg sm:bg-transparent sm:p-0">
                                            <input
                                                type="checkbox"
                                                name="position_teaching"
                                                checked={formData.position_teaching}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            />
                                            <span>Teaching</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-2 rounded-lg sm:bg-transparent sm:p-0">
                                            <input
                                                type="checkbox"
                                                name="position_non_teaching"
                                                checked={formData.position_non_teaching}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            />
                                            <span>Non-Teaching</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-2 rounded-lg sm:bg-transparent sm:p-0">
                                            <input
                                                type="checkbox"
                                                name="position_admin"
                                                checked={formData.position_admin}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-primary rounded focus:ring-primary"
                                            />
                                            <span>Office Administration</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Experience</label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    >
                                        <option value="">Select Experience Level</option>
                                        <option value="fresher">Fresher</option>
                                        <option value="less_than_1">Less than 1 year</option>
                                        <option value="1_to_5">1–5 years</option>
                                        <option value="above_5">Above 5 years</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Attach Resume <span className="text-red-500">*</span></label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors text-center cursor-pointer bg-gray-50"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <FaUpload className="mx-auto text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500">
                                            {formData.resume ? formData.resume.name : "Click to upload or drag and drop"}
                                        </p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? <><FaSpinner className="animate-spin" /> Submitting...</> : "Submit Application"}
                            </button>
                        </form>
                    </div >
                </div >
            </section >
        </div >
    );
};

export default Career;

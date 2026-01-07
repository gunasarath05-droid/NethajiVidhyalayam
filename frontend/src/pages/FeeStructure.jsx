import React, { useEffect } from 'react';
import { FaCheck, FaDownload, FaInfoCircle } from 'react-icons/fa';

const FeeStructure = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const feeTiers = [
        {
            title: "Kindergarten",
            grade: "Pre-KG - UKG",
            price: "15,000",
            features: [
                "Activity-based Learning",
                "Montessori Kit",
                "Snacks Included",
                "Basic Health Checkup"
            ],
            color: "border-green-500",
            bg: "bg-green-50",
            btn: "bg-green-500"
        },
        {
            title: "Primary",
            grade: "Grade 1 - 5",
            price: "18,000",
            features: [
                "Smart Class Access",
                "Computer Lab Basics",
                "Sports Coaching",
                "Library Access"
            ],
            color: "border-primary",
            bg: "bg-orange-50",
            btn: "bg-primary"
        },
        {
            title: "Middle School",
            grade: "Grade 6 - 8",
            price: "22,000",
            features: [
                "Science Labs",
                "Advanced Computer Skills",
                "Robotics Workshop",
                "Career Counseling Basics"
            ],
            color: "border-blue-500",
            bg: "bg-blue-50",
            btn: "bg-blue-500"
        },
        {
            title: "High School",
            grade: "Grade 9 - 10",
            price: "25,000",
            features: [
                "Board Exam Prep",
                "Advanced Labs (Phy/Chem/Bio)",
                "Special Coaching Classes",
                "Leadership Programs"
            ],
            color: "border-secondary",
            bg: "bg-indigo-50",
            btn: "bg-secondary"
        }
    ];

    return (
        <div className="font-sans bg-gray-50">
            {/* Minimal Header */}
            <section className="bg-secondary text-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Fee Structure</h1>
                    <p className="text-xl text-gray-300">Transparent pricing for world-class education. Academic Year 2024-2025.</p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 -mt-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {feeTiers.map((tier, index) => (
                            <div key={index} className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 ${tier.color} hover:-translate-y-2 transition-transform duration-300 flex flex-col`}>
                                <div className={`p-6 ${tier.bg} text-center`}>
                                    <h3 className="text-xl font-bold text-gray-800">{tier.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{tier.grade}</p>
                                    <div className="flex justify-center items-baseline">
                                        <span className="text-3xl font-bold text-gray-900">₹{tier.price}</span>
                                        <span className="text-gray-500 ml-1">/ term</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1">
                                    <ul className="space-y-4">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-600">
                                                <FaCheck size={16} className={`mr-2 mt-0.5 ${tier.color.replace('border-', 'text-')}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6 pt-0">
                                    <button className={`w-full py-3 rounded-xl text-white font-bold ${tier.btn} hover:opacity-90 transition-opacity`}>
                                        Enquire Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <section className="pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                        <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                            <FaInfoCircle size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">One-Time Admission Fee</h3>
                            <p className="text-gray-600">
                                A non-refundable admission fee of <span className="font-bold text-gray-900">₹10,000 - ₹15,000</span> applies for new admissions depending on the grade level. This includes the registration and processing charges.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 text-primary font-bold hover:underline">
                            <FaDownload size={20} /> Download PDF
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeeStructure;

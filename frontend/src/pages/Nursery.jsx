import React, { useEffect } from 'react';
import { FaBookOpen, FaHeart, FaPalette, FaMusic, FaUsers, FaCheckCircle } from 'react-icons/fa';

const Nursery = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const keyFeatures = [
        {
            icon: <FaHeart size={32} />,
            title: "Play-Based Learning",
            desc: "Learning through play helps children develop social, cognitive, and emotional skills."
        },
        {
            icon: <FaPalette size={32} />,
            title: "Creative Expression",
            desc: "Art, craft, and music activities to encourage creativity and self-expression."
        },
        {
            icon: <FaUsers size={32} />,
            title: "Small Class Sizes",
            desc: "Maximum 20 children per class with 2 dedicated teachers for personalized attention."
        },
        {
            icon: <FaBookOpen size={32} />,
            title: "Montessori Approach",
            desc: "Child-centered learning environment that encourages independence and exploration."
        }
    ];

    const dailySchedule = [
        { time: "8:30 - 9:00", activity: "Morning Assembly & Circle Time" },
        { time: "9:00 - 10:00", activity: "Activity-Based Learning (Phonics, Numbers)" },
        { time: "10:00 - 10:30", activity: "Snack Time & Free Play" },
        { time: "10:30 - 11:30", activity: "Art, Craft & Music" },
        { time: "11:30 - 12:00", activity: "Outdoor Play & Physical Activities" },
        { time: "12:00 - 12:30", activity: "Story Time & Closing Circle" }
    ];

    return (
        <div className="font-sans bg-gray-50">
            {/* Hero */}
            <section className="relative h-[400px] flex items-center justify-center text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-95 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
                ></div>
                <div className="relative z-20 container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Nursery (Pre-KG - UKG)</h1>
                    <p className="text-xl text-gray-200">Where Little Learners Begin Their Journey</p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Early Education</h4>
                            <h2 className="text-4xl font-bold text-secondary mb-6">A Foundation for Lifelong Learning</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Our Nursery program (Pre-KG, LKG, UKG) is designed to provide a warm, nurturing environment where young children can explore, discover, and grow. We believe that the early years are critical for building a strong foundation in academics, social skills, and emotional well-being.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Through a blend of Montessori and play-based learning methods, we encourage curiosity, creativity, and confidence in every child.
                            </p>
                            <div className="flex gap-4">
                                <div className="bg-primary/10 p-4 rounded-lg">
                                    <span className="block text-3xl font-bold text-primary">1:10</span>
                                    <span className="text-sm text-gray-600">Teacher Ratio</span>
                                </div>
                                <div className="bg-secondary/10 p-4 rounded-lg">
                                    <span className="block text-3xl font-bold text-secondary">100+</span>
                                    <span className="text-sm text-gray-600">Happy Kids</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Nursery Classroom"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary mb-4">What Makes Our Nursery Special</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">A holistic approach to early childhood education.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {keyFeatures.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center border-t-4 border-primary">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 text-primary">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Daily Schedule */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary mb-4">A Typical Day</h2>
                        <p className="text-gray-600">Structured yet flexible schedule designed for young learners.</p>
                    </div>
                    <div className="space-y-4">
                        {dailySchedule.map((item, index) => (
                            <div key={index} className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors border-l-4 border-primary">
                                <div className="shrink-0">
                                    <span className="block font-bold text-primary text-lg">{item.time}</span>
                                </div>
                                <div className="flex-1">
                                    <span className="text-gray-700 font-medium">{item.activity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Learning Areas */}
            <section className="py-20 bg-secondary text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Learning Areas Covered</h2>
                        <p className="text-gray-300">Comprehensive development across all domains.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            "Language & Literacy",
                            "Numeracy & Math Readiness",
                            "Moral Values & Good Habits",
                            "Music, Dance & Rhymes",
                            "Celebration of Festivals & Special Days",
                            "Play-based and Activity-based Learning"
                        ].map((area, index) => (
                            <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                                <FaCheckCircle size={20} className="text-primary mt-1 shrink-0" />
                                <span>{area}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Nursery;

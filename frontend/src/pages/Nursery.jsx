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
        { time: "8:50 - 9:10", activity: "Morning Assembly" },
        { time: " 9:10 - 10:00 ", activity: "Circle Time & Recap" },
        { time: "10:00 - 10:30 ", activity: "Snack Time & Free Play" },
        { time: "10:30 - 11:30 ", activity: "Activity-Based Learning (Phonics, Numbers)" },
        { time: "11:30 - 12:00 ", activity: "Writing Practice" },
        { time: "12:00 – 01.00  ", activity: "Lunch break" },
        { time: "01.00 - 02.00", activity: "Story Time" },
        { time: "02:00 - 03:00", activity: "Outdoor Play & Physical Activities" },
        { time: "03:00 - 03:30", activity: "Recap of the day" }
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Nursery (Pre-KG - UKG)</h1>
                    <p className="text-xl text-gray-200">Where Little Learners Begin Their Journey</p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Early Education</h4>
                            <h2 className="text-4xl font-bold text-secondary mb-6">A Joyful Beginning to Lifelong Learning</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                We create a nurturing environment where children feel safe, loved, and confident—allowing learning to happen naturally through meaningful experiences.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                <strong>Shishuvatika</strong> is the foundational stage of learning where a child’s educational journey begins with care, play, and joyful exploration. At our school, Shishuvatika is thoughtfully designed to support the holistic development of every child, guided by the timeless Panchakosha principles.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary mb-6">
                                <h3 className="text-xl font-bold text-secondary mb-3">Meaning of Shishuvatika</h3>
                                <ul className="space-y-2 mb-4">
                                    <li className="text-gray-700"><span className="font-bold text-primary">• Shishu</span> → Child / Infant</li>
                                    <li className="text-gray-700"><span className="font-bold text-primary">• Vatika</span> → Garden / Nursery / Place of growth</li>
                                </ul>
                                <p className="text-gray-600 italic">
                                    Shishuvatika means “Children’s Garden”—a space where young minds blossom through care, play, values, and joyful learning.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src="../src/images/C0471T01.JPG"
                                alt="Nursery Classroom"
                                loading="lazy"
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

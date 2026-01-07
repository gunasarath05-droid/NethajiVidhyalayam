import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import principalImage from '../images/princi.jpg';

const PrincipalMessage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
                <div className="absolute inset-0 bg-primary/80 z-10" />
                <div className="relative z-20 container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Leadership & Principal's Message</h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl font-serif italic text-gray-100 mb-2">
                            “Education is the most powerful weapon which you can use to change the world.”
                        </p>
                        <p className="text-lg text-gray-200 font-semibold">— Dr. A.P.J. Abdul Kalam</p>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Our school is dedicated in providing quality primary education to children ensuring that every child receives the opportunity to dream, learn, and succeed. With a strong vision for growth, we are steadily moving towards the standard and academic wise highly recommended books and various teaching methods along with an activity-based learning into our curriculum.
                    </p>
                </div>
            </section>

            {/* From the Leadership Desk */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">From the Leadership Desk</h2>
                        <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-primary">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Under the guidance of our committed leadership team, the school continues to evolve into a space where values, learning, and innovation come together. We believe that true education does not only shape minds—it builds character, strengthens confidence, and prepares children for a bright future.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Image Column */}
                        <div className="lg:w-1/3 w-full flex flex-col items-center">
                            <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-primary mb-6">
                                <img
                                    src={principalImage}
                                    alt="Principal Dr.K. PRAMILA"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-secondary">Dr.K. PRAMILA</h3>
                                <p className="text-primary font-bold">Principal</p>
                            </div>
                        </div>

                        {/* Text Column */}
                        <div className="lg:w-2/3">
                            <h2 className="text-4xl font-bold text-secondary mb-8">Principal’s Message</h2>

                            <div className="bg-primary/5 p-6 rounded-lg mb-8 border-l-4 border-secondary">
                                <p className="text-xl font-serif italic text-secondary mb-2">
                                    “Arise! Awake! And stop not until the goal is reached.”
                                </p>
                                <p className="text-right font-bold text-primary">— Swami Vivekananda</p>
                            </div>

                            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                                <p>
                                    As the Principal, I take great pride in leading an institution that strives to uplift and empower every learner. We are dedicated to nurturing young minds with compassion, discipline, and high-quality education. Our aim is to bridge the gap between opportunity and ability, ensuring that every child receives the best foundation for their future.
                                </p>
                                <p>
                                    With a passionate team of teachers, modern learning resources, and a Sisuvatika based method of learning for kindergarten with a student-centered approach, "Our Primary School“ nurtures the curiosity of independent thinking, and communication skills and holistic development.
                                </p>
                                <p className="font-semibold text-secondary text-xl pt-4">
                                    Together, let us create an environment where children learn with joy, grow with confidence, and rise with purpose.
                                </p>
                            </div>

                            {/* Video Section */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold text-secondary mb-6">A Message from Our Principal</h3>
                                <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                        title="Principal's Message Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            <div className="mt-10">
                                <a href="/contact" className="inline-flex items-center bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    Contact Us <FaArrowRight size={20} className="ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrincipalMessage;

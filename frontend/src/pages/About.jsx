import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBullseye, FaCompass, FaHeart, FaShieldAlt, FaBolt, FaUsers, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import heroImagePlaceholder from '../images/About/about1.JPG';
import principalFallback from '../images/DSC07211.JPG';
import { API_BASE_URL } from '../api/config';

const About = () => {
    const [content, setContent] = useState(null);
    const [coreValues, setCoreValues] = useState([]);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const [contentRes, valuesRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/core/about-page-content/current/`),
                    fetch(`${API_BASE_URL}/api/core/core-values/`)
                ]);

                if (contentRes.ok) {
                    const data = await contentRes.json();
                    setContent(data);
                }

                if (valuesRes.ok) {
                    const data = await valuesRes.json();
                    setCoreValues(data);
                }
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };
        window.scrollTo(0, 0);
        fetchAboutData();
    }, []);

    const valueIconMap = {
        Heart: <FaHeart size={32} />,
        Zap: <FaBolt size={32} />,
        Users: <FaUsers size={32} />,
        Shield: <FaShieldAlt size={32} />,
    };

    return (
        <div className="font-sans" >
            {/* Hero Section */}
            < section className="relative h-[500px] flex items-center justify-center text-center text-white" >
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url(${content?.hero_image ? (content.hero_image.startsWith('http') ? content.hero_image : `${API_BASE_URL}${content.hero_image}`) : heroImagePlaceholder})`
                    }}
                ></div>
                <div className="relative z-20 container mx-auto px-4">
                    <h4 className="text-primary font-bold uppercase tracking-widest mb-4">
                        {content?.hero_sub_title || "Who We Are"}
                    </h4>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                        {content?.hero_title ? (
                            <>
                                {content.hero_title.split(' Excellence')[0]} <span className="text-primary">Excellence</span>
                            </>
                        ) : (
                            <>
                                A Legacy of <span className="text-primary">Excellence</span>
                            </>
                        )}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200">
                        {content?.hero_description || "Since 2001, Nethaji Vidhyalayam has been a beacon of knowledge, shaping young minds into global leaders."}
                    </p>
                </div>
            </section >

            {/* Our Story Section */}
            < section className="py-20 bg-white" >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
                                {content?.story_sub_heading || "Our Story"}
                            </h4>
                            <h2 className="text-4xl font-bold text-secondary mb-6">
                                {content?.story_heading || "From Humble Beginnings to Educational Excellence"}
                            </h2>
                            <div
                                className="text-gray-600 text-lg mb-8 leading-relaxed prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: content?.story_description || `
                                        <p>Nethaji Vidhyalayam was established on 7th June 2001 with the vision of providing wholesome education through the English medium. The school aims to offer a strong academic foundation while nurturing values rooted in Bharat culture, with special emphasis on Bharath cultural traditions. Our mission is to provide modern, value-based education that supports the overall development of every child.</p>
                                        
                                    `
                                }}
                            />
                            <div className="grid grid-cols-2 gap-6">
                                <div className="border-l-4 border-primary pl-4">
                                    <span className="block text-3xl font-bold text-secondary">
                                        {content?.stat1_value || "25+"}
                                    </span>
                                    <span className="text-gray-500">
                                        {content?.stat1_label || "Years of Service"}
                                    </span>
                                </div>
                                <div className="border-l-4 border-primary pl-4">
                                    <span className="block text-3xl font-bold text-secondary">
                                        {content?.stat2_value || "2000+"}
                                    </span>
                                    <span className="text-gray-500">
                                        {content?.stat2_label || "Alumni Network"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary rounded-full opacity-20"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary rounded-full opacity-20"></div>
                            <img
                                src={content?.story_image ? (content.story_image.startsWith('http') ? content.story_image : `${API_BASE_URL}${content.story_image}`) : "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                alt="Our Story"
                                loading="lazy"
                                className="rounded-2xl shadow-2xl relative z-10 w-full"
                            />
                        </div>
                    </div>
                </div>
            </section >

            {/* Vision & Mission */}
            < section className="py-20 bg-gray-50" >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Vision Card */}
                        <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-primary">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                                <FaCompass size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {content?.vision_text || "Holistic development of the student into a responsible, morally upright citizen capable of thinking, learning and striving for national development."}
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-secondary">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 text-secondary">
                                <FaBullseye size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                            <ul className="space-y-4 text-gray-600 text-lg">
                                {(content?.mission_text
                                    ? Array.from(new DOMParser().parseFromString(content.mission_text, 'text/html').querySelectorAll('li')).map(li => li.textContent)
                                    : [
                                        "Establish a self-reliant center of excellence dedicated to imparting knowledge.",
                                        "Foster quality consciousness and holistic development among learners.",
                                        "Develop ideal citizens who actively contribute to nation-building."
                                    ]
                                ).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <FaCheckCircle size={22} className="text-primary mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* Core Values */}
            < section className="py-20 bg-secondary text-white" >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Our Ethos</h4>
                        <h2 className="text-4xl font-bold">Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(coreValues.length > 0 ? coreValues : [
                            { icon_name: "Heart", title: "Integrity", description: "We uphold the highest standards of honesty and ethics in all our actions." },
                            { icon_name: "Zap", title: "Innovation", description: "We embrace change and constantly seek better ways to teach and learn." },
                            { icon_name: "Users", title: "Inclusivity", description: "We celebrate diversity and ensure every voice is heard and valued." },
                            { icon_name: "Shield", title: "Excellence", description: "We strive for the highest quality in everything we do." }
                        ]).map((item, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                                <div className="text-primary mb-4">
                                    {valueIconMap[item.icon_name] || <FaHeart size={32} />}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Leadership Preview */}
            < section className="py-20 bg-white" >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-secondary mb-12">Leadership</h2>
                    <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-8">
                        <img
                            src={content?.principal_image ? (content.principal_image.startsWith('http') ? content.principal_image : `${API_BASE_URL}${content.principal_image}`) : principalFallback}
                            alt="Principal"
                            loading="lazy"
                            className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-lg"
                        />
                        <div className="text-left">
                            <h3 className="text-2xl font-bold text-secondary">
                                {content?.principal_name || "Dr.K. PRAMILA"}
                            </h3>
                            <p className="text-primary font-bold mb-4">
                                {content?.principal_title || "Principal"}
                            </p>
                            <p className="text-gray-600 italic mb-6">
                                "{content?.principal_quote || "Education is the most powerful weapon which you can use to change the world. At Nethaji, we don't just teach; we inspire."}"
                            </p>
                            <Link to="/about/principal-message" className="text-secondary font-bold hover:text-primary flex items-center gap-2">
                                Read Full Message <FaArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA */}
            < section className="py-20 bg-gray-900 text-white text-center" >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">Experience the Difference</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Come visit our campus and see firsthand why Nethaji Vidyalayam is the right choice for your child.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50"
                    >
                        Schedule a Visit
                    </Link>
                </div>
            </section >
        </div >
    );
};

export default About;

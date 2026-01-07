import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import aboutImage1 from "../images/Home/about1.JPG";
import aboutImage2 from "../images/Home/about2.JPG";
import aboutImage3 from "../images/Home/about3.JPG";
import {
  FaArrowRight,
  FaBookOpen,
  FaTrophy,
  FaUsers,
  FaCalendarAlt,
  FaStar,
  FaCheckCircle,
  FaBolt,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaPalette,
  FaMusic,
  FaHeart,
  FaSmile,
  FaCreditCard,
} from "react-icons/fa";

import { API_BASE_URL } from "../api/config";
import achivementImage from "../images/Home/achivement (1).jpg";
import achivementImage2 from "../images/Home/achivement (2).jpg";
import achivementImage3 from "../images/Home/achivement (3).jpg";
import achivementImage4 from "../images/Home/achivement (4).jpg";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [achievementsCurrentIndex, setAchievementsCurrentIndex] = useState(0);
  const [achievementsAutoPlaying, setAchievementsAutoPlaying] = useState(true);
  const [heroVideo, setHeroVideo] = useState(null);
  const [homeAbout, setHomeAbout] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHomeData = async () => {
      try {
        const [heroRes, aboutRes, teamRes, facilitiesRes, galleryRes, testimonialsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/core/hero-videos/current/`),
          fetch(`${API_BASE_URL}/api/core/home-about/current/`),
          fetch(`${API_BASE_URL}/api/core/team/`),
          fetch(`${API_BASE_URL}/api/core/facilities/`),
          fetch(`${API_BASE_URL}/api/gallery/items/`),
          fetch(`${API_BASE_URL}/api/core/testimonials/`)
        ]);

        if (heroRes.ok) {
          const heroData = await heroRes.json();
          setHeroVideo(heroData);
        }

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setHomeAbout(aboutData);
        }

        if (teamRes.ok) {
          const teamData = await teamRes.json();
          setTeamMembers(teamData);
        }

        if (facilitiesRes.ok) {
          const facilitiesData = await facilitiesRes.json();
          setFacilities(facilitiesData);
        }

        if (galleryRes.ok) {
          const galleryData = await galleryRes.json();
          // Filter events and achievements from the unified gallery items
          const eventsData = galleryData.filter(item => item.category === 'Events');
          const achievementsData = galleryData.filter(item => item.category === 'Achievements');

          setEvents(eventsData);
          setAchievements([...achievementsData, {
            title: "Excellence in Education Award 2024",
            image: achivementImage,
            date: "2022-03-15",
            description: "Awarded for outstanding academic performance."
          }, {
            title: "Excellence in Education Award 2024",
            image: achivementImage2,
            date: "2023-03-15",
            description: "Awarded for outstanding academic performance."
          },
          {
            title: "Excellence in Education Award 2024",
            image: achivementImage3,
            date: "2024-03-15",
            description: "Awarded for outstanding academic performance."
          },
          {
            title: "Excellence in Education Award 2024",
            image: achivementImage4,
            date: "2025-03-15",
            description: "Awarded for outstanding academic performance."
          }]);
        }

        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTestimonials(testimonialsData);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };
    fetchHomeData();
  }, []);

  // Icon mapping for facilities
  const iconMap = {
    Zap: <FaBolt size={32} />,
    BookOpen: <FaBookOpen size={32} />,
    Trophy: <FaTrophy size={32} />,
    Users: <FaUsers size={32} />,
    Smile: <FaSmile size={32} />,
    Calendar: <FaCalendarAlt size={32} />,
    GraduationCap: <FaGraduationCap size={32} />,
    CreditCard: <FaCreditCard size={32} />,
    Star: <FaStar size={32} />,
    Heart: <FaHeart size={32} />,
    Palette: <FaPalette size={32} />,
    Music: <FaMusic size={32} />,
  };

  // Auto-slide effect for events
  useEffect(() => {
    if (!isAutoPlaying || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  // Auto-slide effect for achievements
  useEffect(() => {
    if (!achievementsAutoPlaying || achievements.length === 0) return;

    const interval = setInterval(() => {
      setAchievementsCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [achievementsAutoPlaying, achievements.length]);

  const nextSlide = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % events.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextAchievementsSlide = () => {
    if (achievements.length === 0) return;
    setAchievementsCurrentIndex((prev) => (prev + 1) % achievements.length);
    setAchievementsAutoPlaying(false);
  };

  const prevAchievementsSlide = () => {
    if (achievements.length === 0) return;
    setAchievementsCurrentIndex(
      (prev) => (prev - 1 + achievements.length) % achievements.length
    );
    setAchievementsAutoPlaying(false);
  };

  const goToAchievementsSlide = (index) => {
    setAchievementsCurrentIndex(index);
    setAchievementsAutoPlaying(false);
  };

  // Calculate visible cards (show 3 at a time on desktop)
  const getVisibleCards = () => {
    if (events.length === 0) return [];
    if (events.length <= 3) return events;
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % events.length;
      cards.push(events[index]);
    }
    return cards;
  };

  // Calculate visible achievements (show 3 at a time on desktop)
  const getVisibleAchievements = () => {
    if (achievements.length === 0) return [];
    if (achievements.length <= 3) return achievements;
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (achievementsCurrentIndex + i) % achievements.length;
      cards.push(achievements[index]);
    }
    return cards;
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      {/* Hero Section - Professional & Static */}
      <section className="relative h-[800px] flex items-center justify-center bg-brand-navy overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            key={heroVideo?.id || 'fallback'}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src={heroVideo?.video_file
                ? (heroVideo.video_file.startsWith('http') ? heroVideo.video_file : `${API_BASE_URL}${heroVideo.video_file}`)
                : (heroVideo?.video_url || "https://assets.mixkit.co/videos/preview/mixkit-children-walking-in-a-park-1175-large.mp4")
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* Professional Overlay */}
          <div className="absolute inset-0 bg-brand-navy/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white w-full max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {heroVideo?.title?.includes("Nethaji") ? (
              heroVideo.title.split("Nethaji").map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i === 0 && <span className="text-primary">Nethaji</span>}
                </React.Fragment>
              ))
            ) : (
              heroVideo?.title || (
                <>
                  Welcome to <br />
                  <span className="text-primary">Nethaji Vidhyalayam</span>
                </>
              )
            )}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed">
            Empowering young minds with quality education, distinctive character building, and holistic development for a brighter tomorrow.
          </p>
          <div>
            <Link
              to="/about"
              className="inline-block px-10 py-4 bg-primary hover:bg-primary-hover text-white rounded-md font-bold text-lg transition-all shadow-lg hover:-translate-y-1"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info / Highlights Section */}
      <section className="py-12 bg-white text-brand-navy relative z-20 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/admissions" className="flex items-center gap-4 bg-gray-100 p-5 rounded-xl hover:bg-gray-200 transition-all group border border-gray-200">
              <div className="bg-white text-primary p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <FaGraduationCap size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Admissions</h3>
                <p className="text-sm text-gray-600">Join our family</p>
              </div>
            </Link>

            <Link to="/pay-fees" className="flex items-center gap-4 bg-gray-100 p-5 rounded-xl hover:bg-gray-200 transition-all group border border-gray-200">
              <div className="bg-white text-primary p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <FaCreditCard size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Pay Fees</h3>
                <p className="text-sm text-gray-600">Secure online payment</p>
              </div>
            </Link>

            <Link to="/events" className="flex items-center gap-4 bg-gray-100 p-5 rounded-xl hover:bg-gray-200 transition-all group border border-gray-200">
              <div className="bg-white text-primary p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <FaCalendarAlt size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">School Calendar</h3>
                <p className="text-sm text-gray-600">Events & Holidays</p>
              </div>
            </Link>

            <Link to="/contact" className="flex items-center gap-4 bg-gray-100 p-5 rounded-xl hover:bg-gray-200 transition-all group border border-gray-200">
              <div className="bg-white text-primary p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <FaUsers size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Contact Us</h3>
                <p className="text-sm text-gray-600">Get in touch</p>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* About Section - Simple & Professional */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text Side */}
            <div className="lg:w-1/2">
              <div className="space-y-8">
                <div>
                  <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
                    {homeAbout?.sub_heading || "Welcome to Nethaji"}
                  </h4>
                  <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-8 leading-tight">
                    {homeAbout?.heading ? (
                      homeAbout.heading.includes("Nethaji") ? (
                        homeAbout.heading.split("Nethaji").map((part, i) => (
                          <React.Fragment key={i}>
                            {part}
                            {i === 0 && <span className="text-primary">Nethaji</span>}
                          </React.Fragment>
                        ))
                      ) : (
                        homeAbout.heading
                      )
                    ) : (
                      <>
                        Nurturing the <br />
                        <span className="text-primary">Future Leaders</span>
                      </>
                    )}
                  </h2>
                </div>

                <div className="space-y-6 text-gray-600 text-lg leading-relaxed home-about-content">
                  {homeAbout?.description ? (
                    <div dangerouslySetInnerHTML={{ __html: homeAbout.description }}></div>
                  ) : (
                    <>
                      <p>
                        Nethaji Vidyalayam has been in the field of education for over
                        two decades. With a rich experience in moulding the young
                        generation, we provide quality education of international
                        standard.
                      </p>

                      <p>
                        From <strong>Pre KG</strong> to <strong>5th Grade</strong> the
                        aim of the school is to lay emphasis on experiential learning
                        and grooming of young children thereby making them responsible
                        citizens and leaders with a difference.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-10">
                  <Link
                    to={homeAbout?.button_link || "/about"}
                    className="inline-flex items-center gap-2 bg-brand-navy hover:bg-primary text-white px-10 py-4 rounded font-bold transition-all shadow-lg"
                  >
                    {homeAbout?.button_text || "Discover Our Story"} <FaArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Side - Modern Mosaic Grid Design */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-12 gap-4 h-[500px] lg:h-[650px] relative">
                {/* Decorative border accent */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border-t-8 border-r-8 border-primary/20 rounded-tr-[40px] hidden lg:block"></div>

                {/* Main Vertical Image */}
                <div className="col-span-12 md:col-span-7 h-full relative group">
                  <div className="h-full rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={homeAbout?.image1 ? (homeAbout.image1.startsWith('http') ? homeAbout.image1 : `${API_BASE_URL}${homeAbout.image1}`) : aboutImage1}
                      alt="School Campus"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Stacking side images */}
                <div className="hidden md:flex md:col-span-5 flex-col gap-4">
                  <div className="h-1/2 relative group">
                    <div className="h-full rounded-3xl overflow-hidden shadow-xl">
                      <img
                        src={homeAbout?.image2 ? (homeAbout.image2.startsWith('http') ? homeAbout.image2 : `${API_BASE_URL}${homeAbout.image2}`) : aboutImage2}
                        alt="Classroom"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="h-1/2 relative group">
                    <div className="h-full rounded-3xl overflow-hidden shadow-xl">
                      <img
                        src={homeAbout?.image3 ? (homeAbout.image3.startsWith('http') ? homeAbout.image3 : `${API_BASE_URL}${homeAbout.image3}`) : aboutImage3}
                        alt="Laboratory"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* Excellence Badge */}
                <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4 z-30">
                  <div className="bg-primary/10 text-primary p-4 rounded-2xl">
                    <FaTrophy size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg uppercase tracking-tight">Excellence</h4>
                    <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Estd. 1998</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Leadership Section */}
      {/* Leadership Section - Dark Blue Theme */}
      <section className="py-20 bg-linear-to-b from-brand-navy to-[#1a1f5c] text-white relative overflow-hidden">
        {/* Decorative Vectors */}
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
              Meet Our Team
            </h4>
            <h2 className="text-4xl font-bold text-white">
              Leadership & Guidance
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-24">
            {(teamMembers.length > 0 ? teamMembers : [
              {
                name: "Saint John Bosco",
                role: "Founder",
                photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Rev. Fr. Xavier Packiam",
                role: "Correspondent",
                photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Dr. R. Vijay Kumar",
                role: "Principal",
                photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              },
            ]).map((leader, index) => (
              <div key={index} className="relative group mt-12">
                {/* Image - Placed OUTSIDE the masked container */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-primary transition-colors shadow-lg z-20">
                  <img
                    src={leader.photo ? (leader.photo.startsWith('http') ? leader.photo : `${API_BASE_URL}${leader.photo}`) : "https://via.placeholder.com/150"}
                    alt={leader.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Card Content - Mask applied here */}
                <div
                  className="relative bg-white/5 backdrop-blur-md pt-24 pb-8 px-6 rounded-xl text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 drop-shadow-xl z-10"
                  style={{
                    maskImage: 'radial-gradient(circle at top center, transparent 4rem, black 4rem)',
                    WebkitMaskImage: 'radial-gradient(circle at top center, transparent 4.4rem, black 4rem)'
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-primary font-medium uppercase text-sm tracking-wider">
                    {leader.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities / Infrastructure Section - Refined */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
                Infrastructure
              </h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-navy">
                State-of-the-Art Facilities
              </h2>
            </div>
            <div>
              <Link to="/facilities" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-4">
                Explore All Facilities <FaArrowRight size={20} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="bg-gray-50 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                  {iconMap[facility.icon_name] || <FaStar size={32} />}
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-4">
                  {facility.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Stats Section */}
      {/* Latest Events Section */}
      {/* Latest Events Section - Vibrant Gradient */}
      <section className="py-20 bg-brand-navy text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
              Happenings
            </h4>
            <h2 className="text-4xl font-bold text-white">Latest Events</h2>
          </div>

          {/* Desktop view - 3 cards sliding */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleCards().map((event, index) => (
                <div
                  key={`${currentIndex}-${index}`}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-500 animate-fade-in-up overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image ? (event.image.startsWith('http') ? event.image : `${API_BASE_URL}${event.image}`) : "https://via.placeholder.com/800x600"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white text-primary font-bold px-3 py-1 rounded text-sm shadow-lg">
                        {formatDate(event.date)}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-white/80">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
              aria-label="Previous"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
              aria-label="Next"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile view - 1 card at a time */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {events.map((event, index) => (
                  <div key={index} className="w-full shrink-0 px-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={event.image ? (event.image.startsWith('http') ? event.image : `${API_BASE_URL}${event.image}`) : "https://via.placeholder.com/800x600"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="bg-white text-primary font-bold px-3 py-1 rounded text-sm shadow-lg">
                            {formatDate(event.date)}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-white/80">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all"
              aria-label="Previous"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all"
              aria-label="Next"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-white/80 hover:text-white text-sm transition-colors"
            >
              {isAutoPlaying ? "⏸ Pause" : "▶ Play"} Auto-slide
            </button>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/events"
              className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
              Our Pride
            </h4>
            <h2 className="text-4xl font-bold text-gray-900">
              Achievements & Accolades
            </h2>
          </div>

          <div className="hidden md:block relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleAchievements().map((achievement, index) => (
                <div
                  key={`${achievementsCurrentIndex}-${index}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                >
                  <img
                    src={achievement.image ? (achievement.image.startsWith('http') || achievement.image.startsWith('/src') ? achievement.image : `${API_BASE_URL}${achievement.image}`) : "https://via.placeholder.com/600x400"}
                    alt={achievement.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <span className="text-primary font-bold text-sm mb-1">
                      {achievement.date ? new Date(achievement.date).getFullYear() : ''}
                    </span>
                    <h3 className="text-white text-xl font-bold">
                      {achievement.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevAchievementsSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-200 hover:bg-gray-300 p-3 rounded-full transition-all"
              aria-label="Previous"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextAchievementsSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-200 hover:bg-gray-300 p-3 rounded-full transition-all"
              aria-label="Next"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${achievementsCurrentIndex * 100}%)`,
                }}
              >
                {achievements.map((achievement, index) => (
                  <div key={index} className="w-full shrink-0 px-4">
                    <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
                      <img
                        src={achievement.image ? (achievement.image.startsWith('http') || achievement.image.startsWith('/src') ? achievement.image : `${API_BASE_URL}${achievement.image}`) : "https://via.placeholder.com/600x400"}
                        alt={achievement.title}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <span className="text-primary font-bold text-sm mb-1">
                          {achievement.date ? new Date(achievement.date).getFullYear() : ''}
                        </span>
                        <h3 className="text-white text-xl font-bold">
                          {achievement.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevAchievementsSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all"
              aria-label="Previous"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextAchievementsSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all"
              aria-label="Next"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToAchievementsSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === achievementsCurrentIndex
                  ? "bg-primary w-8"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() =>
                setAchievementsAutoPlaying(!achievementsAutoPlaying)
              }
              className="text-gray-600 hover:text-gray-800 text-sm transition-colors"
            >
              {achievementsAutoPlaying ? "⏸ Pause" : "▶ Play"} Auto-slide
            </button>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-colors"
            >
              View All Achievements
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
              Testimonials
            </h4>
            <h2 className="text-4xl font-bold text-gray-900">
              What Parents Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(testimonials.length > 0 ? testimonials : [
              {
                name: "Priya Sharma",
                role: "Parent of Grade 5 Student",
                content: "Nethaji Vidyalayam has transformed my child's confidence. The teachers are incredibly supportive and the facilities are top-notch.",
              },
              {
                name: "Rajesh Kumar",
                role: "Parent of Grade 10 Student",
                content: "The focus on both academics and extracurricular activities is what sets this school apart. Highly recommended!",
              },
              {
                name: "Anita Desai",
                role: "Alumni",
                content: "My years at Nethaji Vidyalayam were the best years of my life. The values I learnt here have guided me throughout my career.",
              },
            ]).map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow relative"
              >
                <div className="absolute -top-4 left-8 bg-primary text-white p-2 rounded-full">
                  <Star size={20} fill="currentColor" />
                </div>
                <p className="text-gray-600 italic mb-6">"{item.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <span className="text-sm text-gray-500">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section - Clean & High Conversion */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        {/* Subtle Brand Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="grid grid-cols-10 gap-x-12 h-full">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white/20 w-px h-full rotate-12"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8">Ready to Join Our Family?</h2>
            <p className="text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto font-medium">
              Admissions are open for the upcoming academic year. Secure your
              child's future with Nethaji Vidyalayam.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link
                to="/contact"
                className="bg-primary hover:bg-orange-600 text-white px-10 py-5 rounded font-bold text-lg transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Contact Us Today <FaArrowRight size={20} />
              </Link>
              <Link
                to="/admissions"
                className="bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-10 py-5 rounded font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                View Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
// fixed ArrowRight reference

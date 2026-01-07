import React, { useState, useEffect } from 'react';
import { FaCamera, FaSearchPlus, FaInfoCircle } from 'react-icons/fa';
import api from '../api/axios';
import { API_BASE_URL } from '../api/config';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/gallery/items/');

                const formattedImages = response.data.map(item => ({
                    id: item.id,
                    url: item.image ? (item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`) : null,
                    title: item.title,
                    category: item.category,
                    description: item.description || ''
                }));

                setImages(formattedImages);
                if (formattedImages.length > 0) {
                    setSelectedImage(formattedImages[0]);
                }
            } catch (error) {
                console.error("Failed to fetch gallery data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle image selection with animation trigger
    const handleImageClick = (image) => {
        if (!selectedImage || selectedImage.id === image.id) return;

        setIsAnimating(true);
        setTimeout(() => {
            setSelectedImage(image);
            setIsAnimating(false);
        }, 300); // Matches transition duration
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading gallery...</div>;
    }

    if (images.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen pb-16">
                <div className="bg-[var(--color-brand-navy)] text-white py-12 px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">School Gallery</h1>
                    <p className="text-gray-200 max-w-2xl mx-auto text-lg opacity-90">
                        A glimpse into the vibrant life at Nethaji Vedhyalayam.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
                    No images found in gallery.
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Header Section */}
            <div className="bg-[var(--color-brand-navy)] text-white py-12 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">School Gallery</h1>
                <p className="text-gray-200 max-w-2xl mx-auto text-lg opacity-90">
                    A glimpse into the vibrant life at Nethaji Vedhyalayam, from academic achievements to cultural celebrations.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">

                {/* HERO SECTION */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 transform transition-all duration-500 border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">

                        {/* Main Image Display */}
                        <div className={`lg:col-span-2 relative h-[400px] lg:h-auto overflow-hidden bg-gray-900 group`}>
                            <div
                                className={`w-full h-full transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
                            >
                                <img
                                    src={selectedImage?.url || 'https://via.placeholder.com/800x600'}
                                    alt={selectedImage?.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            {/* Overlay for Title on Mobile */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 lg:hidden">
                                <span className="inline-block px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-full mb-2">
                                    {selectedImage?.category}
                                </span>
                                <h2 className="text-2xl font-bold text-white">{selectedImage?.title}</h2>
                            </div>
                        </div>

                        {/* Details Panel */}
                        <div className="p-8 lg:p-10 flex flex-col justify-center bg-white relative">
                            <div className={`transition-all duration-300 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                                <div className="hidden lg:block mb-4">
                                    <span className="inline-block px-4 py-1.5 bg-orange-50 text-[var(--color-primary)] text-sm font-bold tracking-wide rounded-full border border-orange-100">
                                        {selectedImage?.category}
                                    </span>
                                </div>

                                <h2 className="hidden lg:block text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                    {selectedImage?.title}
                                </h2>

                                <div className="flex items-start space-x-4 mb-8">
                                    <FaInfoCircle className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {selectedImage?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GALLERY GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            onClick={() => handleImageClick(image)}
                            className={`
                group cursor-pointer relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300
                ${selectedImage && selectedImage.id === image.id ? 'ring-4 ring-[var(--color-primary)] ring-offset-2 scale-[1.02]' : 'hover:-translate-y-1'}
              `}
                        >
                            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                                <img
                                    src={image.url || 'https://via.placeholder.com/400x300'}
                                    alt={image.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Card Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <p className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.title}
                                </p>
                                <p className="text-gray-300 text-sm">{image.category}</p>
                            </div>

                            {/* Selected Indicator Icon */}
                            {selectedImage && selectedImage.id === image.id && (
                                <div className="absolute top-3 right-3 bg-white/90 text-[var(--color-primary)] p-2 rounded-full shadow-lg">
                                    <FaSearchPlus size={18} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Gallery;

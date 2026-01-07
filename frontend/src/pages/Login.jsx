import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: 'student'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData);

        // MOCK AUTHENTICATION LOGIC
        // In a real app, this would be an API call

        // Simulate successful login
        const mockToken = "mock_jwt_token_" + Date.now();
        localStorage.setItem('token', mockToken);
        localStorage.setItem('userType', formData.userType);

        // Redirect based on role
        if (formData.userType === 'staff') {
            window.location.href = '/admin/dashboard';
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-purple-600 flex items-center justify-center p-4">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold text-xl">
                            N
                        </div>
                        <div className="text-left">
                            <div className="text-xl font-bold text-white">NETHAJI</div>
                            <div className="text-sm text-gray-200 tracking-wider">VIDYALAYAM</div>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-200">Login to access your portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* User Type Tabs */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => setFormData({ ...formData, userType: 'student' })}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${formData.userType === 'student'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setFormData({ ...formData, userType: 'staff' })}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${formData.userType === 'staff'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Staff
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaEnvelope size={20} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLock size={20} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-primary hover:text-primary-hover font-medium">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            Login <FaArrowRight size={20} />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">New to Nethaji Vidyalayam?</span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <Link
                        to="/contact"
                        className="block text-center py-3 border-2 border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Contact Admissions
                    </Link>
                </div>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-200 mt-6">
                    Need help? Contact <a href="tel:+919876543210" className="text-white font-bold hover:underline">+91 98765 43210</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { X, Phone, User, PlaneTakeoff, Send, Briefcase, Mail, Loader2 } from 'lucide-react';
import { inquiryAPI } from '../utils/api';

const PopUp_Form = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        profession: '',
        tripType: 'Honeymoon Tour'
    });

    useEffect(() => {
        // Check if popup was already shown in this session
        const shownInSession = sessionStorage.getItem('haba_popup_session_shown');
        if (shownInSession) return;

        const handleShow = () => {
            setIsVisible(true);
            sessionStorage.setItem('haba_popup_session_shown', 'true');
        };

        // Trigger after 3 seconds
        const timer = setTimeout(() => {
            if (!isVisible) handleShow();
        }, 3000);

        // Trigger on 20% scroll
        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage > 20 && !isVisible) {
                handleShow();
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Save to Database
            await inquiryAPI.create(formData);
            
            // 2. Prepare WhatsApp Message
            const inquiryNumber = "916005888754";
            const message = encodeURIComponent(
                `*Haba Khatoon Travels - New Inquiry*\n\n` +
                `👤 Name: ${formData.name}\n` +
                `📧 Email: ${formData.email}\n` +
                `📱 Phone/WhatsApp: ${formData.whatsapp}\n` +
                `💼 Profession: ${formData.profession}\n` +
                `🗺️ Trip Choice: ${formData.tripType}\n\n` +
                `_I'm looking for a quote. Please contact me!_`
            );
            
            // 3. Open WhatsApp and Close Popup
            window.open(`https://wa.me/${inquiryNumber}?text=${message}`, '_blank');
            setIsVisible(false);
        } catch (error) {
            console.error('Error saving inquiry:', error);
            // Fallback: Still try to open WhatsApp even if DB save fails
            const inquiryNumber = "916005888754";
            const message = encodeURIComponent(`Hi, I'm interested in a travel plan. My name is ${formData.name}.`);
            window.open(`https://wa.me/${inquiryNumber}?text=${message}`, '_blank');
            setIsVisible(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500 opacity-100">
            <div className="relative w-full max-w-md overflow-hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transition-transform duration-300 scale-100">
                
                {/* Decorative Background Element */}
                <div className="absolute -top-24 -right-24 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>

                {/* Close Button */}
                <button 
                    onClick={() => setIsVisible(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-slate-500" />
                </button>

                <div className="p-6">
                    <div className="flex justify-center mb-3">
                        <div className="p-2.5 bg-sky-100 dark:bg-sky-900/40 rounded-xl">
                            <PlaneTakeoff className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-0.5">
                        Get a Free Travel Quote
                    </h2>
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-5 px-6">
                        Expertly planned Kashmir getaways.
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input 
                                    required
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-sky-500 rounded-lg outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white text-xs"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input 
                                    required
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@..."
                                    className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-sky-500 rounded-lg outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white text-xs"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">WhatsApp</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input 
                                    required
                                    type="tel" 
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="+91 WhatsApp"
                                    className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-sky-500 rounded-lg outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white text-xs"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Profession</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input 
                                    required
                                    type="text" 
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    placeholder="e.g. Doctor"
                                    className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-sky-500 rounded-lg outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white text-xs"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-1">Interested In</label>
                            <select 
                                name="tripType"
                                value={formData.tripType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-sky-500 rounded-lg outline-none transition-all text-slate-900 dark:text-white text-xs appearance-none cursor-pointer"
                            >
                                <option value="Honeymoon Tour">Honeymoon Tour</option>
                                <option value="Family Tour">Family Tour</option>
                                <option value="Adventure Trip">Adventure Trip</option>
                                <option value="Corporate Retreat">Corporate Retreat</option>
                                <option value="Budget Tour">Budget Tour</option>
                            </select>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="md:col-span-2 w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 mt-1.5 disabled:opacity-70 text-sm"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-3.5 h-3.5" />
                            )}
                            {isSubmitting ? 'Saving...' : 'Get Enquiry on WhatsApp'}
                        </button>
                    </form>

                    <p className="text-center text-[8px] text-slate-400 mt-5 uppercase tracking-widest leading-relaxed">
                        Haba Khatoon Travels &copy; 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopUp_Form;

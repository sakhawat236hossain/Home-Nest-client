import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebook, FaLinkedin, FaClock } from 'react-icons/fa';

const ContactUs = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;

        const contactData = { name, email, subject, message };

        try {
            const res = await axios.post('https://home-nest-server-rho.vercel.app/contact', contactData);
            
            if (res.data.insertedId) {
                toast.success("Message sent successfully!");
                form.reset(); 
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f1115] transition-colors duration-300">
            {/* Header Section */}
            <div className="relative py-24 bg-indigo-700 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.3em] text-white mb-4 border border-white/30">
                        Get In Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">
                        Contact <span className="text-indigo-200">HomeNest</span>
                    </h1>
                    <p className="mt-4 text-indigo-100 font-bold max-w-2xl mx-auto italic text-lg">
                        যেকোনো জিজ্ঞাসা বা সহযোগিতার জন্য আমাদের টিম ২৪/৭ প্রস্তুত।
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Sidebar: Contact Info */}
                    <div className="space-y-6">
                        {/* Phone Card */}
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-indigo-100/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-indigo-200">
                                <FaPhoneAlt />
                            </div>
                            <h4 className="font-black uppercase italic text-gray-800 dark:text-white text-lg">Call Us</h4>
                            <div className="mt-3 space-y-1">
                                <p className="text-gray-500 dark:text-gray-400 font-bold">+880 1700 000 000</p>
                                <p className="text-gray-500 dark:text-gray-400 font-bold">+880 1800 000 000</p>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-indigo-100/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-200">
                                <FaEnvelope />
                            </div>
                            <h4 className="font-black uppercase italic text-gray-800 dark:text-white text-lg">Email Support</h4>
                            <div className="mt-3 space-y-1">
                                <p className="text-gray-500 dark:text-gray-400 font-bold">info@homenest.com</p>
                                <p className="text-gray-500 dark:text-gray-400 font-bold">support@homenest.com</p>
                            </div>
                        </div>

                        {/* Location & Hours Card */}
                        <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-indigo-100/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-200">
                                <FaMapMarkerAlt />
                            </div>
                            <h4 className="font-black uppercase italic text-gray-800 dark:text-white text-lg">Headquarters</h4>
                            <p className="mt-3 text-gray-500 dark:text-gray-400 font-bold leading-relaxed">
                                Level 4, Sakhawat Plaza, <br /> Banani, Dhaka, Bangladesh.
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black uppercase text-[10px] tracking-widest">
                                <FaClock /> Available: Sat - Thu (9AM - 8PM)
                            </div>
                        </div>
                    </div>

                    {/* Main Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 p-8 md:p-14 rounded-[3.5rem] border border-gray-100 dark:border-gray-700 shadow-2xl shadow-indigo-100/30 dark:shadow-none h-full">
                            <div className="mb-10">
                                <h3 className="text-3xl font-black uppercase italic tracking-tight dark:text-white">
                                    Send us a <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-8">Message</span>
                                </h3>
                                <p className="mt-4 text-gray-400 font-medium italic">আমাদের আপনার মতামত বা প্রশ্ন লিখে পাঠান, আমরা দ্রুত উত্তর দেব।</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Full Name</label>
                                        <input name="name" type="text" placeholder="MD Sakhawat Hossain" className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none dark:text-white transition-all duration-300 font-bold" required />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Email Address</label>
                                        <input name="email" type="email" placeholder="sakhawat@dev.com" className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none dark:text-white transition-all duration-300 font-bold" required />
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Subject</label>
                                    <input name="subject" type="text" placeholder="Regarding Property Listing" className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-3xl outline-none dark:text-white transition-all duration-300 font-bold" required />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Message Details</label>
                                    <textarea name="message" rows="6" placeholder="How can we help you?" className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-[2rem] outline-none dark:text-white transition-all duration-300 font-bold resize-none" required></textarea>
                                </div>

                                <button type="submit" className="w-full md:w-auto px-16 py-5 bg-indigo-600 text-white font-black uppercase italic rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 text-lg">
                                    Submit Message <FaPaperPlane className="text-sm" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Call-to-Action */}
            <div className="py-20 bg-indigo-600 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <h4 className="text-white font-black uppercase italic tracking-[0.2em] text-xl mb-10">Follow Our Social Journey</h4>
                    <div className="flex justify-center gap-8">
                        <a href="https://www.facebook.com/md.sakhawth.hosain" target="_blank" rel="noreferrer" className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-[1.5rem] flex items-center justify-center text-white text-2xl hover:bg-white hover:text-indigo-600 transition-all border border-white/20 shadow-2xl">
                            <FaFacebook />
                        </a>
                        <a href="https://www.linkedin.com/in/md-sakhawat-hossain-web-developer/" target="_blank" rel="noreferrer" className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-[1.5rem] flex items-center justify-center text-white text-2xl hover:bg-white hover:text-indigo-600 transition-all border border-white/20 shadow-2xl">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
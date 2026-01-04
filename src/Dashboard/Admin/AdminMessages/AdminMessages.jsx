import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaEye, FaEnvelopeOpenText, FaUser, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMsg, setSelectedMsg] = useState(null);

    // মেসেজ লোড করা
    const fetchMessages = async () => {
        const res = await axios.get('https://home-nest-server-rho.vercel.app/messages');
        setMessages(res.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // মেসেজ ডিলিট করা
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://home-nest-server-rho.vercel.app/messages/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Message deleted!");
                    setMessages(messages.filter(msg => msg._id !== id));
                }
            }
        });
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 dark:bg-[#0f1115] min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-black uppercase italic text-gray-800 dark:text-white tracking-tighter">
                            User <span className="text-indigo-600">Messages</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold italic text-sm">Total {messages.length} messages received</p>
                    </div>
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                        <FaEnvelopeOpenText className="text-2xl" />
                    </div>
                </div>

                {/* Messages Table */}
                <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-indigo-600 text-white font-black uppercase italic text-xs tracking-widest">
                                    <th className="px-6 py-5">User</th>
                                    <th className="px-6 py-5">Subject</th>
                                    <th className="px-6 py-5">Date</th>
                                    <th className="px-6 py-5 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {messages.map((msg) => (
                                    <tr key={msg._id} className="hover:bg-indigo-50/30 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-indigo-600">
                                                    <FaUser />
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-800 dark:text-white uppercase text-xs">{msg.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold">{msg.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-600 dark:text-gray-300 truncate max-w-[200px] italic">"{msg.subject}"</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1">
                                                <FaCalendarAlt /> {new Date(msg.submittedAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button 
                                                    onClick={() => setSelectedMsg(msg)}
                                                    className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl hover:scale-110 transition-transform"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(msg._id)}
                                                    className="p-3 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl hover:scale-110 transition-transform"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* View Message Modal */}
                {selectedMsg && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h4 className="text-xl font-black uppercase italic text-indigo-600">Message Details</h4>
                                    <button onClick={() => setSelectedMsg(null)} className="text-gray-400 hover:text-red-500 font-black">CLOSE</button>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 dark:bg-gray-900 rounded-2xl">
                                        <label className="text-[10px] font-black uppercase text-gray-400">From</label>
                                        <p className="font-bold dark:text-white">{selectedMsg.name} ({selectedMsg.email})</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-gray-900 rounded-2xl">
                                        <label className="text-[10px] font-black uppercase text-gray-400">Subject</label>
                                        <p className="font-bold dark:text-white italic">"{selectedMsg.subject}"</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-gray-900 rounded-2xl">
                                        <label className="text-[10px] font-black uppercase text-gray-400">Message</label>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-1 font-medium italic">{selectedMsg.message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                                <button 
                                    onClick={() => setSelectedMsg(null)}
                                    className="px-8 py-3 bg-indigo-600 text-white font-black uppercase italic rounded-xl text-sm"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMessages;
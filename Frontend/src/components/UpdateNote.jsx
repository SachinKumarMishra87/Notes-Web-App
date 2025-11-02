import axios from 'axios';
import React, { use, useState } from 'react';
import { MdBackspace } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateNote = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)
    const noteId = location.state?.noteId;
    const [formData, setFormData] = useState({
        title: location.state?.title || '',
        content: location.state?.content || ''
    });
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        // Handle input changes here
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }
    console.log("NoteId - ",noteId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-note/${noteId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Note Updated:', response.data);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            }

        } catch (error) {
            console.error('Error creating note:', error);
            toast.error('Failed to create note. Please try again.');
        }

    }


    console.log('Formdata', formData)
    return (
        <div className=" h-screen w-full bg-black/90 flex justify-center items-center text-white">
            <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[90%] sm:w-[400px] text-white">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-2 right-2 text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
                    title="Go Back"
                >
                    <MdBackspace size={22} />
                </button>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-center mb-6">Update Your Note</h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Title Input */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-2 text-sm font-medium">
                            Enter Your Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter your title..."
                            className="p-3 rounded-md bg-white/20 border border-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-300"
                        />
                    </div>

                    {/* Note Input */}
                    <div className="flex flex-col">
                        <label htmlFor="createText" className="mb-2 text-sm font-medium">
                            Enter Your Note
                        </label>
                        <textarea
                            id="createText"
                            rows="5"
                            name='content'
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write something..."
                            className="p-3 rounded-md bg-white/20 border border-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-300 resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-md mt-4"
                        >
                            Update Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNote;

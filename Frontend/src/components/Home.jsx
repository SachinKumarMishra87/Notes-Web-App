import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Notes from './Notes';
import "../App.css"
import axios from 'axios';

const Home = () => {
    const [notes, setNotes] = useState([]); // store fetched notes
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    console.log(user);

    const fullName = JSON.parse(user)?.name || 'User';
    const firstName = user ? JSON.parse(user).name.split(' ')[0] : 'Guest';
    useEffect(() => {
        const fetchNotes = async () => {
            const token = localStorage.getItem("token");

            // agar login nahi hua hai to login page par bhej do
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-note`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Notes:", res.data.notes);
                setNotes(res.data.notes); // save notes in state
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, [navigate]); // dependency array me navigate dena zaruri hai

    return (
        <div className="">
            <Navbar />
            <div className="flex min-h-[calc(100vh-5rem)]">
                {/* Sidebar */}
                <div className="w-60 bg-[linear-gradient(to_right_bottom,#2A7B9B_30%,#57C785_50%,#EDDD53_20%)] border-r  p-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 border-b-2 py-2">Create Notes</h2>
                        <ul className="space-y-1 mb-2 hover:border-2 hover:border-green-600 rounded-lg">
                            <li onClick={() => navigate('/create-note')} className="cursor-pointer flex bg-[#130918ae] text-white font-semibold items-center hover:bg-[#130918ef] p-2 rounded-md"><span className='bg-white px-1 py-0.5 mr-2 rounded-full '>➕</span> Create</li>
                        </ul>
                    </div>

                    <div className="text-sm text-gray-500 border-t pt-2">
                        © 2025 {firstName}
                    </div>
                </div>

                {/* Main Content */}
                <div className=" bg-[linear-gradient(90deg,#6997a9_0%,#b7cfc1_50%,#bbb47a_100%)] flex mb-1 flex-wrap justify-start gap-6 p-6 w-full overflow-y-auto h-[calc(100vh-100px)]">

                    {
                        notes.length > 0 ? notes.map((note) => (
                            <Notes
                                key={note._id}
                                note={note}
                                onDeleteSuccess={(deletedId) => {
                                    setNotes(prev => prev.filter(n => n._id !== deletedId)); // ✅ instantly remove from UI
                                }}
                            />
                        )) :
                            <div className="">
                                <h1 className="text-3xl font-semibold text-[#5f1c1c] mb-4">Welcome back, {fullName}! 👋</h1>
                                <p className="text-gray-600">
                                    This is your homepage. You can add notes, manage todos, and explore settings here.
                                </p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home

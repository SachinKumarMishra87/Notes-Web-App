import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const firstName = user ? JSON.parse(user).name.split(' ')[0] : 'Guest';

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate('/login');
    }

    return (
        <div className="bg-[#0b3e0aaf] w-full h-20 flex justify-between items-center px-6 lg:px-20 shadow-md">
            <div className="cursor-pointer bg-[#130918ae] p-2 rounded-md text-white hover:border border-white transition">
                <h3 className="text-xl font-semibold">
                    Hey {firstName} <span className="text-2xl">👋</span>
                </h3>
            </div>
            <div className="cursor-pointer bg-[#130918ae] px-4 py-2 rounded-md text-[white] hover:bg-[#130918f2] hover:border border-white transition">
                {
                    token ? (
                        <h3 onClick={logout} className="font-medium">
                            Logout
                        </h3>
                    ) : (
                        <h3 onClick={() => navigate('/login')} className="font-medium">
                            Login
                        </h3>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar

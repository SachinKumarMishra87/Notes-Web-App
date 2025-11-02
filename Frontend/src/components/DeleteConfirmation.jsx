import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';


const DeleteConfirmation = ({ noteId, onclose ,onDeleteSuccess}) => {
    const token = localStorage.getItem("token");

    console.log(noteId)
    const deleteNote = async () => {
        try {
            // `${import.meta.env.VITE_BACKEND_URL}/create-note`
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-note/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            if (response.data.success) {
                toast.success(response.data.message);
                onDeleteSuccess(noteId);
                onclose();
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Failed to delete note");
        }
    }

    return (
        <div className="fixed inset-0 rounded-lg flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-3">Confirm Deletion</h2>
                <p className="text-sm text-gray-300 mb-5">
                    Are you sure you want to delete this note? This action cannot be undone.
                </p>

                <div className="flex justify-between gap-3">
                    <button
                        onClick={onclose}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button onClick={deleteNote}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded-md transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;

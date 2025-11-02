import React, { useState } from 'react'
import DeleteConfirmation from './DeleteConfirmation'
import { useNavigate } from 'react-router-dom';



const Notes = ({ note, onDeleteSuccess }) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const navigate = useNavigate();
    console.log(note)
    return (
        <div className="w-72 h-auto min-h-72 max-h-80 flex flex-col justify-between  bg-linear-to-r from-violet-200 to-pink-200 backdrop-blur-md border border-white/20 rounded-xl p-4 text-black shadow-lg hover:scale-[1.01] transition-transform duration-300">
            <div className="">
                {/* Title */}
                <h1 className="text-xl font-semibold mb-2 border-b text-black border-black pb-1">
                    {note.title}
                </h1>

                {/* Note Content */}
                <div className="h-42 overflow-y-auto text-sm text-black mb-4 custom-scrollbar pr-1 leading-relaxed tracking-wide text-justify">
                    <p>
                        {note.content}
                    </p>
                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center gap-2">
                <button onClick={() => setDeleteConfirm(true)} className="flex-1 bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 rounded-md text-sm">
                    Delete
                </button>
                <button
                    onClick={() =>
                        navigate("/update-note", {
                            state: {
                                noteId: note._id,
                                title: note.title,
                                content: note.content,
                            },
                        })
                    }
                    className="flex-1 bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-md text-sm"
                >
                    Update
                </button>

            </div>
            {
                deleteConfirm && <DeleteConfirmation noteId={note._id} onclose={() => setDeleteConfirm(false)} onDeleteSuccess={onDeleteSuccess} />
            }
        </div >
    )
}

export default Notes

import React, { useState, useEffect } from 'react';
import { Job } from '@prisma/client';
import JobDetails from './JobDetails';

type ModalProps = {
    job: Job;
    onClose: () => void;
    onApply: () => void;
};

const Modal = ({ job, onClose, onApply }: ModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        return () => {
            setIsVisible(false);
            document.body.style.overflow = ''; // Restore scroll
        };
    }, []);

    return (
        <div
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
                backdropFilter: 'blur(10px)', // Adds the blur effect to the background
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay with opacity
            }}
        >
            <div
                className={`bg-[#1C1C1E] rounded-3xl shadow-lg p-6 max-w-lg w-full relative transition-transform transform ${isVisible ? 'scale-100' : 'scale-90'}`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <JobDetails job={job} onApply={onApply} />
                <div className="mt-6 flex justify-between gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors duration-200"
                    >
                        Close
                    </button>
                    <button
                        onClick={onApply}
                        className="px-6 py-2 bg-[#FFFFFF] text-black rounded-full hover:bg-gray-300 transition-colors duration-200"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

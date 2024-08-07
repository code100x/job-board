import React, { useState, useEffect } from 'react';
import { Job } from '@prisma/client';
import JobDetails from './JobDetails';
import { X } from 'lucide-react';

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
            className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
        >
            <div
                className={`bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative transition-transform transform ${isVisible ? 'scale-100' : 'scale-90'}`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                    <X size={24} />
                </button>
                <h2 id="modal-title" className="text-2xl font-semibold mb-4 text-white">Job Details</h2>
                <JobDetails job={job} onApply={onApply} />
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors duration-200"
                    >
                        Close
                    </button>
                    <button
                        onClick={onApply}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

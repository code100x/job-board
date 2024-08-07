// components/Modal.tsx
import React, { useState, useEffect } from 'react';
import { Job } from '@prisma/client';
import JobDetails from './JobDetails';
import { X } from 'lucide-react';

type ModalProps = {
    job: Job;
    onClose: () => void;
    userRole: string;
};

const Modal = ({ job, onClose, userRole }: ModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);

    const isUser = userRole === 'USER'; // Check if the role is USER

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
        >
            <div
                className={`bg-white rounded-md shadow-lg p-4 max-w-md w-full relative transition-transform transform ${isVisible ? 'scale-100' : 'scale-90'}`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    <X size={24} />
                </button>
                <JobDetails job={job} />
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
                    >
                        Close
                    </button>
                    {isUser && (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Apply
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;

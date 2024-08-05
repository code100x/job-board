import { searchBarInput } from '@/store/state';
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

const useTypingAnimation = (roles: string[], typingSpeed: number, pauseDuration: number) => {
    const [placeholder, setPlaceholder] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (isTyping) {
                if (charIndex < roles[roleIndex].length) {
                    setPlaceholder(prev => prev + roles[roleIndex][charIndex]);
                    setCharIndex(prev => prev + 1);
                } else {
                    setIsTyping(false);
                }
            } else {
                if (charIndex > 0) {
                    setPlaceholder(prev => prev.slice(0, -1));
                    setCharIndex(prev => prev - 1);
                } else {
                    setIsTyping(true);
                    setRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [isTyping, charIndex, roleIndex, roles, typingSpeed]);

    return [placeholder, isTyping] as const;
};

const AnimatedSearchBar: React.FC = () => {
    const [searchinput, setSearchInput] = useRecoilState(searchBarInput);
    const [placeholder, isTyping] = useTypingAnimation(['Software Engineer', 'Data Scientist', 'UX Designer', 'Product Manager'], 150, 1500);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (inputRef.current?.value === '') {
            setIsFocused(false);
        }
    };

    return (
        <div className="relative max-w-md mx-auto">
            <input
                ref={inputRef}
                type="text"
                className="w-full py-2 pl-14 pr-4 text-2xl text-black font-semibold bg-white border rounded-full focus:outline-none focus:border-blue-500 placeholder-black placeholder-opacity-100"
                placeholder={isFocused ? '' : placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={e => setSearchInput(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-black text-2xl" />
            </div>
        </div>
    );
};

export default AnimatedSearchBar;

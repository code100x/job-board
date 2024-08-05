import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="mt-8  border-gray-700 text-center text-gray-400">
                <p>&copy; {currentYear} 100xdevs Job Portal. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
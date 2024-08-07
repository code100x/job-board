import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start space-y-8 xl:space-y-0">
          <div className="space-y-6 xl:w-1/4">
            <p className="text-base leading-6 font-bold text-gray-900 uppercase tracking-wider">
              100xJobs
            </p>
            <p className="text-base leading-6">
              India's most rapidly growing developer community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:w-3/4">
            <div className="flex flex-col items-center md:items-start">
              <ul className="space-y-4 cursor-pointer">
                <li className="text-base leading-6">Remote Job</li>
                <li className="text-base leading-6">Startup</li>
                <li className="text-base leading-6">Investor & Board</li>
                <li className="text-base leading-6">Company</li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <ul className="space-y-4 cursor-pointer">
                <li className="text-base leading-6">For Candidates</li>
                <li className="text-base leading-6">For Company</li>
                <li className="text-base leading-6">Society</li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <ul className="space-y-4 cursor-pointer">
                <li className="text-base leading-6">About us</li>
                <li className="text-base leading-6">Contact us</li>
                <li className="text-base leading-6">Career</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex space-x-6 justify-center md:order-2">
            <a
              href="https://www.youtube.com/@100xDevs-n1w"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">YouTube</span>
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/company/100xdevs/"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/100xDevs"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <FaTwitter />
            </a>
          </div>
          <p className="text-base leading-6 text-gray-400 text-center md:text-left md:order-1">
            &copy; 2024 100xJobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

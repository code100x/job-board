"use client";

import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start space-y-8 xl:space-y-0">
          <div className="space-y-4 xl:w-1/3 text-center xl:text-left">
            <p className="text-lg font-semibold uppercase tracking-wide text-black">
              100xJobs
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              India's most rapidly growing developer community
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 xl:w-2/3">
            <div className="flex flex-col items-center md:items-start">
              <ul className="space-y-2 cursor-pointer">
                <li className="relative group">
                  <a
                    href="https://www.youtube.com/@100xDevs-n1w"
                    className="text-sm hover:text-gray-800"
                  >
                    YouTube
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="https://www.linkedin.com/company/100xdevs/"
                    className="text-sm hover:text-gray-800"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <ul className="space-y-2 cursor-pointer">
                <li className="relative group">
                  <span className="text-sm hover:text-gray-800">
                    For Candidates
                  </span>
                </li>
                <li className="relative group">
                  <span className="text-sm hover:text-gray-800">
                    For Company
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <ul className="space-y-2 cursor-pointer">
                <li className="relative group">
                  <span className="text-sm hover:text-gray-800">About us</span>
                </li>
                <li className="relative group">
                  <span className="text-sm hover:text-gray-800">
                    Contact us
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex space-x-6 justify-center md:order-2">
            <a
              href="https://www.youtube.com/@100xDevs-n1w"
              className="text-gray-600 hover:text-black transition-colors duration-300"
            >
              <span className="sr-only">YouTube</span>
              <FaYoutube size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/100xdevs/"
              className="text-gray-600 hover:text-black transition-colors duration-300"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://x.com/100xDevs"
              className="text-gray-600 hover:text-black transition-colors duration-300"
            >
              <span className="sr-only">Twitter</span>
              <FaTwitter size={20} />
            </a>
          </div>
          <p className="text-sm leading-6 text-gray-600 text-center md:text-left md:order-1">
            &copy; 2024 100xJobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

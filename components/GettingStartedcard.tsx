"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GettingStartedCard = () => {
  const steps = [
    {
      id: "01",
      title: "Login or Register",
      description: "Follow all the steps and you’re ready to get started.",
    },
    {
      id: "02",
      title: "Fill Your Personal Data",
      description:
        "Finish your registration, complete your personal data, and prepare your resume.",
    },
    {
      id: "03",
      title: "Upload Your Resume",
      description: "Upload your latest resume that matches your background.",
    },
    {
      id: "04",
      title: "Find the Match Job",
      description: "Look for job vacancies and immediately find your dream job.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 font-inter  to-white">
      <div className="text-center py-8">
        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 mb-4">
          Getting Started is Easy
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create a profile and we'll match you with the best companies and jobs
          in the world. Start your journey towards your dream career today.
        </p>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center justify-center space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 mt-6 w-full max-w-4xl">
        <div className="bg-transparent p-6 space-y-3">
          <div className="float-start w-full">
            <p className="text-3xl font-bold text-black mb-1">
              Fill Your Personal Data
            </p>
            <p className="text-md mb-3">
              Finish your registration and complete your personal data and
              prepare your resume.
            </p>
            <div className="flex items-center mb-2">
              <p className="text-sm">
                <span className="font-bold">One Workflow:</span> Easily
                collaborate with teams to find and hire the right candidate.
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-sm">
                <span className="font-bold">Easier Applying:</span> Create an
                account that will engage your profile.
              </p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <Image
            src="/getstarted.jpeg"
            width={300}
            height={200}
            alt="Getting Started Picture"
            className="rounded-lg shadow-md"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 w-full max-w-4xl">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white border p-4 text-center hover:shadow-lg hover:border-blue-500 rounded-lg"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-lg font-semibold">{step.id}</h3>
            <h4 className="text-sm font-medium">{step.title}</h4>
            <p className="text-xs">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GettingStartedCard;

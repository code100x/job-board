"use client"
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4 text-center">{description}</p>
      <button className="mt-auto text-blue-600 hover:text-blue-800 transition duration-300">
        Learn More →
      </button>
    </motion.div>
  );
};

export default FeatureCard;

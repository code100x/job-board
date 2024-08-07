"use client"
import { motion } from 'framer-motion';

const companies = [
  { name: 'Expedia', logo: '/Company/amazon.svg' },
  { name: 'IBM', logo: '/Company/ibm.svg' },
  { name: 'Microsoft', logo: '/Company/microsoft.svg' },
  { name: 'Salesforce', logo: '/Company/salesforce.svg' },
  { name: 'Siemens', logo: '/Company/siemens.svg' },
  { name: 'Volvo', logo: '/Company/volvo.svg' },
  { name: 'Walmart', logo: '/Company/walmart.svg' },
  { name: 'Slack', logo: '/Company/slack.svg' }
];

const TrustedCompanies: React.FC = () => {
    return (
      <div className="bg-white px-20 py-10 max-w-screen-lg mx-auto">
        <h2 className="text-center text-lg font-semibold mb-6">Trusted by the world's best companies</h2>
        <div className="grid grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <motion.img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-24 w-24 object-contain my-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <span className="text-sm text-gray-500">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TrustedCompanies;

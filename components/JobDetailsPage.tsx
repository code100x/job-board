'use client'

import { Job } from "@prisma/client"
import { Banknote, MapPin, Briefcase, Clock } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

type JobDetailsProps = {
  job: Job
}

const JobDetailsPage = ({ job }: JobDetailsProps) => {
  const { title, description, companyName, salary, currency, location } = job
  const currencySign = currency === "USD" ? "$" : "₹"
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const MAX_LENGTH = 500;
  const truncatedDescription = description.length > MAX_LENGTH ? description.slice(0, MAX_LENGTH) + "..." : description;
  return (
    <div className="max-w-4xl mx-auto my-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <h2 className="text-xl text-blue-100 mt-2">{companyName}</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center">
            <Banknote className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-semibold">{currencySign}{salary}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{location}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Briefcase className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-semibold">{"Full-time"}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Posted</p>
              <p className="font-semibold">2 days ago</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <p className="text-base text-gray-700 ">
          {isExpanded ? description : truncatedDescription}
          {description.length > MAX_LENGTH && (
            <span className="text-blue-600 cursor-pointer ml-2" onClick={toggleDescription}>
              {isExpanded ? "See Less" : "See More"}
            </span>
          )}
        </p>
        </div>
        
        <div className="mt-8">
          <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage
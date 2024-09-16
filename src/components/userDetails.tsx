import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const UserDetails = () => {
  return (
    <main className="flex justify-center items-center h-screen ">
      <section className=" py-12 md:py-24 lg:py-32    ">
        <div className="container px-4 md:px-6 bg-transparent backdrop-blur-md text-white border-[#27272B] border   ">
          <div className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-4xl text-white m-4 text-center ">
            Update Details
          </div>
          <div className="flex sm:w-full flex gap-2 ">
            <Input placeholder="First Name"></Input>
            <Input placeholder="Last Name"></Input>
          </div>
          <div className="flex sm:w-full flex flex-col gap-2 mt-2">
            <Input placeholder="Github"></Input>
            <Input placeholder="LinkedIn"></Input>
            <Input placeholder="Twitter"></Input>
            <Input placeholder="LPA"></Input>
          </div>

          <div className="flex mt-2 sm:flex  flex flex-col gap-2 mt-2 ">
            <Button className="w-full sm:w-auto  animate-fade-in-up bg-white text-black hover:bg-gray-300">Upload Resume</Button>
            <Button className="w-full sm:w-auto  animate-fade-in-up bg-white text-black hover:bg-gray-300">Applied To</Button>
            <Button className="w-full sm:w-auto animate-fade-in-up bg-white text-black hover:bg-gray-300">Submit</Button>
          </div>
        </div>
      </section>
    </main>

  );
};

export default UserDetails;

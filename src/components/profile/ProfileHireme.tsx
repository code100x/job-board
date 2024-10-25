import { ArrowRight, Mail } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

const ProfileHireme = () => {
  return (
    <>
      <div className="border rounded-2xl bg-gradient-to-b from-white to-slate-100 dark:from-gray-800 dark:to-gray-900  h-40 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <div className="text-center">
          <h4 className="font-bold text-xl">
            Hire Me, Let’s Make Magic Happen!
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Searching for talent that can drive success? I’m ready to contribute
            to your goals!
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button className="text-white rounded-sm flex gap-1">
            <Mail /> <p> Contact Me</p>
          </Button>
          <Button
            className="dark:text-slate-400  rounded-sm flex gap-1 bg-transparent text-slate-500"
            variant={'outline'}
          >
            Contact Me
            <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileHireme;

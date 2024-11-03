import { ArrowRight, Mail } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

const ProfileHireme = ({
  contactEmail,
  email,
  resume,
}: {
  contactEmail: string;
  email: string;
  resume: string;
}) => {
  return (
    <>
      <div className="border rounded-2xl bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950  min-h-40 overflow-hidden flex flex-col gap-y-4 px-6 py-4 items-center justify-center">
        <div className="text-center">
          <h4 className="font-bold text-xl">
            Hire Me, Let’s Make Magic Happen!
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Searching for talent that can drive success? I’m ready to contribute
            to your goals!
          </p>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row items-center justify-center w-full">
          <Link
            href={`mailto:${contactEmail ? contactEmail : email}`}
            className="bg-[#3259E8] px-3 py-2 text-white rounded-xs flex gap-1 max-sm:w-full justify-center"
          >
            <Mail /> <p> Contact Me</p>
          </Link>
          {resume && (
            <Link
              href={resume}
              target="_blank"
              className="dark:text-slate-400 bg-white border-slate-200 px-3 py-2 dark:bg-[#020817]  rounded-xs border dark:border-slate-800 flex gap-1 bg-transparent text-slate-500 max-sm:w-full justify-center"
            >
              View Resume
              <ArrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHireme;

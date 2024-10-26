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
      <div className="border rounded-2xl bg-gradient-to-b from-white to-slate-100 dark:from-gray-800 dark:to-gray-900  min-h-40 overflow-hidden flex flex-col gap-y-4 px-6 py-4 items-center justify-center">
        <div className="text-center">
          <h4 className="font-bold text-xl">
            Hire Me, Let’s Make Magic Happen!
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Searching for talent that can drive success? I’m ready to contribute
            to your goals!
          </p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row items-center">
          <Link
            href={`mailto:${contactEmail ? contactEmail : email}`}
            className="bg-[#3259E8] px-3 py-2 text-white rounded-sm flex gap-1"
          >
            <Mail /> <p> Contact Me</p>
          </Link>
          {resume && (
            <Link
              href={resume}
              target="_blank"
              className="dark:text-slate-400 bg-white border-slate-200 px-3 py-2 dark:bg-[#020817]  rounded-sm flex gap-1 bg-transparent text-slate-500"
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

'use client';
import { getUserDetailsWithId } from '@/actions/user.profile.actions';
import ProfileAboutMe from '@/components/profile/ProfileAboutMe';
import ProfileEducation from '@/components/profile/ProfileEducation';
import ProfileExperience from '@/components/profile/ProfileExperience';
import ProfileHeroSection from '@/components/profile/ProfileHeroSection';
import ProfileHireme from '@/components/profile/ProfileHireme';
import ProfileProjects from '@/components/profile/ProfileProjects';
import ProfileResume from '@/components/profile/ProfileResume';
import ProfileSkills from '@/components/profile/ProfileSkills';
import { UserType } from '@/types/user.types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Page = ({ params: { userId } }: { params: { userId: string } }) => {
  const [userDetails, setUserDetails] = useState<null | UserType>(null);

  const { data, status } = useSession();

  const isOwner = status === 'authenticated' && data?.user.id === userId;

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getUserDetailsWithId(userId);
      if (res.status) {
        setUserDetails(res.additional);
      }
    };
    fetchDetails();
  }, [userId]);

  return (
    <>
      {userDetails && (
        <>
          <ProfileHeroSection userdetails={userDetails} />
          <ProfileAboutMe
            aboutMe={userDetails.aboutMe || ''}
            isOwner={isOwner}
          />
          <ProfileResume
            resume={userDetails.resume || ''}
            isOwner={isOwner}
            name={userDetails.name}
            resumeUpdateDate={userDetails.resumeUpdateDate || new Date()}
          />
          <ProfileSkills isOwner={isOwner} skills={userDetails.skills} />
          <ProfileProjects projects={userDetails.project} isOwner={isOwner} />
          <ProfileExperience
            isOwner={isOwner}
            experiences={userDetails.experience}
          />
          <ProfileEducation
            isOwner={isOwner}
            education={userDetails.education}
          />
          <ProfileHireme />
        </>
      )}
    </>
  );
};

export default Page;

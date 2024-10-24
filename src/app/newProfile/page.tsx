import ProfileAboutMe from '@/components/profile/ProfileAboutMe';
import ProfileEducation from '@/components/profile/ProfileEducation';
import ProfileExperience from '@/components/profile/ProfileExperience';
import ProfileHeroSection from '@/components/profile/ProfileHeroSection';
import ProfileHireme from '@/components/profile/ProfileHireme';
import ProfileProjects from '@/components/profile/ProfileProjects';
import ProfileResume from '@/components/profile/ProfileResume';
import ProfileSkills from '@/components/profile/ProfileSkills';
import React from 'react';

const page = () => {
  return (
    <>
      <ProfileHeroSection />
      <ProfileAboutMe />
      <ProfileResume />
      <ProfileSkills />
      <ProfileProjects />
      <ProfileExperience />
      <ProfileEducation />
      <ProfileHireme />
    </>
  );
};

export default page;

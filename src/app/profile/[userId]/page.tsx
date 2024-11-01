import { getUserDetailsWithId } from '@/actions/user.profile.actions';
import Custom404Page from '@/app/[...404]/page';
import ProfileAboutMe from '@/components/profile/AboutMe';
import ProfileEducation from '@/components/profile/ProfileEducation';
import ProfileExperience from '@/components/profile/ProfileExperience';
import ProfileHeroSection from '@/components/profile/ProfileHeroSection';
import ProfileHireme from '@/components/profile/ProfileHireme';
import ProfileProjects from '@/components/profile/ProfileProjects';
import ProfileResume from '@/components/profile/ProfileResume';
import ProfileSkills from '@/components/profile/ProfileSkills';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const Page = async ({ params: { userId } }: { params: { userId: string } }) => {
  const session = await getServerSession(authOptions);

  const isOwner = session?.user.id === userId;
  let userDetails;
  const res = await getUserDetailsWithId(userId);
  if (res.status) {
    userDetails = res.additional;
  }

  if (!res.status) {
    return <Custom404Page />;
  }

  return (
    <>
      {userDetails && (
        <>
          <ProfileHeroSection userdetails={userDetails} />
          <ProfileAboutMe aboutMe={userDetails.about || ''} isOwner={isOwner} />
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
          <ProfileHireme
            email={userDetails.email}
            contactEmail={userDetails.contactEmail || ''}
            resume={userDetails.resume || ''}
          />
        </>
      )}
    </>
  );
};

export default Page;

"use client";
import React, { useEffect, useState } from "react";
import AboutSection from "@/components/forms/profile/AboutSection";
import SocialProfilesSection from "@/components/forms/profile/ocialProfilesSection";
import WorkExperienceSection from "@/components/forms/profile/WorkExperienceSection";
import SkillsSection from "@/components/forms/profile/SkillsSection";
import AchievementsSection from "@/components/forms/profile/AchievementsSection";
import { Button } from "@/components/ui/button";
import { handleSaveProfileData, fetchProfileData } from "@/actions/profile";
import { isEqual } from "lodash";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export type Projects = {
  id: string;
  companyName: string;
  title: string;
  startDate: string;
  endDate?: string | null;
  currentlyWork: boolean;
  description?: string | null;
  positionType: "FULLTIME" | "PARTTIME" | "CONTRACT" | "INTERNSHIP";
};

export type ProfileData = {
  name: string;
  location: string;
  role: string;
  experience: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  projects: Projects[];
  skills: string[];
  achievements: string;
};

export type HandleChangeFunction = (sectionData: Partial<ProfileData>) => void;

const WellfoundProfileAboutSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    location: "",
    role: "",
    experience: "1 Year",
    bio: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    projects: [],
    skills: [],
    achievements: "",
  });

  const [savedProfileData, setSavedProfileData] = useState<ProfileData | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const fetchedProfileData = await fetchProfileData();
        if (fetchedProfileData) {
          // @ts-ignore
          setProfileData(fetchedProfileData);
          // @ts-ignore
          setSavedProfileData(fetchedProfileData);
        } else {
          console.log("No profile data found for this user.");
        }
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    };

    fetchExperienceData();
  }, []);

  useEffect(() => {
    if (savedProfileData) {
      setHasChanges(!isEqual(profileData, savedProfileData));
    }
  }, [profileData, savedProfileData]);

  const handleChange = (sectionData: any) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...sectionData,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // @ts-ignore
      await handleSaveProfileData(profileData);
      setSavedProfileData(profileData);
      setHasChanges(false);
      toast({
        title: "Changes Saved!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Failed to make Changes!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full mx-auto px-64 mt-12 bg-white">
      <h1 className="text-3xl font-bold mb-6">Edit your profile</h1>
      <nav className="flex space-x-6 mb-6 border-b">
        <a href="#" className="text-gray-500 pb-2">
          Overview
        </a>
        <a
          href="/profile"
          className="font-semibold border-b-2 border-black pb-2"
        >
          Profile
        </a>
        <a href="#" className="text-gray-500 pb-2">
          Resume / CV
        </a>
        <a href="#" className="text-gray-500 pb-2">
          Preferences
        </a>
        <a href="#" className="text-gray-500 pb-2">
          Culture
        </a>
      </nav>
      <div className="flex flex-col mb-8 shadow-lg p-7 rounded-md gap-10">
        <AboutSection
          changes={hasChanges}
          save={handleSave}
          loading={isLoading}
          data={profileData}
          onChange={handleChange}
        />
        <SocialProfilesSection
          data={profileData}
          onChange={handleChange}
          loading={isLoading}
          save={handleSave}
          changes={hasChanges}
        />

        <WorkExperienceSection data={profileData} onChange={handleChange} />

        <SkillsSection
          data={profileData}
          onChange={handleChange}
          loading={isLoading}
          save={handleSave}
          changes={hasChanges}
        />

        <AchievementsSection
          data={profileData}
          onChange={handleChange}
          loading={isLoading}
          save={handleSave}
          changes={hasChanges}
        />
      </div>
      {hasChanges && (
        <Button
          onClick={handleSave}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Save Profile"
          )}
        </Button>
      )}
    </div>
  );
};

export default WellfoundProfileAboutSection;

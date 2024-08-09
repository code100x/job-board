"use server";

import { auth } from "@/auth";
import { ProfileData } from "@/zod/profile";
import { prisma } from "@/lib/db";

export const handleSaveProfileData = async (inputData: ProfileData) => {

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { status: "error", message: "Internal Server Error" };
  }

  const userId = session.user.id;
 

  try {
    const mostRecentExperience = await prisma.profile.findFirst({
      where: { userId },
      include: { projects: true }, 
    });

    if (!mostRecentExperience) {
      const newExperience = await prisma.profile.create({
        data: {
          userId,
          ...inputData,
          projects: {
            create: inputData.projects.map((project) => ({
              companyName: project.companyName,
              title: project.title,
              startDate: project.startDate,
              endDate: project.endDate,
              currentlyWork: project.currentlyWork,
              description: project.description,
              positionType: project.positionType,
            })),
          },
        },
        include: { projects: true },
      });

      return newExperience;
    }

    const updatedExperience = await prisma.profile.update({
      where: { id: mostRecentExperience.id },
      data: {
        ...inputData,
        projects: {
          upsert: inputData.projects.map((project) => ({
            where: { id: project.id || "0" }, 
            update: {
              companyName: project.companyName,
              title: project.title,
              startDate: project.startDate,
              endDate: project.endDate,
              currentlyWork: project.currentlyWork,
              description: project.description,
              positionType: project.positionType,
            },
            create: {
              companyName: project.companyName,
              title: project.title,
              startDate: project.startDate,
              endDate: project.endDate,
              currentlyWork: project.currentlyWork,
              description: project.description,
              positionType: project.positionType,
            },
          })),
        },
      },
      include: { projects: true },
    });

    return updatedExperience;

  } catch (error) {
    console.error("Error handling profile data save:", error);
    throw new Error("Failed to save profile data.");
  }
};



export const fetchProfileData = async () => {
 
 const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { status: "error", message: "Internal Server Error" };
  }

  const userId = session.user.id;
 
  try {
    const mostRecentExperience = await prisma.profile.findFirst({
      where: { userId },
      include: { projects: true }, 
    });

    if (!mostRecentExperience) {
      return null;
    }

    const fetchedProfileData = {
      name: mostRecentExperience.name,
      location: mostRecentExperience.location,
      role: mostRecentExperience.role,
      experience: mostRecentExperience.experience,
      bio: mostRecentExperience.bio || "",
      website: mostRecentExperience.website || "",
      linkedin: mostRecentExperience.linkedin || "",
      github: mostRecentExperience.github || "",
      twitter: mostRecentExperience.twitter || "",
      projects: mostRecentExperience.projects.map((project) => ({
        id: project.id,
        companyName: project.companyName,
        title: project.title,
        startDate: project.startDate,
        endDate: project.endDate,
        currentlyWork: project.currentlyWork,
        description: project.description || "",
        positionType: project.positionType,
      })),
      skills: mostRecentExperience.skills,
      achievements: mostRecentExperience.achievements || "",
    };

    return fetchedProfileData;

  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw new Error("Failed to fetch profile data.");
  }
};

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import WorkExperienceForm from "@/components/forms/profile/WorkExpForm";
import {
  HandleChangeFunction,
  ProfileData,
} from "@/app/(protected)/profile/page";

interface AboutSectionProps {
  data: ProfileData;
  onChange: HandleChangeFunction;
}

const WorkExperienceSection = ({ data, onChange }: AboutSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddExperience = (projects: any & { id: string }) =>  {
    let updatedExperiences;
    if (editingId) {
      updatedExperiences = data.projects.map((exp) =>
        exp.id === editingId ? projects : exp
      );
    } else {
      updatedExperiences = [...data.projects, projects];
    }
    onChange({ projects: updatedExperiences });
    setIsVisible(false);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsVisible(true);
  };

  return (
    <div className="flex border-b-2 space-x-20 pb-10">
      <div className="w-96">
        <h2 className="text-lg font-semibold mb-2">Your work experience</h2>
        <p className="text-sm text-gray-500 mb-4">
          What other projects have you built?
        </p>
      </div>
      <div className="w-full">
        {/* Display existing experiences */}
        {data.projects.map((exp) => (
          <div key={exp.id} className="bg-gray-100 w-full p-4 mb-4 rounded-lg shadow">
            <h2 className="text-sm font-medium">{exp.companyName}</h2>
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-gray-500 text-sm">{exp.title}</p>
                <p className="text-gray-500 text-sm">{`${exp.startDate} to ${exp.currentlyWork ? "Present" : exp.endDate}`}</p>
              </div>
              <Button
              variant="ghost"
                className="text-blue-500 mt-2 text-sm hover:underline"
                onClick={() => handleEdit(exp.id)}
              >
                Edit
              </Button>
            </div>
            <p className="mt-2 text-sm">{exp.description}</p>
          </div>
        ))}
        {isVisible && (
          <WorkExperienceForm
            onSave={handleAddExperience}
            editingId={editingId}
            // @ts-ignore
            experiences={data.projects}
          />
        )}
        <Button variant="ghost" onClick={() => setIsVisible(true)} className="text-blue-600 text-sm">
          + Add Work Experience
        </Button>
      </div>
    </div>
  );
};

export default WorkExperienceSection;

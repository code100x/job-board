import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { HandleChangeFunction, ProfileData } from "@/app/(protected)/profile/page"
import { AboutSectionProps } from "./AboutSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AchievementsSection: React.FC<AboutSectionProps> = ({ data, onChange, loading, save, changes }) => {
  const handleInputChange = (e:any) => {
    const { id, value } = e.target;
    onChange({ [id]: value });
  };

  return (
    <div className="flex space-x-32 pb-10">
      <div className="w-96">
        <h2 className="text-lg font-semibold mb-2">Your Achievements</h2>
        <p className="text-sm text-gray-500 mb-4">What are you proud of?</p>
      </div>
      <div className="w-full">
        <Textarea
          id="achievements"
          value={data.achievements}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows={10}
        />
      </div>
      {changes && (
        <Button
          onClick={save}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ?   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Profile"}
        </Button>
      )}

    </div>
  );
};

export default AchievementsSection;

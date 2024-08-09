import React from "react";
import { Input } from "@/components/ui/input";
import { Globe, Linkedin, Github, Twitter, Loader2 } from "lucide-react";
import {
  HandleChangeFunction,
  ProfileData,
} from "@/app/(protected)/profile/page";
import { AboutSectionProps } from "./AboutSection";
import { Button } from "@/components/ui/button";

const SocialProfilesSection: React.FC<AboutSectionProps> = ({ data, onChange, loading, save, changes }) => {
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    onChange({ [id]: value });
  };

  return (
    <div className="flex border-b-2 space-x-20 pb-10">
      <div className="w-96">
        <h2 className="text-lg font-semibold mb-2">Social Profiles</h2>
        <p className="text-sm text-gray-500 mb-4">
          Where can people find you online?
        </p>
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center">
          <Globe className="mr-2" size={20} />
          <Input
            id="website"
            type="text"
            value={data.website}
            onChange={handleInputChange}
            className="flex-1 p-2 border rounded"
            placeholder="https://"
          />
        </div>
        <div className="flex items-center">
          <Linkedin className="mr-2" size={20} />
          <Input
            id="linkedin"
            type="text"
            value={data.linkedin}
            onChange={handleInputChange}
            className="flex-1 p-2 border rounded"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div className="flex items-center">
          <Github className="mr-2" size={20} />
          <Input
            id="github"
            type="text"
            value={data.github}
            onChange={handleInputChange}
            className="flex-1 p-2 border rounded"
            placeholder="https://github.com/username"
          />
        </div>
        <div className="flex items-center">
          <Twitter className="mr-2" size={20} />
          <Input
            id="twitter"
            type="text"
            value={data.twitter}
            onChange={handleInputChange}
            className="flex-1 p-2 border rounded"
            placeholder="https://twitter.com/username"
          />
        </div>
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

export default SocialProfilesSection;

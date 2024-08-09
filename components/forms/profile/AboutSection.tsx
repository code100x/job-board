import React from "react";
import { Input } from "@/components/ui/input";
import {
  HandleChangeFunction,
  ProfileData,
} from "@/app/(protected)/profile/page";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";

export interface AboutSectionProps {
  data: ProfileData;
  onChange: HandleChangeFunction;
  loading: boolean;
  save: () => void;
  changes: boolean;
}

const AboutSection = ({ data, onChange, loading, save, changes }: AboutSectionProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (target) {
      const { id, value, type } = target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;

      if (type === "select-one") {
        onChange({ [id]: value });
      } else {
        onChange({ [id]: value });
      }
    } else {
      console.error("e.target is undefined");
    }
  };

  const handleSelectChange = (key: string, value: string) => {
    onChange({ [key]: value });
  };
  

  return (
    <div className="flex border-b-2 space-x-20 pb-10">
      <div className="w-96">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-sm text-gray-500 mb-4 pr-10">
          Tell us about yourself so startups know who you are.
        </p>
      </div>

      <div className="space-y-4 w-full">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your name*
          </label>
          <Input
            type="text"
            id="name"
            value={data.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <Image
              src="/"
              width={13}
              height={13}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="ghost"
            className="px-4 py-2 border border-gray-300 rounded text-sm"
          >
            Upload a new photo
          </Button>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Where are you based?*
          </label>
          <div className="relative">
            <Input
              type="text"
              id="location"
              value={data.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded pr-8"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <Select onValueChange={(value) => handleSelectChange('role', value)} defaultValue={data.role}>
              <Label>Select your primary role*</Label>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={data.role} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Stack">Full Stack</SelectItem>
                <SelectItem value="Frontend Engineer">Frontend Engineer</SelectItem>
                <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                <SelectItem value="Mobile Developer">Mobile Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-fit">
            <Select
             onValueChange={(value) => handleSelectChange('experience', value)} defaultValue={data.experience}
            >
              <Label>Years of Experience*</Label>
              <SelectTrigger className="w-full">
              <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1 Year">1 Year</SelectItem>
                <SelectItem value="1-3 Years">1-3 Years</SelectItem>
                <SelectItem value="3-5 Years">3-5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your bio
          </label>
          <textarea
            id="bio"
            value={data.bio}
            onChange={handleInputChange}
            placeholder="CS grad, Full Stack, Launched consumer products"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
          <div className="text-right text-sm text-gray-500 pb-2">
            {data.bio.length}
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
    </div>
  );
};

export default AboutSection;

'use client';

import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

export const AddHR = () => {
  const [hrData, setHRData] = useState({
    companyImage: '',
    description: '',
    name: '',
    email: '',
  });

  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHRData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setHRData((prev) => ({
      ...prev,
      companyImage: imageURL,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the save operation here

    try {
      toast({
        variant: 'success',
        title: 'HR profile Created Successfully',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Something went wrong, please try again!',
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-start my-3 gap-4">
      <div className="flex w-full mt-2 p-4 border rounded-md">
        <Avatar className="h-20 w-20">
          <AvatarImage src={hrData.companyImage} />
          <AvatarFallback>CI</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-md w-full min-h-[40vh]">
        <div className="flex justify-between items-center mb-3">
          <span>Add HR</span>
        </div>

        {/* Company Image */}
        <div className="flex flex-col gap-4">
          <Label>Company Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4">
          <Label>Description</Label>
          <Textarea
            name="description"
            value={hrData.description}
            onChange={handleInputChange}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
            placeholder="Enter company description"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-4">
          <Label>Name</Label>
          <Input
            name="name"
            value={hrData.name}
            onChange={handleInputChange}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
            placeholder="Enter HR name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-4">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={hrData.email}
            onChange={handleInputChange}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
            placeholder="Enter HR email"
          />
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="mt-4">
          Create
        </Button>
      </div>
    </div>
  );
};

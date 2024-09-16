'use client'
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast, useToast } from './ui/use-toast';
import axios from "axios"

const UserDetails = () => {

  const [firstName, setFirstName] = useState("Harkirat")
  const [lastName, setLastName] = useState("Singh")
  const [github, setGithub] = useState("https://github.com/code100x/job-board")
  const [linkedIn, setLinkedIn] = useState("https://www.linkedin.com/in/kirat-li/")
  const [twitter, setTwitter] = useState("https://x.com/kirat_tw")
  const [Lpa, setLpa] = useState(12)

  const { toast } = useToast()
  const [resumeFile, setResumeFile] = useState<any>(null)
  const [isResumeUploading, setisResumeUploading] = useState(false)
  const uploadResume = async () => {
    if (resumeFile == null) {
      return toast({
        description: "Please add file first",
        variant: "destructive"
      })
    }
    setisResumeUploading(true)
    try {
      const formData = new FormData();
      const uniqueFileName = `${Date.now()}-${resumeFile.name}`;

      formData.append('file', resumeFile);
      formData.append('uniqueFileName', uniqueFileName);


      const response = await axios.post('/api/upload-to-cdn', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response)
      setisResumeUploading(false)
      toast({
        description: "File uploaded successfully!",
        variant: "success"
      });
    } catch (error) {
      setisResumeUploading(false)

      toast({
        description: "File upload failed.",
        variant: "destructive"
      });
    }
  }

  // const handleFileChange = async (e: any) => {
  //   const selectedFile = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.readAsDataURL(selectedFile);
  //   if (selectedFile) {
  //     setResumeFile(selectedFile);
  //   }
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  return (
    <div className="h-[100vh] flex mt-14 items-center md:items-start flex-col md:flex-row  md:justify-center ">
      <div className="max-w-[300px] w-[350px] flex flex-col gap-4 items-center p-4">
        <div>
          <Button className="w-[200px] m-auto">Applied to</Button>
        </div>
        <div>
          <Button className="w-[200px] m-auto">Update Details</Button>
        </div>
      </div>
      <div>
        <div className="flex flex-col  max-w-[600px] gap-3 mx-8">
          <div className="flex gap-3 justify-between">
            <Input value={firstName} placeholder="First name" />
            <Input value={lastName} placeholder="Last name" />
          </div>
          <div>
            <Input placeholder="Github" value={github} />
          </div>
          <div>
            <Input placeholder="LinkedIn" value={linkedIn} />
          </div>
          <div>
            <Input placeholder="Twitter" value={twitter} />
          </div>
          <div className='flex'>
            <Input type='file' onChange={handleFileChange} />
          </div>
          <Button
            onClick={uploadResume}
          >
            {
              isResumeUploading ? "Uploading your resume" : " Upload Resume"
            }

          </Button>

          <div className="flex justify-between">
            <div className='flex flex-col justify-center  gap-2'>
              <Input placeholder="LPA " value={Lpa} className="max-w-[135px]" />
              <div className='text-sm pl-1'>Expected LPA</div>
            </div>
            <div>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

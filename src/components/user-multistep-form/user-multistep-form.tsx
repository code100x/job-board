'use client';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddExperience } from './addExperience-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddSkills } from './add-skills-form';
import { AddProject } from './add-project-form';
import { AddResume } from './add-resume-form';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { validateUserBoarding } from '@/actions/user.profile.actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const forms = [
  {
    label: 'Add Experience',
    description:
      'Adding your experience helps showcase your skills, build credibility, and increase your chances of standing out to potential employers or collaborators. Share details about your past roles, achievements, and responsibilities to give a full picture of your career journey.',
    component: AddExperience,
  },
  {
    label: 'Add Skills',
    description:
      "Highlighting your skills is essential for demonstrating your proficiency in key areas. Add relevant skills that reflect your expertise and align with the job roles you're targeting to increase your visibility to potential employers.",
    component: AddSkills,
  },
  {
    label: 'Add Projects',
    description:
      "Adding projects allows you to showcase practical examples of your work. Whether it's personal, academic, or professional, showcasing your projects demonstrates your ability to apply your skills and solve real-world problems.",
    component: AddProject,
  },
  {
    label: 'Add Resume',
    description:
      'Uploading your resume provides a comprehensive summary of your career. It gives potential employers a clear and structured view of your background, helping you stand out in job applications and networking opportunities.',
    component: AddResume,
  },
];

export default function VerticalLinearStepper() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const handleFinish = async () => {
    try {
      const response = await validateUserBoarding();
      if (!response.status) {
        return toast({
          title: response.message || 'Error',
          variant: 'destructive',
        });
      }
      toast({
        title: response.message,
        variant: 'success',
      });
      await update({
        ...session,
        user: {
          onBoard: true,
        },
      });
      router.refresh();
    } catch (_error) {
      toast({
        title: 'Something went wrong!! Please Try Again Later.',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {forms.map((form, index) => (
          <Step key={form.label}>
            <StepLabel
              optional={
                index === forms.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              <div className="dark:text-white font-extrabold">{form.label}</div>
            </StepLabel>
            <StepContent>
              {form.description}
              <Box sx={{ mb: 2 }}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="contained"
                      sx={{ mt: 1, mr: 1 }}
                      aria-label="add"
                    >
                      Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0">
                    <DialogHeader className="p-6 pb-2">
                      <DialogTitle>{form.label}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto px-6 pb-6">
                      <form.component />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="contained"
                  onClick={
                    index === forms.length - 1 ? handleFinish : handleNext
                  }
                  sx={{ mt: 1, mr: 1 }}
                  aria-label="next/finish"
                >
                  {index === forms.length - 1 ? 'Finish' : 'Next'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                  aria-label="back"
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

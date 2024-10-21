'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building, Check } from 'lucide-react';

export default function OnboardingPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showCompanySetup, setShowCompanySetup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    if (role === 'jobSeeker') {
      router.push('/login');
    } else if (role === 'hr') {
      setShowCompanySetup(true);
    }
    setIsOpen(false);
  };

  const handleCompanySetup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCompanySetup(false);
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose your role</DialogTitle>
            <DialogDescription>
              Select a role to personalize your experience
            </DialogDescription>
          </DialogHeader>
          <RadioGroup onValueChange={handleRoleSelection}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jobSeeker" id="jobSeeker" />
              <Label htmlFor="jobSeeker">Job Seeker</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hr" id="hr" />
              <Label htmlFor="hr">HR</Label>
            </div>
          </RadioGroup>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompanySetup} onOpenChange={setShowCompanySetup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set up your company profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCompanySetup} className="space-y-4">
            <div className="flex justify-center">
              <Building className="w-16 h-16 text-gray-400" />
            </div>
            <Input
              type="file"
              accept="image/*"
              placeholder="Upload Company Logo"
            />
            <Input placeholder="Company Name" required />
            <Input placeholder="Company Website" required />
            <Textarea placeholder="Description" required />
            <Button type="submit" className="w-full">
              Finish Setup for {selectedRole}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <DialogTitle>You are All Set</DialogTitle>
          <DialogDescription>Start posting jobs</DialogDescription>
          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={() => router.push('/login')}>
              Post your First Job
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Go to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to Our Platform
      </h1>
    </div>
  );
}

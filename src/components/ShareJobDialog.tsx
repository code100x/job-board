import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Twitter, Linkedin, Share2 } from 'lucide-react';
import { JobType } from '@/types/jobs.types';

interface ShareOption {
  name: string;
  icon: React.ReactNode;
  shareFunction: (job: JobType) => void;
}

const shareOptions: ShareOption[] = [
  {
    name: 'Twitter',
    icon: <Twitter className="h-5 w-5" />,
    shareFunction: (job: JobType) => {
      const text = encodeURIComponent(
        `Check out this job posting: ${job.title} at ${job.companyName}`
      );
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        '_blank'
      );
    },
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="h-5 w-5" />,
    shareFunction: (job: JobType) => {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(job.title);
      const summary = encodeURIComponent(
        `Exciting opportunity: ${job.title} at ${job.companyName}. Check out the details!`
      );
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
        '_blank'
      );
    },
  },
  {
    name: 'WhatsApp',
    icon: <Share2 className="h-5 w-5" />, // Using Share2 as a placeholder, replace with WhatsApp icon if available
    shareFunction: (job: JobType) => {
      const text = encodeURIComponent(
        `Check out this job posting: ${job.title} at ${job.companyName} - ${window.location.href}`
      );
      window.open(`https://wa.me/?text=${text}`, '_blank');
    },
  },
];

export const ShareJobDialog = ({ job }: { job: JobType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="px-4 py-2 h-fit gap-2 flex items-center"
          aria-label="share-job"
        >
          Share Job <Share2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Job</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => option.shareFunction(job)}
              aria-label="share-on-social"
            >
              {option.icon}
              Share on {option.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

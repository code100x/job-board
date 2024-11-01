import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Twitter, Linkedin, Share2, Copy } from 'lucide-react';
import { useToast } from '../ui/use-toast';

interface ShareOption {
  name: string;
  icon: React.ReactNode;
  shareFunction: () => void;
}

export const ProfileShareDialog = () => {
  const { toast } = useToast();

  const shareOptions: ShareOption[] = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      shareFunction: () => {
        const text = encodeURIComponent(
          `Check out my new profile at 100xdevs Job-Board: ${window.location.href}`
        );
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
      },
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      shareFunction: () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('My New Profile');
        const summary = encodeURIComponent(
          `Excited to share my new profile on 100xdevs Job-Board! Check it out here: ${url} #JobSearch #Hiring #OpenToWork`
        );
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
          '_blank'
        );
      },
    },
    {
      name: 'Copy',
      icon: <Copy className="h-5 w-5" />,
      shareFunction: () => {
        window.navigator.clipboard.writeText(window.location.href);
        toast({
          variant: 'success',
          description: 'Successfully copied the Profile Url.',
        });
      },
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="px-3 py-2 rounded-sm">
          <Share2 height={16} width={16} />
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
              onClick={() => option.shareFunction()}
            >
              {option.icon}
              {option.name === 'Copy' ? 'Copy Url' : `Share on ${option.name}`}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

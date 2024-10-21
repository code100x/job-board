import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default function AddMore({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex md:justify-end mb-4">
            <Button className="flex gap-2 items-center  px-6 dark:text-white py-2 w-fit h-fit rounded-sm">
              <p>Add More</p>
              <PlusCircle />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Add Experience</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto px-6 pb-6 no-scrollbar">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

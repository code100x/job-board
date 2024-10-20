import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';

export default function AddMore({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex md:justify-end  cursor-pointer mb-8">
            <PlusCircle />
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

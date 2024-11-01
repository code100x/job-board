import { useState } from 'react';
import { deleteProject } from '@/actions/user.profile.actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';

export function ProjectDeleteDialog({ projectId }: { projectId: number }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinueClick = async () => {
    try {
      setIsLoading(true);
      const response = await deleteProject(projectId);

      if (!response.status) {
        toast({
          title: response.message || 'Error',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: response.message,
        variant: 'success',
      });

      setIsOpen(false);
    } catch (_error) {
      toast({
        title: 'Something went wrong while deleting the resume',
        description: 'Internal server error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-transparent p-0 b-0 hover:bg-transparent"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 width={16} height={16} className="text-[#C32518]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete your Project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleContinueClick}>
            {isLoading ? 'Please wait...' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

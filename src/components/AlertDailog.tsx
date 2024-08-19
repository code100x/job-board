import { useState } from 'react';
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
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { deleteJob } from '@/actions/job.action';

const AlertDailog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await deleteJob(id);
      toast({
        title: response.message,
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setLoading(false);

      router.push('/admin/jobs');
    } catch {
      setLoading(false);

      toast({ title: "Something Won't happen", variant: 'destructive' });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={'destructive'}>
          {loading ? 'Deleting ...' : 'Delete'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete Job and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDailog;

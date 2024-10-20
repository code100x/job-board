import { getUserProjects } from '@/actions/user.profile.actions';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Project } from '@prisma/client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export function UserProjects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>();
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await getUserProjects();
        if (!res.status) {
          toast({
            title: 'Can not Fetch Projects! Please Try agian Later',
            variant: 'destructive',
          });
        }
        if (res.status) {
          setProjects(res.additional);
        }
      } catch (_error) {
        toast({
          title: 'Can not Fetch Projects! Please Try agian Later',
          variant: 'destructive',
        });
      }
    }

    fetchProjects();
  }, [toast]);

  if (!projects) {
    return null;
  }

  return (
    <div className="space-y-2 mb-2">
      {projects.map((item: Project) => (
        <Card
          key={item.id}
          className=" border-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-black dark:text-white transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {item.projectName}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <p className="mb-4">{item.projectSummary}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            {item.projectLiveLink && (
              <Link
                href={item.projectLiveLink}
                className="text-blue-500 hover:underline"
              >
                Live Project
              </Link>
            )}
            <Link
              href={item.projectGithub}
              className="text-blue-500 hover:underline"
            >
              GitHub Repository
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

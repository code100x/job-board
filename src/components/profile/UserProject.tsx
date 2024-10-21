import { getUserProjects } from '@/actions/user.profile.actions';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Project } from '@prisma/client';
import icons from '@/lib/icons';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import AddMore from './AddMoreModal';
import { AddProject } from '../user-multistep-form/add-project-form';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';

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
    return (
      <div className="flex items-center justify-center h-full w-full">
        <icons.loading className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <AddMore>
        <AddProject />
      </AddMore>
      <div className="space-y-2 mb-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((item: Project) => (
          <Card
            key={item.id}
            className=" border-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-black dark:text-white transition-shadow duration-300"
          >
            <CardHeader>
              {item.projectThumbnail && (
                <img
                  alt={item.projectName}
                  src={item.projectThumbnail}
                  className={`h-[200px] hover:scale-110 transition-transform duration-300`}
                />
              )}

              <CardTitle className="text-lg lg:text-2xl font-semibold">
                {item.projectName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='className=" overflow-wrap break-all'>
                {item.projectSummary}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                {item.stack && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">Stack:</span>
                    <span className="text-xs">{item.stack}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 flex-wrap justify-end">
                <Link href={item.projectGithub} className="text-blue-500 ">
                  <FaGithub className="size-6" />
                </Link>

                {item.projectLiveLink && (
                  <Link href={item.projectLiveLink} className="text-blue-500 ">
                    <ArrowUpRight />
                  </Link>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

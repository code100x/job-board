import { getUserExperience } from '@/actions/user.profile.actions';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Experience } from '@prisma/client';
import { Card, CardContent, CardHeader } from '../ui/card';
import _ from 'lodash';
import AddMore from './AddMoreModal';
import { AddExperience } from '../user-multistep-form/addExperience-form';
import { Calendar } from 'lucide-react';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

export function UserExperience() {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<Experience[] | undefined>();

  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await getUserExperience();
        if (!res.status) {
          toast({
            title: 'Cannot Fetch Experiences! Please Try Again Later',
            variant: 'destructive',
          });
        }
        if (res.status) {
          setExperiences(res.additional);
        }
      } catch (_error) {
        toast({
          title: 'Cannot Fetch Experiences! Please Try Again Later',
          variant: 'destructive',
        });
      }
    }

    fetchExperience();
  }, []);

  if (!experiences) {
    return null;
  }

  return (
    <div className="w-full">
      <AddMore>
        <AddExperience />
      </AddMore>
      <div className="space-y-2 mb-2 no-scrollbar ">
        {experiences.map((item: Experience) => (
          <Card
            key={item.id}
            className="border-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-black dark:text-white transition-shadow duration-300"
          >
            <CardHeader className="flex flex-wrap flex-row justify-between items-start ">
              <div>
                <div className="flex flex-wrap gap-2 items-center">
                  <RiVerifiedBadgeFill className="size-4 md:size-6" />
                  <p className="text-lg lg:text-2xl font-semibold">
                    {item.designation}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <p>{item.companyName} | </p>
                  <p>{_.startCase(item.EmploymentType)} | </p>
                  <p className="mb-2">{item.workMode}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <Calendar className="size-4 md:size-6" />
                <p className="text-sm md:text-md lg:text-lg">
                  {new Date(item.startDate).toLocaleDateString()}{' '}
                  {item.endDate
                    ? ` - ${new Date(item.endDate).toLocaleDateString()}`
                    : ' - Present'}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className=" overflow-wrap break-all text-gray-700 dark:text-gray-400 ">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

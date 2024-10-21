import { getUserExperience } from '@/actions/user.profile.actions';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Experience } from '@prisma/client';
import _ from 'lodash';
import icons from '@/lib/icons';
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
    return (
      <div className="flex items-center justify-center h-full w-full">
        <icons.loading className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-2">
      {experiences.map((item: Experience) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-between md:col-span-2 col-span-4 border-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-black dark:text-white transition-shadow duration-300 p-3 gap-2 rounded-2xl"
        >
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex flex-col justify-center items-start w-1/3">
              <div className="font-semibold">
                {new Date(item.startDate).toLocaleDateString()}
                {item.endDate
                  ? ` - ${new Date(item.endDate).toLocaleDateString()}`
                  : ' - Present'}
              </div>
              <div className="dark:text-slate-400 text-slate-700">
                {_.startCase(item.EmploymentType)}, {_.startCase(item.workMode)}
              </div>
            </div>
            <div className="flex flex-col justify-center items-start w-1/3 gap-1">
              <span className="font-bold">{item.companyName}</span>
              <p className="dark:text-slate-400 text-slate-700">
                {item.designation}
              </p>
            </div>
          </div>
          <div className="w-full border-l-4 p-2 bg-slate-900/50">
            <span className="dark:text-slate-400 text-slate-700">
              {item.description}
            </span>
          </div>
        </div>
      ))}
      {experiences.length === 0 && (
        <div className="flex items-center justify-center col-span-4 h-full">
          <icons.alert size={24} />
          <span className="ml-2">No Experiences Found</span>
        </div>
      )}
    </div>
  );
}

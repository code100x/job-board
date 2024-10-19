import { getUserExperience } from '@/actions/user.profile.actions';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Experience } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import _ from 'lodash';

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
    <div className="space-y-2 mb-2">
      {experiences.map((item: Experience) => (
        <Card
          key={item.id}
          className="border-2 hover:bg-slate-100 dark:hover:bg-slate-900 text-black dark:text-white transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              <strong>Company Name: </strong>
              {item.companyName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              <strong>Designation:</strong> {item.designation}
            </p>
            <p className="mb-2">
              <strong>Employment Type:</strong>{' '}
              {_.startCase(item.EmploymentType)}
            </p>
            <p className="mb-2">
              <strong>Work Mode:</strong> {item.workMode}
            </p>
            <p className="mb-2">
              <strong>Current Status:</strong>{' '}
              {item.currentWorkStatus
                ? 'Currently Employed here'
                : 'Not Currently Employed here'}
            </p>
            <p className="mb-2">
              <strong>Duration:</strong>{' '}
              {new Date(item.startDate).toLocaleDateString()}{' '}
              {item.endDate
                ? ` - ${new Date(item.endDate).toLocaleDateString()}`
                : ' - Present'}
            </p>
            <p className="mb-4">
              <strong>Description: </strong>
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

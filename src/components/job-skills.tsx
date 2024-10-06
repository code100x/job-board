import { JobType } from '@/types/jobs.types';
import icons from '@/lib/icons';
type JobSkillsProps = Pick<JobType, 'skills'>;
export const JobSkills = ({ skills }: JobSkillsProps) => {
  const maxSkills = 6;

  if (skills.length === 0) {
    return <NoSkills />;
  }
  const displayedSkills = skills.slice(0, maxSkills);
  const remainingSkillsCount = skills.length - maxSkills;
  return (
    <div className="flex flex-wrap gap-2">
      {displayedSkills.map((skill, index) => (
        <SkillTag key={index} skill={skill} />
      ))}
      {remainingSkillsCount > 0 && (
        <div className="bg-slate-500 bg-opacity-10 text-slate-500 dark:text-slate-400 font-medium text-sm rounded-full px-2">
          +{remainingSkillsCount} more
        </div>
      )}
    </div>
  );
};
const NoSkills = () => (
  <div className="mt-3 bg-slate-500 flex justify-start items-center gap-3 bg-opacity-10 text-slate-500 dark:text-slate-400 font-medium text-sm rounded-full px-2">
    <icons.alert size={12} /> No skills provided
  </div>
);
const SkillTag = ({ skill }: { skill: string }) => (
  <div className="bg-slate-500 bg-opacity-10 text-slate-500 dark:text-slate-400 font-medium text-sm rounded-full px-2">
    {skill}
  </div>
);

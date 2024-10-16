import { useEffect, useState } from 'react';

export function UserSkills() {
  const [skills, setSkills] = useState<string[]>();
  useEffect(() => {
    const storedSkills = localStorage.getItem('skills');
    if (storedSkills) {
      setSkills(JSON.parse(storedSkills));
    }
  }, []);

  if (!skills) {
    return null;
  }

  return (
    <div className="flex gap-4">
      {skills.map((item, index) => (
        <div
          key={index}
          className="bg-blue-300 p-2 rounded-sm dark:bg-blue-800"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

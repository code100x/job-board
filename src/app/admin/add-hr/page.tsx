import AddHRForm from '@/components/AddHRForm';
import React from 'react';

const page = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <div>
        <h1 className="text-center text-4xl font-semibold">Add HR</h1>
      </div>

      <AddHRForm />
    </div>
  );
};

export default page;

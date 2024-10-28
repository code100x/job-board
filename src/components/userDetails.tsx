import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const UserDetails = () => {
  return (
    <div className="h-[100vh] flex mt-14 items-center md:items-start flex-col md:flex-row  md:justify-center ">
      <div className="max-w-[300px] w-[350px] flex flex-col gap-4 items-center p-4">
        <div>
          <Button className="w-[200px] m-auto" aria-label="applied-to">
            Applied to
          </Button>
        </div>
        <div>
          <Button className="w-[200px] m-auto" aria-label="update-details">
            Update Details
          </Button>
        </div>
      </div>
      <div>
        <div className="flex flex-col max-w-[600px] gap-3 mx-8">
          <div className="flex">
            <div>
              {' '}
              <Input value={''} placeholder="First name" />
            </div>
            <div>
              {' '}
              <Input value={''} placeholder="Last name" />
            </div>
          </div>
          <div>
            <Input placeholder="Github" />
          </div>
          <div>
            <Input placeholder="LinkedIn" />
          </div>
          <div>
            <Input placeholder="Twitter" />
          </div>
          <div>
            <Button value={'Upload Resume'} aria-label="upload-resume">
              Upload Resume{' '}
            </Button>
          </div>
          <div className="flex justify-between">
            <div>
              <Input placeholder="LPA" className="max-w-[135px]" />
            </div>
            <div>
              <Button aria-label="submit">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

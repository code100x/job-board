import AdminCard from '@/components/AdminCard';
import { RiDeleteBinLine } from 'react-icons/ri';

const Toggler = () => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="relative w-10 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-700 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

const tabledetails = {
  heading: 'Manage Jobs',
  placeholder: 'Search Jobs by Company or title...',
  toggle: [
    ['Active', 'closed'],
    ['Status', 'Latest'],
  ],
  tableHeading: [
    'Job Title',
    'Company Name',
    'Job category',
    'Job Type',
    'Posted Date',
    'Status',
    'Verified',
    'Action',
  ],
  tableData: [
    [
      'Software Engineer',
      'Spotify Inc.',
      'Development',
      'Full-Time',
      '2024-09-12',
      <span
        key={1}
        className={`bg-green-100 text-green-500 px-2 py-1 rounded-lg dark:bg-gray-800`}
      >
        {true ? 'Active' : 'Closed'}
      </span>,
      <Toggler key={1} />,
      <RiDeleteBinLine key={1} size={'1rem'} color="red" />,
    ],
    [
      'Software Engineer',
      'Spotify Inc.',
      'Development',
      'Full-Time',
      '2024-09-12',
      <span
        key={2}
        className={`bg-red-100 text-red-500 px-2 py-1 rounded-lg dark:bg-gray-800`}
      >
        {false ? 'Active' : 'Closed'}
      </span>,
      <Toggler key={2} />,
      <RiDeleteBinLine key={2} size={'1rem'} color="red" />,
    ],
    [
      'Software Engineer',
      'Spotify Inc.',
      'Development',
      'Full-Time',
      '2024-09-12',
      <span
        key={3}
        className={`bg-green-100 text-green-500 px-2 py-1 rounded-lg dark:bg-gray-800`}
      >
        {true ? 'Active' : 'Closed'}
      </span>,
      <Toggler key={3} />,
      <RiDeleteBinLine key={3} size={'1rem'} color="red" />,
    ],
  ],
};

const page = async () => {
  return (
    <div className="container flex flex-col gap-5">
      <AdminCard tabledetails={tabledetails} />
    </div>
  );
};

export default page;

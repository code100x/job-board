import AdminCard from '@/components/AdminCard';
import { RiDeleteBinLine } from 'react-icons/ri';

const tabledetails = {
  heading: 'Manage Recruiter...',
  placeholder: 'Search Recruiters',
  toggle: [['Latest', 'Latest']],
  tableHeading: [
    'Company Name',
    'Company Email',
    'Jobs Posted',
    'Joined',
    'Action',
  ],
  tableData: [
    [
      'Spotify Inc.',
      'spotify@inc.com',
      '201',
      '28-39-2024',
      <RiDeleteBinLine key={1} size={'1rem'} color="red" />,
    ],
    [
      'Spotify Inc.',
      'spotify@inc.com',
      '201',
      '28-39-2024',
      <RiDeleteBinLine key={2} size={'1rem'} color="red" />,
    ],
    [
      'Spotify Inc.',
      'spotify@inc.com',
      '201',
      '28-39-2024',
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

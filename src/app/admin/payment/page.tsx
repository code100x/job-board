import AdminCard from '@/components/AdminCard';
import { GoDownload } from 'react-icons/go';

const tabledetails = {
  heading: 'Payment History',
  placeholder: 'Search Payments...',
  toggle: [['Latest', 'Latest']],
  tableHeading: [
    'Transaction ID',
    'Company Name',
    'Amount',
    'Payment Date',
    'Action',
  ],
  tableData: [
    [
      'TXIOEUWBNDIUSJ',
      'Spotify Inc.',
      <span key={1} className="text-green-500">
        $4939
      </span>,
      '2024-09-12',
      <GoDownload key={1} size={'1rem'} />,
    ],
    [
      'TXIOEUWBNDIUSJ',
      'Spotify Inc.',
      <span key={2} className="text-green-500">
        $4939
      </span>,
      '2024-09-12',
      <GoDownload key={2} size={'1rem'} />,
    ],
    [
      'TXIOEUWBNDIUSJ',
      'Spotify Inc.',
      <span key={3} className="text-green-500">
        $4939
      </span>,
      ,
      '2024-09-12',
      <GoDownload key={3} size={'1rem'} />,
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

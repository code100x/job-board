import { getServerSession } from 'next-auth';
import List from './List';
import { options } from '@/lib/auth';
import { redirect } from 'next/navigation';

const JobsPage = async () => {
  const session = await getServerSession(options);

  // eslint-disable-next-line no-console
  console.log('session', session);

  if (session?.user?.role !== 'ADMIN') {
    redirect('/');
  }
  return (
    <div className="w-full max-w-screen-4xl flex justify-center">
      <List />
    </div>
  );
};

export default JobsPage;
